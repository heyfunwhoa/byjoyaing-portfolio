import { readFileSync } from "node:fs";
import path from "node:path";
import type { PublicSnapshot } from "./types.ts";

export const LIMA_CHARLIE_SOURCE_URL =
  "https://docs.limacharlie.io/1-getting-started/what-is-limacharlie/";

export const LIMA_CHARLIE_RETRIEVED_AT = "2026-10-10T00:26:45.000Z";

export const LIMA_CHARLIE_PROVENANCE =
  "Saved on 10 October 2026 from the public documentation page. This file keeps the article, the title, and the meta description. The surrounding site navigation from the full response was not stored. The content hash is of this saved snapshot.";

export function loadLimaCharlieSnapshot(): PublicSnapshot {
  const body = readFileSync(
    path.join(
      process.cwd(),
      "lib/account-signal/fixtures/limacharlie-what-is.html",
    ),
    "utf8",
  );
  return {
    url: LIMA_CHARLIE_SOURCE_URL,
    retrievedAt: LIMA_CHARLIE_RETRIEVED_AT,
    body,
    provenanceNote: LIMA_CHARLIE_PROVENANCE,
  };
}
