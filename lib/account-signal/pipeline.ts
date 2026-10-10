import { buildBrief } from "./brief.ts";
import { contentHash } from "./hash.ts";
import { canonicalSourceUrl, rejectUnsafeSnapshot } from "./source.ts";
import type { ResearchStore } from "./store.ts";
import type { IngestResult, PublicSnapshot } from "./types.ts";

function validRetrievedAt(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}T/.test(value)) return false;
  return !Number.isNaN(Date.parse(value));
}

export function ingestPublicSnapshot(
  snapshot: PublicSnapshot,
  store: ResearchStore,
): IngestResult {
  const url = canonicalSourceUrl(snapshot.url);
  if (!url) {
    return {
      status: "rejected",
      reason: "Source URL must be https on limacharlie.io, without embedded credentials.",
    };
  }
  if (!validRetrievedAt(snapshot.retrievedAt)) {
    return { status: "rejected", reason: "Extraction date must be an ISO timestamp." };
  }
  if (!snapshot.provenanceNote.trim()) {
    return { status: "rejected", reason: "Provenance note is required." };
  }
  const unsafe = rejectUnsafeSnapshot(snapshot.body);
  if (unsafe) return { status: "rejected", reason: unsafe };

  const canonical = url.toString();
  const hash = contentHash(snapshot.body);
  const existing = store.get(canonical);
  if (existing?.contentHash === hash) {
    return { status: "duplicate", record: existing };
  }
  if (existing) {
    return { status: "conflict", record: existing, incomingHash: hash };
  }

  const { brief, text } = buildBrief({
    url: canonical,
    retrievedAt: snapshot.retrievedAt,
    contentHash: hash,
    provenanceNote: snapshot.provenanceNote.trim(),
    body: snapshot.body,
  });
  const record = {
    url: canonical,
    retrievedAt: snapshot.retrievedAt,
    contentHash: hash,
    provenanceNote: snapshot.provenanceNote.trim(),
    text,
    brief,
  };
  store.add(record);
  return { status: "stored", record };
}
