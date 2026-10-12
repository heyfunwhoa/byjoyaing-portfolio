import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const read = (file: string) => readFileSync(new URL(`../${file}`, import.meta.url), "utf8");

test("source guard: Work case studies keep the five fields in order, with no invented outcome step", () => {
  const study = read("components/editorial/professional-case-study.tsx");
  const headings = ["Context", "My contribution", "Execution and decisions", "Evidence and limitations", "What I learned"];
  const positions = headings.map((heading) => study.indexOf(`heading: "${heading}"`));
  assert.ok(positions.every((position) => position > 0));
  assert.deepEqual([...positions].sort((a, b) => a - b), positions);
  assert.doesNotMatch(study, /heading: "Outcome"/);
  assert.match(study, /<CaseBandSteps/);
  assert.match(read("app/work/page.tsx"), /<ProfessionalCaseStudy/);
});

test("source guard: the compact mobile band clamps visually and expands with a labeled button", () => {
  const band = read("components/editorial/case-band-steps.tsx");
  assert.match(band, /line-clamp-2/);
  assert.match(band, /lg:line-clamp-none/);
  assert.match(band, /aria-expanded=\{expanded\}/);
  assert.match(band, /aria-controls=\{listId\}/);
  assert.match(band, /lg:hidden/);
  assert.match(band, /lg:grid-cols-5/);
  assert.doesNotMatch(band, /aria-hidden=\{!expanded\}|hidden=\{/);
  assert.doesNotMatch(band, /animate-|@keyframes|from "motion/);
  // Rendered lengths and keyboard behavior are checked in a browser, not here.
});
