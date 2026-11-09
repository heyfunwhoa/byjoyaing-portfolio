import assert from "node:assert/strict";
import test from "node:test";
import { apiImplementations, apiLabQuestions, apiStyles, apiVocabulary, scoreApiLab } from "./api-lab.ts";

test("API lab has exactly three implementation approaches with equivalent sample response data", () => {
  assert.deepEqual(apiImplementations.map((entry) => entry.id), ["next", "express", "n8n"]);
  for (const entry of apiImplementations) {
    assert.ok(entry.description.length > 20);
    assert.ok(entry.code.includes("Learn an API"));
    assert.ok(entry.code.includes("Compare deployments"));
    assert.ok(entry.url.length > 10);
  }
});
test("API styles and SDK glossary remain present", () => {
  for (const required of ["REST", "GraphQL", "Webhook", "WebSocket", "SSE", "gRPC", "SOAP"]) {
    assert.ok(apiStyles.some((item) => item.name === required));
  }
  assert.ok(apiVocabulary.some((item) => item.name === "SDK"));
});
test("quiz scoring handles unanswered, incorrect, and fully correct session answers", () => {
  assert.deepEqual(scoreApiLab({}), { answered: 0, correct: 0, total: apiLabQuestions.length });
  const correct = Object.fromEntries(apiLabQuestions.map((q, i) => [i, q.correct]));
  assert.deepEqual(scoreApiLab(correct), { answered: apiLabQuestions.length, correct: apiLabQuestions.length, total: apiLabQuestions.length });
  const wrong = Object.fromEntries(apiLabQuestions.map((q, i) => [i, (q.correct + 1) % q.choices.length]));
  assert.equal(scoreApiLab(wrong).correct, 0);
});
