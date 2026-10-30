import {
  boundedJson,
  parseChange,
  privateJson,
  sameOrigin,
  type LearningChange,
  type LearningState,
} from "./policy.ts";
export type LearningDependencies = {
  origin: string;
  session: (
    headers: Headers,
  ) => Promise<{ user: { id: string; emailVerified: boolean } } | null>;
  allow: (key: string, maximum: number, seconds: number) => Promise<boolean>;
  store: {
    read: (id: string) => Promise<LearningState>;
    change: (id: string, change: LearningChange) => Promise<void>;
    clear: (id: string) => Promise<void>;
  };
};
export async function handleLearning(
  request: Request,
  dependencies: LearningDependencies | null,
) {
  if (!dependencies)
    return privateJson(
      { error: "Learning accounts are not available yet." },
      503,
    );
  try {
    if (!["GET", "PATCH", "DELETE"].includes(request.method))
      return privateJson({ error: "Method not allowed." }, 405);
    if (request.method !== "GET" && !sameOrigin(request, dependencies.origin))
      return privateJson({ error: "Request not allowed." }, 403);
    const session = await dependencies.session(request.headers);
    if (!session?.user.emailVerified)
      return privateJson({ error: "Sign in to save your learning." }, 401);
    const id = session.user.id;
    if (!(await dependencies.allow(`learning:${id}`, 120, 60)))
      return privateJson({ error: "Please wait a minute and try again." }, 429);
    if (request.method === "PATCH") {
      let change;
      try {
        change = parseChange(await boundedJson(request));
      } catch {
        return privateJson({ error: "Invalid learning update." }, 400);
      }
      if (!change)
        return privateJson({ error: "Invalid learning update." }, 400);
      await dependencies.store.change(id, change);
    }
    if (request.method === "DELETE") await dependencies.store.clear(id);
    return privateJson(await dependencies.store.read(id));
  } catch {
    return privateJson(
      {
        error: "Your learning could not be loaded or saved. Please try again.",
      },
      503,
    );
  }
}
