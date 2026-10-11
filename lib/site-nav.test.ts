import assert from "node:assert/strict";
import test from "node:test";
import { isActive, menuPanelClass, primaryNav } from "./site-nav.ts";

test("primary navigation keeps the six public destinations", () => {
  assert.deepEqual(
    primaryNav.map((link) => link.href),
    ["/", "/about", "/work", "/field-notes", "/side-quests", "/contact"],
  );
});

test("active state does not treat a case-study URL as the Work index", () => {
  assert.equal(isActive("/", "/"), true);
  assert.equal(isActive("/about", "/"), false);
  assert.equal(isActive("/work", "/work"), true);
  assert.equal(isActive("/work/detector-coverage-atlas", "/work"), false);
  assert.equal(isActive("/side-quests", "/side-quests"), true);
  assert.equal(isActive("/projects", "/side-quests"), false);
  assert.equal(isActive("/field-notes/multithreading", "/field-notes"), true);
  assert.equal(isActive("/contact", "/contact"), true);
});

test("a closed mobile menu is hidden and does not stay fixed in the layout", () => {
  const closed = menuPanelClass(false);
  assert.match(closed, /\bhidden\b/);
  assert.equal(closed.includes("fixed"), false);
  const open = menuPanelClass(true);
  assert.match(open, /\bfixed\b/);
  assert.equal(open.includes("hidden"), false);
  assert.match(open, /\blg:static\b/);
});
