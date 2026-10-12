# GitHub API & Deployment Reliability Standard

**Status:** Working standard for this portfolio.  
**Intended shared home:** `heyfunwhoa/technical-docs-platform`. On 2026-10-12 that repository was not resolvable with the available GitHub credential (`gh repo view` returned "Could not resolve to a Repository"). This file is the single working copy until that repository can be read and the standard can be moved or linked. Do not create a second copy.  
**Checked:** 2026-10-12  
**Applies to:** Repositories that deploy a web app with GitHub Actions and a Git-connected host, currently this Next.js portfolio on Vercel.

## Architecture and failure model

```text
pull request or main push
  -> GitHub Actions (lint, test, build, security scans)
  -> Vercel Git integration fetches the commit
  -> build and deploy
  -> production alias, only for a READY deployment
  -> smoke check of public routes
```

Actions and Vercel are separate. A green Actions run does not deploy the site. A Vercel deployment does not prove Actions passed.

| Failure | Where it appears | What it is not |
| --- | --- | --- |
| Source validation | Lint or unit tests | A production outage |
| Security check | Semgrep, secret scan, dependency audit, Trivy | A reason to disable the scan |
| Application build | `npm run build` or a Vercel build error after the source is fetched | A GitHub 403 |
| Git provider / API rate limit | Vercel `git_info_fail`, or GitHub 403/429 with rate-limit headers or a secondary-rate-limit body, before the build | An application bug, and not something an app cache can prevent |
| Deployment platform | Vercel `ERROR`, `CANCELED`, or `BLOCKED` after source retrieval, or an alias that does not match the intended deployment | Proof the site is down, until the alias is checked |
| Runtime or smoke test | A READY deployment whose key routes do not return HTTP 200 | A failed CI job |

Threats this standard addresses: retry storms against GitHub, cancelled production validation, a failed deployment being described as shipped, and unnecessary builds. It does not replace branch protection, credential rotation, or a hosting provider.

## Rate-limit fundamentals

GitHub's primary limit is the hourly request budget. Authenticated requests have a higher budget than anonymous ones. The secondary limit reacts to bursts and concurrency. It can return HTTP 403 or 429 while `x-ratelimit-remaining` is still above zero.

Response handling for clients we control:

| Signal | Action |
| --- | --- |
| `retry-after` on 403 or 429 | Stop. Wait the stated seconds. Then one deferred attempt is allowed. |
| `x-ratelimit-remaining: 0` | Stop until `x-ratelimit-reset`. |
| 403 or 429 with a secondary-rate-limit message and no `retry-after` | Stop for at least 60 seconds. Later attempts use bounded exponential backoff with jitter, capped at 300 seconds. |
| 401, permissions 403, or 404 | Do not retry. A 404 can mean a private resource is hidden. |
| 408, 425, or 500–504 | Defer with the same bounded backoff. |
| Attempt count reaches 3 | Stop. Do not keep the loop alive. |

Do not log tokens, Authorization headers, or response bodies that may contain secrets. Log the status, a rate-limit classification, and the wait time.

## Concurrency and request budgets

Prefer one serial queue per credential over parallel clients. Leave at least one second between mutative GitHub API calls. For polling that cannot be a webhook, honor `x-poll-interval`, send `if-none-match` or `if-modified-since`, and keep the query stable so unchanged responses can return 304.

GitHub Actions concurrency for this portfolio:

```yaml
concurrency:
  group: ci-${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: ${{ github.event_name == 'pull_request' }}
```

Pull-request validation cancels a superseded run for that ref. Pushes to `main`, scheduled scans, and manual dispatches do not cancel an in-progress run. They queue when they share a group. That can spend extra minutes during a burst of merges. It avoids dropping the validation for a production commit.

Do not add a second workflow that deploys the same commit. This repository does not call `vercel deploy` from Actions. Vercel’s Git integration is the deploy path.

## Caching and webhooks

Use webhooks for events GitHub or Vercel already push. Cache only responses that are safe to reuse, with a bounded TTL, and do not cache authorization failures as success.

Conditional requests are for clients we own. There is no application-owned GitHub API client in this repository today, so no retry client was added. The decision rules live in `lib/release/reliability.ts` and are covered by unit tests. A future client should call `decideGithubRequest` instead of growing a second policy.

Application-level caching cannot prevent a Vercel-managed Git fetch error. `git_info_fail` happens before the build, so Next.js cache headers, `fetch` cache, and an ignored build step never run.

## CI and deployment policy

- Production deployments come from `main` through the existing Git integration. Do not disconnect that integration, and do not rotate its credential, without evidence the connection is the fault.
- Preview deployments remain available for pull requests. Non-custom-domain deployments on this project use Vercel SSO (`all_except_custom_domains`, observed 2026-10-12).
- `ignoreCommand` may skip a build only after Git metadata is available, and only when every changed path is non-public operational content: `.github/`, `docs/operations/`, `docs/audit/`, `AGENTS.md`, `CLAUDE.md`, or `README.md`. Exit 0 skips. Any other exit builds.
- Builder Academy lessons, `docs/builder-academy/`, `app/`, `lib/`, and any unclassified path always build.
- If the previous SHA is missing or the diff fails, the ignore command exits 1 and the build proceeds.
- A failed production deployment must not be promoted. Confirm alias ownership. On 2026-10-12 the `git_info_fail` deployments owned no aliases, and the previous READY deployment still owned `www.byjoyaing.com`.
- Do not set `github.autoAlias` to false and do not disable `git.deploymentEnabled`. Both would change the release path without fixing a rate limit.
- Vercel `github.autoJobCancelation` stays at the provider default. The observed failures were `ERROR`, not cancelled builds. Turning cancellation off would spend more build time without answering `git_info_fail`.
- Security scans stay enabled. Trivy remains report-only (`exit-code: "0"`) until a separate decision changes that gate. Semgrep stays blocking. The weekly Semgrep cron stays.

Permissions stay `contents: read`. Checkouts set `persist-credentials: false`. Dependency installs stay `npm ci` with the lockfile and `actions/setup-node` npm cache. That cache does not change the resolved tree.

## Retry and backoff

The only automatic retry this standard allows is inside a future GitHub API client, and only after `decideGithubRequest` returns `stop` or `defer` with `mayRetryAfterWait`. It does not apply to Vercel.

Do not automatically redeploy when GitHub rate-limits a Vercel fetch. Wait until the provider window has passed, confirm the intended SHA, and create one new deployment. If that attempt returns the same secondary limit, stop and record the incident.

## Observability

For each release, record:

| Field | Value |
| --- | --- |
| Intended full SHA | |
| Actions run URL and job conclusions | |
| Vercel deployment ID, ready state, error code | |
| Alias names and the deployment that owns them | |
| Smoke route statuses | |
| Failure classes, if any | |
| Whether a retry was started | |

Logs may include deployment IDs, SHAs, status codes, and job names. They must not include tokens or personal data.

## Incident recovery

1. Stop further deploys of the affected commit.
2. Classify every signal. Keep a test failure and a `git_info_fail` as separate rows.
3. Read alias ownership. If the failed deployment has none, production is still the last READY deployment that owns the domains.
4. For a rate limit, wait, then make one deployment of the same SHA. Do not roll back a healthy deployment just because a newer fetch failed.
5. For a bad READY release, use the existing rollback runbook and an operator. A code rollback does not undo email, data, or leaked secrets.
6. Write down what was verified after recovery. A merged pull request is not that record.

## Cost

- Cancel superseded pull-request runs.
- Do not cancel `main` validation.
- Skip Vercel builds for operational-only diffs after Git data is available.
- Keep one weekly security scan rather than adding a polling service.
- Do not add a paid monitoring product, an API gateway, or a central rate-limit service for this single repository.

Node versions differ today: Actions uses Node 22, and the Vercel project reports Node 24.x. Aligning them is a manual decision because it changes the production runtime. This change does not switch either one.

## Security

- Least privilege on the workflow token. No write permissions for these checks.
- TruffleHog remains pinned to the moving `@main` tag. Pinning a commit SHA is safer and is left as a follow-up so this change does not alter the scanner.
- Do not print GitHub or Vercel tokens while diagnosing a 403.
- Branch protection and required checks were not readable (`GET` branch protection returned 403; repository rulesets returned an empty list). Confirm in the GitHub UI that the required checks still include CI, Security scans, and Semgrep.
- SSO on `*.vercel.app` stays. Custom domains `byjoyaing.com` and `www.byjoyaing.com` are the public production names.

## Configuration examples

Pull-request cancellation without cancelling `main`:

```yaml
concurrency:
  group: ci-${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: ${{ github.event_name == 'pull_request' }}
```

Skip a Vercel build only for known non-public paths. Exit 0 skips. Exit 1 builds.

```json
{
  "ignoreCommand": "node --experimental-strip-types --disable-warning=MODULE_TYPELESS_PACKAGE_JSON scripts/vercel-ignore-build.ts"
}
```

Release verdict, in code: `assessRelease` returns verified only when the full SHAs match, the state is `READY`, that deployment owns the production aliases, the failure-class list is empty, and the smoke gaps are empty. A merge flag is not an input.

## Acceptance criteria

- Superseded pull-request workflows cancel. `main` and scheduled workflows do not.
- Security scans and `npm audit` still run.
- No new GitHub API client retries Vercel failures.
- Operational-only diffs can skip a Vercel build. Academy lessons and application files cannot.
- A `git_info_fail` plus a failed unit test produces both classes.
- A release is verified only with SHA, READY, alias, and smoke evidence.
- The Builder Academy card and this standard describe the same incident without claiming the failed SHA is in production.

## Portfolio adoption — 2026-10-12

| Setting | Current observation | Risk | Decision | Evidence |
| --- | --- | --- | --- | --- |
| CI concurrency | Group per workflow and ref. Cancellation was on for every event, including `main`. | A newer `main` push could cancel validation of a production commit. | Cancel only `pull_request`. Keep the group. | `.github/workflows/ci.yml` |
| Security-scan concurrency | Same cancel-all behavior. | Same production-cancellation risk. | Same pull-request-only cancellation. Scanners unchanged. | `.github/workflows/security-scans.yml` |
| Semgrep | Every pull request, `main` pushes, manual runs, and `37 11 * * 2` UTC. No concurrency. Blocking. | Superseded PR scans ran to completion. | Add the same cancellation rule. Keep the cron and the blocking scan. | `.github/workflows/semgrep.yml` |
| Visual QA | Path-filtered pull requests plus manual dispatch. Cancelled every run on the ref. | A manual dispatch could cancel PR visual checks. | Cancel only pull-request events. | `.github/workflows/visual-qa.yml` |
| Actions permissions | `contents: read`. npm cache and `npm ci` on Node 22. | Low. | Keep. Set `persist-credentials: false` on the security checkouts that lacked it. | Workflow files |
| Actions deploy step | None. | Duplicate deploy requests would add Git fetches. | Do not add a Vercel deploy action. | No `vercel deploy` in workflows |
| Application GitHub client | No `api.github.com`, Octokit, or `gh api` call in application code. | A generic retry layer would be unused and could be copied into a redeploy loop. | No retry client. Tested decision function only. | Repository search, 2026-10-12 |
| Scheduled work | Weekly Semgrep only. No app poller. | Low ongoing Git usage. | Keep the one staggered cron. | `semgrep.yml` |
| Vercel Git integration | Production deployments from `main`, `source: git`. | The integration’s Git fetch is outside the app. | Leave the connection in place. | Deployments `dpl_2qxLe6YHSCLZgm2L9snuiy13vGAJ` and `dpl_A1aAUxhoCnvfFghy1psgWPSRPS5G` |
| Failed production | Both deployments `ERROR` / `git_info_fail` in about four seconds. Alias list empty. | Describing #91 or #93 as deployed would be false. | Do not redeploy in a loop. Record them as not shipped. | Alias API and GitHub deployment statuses |
| Healthy production | `dpl_6SDZdBmNNbw1GxawQqDFKvcjUv26`, SHA `7486b46706880137672ab606aa72a6f99664d964`, state READY, owns `www.byjoyaing.com` and `byjoyaing.com`. Home returned HTTP 200. | None from the failed fetches. | Do not roll back this deployment because a newer fetch failed. | Alias API, 2026-10-12 |
| Ignored build step | No `vercel.json` before this change. | Operational commits still spend a build after a successful fetch. | Add a fail-open ignore command. It does not prevent `git_info_fail`. | `vercel.json`, Vercel `ignoreCommand` docs |
| Node version | Actions 22. Vercel project `nodeVersion` 24.x. | Builds can differ. | Manual follow-up. Not changed here. | `get_project` and workflow files |
| Branch protection | API 403. Rulesets list empty. | Required checks might not be enforced. | Confirm in the GitHub UI. | `gh api` branch protection and rulesets |
| Shared standards repo | Not resolvable. | This file could drift from a future shared copy. | Keep one working copy and record the gap. | `gh repo view heyfunwhoa/technical-docs-platform` |
| Carousel CI | Unit test `installed primitives are present and public pages do not adopt them` failed because `app/work/page.tsx` adopted a primitive. | Easy to misread as the deployment failure. | Leave it to PR #94. | Actions run 38250954246 |

The same check requested `https://www.byjoyaing.com/`, `/about`, `/work`, `/contact`, and `/ai-academy`. Each returned HTTP 200. That smoke evidence belongs to READY SHA `7486b46706880137672ab606aa72a6f99664d964`, which still owned the domain. It does not verify `8c37fc1`.
