import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { indexableStaticPaths, noindexPaths } from "./indexing.ts";

const root = path.resolve(import.meta.dirname, "..");

const noindexSource: Record<string, string> = {
  "/ai-academy/programming": "app/ai-academy/programming/page.tsx",
  "/ai-academy/playground": "app/ai-academy/playground/layout.tsx",
  "/ai-academy/playground/skill-builder": "app/ai-academy/playground/layout.tsx",
  "/ai-academy/playground/research-pipeline": "app/ai-academy/playground/layout.tsx",
  "/ai-academy/version-control": "app/ai-academy/version-control/page.tsx",
  "/ai-academy/journeys/prompting": "app/ai-academy/journeys/layout.tsx",
  "/ai-academy/journeys/source-verification": "app/ai-academy/journeys/layout.tsx",
  "/ai-academy/devops/build-rate-limits": "app/ai-academy/devops/layout.tsx",
  "/ai-academy/dependencies/lockfiles": "app/ai-academy/dependencies/layout.tsx",
  "/builder-academy/identity-journey": "app/builder-academy/layout.tsx",
  "/builder-academy/credential-risk": "app/builder-academy/layout.tsx",
  "/work/storytelling-guide": "app/work/storytelling-guide/page.tsx",
  "/prototype": "app/prototype/page.tsx",
  "/private-work": "app/private-work/page.tsx",
  "/account-signal": "app/account-signal/page.tsx",
  "/design-lab": "app/design-lab/page.tsx",
};

test("the sitemap list and the noindex list do not overlap", () => {
  const indexed = new Set<string>(indexableStaticPaths);
  for (const pathName of noindexPaths) {
    assert.equal(indexed.has(pathName), false, pathName);
  }
  assert.equal(indexed.has("/ai-academy/programming"), false);
  assert.equal(indexed.has("/experience"), true);
  assert.equal(indexed.has("/"), true);
  const sitemap = readFileSync(path.join(root, "app/sitemap.ts"), "utf8");
  assert.match(sitemap, /indexableStaticPaths/);
  assert.match(sitemap, /projects\.map/);
  assert.equal(sitemap.includes("programming"), false);
  assert.equal(sitemap.includes("storytelling-guide"), false);
});

test("every noindex route sets robotsNoindex in its page or a parent layout", () => {
  assert.deepEqual(Object.keys(noindexSource).sort(), [...noindexPaths].sort());
  for (const [route, file] of Object.entries(noindexSource)) {
    const source = readFileSync(path.join(root, file), "utf8");
    assert.match(source, /robotsNoindex/, route);
  }
});
