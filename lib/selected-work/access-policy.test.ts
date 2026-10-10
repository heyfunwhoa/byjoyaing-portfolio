import assert from "node:assert/strict";
import test from "node:test";
import { canAccessSelectedWork, type Viewer, type ResourceGrant } from "./access-policy.ts";

const approved: Viewer = { authenticated: true, verifiedEmail: true, requestStatus: "approved" };
const grant: ResourceGrant = { resourceKey: "case-study-one", expiresAtMs: 2000, revokedAtMs: null };
const allow = (viewer: Viewer | null, key = "case-study-one", published = true, grants: ResourceGrant[] = [grant], now = 1000) =>
  canAccessSelectedWork(viewer, key, published, grants, now);

test("denies unauthenticated, unverified and unapproved identities", () => {
  assert.equal(allow(null), false);
  assert.equal(allow({ ...approved, authenticated: false }), false);
  assert.equal(allow({ ...approved, verifiedEmail: false }), false);
  for (const requestStatus of ["pending", "denied", "withdrawn"] as const) {
    assert.equal(allow({ ...approved, requestStatus }), false);
  }
});
test("grants only exact published resource with current unrevoked grant", () => {
  assert.equal(allow(approved), true);
  assert.equal(allow(approved, "case-study-two"), false);
  assert.equal(allow(approved, "case-study-one", false), false);
  assert.equal(allow(approved, "case-study-one", true, []), false);
  assert.equal(allow(approved, "case-study-one", true, [{ ...grant, revokedAtMs: 500 }]), false);
  assert.equal(allow(approved, "case-study-one", true, [grant], 2000), false);
  assert.equal(allow(approved, "case-study-one", true, [grant], Number.NaN), false);
});
