import { htmlToText, readMetaDescription, readTitle } from "./source.ts";
import type { Hypothesis, ResearchBrief, VerifiedFact } from "./types.ts";

const SUBJECT = {
  name: "LimaCharlie",
  domain: "limacharlie.io",
} as const;

const UNAVAILABLE = [
  "Pricing is not stated in this snapshot.",
  "Customer names and customer counts are not stated in this snapshot.",
  "Funding and headcount are not stated in this snapshot.",
  "Whether any specific account has purchased this product is not stated in this snapshot.",
];

export function buildBrief(input: {
  url: string;
  retrievedAt: string;
  contentHash: string;
  provenanceNote: string;
  body: string;
}): { brief: ResearchBrief; text: string } {
  const text = htmlToText(input.body);
  const namePresent = text.includes(SUBJECT.name);
  const verifiedFacts: VerifiedFact[] = [];

  const title = readTitle(input.body);
  if (title && text.includes("What is LimaCharlie?")) {
    verifiedFacts.push({
      kind: "verified",
      statement: "The page title names the document.",
      quote: title,
      sourceUrl: input.url,
    });
  }

  const positioning =
    "LimaCharlie is the Agentic SecOps Workspace - delivering security operations for the modern era.";
  if (text.includes(positioning)) {
    verifiedFacts.push({
      kind: "verified",
      statement: "The documentation defines the product in its own words.",
      quote: positioning,
      sourceUrl: input.url,
    });
  }

  const capabilities =
    "With open APIs, centralized telemetry, and automated detection and response mechanisms";
  if (text.includes(capabilities)) {
    verifiedFacts.push({
      kind: "verified",
      statement: "The documentation lists capabilities of the workspace.",
      quote: capabilities,
      sourceUrl: input.url,
    });
  }

  const description = readMetaDescription(input.body);
  if (description) {
    verifiedFacts.push({
      kind: "verified",
      statement: "The page meta description describes the documentation.",
      quote: description,
      sourceUrl: input.url,
    });
  }

  const hypotheses: Hypothesis[] = [];
  if (text.includes(positioning) && text.includes(capabilities)) {
    hypotheses.push({
      kind: "hypothesis",
      statement:
        "A buyer might treat LimaCharlie as a platform for assembling security operations, not only as one closed product.",
      basis:
        "The page says it is an Agentic SecOps Workspace and mentions open APIs, centralized telemetry, and automated detection and response. It does not name buyers, price, or products it replaces.",
    });
  }

  return {
    text,
    brief: {
      subject: {
        name: SUBJECT.name,
        domain: SUBJECT.domain,
        resolution: namePresent ? "verified" : "unresolved",
      },
      verifiedFacts,
      hypotheses,
      unavailable: UNAVAILABLE,
      source: {
        url: input.url,
        retrievedAt: input.retrievedAt,
        contentHash: input.contentHash,
        provenanceNote: input.provenanceNote,
      },
    },
  };
}
