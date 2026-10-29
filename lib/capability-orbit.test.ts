import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { nextPillarIndex, orbitCenter, orbitPillars } from "./capability-orbit.ts";
import { kindBySlug } from "./portfolio-kind.ts";

const forbidden = [/\$/, /%/, /Head of Sales/i, /Joy Index/i, /\d{3}[-. ]\d{3}[-. ]\d{4}/, /\b(two|seven) (SDRs|GTM hires)/i];

function allText() {
  return [
    orbitCenter.summary,
    orbitCenter.detail,
    ...orbitCenter.links.map((link) => link.label),
    ...orbitPillars.flatMap((p) => [p.summary, p.boundary ?? "", ...p.evidence.map((e) => e.text), ...p.links.map((l) => l.label)]),
  ];
}

test("enterprise selling is the center and the three pillars keep brand order", () => {
  assert.equal(orbitCenter.label, "Enterprise selling");
  assert.equal(orbitCenter.href, "/work#enterprise-sales");
  assert.deepEqual(
    orbitCenter.links.map((link) => [link.href, link.collection, link.label]),
    [["/work#enterprise-sales", "Work", "Enterprise deal execution"]],
  );
  assert.deepEqual(orbitPillars.map((p) => p.label), ["Strategist", "Leader", "Builder"]);
  for (const pillar of orbitPillars) {
    assert.ok(pillar.summary.length > 20);
    assert.ok(pillar.evidence.length > 0);
    assert.ok(pillar.links.length > 0);
  }
});

test("copy carries no unverified figures, titles, or private content", () => {
  for (const text of allText()) for (const pattern of forbidden) assert.doesNotMatch(text, pattern);
});

test("links stay on existing public routes and respect the Work / Side Quest split", () => {
  const routes = /^\/(work(#[a-z-]+)?|work\/[a-z0-9-]+|experience|about|side-quests)$/;
  for (const link of [...orbitCenter.links, ...orbitPillars.flatMap((pillar) => pillar.links)]) {
    assert.match(link.href, routes, link.href);
    const slug = link.href.startsWith("/work/") ? link.href.slice("/work/".length) : null;
    if (slug) {
      const kind = kindBySlug[slug];
      assert.ok(kind, `unclassified ${slug}`);
      assert.equal(kind === "side-quest", link.collection === "Side Quests", link.href);
    }
    if (link.href === "/side-quests") assert.equal(link.collection, "Side Quests");
  }
});

test("only the Builder pillar mentions independent work, and it says so", () => {
  for (const pillar of orbitPillars) {
    const independent = pillar.evidence.filter((e) => e.source === "independent");
    const sideQuestLinks = pillar.links.filter((l) => l.collection === "Side Quests");
    if (pillar.id === "builder") {
      assert.equal(independent.length, 1);
      assert.match(independent[0].text, /not employer deployments/);
      assert.ok(pillar.evidence.some((e) => e.source === "employer"));
    } else {
      assert.equal(independent.length, 0, pillar.id);
      assert.equal(sideQuestLinks.length, 0, pillar.id);
    }
  }
  assert.match(orbitPillars.find((p) => p.id === "leader")?.boundary ?? "", /Not a direct-management title/);
});

test("arrow, Home, and End keys wrap through the pillars", () => {
  assert.equal(nextPillarIndex(0, "ArrowRight", 3), 1);
  assert.equal(nextPillarIndex(2, "ArrowDown", 3), 0);
  assert.equal(nextPillarIndex(0, "ArrowLeft", 3), 2);
  assert.equal(nextPillarIndex(1, "ArrowUp", 3), 0);
  assert.equal(nextPillarIndex(1, "Home", 3), 0);
  assert.equal(nextPillarIndex(0, "End", 3), 2);
  assert.equal(nextPillarIndex(1, "Enter", 3), null);
});

test("source guard: the orbit is static, uses no motion library, and is placed on About only", () => {
  const source = readFileSync(new URL("../components/capability-orbit.tsx", import.meta.url), "utf8");
  assert.doesNotMatch(source, /from "motion|framer-motion|@\/components\/ui\//);
  assert.doesNotMatch(source, /animate-spin|<animate|@keyframes|requestAnimationFrame/);
  assert.match(source, /role="tablist"/);
  assert.match(source, /role="tabpanel"/);
  assert.match(source, /aria-hidden="true"/);
  assert.match(source, /treatment="charcoal"/);
  assert.match(source, /orbitCenter\.label/);
  assert.match(source, /useState<OrbitSelection>\("center"\)/);
  assert.match(source, /aria-pressed=\{selected === "center"\}/);
  assert.doesNotMatch(source, /href=\{orbitCenter\.href\}/);
  assert.doesNotMatch(source, /target="_blank"/);
  const about = readFileSync(new URL("../app/about/page.tsx", import.meta.url), "utf8");
  assert.match(about, /<CapabilityOrbit/);
  assert.match(about, /<OrbitArtwork[\s\S]*?treatment="transparent"[\s\S]*?surface="ivory"/);
  assert.doesNotMatch(about, /OrbitPortrait|BrandAvatar/);
  const home = readFileSync(new URL("../app/page.tsx", import.meta.url), "utf8");
  assert.doesNotMatch(home, /CapabilityOrbit|capability-orbit|OrbitPortrait|orbit-artwork|brand\/orbits/);
  // Rendered behavior (keyboard, widths, reduced motion) is checked in a browser, not here.
});
