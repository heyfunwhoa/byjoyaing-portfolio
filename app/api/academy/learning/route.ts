import { getAcademyRuntime } from "@/lib/academy-account/server";
import { learningStore } from "@/lib/academy-account/store";
import { handleLearning } from "@/lib/academy-account/service";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
async function handle(request: Request) {
  const context = getAcademyRuntime();
  return handleLearning(
    request,
    context
      ? {
          origin: context.config.origin,
          session: (headers) =>
            context.auth.api.getSession({
              headers,
              query: { disableCookieCache: true },
            }),
          allow: context.allow,
          store: learningStore(context.pool),
        }
      : null,
  );
}
export { handle as GET, handle as PATCH, handle as DELETE };
