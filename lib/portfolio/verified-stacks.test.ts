import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { technologies } from "./technology-registry.ts";
import {
  CARD_LOGO_LIMIT,
  compactTechnologyIds,
  verifiedStack,
  verifiedTechnologyStacks,
} from "./verified-stacks.ts";

const root = path.resolve(import.meta.dirname, "../..");

const portfolioPage = ["nextjs", "react", "typescript", "tailwindcss"] as const;

const withoutLogos = [
  "product-release-intelligence",
  "product-prioritization-simulator",
  "revenue-planning-simulator",
  "revenue-intelligence",
  "gtm-operating-plan",
  "gtm-campaign-lab",
  "security-signal-intelligence",
] as const;

test("detector coverage atlas uses the verified portfolio stack plus its public repo", () => {
  assert.deepEqual(verifiedStack("detector-coverage-atlas"), [...portfolioPage, "github"]);
  assert.deepEqual(compactTechnologyIds("detector-coverage-atlas"), portfolioPage);
});

test("other in-repo samples share the page stack and omit planned products", () => {
  for (const slug of [
    "account-intelligence",
    "competitive-intelligence-engine",
    "customer-feedback-intelligence",
    "truffle-camp",
    "partner-gtm-engine",
  ]) {
    assert.deepEqual(verifiedStack(slug), portfolioPage);
  }
});

test("unverified and concept projects do not receive vendor logos", () => {
  for (const slug of withoutLogos) {
    assert.deepEqual(verifiedStack(slug), []);
    assert.deepEqual(compactTechnologyIds(slug), []);
  }
  const assigned: readonly string[] = Object.values(verifiedTechnologyStacks).flat();
  assert.equal(assigned.includes("vercel"), false);
  assert.equal("postgres" in technologies, false);
  assert.equal("supabase" in technologies, false);
});

test("every registered logo is a local svg without active content", () => {
  for (const technology of Object.values(technologies)) {
    assert.match(technology.logo, /^\/logos\/technology\/[a-z0-9-]+\.svg$/);
    const file = path.join(root, "public", technology.logo);
    assert.equal(existsSync(file), true, technology.logo);
    const svg = readFileSync(file, "utf8").toLowerCase();
    assert.equal(svg.includes("<script"), false);
    assert.equal(svg.includes("foreignobject"), false);
    assert.equal(svg.includes("javascript:"), false);
    assert.equal(svg.includes("onload"), false);
  }
});

test("compact cards never exceed the logo limit", () => {
  for (const slug of Object.keys(verifiedTechnologyStacks)) {
    assert.ok(compactTechnologyIds(slug).length <= CARD_LOGO_LIMIT);
    assert.ok(compactTechnologyIds(slug).length > 0);
  }
});
