import assert from "node:assert/strict";
import test from "node:test";
import { lessons } from "../ai-academy.ts";
import { cmsExercises, evaluateCmsChoice, findCmsExercise } from "./cms-lab.ts";

test("CMS fundamentals card keeps its slug, check, and companion", () => {
  const lesson = lessons.find((item) => item.slug === "cms-fundamentals");
  assert.ok(lesson);
  assert.equal(lesson.track, "Builder");
  assert.equal(lesson.level, "Beginner");
  assert.equal(lesson.check.answer, 1);
  assert.match(lesson.check.choices[1], /Pilot Keystatic/);
  assert.match(lesson.exercise, /docs\/builder-academy\/cms-fundamentals\.md/);
  assert.match(lesson.exercise, /does not save progress/i);
  assert.equal(
    lesson.companion?.url,
    "https://github.com/heyfunwhoa/byjoyaing-portfolio/blob/main/docs/builder-academy/cms-fundamentals.md",
  );
  assert.ok(
    lesson.sources.every((source) => source.url.startsWith("https://")),
  );
  const blob = JSON.stringify(lesson);
  assert.equal(/joy\s*index/i.test(blob), false);
  assert.equal(blob.includes("API_KEY="), false);
});

test("CMS lab has three guided decisions and explains every choice", () => {
  assert.deepEqual(
    cmsExercises.map((exercise) => exercise.id),
    ["architecture", "schema", "publishing"],
  );
  for (const exercise of cmsExercises) {
    assert.equal(exercise.choices.length, 3);
    assert.equal(findCmsExercise(exercise.id), exercise);
    const correct = evaluateCmsChoice(exercise.id, exercise.answer);
    assert.equal(correct?.correct, true);
    assert.ok(correct && correct.explanation.length > 20);
    for (const index of [0, 1, 2]) {
      const result = evaluateCmsChoice(exercise.id, index);
      assert.equal(result?.correct, index === exercise.answer);
      assert.equal(result?.explanation, exercise.choices[index].explanation);
    }
    assert.equal(evaluateCmsChoice(exercise.id, null), null);
    assert.equal(evaluateCmsChoice(exercise.id, 3), null);
    assert.equal(evaluateCmsChoice(exercise.id, 1.5), null);
    assert.ok(
      exercise.sources.every((source) => source.url.startsWith("https://")),
    );
    assert.match(exercise.verifies, /does not/i);
  }
  assert.equal(evaluateCmsChoice("missing", 0), null);
});
