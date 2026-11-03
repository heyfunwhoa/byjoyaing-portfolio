import assert from "node:assert/strict";
import { existsSync } from "node:fs";
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
    assert.ok(["ui.shadcn.com", "visx.airbnb.tech", "caliperui.site", "prestigeui.com"].includes(new URL(option.source).hostname));
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
