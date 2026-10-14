import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import {
  designLabAvailable,
  filterLabProjects,
  parseLabFilter,
  sortLabProjects,
  toLabProject,
  type LabProjectSource,
} from "./design-lab.ts";

const sources: LabProjectSource[] = [
  {
    slug: "competitive-intelligence-engine",
    title: "Competitive Intelligence Engine",
    summary: "Turn competitor research into a source-backed brief and field guidance.",
    categories: ["Account & Market Intelligence", "Sales Enablement & Productivity"],
    technologies: "Field documents. This page is a sample, not a crawler.",
    preview: "competitive",
    status: "field",
    caseStudyUrl: "/work/competitive-intelligence-engine",
    kind: "work",
  },
  {
    slug: "detector-coverage-atlas",
    title: "Detector Coverage Atlas",
    summary: "Compare secret-detection coverage in a source-backed sample.",
    categories: ["Technical Systems & AI"],
    technologies: "Next.js, React, and TypeScript.",
    preview: "atlas",
    status: "prototype",
    caseStudyUrl: "/work/detector-coverage-atlas",
    kind: "side-quest",
  },
  {
    slug: "revenue-planning-simulator",
    title: "Revenue Planning Simulator",
    summary: "A fictional book for capacity math. Not an employer result.",
    categories: ["Revenue Strategy & Operations"],
    technologies: "Next.js sample.",
    preview: "note",
    status: "prototype",
    caseStudyUrl: "/work/revenue-planning-simulator",
    kind: "side-quest",
  },
  {
    slug: "account-intelligence",
    title: "Account Intelligence",
    summary: "The walkthrough uses fictional accounts and does not call a data source.",
    categories: ["Account & Market Intelligence"],
    technologies: "Next.js sample.",
    preview: "account",
    status: "designed",
    caseStudyUrl: "/work/account-intelligence",
    kind: "side-quest",
  },
];

function sample() {
  return sortLabProjects(sources.map(toLabProject));
}

test("production notFound runs before the gallery Suspense boundary", () => {
  const source = readFileSync(new URL("../app/(site)/design-lab/page.tsx", import.meta.url), "utf8");
  const gate = source.indexOf("if (!designLabAvailable()) notFound();");
  const suspense = source.indexOf("<Suspense");
  assert.equal(gate > 0, true);
  assert.equal(suspense > gate, true);
});

test("the design lab is closed in production", () => {
  assert.equal(designLabAvailable("production"), false);
  assert.equal(designLabAvailable("development"), true);
  assert.equal(designLabAvailable("test"), true);
});

test("lab cards reuse the supplied facts and feature only the field practice", () => {
  const cards = sample();
  const featured = cards.filter((project) => project.featured);
  assert.equal(featured.length, 1);
  assert.equal(featured[0]?.slug, "competitive-intelligence-engine");
  assert.equal(featured[0]?.kind, "work");
  assert.equal(featured[0]?.href, "/work/competitive-intelligence-engine");
  assert.equal(cards.find((project) => project.slug === "account-intelligence")?.featured, false);
  assert.equal(cards.find((project) => project.slug === "revenue-planning-simulator")?.figure, undefined);
  for (const project of cards) {
    assert.match(project.href, /^\/work\/[a-z0-9-]+$/);
    assert.equal(/\$\d/.test(project.summary), false);
    assert.equal(project.summary.length > 20, true);
  }
});

test("filters follow kind and existing categories", () => {
  const projects = sample();
  const work = filterLabProjects(projects, "work");
  const quests = filterLabProjects(projects, "side-quest");
  const gtm = filterLabProjects(projects, "gtm");
  const technical = filterLabProjects(projects, "technical");

  assert.deepEqual(work.map((project) => project.slug), ["competitive-intelligence-engine"]);
  assert.equal(quests.some((project) => project.slug === "competitive-intelligence-engine"), false);
  assert.equal(quests.some((project) => project.slug === "detector-coverage-atlas"), true);
  for (const project of gtm) {
    assert.equal(project.categories.includes("Revenue Strategy & Operations"), true);
  }
  for (const project of technical) {
    assert.equal(project.categories.includes("Technical Systems & AI"), true);
  }
  assert.equal(parseLabFilter("research"), "all");
  assert.equal(parseLabFilter("work"), "work");
  assert.equal(filterLabProjects(projects, "all").length, projects.length);
});

test("the editorial card keeps one link and the existing arrow nudge", () => {
  const source = readFileSync(new URL("../components/editorial-project-card.tsx", import.meta.url), "utf8");
  assert.equal(source.includes("className={`group "), true);
  assert.equal(source.includes("sr-only"), true);
  assert.equal(source.includes("nudge-link"), true);
  assert.equal(source.includes("motion/react"), false);
  assert.equal((source.match(/<Link/g) ?? []).length, 1);
  const motion = readFileSync(new URL("../app/globals.css", import.meta.url), "utf8");
  const reduced = motion.slice(motion.indexOf("prefers-reduced-motion"));
  assert.equal(reduced.includes("transform: none"), true);
});
