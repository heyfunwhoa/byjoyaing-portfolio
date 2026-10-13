import assert from "node:assert/strict";
import test from "node:test";
import {
  resolvePlaybookRequest,
  formatWorkRequest,
} from "./playbook-request.ts";

test("only known, singular public playbook identifiers become request context", () => {
  assert.equal(
    resolvePlaybookRequest("multithreading"),
    "Multithreading & stakeholder mapping",
  );
  for (const input of [
    undefined,
    "",
    "private-customer",
    "__proto__",
    "constructor",
    "<script>alert(1)</script>",
    ["multithreading", "other"],
  ]) {
    assert.equal(resolvePlaybookRequest(input), undefined);
  }
});

test("walkthrough context survives in the inquiry while general requests remain unchanged", () => {
  assert.equal(
    formatWorkRequest(
      "Deal strategy",
      "Hiring discussion",
      resolvePlaybookRequest("multithreading"),
    ),
    "Selected Work inquiry — Multithreading & stakeholder mapping — Deal strategy: Hiring discussion",
  );
  assert.equal(
    formatWorkRequest("Coaching", "Please share an example"),
    "Selected Work inquiry — Coaching: Please share an example",
  );
});

test("public professional example identifiers carry only their allowlisted display context", () => {
  assert.equal(resolvePlaybookRequest("team-enablement"), "Coaching and team development");
  assert.equal(resolvePlaybookRequest("enterprise-selling"), "Enterprise deal execution");
  assert.equal(resolvePlaybookRequest("enterprise-deal"), "Strategic enterprise deal anatomy");
  assert.equal(resolvePlaybookRequest(["enterprise-selling"]), undefined);
});
