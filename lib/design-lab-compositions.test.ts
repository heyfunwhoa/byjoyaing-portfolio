import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import {
  careerRailNodes,
  caseBandSteps,
  caseBandStories,
  pillarOrbitNodes,
} from "./design-lab-compositions.ts";
import { roles } from "./portfolio.ts";

const forbidden = [/\$/, /Head of Sales/i, /Joy Index/i, /\d{3}[-. ]\d{3}[-. ]\d{4}/];

function assertClean(text: string) {
  for (const pattern of forbidden) assert.doesNotMatch(text, pattern);
}

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
    assertClean(Object.values(node).join(" "));
  }
});

test("pillar orbit centers enterprise selling and never points the Builder at Side Quests", () => {
  assert.equal(pillarOrbitNodes.center.label, "Enterprise selling");
  assert.deepEqual(
    pillarOrbitNodes.pillars.map((node) => node.label),
    ["Strategist", "Leader", "Builder"],
  );
  for (const node of [pillarOrbitNodes.center, ...pillarOrbitNodes.pillars]) {
    assert.ok(node.sentence.trim().length > 0);
    assert.ok(node.href.startsWith("/"));
    assert.equal(node.href.startsWith("/side-quests"), false);
    assertClean(node.sentence);
  }
});

test("case bands reuse the five story fields in order and never invent an outcome", () => {
  assert.equal(caseBandStories[0].area, "Enterprise Sales");
  for (const story of caseBandStories) {
    const steps = caseBandSteps(story);
    assert.deepEqual(
      steps.map((step) => step.heading),
      ["Context", "My contribution", "Execution and decisions", "Evidence and limitations", "What I learned"],
    );
    assert.deepEqual(
      steps.map((step) => step.text),
      [story.context, story.contribution, story.execution, story.evidence, story.takeaway],
    );
    for (const step of steps) assertClean(step.text);
  }
});

test("source guard: connected compositions stay in the lab and do not animate", () => {
  const files = [
    "components/design-lab/career-rail.tsx",
    "components/design-lab/pillar-orbit.tsx",
    "components/design-lab/case-band.tsx",
  ];
  for (const file of files) {
    const source = readFileSync(new URL(`../${file}`, import.meta.url), "utf8");
    assert.doesNotMatch(source, /animate-|@keyframes|<animate|from "motion/);
  }
  const lab = readFileSync(new URL("../app/design-lab/page.tsx", import.meta.url), "utf8");
  for (const name of ["CareerRail", "PillarOrbit", "CaseBand"]) assert.match(lab, new RegExp(`<${name}`));

  const root = fileURLToPath(new URL("..", import.meta.url));
  const publicImporters: string[] = [];
  for (const directory of ["app", "components"]) {
    for (const entry of readdirSync(path.join(root, directory), { recursive: true })) {
      const relative = path.join(directory, String(entry));
      if (!/\.tsx?$/.test(relative)) continue;
      if (relative.startsWith("app/design-lab/") || relative.startsWith("components/design-lab/")) continue;
      if (readFileSync(path.join(root, relative), "utf8").includes("components/design-lab/")) {
        publicImporters.push(relative);
      }
    }
  }
  assert.deepEqual(publicImporters, []);
});
