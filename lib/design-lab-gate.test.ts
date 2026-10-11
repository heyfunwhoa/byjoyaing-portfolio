import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { designLabAvailable } from "./design-lab-gate.ts";

const root = path.resolve(import.meta.dirname, "..");

test("the design lab is available outside production", () => {
  assert.equal(designLabAvailable("production"), false);
  assert.equal(designLabAvailable("development"), true);
  assert.equal(designLabAvailable("test"), true);
});

test("the design lab page returns 404 before rendering a preview", () => {
  const page = readFileSync(path.join(root, "app/design-lab/page.tsx"), "utf8");
  const notFoundAt = page.indexOf("notFound()");
  const suspenseAt = page.indexOf("<Suspense");
  assert.ok(notFoundAt > -1);
  assert.ok(page.indexOf("designLabAvailable()") < notFoundAt);
  if (suspenseAt !== -1) assert.ok(notFoundAt < suspenseAt);

  const sitemap = readFileSync(path.join(root, "app/sitemap.ts"), "utf8");
  assert.equal(sitemap.includes("design-lab"), false);
  const nav = readFileSync(path.join(root, "lib/site-nav.ts"), "utf8");
  assert.equal(nav.includes("design-lab"), false);
});

test("the homepage prototype 404s in production before the retired headline", () => {
  const page = readFileSync(path.join(root, "app/prototype/page.tsx"), "utf8");
  const notFoundAt = page.indexOf("notFound()");
  const headlineAt = page.indexOf("Commercial Leader");
  assert.ok(notFoundAt > -1);
  assert.ok(headlineAt > notFoundAt);
  assert.ok(page.indexOf("designLabAvailable()") < notFoundAt);
  assert.match(page, /robotsNoindex/);
});
