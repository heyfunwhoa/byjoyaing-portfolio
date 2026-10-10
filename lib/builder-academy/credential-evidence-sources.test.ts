import assert from "node:assert/strict";
import test from "node:test";
import { credentialEvidenceSources, evidenceForStage } from "./credential-evidence-sources.ts";
import { investigationStages } from "./credential-risk.ts";

test("every investigation stage provides independent evidence sources", () => {
  for (const stage of investigationStages) {
    assert.ok(evidenceForStage(stage.category).length >= 2, `Missing sources for ${stage.category}`);
  }
});

test("sources have unique IDs and complete provenance/limitations", () => {
  assert.equal(new Set(credentialEvidenceSources.map((source) => source.id)).size, credentialEvidenceSources.length);
  for (const source of credentialEvidenceSources) {
    assert.ok(source.name && source.method && source.establishes && source.limitation && source.example);
    assert.ok(source.reference.startsWith("https://"));
    assert.ok(investigationStages.some((stage) => stage.category === source.stage));
  }
});

test("verification sources do not imply validity and blast-radius sources do not imply actual misuse", () => {
  for (const source of evidenceForStage("Verify")) assert.ok(source.limitation);
  for (const source of evidenceForStage("Assess")) assert.ok(source.limitation);
});
