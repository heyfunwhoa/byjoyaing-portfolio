# Shared engineering standards adoption

**Canonical baseline:** [Technical Docs Platform — Engineering Baseline v1.0](https://github.com/heyfunwhoa/technical-docs-platform/blob/main/engineering/baseline-v1.md)
**Adoption status:** partial — policy reference established; controls still require independent evidence
**Risk tier (provisional):** B
**Owner:** repository maintainer
**Initial review:** 2026-10-10

## Why tier B
Public Next.js portfolio includes API/contact integrations and deployment workflows. Privacy and brand requirements remain local.

## Local requirements
- Existing repository-specific source of truth: [docs/development-workflow.md](../docs/development-workflow.md).
- Reusable secure-development and delivery expectations come from the linked canonical baseline. Do **not** copy the whole policy here.
- Existing app-specific domain integrity, private-data protections, brand/UX rules, Next.js agent instructions and published-content approval requirements continue to apply.
- GitHub API and Vercel release rules: [GitHub API & Deployment Reliability Standard](operations/github-api-deployment-reliability.md). On 2026-10-12 `technical-docs-platform` was not resolvable, so this repository holds the only working copy.

## Enforcement inventory
| Control | Current adoption assessment | Verification needed |
| --- | --- | --- |
| Linked shared standard | implemented | this document |
| CI / tests / build | assessed 2026-10-12 | Workflows run lint, test, build, and audit on Node 22. `main` SHA `8c37fc1` failed unit tests for a separate shadcn guard. Pull-request concurrency now cancels superseded runs; `main` does not |
| Dependency audit / secret scans | assessed 2026-10-12 | `npm audit` and Semgrep are blocking. Trivy is report-only (`exit-code: "0"`). TruffleHog runs on pull requests only |
| Least-privilege GitHub and production access | partial | Workflow tokens are `contents: read`. Branch protection was not readable |
| Threat model / input validation | partial | Release failure classes are documented. Application input validation was not re-audited |
| Deployment verification and recovery | assessed 2026-10-12 | Runbook plus alias evidence. `8c37fc1` was not production. READY SHA `7486b46` owned `www.byjoyaing.com` |
| Publication/data privacy | not assessed | domain-specific review and permissions tests |

**Important:** This is reference adoption, not certification or proof that controls are enforced. Record exceptions with owner, residual risk, mitigation and review date before marking any requirement as satisfied.

[Adoption procedure](https://github.com/heyfunwhoa/technical-docs-platform/blob/main/engineering/adoption.md) · [Repository matrix](https://github.com/heyfunwhoa/technical-docs-platform/blob/main/engineering/adoption-matrix.md)
