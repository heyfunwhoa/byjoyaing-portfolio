import assert from "node:assert/strict";
import test from "node:test";
import { projects } from "./portfolio.ts";
import {
  kindBySlug,
  portfolioEntries,
  validatePortfolioEntries,
  type PortfolioEntry,
} from "./portfolio-registry.ts";

test("every existing public project is classified exactly once", () => {
  assert.equal(portfolioEntries.length, projects.length);
  assert.deepEqual(
    Object.keys(kindBySlug).sort(),
    projects.map((project) => project.slug).sort(),
  );
  assert.deepEqual(validatePortfolioEntries(portfolioEntries), []);
});

test("professional work is distinguished from independent projects", () => {
  const field = portfolioEntries.find((project) => project.slug === "competitive-intelligence-engine");
  assert.equal(field?.kind, "work");
  assert.equal(portfolioEntries.find((project) => project.slug === "detector-coverage-atlas")?.kind, "side-quest");
});

test("legacy routes and publication review boundaries are preserved", () => {
  for (const project of portfolioEntries) {
    assert.equal(project.href, `/work/${project.slug}`);
    assert.equal(project.evidenceReview, "requires-review");
    assert.ok(project.summary.length > 0);
  }
});

test("invalid/duplicate content is rejected before rendering", () => {
  const good = portfolioEntries[0];
  assert.ok(good);
  const invalid: PortfolioEntry = {
    ...good,
    slug: "INVALID SLUG",
    title: "",
    href: "/missing",
    evidenceNote: "",
  };
  const errors = validatePortfolioEntries([good, good, invalid]);
  assert.ok(errors.some((error) => error.startsWith("Duplicate slug:")));
  assert.ok(errors.some((error) => error.startsWith("Invalid slug:")));
  assert.ok(errors.some((error) => error.startsWith("Missing public text:")));
  assert.ok(errors.some((error) => error.startsWith("Unexpected internal route:")));
  assert.ok(errors.some((error) => error.startsWith("Missing evidence note:")));
});
