import type { Lesson, Track } from "../ai-academy.ts";

const tracks = new Set<Track>([
  "Foundations",
  "Prompting",
  "Responsible AI",
  "GTM",
  "Builder",
]);
const levels = new Set<Lesson["level"]>(["Beginner", "Intermediate"]);

export const managedLessonSlugs = [
  "cms-fundamentals",
  "reading-code-and-yaml",
  "frontend-building-blocks",
] as const;

type ManagedLessonSlug = (typeof managedLessonSlugs)[number];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function requiredString(value: unknown, label: string): string {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`${label} must be a non-empty string`);
  }
  return value;
}

function requiredStrings(value: unknown, label: string): string[] {
  if (
    !Array.isArray(value) ||
    value.length === 0 ||
    value.some((item) => typeof item !== "string" || item.trim().length === 0)
  ) {
    throw new Error(`${label} must be a non-empty list of strings`);
  }
  return value;
}

function requiredLink(
  value: unknown,
  label: string,
): { label: string; url: string } {
  if (!isRecord(value)) throw new Error(`${label} must be an object`);
  const url = requiredString(value.url, `${label} url`);
  if (!url.startsWith("https://"))
    throw new Error(`${label} url must start with https://`);
  return { label: requiredString(value.label, `${label} label`), url };
}

export function managedLesson(slug: ManagedLessonSlug, data: unknown): Lesson {
  if (!isRecord(data))
    throw new Error(`${slug} lesson file must be a JSON object`);

  const track = data.track;
  const level = data.level;
  if (typeof track !== "string" || !tracks.has(track as Track)) {
    throw new Error(`${slug} has an unknown track`);
  }
  if (typeof level !== "string" || !levels.has(level as Lesson["level"])) {
    throw new Error(`${slug} has an unknown level`);
  }
  const minutes = data.minutes;
  if (
    typeof minutes !== "number" ||
    !Number.isInteger(minutes) ||
    minutes < 1
  ) {
    throw new Error(`${slug} minutes must be a positive integer`);
  }

  const check = data.check;
  if (!isRecord(check)) throw new Error(`${slug} is missing a knowledge check`);
  const choices = requiredStrings(check.choices, `${slug} choices`);
  const answer = check.answer;
  if (
    typeof answer !== "number" ||
    !Number.isInteger(answer) ||
    answer < 0 ||
    answer >= choices.length
  ) {
    throw new Error(`${slug} answer must be an index into choices`);
  }

  const sources = data.sources;
  if (!Array.isArray(sources) || sources.length === 0) {
    throw new Error(`${slug} needs at least one source`);
  }

  const lesson: Lesson = {
    slug,
    title: requiredString(data.title, `${slug} title`),
    track: track as Track,
    minutes,
    level: level as Lesson["level"],
    summary: requiredString(data.summary, `${slug} summary`),
    analogy: requiredString(data.analogy, `${slug} analogy`),
    takeaways: requiredStrings(data.takeaways, `${slug} takeaways`),
    exercise: requiredString(data.exercise, `${slug} exercise`),
    check: {
      question: requiredString(check.question, `${slug} question`),
      choices,
      answer,
      explanation: requiredString(check.explanation, `${slug} explanation`),
    },
    sources: sources.map((source, index) =>
      requiredLink(source, `${slug} source ${index + 1}`),
    ),
  };

  if (data.companion !== undefined) {
    lesson.companion = requiredLink(data.companion, `${slug} companion`);
  }

  return lesson;
}
