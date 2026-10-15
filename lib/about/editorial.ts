import record from "../../content/about/page.json" with { type: "json" };

const requiredKeys = [
  "id",
  "metaDescription",
  "eyebrow",
  "headline",
  "lead",
  "philosophyLabel",
  "philosophyHeading",
  "principles",
  "leadershipApproach",
  "approachEyebrow",
  "approachHeading",
  "approachIntro",
  "careerHeading",
  "careerIntro",
  "educationHeading",
  "education",
  "practiceEyebrow",
  "practiceHeading",
  "practiceIntro",
  "exploreHeading",
  "beyondLabel",
  "beyondHeading",
  "beyondIntro",
  "interests",
  "valuesLabel",
  "values",
  "contactHeading",
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
  "philosophyLabel",
  "philosophyHeading",
  "leadershipApproach",
  "approachEyebrow",
  "approachHeading",
  "approachIntro",
  "careerHeading",
  "careerIntro",
  "educationHeading",
  "practiceEyebrow",
  "practiceHeading",
  "practiceIntro",
  "exploreHeading",
  "beyondLabel",
  "beyondHeading",
  "beyondIntro",
  "valuesLabel",
  "contactHeading",
  "owner",
  "reviewer",
] as const;

export type AboutPrinciple = { name: string; body: string };
export type AboutInterest = {
  id: string;
  title: string;
  detail: string;
  connection: string;
};

/** Public fields the About page may render. Governance metadata stays out of the view. */
export type AboutPage = {
  metaDescription: string;
  eyebrow: string;
  headline: string;
  lead: string[];
  philosophyLabel: string;
  philosophyHeading: string;
  principles: AboutPrinciple[];
  leadershipApproach: string;
  approachEyebrow: string;
  approachHeading: string;
  approachIntro: string;
  careerHeading: string;
  careerIntro: string;
  educationHeading: string;
  education: string[];
  practiceEyebrow: string;
  practiceHeading: string;
  practiceIntro: string;
  exploreHeading: string;
  beyondLabel: string;
  beyondHeading: string;
  beyondIntro: string;
  interests: AboutInterest[];
  valuesLabel: string;
  values: string[];
  contactHeading: string;
};

const nonempty = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;
const slug = (value: unknown): value is string =>
  typeof value === "string" && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);
const date = (value: unknown) =>
  typeof value === "string" &&
  /^\d{4}-\d{2}-\d{2}$/.test(value) &&
  new Date(`${value}T00:00:00Z`).toISOString().slice(0, 10) === value;

function invalid(): never {
  throw new Error(
    "Invalid About editorial record: check identity, fields and public metadata",
  );
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function exactKeys(value: Record<string, unknown>, keys: readonly string[]) {
  const actual = Object.keys(value);
  return actual.length === keys.length && keys.every((key) => key in value);
}

function strings(value: unknown, min: number): string[] {
  if (!Array.isArray(value) || value.length < min || !value.every(nonempty))
    invalid();
  return value;
}

function principles(value: unknown): AboutPrinciple[] {
  if (!Array.isArray(value) || value.length < 3) invalid();
  return value.map((item) => {
    if (!isRecord(item) || !exactKeys(item, ["name", "body"])) invalid();
    if (!nonempty(item.name) || !nonempty(item.body)) invalid();
    return { name: item.name, body: item.body };
  });
}

function interests(value: unknown): AboutInterest[] {
  if (!Array.isArray(value) || value.length < 1) invalid();
  const seen = new Set<string>();
  return value.map((item) => {
    if (
      !isRecord(item) ||
      !exactKeys(item, ["id", "title", "detail", "connection"])
    )
      invalid();
    if (
      !slug(item.id) ||
      !nonempty(item.title) ||
      !nonempty(item.detail) ||
      !nonempty(item.connection) ||
      seen.has(item.id)
    )
      invalid();
    seen.add(item.id);
    return {
      id: item.id,
      title: item.title,
      detail: item.detail,
      connection: item.connection,
    };
  });
}

/** Build-time JSON reader. Reject unknown keys so the file cannot own routes, roles, or components.
 * Editorial status is metadata. Merging the reviewed file is the publication decision.
 */
export function readAboutEditorial(input: unknown): AboutPage {
  if (!isRecord(input)) invalid();
  const optional = "lastReviewed" in input ? ["lastReviewed"] : [];
  const allowed = new Set<string>([...requiredKeys, ...optional]);
  if (
    requiredKeys.some((key) => !(key in input)) ||
    Object.keys(input).some((key) => !allowed.has(key))
  )
    invalid();
  if (input.id !== "about") invalid();
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

  const lead = strings(input.lead, 1);
  const education = strings(input.education, 1);
  const values = strings(input.values, 3);
  return {
    metaDescription: input.metaDescription as string,
    eyebrow: input.eyebrow as string,
    headline: input.headline as string,
    lead,
    philosophyLabel: input.philosophyLabel as string,
    philosophyHeading: input.philosophyHeading as string,
    principles: principles(input.principles),
    leadershipApproach: input.leadershipApproach as string,
    approachEyebrow: input.approachEyebrow as string,
    approachHeading: input.approachHeading as string,
    approachIntro: input.approachIntro as string,
    careerHeading: input.careerHeading as string,
    careerIntro: input.careerIntro as string,
    educationHeading: input.educationHeading as string,
    education,
    practiceEyebrow: input.practiceEyebrow as string,
    practiceHeading: input.practiceHeading as string,
    practiceIntro: input.practiceIntro as string,
    exploreHeading: input.exploreHeading as string,
    beyondLabel: input.beyondLabel as string,
    beyondHeading: input.beyondHeading as string,
    beyondIntro: input.beyondIntro as string,
    interests: interests(input.interests),
    valuesLabel: input.valuesLabel as string,
    values,
    contactHeading: input.contactHeading as string,
  };
}

export const aboutPage = readAboutEditorial(record);
