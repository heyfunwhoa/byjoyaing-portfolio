import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import test from "node:test";

const root = path.resolve(import.meta.dirname, "..");

function pageFiles(dir: string): string[] {
  const found: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) found.push(...pageFiles(full));
    else if (entry === "page.tsx") found.push(full);
  }
  return found;
}

test("page titles are topics so the layout template can add the name once", () => {
  const layout = readFileSync(path.join(root, "app/layout.tsx"), "utf8");
  assert.match(layout, /template: "%s — Kristen Aing"/);
  const home = readFileSync(path.join(root, "app/(site)/page.tsx"), "utf8");
  assert.match(home, /absolute: "Revenue & GTM Leader · Curious Builder — Kristen Aing"/);
  for (const file of pageFiles(path.join(root, "app"))) {
    if (
      file.endsWith(`${path.sep}app${path.sep}page.tsx`) ||
      file.endsWith(`${path.sep}(site)${path.sep}page.tsx`)
    ) continue;
    const titleLines = readFileSync(file, "utf8")
      .split("\n")
      .filter((line) => /^\s*title\s*:/.test(line));
    for (const line of titleLines) {
      assert.equal(line.includes("Kristen Aing"), false, `${file} ${line}`);
      assert.equal(line.includes("|"), false, `${file} ${line}`);
    }
  }
});

test("case-study templates render the registry kind", () => {
  const files: Record<string, string> = {
    "app/(site)/work/[slug]/page.tsx": "slug={slug}",
    "components/atlas-case.tsx": 'slug="detector-coverage-atlas"',
    "components/competitive-intelligence-case.tsx": 'slug="competitive-intelligence-engine"',
    "components/account-intelligence-case.tsx": 'slug="account-intelligence"',
    "components/customer-feedback-case.tsx": 'slug="customer-feedback-intelligence"',
    "components/field-asset-case.tsx": "slug={slug}",
  };
  for (const [file, slug] of Object.entries(files)) {
    const source = readFileSync(path.join(root, file), "utf8");
    assert.match(source, /ProjectKindLabel/, file);
    assert.ok(source.includes(slug), file);
  }
});
