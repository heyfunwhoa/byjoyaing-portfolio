import assert from "node:assert/strict";
import test from "node:test";
import { portfolioExamples } from "./portfolio-examples.ts";
import { demoSignals } from "./account-intelligence-demo.ts";
import { demoChange } from "./competitive-intelligence-demo.ts";
import { feedbackRecords } from "./customer-feedback-demo.ts";
import { learningPaths } from "./academy/learning-paths.ts";
import { lessons } from "./ai-academy.ts";

test("guided examples retain fixture provenance and do not invent real observations", () => {
  const signal = demoSignals.find((item) => item.id === "acme-leader")!;
  assert.ok(
    portfolioExamples["account-intelligence"].steps[0].body.includes(
      signal.sourceLabel,
    ),
  );
  assert.equal(
    portfolioExamples["account-intelligence"].label,
    "Synthetic walkthrough",
  );
  assert.ok(
    portfolioExamples["competitive-intelligence-engine"].limitation.includes(
      demoChange.detected,
    ),
  );
  const feedback = feedbackRecords.find((item) => item.id === "harbor-sales")!;
  assert.ok(
    portfolioExamples["customer-feedback-intelligence"].steps[0].body.includes(
      feedback.quote,
    ),
  );
  assert.ok(
    portfolioExamples["detector-coverage-atlas"].steps[2].body.includes(
      "Not evaluated",
    ),
  );
  for (const example of Object.values(portfolioExamples)) {
    assert.ok(example.limitation.length > 30);
    assert.equal(example.steps.length, 4);
    assert.ok(example.steps.every((step) => step.body.length > 30));
    assert.ok(
      example.steps.every(
        (step) => !step.source || step.source.href.startsWith("https://"),
      ),
    );
  }
});

test("Camp feedback distinguishes a finding from validity and impact", () => {
  const question = portfolioExamples["truffle-camp"].question!;
  assert.ok(question.answer >= 0 && question.answer < question.choices.length);
  assert.match(
    question.choices[question.answer],
    /validity and impact still require approved review/,
  );
  assert.match(question.explanation, /separate claims/);
  assert.match(
    portfolioExamples["truffle-camp"].limitation,
    /not an employer course/,
  );
});

test("starting paths point to existing lessons and expose a prerequisite and outcome", () => {
  const slugs = new Set(lessons.map((lesson) => lesson.slug));
  assert.equal(
    new Set(learningPaths.map((path) => path.id)).size,
    learningPaths.length,
  );
  for (const path of learningPaths) {
    assert.ok(path.prerequisite && path.outcome);
    assert.equal(new Set(path.slugs).size, path.slugs.length);
    assert.ok(
      path.slugs.every((slug) => slugs.has(slug)),
      path.id,
    );
  }
});
