import { execFileSync } from "node:child_process";
import { shouldSkipVercelBuild } from "../lib/release/reliability.ts";

function finish(code: 0 | 1, message: string): never {
  console.log(message);
  process.exit(code);
}

if (process.env.RELEASE_FORCE_BUILD === "1") finish(1, "build: explicit override");

const previous = process.env.VERCEL_GIT_PREVIOUS_SHA?.trim() ?? "";
const current = process.env.VERCEL_GIT_COMMIT_SHA?.trim() ?? "";

if (!/^[0-9a-f]{40}$/i.test(previous) || !/^[0-9a-f]{40}$/i.test(current)) {
  finish(1, "build: git SHAs unavailable; fail open");
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
