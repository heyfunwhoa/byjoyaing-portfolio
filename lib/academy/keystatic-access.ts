/** Local filesystem editing is opt-in and never available in a production build. */
export function localEditorEnabled(env: {
  NODE_ENV?: string;
  KEYSTATIC_LOCAL?: string;
}) {
  return env.NODE_ENV === "development" && env.KEYSTATIC_LOCAL === "true";
}

export function localEditorRequestAllowed(request: Request) {
  const host = request.headers.get("host");
  if (!host || !/^(localhost|127\.0\.0\.1)(:\d+)?$/.test(host)) return false;
  const origin = request.headers.get("origin");
  // Keystatic additionally checks its own local API request headers.
  return !origin || origin === `http://${host}`;
}
