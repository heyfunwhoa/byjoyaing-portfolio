# Engineering, Quality & Security Baseline

**Scope:** Next.js public portfolio. This is a proposed baseline; it does not assert that every command currently passes or every control is configured.

## Definition of Done
1. Work on a feature branch, explain intent and acceptance criteria, use focused commits and a PR; inspect the diff for accidental secrets, unrelated files and sensitive data.
2. Run the checks appropriate for the change. Suggested local command sequence: `npm ci; npm run lint; npx tsc --noEmit; npm run build`. Investigate failures rather than bypassing gates; only enforce commands in CI after confirming project compatibility.
3. Check dependency changes, lockfiles, relevant CodeQL/SAST, secret scanning and dependency alerts where supported. Validate that required GitHub checks actually execute; a mergeable PR alone is not evidence of a passed check.
4. Document behavior, test evidence, risk/security review, any migrations, configuration changes, and deployment/rollback plan when applicable.
5. Review, approve and merge after required checks. Verify deployed behavior and logs, capture lessons learned.

## Project-specific risk controls
Check accessibility, responsive layouts, links, secret-free browser bundles, preview deployment and rollback plan.

## Recommended implementation order
- P0: inventory existing GitHub Actions, branch protections/rulesets, secret and dependency scanning, current scripts and test failures. Preserve working controls; do not duplicate them.
- P0: put lint, type checks, relevant unit tests and a build into PR CI where applicable; separate tests requiring live services. Use fake data in tests.
- P1: add PR checklist, CODEOWNERS when collaborators exist, coverage thresholds as tests mature, and preview verification.
- P2: add deployment gates, monitoring, SBOM/provenance and deeper security tests proportional to application exposure.

## Why these controls exist
Branches isolate experiments; commits create checkpoints; PRs enable review; CI makes tests repeatable; secret and dependency scanning reduce preventable exposure; protected environments and rollbacks make releases safer. Not all checks belong in every repository, and no automated result proves a system is secure.

## Review checklist
- [ ] Change matches acceptance criteria
- [ ] Local tests and applicable CI checks were run and results inspected
- [ ] Security and privacy implications assessed; no real credentials or unauthorized datasets committed
- [ ] Documentation, user experience and operational impact reviewed
- [ ] Deployment/rollback and monitoring considered, if applicable

Reference guidance: [NIST SSDF](https://csrc.nist.gov/projects/ssdf), [GitHub pull requests](https://docs.github.com/en/pull-requests), [OWASP ASVS](https://owasp.org/www-project-application-security-verification-standard/).