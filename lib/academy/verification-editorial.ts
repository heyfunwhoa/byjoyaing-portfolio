import record from "../../content/academy/lessons/verification.json" with { type: "json" };
import type { Lesson } from "../ai-academy.ts";

type Editorial = Omit<Lesson, "slug" | "check" | "companion">;
const keys = [
  "id",
  "title",
  "track",
  "minutes",
  "level",
  "summary",
  "analogy",
  "takeaways",
  "exercise",
  "sources",
  "owner",
  "reviewer",
  "contentVersion",
  "lastReviewed",
  "reviewDue",
  "classification",
  "publicationStatus",
];
const nonempty = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;
const date = (value: unknown) =>
  typeof value === "string" &&
  /^\d{4}-\d{2}-\d{2}$/.test(value) &&
  new Date(value).toISOString().slice(0, 10) === value;

/** Build-time JSON reader adapter. No CMS runtime or filesystem in the learner bundle.
 * Reject unknown keys instead of letting public content override checks/progress.
 * Editorial status is metadata; the reviewed Git commit is the publication unit.
 */
export function readVerificationEditorial(input: unknown): Editorial {
  if (!input || typeof input !== "object" || Array.isArray(input))
    throw new Error("Invalid verification editorial record");
  const value = input as Record<string, unknown>;
  const invalid = () => {
    throw new Error(
      "Invalid verification editorial record: check identity, fields and public metadata",
    );
  };
  if (
    keys.some((key) => key !== "lastReviewed" && !(key in value)) ||
    Object.keys(value).some((key) => !keys.includes(key))
  )
    invalid();
  if (value.id !== "verification") invalid();
  for (const key of [
    "title",
    "summary",
    "analogy",
    "exercise",
    "owner",
    "reviewer",
  ])
    if (!nonempty(value[key])) invalid();
  if (
    !["Foundations", "Prompting", "Responsible AI", "GTM", "Builder"].includes(
      String(value.track),
    ) ||
    !["Beginner", "Intermediate"].includes(String(value.level))
  )
    invalid();
  for (const key of ["minutes", "contentVersion"])
    if (!Number.isInteger(value[key]) || Number(value[key]) < 1) invalid();
  if (
    !Array.isArray(value.takeaways) ||
    !value.takeaways.length ||
    !value.takeaways.every(nonempty)
  )
    invalid();
  if (
    !Array.isArray(value.sources) ||
    !value.sources.length ||
    !value.sources.every((source) => {
      if (
        !source ||
        Object.keys(source).sort().join() !== "label,url" ||
        !nonempty(source.label) ||
        !nonempty(source.url)
      )
        return false;
      try {
        const url = new URL(source.url);
        return url.protocol === "https:" && !url.username && !url.password;
      } catch {
        return false;
      }
    })
  )
    invalid();
  if (
    !["public", "synthetic"].includes(String(value.classification)) ||
    !["draft", "review", "pilot", "published", "retired"].includes(
      String(value.publicationStatus),
    )
  )
    invalid();
  if (
    (value.lastReviewed !== undefined && !date(value.lastReviewed)) ||
    !date(value.reviewDue)
  )
    invalid();
  // Explicit projection: ownership metadata and any future fields cannot become app state.
  return {
    title: value.title as string,
    track: value.track as Lesson["track"],
    minutes: value.minutes as number,
    level: value.level as Lesson["level"],
    summary: value.summary as string,
    analogy: value.analogy as string,
    takeaways: value.takeaways as string[],
    exercise: value.exercise as string,
    sources: value.sources as Lesson["sources"],
  };
}

export const verificationEditorial = readVerificationEditorial(record);
