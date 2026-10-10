# Operational Readiness — Portfolio Checklist

Use **Verified**, **Configured but unverified**, **Missing**, **Not applicable**, or **Access blocked**. A checkmark is not proof without an evidence link. Reassess before material releases.

| Control | Current evidence (Oct 10, 2026) | Status | Follow-up |
|---|---|---|---|
| Documented source and framework | `package.json`, `README.md` on main identify Next.js and scripts | Verified config | Track releases to a SHA |
| GitHub CI recipe | `.github/workflows/ci.yml` runs install, lint, tests and build | Configured but unverified for next release | Capture specific workflow run result |
| Protected main / required checks | Rules or reviewer enforcement not confirmed | Unverified | Inspect GitHub Settings |
| Vercel project inventory | Project `byjoyaing-portfolio` returned in authorized list | Verified inventory | Verify Git linkage |
| Vercel deployment status | Deployment listing was blocked with 403 scope authorization | Access blocked | Fix authorized Vercel scope; retry read-only inspection |
| Development vs preview vs production variables | Not inspected | Unverified | Check names/scopes only; never values |
| Preview smoke tests | No preview URL/status verified in this exercise | Unverified | Test actual matching commit |
| DNS and HTTPS | Not inspected | Unverified | Verify on release |
| Error/log observability | Not inspected | Unverified | Inspect Vercel runtime logs & alerting |
| Rollback path | Procedure proposed in companion runbook | Documented, untested | Identify known-good deployment and rehearse safely in non-production |
| Database migration/restore | No portfolio database confirmed by this audit | Not determined | Mark N/A only after architecture confirms |
| Resend/API credentials | Resend dependency present; env scopes and routes unreviewed | Unverified | Validate server-only and least-privilege handling |
| Access/owner and release approval | Not verified | Unverified | Record release owner and authorized actions |

## Readiness decision
- **Ready to review**: evidence attached for tests and plan for gaps; not a release authorization.
- **Ready for preview**: PR checks appropriate to change pass and preview is accessible in correct environment.
- **Ready for production**: explicit release authorization, approved change, matching deployment/build evidence, verified env/domain/health and workable recovery.
- **Blocked**: missing authorization, unknown target, unresolved critical risk or required gate failure.

## Next actions
1. Reconnect/authorize the intended Vercel scope to inspect portfolio deployments.
2. Link the exact release commit to a completed GitHub Actions run.
3. Document preview-to-production behavior and whether checks actually gate promotion.
4. Capture a preview smoke-test result and non-destructive rollback plan.
5. Add simple monitoring/alert ownership once the deployment controls are verified.

This is a learning artifact and risk-control template, not a SOC 2 / NIST certification or a statement of production readiness.
