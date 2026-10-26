import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { careerRailNodes } from "./career-rail.ts";
import { roles } from "./portfolio.ts";

const read = (file: string) => readFileSync(new URL(`../${file}`, import.meta.url), "utf8");

test("career rail lists employers and titles without publishing role dates", () => {
  const nodes = careerRailNodes();
  assert.equal(nodes.length, roles.length);
  assert.deepEqual(
    nodes.map((node) => node.company),
    [...roles].reverse().map((role) => role.company),
  );
  assert.equal(nodes[0].company, "Websense");
  assert.equal(nodes.at(-1)?.company, "Truffle Security");
  for (const node of nodes) {
    assert.ok(roles.some((role) => role.company === node.company && role.title === node.title));
    assert.doesNotMatch(Object.values(node).join(" "), /\$|Head of Sales|Joy Index/i);
  }
  assert.equal("period" in roles[0], false);
  assert.doesNotMatch(read("components/career-rail.tsx"), /startYear|endLabel|period/);
  assert.doesNotMatch(read("components/experience-timeline.tsx"), /role\.period/);
});

test("source guard: the rail is static and placed on Experience and About only", () => {
  assert.doesNotMatch(read("components/career-rail.tsx"), /"use client"|animate-|@keyframes|from "motion/);
  assert.match(read("app/experience/page.tsx"), /<CareerRail/);
  assert.match(read("app/about/page.tsx"), /<CareerRail/);
  assert.doesNotMatch(read("app/page.tsx"), /CareerRail|career-rail/);
});
