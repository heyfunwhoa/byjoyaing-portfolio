import { readdirSync } from "node:fs";
import path from "node:path";
import enterpriseSelling from "../../content/work/stories/enterprise-selling.json" with { type: "json" };
import teamEnablement from "../../content/work/stories/team-enablement.json" with { type: "json" };
import competitiveEvidence from "../../content/work/stories/competitive-evidence.json" with { type: "json" };
import { storyFacts, type StoryId } from "./story-facts.ts";

const requiredKeys = [
  "id",
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

/** Public sentences the Work explorer may render. Governance metadata stays out of the view. */
export type WorkNarrative = {
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

const storiesDirectory = path.join(process.cwd(), "content", "work", "stories");

const nonempty = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;
const date = (value: unknown) =>
  typeof value === "string" &&
  /^\d{4}-\d{2}-\d{2}$/.test(value) &&
  new Date(`${value}T00:00:00Z`).toISOString().slice(0, 10) === value;

function invalid(reason: string): never {
  throw new Error(`Invalid Work narrative collection: ${reason}`);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function readNarrative(id: StoryId, input: unknown): WorkNarrative {
  if (!isRecord(input)) invalid(`missing record for ${id}`);
  const optional = "lastReviewed" in input ? ["lastReviewed"] : [];
  const allowed = new Set<string>([...requiredKeys, ...optional]);
  if (
    requiredKeys.some((key) => !(key in input)) ||
    Object.keys(input).some((key) => !allowed.has(key))
  )
    invalid(`check fields for ${id}`);
  if (input.id !== id) invalid(`story id does not match ${id}.json`);
  for (const key of textKeys)
    if (!nonempty(input[key])) invalid(`empty ${key} in ${id}`);
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
    invalid(`check public metadata for ${id}`);

  return {
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

/** Build-time reader. One file per existing id. Extra files, missing files, unknown keys, and empty prose fail closed.
 * Editorial status is metadata. Merging the reviewed file is the publication decision.
 */
export function readWorkNarratives(
  files: readonly string[],
  records: Readonly<Record<string, unknown>>,
): Record<StoryId, WorkNarrative> {
  const expected = storyFacts.map((story) => `${story.id}.json`).sort();
  const actual = [...files].sort();
  if (
    actual.length !== expected.length ||
    actual.some((file, index) => file !== expected[index])
  )
    invalid("expected exactly the existing story files");

  const narratives = {} as Record<StoryId, WorkNarrative>;
  for (const story of storyFacts) {
    narratives[story.id] = readNarrative(story.id, records[story.id]);
  }
  return narratives;
}

export const workNarratives = readWorkNarratives(
  readdirSync(storiesDirectory),
  {
    "enterprise-selling": enterpriseSelling,
    "team-enablement": teamEnablement,
    "competitive-evidence": competitiveEvidence,
  },
);
