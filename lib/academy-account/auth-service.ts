import {
  boundedJson,
  privateHeaders,
  privateJson,
  sameOrigin,
} from "./policy.ts";
export type AuthDependencies = {
  config: { origin: string };
  allow: (key: string, maximum: number, seconds: number) => Promise<boolean>;
  auth: { handler: (request: Request) => Promise<Response> };
};
const allowed = new Map([
  ["/get-session", "GET"],
  ["/email-otp/send-verification-otp", "POST"],
  ["/sign-in/email-otp", "POST"],
  ["/sign-out", "POST"],
  ["/delete-user", "POST"],
]);
export async function handleLearnerAuth(
  request: Request,
  context: AuthDependencies | null,
) {
  if (!context)
    return privateJson(
      { error: "Learning accounts are not available yet." },
      503,
    );
  try {
    const path = new URL(request.url).pathname.slice(
      "/api/academy/auth".length,
    );
    if (allowed.get(path) !== request.method)
      return privateJson({ error: "Not found." }, 404);
    if (request.method === "POST") {
      if (!sameOrigin(request, context.config.origin))
        return privateJson({ error: "Request not allowed." }, 403);
      let body: unknown;
      try {
        body = await boundedJson(request);
      } catch {
        return privateJson({ error: "Invalid request." }, 400);
      }
      if (!body || typeof body !== "object" || Array.isArray(body))
        return privateJson({ error: "Invalid request." }, 400);
      const data = body as Record<string, unknown>;
      const sending = path === "/email-otp/send-verification-otp";
      if (sending || path === "/sign-in/email-otp") {
        const keys = sending ? ["email", "type"] : ["email", "otp"];
        if (
          Object.keys(data).some((key) => !keys.includes(key)) ||
          typeof data.email !== "string" ||
          data.email.length > 254 ||
          !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) ||
          (sending && data.type !== "sign-in")
        )
          return privateJson({ error: "Invalid request." }, 400);
        if (
          !sending &&
          (typeof data.otp !== "string" || !/^\d{6}$/.test(data.otp))
        )
          return privateJson({ error: "Invalid code." }, 400);
        data.email = data.email.trim().toLowerCase();
        if (
          !(await context.allow(
            `${sending ? "send" : "verify"}:${data.email}`,
            sending ? 3 : 10,
            sending ? 3600 : 600,
          ))
        )
          return privateJson(
            { error: "Please wait before trying again." },
            429,
          );
      } else if (Object.keys(data).length)
        return privateJson({ error: "Invalid request." }, 400);
      request = new Request(request.url, {
        method: "POST",
        headers: request.headers,
        body: JSON.stringify(data),
      });
    }
    const response = await context.auth.handler(request);
    for (const [key, value] of Object.entries(privateHeaders))
      response.headers.set(key, value);
    return response;
  } catch {
    return privateJson(
      { error: "Sign-in is temporarily unavailable. Please try again." },
      503,
    );
  }
}
