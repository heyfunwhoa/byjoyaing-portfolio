import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { careerRailNodes } from "./career-rail.ts";
import { roles } from "./portfolio.ts";

test("career rail lists every public role, oldest first, without changing titles", () => {
  const nodes = careerRailNodes();
  assert.equal(nodes.length, roles.length);
  assert.deepEqual(
    nodes.map((node) => node.company),
    [...roles].reverse().map((role) => role.company),
  );
  assert.equal(nodes[0].company, "Websense");
  assert.equal(nodes.at(-1)?.company, "Truffle Security");
  assert.equal(nodes.at(-1)?.endLabel, "Present");
  for (const node of nodes) {
    assert.match(node.startYear, /^20\d{2}$/);
    assert.match(node.endLabel, /^(20\d{2}|Present)$/);
    assert.ok(roles.some((role) => role.company === node.company && role.title === node.title));
    assert.doesNotMatch(Object.values(node).join(" "), /\$|Head of Sales|Joy Index/i);
  }
});

test("source guard: the rail is static and stays off the homepage", () => {
  const read = (file: string) => readFileSync(new URL(`../${file}`, import.meta.url), "utf8");
  assert.doesNotMatch(read("components/career-rail.tsx"), /"use client"|animate-|@keyframes|from "motion/);
  assert.match(read("app/experience/page.tsx"), /<CareerRail/);
  assert.match(read("app/about/page.tsx"), /<CareerRail/);
  assert.match(read("app/design-lab/page.tsx"), /<CareerRail/);
  assert.doesNotMatch(read("app/page.tsx"), /CareerRail|career-rail/);
});
