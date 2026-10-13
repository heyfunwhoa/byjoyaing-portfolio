import test from "node:test";
import assert from "node:assert/strict";
import record from "../../content/academy/lessons/verification.json" with { type: "json" };
import { lessons } from "../ai-academy.ts";
import { readVerificationEditorial } from "./verification-editorial.ts";
import {
  localEditorEnabled,
  localEditorRequestAllowed,
} from "./keystatic-access.ts";
import { getLessonGuidance } from "./lesson-guidance.ts";
import { parseProgress, progressKey } from "./click-mission.ts";

test("one editorial record feeds the existing lesson without owning its check or prerequisites", () => {
  const pilot = lessons.filter((lesson) => lesson.slug === "verification");
  assert.equal(pilot.length, 1);
  assert.equal(pilot[0].summary, record.summary);
  assert.deepEqual(pilot[0].sources, record.sources);
  assert.deepEqual(pilot[0].check, {
    question: "A generated citation proves a claim is true.",
    choices: ["True", "False"],
    answer: 1,
    explanation:
      "Citations can be irrelevant, stale or invented; inspect the actual source.",
  });
  assert.deepEqual(getLessonGuidance("verification")?.prerequisites, []);
  assert.equal(
    readVerificationEditorial({
      ...record,
      summary: "Edited in a review branch",
    }).summary,
    "Edited in a review branch",
  );
});

test("invalid or code-owned content fails closed instead of silently falling back", () => {
  for (const change of [
    { id: "renamed" },
    { check: { answer: 0 } },
    { reviewed: true },
    { prerequisites: [] },
    { classification: "private" },
    { title: "" },
    { minutes: -1 },
    { takeaways: [] },
    { contentVersion: 0 },
    { publicationStatus: "approved" },
    { reviewDue: "2026-02-30" },
    { sources: [{ label: "unsafe", url: "javascript:alert(1)" }] },
  ])
    assert.throws(() => readVerificationEditorial({ ...record, ...change }));
  assert.throws(() => readVerificationEditorial(null));
});

test("the existing v1 progress fixture survives editorial changes without awarding checks", () => {
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
  readVerificationEditorial({ ...record, contentVersion: 2 });
  assert.deepEqual(parseProgress(JSON.stringify(fixture)), fixture);
  assert.deepEqual(
    parseProgress(JSON.stringify({ ...fixture, practiced: false }))
      .passedCheckIds,
    [],
  );
});

test("local editor needs explicit development opt-in and a same-origin loopback request", () => {
  assert.equal(
    localEditorEnabled({ NODE_ENV: "development", KEYSTATIC_LOCAL: "true" }),
    true,
  );
  for (const env of [
    {},
    { NODE_ENV: "development" },
    { NODE_ENV: "production", KEYSTATIC_LOCAL: "true" },
    { NODE_ENV: "test", KEYSTATIC_LOCAL: "true" },
  ])
    assert.equal(localEditorEnabled(env), false);
  const request = (host: string, origin?: string) =>
    new Request("http://127.0.0.1:3001/api/keystatic/tree", {
      headers: { host, ...(origin ? { origin } : {}) },
    });
  assert.equal(
    localEditorRequestAllowed(
      request("127.0.0.1:3001", "http://127.0.0.1:3001"),
    ),
    true,
  );
  assert.equal(localEditorRequestAllowed(request("example.com")), false);
  assert.equal(
    localEditorRequestAllowed(request("127.0.0.1:3001", "https://example.com")),
    false,
  );
});
