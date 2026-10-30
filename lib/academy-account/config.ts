export function academyConfig(
  env: Record<string, string | undefined> = process.env,
) {
  if (env.ACADEMY_ACCOUNTS_ENABLED !== "true") return null;
  const {
    ACADEMY_DATABASE_URL: databaseURL,
    ACADEMY_AUTH_SECRET: secret,
    ACADEMY_AUTH_URL: url,
    RESEND_API_KEY: resendKey,
    ACADEMY_AUTH_FROM: from,
  } = env;
  if (
    !databaseURL ||
    !secret ||
    secret.length < 32 ||
    !url ||
    !resendKey ||
    !from
  )
    return null;
  try {
    const origin = new URL(url);
    const database = new URL(databaseURL);
    if (!["postgres:", "postgresql:"].includes(database.protocol)) return null;
    if (origin.origin !== url || origin.username || origin.password)
      return null;
    if (
      origin.protocol !== "https:" &&
      !(env.NODE_ENV === "development" && origin.hostname === "localhost")
    )
      return null;
    return { databaseURL, secret, origin: origin.origin, resendKey, from };
  } catch {
    return null;
  }
}
