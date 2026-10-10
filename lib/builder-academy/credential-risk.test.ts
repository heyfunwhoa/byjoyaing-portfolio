import assert from "node:assert/strict";
import test from "node:test";
import { evaluateCredentialRisk, initialRiskInput } from "./credential-risk.ts";

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
