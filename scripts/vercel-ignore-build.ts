import { execFileSync } from "node:child_process";
import { shouldSkipVercelBuild } from "../lib/release/reliability.ts";
import { draftPreviewSkip } from "../.release/preview-draft.mjs";

function finish(code: 0 | 1, message: string): never {
  console.log(message);
  process.exit(code);
}

if (process.env.RELEASE_FORCE_BUILD === "1") finish(1, "build: explicit override");

const draft = await draftPreviewSkip();
if (draft) finish(0, draft.reason);

// HEAD is the authoritative checkout. Vercel's last-successful deployment SHA
// is the only safe baseline for incremental builds across multiple commits.
// A missing baseline must build, including on new preview branches.
let current = "";
const previous = process.env.VERCEL_GIT_PREVIOUS_SHA?.trim() ?? "";
try {
  current = execFileSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" }).trim();
  const providedCurrent = process.env.VERCEL_GIT_COMMIT_SHA?.trim() ?? "";
  if (!/^[0-9a-f]{40}$/i.test(current) ||
      (providedCurrent && providedCurrent.toLowerCase() !== current.toLowerCase())) {
    finish(1, "build: invalid or mismatched checkout SHA; fail open");
  }
  if (!/^[0-9a-f]{40}$/i.test(previous)) {
    finish(1, "build: previous successful deployment SHA unavailable; fail open");
  }
} catch {
  finish(1, "build: required git history unavailable; fail open");
}

let output = "";
try {
  if (execFileSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" }).trim().toLowerCase() !== current.toLowerCase()) {
    finish(1, "build: checkout mismatch; fail open");
  }
  execFileSync("git", ["merge-base", "--is-ancestor", previous, current], { stdio: "pipe" });
  output = execFileSync("git", ["diff", "--no-relative", "--no-renames", "--name-only", "-z", previous, current, "--"], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });
} catch {
  finish(1, "build: unable to diff commits; fail open");
}

const paths = output
  .split("\0")
  .filter(Boolean);

if (shouldSkipVercelBuild(paths)) {
  finish(0, "skip: only non-public operational paths changed");
}

finish(1, "build: public or unclassified paths changed");
