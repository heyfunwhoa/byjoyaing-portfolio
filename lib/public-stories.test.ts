import assert from "node:assert/strict";
import test from "node:test";
import {publicStories,validatePublicStories} from "./public-stories.ts";

test("public professional stories have unique ids, evidence boundaries and local references",()=>{
 assert.deepEqual(validatePublicStories(),[]);
 assert.equal(publicStories.length, 3);
 for(const story of publicStories){
  assert.ok(story.evidence.length>20);
  assert.ok(story.related.every(link=>link.href.startsWith("/") && ["Work","Field Notes","Side Quests","Builder Academy"].includes(link.category)));
  assert.equal(new Set(story.related.map(link=>link.href)).size, story.related.length);
 }
});


test("the enterprise seller story links to illustrative deal and stakeholder guides", () => {
 const enterprise = publicStories.find(story => story.id === "enterprise-selling");
 assert.ok(enterprise);
 assert.ok(enterprise.related.some(link => link.href === "/field-notes/enterprise-deal" && link.category === "Field Notes"));
 assert.ok(enterprise.related.some(link => link.href === "/field-notes/multithreading" && link.category === "Field Notes"));
});

test("the three commercial stories stay qualitative", () => {
  assert.deepEqual(
    publicStories.map((story) => story.id),
    ["enterprise-selling", "team-enablement", "competitive-evidence"],
  );
  const blob = JSON.stringify(publicStories);
  assert.equal(blob.includes("$"), false);
  assert.equal(/head of sales/i.test(blob), false);
  assert.equal(blob.includes("281"), false);
  const enterprise = publicStories.find((story) => story.id === "enterprise-selling");
  assert.ok(enterprise);
  assert.match(enterprise.evidence, /intentionally withheld/);
});

test("independent curricula are labeled Side Quests, not employer deployments", () => {
 const coaching = publicStories.find(story => story.id === "team-enablement");
 assert.ok(coaching);
 assert.ok(coaching.related.some(link => link.href === "/work/truffle-camp" && link.category === "Side Quests"));
});
