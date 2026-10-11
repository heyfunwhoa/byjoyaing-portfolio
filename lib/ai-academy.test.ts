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
