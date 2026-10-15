import test from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import record from "../../content/work/studies/detector-coverage-atlas.json" with { type: "json" };
import {
  caseStudySlugs,
  caseStudySummaries,
  readCaseStudySummary,
} from "./summaries.ts";
import { directoryProjects } from "../project-directory.ts";

const read = (file: string) =>
  readFileSync(new URL(`../../${file}`, import.meta.url), "utf8");

test("case-study summary files are exactly the directory slugs", () => {
  assert.deepEqual(
    readdirSync(new URL("../../content/work/studies", import.meta.url))
      .filter((name) => name.endsWith(".json"))
      .sort(),
    [...caseStudySlugs].sort().map((slug) => `${slug}.json`),
  );
});

test("the directory renders the JSON summary and keeps filters in code", () => {
  const source = read("lib/project-directory.ts");
  assert.match(source, /caseStudySummaries/);
  assert.doesNotMatch(source, /Compare secret-detection coverage/);
  assert.match(source, /githubUrl: "https:\/\/github.com\/heyfunwhoa\/byjoyaing-portfolio"/);
  assert.match(source, /featuredOrder/);
  const atlas = directoryProjects.find((project) => project.slug === "detector-coverage-atlas");
  assert.equal(atlas?.summary, caseStudySummaries["detector-coverage-atlas"]);
  assert.equal(atlas?.summary, record.summary);
  assert.equal(atlas?.caseStudyUrl, "/work/detector-coverage-atlas");
  assert.equal(/\$\d/.test(caseStudySummaries["revenue-planning-simulator"]), false);
  assert.match(read("keystatic.config.ts"), /kind: "local"/);
  assert.doesNotMatch(read("keystatic.config.ts"), /kind: "github"|kind: "cloud"/);
  assert.match(read("lib/portfolio.ts"), /slug: "detector-coverage-atlas"/);
  assert.doesNotMatch(read("lib/portfolio.ts"), /caseStudySummaries/);
});

test("malformed case-study summaries fail closed", () => {
  const clone = () => structuredClone(record);
  assert.throws(() => readCaseStudySummary("detector-coverage-atlas", null));
  assert.throws(() => readCaseStudySummary("detector-coverage-atlas", []));
  for (const change of [
    { summary: "  " },
    { slug: "detector-coverage-atlas" },
    { id: "detector-coverage-atlas" },
    { href: "/work/detector-coverage-atlas" },
    { kind: "side-quest" },
    { status: "prototype" },
    { classification: "private" },
    { publicationStatus: "approved" },
    { contentVersion: 0 },
    { reviewDue: "2026-02-30" },
    { lastReviewed: "yesterday" },
  ])
    assert.throws(() =>
      readCaseStudySummary("detector-coverage-atlas", { ...clone(), ...change }),
    );

  const { summary, ...missing } = clone();
  assert.equal(summary, record.summary);
  assert.throws(() => readCaseStudySummary("detector-coverage-atlas", missing));
  assert.equal(
    readCaseStudySummary("detector-coverage-atlas", {
      ...clone(),
      summary: `${record.summary} Local editorial check.`,
    }),
    `${record.summary} Local editorial check.`,
  );
});
