import {test} from "node:test";
import assert from "node:assert/strict";
import {assessCase,assessEvidence,detectiveCases,promptCompleteness,reviewPrompt,recommendApproach} from "./ai-academy-labs.ts";
test("all detective fixtures have a valid answer and explanation",()=>{for(const c of detectiveCases){assert.ok(c.sources.length>=2);assert.ok(c.correct>=0&&c.correct<c.options.length);assert.equal(assessCase(c.id,c.correct)?.correct,true);assert.equal(assessCase(c.id,(c.correct+1)%c.options.length)?.correct,false)}});
test("prompt rubric identifies missing required fields",()=>{const r=promptCompleteness({Objective:"Draft an account brief"});assert.equal(r.score,1);assert.ok(r.missing.includes("Validation"))});
test("sensitive data overrides normal recommendations",()=>{assert.match(recommendApproach("research",true,false).title,/approved private/);assert.match(recommendApproach("research",false,true).title,/local/);});

test("evidence choice is assessed independently of claim classification",()=>{for(const c of detectiveCases){assert.ok(assessEvidence(c.id,0));}assert.equal(assessEvidence("capabilities",0)?.correct,true);assert.equal(assessEvidence("capabilities",1)?.correct,false);});
test("prompt coaching distinguishes field completion from validated quality",()=>{const data={"Objective":"Write a concise brief","Audience":"Account executive","Context / sources":"sources","Constraints":"No invention","Output format":"Table","Validation":"verify"};const result=reviewPrompt(data);assert.equal(result.complete,true);assert.equal(result.structuralOnly,true);assert.ok(result.warnings.length>=2);});
