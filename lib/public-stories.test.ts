import assert from "node:assert/strict";
import test from "node:test";
import {publicStories,validatePublicStories} from "./public-stories.ts";

test("public professional stories have unique ids, evidence boundaries and local references",()=>{
 assert.deepEqual(validatePublicStories(),[]);
 assert.ok(publicStories.length>=2);
 for(const story of publicStories){
  assert.ok(story.evidence.length>20);
  assert.ok(story.related.every(link=>link.href.startsWith("/")));
 }
});
