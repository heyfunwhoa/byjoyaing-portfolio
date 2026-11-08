import { caseStudySlugs, type CaseStudySlug } from "./case-studies/summaries.ts";

/** Visitor-facing next steps. The href is a route this repository already serves. */
export const presentationActions = [
  "Try the example",
  "Explore the project",
  "View implementation",
  "Request a walkthrough",
] as const;

export type PresentationAction = (typeof presentationActions)[number];

export type ProjectAction = {
  label: PresentationAction;
  href: string;
};

/**
 * One next step per project. Interactive examples on this site use
 * "Try the example". Write-ups without a public runnable app use
 * "Explore the project". No action points at a separate GTM app,
 * a preview deployment, or a private repository.
 */
export const projectActions: Record<CaseStudySlug, ProjectAction> = {
  "detector-coverage-atlas": {
    label: "Try the example",
    href: "/work/detector-coverage-atlas",
  },
  "competitive-intelligence-engine": {
    label: "Try the example",
    href: "/work/competitive-intelligence-engine",
  },
  "account-intelligence": {
    label: "Try the example",
    href: "/work/account-intelligence",
  },
  "customer-feedback-intelligence": {
    label: "Try the example",
    href: "/work/customer-feedback-intelligence",
  },
  "truffle-camp": { label: "Try the example", href: "/work/truffle-camp" },
  "product-release-intelligence": {
    label: "Explore the project",
    href: "/work/product-release-intelligence",
  },
  "partner-gtm-engine": {
    label: "Explore the project",
    href: "/work/partner-gtm-engine",
  },
  "product-prioritization-simulator": {
    label: "Explore the project",
    href: "/work/product-prioritization-simulator",
  },
  "revenue-planning-simulator": {
    label: "Explore the project",
    href: "/work/revenue-planning-simulator",
  },
  "revenue-intelligence": {
    label: "Explore the project",
    href: "/work/revenue-intelligence",
  },
  "gtm-operating-plan": {
    label: "Explore the project",
    href: "/work/gtm-operating-plan",
  },
  "gtm-campaign-lab": {
    label: "Explore the project",
    href: "/work/gtm-campaign-lab",
  },
  "security-signal-intelligence": {
    label: "Explore the project",
    href: "/work/security-signal-intelligence",
  },
};

export const academyEntry = {
  title: "Builder Academy",
  summary:
    "Practice AI basics, practical building, research, and verification. The lessons and labs already live in Builder Academy.",
  href: "/ai-academy",
  action: "Try the example" as const,
};

export const gtmRevenueWorkflows = [
  {
    slug: "revenue-planning-simulator",
    name: "Planning",
    detail:
      "Separate retention, expansion, and the new-business residual for one planning year.",
  },
  {
    slug: "gtm-operating-plan",
    name: "Coverage and capacity",
    detail:
      "See whether a hiring change moves planned capacity while bookings stay still.",
  },
  {
    slug: "revenue-intelligence",
    name: "Pipeline review",
    detail: "Read win rate from the close, not from the current stage.",
  },
] as const satisfies readonly {
  slug: CaseStudySlug;
  name: string;
  detail: string;
}[];

export const walkthroughAction: ProjectAction = {
  label: "Request a walkthrough",
  href: "/contact",
};

export function projectAction(slug: string): ProjectAction | undefined {
  return caseStudySlugs.find((item) => item === slug)
    ? projectActions[slug as CaseStudySlug]
    : undefined;
}
