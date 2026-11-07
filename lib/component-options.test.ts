import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";
import {
  componentApps,
  componentOptions,
  optionsForApp,
} from "./component-options.ts";
import {
  patternEvidence,
  patternFamilies,
  patternStages,
  patternsForLibrary,
  patternFileUrl,
  stageDefinitions,
  toPatternRecord,
} from "./design-lab/pattern-adoption.ts";
import {
  evidenceReviewScenarios,
  evidenceReviewReadiness,
  evidenceReviewStates,
} from "./design-lab/evidence-review.ts";

test("curated options retain valid destinations and official source links", () => {
  assert.equal(
    new Set(componentOptions.map((option) => option.id)).size,
    componentOptions.length,
  );
  for (const option of componentOptions) {
    assert.ok(["ui.shadcn.com", "visx.airbnb.tech", "caliperui.site", "prestigeui.com", "github.com", "kenney.nl", "twinery.org", "motioncanvas.io", "ffmpeg.org", "www.remotion.dev", "h5p.org", "motion.dev", "www.radix-ui.com", "animate-ui.com", "developer.mozilla.org"].includes(new URL(option.source).hostname));
    assert.ok(option.apps.length > 0);
    assert.ok(option.apps.every((app) => componentApps.includes(app)));
  }
  for (const app of componentApps) {
    const options = optionsForApp(app);
    assert.ok(options.length > 0);
    assert.ok(options.every((option) => option.apps.includes(app)));
  }
  assert.equal(optionsForApp("All").length, componentOptions.length);
});

test("availability labels agree with the portfolio source boundary", () => {
  const paths: Record<string, string[]> = {
    "game-inkjs": ["../gameful/discovery-pilot"],
    "game-react-quiz": ["../design-lab/learning-challenge"],
    "game-hexgrid": ["../design-lab/learning-challenge"],
    identity: ["avatar", "tooltip"],
    summaries: ["card", "bento-grid", "carousel"],
    disclosure: ["tabs", "accordion"],
    context: ["sheet", "dialog", "hover-card"],
    "evidence-workflow": ["../design-lab/evidence-review-pattern"],
  };
  for (const option of componentOptions.filter(
    (option) => option.availability === "Available here",
  )) {
    assert.ok(paths[option.id], `Unverified availability: ${option.id}`);
    for (const name of paths[option.id])
      assert.ok(
        existsSync(new URL(`../components/ui/${name}.tsx`, import.meta.url)),
      );
  }
});

test("search combines purpose, components, project and availability filters", () => {
  assert.deepEqual(
    optionsForApp("Portfolio", "  AVATAR  ", "Available here").map(
      (option) => option.id,
    ),
    ["identity"],
  );
  assert.deepEqual(
    optionsForApp("Detector Coverage Atlas", "column filters", "Candidate").map(
      (option) => option.id,
    ),
    ["data"],
  );
  assert.equal(optionsForApp("Security Market Map", "avatar").length, 0);
  assert.equal(optionsForApp("All", "calendar", "Available here").length, 0);
});

test("empty and whitespace searches have predictable recovery behavior", () => {
  assert.equal(optionsForApp("All", " \t ").length, componentOptions.length);
  assert.equal(optionsForApp("All", "no-such-component").length, 0);
  assert.equal(
    optionsForApp("All", "", "Available here").every(
      (option) => option.availability === "Available here",
    ),
    true,
  );
});

test("visx recommendations stay candidates with focused destination filters", () => {
  const visx = componentOptions.filter((option) => option.id.startsWith("visx-"));
  assert.equal(visx.length, 4);
  assert.ok(visx.every((option) => option.availability === "Candidate"));
  assert.deepEqual(optionsForApp("Detector Coverage Atlas", "heatmap", "Candidate").map((option) => option.id), ["visx-coverage"]);
  assert.equal(optionsForApp("Portfolio", "Heatmap").length, 0);
});

test("creative production candidates are searchable without implying installation", () => {
  const options = optionsForApp("GTM Revenue OS", "creative", "Candidate");
  assert.equal(options.filter(option => option.id.startsWith("creative-")).length, 5);
  assert.ok(optionsForApp("Portfolio", "marketing").some(option => option.id === "creative-penpot"));
  assert.equal(optionsForApp("All", "creative", "Available here").length, 0);
  assert.match(componentOptions.find(option => option.id === "creative-remotion")!.adoption, /Source-available/);
});

test("workflow motion options are review-only candidates", () => {
  const ids = ["motion-react-purposeful", "autoanimate-list-transitions", "motion-primitives-disclosure"];
  for (const id of ids) {
    const option = componentOptions.find((item) => item.id === id);
    assert.ok(option, id);
    assert.equal(option.availability, "Candidate");
    assert.ok(option.apps.includes("GTM Revenue OS"));
  }
});

 test("specific motion patterns remain searchable GTM candidates", () => {
  for (const id of ["motion-selection-indicator","motion-evidence-accordion","motion-copy-feedback","motion-native-view-transition"]) {
    const option = componentOptions.find(item => item.id === id);
    assert.ok(option);
    assert.equal(option.availability, "Candidate");
    assert.ok(optionsForApp("GTM Revenue OS").includes(option));
  }
  assert.ok(optionsForApp("GTM Revenue OS", "clipboard", "Candidate").some(item => item.id === "motion-copy-feedback"));
});

test("progress and operation motion stay review-only and discoverable", () => {
 for (const id of ["motion-task-progress","motion-context-panel","motion-operation-feedback","motion-priority-reorder"]) {
  const item = componentOptions.find(option => option.id === id);
  assert.ok(item);
  assert.equal(item.availability, "Candidate");
  assert.ok(optionsForApp("GTM Revenue OS").includes(item));
 }
 assert.ok(optionsForApp("GTM Revenue OS", "priority", "Candidate").some(item => item.id === "motion-priority-reorder"));
});

test("validation loading and workflow traces remain candidates", () => {
 for (const id of ["motion-field-validation","motion-loading-placeholder","motion-workflow-trace"]) {
  const option = componentOptions.find(item => item.id === id);
  assert.ok(option);
  assert.equal(option.availability, "Candidate");
  assert.ok(optionsForApp("GTM Revenue OS").includes(option));
 }
});

test("pattern library is a view over the canonical component options, not a duplicate list", () => {
  const records = patternsForLibrary();
  assert.equal(records.length, componentOptions.length);
  assert.equal(new Set(records.map((record) => record.id)).size, records.length);
  assert.deepEqual(
    new Set(records.map((record) => record.id)),
    new Set(componentOptions.map((option) => option.id)),
  );
  assert.deepEqual(patternStages, ["Candidate", "Prototype", "Approved", "Adopted"]);
  assert.ok(patternFamilies.length >= 5);
  for (const stage of patternStages) assert.ok(stageDefinitions[stage].length > 20);
});

test("pattern states require real source or explicit decision evidence", () => {
  const records = patternsForLibrary();
  assert.ok(records.some((record) => record.stage === "Candidate"));
  assert.ok(records.some((record) => record.stage === "Prototype"));
  assert.ok(records.some((record) => record.stage === "Adopted"));
  // No owner approval is inferred from available code or green CI.
  assert.equal(records.filter((record) => record.stage === "Approved").length, 0);
  for (const item of records) {
    if (item.stage === "Adopted") assert.ok(item.uses.length > 0);
    if (item.stage === "Approved") assert.ok(item.approval?.decisionUrl);
    if (item.availability === "Candidate") assert.equal(item.stage, "Candidate");
    if (item.uses.length > 0) {
      for (const use of item.uses) {
        assert.equal(use.scope, "source-level");
        assert.ok(use.repository.startsWith("heyfunwhoa/"));
        if (use.repository !== "heyfunwhoa/byjoyaing-portfolio") {
          assert.match(use.ref ?? "", /^[a-f0-9]{40}$/);
        }
      }
    }
  }
});

test("local and external pattern uses require inspected source and pinned provenance", () => {
  const knownPortfolioConsumers: Record<string, string> = {
    "components/toolkit-explorer.tsx": 'from "@/components/ui/tabs"',
    "components/stakeholder-map/stakeholder-detail.tsx": 'from "@/components/ui/card"',
  };
  // Exact current main commit references inspected in the named repositories.
  const reviewedExternal = new Map([
    ["heyfunwhoa/security-market-map/components/scenario-player.tsx", "92c01d81770c24be95e41057bdbdf991879dbe42"],
    ["heyfunwhoa/account-signal-engine/components/feed-app.tsx", "ea4971dcb81da1463f672e2d71f1cd460718c777"],
    ["heyfunwhoa/truffle-camp/components/trail-checkpoint.tsx", "b3bcfae69a959fc2fe7142689335018f4c891974"],
  ]);
  let inspectedExternal = 0;
  for (const id of Object.keys(patternEvidence)) {
    const option = componentOptions.find((item) => item.id === id);
    assert.ok(option, `Missing canonical pattern ID ${id}`);
    const record = toPatternRecord(option);
    for (const source of record.localSource) {
      assert.ok(!source.path.startsWith("/"));
      assert.ok(!source.path.includes(".."));
      assert.ok(existsSync(new URL(`../${source.path}`, import.meta.url)), `Missing: ${source.path}`);
      assert.ok(patternFileUrl(source).startsWith("https://github.com/heyfunwhoa/byjoyaing-portfolio/blob/"));
    }
    for (const use of record.uses) {
      assert.ok(!use.path.startsWith("/") && !use.path.includes(".."));
      if (use.repository === "heyfunwhoa/byjoyaing-portfolio") {
        assert.ok(knownPortfolioConsumers[use.path], `Unreviewed local consumer: ${use.path}`);
        const body = readFileSync(new URL(`../${use.path}`, import.meta.url), "utf8");
        assert.ok(
          body.includes(knownPortfolioConsumers[use.path]),
          `Missing inspected import in ${use.path}`,
        );
      } else {
        const key = `${use.repository}/${use.path}`;
        assert.equal(use.ref, reviewedExternal.get(key), `Unreviewed pinned external path ${key}`);
        assert.match(use.ref!, /^[a-f0-9]{40}$/);
        inspectedExternal++;
      }
      assert.ok(patternFileUrl(use, use.repository).includes(`/blob/${use.ref ?? "main"}/`));
    }
  }
  assert.equal(inspectedExternal, 3);
});

test("pattern stage, family, app and keyword filters combine without losing source evidence", () => {
  assert.deepEqual(
    patternsForLibrary({ stage: "Adopted" }).map((item) => item.id),
    ["summaries", "disclosure", "context"],
  );
  assert.deepEqual(
    patternsForLibrary({ query: "toolkit explorer" }).map((item) => item.id),
    ["disclosure"],
  );
  assert.deepEqual(
    patternsForLibrary({ app: "Security Market Map", stage: "Adopted" }).map((item) => item.id),
    ["summaries", "disclosure", "context"],
  );
  assert.deepEqual(patternsForLibrary({ stage: "Approved" }), []);
  assert.ok(
    patternsForLibrary({ family: "Learning & gameful" }).every(
      (item) => item.family === "Learning & gameful",
    ),
  );
  assert.equal(patternsForLibrary({ query: "nothing-will-ever-match" }).length, 0);
  assert.equal(patternsForLibrary({ query: "  " }).length, componentOptions.length);
});

test("evidence review is a local prototype, not a verified adoption", () => {
  const option = componentOptions.find((item) => item.id === "evidence-workflow");
  assert.ok(option);
  assert.equal(option.availability, "Available here");
  assert.equal(toPatternRecord(option).stage, "Prototype");
  assert.equal(toPatternRecord(option).uses.length, 0);
  assert.ok(toPatternRecord(option).localSource.length >= 1);
  assert.deepEqual(
    patternsForLibrary({ query: "evidence review checkpoints", stage: "Prototype" }).map((item) => item.id),
    ["evidence-workflow"],
  );
});

test("fictional evidence states preserve provenance and never imply authorization", () => {
  assert.deepEqual(evidenceReviewStates, ["reviewed", "stale", "missing", "restricted"]);
  for (const state of evidenceReviewStates) {
    const record = evidenceReviewScenarios[state];
    assert.equal(record.id, state);
    assert.ok(record.title && record.summary && record.interpretation);
    assert.ok(record.source.reviewNote.length > 15);
    assert.ok(record.nextQuestion.endsWith("?"));
    assert.ok(!JSON.stringify(record).includes("api_key"));
    if (state === "missing" || state === "restricted") {
      assert.equal(record.source.id, null);
      assert.equal(record.source.observation, null);
    }
    const readiness = evidenceReviewReadiness(record);
    assert.equal(readiness.canProposeNextStep, state === "reviewed");
    assert.ok(readiness.message.length > 25);
    if (state === "reviewed") {
      assert.match(readiness.message, /No action is approved or sent/);
    } else {
      assert.ok(!readiness.message.includes("approved"));
    }
  }
  assert.equal(evidenceReviewScenarios.stale.source.reviewedOn, null);
  assert.ok(evidenceReviewScenarios.reviewed.source.id?.startsWith("FIXTURE"));
});
