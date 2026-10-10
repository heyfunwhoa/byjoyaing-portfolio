import assert from "node:assert/strict";
import test from "node:test";
import { scenarios, quiz, quizScore, quizComplete, isCorrectScenarioAnswer } from "./version-control.ts";

test("every scenario has exactly one valid correct answer", () => {
  assert.deepEqual(Object.keys(scenarios).sort(), ["audit", "build", "lint"]);
  for (const s of Object.values(scenarios)) {
    assert.ok(s.choices.length >= 2);
    assert.ok(s.correct >= 0 && s.correct < s.choices.length);
    assert.ok(s.explanation.length > 20);
  }
});

test("diagnostic answers distinguish correct and wrong choices", () => {
  for (const id of ["lint", "build", "audit"] as const) {
    assert.equal(isCorrectScenarioAnswer(id, scenarios[id].correct), true);
    const wrong = (scenarios[id].correct + 1) % scenarios[id].choices.length;
    assert.equal(isCorrectScenarioAnswer(id, wrong), false);
  }
});

test("quiz is incomplete until all answers are supplied", () => {
  assert.equal(quizComplete({}), false);
  assert.equal(quizComplete({ 0: quiz[0].correct }), false);
  const correct = Object.fromEntries(quiz.map((item, i) => [i, item.correct]));
  assert.equal(quizComplete(correct), true);
});

test("quiz counts correct answers and does not reward unanswered items", () => {
  assert.equal(quizScore({}), 0);
  const correct = Object.fromEntries(quiz.map((item, i) => [i, item.correct]));
  assert.equal(quizScore(correct), quiz.length);
  const wrong = Object.fromEntries(quiz.map((item, i) => [i, (item.correct + 1) % item.options.length]));
  assert.equal(quizScore(wrong), 0);
});

test("each quiz answer index is within its options", () => {
  for (const q of quiz) {
    assert.ok(q.correct >= 0 && q.correct < q.options.length);
    assert.ok(q.why.length > 15);
  }
});
