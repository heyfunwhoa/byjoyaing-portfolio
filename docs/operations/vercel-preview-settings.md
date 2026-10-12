# Vercel preview settings (byjoyaing-portfolio)

Working checklist for the `byjoyaing-portfolio` Vercel project. Do not store secrets in this file.

## What was broken

| Symptom | Cause | Fix |
| --- | --- | --- |
| Preview URL redirects to “Log in to Vercel” | **Vercel Authentication** on Preview (intentional) | Sign in as a team member, or use a **Shareable Link** / automation bypass for tools |
| PR check says `Canceled by Ignored Build Step` with no preview URL | Project-level **Ignored Build Step** skipped real app diffs | Keep ignore logic only in-repo via `vercel.json` + `scripts/vercel-ignore-build.ts` (fail open). Clear any Dashboard override. |
| Preview / production `ERROR` in a few seconds, empty aliases | Platform `git_info_fail` when GitHub rate-limits the git fetch | Wait for the rate-limit window; redeploy the intended SHA once. Do not loop redeploys. See [github-api-deployment-reliability.md](./github-api-deployment-reliability.md). |
| Many `CANCELED` previews | Newer commits on the same branch supersede in-flight builds | Expected under rapid agent pushes; only the latest commit needs a READY preview |

## Recommended project settings

Apply in **Vercel → Project → Settings** (or keep the values already applied):

| Setting | Recommended | Why |
| --- | --- | --- |
| Framework | Next.js | Auto-detect |
| Node.js Version | **22.x** on Vercel and GitHub Actions | Applied; avoid version drift between CI and deploy |
| Production Branch | `main` | Matches repo workflow |
| Preview Deployments | **Enabled** | Every PR needs a URL for visual review |
| Ignored Build Step | **Only** the repo `vercel.json` `ignoreCommand` | Skip `.github/`, `docs/operations/`, `docs/audit/`, and top-level agent readmes. App, Academy, and public docs still build. Fail open if the diff is unavailable. |
| Git Fork Protection | **On** | Fork PRs need authorization before deploy |
| Vercel Authentication (SSO) | **Preview** only | Keep WIP private; keep `www.byjoyaing.com` / `byjoyaing.com` public |
| Password Protection | Off (unless sharing with non-Vercel reviewers) | Prefer Shareable Links over a shared password |
| Automation Bypass | One secret, set as env `VERCEL_AUTOMATION_BYPASS_SECRET` | Playwright / CI can hit protected previews with `x-vercel-protection-bypass` |
| Protected source maps | **On** | Avoid leaking map files on public URLs |
| Auto-expose system env vars | **On** | `VERCEL_ENV`, git SHA metadata for ignore + diagnostics |

## Environment variables

| Variable | Production | Preview | Notes |
| --- | --- | --- | --- |
| `RESEND_API_KEY` | Production key only | Omit until a separate test key exists | Production-only as of 2026-10-12; preview contact returns the unconfigured 503 path |
| `CONTACT_INBOX` / `RESUME_INBOX` | Real inbox | Safe internal test inbox | Never point preview at a customer mailbox by accident |
| `RESEND_FROM` | Verified domain sender | `onboarding@resend.dev` or verified test | Matches Resend domain rules |
| `VERCEL_AUTOMATION_BYPASS_SECRET` | Optional | Set for Preview (and Production if tools need it) | Created under Deployment Protection; never commit |

Do not put secrets in `NEXT_PUBLIC_*`.

## How to open a preview correctly

1. Confirm the GitHub **Vercel** check is green for the **latest** PR head (not an older SHA).
2. Open the deployment URL while logged into the Vercel team that owns `krusty1` / this project.
3. For external reviewers: Deployment → **Share** → Shareable Link (time-boxed).
4. For automation: send header `x-vercel-protection-bypass: <secret>` (or query `?x-vercel-protection-bypass=`).
5. Smoke `/`, `/about`, `/work`, `/contact` on that exact deployment before merge.

## Applied project state (2026-10-12)

| Control | Value |
| --- | --- |
| Ignored Build Step (Dashboard) | Empty — use repo `vercel.json` only |
| Vercel Authentication | Preview |
| Git fork protection | On |
| Preview deployments | On |
| Node.js | 22.x |
| `RESEND_API_KEY` targets | Production only |

## Do not

- Turn off Vercel Authentication on Preview for a public portfolio that may contain unpublished copy.
- Add a second `vercel deploy` path in GitHub Actions while Git integration is the source of truth.
- Redeploy in a loop after `git_info_fail`.
- Treat “Canceled by Ignored Build Step” as a successful preview of UI work — force a rebuild if the PR changed app or public assets.
- Re-attach the production `RESEND_API_KEY` to Preview; add a separate test key if preview mail is required.

## Related

- [deploy-verify-recover.md](./deploy-verify-recover.md)
- [deployment-architecture.md](./deployment-architecture.md)
- Repo ignore entrypoint: `vercel.json` → `scripts/vercel-ignore-build.ts` → `lib/release/reliability.ts`
