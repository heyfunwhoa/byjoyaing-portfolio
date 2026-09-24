export const changeCategories = [
  "Product capability",
  "Pricing and packaging",
  "Documentation",
  "Integrations",
  "Positioning",
  "Product release",
] as const;

export type ChangeCategory = (typeof changeCategories)[number];

export type Provider = {
  id: string;
  name: string;
  category: string;
  description: string;
  monitoring: "Sample citation" | "Not monitored";
  lastReviewed: string;
  brief: string;
  recentChanges: string;
  sourceUrl: string | null;
};

export const providers: Provider[] = [
  {
    id: "trufflehog",
    name: "TruffleHog",
    category: "Open-source secret scanner",
    description:
      "The public repository describes finding, verifying, and analyzing leaked credentials. That sentence was checked for this sample. It is not a ranking against other products.",
    monitoring: "Sample citation",
    lastReviewed: "September 2026",
    brief: "Detection is not verification",
    recentChanges: "1 illustrative",
    sourceUrl: "https://github.com/trufflesecurity/trufflehog",
  },
  {
    id: "gitguardian",
    name: "GitGuardian",
    category: "Commercial secrets detection",
    description:
      "A commercial secrets-detection product. No public page is attached here, and no capability claim is approved.",
    monitoring: "Not monitored",
    lastReviewed: "Not reviewed",
    brief: "None",
    recentChanges: "0",
    sourceUrl: null,
  },
  {
    id: "ghas",
    name: "GitHub Advanced Security",
    category: "GitHub security product",
    description:
      "GitHub documents secret scanning and code scanning as part of this product. This page has not reviewed those docs into a brief.",
    monitoring: "Not monitored",
    lastReviewed: "Not reviewed",
    brief: "None",
    recentChanges: "0",
    sourceUrl: null,
  },
  {
    id: "kingfisher",
    name: "Kingfisher",
    category: "Open-source secret scanner",
    description:
      "The public mongodb/kingfisher repository describes secret scanning and live validation. The coverage table on this site marks Kingfisher Not evaluated. No comparison is approved.",
    monitoring: "Not monitored",
    lastReviewed: "Not reviewed",
    brief: "None",
    recentChanges: "0",
    sourceUrl: "https://github.com/mongodb/kingfisher",
  },
  {
    id: "betterleaks",
    name: "Betterleaks",
    category: "Open-source secrets scanner",
    description:
      "The public betterleaks/betterleaks repository describes a configurable secrets scanner. The coverage table marks Betterleaks Not evaluated. No comparison is approved.",
    monitoring: "Not monitored",
    lastReviewed: "Not reviewed",
    brief: "None",
    recentChanges: "0",
    sourceUrl: "https://github.com/betterleaks/betterleaks",
  },
];

export const demoChange = {
  providerId: "trufflehog",
  sourceLabel: "Public repository description",
  sourceUrl: "https://github.com/trufflesecurity/trufflehog",
  previous: "Finds leaked credentials.",
  current: "Finds, verifies, and analyzes leaked credentials.",
  category: "Product capability" as ChangeCategory,
  detected:
    "The current line names verification as its own step. Both lines were written for this walkthrough. They are not a stored crawl and not a historical vendor diff.",
  date: "Illustrative. Not a detection timestamp.",
};

export const hypothesis =
  "A buyer may treat “we find secrets” and “we verify them” as the same claim. That is a hypothesis about the conversation, not a fact about any deal, and not a score against another product.";

export const guidance =
  "Ask what is detected, what is verified, and what has not been evaluated. Do not fill a gray cell with a win.";

export const discoveryQuestions = [
  "Which credential types do you verify live, and which have you not evaluated?",
  "When a tool says it found a secret, was that a pattern match or a live check?",
  "What should stay gray until someone reviews the source?",
];

export const capabilityRows = [
  {
    dimension: "Detects credential patterns",
    trufflehog: "Described in the public repository",
    others: "Not evaluated",
  },
  {
    dimension: "Verifies credentials",
    trufflehog: "Described in the public repository",
    others: "Not evaluated",
  },
  {
    dimension: "Deployment",
    trufflehog: "Not evaluated",
    others: "Not evaluated",
  },
  {
    dimension: "Integrations",
    trufflehog: "Not evaluated",
    others: "Not evaluated",
  },
];

export type Observation = {
  id: string;
  providerId: string;
  opportunity: string;
  requirement: string;
  observation: string;
  evidence: string;
  update: string;
  status: "Needs review" | "Approved for this demo";
};

export const starterObservation: Observation = {
  id: "harbor-slack",
  providerId: "trufflehog",
  opportunity: "Fictional evaluation. Not a real opportunity.",
  requirement: "The buyer asked whether a Slack token is verified or only matched.",
  observation:
    "The public repository describes verification. This sample has not checked the Slack detector.",
  evidence: "https://github.com/trufflesecurity/trufflehog",
  update:
    "Leave Slack as not fully reviewed. Do not call an unreviewed detector a win or a gap.",
  status: "Needs review",
};
