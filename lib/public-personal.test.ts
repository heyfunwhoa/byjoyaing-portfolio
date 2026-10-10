import test from "node:test";
import assert from "node:assert/strict";
import { personalValues } from "./public-personal.ts";
test("public profile exposes only concise, curated values", () => {
  assert.equal(new Set(personalValues).size, personalValues.length);
  assert.ok(personalValues.length >= 3);
});
