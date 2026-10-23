import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import record from "../../content/home/page.json" with { type: "json" };
import { readHomeEditorial } from "./editorial.ts";

const read = (file: string) =>
  readFileSync(new URL(`../../${file}`, import.meta.url), "utf8");

test("the homepage renders one validated cover and keeps the bento in code", () => {
  const page = readHomeEditorial(record);
  assert.equal(page.headline, "Revenue & GTM Leader.");
  assert.equal(page.headlineAccent, "Curious Builder.");
  assert.equal(page.philosophy, "People first. Problem-driven. Systems-minded.");
  assert.equal(page.eyebrow, "Enterprise cybersecurity · Revenue & GTM");
  assert.match(page.body, /I'm Kristen Aing/);
  assert.equal(page.caption, "Curious by nature. Builder by instinct.");
  assert.equal(page.metaDescription, record.metaDescription);
  assert.equal("owner" in page, false);
  assert.equal("publicationStatus" in page, false);

  const source = read("app/page.tsx");
  assert.match(source, /homePage/);
  assert.match(source, /<CelestialFrame/);
  assert.match(source, /<BrandAvatar/);
  assert.match(source, /<EditorialBento/);
  assert.match(source, /roleByCompany\("Truffle Security"\)/);
  assert.match(source, /detector-coverage-atlas/);
  assert.match(source, /href="\/work"/);
  assert.match(source, /href="\/about"/);
  assert.doesNotMatch(source, /I sell into complex enterprise security decisions/);
  assert.doesNotMatch(source, /Curious by nature/);

  const image = read("app/opengraph-image.tsx");
  assert.match(image, /homePage\.eyebrow/);
  assert.match(image, /homePage\.headline/);
  assert.doesNotMatch(image, /Enterprise cybersecurity · Revenue & GTM/);
});

test("malformed Home content and missing required fields fail closed", () => {
  const clone = () => structuredClone(record);
  assert.throws(() => readHomeEditorial(null));
  assert.throws(() => readHomeEditorial([]));
  for (const change of [
    { id: "about" },
    { headline: "  " },
    { headlineAccent: "" },
    { href: "/work" },
    { roles: [] },
    { sideQuest: "detector-coverage-atlas" },
    { classification: "private" },
    { publicationStatus: "approved" },
    { contentVersion: 0 },
    { reviewDue: "2026-02-30" },
    { lastReviewed: "yesterday" },
    { body: " " },
  ])
    assert.throws(() => readHomeEditorial({ ...clone(), ...change }));

  const { philosophy, ...missingPhilosophy } = clone();
  assert.equal(philosophy, record.philosophy);
  assert.throws(() => readHomeEditorial(missingPhilosophy));
});
