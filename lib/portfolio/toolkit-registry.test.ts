import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { officialToolWebsites } from "./external-links.ts";
import { technologies } from "./technology-registry.ts";
import { gtmSystemsToolkit, siteHowBuilt } from "./toolkit-registry.ts";

import { toolkitSections } from "./toolkit-sections.ts";
import { techCategories } from "../portfolio.ts";

const root = path.resolve(import.meta.dirname, "../..");
const forbidden = [
  /\$/,
  /Head of Sales/i,
  /Joy Index/i,
  /\d{3}[-. ]\d{3}[-. ]\d{4}/,
];

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
    assert.equal(
      existsSync(path.join(root, "public", item.logo)),
      true,
      item.logo,
    );
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
    const svg = readFileSync(
      path.join(root, "public", item.logo),
      "utf8",
    ).toLowerCase();
    // False positive: this security assertion rejects script tags in static logo SVG files.
    assert.equal(svg.includes("<script"), false); // nosemgrep: javascript.lang.security.audit.unknown-value-with-script-tag.unknown-value-with-script-tag
    assert.equal(svg.includes("foreignobject"), false);
    assert.equal(svg.includes("javascript:"), false);
    assert.equal(svg.includes("onload"), false);
  }
});

test("About presents purpose sections with visible names and secure product links", () => {
  const about = readFileSync(path.join(root, "app/(site)/about/page.tsx"), "utf8");
  const tools = readFileSync(
    path.join(root, "components/tools-map.tsx"),
    "utf8",
  );
  const explorer = readFileSync(
    path.join(root, "components/toolkit-explorer.tsx"),
    "utf8",
  );
  assert.match(about, /<ToolsMap/);
  assert.match(tools, /<ToolkitExplorer/);
  assert.match(tools, /siteHowBuilt/);
  assert.match(explorer, /<TabsTrigger/);
  assert.match(explorer, /<Collapsible.Trigger/);
  assert.match(explorer, /rel="noopener noreferrer"/);
  assert.match(explorer, /tool.name/);
  assert.doesNotMatch(about + tools + explorer, /Joy Index/i);
});

test("purpose sections preserve every tool and its evidence without duplicates", () => {
  const existing = new Map<string, { stance: string; note: string }>([
    ...techCategories.flatMap((group) =>
      group.items.map((item) => [item.id, item] as const),
    ),
    ...gtmSystemsToolkit.map((item) => [item.id, item] as const),
  ]);
  const grouped = toolkitSections.flatMap((section) => section.tools);
  assert.equal(toolkitSections[0].id, "revenue");
  assert.equal(new Set(grouped.map((item) => item.id)).size, existing.size);
  assert.equal(grouped.length, existing.size);
  for (const item of grouped) {
    assert.equal(item.stance, existing.get(item.id)?.stance);
    assert.equal(item.note, existing.get(item.id)?.note);
    assert.equal(item.href, officialToolWebsites[item.id]);
  }
});

test("workflow examples link to existing evidence with truthful practice labels", () => {
  for (const section of toolkitSections) {
    assert.equal(section.steps.length, 3);
    assert.ok(section.mobileLabel.length > 0 && section.mobileLabel.length <= 24);
    assert.ok(section.example.length > 30);
    const [route, anchor] = section.evidence.href.split("#");
    const page = path.join(root, "app/(site)", route, "page.tsx");
    assert.ok(existsSync(page), section.evidence.href);
    if (anchor)
      assert.ok(
        readFileSync(page, "utf8").includes(`id="${anchor}"`) ||
          (route === "/work" && readFileSync(page, "utf8").includes("<WorkExplorer") &&
            readFileSync(path.join(root, "components/work-explorer.tsx"), "utf8").includes(`id: "${anchor}"`)),
        section.evidence.href,
      );
  }
  assert.match(
    toolkitSections.find((item) => item.id === "build")!.status,
    /Independent/,
  );
  assert.match(
    toolkitSections.find((item) => item.id === "ai")!.status,
    /Learning.*proposed/,
  );
});
