/**
 * Static routes a crawler may index. Capability views and /work/[slug]
 * case studies are added in app/sitemap.ts from their registries.
 * Selected public security lessons explicitly override the noindex parent layout.
 * Other practice labs, unfinished roadmaps, prototypes and private-work remain
 * excluded. See docs/seo/search-console-p0.md for the route review.
 * Search directives do not provide authentication or authorization.
 */
export const indexableStaticPaths = [
  "/",
  "/about",
  "/experience",
  "/work",
  "/side-quests",
  "/builder-guide",
  "/ai-academy",
  "/projects",
  "/capabilities",
  "/field-notes",
  "/field-notes/enterprise-deal",
  "/field-notes/multithreading",
  "/field-notes/build-the-motion",
  "/builder-academy/identity-journey",
  "/builder-academy/credential-risk",
  "/contact",
] as const;

export const noindexPaths = [
  "/ai-academy/systems",
  "/ai-academy/journeys/follow-one-click",
  "/ai-academy/programming",
  "/ai-academy/playground",
  "/ai-academy/playground/skill-builder",
  "/ai-academy/playground/research-pipeline",
  "/ai-academy/version-control",
  "/ai-academy/journeys/prompting",
  "/ai-academy/journeys/source-verification",
  "/ai-academy/devops/build-rate-limits",
  "/ai-academy/dependencies/lockfiles",
  "/work/storytelling-guide",
  "/prototype",
  "/private-work",
  "/account-signal",
  "/design-lab",
] as const;

export const robotsNoindex = { index: false, follow: false } as const;
