import test from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import record from "../../content/work/stories/enterprise-selling.json" with { type: "json" };
import { readWorkNarrative, workNarrativeIds } from "./narratives.ts";

const read = (file: string) =>
  readFileSync(new URL(`../../${file}`, import.meta.url), "utf8");

test("Work prose files are exactly the three story ids", () => {
  assert.deepEqual(
    readdirSync(new URL("../../content/work/stories", import.meta.url))
      .filter((name) => name.endsWith(".json"))
      .sort(),
    [...workNarrativeIds].sort().map((id) => `${id}.json`),
  );
});

test("the Work page joins prose to code-owned links", () => {
  const source = read("lib/public-stories.ts");
  assert.match(source, /workNarratives/);
  assert.match(source, /enterprise-selling/);
  assert.match(source, /href: "\/experience"/);
  assert.doesNotMatch(source, /Navigating complex enterprise/);
  assert.match(read("app/work/page.tsx"), /<WorkExplorer/);
  assert.match(read("lib/featured-work.ts"), /storyAnchors/);
});

test("malformed Work narratives and missing required fields fail closed", () => {
  const clone = () => structuredClone(record);
  assert.throws(() => readWorkNarrative("enterprise-selling", null));
  assert.throws(() => readWorkNarrative("enterprise-selling", []));
  for (const change of [
    { title: "  " },
    { area: "Enterprise Sales" },
    { related: [] },
    { href: "/work" },
    { id: "enterprise-selling" },
    { classification: "private" },
    { publicationStatus: "approved" },
    { contentVersion: 0 },
    { reviewDue: "2026-02-30" },
    { lastReviewed: "yesterday" },
    { evidence: "" },
  ])
    assert.throws(() => readWorkNarrative("enterprise-selling", { ...clone(), ...change }));

  const { takeaway, ...missing } = clone();
  assert.equal(takeaway, record.takeaway);
  assert.throws(() => readWorkNarrative("enterprise-selling", missing));
});
