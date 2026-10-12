# Portfolio analytics — privacy-first decision and rollout

**Decision status:** PostHog client capture is wired as of 2026-10-12 and stays inactive until `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` is set for a production build. It is **not production-verified** and has no baseline. Vercel Web Analytics is still **not installed**. [Tracking issue #74](https://github.com/heyfunwhoa/byjoyaing-portfolio/issues/74).  
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
4. Vercel Web Analytics, if used later, still needs a reviewed `@vercel/analytics` install and `<Analytics />` in the root layout only after steps 1–3. PostHog is a separate client install: `posthog-js` initializes from `instrumentation-client.ts` only when the project token is present and the hostname is not local. Capture is limited to anonymous pageviews and link/button clicks. Session replay, surveys, exception capture, feature-flag polling, and `$identify` are off. Query strings, hashes, and contact fields are removed before send. The contact form, the competitive-intelligence practice form, and the mailto control are marked `data-ph-no-autocapture`. Events go through the first-party `/relay` rewrite. Do not put the project token in Preview until a synthetic check is intentional.
5. Run lint, typecheck, tests, build, secret and dependency checks; verify no unexpected scripts/replay/identifiers are present. Use safe synthetic preview visits to validate events without generating sensitive URLs.
6. Once explicitly approved for production, verify the released commit SHA and the Vercel dashboard; only then mark metrics as collecting data.
7. Set a 7–14-day evaluation (or enough traffic): what changed in route discovery, what can we not infer, and do we need any additional events?

## Separation of concerns

| System | Measurement role | Must not contain |
| --- | --- | --- |
| Portfolio site: PostHog client, inactive until a production token is set | Anonymous route pageviews and link/button clicks through `/relay` | Names, emails, message text, user IDs, query values, session replay, surveys |
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
