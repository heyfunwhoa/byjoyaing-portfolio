import competitive from "../../content/work/stories/competitive-evidence.json" with { type: "json" };
import enterprise from "../../content/work/stories/enterprise-selling.json" with { type: "json" };
import team from "../../content/work/stories/team-enablement.json" with { type: "json" };

export const workNarrativeIds = [
  "enterprise-selling",
  "team-enablement",
  "competitive-evidence",
] as const;

export type WorkNarrativeId = (typeof workNarrativeIds)[number];

const requiredKeys = [
  "title",
  "scope",
  "collaboration",
  "decision",
  "context",
  "contribution",
  "execution",
  "evidence",
  "takeaway",
  "owner",
  "reviewer",
  "contentVersion",
  "reviewDue",
  "classification",
  "publicationStatus",
] as const;

const textKeys = [
  "title",
  "scope",
  "collaboration",
  "decision",
  "context",
  "contribution",
  "execution",
  "evidence",
  "takeaway",
  "owner",
  "reviewer",
] as const;

/** Prose the Work page may render. Id, area, and links stay in code. */
export type WorkNarrativeProse = {
  id: WorkNarrativeId;
  title: string;
  scope: string;
  collaboration: string;
  decision: string;
  context: string;
  contribution: string;
  execution: string;
  evidence: string;
  takeaway: string;
};

const files: Record<WorkNarrativeId, unknown> = {
  "enterprise-selling": enterprise,
  "team-enablement": team,
  "competitive-evidence": competitive,
};

const nonempty = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;
const date = (value: unknown) =>
  typeof value === "string" &&
  /^\d{4}-\d{2}-\d{2}$/.test(value) &&
  new Date(`${value}T00:00:00Z`).toISOString().slice(0, 10) === value;

function invalid(): never {
  throw new Error(
    "Invalid Work narrative: check the story id, fields and public metadata",
  );
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

/** Build-time JSON reader. The filename id is supplied by code.
 * Unknown keys cannot own routes, areas, or related links.
 */
export function readWorkNarrative(
  id: WorkNarrativeId,
  input: unknown,
): WorkNarrativeProse {
  if (!workNarrativeIds.includes(id) || !isRecord(input)) invalid();
  const optional = "lastReviewed" in input ? ["lastReviewed"] : [];
  const allowed = new Set<string>([...requiredKeys, ...optional]);
  if (
    requiredKeys.some((key) => !(key in input)) ||
    Object.keys(input).some((key) => !allowed.has(key))
  )
    invalid();
  for (const key of textKeys) if (!nonempty(input[key])) invalid();
  if (
    !Number.isInteger(input.contentVersion) ||
    Number(input.contentVersion) < 1 ||
    !["public", "synthetic"].includes(String(input.classification)) ||
    !["draft", "review", "pilot", "published", "retired"].includes(
      String(input.publicationStatus),
    ) ||
    !date(input.reviewDue) ||
    (input.lastReviewed !== undefined && !date(input.lastReviewed))
  )
    invalid();

  return {
    id,
    title: input.title as string,
    scope: input.scope as string,
    collaboration: input.collaboration as string,
    decision: input.decision as string,
    context: input.context as string,
    contribution: input.contribution as string,
    execution: input.execution as string,
    evidence: input.evidence as string,
    takeaway: input.takeaway as string,
  };
}

export const workNarratives: WorkNarrativeProse[] = workNarrativeIds.map((id) =>
  readWorkNarrative(id, files[id]),
);
