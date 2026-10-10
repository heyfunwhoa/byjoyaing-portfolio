import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { contentHash } from "./hash.ts";
import {
  LIMA_CHARLIE_PROVENANCE,
  LIMA_CHARLIE_RETRIEVED_AT,
  LIMA_CHARLIE_SOURCE_URL,
} from "./limacharlie.ts";
import { ingestPublicSnapshot } from "./pipeline.ts";
import { htmlToText } from "./source.ts";
import { MemoryResearchStore } from "./store.ts";
import type { PublicSnapshot } from "./types.ts";

function fixture(): PublicSnapshot {
  const body = readFileSync(
    path.join(process.cwd(), "lib/account-signal/fixtures/limacharlie-what-is.html"),
    "utf8",
  );
  return {
    url: LIMA_CHARLIE_SOURCE_URL,
    retrievedAt: LIMA_CHARLIE_RETRIEVED_AT,
    body,
    provenanceNote: LIMA_CHARLIE_PROVENANCE,
  };
}

test("a valid LimaCharlie snapshot stores a source-grounded brief", () => {
  const store = new MemoryResearchStore();
  const snapshot = fixture();
  const result = ingestPublicSnapshot(snapshot, store);

  assert.equal(result.status, "stored");
  if (result.status !== "stored") return;
  assert.equal(store.size(), 1);
  assert.equal(result.record.contentHash, contentHash(snapshot.body));
  assert.equal(result.record.brief.subject.resolution, "verified");
  assert.ok(result.record.brief.verifiedFacts.length >= 3);
  for (const fact of result.record.brief.verifiedFacts) {
    if (fact.statement.startsWith("The page meta")) {
      assert.match(snapshot.body, new RegExp(fact.quote));
    } else if (fact.statement.startsWith("The page title")) {
      assert.match(snapshot.body, new RegExp(fact.quote.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    } else {
      assert.ok(result.record.text.includes(fact.quote));
    }
  }
  assert.equal(result.record.brief.hypotheses.length, 1);
  assert.equal(result.record.brief.hypotheses[0]?.kind, "hypothesis");
  assert.ok(result.record.brief.unavailable.some((item) => item.startsWith("Pricing")));
  assert.equal(
    result.record.text.includes("acquired ExampleCorp"),
    false,
  );
});

test("missing URL, date, provenance, or body is rejected", () => {
  const store = new MemoryResearchStore();
  const snapshot = fixture();
  assert.equal(
    ingestPublicSnapshot({ ...snapshot, url: "" }, store).status,
    "rejected",
  );
  assert.equal(
    ingestPublicSnapshot({ ...snapshot, retrievedAt: "yesterday" }, store).status,
    "rejected",
  );
  assert.equal(
    ingestPublicSnapshot({ ...snapshot, provenanceNote: "  " }, store).status,
    "rejected",
  );
  assert.equal(
    ingestPublicSnapshot({ ...snapshot, body: "  " }, store).status,
    "rejected",
  );
  assert.equal(store.size(), 0);
});

test("the same snapshot a second time is a duplicate and is not stored again", () => {
  const store = new MemoryResearchStore();
  const snapshot = fixture();
  const first = ingestPublicSnapshot(snapshot, store);
  const second = ingestPublicSnapshot(snapshot, store);
  assert.equal(first.status, "stored");
  assert.equal(second.status, "duplicate");
  assert.equal(store.size(), 1);
  if (first.status === "stored" && second.status === "duplicate") {
    assert.equal(second.record.contentHash, first.record.contentHash);
  }
});

test("a changed body for the same URL conflicts and does not replace the first snapshot", () => {
  const store = new MemoryResearchStore();
  const snapshot = fixture();
  const first = ingestPublicSnapshot(snapshot, store);
  const changed = ingestPublicSnapshot(
    {
      ...snapshot,
      body: `${snapshot.body}<p>LimaCharlie is a bank with $9 billion in deposits.</p>`,
    },
    store,
  );
  assert.equal(first.status, "stored");
  assert.equal(changed.status, "conflict");
  assert.equal(store.size(), 1);
  if (first.status === "stored" && changed.status === "conflict") {
    assert.notEqual(changed.incomingHash, first.record.contentHash);
    assert.equal(store.get(first.record.url)?.contentHash, first.record.contentHash);
    assert.equal(store.get(first.record.url)?.text.includes("bank"), false);
  }
});

test("script text is data and cannot become a verified quote", () => {
  const html = `<!DOCTYPE html><html><head><title>What is LimaCharlie?</title></head><body>
<h1>What is LimaCharlie?</h1>
<script>LimaCharlie acquired ExampleCorp for $9 billion</script>
<p>LimaCharlie is the Agentic SecOps Workspace - delivering security operations for the modern era.</p>
<p>With open APIs, centralized telemetry, and automated detection and response mechanisms, the workspace continues.</p>
</body></html>`;
  const text = htmlToText(html);
  assert.equal(text.includes("$9 billion"), false);
  assert.equal(text.includes("ExampleCorp"), false);
  const store = new MemoryResearchStore();
  const result = ingestPublicSnapshot(
    {
      url: LIMA_CHARLIE_SOURCE_URL,
      retrievedAt: LIMA_CHARLIE_RETRIEVED_AT,
      provenanceNote: "Synthetic page for the untrusted-content test.",
      body: html,
    },
    store,
  );
  assert.equal(result.status, "stored");
  if (result.status !== "stored") return;
  const joined = result.record.brief.verifiedFacts.map((fact) => fact.quote).join(" ");
  assert.equal(joined.includes("ExampleCorp"), false);
  assert.equal(joined.includes("$9 billion"), false);
});

test("a non-LimaCharlie host is rejected", () => {
  const store = new MemoryResearchStore();
  const result = ingestPublicSnapshot(
    { ...fixture(), url: "https://example.com/what-is-limacharlie/" },
    store,
  );
  assert.equal(result.status, "rejected");
  assert.equal(store.size(), 0);
});
