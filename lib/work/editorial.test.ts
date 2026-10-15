import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import enterpriseSelling from "../../content/work/stories/enterprise-selling.json" with { type: "json" };
import teamEnablement from "../../content/work/stories/team-enablement.json" with { type: "json" };
import competitiveEvidence from "../../content/work/stories/competitive-evidence.json" with { type: "json" };
import { readWorkNarratives } from "./editorial.ts";
import { storyFacts } from "./story-facts.ts";

const read = (file: string) =>
  readFileSync(new URL(`../../${file}`, import.meta.url), "utf8");

const files = storyFacts.map((story) => `${story.id}.json`);
const records = () =>
  structuredClone({
    "enterprise-selling": enterpriseSelling,
    "team-enablement": teamEnablement,
    "competitive-evidence": competitiveEvidence,
  });

test("three Work narratives stay in the collection and the sentences leave the code module", () => {
  const narratives = readWorkNarratives(files, records());
  assert.equal(
    narratives["enterprise-selling"].title,
    "Navigating complex enterprise cybersecurity sales",
  );
  assert.match(
    narratives["enterprise-selling"].evidence,
    /intentionally withheld/,
  );
  assert.equal("area" in narratives["team-enablement"], false);
  assert.equal("related" in narratives["competitive-evidence"], false);
  assert.equal("owner" in narratives["enterprise-selling"], false);
  assert.equal("publicationStatus" in narratives["enterprise-selling"], false);

  const source = read("lib/public-stories.ts");
  assert.match(source, /workNarratives/);
  assert.match(source, /storyFacts/);
  assert.doesNotMatch(
    source,
    /Navigating complex enterprise cybersecurity sales/,
  );
  assert.doesNotMatch(source, /intentionally withheld/);
  assert.doesNotMatch(source, /href: "\/experience"/);

  const page = read("app/work/page.tsx");
  assert.match(page, /<WorkExplorer/);
  assert.match(page, /<ProfessionalCaseStudy/);
  assert.match(page, /story\.title/);
  assert.match(page, /story\.related/);
  assert.doesNotMatch(page, /Navigating complex enterprise/);

  const config = read("keystatic.config.ts");
  assert.match(config, /kind: "local"/);
  assert.match(config, /content\/work\/stories\/\*/);
  assert.doesNotMatch(config, /kind: "github"|kind: "cloud"/);
});

test("malformed Work narratives, unknown keys, missing stories, and extra files fail closed", () => {
  const valid = records();
  assert.doesNotThrow(() => readWorkNarratives(files, valid));
  assert.throws(() =>
    readWorkNarratives(files, { ...valid, "enterprise-selling": null }),
  );

  assert.throws(() => readWorkNarratives([...files, "extra.json"], valid));
  assert.throws(() =>
    readWorkNarratives(
      files.filter((file) => file !== "team-enablement.json"),
      valid,
    ),
  );
  assert.throws(() => readWorkNarratives([...files, "notes.txt"], valid));

  const mismatched = records();
  mismatched["enterprise-selling"] = {
    ...mismatched["enterprise-selling"],
    id: "team-enablement",
  };
  assert.throws(() => readWorkNarratives(files, mismatched));

  for (const change of [
    { title: "  " },
    { evidence: "" },
    { area: "Enterprise Sales" },
    { related: [] },
    { href: "/work" },
    { classification: "private" },
    { publicationStatus: "approved" },
    { contentVersion: 0 },
    { reviewDue: "2026-02-30" },
    { lastReviewed: "yesterday" },
    { scope: " " },
  ]) {
    const broken = records();
    broken["competitive-evidence"] = {
      ...broken["competitive-evidence"],
      ...change,
    };
    assert.throws(() => readWorkNarratives(files, broken));
  }

  const { decision, ...missingDecision } = records()["team-enablement"];
  assert.equal(decision, teamEnablement.decision);
  const incomplete = records();
  incomplete["team-enablement"] = missingDecision as typeof teamEnablement;
  assert.throws(() => readWorkNarratives(files, incomplete));
});
