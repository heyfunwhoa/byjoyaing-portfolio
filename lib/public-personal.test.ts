import test from "node:test";import assert from "node:assert/strict";import {beyondWorkIntro,personalInterests,personalValues} from "./public-personal.ts";
test("public interests have unique ids and complete editorial copy",()=>{assert.equal(new Set(personalInterests.map(x=>x.id)).size,personalInterests.length);for(const x of personalInterests){assert.ok(x.title.trim()&&x.detail.trim()&&x.connection.trim());}assert.ok(personalValues.length>=3);});

test("creative stays where a creative project or music supports it",()=>{
 const music=personalInterests.find(interest=>interest.id==="music");
 const creative=personalInterests.find(interest=>interest.id==="creative");
 assert.equal(music?.connection,"Creativity, energy and connection.");
 assert.equal(creative?.title,"Creative exploration");
 assert.equal(creative?.detail,"Trying unfamiliar creative projects.");
 assert.match(beyondWorkIntro,/traveling, discovering new music/);
 assert.match(beyondWorkIntro,/DIY and creative projects/);
 assert.deepEqual([...personalValues],["Curiosity","Authenticity","Connection","Growth","Independence"]);
});
