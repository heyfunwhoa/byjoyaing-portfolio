import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import {
  MAX_GITHUB_ATTEMPTS,
  assessRelease,
  backoffSeconds,
  classifyReleaseEvidence,
  decideGithubRequest,
  shasMatch,
  shouldSkipVercelBuild,
  smokeGaps,
} from "./reliability.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "../..");
const INTENDED = "8c37fc10dfa1e028dabc84b6c958f351103662cb";
const HEALTHY = "7486b46706880137672ab606aa72a6f99664d964";

test("full SHAs match and prefixes do not count as a release match", () => {
  assert.equal(shasMatch(INTENDED, INTENDED.toUpperCase()), true);
  assert.equal(shasMatch(INTENDED, HEALTHY), false);
  assert.equal(shasMatch(INTENDED.slice(0, 7), INTENDED.slice(0, 7)), false);
  assert.equal(shasMatch(INTENDED, null), false);
});

test("operational-only diffs skip Vercel and public content still builds", () => {
  assert.equal(shouldSkipVercelBuild([".github/workflows/ci.yml", "docs/operations/deploy-verify-recover.md"]), false);
  assert.equal(shouldSkipVercelBuild(["docs/audit/README.md", "README.md"]), true);
  assert.equal(shouldSkipVercelBuild(["docs/builder-academy/github-api-deployment-reliability.md"]), false);
  assert.equal(shouldSkipVercelBuild(["lib/ai-academy.ts"]), false);
  assert.equal(shouldSkipVercelBuild([".github/workflows/ci.yml", "app/work/page.tsx"]), false);
  assert.equal(shouldSkipVercelBuild(["RELEASE.md", ".release/notes/plan.md"]), true);
  assert.equal(shouldSkipVercelBuild(["content/academy/lesson.mdoc"]), false);
  assert.equal(shouldSkipVercelBuild(["docs/operations/script.js"]), false);
  assert.equal(shouldSkipVercelBuild([]), false);
  assert.equal(shouldSkipVercelBuild(["../secrets.env"]), false);
});

test("secondary rate limits stop requests and permission failures do not retry", () => {
  const secondary = decideGithubRequest({
    status: 403,
    remaining: 4000,
    retryAfterSeconds: 45,
    body: "You have exceeded a secondary rate limit.",
    nowEpochSeconds: 1_000,
  });
  assert.equal(secondary.action, "stop");
  assert.equal(secondary.waitSeconds, 45);
  assert.equal(secondary.mayRetryAfterWait, true);

  const primary = decideGithubRequest({
    status: 403,
    remaining: 0,
    resetEpochSeconds: 1_120,
    nowEpochSeconds: 1_000,
    body: "API rate limit exceeded",
  });
  assert.equal(primary.action, "stop");
  assert.equal(primary.waitSeconds, 120);

  const permission = decideGithubRequest({
    status: 403,
    remaining: 4999,
    body: "Resource not accessible by integration",
  });
  assert.equal(permission.action, "do_not_retry");
  assert.equal(decideGithubRequest({ status: 401, body: "Bad credentials" }).action, "do_not_retry");
  assert.equal(decideGithubRequest({ status: 404, body: "Not Found" }).action, "do_not_retry");
});

test("transient failures use bounded backoff and then stop", () => {
  assert.equal(backoffSeconds(1, () => 0), 60);
  assert.equal(backoffSeconds(2, () => 1), 120);
  assert.equal(backoffSeconds(8, () => 1), 300);

  const first = decideGithubRequest({ status: 503, attempt: 1 });
  assert.equal(first.action, "defer");
  assert.equal(first.mayRetryAfterWait, true);
  assert.ok((first.waitSeconds ?? 0) >= 60);

  const exhausted = decideGithubRequest({ status: 503, attempt: MAX_GITHUB_ATTEMPTS });
  assert.equal(exhausted.action, "do_not_retry");
  assert.equal(exhausted.reason, "retry budget exhausted");
  assert.equal(decideGithubRequest({ status: 204 }).action, "ok");
});

test("git provider failure and unit-test failure stay separate classes", () => {
  const evidence = classifyReleaseEvidence({
    failedCiJobs: ["Unit tests"],
    vercelReadyState: "ERROR",
    vercelErrorCode: "git_info_fail",
    providerStatus: 403,
    providerBody: "You have exceeded a secondary rate limit.",
  });
  assert.deepEqual(evidence.classes, ["source_validation", "git_provider_rate_limit"]);

  const security = classifyReleaseEvidence({ failedCiJobs: ["semgrep", "Production build + TypeScript"] });
  assert.deepEqual(security.classes, ["security_check", "application_build"]);

  const platform = classifyReleaseEvidence({ vercelReadyState: "CANCELED" });
  assert.deepEqual(platform.classes, ["deployment_platform"]);
});

test("a merged commit is not verified without READY alias, SHA, and smoke evidence", () => {
  const gaps = smokeGaps([
    { path: "/", status: 200 },
    { path: "/about", status: 200 },
    { path: "/work", status: 500 },
    { path: "/contact", status: 200 },
  ]);
  assert.deepEqual(gaps, ["/work", "/ai-academy"]);

  const blocked = assessRelease({
    intendedSha: INTENDED,
    deployedSha: HEALTHY,
    readyState: "READY",
    productionAliasOwned: true,
    classes: [],
    smokeGaps: [],
  });
  assert.equal(blocked.verified, false);
  assert.match(blocked.reasons.join(" "), /does not match/);

  const verified = assessRelease({
    intendedSha: HEALTHY,
    deployedSha: HEALTHY,
    readyState: "READY",
    productionAliasOwned: true,
    classes: [],
    smokeGaps: [],
  });
  assert.equal(verified.verified, true);

  const failedFetch = assessRelease({
    intendedSha: INTENDED,
    deployedSha: null,
    readyState: "ERROR",
    productionAliasOwned: false,
    classes: ["git_provider_rate_limit"],
    smokeGaps: ["/", "/about", "/work", "/contact", "/ai-academy"],
  });
  assert.equal(failedFetch.verified, false);
});

test("workflow concurrency cancels pull requests only and keeps security jobs", () => {
  const files = {
    ci: readFileSync(join(root, ".github/workflows/ci.yml"), "utf8"),
    security: readFileSync(join(root, ".github/workflows/security-scans.yml"), "utf8"),
    semgrep: readFileSync(join(root, ".github/workflows/semgrep.yml"), "utf8"),
    visual: readFileSync(join(root, ".github/workflows/visual-qa.yml"), "utf8"),
  };
  for (const contents of Object.values(files)) {
    assert.match(contents, /permissions:\n {2}contents: read/);
    assert.match(contents, /cancel-in-progress: \$\{\{ github\.event_name == 'pull_request' \}\}/);
    assert.equal(contents.includes("contents: write"), false);
    assert.equal(/^cancel-in-progress: true$/m.test(contents), false);
  }
  assert.match(files.ci, /group: ci-\$\{\{ github\.workflow \}\}-\$\{\{ github\.ref \}\}/);
  assert.match(files.ci, /npm audit --omit=dev --audit-level=high/);
  assert.match(files.ci, /branches: \[main\]/);
  assert.match(files.security, /group: security-\$\{\{ github\.workflow \}\}-\$\{\{ github\.ref \}\}/);
  assert.match(files.security, /trufflesecurity\/trufflehog@[0-9a-f]{40}/);
  assert.match(files.security, /exit-code: "1"/);
  assert.match(files.semgrep, /group: semgrep-\$\{\{ github\.workflow \}\}-\$\{\{ github\.ref \}\}/);
  assert.match(files.semgrep, /cron: '37 11 \* \* 2'/);
  assert.match(files.semgrep, /semgrep scan --config p\/security-audit/);
  assert.match(files.visual, /group: visual-qa-\$\{\{ github\.ref \}\}/);
  assert.match(files.visual, /npm run test:visual/);
});

test("ignore command fails open and skips only an operational diff", () => {
  const directory = mkdtempSync(join(tmpdir(), "vercel-ignore-"));
  const git = (args: string[]) =>
    execFileSync("git", args, { cwd: directory, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim();
  git(["init"]);
  git(["config", "user.email", "reliability@example.com"]);
  git(["config", "user.name", "Reliability Test"]);
  mkdirSync(join(directory, "docs/operations"), { recursive: true });
  writeFileSync(join(directory, "docs/operations/checkpoint.md"), "name: CI\n");
  git(["add", "."]);
  git(["commit", "-m", "initial"]);
  const first = git(["rev-parse", "HEAD"]);
  writeFileSync(join(directory, "docs/operations/checkpoint.md"), "name: CI\non: pull_request\n");
  git(["add", "."]);
  git(["commit", "-m", "workflow only"]);
  const second = git(["rev-parse", "HEAD"]);

  const run = (env: Record<string, string>) => {
    try {
      const stdout = execFileSync(
        "node",
        ["--experimental-strip-types", "--disable-warning=MODULE_TYPELESS_PACKAGE_JSON", "scripts/vercel-ignore-build.ts"],
        { cwd: root, encoding: "utf8", env: { ...process.env, ...env }, stdio: ["ignore", "pipe", "pipe"] },
      );
      return { code: 0, stdout };
    } catch (error) {
      const failed = error as { status?: number; stdout?: Buffer | string };
      return { code: failed.status ?? 1, stdout: String(failed.stdout ?? "") };
    }
  };

  const gitEnv = { GIT_DIR: join(directory, ".git"), GIT_WORK_TREE: directory };
  const skipped = run({ ...gitEnv, VERCEL_GIT_PREVIOUS_SHA: first, VERCEL_GIT_COMMIT_SHA: second });
  assert.equal(skipped.code, 0, skipped.stdout);
  assert.match(skipped.stdout, /skip:/);

  mkdirSync(join(directory, "docs/builder-academy"), { recursive: true });
  writeFileSync(join(directory, "docs/builder-academy/github-api-deployment-reliability.md"), "# lesson\n");
  git(["add", "."]);
  git(["commit", "-m", "academy lesson"]);
  const third = git(["rev-parse", "HEAD"]);
  const built = run({ ...gitEnv, VERCEL_GIT_PREVIOUS_SHA: second, VERCEL_GIT_COMMIT_SHA: third });
  assert.equal(built.code, 1, built.stdout);
  assert.match(built.stdout, /build:/);

  const missing = run({ VERCEL_GIT_PREVIOUS_SHA: "", VERCEL_GIT_COMMIT_SHA: "" });
  assert.equal(missing.code, 1);
  assert.match(missing.stdout, /fail open/);
});
