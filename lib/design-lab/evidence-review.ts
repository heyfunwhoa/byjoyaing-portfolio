/**
 * Fictional evidence-review fixtures for the local Design Lab only.
 *
 * They are not customer signals, verified market facts, security findings, CRM
 * records or publication approval. Every source identifier is a local example.
 */
export const evidenceReviewStates = [
  "reviewed",
  "stale",
  "missing",
  "restricted",
] as const;

export type EvidenceReviewState = (typeof evidenceReviewStates)[number];
export type EvidenceReviewScenario = {
  id: EvidenceReviewState;
  title: string;
  summary: string;
  interpretation: string;
  source: {
    id: string | null;
    label: string;
    observedOn: string | null;
    reviewedOn: string | null;
    observation: string | null;
    reviewNote: string;
  };
  nextQuestion: string;
};

const fictionalTitle = "Fictional service-team workflow hypothesis";
const fictionalSummary =
  "A sample operator describes repeating the same source-review steps across multiple fictional customer workspaces.";

export const evidenceReviewScenarios: Record<EvidenceReviewState, EvidenceReviewScenario> = {
  reviewed: {
    id: "reviewed",
    title: fictionalTitle,
    summary: fictionalSummary,
    interpretation: "There may be a reusable review workflow worth investigating, but one synthetic example does not establish demand.",
    source: {
      id: "FIXTURE-SRC-001",
      label: "Fictional discovery note (local fixture)",
      observedOn: "2026-10-19",
      reviewedOn: "2026-11-07",
      observation: "In a fictional interview, the operator said they reviewed each workspace separately.",
      reviewNote: "Sample source inspected. The note is fictional; its status does not certify the interpretation.",
    },
    nextQuestion: "What exactly gets repeated, how often, and which step requires an authorized reviewer?",
  },
  stale: {
    id: "stale",
    title: fictionalTitle,
    summary: fictionalSummary,
    interpretation: "The old note cannot support a current product decision without refreshed evidence.",
    source: {
      id: "FIXTURE-SRC-OLD",
      label: "Outdated fictional note (local fixture)",
      observedOn: "2025-09-10",
      reviewedOn: null,
      observation: "An invented older note mentions a repetitive review task.",
      reviewNote: "This exercise explicitly labels the source stale; do not imply a fresh observation or a completed review.",
    },
    nextQuestion: "Which current, permitted source could confirm whether this workflow still exists?",
  },
  missing: {
    id: "missing",
    title: fictionalTitle,
    summary: fictionalSummary,
    interpretation: "The hypothesis has no source attached. Do not present it as a verified observation.",
    source: {
      id: null,
      label: "No source attached",
      observedOn: null,
      reviewedOn: null,
      observation: null,
      reviewNote: "Evidence is missing. An appealing summary is not a substitute for provenance.",
    },
    nextQuestion: "Who can supply an original, dated and permissible source for review?",
  },
  restricted: {
    id: "restricted",
    title: fictionalTitle,
    summary: fictionalSummary,
    interpretation: "Source access has not been authorized, so the underlying observation cannot be inspected.",
    source: {
      id: null,
      label: "Source access restricted in this example",
      observedOn: null,
      reviewedOn: null,
      observation: null,
      reviewNote: "Do not show guessed content or treat access denial as a negative finding.",
    },
    nextQuestion: "Who owns access approval, and can a permitted public or synthetic substitute be used?",
  },
};

export const evidenceReviewLabels: Record<EvidenceReviewState, string> = {
  reviewed: "Reviewed sample",
  stale: "Stale source",
  missing: "Missing evidence",
  restricted: "Access restricted",
};

export function evidenceReviewReadiness(record: EvidenceReviewScenario): {
  canProposeNextStep: boolean;
  message: string;
} {
  // This is a UI eligibility hint only, never a data-source or permission gate.
  if (
    record.id === "reviewed" &&
    record.source.id &&
    record.source.observation &&
    record.source.observedOn &&
    record.source.reviewedOn
  ) {
    return {
      canProposeNextStep: true,
      message: "Reviewed *fictional* source available for a human-led follow-up. No action is approved or sent.",
    };
  }

  const blockers: Record<Exclude<EvidenceReviewState, "reviewed">, string> = {
    stale: "A current source review is needed before treating the hypothesis as actionable.",
    missing: "Original source and provenance are required before progressing.",
    restricted: "Authorized source access or an acceptable replacement is required before progressing.",
  };
  return {
    canProposeNextStep: false,
    message: blockers[record.id === "reviewed" ? "missing" : record.id],
  };
}
