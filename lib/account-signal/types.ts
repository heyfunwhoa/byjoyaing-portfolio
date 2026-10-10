export type PublicSnapshot = {
  url: string;
  retrievedAt: string;
  body: string;
  provenanceNote: string;
};

export type SubjectResolution = "verified" | "unresolved";

export type VerifiedFact = {
  kind: "verified";
  statement: string;
  quote: string;
  sourceUrl: string;
};

export type Hypothesis = {
  kind: "hypothesis";
  statement: string;
  basis: string;
};

export type ResearchBrief = {
  subject: {
    name: string;
    domain: string;
    resolution: SubjectResolution;
  };
  verifiedFacts: VerifiedFact[];
  hypotheses: Hypothesis[];
  unavailable: string[];
  source: {
    url: string;
    retrievedAt: string;
    contentHash: string;
    provenanceNote: string;
  };
};

export type StoredSource = {
  url: string;
  retrievedAt: string;
  contentHash: string;
  provenanceNote: string;
  text: string;
  brief: ResearchBrief;
};

export type IngestResult =
  | { status: "stored"; record: StoredSource }
  | { status: "duplicate"; record: StoredSource }
  | {
      status: "conflict";
      record: StoredSource;
      incomingHash: string;
    }
  | { status: "rejected"; reason: string };
