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
    assert.equal(new URL(option.source).hostname, "ui.shadcn.com");
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
