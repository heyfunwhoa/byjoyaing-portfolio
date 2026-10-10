import {test} from "node:test";import assert from "node:assert/strict";
import {evaluatePrompt,generatePracticePrompt,improvedExample} from "./ai-prompt-journey.ts";
test("worked example meets structural and research safeguards",()=>{assert.equal(evaluatePrompt(improvedExample).ready,true);assert.match(generatePracticePrompt(improvedExample),/Validation:/);});
test("incomplete or ungrounded prompts get actionable feedback",()=>{assert.ok(evaluatePrompt({...improvedExample,sources:""}).missing.includes("sources"));assert.ok(evaluatePrompt({...improvedExample,validation:"Make it good."}).warnings.length>0);assert.ok(evaluatePrompt({...improvedExample,constraints:"Guarantee 100% accurate output with no issues"}).warnings.length>0);});
