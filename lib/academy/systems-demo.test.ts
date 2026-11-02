import assert from "node:assert/strict";
import test from "node:test";
import { accessExamples, advanceDelivery, initialDelivery } from "./systems-demo.ts";

test("delivery failure and backoff do not process business work", () => {
  const failed = advanceDelivery(initialDelivery);
  assert.equal(failed.phase, "failed");
  assert.equal(failed.attempts, 1);
  assert.equal(failed.workCount, 0);
  const waiting = advanceDelivery(failed);
  assert.equal(waiting.phase, "waiting");
  assert.equal(waiting.attempts, 1);
  assert.equal(waiting.workCount, 0);
});

test("successful retry processes once and repeated duplicates never repeat work", () => {
  let state = advanceDelivery(advanceDelivery(advanceDelivery(initialDelivery)));
  assert.equal(state.phase, "delivered");
  assert.equal(state.workCount, 1);
  for (let i = 1; i <= 10; i++) {
    state = advanceDelivery(state);
    assert.equal(state.workCount, 1);
    assert.equal(state.duplicates, i);
    assert.equal(state.attempts, 2 + i);
  }
});

test("initial/reset fixture remains unchanged across runs", () => {
  const before = { ...initialDelivery };
  advanceDelivery(advanceDelivery(advanceDelivery(initialDelivery)));
  assert.deepEqual(initialDelivery, before);
  assert.equal(initialDelivery.phase, "ready");
  assert.equal(initialDelivery.workCount, 0);
  assert.equal(initialDelivery.attempts, 0);
  assert.equal(initialDelivery.duplicates, 0);
});

test("authentication and record permissions have distinct sample outcomes", () => {
  assert.match(accessExamples.anonymous.result, /401/);
  assert.match(accessExamples.member.result, /403/);
  assert.match(accessExamples.editor.result, /200/);
  assert.match(accessExamples.member.explanation, /Signing in alone is not enough/);
  assert.match(accessExamples.editor.explanation, /does not grant access to every record/);
});
