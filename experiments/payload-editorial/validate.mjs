import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const path = fileURLToPath(new URL("./fictional-content-models.json", import.meta.url));
const data = JSON.parse(readFileSync(path, "utf8"));
assert.equal(data.schemaVersion, "1");
assert.equal(data.classification, "synthetic-only");
assert.equal(data.collections.length, 3);
const names = new Set();
for (const collection of data.collections) {
  assert.match(collection.id, /^[a-z]+(?:-[a-z]+)*$/);
  assert(!names.has(collection.id), "duplicate collection " + collection.id);
  names.add(collection.id);
  assert(collection.fields.some((field) => field.name === "editorialState"));
  assert(collection.versions.drafts);
  assert(collection.roles.editor.includes("update"));
  assert(!collection.roles.editor.includes("publish"), "editor must not publish");
  assert(!collection.roles.reviewer.includes("publish"), "reviewer approval is not publication");
  assert(collection.roles.admin.includes("publish"));
  assert.equal(collection.syntheticExample.editorialState, "draft");
  for (const field of collection.fields) {
    assert(field.name.length > 1);
    assert(["text", "textarea", "richText", "array", "select"].includes(field.type));
  }
}
for (const phrase of ["No employer", "Local disposable SQLite", "separate reviewer"]) {
  assert(JSON.stringify(data.rules).includes(phrase));
}
console.log("PASS: three synthetic editorial models have separate approval, publishing and privacy boundaries.");
console.log("NOTE: Schema contract only; Payload installation, UI, access enforcement and database migrations NOT RUN.");
