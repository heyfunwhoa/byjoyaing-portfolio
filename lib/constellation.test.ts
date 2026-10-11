import assert from "node:assert/strict";
import test from "node:test";
import { constellationNotes, constellationSlugs } from "./constellation.ts";

test("the constellation stays on three honest projects", () => {
  assert.deepEqual(constellationSlugs, [
    "competitive-intelligence-engine",
    "detector-coverage-atlas",
    "truffle-camp",
  ]);
  for (const slug of constellationSlugs) {
    assert.equal(slug.includes("revenue"), false);
    assert.equal(slug.includes("gtm-operating"), false);
  }
  assert.equal(constellationNotes.length, 3);
  for (const note of constellationNotes) {
    assert.equal(constellationSlugs.includes(note.from), true);
    assert.equal(constellationSlugs.includes(note.to), true);
    assert.match(note.text, /does not|not a deployment/);
  }
});
