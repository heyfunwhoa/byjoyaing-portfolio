export const MAX_GITHUB_ATTEMPTS = 3;

export const PUBLIC_SMOKE_ROUTES = ["/", "/about", "/work", "/contact", "/ai-academy"] as const;

export const VERCEL_SKIP_PREFIXES = ["docs/operations/", "docs/audit/", ".release/notes/"] as const;

export const VERCEL_SKIP_FILES = ["AGENTS.md", "CLAUDE.md", "README.md", "RELEASE.md", ".github/RELEASE_CHECKLIST.md", ".github/pull_request_template.md"] as const;

const SECURITY_CI_JOBS = new Set([
  "semgrep",
  "TruffleHog introduced secrets",
  "Trivy dependency and config review",
  "Production dependency audit",
]);

const BUILD_CI_JOBS = new Set(["Production build + TypeScript"]);

const SOURCE_CI_JOBS = new Set(["Lint", "Unit tests"]);

export type FailureClass =
  | "source_validation"
  | "security_check"
  | "application_build"
  | "git_provider_rate_limit"
  | "deployment_platform"
  | "runtime_smoke";

export type GithubRequestDecision = {
  action: "ok" | "stop" | "defer" | "do_not_retry";
  waitSeconds: number | null;
  mayRetryAfterWait: boolean;
  reason: string;
};

const FAILURE_ORDER: FailureClass[] = [
  "source_validation",
  "security_check",
  "application_build",
  "git_provider_rate_limit",
  "deployment_platform",
  "runtime_smoke",
];

export function isFullGitSha(value: string | null | undefined): value is string {
  return typeof value === "string" && /^[a-f0-9]{40}$/i.test(value.trim());
}

export function shasMatch(intended: string | null | undefined, deployed: string | null | undefined): boolean {
  if (!isFullGitSha(intended) || !isFullGitSha(deployed)) return false;
  return intended.trim().toLowerCase() === deployed.trim().toLowerCase();
}

export function isOperationalDeployPath(path: string): boolean {
  if (!path || path.startsWith("/") || path.includes("\\") || path.split("/").includes("..")) return false;
  if ((VERCEL_SKIP_FILES as readonly string[]).includes(path)) return true;
  return path.endsWith(".md") && VERCEL_SKIP_PREFIXES.some((prefix) => path.startsWith(prefix));
}

/** True only when every changed path is operational. Empty and unknown paths build. */
export function shouldSkipVercelBuild(paths: readonly string[]): boolean {
  return paths.length > 0 && paths.every((path) => isOperationalDeployPath(path));
}

export function backoffSeconds(attempt: number, random: () => number = Math.random): number {
  const safeAttempt = Math.max(1, Math.floor(attempt));
  const ceiling = Math.min(300, 60 * 2 ** (safeAttempt - 1));
  const floor = Math.min(60, ceiling);
  const sample = Math.min(1, Math.max(0, random()));
  return Math.round(floor + (ceiling - floor) * sample);
}

function rateLimitWait(input: {
  retryAfterSeconds?: number | null;
  remaining?: number | null;
  resetEpochSeconds?: number | null;
  nowEpochSeconds: number;
  attempt: number;
}): number {
  if (input.remaining === 0 && typeof input.resetEpochSeconds === "number") {
    return Math.max(1, input.resetEpochSeconds - input.nowEpochSeconds);
  }
  if (typeof input.retryAfterSeconds === "number" && Number.isFinite(input.retryAfterSeconds)) {
    return Math.max(1, Math.ceil(input.retryAfterSeconds));
  }
  return backoffSeconds(input.attempt);
}

function isRateLimit(input: {
  status: number;
  remaining?: number | null;
  retryAfterSeconds?: number | null;
  body?: string | null;
}): boolean {
  const body = input.body?.toLowerCase() ?? "";
  if (body.includes("secondary rate limit") || body.includes("rate limit exceeded")) return true;
  if (input.remaining === 0 && (input.status === 403 || input.status === 429)) return true;
  if (
    (input.status === 403 || input.status === 429) &&
    typeof input.retryAfterSeconds === "number" &&
    input.retryAfterSeconds >= 0
  ) {
    return true;
  }
  return false;
}

function isPermissionFailure(status: number, body: string): boolean {
  if (status === 401 || status === 404) return true;
  if (status !== 403) return false;
  return /resource not accessible|bad credentials|requires authentication|saml|integration/i.test(body);
}

export function decideGithubRequest(input: {
  status: number;
  attempt?: number;
  retryAfterSeconds?: number | null;
  remaining?: number | null;
  resetEpochSeconds?: number | null;
  nowEpochSeconds?: number;
  body?: string | null;
}): GithubRequestDecision {
  const attempt = input.attempt ?? 1;
  const nowEpochSeconds = input.nowEpochSeconds ?? Math.floor(Date.now() / 1000);
  const body = input.body ?? "";

  if (input.status >= 200 && input.status < 300) {
    return { action: "ok", waitSeconds: null, mayRetryAfterWait: false, reason: "request succeeded" };
  }

  if (attempt >= MAX_GITHUB_ATTEMPTS) {
    return {
      action: "do_not_retry",
      waitSeconds: null,
      mayRetryAfterWait: false,
      reason: "retry budget exhausted",
    };
  }

  if (isRateLimit(input)) {
    const secondary = (input.body ?? "").toLowerCase().includes("secondary rate limit");
    return {
      action: "stop",
      waitSeconds: rateLimitWait({ ...input, nowEpochSeconds, attempt }),
      mayRetryAfterWait: true,
      reason: secondary
        ? "secondary rate limit; stop until the wait elapses"
        : "primary or provider rate limit; stop until the wait elapses",
    };
  }

  if (isPermissionFailure(input.status, body) || input.status === 400 || input.status === 422) {
    return {
      action: "do_not_retry",
      waitSeconds: null,
      mayRetryAfterWait: false,
      reason: "authorization, permission, or validation failure",
    };
  }

  if (input.status === 408 || input.status === 425 || (input.status >= 500 && input.status <= 504)) {
    return {
      action: "defer",
      waitSeconds: backoffSeconds(attempt),
      mayRetryAfterWait: true,
      reason: "transient provider failure",
    };
  }

  return {
    action: "do_not_retry",
    waitSeconds: null,
    mayRetryAfterWait: false,
    reason: "unclassified non-retryable response",
  };
}

export function classifyReleaseEvidence(input: {
  failedCiJobs?: readonly string[];
  vercelReadyState?: string | null;
  vercelErrorCode?: string | null;
  providerStatus?: number | null;
  providerBody?: string | null;
  smoke?: readonly { path: string; status: number }[];
}): { classes: FailureClass[]; notes: string[] } {
  const classes = new Set<FailureClass>();
  const notes: string[] = [];
  const ready = input.vercelReadyState?.toUpperCase() ?? "";
  const errorCode = input.vercelErrorCode?.toLowerCase() ?? "";

  for (const job of input.failedCiJobs ?? []) {
    if (SECURITY_CI_JOBS.has(job)) {
      classes.add("security_check");
      notes.push(`Security check failed: ${job}`);
    } else if (BUILD_CI_JOBS.has(job)) {
      classes.add("application_build");
      notes.push(`Application build failed: ${job}`);
    } else if (SOURCE_CI_JOBS.has(job)) {
      classes.add("source_validation");
      notes.push(`Source validation failed: ${job}`);
    } else {
      classes.add("source_validation");
      notes.push(`Unclassified CI job failed: ${job}`);
    }
  }

  const providerLimited =
    typeof input.providerStatus === "number" &&
    isRateLimit({
      status: input.providerStatus,
      body: input.providerBody,
      retryAfterSeconds: input.providerBody?.toLowerCase().includes("secondary rate limit") ? 60 : null,
    });

  if (errorCode === "git_info_fail" || providerLimited) {
    classes.add("git_provider_rate_limit");
    notes.push("Git provider failed before the application build. Do not treat this as a source or build failure.");
  } else if (ready === "ERROR" || ready === "CANCELED" || ready === "BLOCKED") {
    classes.add("deployment_platform");
    notes.push(`Deployment platform state: ${ready || "unknown"}`);
  }

  if (input.smoke?.some((result) => result.status !== 200)) {
    classes.add("runtime_smoke");
    notes.push("One or more smoke routes did not return HTTP 200.");
  }

  return {
    classes: FAILURE_ORDER.filter((item) => classes.has(item)),
    notes,
  };
}

export function smokeGaps(results: readonly { path: string; status: number }[]): string[] {
  const byPath = new Map(results.map((result) => [result.path, result.status]));
  return PUBLIC_SMOKE_ROUTES.filter((path) => byPath.get(path) !== 200);
}

export function assessRelease(input: {
  intendedSha: string | null;
  deployedSha: string | null;
  readyState: string | null;
  productionAliasOwned: boolean;
  classes: readonly FailureClass[];
  smokeGaps: readonly string[];
}): { verified: boolean; reasons: string[] } {
  const reasons: string[] = [];
  if (!shasMatch(input.intendedSha, input.deployedSha)) {
    reasons.push("Deployed SHA does not match the full intended release SHA.");
  }
  if (input.readyState?.toUpperCase() !== "READY") {
    reasons.push("Deployment is not READY.");
  }
  if (!input.productionAliasOwned) {
    reasons.push("Production aliases do not point at this deployment.");
  }
  if (input.classes.length > 0) {
    reasons.push(`Failure classes present: ${input.classes.join(", ")}.`);
  }
  if (input.smokeGaps.length > 0) {
    reasons.push(`Smoke gaps: ${input.smokeGaps.join(", ")}.`);
  }
  return { verified: reasons.length === 0, reasons };
}
