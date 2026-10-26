import enterpriseDeal from "../../content/field-notes/guides/enterprise-deal.json" with { type: "json" };
import multithreading from "../../content/field-notes/guides/multithreading.json" with { type: "json" };

export const fieldNoteIds = ["enterprise-deal", "multithreading"] as const;
export type FieldNoteId = (typeof fieldNoteIds)[number];

const partNames = ["kicker", "heading", "body", "note"] as const;
type PartName = (typeof partNames)[number];

export type FieldNoteSection = Record<PartName, string>;
export type FieldNoteLink = { label: string; href: string };

const sectionContract: Record<FieldNoteId, Record<string, readonly PartName[]>> = {
  "enterprise-deal": {
    "use-when": ["body"],
    orientation: ["body"],
    disclaimer: ["body"],
    learning: ["heading", "body"],
  },
  multithreading: {
    seller: ["body"],
    "use-when": ["body"],
    principles: ["heading"],
    who: ["heading", "body"],
    validated: ["heading", "body"],
    conversation: ["heading", "body"],
    coaching: ["heading", "body"],
    access: ["kicker", "heading", "body", "note"],
    research: ["body"],
  },
};

/** Routes stay in code. The editor may change a label; it may not point the link somewhere new. */
const linkContract: Record<FieldNoteId, Record<string, string>> = {
  "enterprise-deal": {
    experience: "/work#enterprise-sales",
    playbook: "/field-notes/multithreading",
    request: "/contact?playbook=enterprise-deal",
    "related-note": "/field-notes/multithreading",
    "related-work": "/work",
  },
  multithreading: {
    experience: "/work#enterprise-sales",
    request: "/contact?playbook=multithreading#access",
    deal: "/field-notes/enterprise-deal",
    "related-note": "/field-notes/enterprise-deal",
    "related-work": "/work",
  },
};

const recordKeys = [
  "title",
  "headline",
  "eyebrow",
  "standfirst",
  "metaDescription",
  "limitations",
  "sections",
  "links",
  "owner",
  "reviewer",
  "contentVersion",
  "reviewDue",
  "classification",
  "publicationStatus",
] as const;

const proseKeys = [
  "title",
  "headline",
  "eyebrow",
  "standfirst",
  "metaDescription",
  "limitations",
  "owner",
  "reviewer",
] as const;

export type FieldNoteBody = {
  id: FieldNoteId;
  title: string;
  headline: string;
  eyebrow: string;
  standfirst: string;
  metaDescription: string;
  limitations: string;
  sections: Record<string, FieldNoteSection>;
  links: Record<string, FieldNoteLink>;
};

const nonempty = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;
const date = (value: unknown) =>
  typeof value === "string" &&
  /^\d{4}-\d{2}-\d{2}$/.test(value) &&
  new Date(`${value}T00:00:00Z`).toISOString().slice(0, 10) === value;

function invalid(): never {
  throw new Error(
    "Invalid Field Note: check the guide id, fields, links and public metadata",
  );
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

/** Build-time JSON reader. Filename ids and hrefs stay owned by this module.
 * Illustrative status, the source registry, and unpublished titles stay outside the record.
 * Editorial status is metadata. Merging the reviewed file is the publication decision.
 */
export function readFieldNote(id: FieldNoteId, input: unknown): FieldNoteBody {
  if (!fieldNoteIds.includes(id) || !isRecord(input)) invalid();
  const optional = "lastReviewed" in input ? ["lastReviewed"] : [];
  const allowed = new Set<string>([...recordKeys, ...optional]);
  if (
    recordKeys.some((key) => !(key in input)) ||
    Object.keys(input).some((key) => !allowed.has(key))
  )
    invalid();
  for (const key of proseKeys) if (!nonempty(input[key])) invalid();
  if (id === "enterprise-deal" && input.headline !== input.title) invalid();
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
  if (!Array.isArray(input.sections) || !Array.isArray(input.links)) invalid();

  const expectedSections = sectionContract[id];
  const sections: Record<string, FieldNoteSection> = {};
  for (const item of input.sections) {
    if (
      !isRecord(item) ||
      Object.keys(item).some(
        (key) => !["body", "heading", "key", "kicker", "note"].includes(key),
      ) ||
      !nonempty(item.key) ||
      typeof item.key !== "string" ||
      !(item.key in expectedSections) ||
      item.key in sections
    )
      invalid();
    const required = new Set(expectedSections[item.key]);
    const section = {} as FieldNoteSection;
    for (const part of partNames) {
      const value = item[part] === undefined ? "" : item[part];
      if (typeof value !== "string") invalid();
      if (required.has(part) ? !nonempty(value) : value !== "") invalid();
      section[part] = value;
    }
    sections[item.key] = section;
  }
  if (Object.keys(sections).length !== Object.keys(expectedSections).length)
    invalid();

  const expectedLinks = linkContract[id];
  const links: Record<string, FieldNoteLink> = {};
  for (const item of input.links) {
    if (
      !isRecord(item) ||
      Object.keys(item).sort().join() !== "href,key,label" ||
      typeof item.key !== "string" ||
      !(item.key in expectedLinks) ||
      item.key in links ||
      !nonempty(item.label) ||
      item.href !== expectedLinks[item.key]
    )
      invalid();
    links[item.key] = { label: item.label, href: item.href };
  }
  if (Object.keys(links).length !== Object.keys(expectedLinks).length) invalid();

  return {
    id,
    title: input.title as string,
    headline: input.headline as string,
    eyebrow: input.eyebrow as string,
    standfirst: input.standfirst as string,
    metaDescription: input.metaDescription as string,
    limitations: input.limitations as string,
    sections,
    links,
  };
}

export const fieldNoteBodies = {
  "enterprise-deal": readFieldNote("enterprise-deal", enterpriseDeal),
  multithreading: readFieldNote("multithreading", multithreading),
};
