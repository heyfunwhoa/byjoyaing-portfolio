import type { TechnologyId } from "./technology-registry.ts";

/** Side Quest cards show at most this many marks so the card stays a title, not a billboard. */
export const CARD_LOGO_LIMIT = 4;

/**
 * Dependencies of heyfunwhoa/byjoyaing-portfolio (package.json):
 * next, react, typescript, tailwindcss.
 * GitHub is added only for Detector Coverage Atlas, the one project whose
 * public repository URL points at this repo.
 */
const portfolioPage = ["nextjs", "react", "typescript", "tailwindcss"] as const satisfies readonly TechnologyId[];

export const verifiedTechnologyStacks = {
  "detector-coverage-atlas": [...portfolioPage, "github"],
  "account-intelligence": portfolioPage,
  "competitive-intelligence-engine": portfolioPage,
  "customer-feedback-intelligence": portfolioPage,
  "truffle-camp": portfolioPage,
  "partner-gtm-engine": portfolioPage,
} as const satisfies Record<string, readonly TechnologyId[]>;

export function verifiedStack(slug: string): readonly TechnologyId[] {
  if (Object.prototype.hasOwnProperty.call(verifiedTechnologyStacks, slug)) {
    return verifiedTechnologyStacks[slug as keyof typeof verifiedTechnologyStacks];
  }
  return [];
}

export function compactTechnologyIds(slug: string): readonly TechnologyId[] {
  return verifiedStack(slug).slice(0, CARD_LOGO_LIMIT);
}
