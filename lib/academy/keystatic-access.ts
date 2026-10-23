export type KeystaticEnvironment = {
  NODE_ENV?: string;
  KEYSTATIC_LOCAL?: string;
  NEXT_PUBLIC_KEYSTATIC_STORAGE?: string;
  NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG?: string;
  KEYSTATIC_GITHUB_CLIENT_ID?: string;
  KEYSTATIC_GITHUB_CLIENT_SECRET?: string;
  KEYSTATIC_SECRET?: string;
};

export type KeystaticMode = "local" | "github";

const hasValue = (value?: string) => Boolean(value?.trim());

/** Local filesystem editing is opt-in and development-only. */
export function localEditorEnabled(env: KeystaticEnvironment) {
  return env.NODE_ENV === "development" && env.KEYSTATIC_LOCAL === "true";
}

/** Hosted editing fails closed until GitHub mode and every auth secret are configured. */
export function githubEditorEnabled(env: KeystaticEnvironment) {
  return (
    env.NODE_ENV === "production" &&
    env.NEXT_PUBLIC_KEYSTATIC_STORAGE === "github" &&
    hasValue(env.NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG) &&
    hasValue(env.KEYSTATIC_GITHUB_CLIENT_ID) &&
    hasValue(env.KEYSTATIC_GITHUB_CLIENT_SECRET) &&
    Boolean(env.KEYSTATIC_SECRET && env.KEYSTATIC_SECRET.trim().length >= 32)
  );
}

/** Prefer explicit local development; never infer hosted mode from secrets alone. */
export function keystaticMode(env: KeystaticEnvironment): KeystaticMode | null {
  if (localEditorEnabled(env)) return "local";
  if (githubEditorEnabled(env)) return "github";
  return null;
}

export function localEditorRequestAllowed(request: Request) {
  const host = request.headers.get("host");
  if (!host || !/^(localhost|127\.0\.0\.1)(:\d+)?$/.test(host)) return false;
  const origin = request.headers.get("origin");
  // Keystatic additionally checks its own local API request headers.
  return !origin || origin === `http://${host}`;
}

export function privateNoStore(response: Response) {
  const headers = new Headers(response.headers);
  headers.set("Cache-Control", "private, no-store, max-age=0");
  const vary = new Set(
    (headers.get("Vary") ?? "")
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean),
  );
  vary.add("Cookie");
  vary.add("Authorization");
  headers.set("Vary", [...vary].join(", "));
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
