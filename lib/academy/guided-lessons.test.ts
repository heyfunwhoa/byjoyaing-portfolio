import assert from "node:assert/strict";
import test from "node:test";
import { guidedLessons, getGuidedLesson, scoreGuidedLesson } from "./guided-lessons.ts";
import { curriculum } from "./programming.ts";

test("guided lessons match existing curriculum entries", () => {
  const names = new Set(curriculum.map(l => l.slug));
  assert.equal(guidedLessons.length, 2);
  assert.equal(new Set(guidedLessons.map(l=>l.slug)).size, guidedLessons.length);
  for (const l of guidedLessons) {
    assert.ok(names.has(l.slug));
    assert.equal(getGuidedLesson(l.slug), l);
    assert.ok(l.sections.length >= 3);
    assert.ok(l.objectives.length >= 2);
    assert.ok(l.references.every(r=>r.href.startsWith("https://")));
  }
});
test("guided question answers are valid", () => {
  for(const l of guidedLessons) {
    for(const q of [l.activity,...l.checks]) {
      assert.ok(q.choices.length >= 2);
      assert.ok(q.correct >= 0 && q.correct < q.choices.length);
      assert.ok(q.explanation.length > 10);
    }
  }
});
test("scoring treats unanswered and wrong as not correct", () => {
  for(const l of guidedLessons) {
    const all=[l.activity,...l.checks];
    assert.deepEqual(scoreGuidedLesson(l.slug,{}),{score:0,total:all.length,answered:0});
    const correct=Object.fromEntries(all.map((q,i)=>[i,q.correct]));
    assert.deepEqual(scoreGuidedLesson(l.slug,correct),{score:all.length,total:all.length,answered:all.length});
    const wrong=Object.fromEntries(all.map((q,i)=>[i,(q.correct+1)%q.choices.length]));
    assert.deepEqual(scoreGuidedLesson(l.slug,wrong),{score:0,total:all.length,answered:all.length});
  }
});
test("unknown lesson returns no score", () => {
  assert.equal(getGuidedLesson("not-a-lesson"),undefined);
  assert.deepEqual(scoreGuidedLesson("not-a-lesson",{0:1}),{score:0,total:0,answered:0});
});
