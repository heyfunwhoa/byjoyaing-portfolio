# Builder Academy — cross-project evidence integration plan

**Status:** Proposed interoperable research interface; not deployed.

Related draft reviews:
- [Security Market Map PR #11](https://github.com/heyfunwhoa/security-market-map/pull/11)
- [Detector Coverage Atlas PR #10](https://github.com/heyfunwhoa/detector-coverage-atlas/pull/10)
- [Builder Academy identity education PR #32](https://github.com/heyfunwhoa/byjoyaing-portfolio/pull/32)

## Source-of-truth boundaries

- Atlas: code-observed, SHA-pinned TruffleHog detector metadata. A `Verify()` method does not prove a credential instance was verified.
- Market Map: sourced market claims, dated reviews, verified/vendor-published/conflicting states and explicit Unknown.
- Academy: fictional labs plus a catalog of public references and educational explanations.

## Integration order

1. Review the shared contract in both source repositories. Align concept IDs, stage order and source references without changing their local schemas.
2. Add deterministic tests and **allowlisted static projections** to each producer only when needed. Exclude raw secret values, personal data, private URLs, tokens and private customer records.
3. Consume pinned, versioned public-safe snapshots in Academy. Fall back to offline synthetic examples when missing or outdated.
4. Show source title, publisher, observed/reviewed date, exact evidence status, and limitations in the UI. No guessed capability checkmarks.
5. Later: refresh snapshots on a review cadence, using PR-based review and stale/failure reporting before publishing. No live credential verification or automatic AI enrichment of raw findings.

## Six stages and examples

| Stage | Atlas contribution | Market Map contribution | Academy demonstration |
| --- | --- | --- | --- |
| Detect | Regex, keywords, verification code existence, source SHA | Secrets detection category and sourced vendor claims | Compare signature, regex, entropy, structure, context |
| Identify | Public detector type metadata where available | NHI/security category relationships | Associate fictional token with service account/owner |
| Verify | Presence or absence of code support, **not live credential validity** | Published validation product claims | Simulate valid/invalid/unknown |
| Assess | No assumed privilege insight | IAM/CIEM/NHI capabilities backed by sources | Model effective access and potential blast radius |
| Investigate | No assumed incident logs | ITDR/SIEM capabilities backed by sources | Show fictional audit signal vs unknown evidence |
| Remediate | Detection context and public remediation guidance where sourced | Secrets management/IAM capabilities backed by sources | Coordinate rotation, revoked grants and recovery |

## UI rule

Each stage should offer: `How it works`, `Evidence sources`, `What we know`, `What's unknown`, `Market context`, and `Practice`. Vendor/market links are **not** endorsements or independent feature tests.

## Safety and editorial review

Do not add private Joy Index data, real secrets, customer examples, confidential files or unrestricted cross-repo tokens to public content. Publication is conditional on source and schema reviews, tests, and successful CI. Neither draft producer PR is an active integration.

## Static link pilot and shared framework inventory

Proposed 2026-10-13; merge and publication remain separate review steps.

Market Map category cards link to the Academy credential-risk, identity-journey and source-verification routes. Academy owns lesson text, exercises and progress. Market Map owns vendors, products and sourced market claims. The pilot shares only short preview metadata and ordinary links; it does not fetch private notes or synchronize progress.

The maintainer-only framework register in private Technical Docs is the proposed owner of stable framework IDs, publisher links, limitations and review status. It is not a public learner resource or a public runtime dependency. Public lessons must cite independently accessible publisher sources; any future public projection requires explicit review and a verified public destination before linking it. Private Index keeps personal adaptations and links outward. Keystatic may later edit approved public editorial content, but must not import private records or create a second authoritative inventory.

Start simple: learn the concept, practice with a fictional example, then compare the market evidence. Use the [Market Map repository](https://github.com/heyfunwhoa/security-market-map) for market context and sourced category records.

Proposed teaching references, subject to editorial review:
- Credential risk: `mitre-attack` and `nist-ssdf`; select a scenario-specific technique rather than claiming generic coverage.
- Pre-commit limitations: `nist-ssdf` and `owasp-asvs`; demonstrate missing controls across IDE, repository and CI/CD, with version-qualified requirements.
- Build provenance: `slsa`; do not assign an assurance level without its required evidence.
- AppSec program: `owasp-samm` and `owasp-top-10`; distinguish maturity from awareness.
- Source verification: `research-evidence-lifecycle`; research, review, validation and publication are separate states.

Do not label IDEs, AI assistants, Git repositories or CI/CD as security frameworks. They are developer tools, systems or workflow stages where controls can run. A framework mapping needs an upstream version, exact requirement/technique where applicable, rationale, evidence and reviewer. These proposed references do not establish implementation or vendor coverage.
