export type PortfolioKind = "work" | "side-quest";

/**
 * Explicit editorial classification. The URL prefix is not the classification:
 * side quests still live at /work/[slug] (ADR 0003).
 */
export const kindBySlug: Record<string, PortfolioKind> = {
  "detector-coverage-atlas": "side-quest",
  "product-release-intelligence": "side-quest",
  "truffle-camp": "side-quest",
  "competitive-intelligence-engine": "work",
  "customer-feedback-intelligence": "side-quest",
  "product-prioritization-simulator": "side-quest",
  "partner-gtm-engine": "side-quest",
  "account-intelligence": "side-quest",
  "revenue-planning-simulator": "side-quest",
  "revenue-intelligence": "side-quest",
  "gtm-operating-plan": "side-quest",
  "gtm-campaign-lab": "side-quest",
  "security-signal-intelligence": "side-quest",
};

/** Kind for a case-study path. Unclassified /work/ paths return undefined. */
export function kindForPathname(pathname: string): PortfolioKind | undefined {
  if (!pathname.startsWith("/work/")) return undefined;
  const slug = pathname.slice("/work/".length).split("/")[0];
  if (!slug) return undefined;
  return kindBySlug[slug];
}
