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

// HEAD is the authoritative checkout. System env SHA metadata can be unavailable
// in an Ignored Build Step, especially on a branch's first deployment.
// Compare against the last successful deployment when Vercel provides it.
// Otherwise, use the first parent only for a single-commit preview push;
// if git history is insufficient, keep the fail-open build behavior.
let current = "";
let previous = process.env.VERCEL_GIT_PREVIOUS_SHA?.trim() ?? "";
try {
  current = execFileSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" }).trim();
  const providedCurrent = process.env.VERCEL_GIT_COMMIT_SHA?.trim() ?? "";
  if (!/^[0-9a-f]{40}$/i.test(current) ||
      (providedCurrent && providedCurrent.toLowerCase() !== current.toLowerCase())) {
    finish(1, "build: invalid or mismatched checkout SHA; fail open");
  }
  if (!previous) {
    // A missing last-successful SHA does not establish the previous deployment.
    // Only consider a first-parent fallback for preview builds, never production.
    if (process.env.VERCEL_ENV !== "preview") finish(1, "build: previous SHA unavailable; fail open");
    previous = execFileSync("git", ["rev-parse", "HEAD^"], { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim();
  }
  if (!/^[0-9a-f]{40}$/i.test(previous)) finish(1, "build: previous SHA invalid; fail open");
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
