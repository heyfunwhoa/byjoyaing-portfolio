# Portfolio analytics — privacy-first decision and rollout

**Decision status:** Vercel Web Analytics planned for aggregate site traffic; **not installed, enabled or verified** as of 2026-10-11. [Tracking issue #74](https://github.com/heyfunwhoa/byjoyaing-portfolio/issues/74).  
**Product:** byjoyaing.com public editorial/professional site. Distinct from the private Account Signal Engine product, which has a [separate PostHog plan](https://github.com/heyfunwhoa/account-signal-engine/blob/main/docs/product-analytics/posthog-pilot.md) (**subject to the related PR merging**).  
**Canonical measurable outcomes:** [Portfolio success metrics](portfolio-success-metrics.md). **Standards:** shared product-measurement template proposed in technical-docs-platform.

## Why Vercel Analytics first?

Learn which pages people discover and the sources of visits. It provides aggregate page views and referrers without needing per-user login, identifying profiles, or session replays. **Don't conflate page views with hiring outcomes, recruiter satisfaction or conversion to an interview.**

## Hypothesis and useful questions

**Hypothesis (unverified):** People who land on the portfolio can find relevant work samples and the contact route.

- **Discovery:** Visits to `/work`, `/field-notes`, `/side-quests`, `/about` and `/contact` by safe route/path pattern. The current count is **not measured**.
- **Acquisition:** Aggregate referrer categories and high-level regions or devices, subject to the privacy configuration.
- **Potential follow-up:** A specific CTA event may be useful later if tested and reviewed, but avoid scraping contact form inputs or tracking email/link recipients. Do not assume external mailto or LinkedIn navigation equals a successful hiring conversation.

**Baseline:** none. Do not populate numeric targets until real observations exist and sample size is meaningful.

## Implementation and privacy review before installation

1. Verify authorized Vercel project/team and explicitly enable Web Analytics via the Vercel dashboard. Do not assume the GitHub repository alone activates it.
2. Review the public privacy/consent notice and any relevant jurisdictional requirements; Vercel's claimed privacy-preserving architecture is not a legal conclusion for this app.
3. Review URL content and query parameters for tokens, user IDs, search terms or confidential content; only safe route templates/pathnames should be captured. Evaluate `beforeSend` filtering per current package docs, especially if protected Selected Work routes are later introduced.
4. On a feature branch, install a reviewed `@vercel/analytics` version and update `package-lock.json` together. Add `<Analytics />` in the Next.js root layout only after 1–3 are satisfied; do not add PostHog to the site for basic pageviews.
5. Run lint, typecheck, tests, build, secret and dependency checks; verify no unexpected scripts/replay/identifiers are present. Use safe synthetic preview visits to validate events without generating sensitive URLs.
6. Once explicitly approved for production, verify the released commit SHA and the Vercel dashboard; only then mark metrics as collecting data.
7. Set a 7–14-day evaluation (or enough traffic): what changed in route discovery, what can we not infer, and do we need any additional events?

## Separation of concerns

| System | Measurement role | Must not contain |
| --- | --- | --- |
| Portfolio site: Vercel Web Analytics | Aggregate visitor traffic and safe page patterns | Names, emails, user IDs, query values containing personal data, protected-document URLs |
| Builder Academy (future) | Only opt-in or otherwise appropriately governed synthetic-safe learning-step events if justified | Free-text submissions, student profiles, raw recordings |
| Account Signal Engine: PostHog (later) | Authenticated, permission-checked GTM workflow success events; separate app/project | Customer accounts, signals, research details, rep names, revenue |
| Product audit logging | Tamper-resistant/retained records of privileged authenticated application changes | Vendor analytics as sole proof of access decision |

## Product measurement habit

For each feature (portfolio or learning app), write one problem/outcome, one measurable proxy, a small event set, exclusions/consent and exact test. Review dashboards **after** verified release, with baseline, time window and limitations. Refer to [Builder Academy's measuring-product-usage lesson](../builder-academy/measure-product-usage-safely.md) for a fictional practice lab; don't add persistent learner tracking as a prerequisite for the lesson.

## Sources

- [Vercel Analytics quickstart](https://vercel.com/docs/analytics/quickstart)
- [Vercel Analytics privacy](https://vercel.com/docs/analytics/privacy-policy)
- [Vercel Analytics configuration and beforeSend](https://vercel.com/docs/analytics/package)
- [PostHog privacy documentation](https://posthog.com/docs/privacy)
