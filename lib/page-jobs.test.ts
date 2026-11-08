import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { primaryNav } from "./site-nav.ts";

function source(path: string) {
  return readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
}

test("primary navigation stays six items and Academy is reached through Side Quests", () => {
  assert.deepEqual(
    primaryNav.map((link) => link.label),
    ["Home", "About", "Work", "Field Notes", "Side Quests", "Contact"],
  );
  const sideQuests = source("app/side-quests/page.tsx");
  const academyLink = sideQuests.indexOf('href="/ai-academy"');
  assert.ok(academyLink > 0);
  assert.match(sideQuests, /Open Builder Academy/);
  assert.ok(academyLink < sideQuests.indexOf("Other explorations"));
  const academy = source("components/ai-academy/academy.tsx");
  assert.match(academy, /deeper learning experience/);
  assert.match(academy, /Side Quests is the way in/);
  assert.match(academy, /"href":"\/side-quests"/);
});

test("project pages lead with the problem, the contribution, and one example", () => {
  const lead = source("components/project-story-lead.tsx");
  const problem = lead.indexOf("The problem");
  const contribution = lead.indexOf("My contribution");
  const example = lead.indexOf("One example");
  assert.ok(problem > 0 && problem < contribution && contribution < example);
  for (const file of ["app/work/[slug]/page.tsx", "components/field-asset-case.tsx"]) {
    const page = source(file);
    const leadUse = page.indexOf("<ProjectStoryLead");
    const details = page.indexOf('<DisclosureSection');
    const status = page.indexOf('id="where-it-stands"');
    assert.ok(leadUse > 0 && leadUse < details && details < status, file);
    assert.equal(page.match(/\{(?:project\.)?sales\.maturityDetail\}/g)?.length, 1, `${file}: one recorded stage`);
    assert.doesNotMatch(page, /label: "Current status"/, `${file}: no duplicate status destination`);
  }
  assert.equal(source("components/field-asset-case.tsx").match(/project\.sales\.myRole/g)?.length, 1);
});

test("collection openers state their jobs", () => {
  assert.match(source("components/editorial-bento.tsx"), /selling, coaching, and GTM/);
  assert.match(source("components/editorial-bento.tsx"), /Practical thinking and useful frameworks/);
  assert.match(source("components/editorial-bento.tsx"), /Independent projects and learning experiences/);
  assert.match(source("app/work/page.tsx"), /selling, coaching, and GTM/);
  assert.match(source("app/field-notes/page.tsx"), /Practical thinking and useful frameworks/);
  assert.match(source("app/contact/page.tsx"), /talk about the work/);
});
