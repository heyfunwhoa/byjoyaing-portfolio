import assert from "node:assert/strict";
import test from "node:test";
import { curriculum, technologies, findTechnology, getStartingLessons } from "./programming.ts";

test("technology IDs and lesson slugs are unique", () => {
  assert.equal(new Set(technologies.map(t => t.id)).size, technologies.length);
  assert.equal(new Set(curriculum.map(l => l.slug)).size, curriculum.length);
});
test("each technology has a credible documentation URL and example", () => {
  for (const item of technologies) {
    assert.ok(item.source.startsWith("https://"));
    assert.ok(item.example.trim().length > 0);
    assert.ok(item.summary.trim().length > 10);
    assert.equal(findTechnology(item.id)?.id, item.id);
  }
});
test("all referenced technologies and prerequisites exist", () => {
  for (const item of technologies) {
    for (const id of item.related) assert.ok(findTechnology(id), id);
  }
  const slugs=new Set(curriculum.map(l=>l.slug));
  for (const l of curriculum) for (const pre of l.prerequisites) assert.ok(slugs.has(pre), pre);
});
test("learning path has a beginner entry point", () => {
  assert.ok(getStartingLessons().length > 0);
  assert.ok(getStartingLessons().some(l => l.slug === "how-code-works"));
});
