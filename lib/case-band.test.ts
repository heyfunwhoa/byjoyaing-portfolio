import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const read = (file: string) =>
  readFileSync(new URL(`../${file}`, import.meta.url), "utf8");

test("source guard: Work case studies keep the five fields in order, with no invented outcome step", () => {
  const study = read("components/editorial/professional-case-study.tsx");
  const headings = [
    "Context",
    "My contribution",
    "Execution and decisions",
    "Evidence and limitations",
    "What I learned",
  ];
  const positions = headings.map((heading) =>
    study.indexOf(`heading: "${heading}"`),
  );
  assert.ok(positions.every((position) => position > 0));
  assert.deepEqual(
    [...positions].sort((a, b) => a - b),
    positions,
  );
  assert.doesNotMatch(study, /heading: "Outcome"/);
  assert.match(study, /<CaseBandSteps/);
  assert.match(read("app/work/page.tsx"), /<ProfessionalCaseStudy/);
});

test("source guard: one Work expansion exposes the complete story and related evidence", () => {
  const band = read("components/editorial/case-band-steps.tsx");
  assert.match(band, /steps\.map/);
  assert.match(band, /\{connections\}/);
  assert.doesNotMatch(band, /<details|<summary|Read the full story|steps\.filter/);
  assert.doesNotMatch(band, /line-clamp|grid-cols-5|aria-hidden|animate-/);
});
