import assert from "node:assert/strict";
import test from "node:test";
import { lessons } from "../ai-academy.ts";
import { getLessonGuidance } from "./lesson-guidance.ts";
import {
  feedbackForFrontendChoice,
  frontendChecks,
  frontendLessonSections,
  frontendLessonSlug,
  frontendNextSteps,
  frontendPractice,
  frontendTransfer,
  frontendVocabulary,
  projectCardExample,
} from "./frontend-lesson.ts";

test("frontend pilot reuses the stable lesson and does not add a second record", () => {
  const matches = lessons.filter(
    (lesson) => lesson.slug === frontendLessonSlug,
  );
  assert.equal(matches.length, 1);
  assert.equal(getLessonGuidance(frontendLessonSlug)?.prerequisites.length, 0);
  assert.match(
    getLessonGuidance(frontendLessonSlug)?.practice?.href ?? "",
    /editorial-project-card\.md$/,
  );
  assert.equal(
    lessons.some((lesson) => lesson.slug === "frontend-lesson-pilot"),
    false,
  );
});

test("frontend checks explain every choice and name one supported answer", () => {
  for (const group of [frontendPractice, ...frontendChecks]) {
    assert.equal(group.choices.filter((choice) => choice.correct).length, 1);
    for (const choice of group.choices) {
      assert.ok(choice.feedback.length > 20);
      const result = feedbackForFrontendChoice(group.id, choice.id);
      assert.equal(result?.correct, choice.correct);
      assert.equal(result?.feedback, choice.feedback);
    }
  }
  assert.equal(feedbackForFrontendChoice("overflow", "missing"), null);
  assert.equal(frontendChecks.length, 2);
  assert.equal(frontendVocabulary.length, 5);
  assert.equal(frontendLessonSections.length, 6);
});

test("frontend example, transfer and next step stay local to existing lessons", () => {
  assert.match(projectCardExample.code, /ProjectCard/);
  assert.match(projectCardExample.code, /href/);
  assert.match(projectCardExample.plainLanguage, /does not prove|heading/i);
  assert.equal(projectCardExample.annotations.length, 5);
  assert.match(frontendTransfer.prompt, /Click here/);
  assert.equal(frontendTransfer.rubric.length, 4);
  assert.match(frontendTransfer.rubric.join(" "), /accessible name/i);
  for (const step of frontendNextSteps) {
    assert.ok(lessons.some((lesson) => lesson.slug === step.slug));
    assert.equal(step.label.length > 0, true);
  }
  const blob = JSON.stringify({
    frontendPractice,
    frontendChecks,
    frontendTransfer,
    projectCardExample,
  });
  assert.equal(blob.includes("API_KEY"), false);
  assert.equal(/localStorage|sessionStorage|fetch\(/.test(blob), false);
});
