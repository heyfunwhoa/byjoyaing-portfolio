import { demoAccounts, demoSignals } from "./account-intelligence-demo.ts";
import {
  demoChange,
  hypothesis,
  guidance,
} from "./competitive-intelligence-demo.ts";
import { feedbackRecords, themes } from "./customer-feedback-demo.ts";

export type PortfolioExample = {
  title: string;
  label: "Public-source sample" | "Synthetic walkthrough";
  limitation: string;
  steps: readonly {
    title: string;
    body: string;
    source?: { label: string; href: string };
  }[];
  question?: {
    prompt: string;
    choices: readonly string[];
    answer: number;
    explanation: string;
  };
};

const account = demoAccounts.find((item) => item.id === "acme")!;
const signal = demoSignals.find((item) => item.id === "acme-leader")!;
const feedback = feedbackRecords.find((item) => item.id === "harbor-sales")!;
const theme = themes.find((item) => item.id === "identity")!;

/** Guided readings of existing portfolio fixtures; no collection, model calls or publication approval. */
export const portfolioExamples: Record<string, PortfolioExample> = {
  "detector-coverage-atlas": {
    title: "Read a comparison without inventing a gap",
    label: "Public-source sample",
    limitation:
      "Static portfolio sample. A source reference is not a live validation result or a current vendor ranking.",
    steps: [
      {
        title: "Inspect the source",
        body: "Start with the public TruffleHog repository and the sample table below. The table records a limited review, not an exhaustive product evaluation.",
        source: {
          label: "Public TruffleHog repository",
          href: "https://github.com/trufflesecurity/trufflehog",
        },
      },
      {
        title: "Separate the claims",
        body: "AWS keys and GitHub PATs are Covered for TruffleHog in this sample. Slack is Observed: the detector folder exists, but verification was not fully reviewed.",
      },
      {
        title: "Keep uncertainty visible",
        body: "Betterleaks and Kingfisher remain Not evaluated here. Gray means the review is missing; it does not establish missing capability.",
      },
      {
        title: "Choose the next review",
        body: "Choose one provider and credential type. Inspect its source and validation behavior before changing a coverage label. This page does not perform that validation.",
      },
    ],
  },
  "competitive-intelligence-engine": {
    title: "From a source to a field question",
    label: "Synthetic walkthrough",
    limitation:
      demoChange.detected +
      " No monitoring job runs here and no competitive claim is approved by completing this example.",
    steps: [
      {
        title: "Inspect the reference",
        body: `${demoChange.sourceLabel}. Date: ${demoChange.date}`,
        source: {
          label: "Public repository reference",
          href: demoChange.sourceUrl,
        },
      },
      {
        title: "Identify what needs review",
        body: `Illustrative wording: “${demoChange.previous}” → “${demoChange.current}”. Confirm the source and timing before treating this as a change.`,
      },
      { title: "Separate interpretation", body: hypothesis },
      {
        title: "Prepare field guidance",
        body:
          guidance +
          " A reviewer must approve the evidence and its permitted use before it becomes published enablement.",
      },
    ],
  },
  "account-intelligence": {
    title: `${account.name}: a signal and a next conversation`,
    label: "Synthetic walkthrough",
    limitation:
      "Fictional account and announcement. No real citation, account upload, research feed, model call or outreach send is represented.",
    steps: [
      {
        title: "Observe",
        body: `${signal.observed} ${signal.sourceLabel} Example date: ${signal.date}.`,
      },
      { title: "Interpret cautiously", body: signal.hypothesis },
      {
        title: "Check relevance",
        body: `${signal.angle} Confirm the organization’s priorities before assuming a project or budget.`,
      },
      {
        title: "Choose a next action",
        body:
          signal.nextStep +
          " The portfolio stops at a sample recommendation; actual research belongs in a private workspace.",
      },
    ],
  },
  "customer-feedback-intelligence": {
    title: "An access request, reviewed before a promise",
    label: "Synthetic walkthrough",
    limitation:
      "Fictional customer feedback. Reviewing a theme here does not commit a real roadmap or send a customer message.",
    steps: [
      {
        title: "Preserve the observation",
        body: `${feedback.account} (fictional), ${feedback.source}, ${feedback.date}: “${feedback.quote}” Status: ${feedback.status}.`,
      },
      {
        title: "Suggest a theme",
        body: `${theme.name}: ${theme.summary} A reviewer checks whether the notes describe the same need.`,
      },
      {
        title: "Inspect the decision",
        body: `${theme.rationale} Recorded commitment: ${theme.commitment}`,
      },
      {
        title: "Close the loop",
        body: "Prepare a follow-up that acknowledges the access problem, asks for the required provisioning workflow and states that the request is under review. Do not imply a ship date or promise a feature.",
      },
    ],
  },
  "truffle-camp": {
    title: "First Expedition: separate a finding from verification",
    label: "Synthetic walkthrough",
    limitation:
      "Independent practice exercise with fictional evidence. No credential is provided or checked. Progress stays in this page session; this is not an employer course or certification.",
    steps: [
      {
        title: "Understand the scenario",
        body: "A synthetic GitHub token is described as appearing in a public commit. No token value is shown. The goal is to explain what is observed and what still needs review.",
      },
      {
        title: "Separate detection and verification",
        body: "A pattern match is a detection observation. It does not establish whether the credential is active, its permissions or its impact.",
      },
      {
        title: "Explain the next step",
        body: "Identify the repository owner and the evidence needed for an approved review. Keep unknowns visible and never paste a real credential into the exercise.",
      },
      {
        title: "Check your explanation",
        body: "Choose the explanation that distinguishes the observation from the unverified conclusion.",
      },
    ],
    question: {
      prompt: "What can you conclude from the synthetic finding alone?",
      choices: [
        "The token is active and a breach is confirmed.",
        "A possible credential was observed; validity and impact still require approved review.",
        "Every unreviewed tool lacks this detector.",
      ],
      answer: 1,
      explanation:
        "The observation establishes a possible credential finding. Verification, impact and cross-provider coverage are separate claims that need evidence.",
    },
  },
};
