import assert from "node:assert/strict";
import test from "node:test";
import { evaluateJourneyAccess, identityJourneys } from "./identity-journey.ts";

test("all four identity journeys explain each security layer", () => {
  assert.deepEqual(Object.keys(identityJourneys), ["human", "service", "pipeline", "agent"]);
  for (const item of Object.values(identityJourneys)) {
    assert.ok(item.principal && item.credential && item.permission && item.lifecycle && item.learning);
  }
});

test("the demo policy denies unverified, unapproved and revoked identities", () => {
  assert.equal(evaluateJourneyAccess({ identityVerified: true, grantActive: true, credentialRevoked: false }), "allow");
  assert.equal(evaluateJourneyAccess({ identityVerified: false, grantActive: true, credentialRevoked: false }), "deny");
  assert.equal(evaluateJourneyAccess({ identityVerified: true, grantActive: false, credentialRevoked: false }), "deny");
  assert.equal(evaluateJourneyAccess({ identityVerified: true, grantActive: true, credentialRevoked: true }), "deny");
});
