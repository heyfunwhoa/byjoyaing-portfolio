import { lessons } from "../ai-academy.ts";

export const lessonIds = new Set(lessons.map((lesson) => lesson.slug));
export function validLesson(value: unknown): value is string {
  return typeof value === "string" && lessonIds.has(value);
}
export function lessonHref(slug: string) {
  return validLesson(slug)
    ? `/ai-academy?lesson=${encodeURIComponent(slug)}#academy-lesson-heading`
    : "/ai-academy";
}
export type LearningRecord = {
  slug: string;
  saved: boolean;
  reviewed: boolean;
  updatedAt: string;
};
export type LearningState = {
  records: LearningRecord[];
  lastLesson: string | null;
};
export type LearningChange = {
  slug: string;
  action: "save" | "review" | "resume";
  value: boolean;
};
export function parseChange(value: unknown): LearningChange | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const row = value as Record<string, unknown>;
  if (
    Object.keys(row).sort().join() !== "action,slug,value" ||
    !validLesson(row.slug) ||
    typeof row.value !== "boolean"
  )
    return null;
  if (
    row.action !== "save" &&
    row.action !== "review" &&
    row.action !== "resume"
  )
    return null;
  if (row.action === "resume" && !row.value) return null;
  return { slug: row.slug, action: row.action, value: row.value };
}
export function sameOrigin(request: Request, origin: string) {
  return (
    request.headers.get("origin") === origin &&
    request.headers.get("sec-fetch-site") !== "cross-site"
  );
}
export const privateHeaders = {
  "Cache-Control": "private, no-store",
  Vary: "Cookie",
  "X-Robots-Tag": "noindex, nofollow",
};
export function privateJson(body: unknown, status = 200) {
  return Response.json(body, { status, headers: privateHeaders });
}
/** Read a bounded stream; do not trust the caller's Content-Length. */
export async function boundedJson(
  request: Request,
  maximum = 2048,
): Promise<unknown> {
  if (!request.headers.get("content-type")?.startsWith("application/json"))
    throw new Error("Invalid body");
  const reader = request.body?.getReader();
  if (!reader) throw new Error("Missing body");
  let size = 0;
  const chunks: Uint8Array[] = [];
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > maximum) {
        await reader.cancel();
        throw new Error("Body too large");
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.length;
  }
  return JSON.parse(new TextDecoder().decode(bytes));
}
