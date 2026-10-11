import assert from "node:assert/strict";
import test from "node:test";
import { isActive, menuPanelClass, navCurrent, primaryNav } from "./site-nav.ts";

test("primary navigation keeps the six public destinations", () => {
  assert.deepEqual(
    primaryNav.map((link) => link.href),
    ["/", "/about", "/work", "/field-notes", "/side-quests", "/contact"],
  );
});

test("case-study URLs highlight the registry kind and leave unclassified paths quiet", () => {
  assert.equal(isActive("/", "/"), true);
  assert.equal(isActive("/about", "/"), false);
  assert.equal(isActive("/work", "/work"), true);
  assert.equal(isActive("/work/detector-coverage-atlas", "/work"), false);
  assert.equal(isActive("/work/detector-coverage-atlas", "/side-quests"), true);
  assert.equal(isActive("/work/competitive-intelligence-engine", "/work"), true);
  assert.equal(isActive("/work/competitive-intelligence-engine", "/side-quests"), false);
  assert.equal(isActive("/work/storytelling-guide", "/work"), false);
  assert.equal(isActive("/work/storytelling-guide", "/side-quests"), false);
  assert.equal(isActive("/side-quests", "/side-quests"), true);
  assert.equal(isActive("/projects", "/side-quests"), false);
  assert.equal(isActive("/field-notes/multithreading", "/field-notes"), true);
  assert.equal(isActive("/contact", "/contact"), true);
  assert.equal(navCurrent("/work", "/work"), "page");
  assert.equal(navCurrent("/work/competitive-intelligence-engine", "/work"), "true");
  assert.equal(navCurrent("/work/detector-coverage-atlas", "/work"), undefined);
  assert.equal(navCurrent("/field-notes/multithreading", "/field-notes"), "true");
});

test("a closed mobile menu is hidden and an open menu hangs from the header", () => {
  const closed = menuPanelClass(false);
  assert.match(closed, /\bhidden\b/);
  assert.equal(closed.includes("fixed"), false);
  assert.equal(closed.includes("absolute"), false);
  const open = menuPanelClass(true);
  assert.match(open, /\babsolute\b/);
  assert.match(open, /\btop-full\b/);
  assert.equal(open.includes("fixed"), false);
  assert.equal(open.includes("hidden"), false);
  assert.equal(open.includes("4.75rem"), false);
  assert.match(open, /\blg:static\b/);
});
