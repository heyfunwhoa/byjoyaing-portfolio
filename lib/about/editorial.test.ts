import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import record from "../../content/about/page.json" with { type: "json" };
import { readAboutEditorial } from "./editorial.ts";

const read = (file: string) =>
  readFileSync(new URL(`../../${file}`, import.meta.url), "utf8");

test("the About page renders one validated record and keeps interaction in code", () => {
  const page = readAboutEditorial(record);
  assert.equal(page.headline, "Strategist. Leader. Builder.");
  assert.equal(
    page.philosophyHeading,
    "People first. Problem-driven. Systems-minded.",
  );
  assert.equal(page.principles.length, 3);
  assert.equal(page.interests.length, 3);
  assert.equal(page.metaDescription, record.metaDescription);
  assert.equal("owner" in page, false);
  assert.equal("publicationStatus" in page, false);
  const source = read("app/about/page.tsx");
  assert.match(source, /aboutPage/);
  assert.match(source, /<OrbitPortrait/);
  assert.match(source, /<CapabilityOrbit/);
  assert.match(source, /<CareerRail/);
  assert.match(source, /<ToolsMap/);
  assert.doesNotMatch(source, /Curious by nature/);
  assert.doesNotMatch(
    read("lib/public-personal.ts"),
    /I enjoy the process of discovering/,
  );
});

test("malformed About content and missing required fields fail closed", () => {
  const clone = () => structuredClone(record);
  assert.throws(() => readAboutEditorial(null));
  assert.throws(() => readAboutEditorial([]));
  for (const change of [
    { id: "home" },
    { headline: "  " },
    { href: "/work" },
    { roles: [] },
    { classification: "private" },
    { publicationStatus: "approved" },
    { contentVersion: 0 },
    { reviewDue: "2026-02-30" },
    { lastReviewed: "yesterday" },
    { lead: [] },
    { education: [""] },
    { values: ["Curiosity", "Growth"] },
    { principles: record.principles.slice(0, 2) },
  ])
    assert.throws(() => readAboutEditorial({ ...clone(), ...change }));

  const { headline, ...missingHeadline } = clone();
  assert.equal(headline, record.headline);
  assert.throws(() => readAboutEditorial(missingHeadline));

  const duplicate = clone();
  duplicate.interests[1].id = duplicate.interests[0].id;
  assert.throws(() => readAboutEditorial(duplicate));

  const badInterest = clone();
  badInterest.interests[0].id = "Electronic music";
  assert.throws(() => readAboutEditorial(badInterest));

  const linkedInterest = clone();
  linkedInterest.interests[0].href = "/side-quests";
  assert.throws(() => readAboutEditorial(linkedInterest));

  const blankPrinciple = clone();
  blankPrinciple.principles[0].body = "";
  assert.throws(() => readAboutEditorial(blankPrinciple));
});
