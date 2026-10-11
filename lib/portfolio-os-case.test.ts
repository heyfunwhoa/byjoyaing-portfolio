import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { portfolioOsCheckpoints, portfolioOsDecision, portfolioOsFeedback } from "./portfolio-os-case.ts";

const root = join(import.meta.dirname, "..");

test("the Portfolio OS case study has six ordered checkpoints and one scored decision", () => {
  assert.deepEqual(portfolioOsCheckpoints.map((item) => item.id), ["requirement", "plan", "agent", "review", "linear", "next"]);
  assert.equal(new Set(portfolioOsCheckpoints.map((item) => item.id)).size, 6);
  assert.equal(portfolioOsDecision.choices.length, 3);
  assert.equal(portfolioOsDecision.answer, 1);
  assert.equal(portfolioOsDecision.choices[portfolioOsDecision.answer].includes("#68"), true);
  const pass = portfolioOsFeedback(1);
  const fail = portfolioOsFeedback(0);
  assert.deepEqual(pass, { passed: true, message: portfolioOsDecision.pass });
  assert.equal(fail?.passed, false);
  assert.match(fail?.message ?? "", /#67/);
  assert.match(pass?.message ?? "", /deployed Academy/);
  assert.match(fail?.message ?? "", /deployed Academy/);
  assert.equal(portfolioOsFeedback(2)?.passed, false);
  assert.equal(portfolioOsFeedback(-1), null);
  assert.equal(portfolioOsFeedback(1.5), null);
  assert.ok(portfolioOsDecision.sources.every((source) => source.url.startsWith("https://github.com/heyfunwhoa/byjoyaing-portfolio/pull/")));
  assert.deepEqual(portfolioOsDecision.sources.map((source) => source.url), [
    "https://github.com/heyfunwhoa/byjoyaing-portfolio/pull/67",
    "https://github.com/heyfunwhoa/byjoyaing-portfolio/pull/68",
  ]);
});

test("the case study cites dated public pull requests and skips private personal data", () => {
  const blob = JSON.stringify({ portfolioOsCheckpoints, portfolioOsDecision });
  assert.match(blob, /2026-10-11/);
  assert.match(blob, /c635cc4/);
  assert.match(blob, /451147c/);
  assert.equal(blob.includes("$"), false);
  assert.equal(blob.includes("281"), false);
  assert.equal(/head of sales/i.test(blob), false);
  assert.equal(/joy\s*index/i.test(blob), false);
});

// Source-text guard only: rendered behavior is checked in a browser, not here.
test("source guard: Academy source keeps the lab, case study, and product-request mounts in order", () => {
  const academy = readFileSync(join(root, "components/ai-academy/academy.tsx"), "utf8");
  const lab = readFileSync(join(root, "components/ai-academy/delivery-lifecycle-lab.tsx"), "utf8");
  const caseStudy = readFileSync(join(root, "components/ai-academy/portfolio-os-case-study.tsx"), "utf8");
  const lifecycle = academy.indexOf('lesson.slug==="idea-to-verified-release"&&<DeliveryLifecycleLab />');
  const portfolio = academy.indexOf('lesson.slug==="idea-to-verified-release"&&<PortfolioOsCaseStudy />');
  const product = academy.indexOf('lesson.slug==="evidence-based-product-request"&&<ProductRequestLab />');
  assert.ok(lifecycle >= 0);
  assert.ok(portfolio > lifecycle);
  assert.ok(product >= 0);
  assert.deepEqual([...lab.matchAll(/label:\s*"([^"]+)"/g)].map((match) => match[1]), ["Intake", "Define", "Plan", "Build", "Verify", "Measure"]);
  assert.equal(caseStudy.includes("animate-"), false);
  assert.equal(caseStudy.includes("transition"), false);
  assert.match(caseStudy, /focus-visible:outline-2/);
});
