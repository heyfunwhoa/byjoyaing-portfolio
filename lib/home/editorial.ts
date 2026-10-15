import record from "../../content/home/page.json" with { type: "json" };

const requiredKeys = [
  "id",
  "metaDescription",
  "eyebrow",
  "headline",
  "headlineAccent",
  "philosophy",
  "body",
  "caption",
  "owner",
  "reviewer",
  "contentVersion",
  "reviewDue",
  "classification",
  "publicationStatus",
] as const;

const textKeys = [
  "metaDescription",
  "eyebrow",
  "headline",
  "headlineAccent",
  "philosophy",
  "body",
  "caption",
  "owner",
  "reviewer",
] as const;

/** Public cover fields the homepage may render. Governance metadata stays out of the view. */
export type HomeCover = {
  metaDescription: string;
  eyebrow: string;
  headline: string;
  headlineAccent: string;
  philosophy: string;
  body: string;
  caption: string;
};

const nonempty = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;
const date = (value: unknown) =>
  typeof value === "string" &&
  /^\d{4}-\d{2}-\d{2}$/.test(value) &&
  new Date(`${value}T00:00:00Z`).toISOString().slice(0, 10) === value;

function invalid(): never {
  throw new Error(
    "Invalid Home editorial record: check identity, fields and public metadata",
  );
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

/** Build-time JSON reader. Reject unknown keys so the file cannot own routes, roles, or the bento.
 * Editorial status is metadata. Merging the reviewed file is the publication decision.
 */
export function readHomeEditorial(input: unknown): HomeCover {
  if (!isRecord(input)) invalid();
  const optional = "lastReviewed" in input ? ["lastReviewed"] : [];
  const allowed = new Set<string>([...requiredKeys, ...optional]);
  if (
    requiredKeys.some((key) => !(key in input)) ||
    Object.keys(input).some((key) => !allowed.has(key))
  )
    invalid();
  if (input.id !== "home") invalid();
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
    metaDescription: input.metaDescription as string,
    eyebrow: input.eyebrow as string,
    headline: input.headline as string,
    headlineAccent: input.headlineAccent as string,
    philosophy: input.philosophy as string,
    body: input.body as string,
    caption: input.caption as string,
  };
}

export const homePage = readHomeEditorial(record);
