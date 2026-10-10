# Deploy → Verify → Recover — Portfolio Runbook

**Status:** working runbook; instructions for authorized operators, not confirmation that each control is active.

## Before deployment
1. Identify target repo, feature branch, PR, exact commit SHA, reviewer and intended environment.
2. Review scope, release risks, dependencies, sensitive data and any config/migration changes.
3. Inspect actual GitHub Actions run attached to the **same commit**: install, lint, tests, build. Record job links and any exceptions.
4. Check the Vercel project scope and source Git link; find **the exact corresponding preview deployment**. Do not assume a GitHub success equals successful preview or production deployment.
5. Review environment-variable names/scopes without printing values. Confirm Resend credentials remain server-only.
6. Confirm who may release and whether branch protection, required checks and Vercel Deployment Checks are enforced. If unverified, record as a gap.

## Preview verification
- Confirm preview deployment status is READY in the **correct project and scope**; visit the actual preview URL.
- Smoke-test home, about, projects, work detail, contact, and redirect behavior as applicable.
- Inspect broken assets, console/runtime errors, basic accessibility and mobile layout.
- For any contact/email action, use a safe test mode or a pre-approved internal test destination; do not send real-user mail simply to test a preview.
- Capture the preview URL, exact commit, time, tester, and observations.

## Release
- Only after review and applicable checks: merge through approved GitHub workflow.
- Confirm what Vercel considers the production branch. If there are Deployment Checks or manual promotion gates, verify them. Never assume automatic deployment is required or safe.
- Record release deployment ID/URL, commit and timestamp; do not release a different build accidentally.

## Production verification
- Verify the intended domain, HTTPS certificate and routes.
- Do a non-destructive smoke test; check runtime errors and any email API failures without logging sensitive request bodies.
- Mark **verified** only with evidence from the deployed version (not only a green build).
- Notify owner or open an issue if anything diverges from the runbook.

## Recovery decision
1. Stop further risky releases; determine the affected environment, blast radius and whether data changed.
2. If it is application-code-only, select a previously verified production deployment **in the same Vercel scope** and follow the documented rollback procedure with operator authorization.
3. **Do not issue a production rollback as a lab exercise.** A code rollback does not revert database migrations, external API side effects, lost data, leaked keys or sent emails.
4. After rollback, confirm domain and key routes, inspect errors, and document incident/corrective actions.
5. Note that Vercel rollback may affect auto-assignment/promotion behavior; check official docs and the active project configuration before action.

## Failure diagnosis cheat sheet
| Symptom | Start here |
|---|---|
| CI failed | Actions → failed job/step logs; exact commit |
| Build failed | `npm ci`, Next.js build output, dependency lockfile and version |
| Vercel preview missing | Vercel Git integration, permission/scope, branch and deployment history |
| Vercel 403 | Access/scope/authorization; do not replace an inaccessible project with another |
| Site runs but page breaks | Runtime logs, server env scope, API failures, browser console |
| Contact action fails | Server-side Resend configuration and provider response; redact secrets |
| Domain/TLS error | DNS records, domain assignment, certificate status |
| Bad production release | Incident assessment → approved rollback/hotfix, then health verification |

## Evidence template
| Field | Value |
|---|---|
| Project / Vercel scope | |
| PR / Git SHA / reviewer | |
| Target environment | |
| CI job link + conclusion | |
| Preview deployment ID + URL + status | |
| Smoke-test results and tester | |
| Security/privacy checks | |
| Production release ID + URL + status | |
| Known-good fallback and caveats | |
| Post-release health evidence | |
| Outcome / owner / time | |

Official references: [Vercel Deployments](https://vercel.com/docs/deployments), [Vercel Rollbacks](https://vercel.com/docs/deployments/rolling-back-a-deployment), [GitHub Actions](https://docs.github.com/en/actions).
