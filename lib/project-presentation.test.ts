import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";
import { caseStudySlugs, caseStudySummaries } from "./case-studies/summaries.ts";
import { directoryProjects } from "./project-directory.ts";
import {
  academyEntry,
  gtmRevenueWorkflows,
  presentationActions,
  projectActions,
  walkthroughAction,
} from "./project-presentation.ts";

const root = new URL("../", import.meta.url);

test("every directory project has one verified on-site next step", () => {
  assert.deepEqual(Object.keys(projectActions).sort(), [...caseStudySlugs].sort());
  for (const project of directoryProjects) {
    const action = projectActions[project.slug];
    assert.ok(presentationActions.includes(action.label), project.slug);
    assert.equal(action.href, `/work/${project.slug}`);
    assert.equal(existsSync(new URL(`app/work/${project.slug}/page.tsx`, root)), false);
    assert.equal(existsSync(new URL("app/work/[slug]/page.tsx", root)), true);
    assert.equal(action.href.includes("gtm-revenue-os"), false);
    assert.equal(action.href.includes("vercel.app"), false);
  }
  assert.equal(existsSync(new URL("app/contact/page.tsx", root)), true);
  assert.equal(walkthroughAction.href, "/contact");
  assert.equal(existsSync(new URL(`app${academyEntry.href}/page.tsx`, root)), true);
});

test("GTM Revenue OS stays three existing write-ups, not a public app link", () => {
  assert.deepEqual(
    gtmRevenueWorkflows.map((workflow) => workflow.slug),
    ["revenue-planning-simulator", "gtm-operating-plan", "revenue-intelligence"],
  );
  for (const workflow of gtmRevenueWorkflows) {
    assert.equal(projectActions[workflow.slug].label, "Explore the project");
  }
  const system = readFileSync(new URL("components/gtm-revenue-system.tsx", root), "utf8");
  assert.doesNotMatch(system, /github\.com\/heyfunwhoa\/gtm-revenue-os|vercel\.app/);
  assert.match(system, /walkthroughAction/);
});

test("card summaries do not lead with implementation refusals", () => {
  const banned = [/not built/i, /not production/i, /no database/i, /no model calls/i, /not deployed/i];
  for (const [slug, summary] of Object.entries(caseStudySummaries)) {
    for (const pattern of banned) assert.doesNotMatch(summary, pattern, slug);
  }
});

test("Side Quests mounts one Academy entry and the revenue system", () => {
  const page = readFileSync(new URL("app/side-quests/page.tsx", root), "utf8");
  assert.match(page, /GtmRevenueSystem/);
  assert.match(page, /academyEntry/);
  assert.doesNotMatch(page, /ProjectStatusPill/);
  const strip = readFileSync(new URL("components/featured-side-quest-strip.tsx", root), "utf8");
  assert.doesNotMatch(strip, /ProjectStatusPill/);
  assert.match(strip, /projectAction/);
});
