import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";
import {
  componentApps,
  componentOptions,
  optionsForApp,
} from "./component-options.ts";

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

test("native learning territories retain source IDs without unmaintained native package dependencies", () => {
  const root = new URL("../", import.meta.url);
  const manifest = JSON.parse(readFileSync(new URL("package.json", root), "utf8"));
  const lock = JSON.parse(readFileSync(new URL("package-lock.json", root), "utf8"));
  const source = readFileSync(
    new URL("components/design-lab/learning-challenge.tsx", root), "utf8",
  );
  const style = readFileSync(
    new URL("components/design-lab/learning-challenge.module.css", root), "utf8",
  );
  assert.equal(manifest.dependencies["react-hexgrid"], undefined);
  assert.equal(lock.packages[""].dependencies["react-hexgrid"], undefined);
  assert.equal(lock.packages["node_modules/react-hexgrid"], undefined);
  assert.equal(lock.packages["node_modules/react-hexgrid/node_modules/fsevents"], undefined);
  assert.equal(lock.packages["node_modules/bindings"], undefined);
  assert.equal(lock.packages["node_modules/nan"], undefined);
  assert.ok(source.includes('role="group" aria-label="Learning territories"'));
  assert.ok(source.includes("aria-pressed={selected === index}"));
  assert.ok(source.includes('type="button"'));
  assert.ok(!source.includes("react-hexgrid"));
  assert.ok(style.includes(":focus-visible"));
  const option = componentOptions.find((item) => item.id === "game-hexgrid");
  assert.ok(option);
  assert.equal(option.availability, "Available here");
  assert.match(option.adoption, /native HTML buttons/i);
});
