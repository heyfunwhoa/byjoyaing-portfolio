import test from "node:test";
import assert from "node:assert/strict";
import {
  checks,
  emptyProgress,
  parseProgress,
  recordAnswer,
  progressKey,
} from "./click-mission.ts";

test("reading, practice and correct checks are independent", () => {
  const read = { ...emptyProgress(), reviewed: true };
  assert.equal(read.practiced, false);
  const wrong = recordAnswer(emptyProgress(), checks[0].id, 0);
  assert.equal(wrong.practiced, true);
  assert.equal(wrong.reviewed, false);
  assert.deepEqual(wrong.passedCheckIds, []);
  const passed = recordAnswer(wrong, checks[0].id, checks[0].answer);
  assert.equal(passed.reviewed, false);
  assert.deepEqual(passed.passedCheckIds, [checks[0].id]);
  assert.deepEqual(
    recordAnswer(passed, checks[0].id, checks[0].answer).passedCheckIds,
    [checks[0].id],
  );
  assert.deepEqual(recordAnswer(passed, checks[0].id, 0).passedCheckIds, []);
});

test("resume keeps the exact step and scoped evidence without answer text", () => {
  const p = recordAnswer(
    { ...emptyProgress(), step: 3, reviewed: true },
    checks[1].id,
    checks[1].answer,
  );
  assert.deepEqual(parseProgress(JSON.stringify(p)), p);
  assert.match(progressKey, /mcp-vs-rest-api:follow-one-click:v1$/);
  assert.deepEqual(Object.keys(p).sort(), [
    "activityId",
    "lessonId",
    "passedCheckIds",
    "practiced",
    "reviewed",
    "step",
    "version",
  ]);
});

test("corrupt, incompatible and oversized storage safely starts fresh", () => {
  for (const raw of [
    null,
    "no JSON",
    "null",
    "[]",
    "x".repeat(4097),
    JSON.stringify({ ...emptyProgress(), version: 2 }),
    JSON.stringify({ ...emptyProgress(), lessonId: "another-lesson" }),
  ]) {
    assert.deepEqual(parseProgress(raw), emptyProgress());
  }
  const hostile = parseProgress(
    JSON.stringify({
      ...emptyProgress(),
      step: 999,
      reviewed: "yes",
      practiced: true,
      passedCheckIds: ["invented", checks[0].id, checks[0].id],
      extra: "private text",
    }),
  );
  assert.equal(hostile.step, 0);
  assert.equal(hostile.reviewed, false);
  assert.deepEqual(hostile.passedCheckIds, [checks[0].id]);
  assert.equal("extra" in hostile, false);
  assert.deepEqual(
    parseProgress(
      JSON.stringify({ ...emptyProgress(), passedCheckIds: [checks[0].id] }),
    ).passedCheckIds,
    [],
  );
});

test("invalid answers do not create practice evidence", () => {
  const p = emptyProgress();
  for (const n of [-1, 100, 0.5, NaN])
    assert.equal(recordAnswer(p, checks[0].id, n), p);
  assert.equal(recordAnswer(p, "unknown", 0), p);
});
