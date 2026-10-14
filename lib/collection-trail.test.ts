import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { fieldNoteTrail, workCaseTrail } from "./collection-trail.ts";

test("Work and Side Quest trails follow kind, not the /work/ URL", () => {
  assert.deepEqual(workCaseTrail("competitive-intelligence-engine", "Competitive Intelligence Engine"), [
    { href: "/", label: "Home" },
    { href: "/work", label: "Work" },
    { label: "Competitive Intelligence Engine" },
  ]);
  assert.deepEqual(workCaseTrail("detector-coverage-atlas", "Detector Coverage Atlas"), [
    { href: "/", label: "Home" },
    { href: "/side-quests", label: "Side Quests" },
    { label: "Detector Coverage Atlas" },
  ]);
  assert.deepEqual(workCaseTrail("storytelling-guide", "Two Ways to Tell the Work"), [
    { href: "/", label: "Home" },
    { label: "Two Ways to Tell the Work" },
  ]);
});

test("Field Notes trails stay on that collection", () => {
  assert.deepEqual(fieldNoteTrail("Strategic Enterprise Deal Anatomy"), [
    { href: "/", label: "Home" },
    { href: "/field-notes", label: "Field Notes" },
    { label: "Strategic Enterprise Deal Anatomy" },
  ]);
});

test("source guard: case templates and Field Notes guides mount the breadcrumb", () => {
  const files: Record<string, string> = {
    "app/(site)/work/[slug]/page.tsx": "WorkCaseBreadcrumb",
    "components/atlas-case.tsx": "WorkCaseBreadcrumb",
    "components/competitive-intelligence-case.tsx": "WorkCaseBreadcrumb",
    "components/account-intelligence-case.tsx": "WorkCaseBreadcrumb",
    "components/customer-feedback-case.tsx": "WorkCaseBreadcrumb",
    "components/field-asset-case.tsx": "WorkCaseBreadcrumb",
    "components/editorial/editorial-article.tsx": "FieldNoteBreadcrumb",
    "app/(site)/field-notes/multithreading/page.tsx": "FieldNoteBreadcrumb",
    "app/(site)/field-notes/enterprise-deal/page.tsx": "EditorialArticle",
  };
  for (const [file, token] of Object.entries(files)) {
    const source = readFileSync(new URL(`../${file}`, import.meta.url), "utf8");
    assert.match(source, new RegExp(token), file);
    assert.doesNotMatch(source, /@\/components\/ui\//, file);
  }
  const crumb = readFileSync(new URL("../components/collection-breadcrumb.tsx", import.meta.url), "utf8");
  assert.match(crumb, /aria-label="Breadcrumb"/);
  assert.match(crumb, /aria-current="page"/);
  assert.doesNotMatch(crumb, /@\/components\/ui\//);
});

test("homepage does not retell the Work field practice; Field Notes does not fake a catalog", () => {
  const home = readFileSync(new URL("../app/(site)/page.tsx", import.meta.url), "utf8");
  assert.doesNotMatch(home, /competitive-evidence|A field practice|featured-title/);
  assert.match(home, /EditorialBento/);
  assert.match(home, /A side quest/);
  const notes = readFileSync(new URL("../app/(site)/field-notes/page.tsx", import.meta.url), "utf8");
  assert.match(notes, /The published notes/);
  assert.match(notes, /Notes still in outline/);
  assert.doesNotMatch(notes, /Browse the collections/);
  assert.doesNotMatch(notes, /publicStories/);
  assert.doesNotMatch(notes, /href="\/field-notes\/strategic-account/);
});
