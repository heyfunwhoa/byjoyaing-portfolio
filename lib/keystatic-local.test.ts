import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { lessons } from "./ai-academy.ts";
import { managedLessonSlugs } from "./academy/managed-lessons.ts";
import { keystaticLocalEnabled } from "./keystatic-local.ts";

const root = path.resolve(import.meta.dirname, "..");

test("Keystatic local editing is off unless KEYSTATIC_LOCAL=true", () => {
  const previous = process.env.KEYSTATIC_LOCAL;
  process.env.KEYSTATIC_LOCAL = "true";
  assert.equal(keystaticLocalEnabled(), true);
  process.env.KEYSTATIC_LOCAL = "false";
  assert.equal(keystaticLocalEnabled(), false);
  delete process.env.KEYSTATIC_LOCAL;
  assert.equal(keystaticLocalEnabled(), false);
  if (previous === undefined) delete process.env.KEYSTATIC_LOCAL;
  else process.env.KEYSTATIC_LOCAL = previous;

  const layout = readFileSync(
    path.join(root, "app/keystatic/layout.tsx"),
    "utf8",
  );
  const route = readFileSync(
    path.join(root, "app/api/keystatic/[...params]/route.ts"),
    "utf8",
  );
  assert.match(layout, /keystaticLocalEnabled/);
  assert.match(layout, /notFound/);
  assert.match(layout, /robotsNoindex/);
  assert.match(route, /keystaticLocalEnabled/);
  assert.match(route, /status: 404/);
  const config = readFileSync(path.join(root, "keystatic.config.ts"), "utf8");
  assert.match(config, /kind: "local"/);
  assert.equal(config.includes('kind: "github"'), false);
});

test("the three pilot lessons are loaded from Keystatic JSON files", () => {
  const source = readFileSync(path.join(root, "lib/ai-academy.ts"), "utf8");
  for (const slug of managedLessonSlugs) {
    const lesson = lessons.find((item) => item.slug === slug);
    assert.ok(lesson, slug);
    assert.equal(typeof lesson.title, "string");
    const file = JSON.parse(
      readFileSync(
        path.join(root, "content/academy/lessons", `${slug}.json`),
        "utf8",
      ),
    ) as { title: string; slug?: string };
    assert.equal(file.title, lesson.title);
    assert.equal(file.slug, undefined);
    assert.match(source, new RegExp(`managedLesson\\("${slug}"`));
  }
});
