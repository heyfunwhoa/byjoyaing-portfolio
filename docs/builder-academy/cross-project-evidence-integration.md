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
