/** Reviewed public landing pages. Extend only after route review. */
export const reviewedPublicOrigins = new Set([
  "https://byjoyaing.com",
  "https://www.byjoyaing.com",
]);

export const reviewedPublicPaths = new Set([
  "/",
  "/about",
  "/work",
  "/contact",
  "/side-quests",
  "/academy",
]);

export function isReviewedPublicPage(url: URL) {
  return (
    reviewedPublicOrigins.has(url.origin) &&
    reviewedPublicPaths.has(url.pathname)
  );
}
