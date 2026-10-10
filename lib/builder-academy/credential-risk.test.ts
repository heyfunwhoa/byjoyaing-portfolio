import assert from "node:assert/strict";
import test from "node:test";
import { detectionMethods, investigationStages, evaluateCredentialRisk, initialRiskInput } from "./credential-risk.ts";

test("ordered stages identify before verify and assess blast radius", () => {
  assert.deepEqual(investigationStages.map((stage) => stage.category), ["Detect", "Identify", "Verify", "Assess", "Investigate", "Remediate"]);
  assert.deepEqual(Object.keys(detectionMethods), ["signature", "regex", "entropy", "structure", "context"]);
  const findings = evaluateCredentialRisk(initialRiskInput).findings;
  assert.deepEqual(findings.map((finding) => finding.category), investigationStages.map((stage) => stage.category));
  assert.ok(findings[3].message.includes("Potential blast radius"));
});
test("potential production or sensitive data access prompts investigation without asserting compromise", () => {
  for (const change of [{ resourceReach: "production" as const }, { sensitiveDataReachable: "yes" as const }]) {
    const result = evaluateCredentialRisk({ ...initialRiskInput, ...change });
    assert.equal(result.status, "investigate");
    assert.ok(result.findings[3].message.includes("not evidence of access or exploitation"));
  }
});
test("unknown fields are not presented as confirmed malicious activity", () => {
  const result = evaluateCredentialRisk(initialRiskInput);
  assert.equal(result.status, "review");
  assert.ok(result.findings.some((finding) => finding.message.includes("does not prove misuse")));
  assert.ok(result.findings.some((finding) => finding.message.includes("Validity is unknown")));
});
test("valid or broad unrevoked exposed tokens are triaged for investigation", () => {
  assert.equal(evaluateCredentialRisk({ ...initialRiskInput, valid: "yes" }).status, "investigate");
  assert.equal(evaluateCredentialRisk({ ...initialRiskInput, privilege: "broad" }).status, "investigate");
  assert.equal(evaluateCredentialRisk({ ...initialRiskInput, unusualActivity: "yes" }).status, "investigate");
});
test("revocation marks credential contained but preserves necessary follow-up actions", () => {
  const result = evaluateCredentialRisk({ ...initialRiskInput, valid: "yes", revoked: true });
  assert.equal(result.status, "contained");
  assert.ok(result.actions.some((action) => action.includes("Reduce privilege")));
});
