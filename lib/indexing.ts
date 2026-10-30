/**
 * Static routes a crawler may index. Capability views and /work/[slug]
 * case studies are added in app/sitemap.ts from their registries.
 * Practice labs, the design storytelling guide, prototypes, and private-work
 * are omitted and must set `robotsNoindex`.
 * /ai-academy and /ai-academy/systems stay because they are published essays.
 * /ai-academy/programming is a lab: noindex, and not listed here.
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
  "/ai-academy/systems",
  "/contact",
] as const;

export const noindexPaths = [
  "/ai-academy/sign-in",
  "/ai-academy/my-learning",
  "/ai-academy/account-privacy",
  "/ai-academy/programming",
  "/ai-academy/playground",
  "/ai-academy/playground/skill-builder",
  "/ai-academy/playground/research-pipeline",
  "/ai-academy/version-control",
  "/ai-academy/journeys/prompting",
  "/ai-academy/journeys/source-verification",
  "/ai-academy/devops/build-rate-limits",
  "/ai-academy/dependencies/lockfiles",
  "/builder-academy/identity-journey",
  "/builder-academy/credential-risk",
  "/work/storytelling-guide",
  "/prototype",
  "/private-work",
  "/account-signal",
  "/design-lab",
] as const;

export const robotsNoindex = { index: false, follow: false } as const;
