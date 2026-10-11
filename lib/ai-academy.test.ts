import assert from "node:assert/strict";
import test from "node:test";
import { lessons } from "./ai-academy.ts";

test("lesson slugs are unique and knowledge checks point at a real choice", () => {
  assert.equal(new Set(lessons.map((lesson) => lesson.slug)).size, lessons.length);
  for (const lesson of lessons) {
    assert.ok(lesson.slug.length > 0);
    assert.ok(lesson.check.choices.length >= 2);
    assert.equal(Number.isInteger(lesson.check.answer), true);
    assert.ok(lesson.check.answer >= 0 && lesson.check.answer < lesson.check.choices.length);
    assert.ok(lesson.check.explanation.length > 10);
    assert.ok(lesson.sources.length >= 1);
    assert.ok(lesson.sources.every((source) => source.url.startsWith("https://")));
  }
});

test("cursor workflows is a Builder lesson without private personal data", () => {
  const cursor = lessons.find((lesson) => lesson.slug === "cursor-workflows");
  const verified = lessons.find((lesson) => lesson.slug === "idea-to-verified-release");
  assert.ok(cursor);
  assert.ok(verified);
  assert.equal(lessons.indexOf(cursor), lessons.indexOf(verified) + 1);
  assert.equal(cursor.track, "Builder");
  assert.equal(cursor.level, "Beginner");
  assert.equal(cursor.minutes, 30);
  assert.equal(cursor.title, "Cursor modes, rules, and safe handoffs");
  assert.match(cursor.exercise, /docs\/builder-academy\/cursor-agent-workflows\.md/);
  assert.match(cursor.exercise, /From idea to verified release/);
  assert.match(verified.exercise, /docs\/builder-academy\/cursor-agent-workflows\.md/);
  assert.match(verified.exercise, /docs\/builder-academy\/idea-to-verified-release\.md/);
  const choices = cursor.check.choices.join(" ");
  assert.match(choices, /Ask/);
  assert.match(choices, /Plan/);
  assert.match(choices, /Agent/);
  assert.equal(cursor.check.choices[cursor.check.answer].startsWith("Agent"), true);
  const blob = JSON.stringify(cursor);
  assert.equal(blob.includes("281"), false);
  assert.equal(blob.includes("703-1337"), false);
  assert.equal(/head of sales/i.test(blob), false);
  assert.equal(blob.includes("$"), false);
  assert.equal(/joy\s*index/i.test(blob), false);
  assert.equal(/kristen\.aing@gmail\.com/i.test(blob), false);
});

test("Better Auth GTM learning card has a real access-control exercise", () => {
  const lesson = lessons.find((item) => item.slug === "better-auth-gtm-workspace");
  assert.ok(lesson);
  assert.equal(lesson.track, "Builder");
  assert.equal(lesson.level, "Intermediate");
  assert.match(lesson.exercise, /docs\/builder-academy\/better-auth-gtm-workspace\.md/);
  assert.match(lesson.exercise, /synthetic/i);
  assert.match(lesson.check.question, /account URL ID/i);
  assert.match(lesson.check.choices[lesson.check.answer], /server-side account-permission/);
  assert.match(lesson.check.explanation, /valid session establishes identity only/i);
  const content = JSON.stringify(lesson);
  assert.equal(/real customer|production secret|private account data/i.test(content), false);
});

test("privacy-first product measurement lesson has synthetic no-side-effect lab", () => {
  const lesson = lessons.find((item) => item.slug === "measure-product-use-safely");
  assert.ok(lesson);
  assert.equal(lesson.track, "Builder");
  assert.equal(lesson.level, "Beginner");
  assert.match(lesson.exercise, /docs\/builder-academy\/measure-product-usage-safely\.md/);
  assert.match(lesson.exercise, /synthetic/i);
  assert.match(lesson.check.choices[lesson.check.answer], /authorize and persist/);
  assert.match(lesson.check.explanation, /denied actions should not emit a success event/);
  assert.ok(lesson.sources.some((source) => source.url.startsWith("https://posthog.com/")));
  assert.equal(/kristen\.aing@gmail\.com|joy\s*index/i.test(JSON.stringify(lesson)), false);
});


test("MCP versus REST lesson teaches protocol boundaries and safe synthetic practice", () => {
  const lesson = lessons.find((item) => item.slug === "mcp-vs-rest-api");
  assert.ok(lesson);
  assert.equal(lesson.track, "Builder");
  assert.match(lesson.exercise, /docs\/builder-academy\/mcp-vs-rest-api\.md/);
  assert.match(lesson.exercise, /synthetic/i);
  assert.match(lesson.summary, /REST APIs, MCP tools, webhooks/i);
  assert.match(lesson.check.choices[lesson.check.answer], /subject to permissions/i);
  assert.ok(lesson.sources.some((source) => source.url.includes("modelcontextprotocol.io")));
});

test("enterprise contracts lesson distinguishes AE and Head of Sales review duties", () => {
  const lesson = lessons.find((item) => item.slug === "enterprise-contracts-sales-cycle");
  assert.ok(lesson);
  assert.equal(lesson.track, "GTM");
  assert.match(lesson.exercise, /docs\/builder-academy\/enterprise-contracts-sales-cycle\.md/);
  assert.match(lesson.exercise, /Head of Sales/i);
  assert.ok(lesson.takeaways.some((point) => /DPA/i.test(point)));
  assert.ok(lesson.takeaways.some((point) => /MNDA/i.test(point)));
  assert.match(lesson.check.choices[lesson.check.answer], /reviewed separately/i);
  assert.ok(lesson.sources.some((source) => source.url.includes("ico.org.uk")));
});

test("new lessons are public-safe and do not require Sumble integration", () => {
  const added = lessons.filter((item) => ["mcp-vs-rest-api", "enterprise-contracts-sales-cycle"].includes(item.slug));
  assert.equal(added.length, 2);
  const body = JSON.stringify(added);
  assert.doesNotMatch(body, /kristen\.aing@gmail\.com|joy\s*index|\bAPI_KEY\s*=|real account export/i);
  assert.match(body, /permissions/i);
});


test("security assessment lesson distinguishes buyer sizes, reports and subprocessor review", () => {
  const lesson = lessons.find((item) => item.slug === "security-assessments-buyer-size");
  assert.ok(lesson);
  assert.equal(lesson.track, "GTM");
  assert.equal(lesson.level, "Intermediate");
  assert.match(lesson.exercise, /security-assessments-by-buyer-size\.md/);
  assert.match(lesson.exercise, /synthetic/i);
  assert.match(lesson.exercise, /Head of Sales/i);
  assert.match(lesson.summary, /SOC 2 reports, penetration tests, subprocessors/i);
  assert.ok(lesson.takeaways.some((value) => /Type I/.test(value) && /Type II/.test(value)));
  assert.ok(lesson.takeaways.some((value) => /penetration test/i.test(value)));
  assert.ok(lesson.takeaways.some((value) => /subprocessor/i.test(value)));
  assert.match(lesson.check.choices[lesson.check.answer], /Actual data risk/i);
  assert.ok(lesson.sources.some((item) => item.url.includes("wstg.owasp.org")));
  assert.ok(lesson.sources.some((item) => item.url.includes("ico.org.uk")));
});

test("enterprise contracts lesson now explains NDA versus MNDA", () => {
  const lesson = lessons.find((item) => item.slug === "enterprise-contracts-sales-cycle");
  assert.ok(lesson);
  assert.match(lesson.title, /NDA vs MNDA/);
  assert.match(lesson.exercise, /unilateral NDA/);
  assert.match(lesson.exercise, /MNDA/);
  assert.ok(lesson.takeaways.some((value) => /NDA can be unilateral or mutual/.test(value)));
});

test("security assessment training uses public fictional scenarios and no personal records", () => {
  const lesson = lessons.find((item) => item.slug === "security-assessments-buyer-size");
  assert.ok(lesson);
  const content = JSON.stringify(lesson);
  assert.doesNotMatch(content, /kristen\.aing@gmail\.com|real customer agreement|private client data|API_KEY\s*=/i);
});
