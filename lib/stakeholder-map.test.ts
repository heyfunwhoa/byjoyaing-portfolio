import assert from "node:assert/strict";
import test from "node:test";
import {
  validateStakeholderMap,
  relationshipsFor,
  type MapPerson,
} from "./stakeholder-map.ts";

const people: MapPerson[] = [
  {
    id: "a",
    role: "Champion",
    group: "business",
    access: "engaged",
    priority: "Risk",
    evidence: "Fictional",
    nextStep: "Meet",
  },
  {
    id: "b",
    role: "Buyer",
    group: "business",
    access: "unknown",
    priority: "Budget",
    evidence: "Unknown",
    nextStep: "Ask",
  },
];
const edge = {
  id: "ab",
  from: "a",
  to: "b",
  label: "Introduction",
  status: "hypothesis" as const,
  evidence: "Unvalidated",
};
test("valid and empty maps are accepted without inventing relationships", () => {
  assert.equal(validateStakeholderMap(people, [edge]), null);
  assert.equal(validateStakeholderMap([], []), null);
  assert.deepEqual(relationshipsFor([edge], "unmapped"), []);
});
test("rejects duplicate identities and orphan or self relationships", () => {
  assert.ok(validateStakeholderMap([people[0], people[0]], []));
  assert.ok(validateStakeholderMap(people, [edge, edge]));
  assert.ok(validateStakeholderMap(people, [{ ...edge, to: "orphan" }]));
  assert.ok(validateStakeholderMap(people, [{ ...edge, to: "a" }]));
});
test("relationships require evidence context and a clear label", () => {
  assert.ok(validateStakeholderMap(people, [{ ...edge, evidence: " " }]));
  assert.ok(validateStakeholderMap(people, [{ ...edge, label: " " }]));
  assert.equal(
    validateStakeholderMap(people, [
      { ...edge, status: "validated", evidence: "Fictional training evidence" },
    ]),
    null,
  );
});
test("selected paths include either endpoint without changing evidence status", () => {
  assert.deepEqual(relationshipsFor([edge], "a"), [edge]);
  assert.deepEqual(relationshipsFor([edge], "b"), [edge]);
  assert.equal(edge.status, "hypothesis");
});
