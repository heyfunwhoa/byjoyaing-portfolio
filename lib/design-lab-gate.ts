/** Development route. A production server answers 404 before any lab UI renders. */
export function designLabAvailable(
  nodeEnv: string | undefined = process.env.NODE_ENV,
) {
  return nodeEnv !== "production"
}
