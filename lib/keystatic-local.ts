/** Local Academy editing. Do not set this on Vercel. */
export function keystaticLocalEnabled() {
  return process.env.KEYSTATIC_LOCAL === "true";
}
