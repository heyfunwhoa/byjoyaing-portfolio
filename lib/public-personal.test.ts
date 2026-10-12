import test from "node:test";import assert from "node:assert/strict";import {personalInterests,personalValues} from "./public-personal.ts";
test("public interests have unique ids and complete editorial copy",()=>{assert.equal(new Set(personalInterests.map(x=>x.id)).size,personalInterests.length);for(const x of personalInterests){assert.ok(x.title.trim()&&x.detail.trim()&&x.connection.trim());}assert.ok(personalValues.length>=3);});

test("creative exploration is trying unfamiliar projects",()=>{
 const creative=personalInterests.find(interest=>interest.id==="creative");
 assert.equal(creative?.title,"Creative exploration");
 assert.equal(creative?.detail,"Trying unfamiliar creative projects.");
});
