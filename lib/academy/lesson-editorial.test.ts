import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import mcpRecord from "../../content/academy/lessons/mcp-vs-rest-api.json" with { type: "json" };
import readingRecord from "../../content/academy/lessons/reading-code-and-yaml.json" with { type: "json" };
import { lessons } from "../ai-academy.ts";
import { progressKey, parseProgress } from "./click-mission.ts";
import { getLessonGuidance } from "./lesson-guidance.ts";
import { readLessonEditorial } from "./lesson-editorial.ts";

const catalog = readFileSync(new URL("../ai-academy.ts", import.meta.url), "utf8");

test("the two lesson singletons feed the catalog and leave checks in code", () => {
  for (const [record, checkQuestion] of [
    [
      readingRecord,
      "A YAML file parses, but verified is at the root instead of inside account. What does that tell you?",
    ],
    [
      mcpRecord,
      "A Sumble-like provider offers an MCP tool that reveals contact details. What does MCP access prove?",
    ],
  ] as const) {
    const matches = lessons.filter((lesson) => lesson.slug === record.id);
    assert.equal(matches.length, 1);
    const lesson = matches[0];
    assert.equal(lesson.summary, record.summary);
    assert.equal(lesson.title, record.title);
    assert.deepEqual(lesson.sources, record.sources);
    assert.equal(lesson.check.question, checkQuestion);
    assert.equal(lesson.check.answer, 1);
    assert.ok(lesson.companion?.url.startsWith("https://github.com/"));
    assert.equal(catalog.includes(record.summary), false);
  }
  assert.deepEqual(getLessonGuidance("reading-code-and-yaml")?.prerequisites, []);
  assert.deepEqual(getLessonGuidance("mcp-vs-rest-api")?.prerequisites, [
    "privacy",
  ]);
});

test("a changed id, answer key, or empty sentence fails closed", () => {
  for (const [id, record] of [
    ["reading-code-and-yaml", readingRecord],
    ["mcp-vs-rest-api", mcpRecord],
  ] as const) {
    assert.equal(readLessonEditorial(id, record).title, record.title);
    for (const change of [
      { id: "renamed" },
      { slug: id },
      { check: { answer: 0 } },
      { companion: { label: "x", url: "https://example.com" } },
      { prerequisites: [] },
      { title: " " },
      { classification: "private" },
      { sources: [{ label: "bad", url: "http://example.com" }] },
    ])
      assert.throws(() => readLessonEditorial(id, { ...record, ...change }));
  }
  assert.throws(() => readLessonEditorial("reading-code-and-yaml", null));
});

test("Follow one click progress stays on the existing mcp lesson id", () => {
  const fixture = {
    version: 1,
    lessonId: "mcp-vs-rest-api",
    activityId: "follow-one-click",
    step: 2,
    reviewed: true,
    practiced: true,
    passedCheckIds: ["denied-message"],
  };
  assert.equal(
    progressKey,
    "academy:practice:mcp-vs-rest-api:follow-one-click:v1",
  );
  readLessonEditorial("mcp-vs-rest-api", { ...mcpRecord, contentVersion: 2 });
  assert.deepEqual(parseProgress(JSON.stringify(fixture)), fixture);
});
