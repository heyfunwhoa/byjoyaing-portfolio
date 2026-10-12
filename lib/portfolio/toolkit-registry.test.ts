import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { officialToolWebsites } from "./external-links.ts";
import { technologies } from "./technology-registry.ts";
import { gtmSystemsToolkit, siteHowBuilt } from "./toolkit-registry.ts";

const root = path.resolve(import.meta.dirname, "../..");
const forbidden = [/\$/, /Head of Sales/i, /Joy Index/i, /\d{3}[-. ]\d{3}[-. ]\d{4}/];

const expectedIds = [
  "salesforce",
  "attio",
  "outreach",
  "nooks",
  "gong",
  "commonroom",
  "clay",
  "notion",
  "chatgpt",
  "claude",
  "cursor",
  "github",
  "vercel",
  "firecrawl",
  "exa",
] as const;

test("the GTM toolkit is a curated public collection with local marks", () => {
  assert.deepEqual(
    gtmSystemsToolkit.map((item) => item.id),
    [...expectedIds],
  );
  for (const item of gtmSystemsToolkit) {
    assert.match(item.id, /^[a-z]+$/);
    assert.equal(item.id in officialToolWebsites, true, item.id);
    assert.match(officialToolWebsites[item.id], /^https:\/\//);
    assert.match(item.logo, /^\/logos\/toolkit\/[a-z]+\.(svg|png)$/);
    assert.equal(existsSync(path.join(root, "public", item.logo)), true, item.logo);
    for (const pattern of forbidden) {
      assert.doesNotMatch(`${item.name} ${item.note} ${item.source}`, pattern);
    }
  }
  for (const pattern of forbidden) {
    assert.doesNotMatch(siteHowBuilt, pattern);
  }
});

test("toolkit marks stay off the Side Quest verified stack", () => {
  for (const id of ["salesforce", "attio", "exa", "claude", "firecrawl"]) {
    assert.equal(id in technologies, false, id);
  }
});

test("toolkit SVGs do not include active content", () => {
  for (const item of gtmSystemsToolkit) {
    if (!item.logo.endsWith(".svg")) continue;
    const svg = readFileSync(path.join(root, "public", item.logo), "utf8").toLowerCase();
    // False positive: this security assertion rejects script tags in static logo SVG files.
    assert.equal(svg.includes("<script"), false); // nosemgrep: javascript.lang.security.audit.unknown-value-with-script-tag.unknown-value-with-script-tag
    assert.equal(svg.includes("foreignobject"), false);
    assert.equal(svg.includes("javascript:"), false);
    assert.equal(svg.includes("onload"), false);
  }
});

test("About leads with linked toolkit logos and hover names", () => {
  const about = readFileSync(path.join(root, "app/about/page.tsx"), "utf8");
  const tools = readFileSync(path.join(root, "components/tools-map.tsx"), "utf8");
  const grid = readFileSync(path.join(root, "components/toolkit-logo-grid.tsx"), "utf8");
  assert.match(about, /<ToolsMap/);
  assert.match(tools, /<ToolkitLogoGrid/);
  assert.match(tools, /siteHowBuilt/);
  assert.match(tools, /officialToolWebsites\[item\.id\]/);
  assert.match(grid, /href=\{href\}/);
  assert.match(grid, /rel="noopener noreferrer"/);
  assert.match(grid, /group-hover\/toolkit:opacity-100/);
  assert.match(grid, /group-focus-visible\/toolkit:opacity-100/);
  assert.match(grid, /item\.name/);
  assert.match(grid, /size-8/);
  assert.doesNotMatch(grid, /size-16/);
  assert.match(grid, /flex max-w-xl flex-wrap/);
  assert.doesNotMatch(about, /Joy Index/i);
  assert.doesNotMatch(tools, /Joy Index/i);
  assert.doesNotMatch(grid, /from "@\/components\/ui/);
});
