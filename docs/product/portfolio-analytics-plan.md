# Portfolio analytics — bounded rollout

**Status:** PostHog page analytics is implemented but disabled by default and not production-verified. No baseline exists. Vercel Web Analytics is mounted with the same public-route allowlist and query stripping; dashboard activation and collected results are not verified. [Tracking issue #74](https://github.com/heyfunwhoa/byjoyaing-portfolio/issues/74).

## Purpose and limits

Measure discovery of reviewed public landing pages. Pageviews are a proxy for discovery, not proof of hiring outcomes or successful contact. Only `/`, `/about`, `/work`, `/contact`, `/side-quests` and `/academy` are allowed. Other routes, including private work, dynamic case-study slugs and labs, are dropped. Extend the explicit allowlist only after route review.

## Integration contract

One `instrumentation-client.ts` initializer serves both analytics and [error monitoring](../monitoring/posthog-errors.md). Each capability has an independent enable switch. A token alone enables neither. Both require a recognized US/EU ingestion host, a project token, production mode and Vercel production environment. Preview and local builds remain off.

Analytics requires `NEXT_PUBLIC_POSTHOG_ANALYTICS_ENABLED=true`; browser error monitoring requires `NEXT_PUBLIC_POSTHOG_MONITORING_ENABLED=true`. Server monitoring keeps its separate existing switch. All default to false.

Only `$pageview` events on reviewed production origins and paths are admitted for analytics. The filter reconstructs the payload with safe pathname/current URL and no person processing; it removes query strings, fragments, referrers, arbitrary properties, nested values and person updates. Exception events use their existing strict sanitizer and ten-per-minute instance budget, independently of analytics.

Click autocapture, pageleave, replay, heatmaps, surveys and performance capture remain off. Browser storage is disabled and identity is transient in memory; no person profiles are created. This is not a claim that network requests are anonymous: vendor/network metadata and billing/retention settings require review. Repeat-visitor and acquisition attribution are not supported by this bounded pilot.

Ingestion uses the configured PostHog host directly. The proposed `/relay` rewrite and global trailing-slash proxy were removed during reconciliation; site redirects and security headers stay unchanged. No additional PostHog SDK change is needed because main already includes PostHog.

Vercel Web Analytics is a separate aggregate pageview path. `components/vercel-analytics.tsx` mounts `<Analytics />` from `@vercel/analytics/next` in the root layout. `beforeSend` admits only the reviewed origins and paths above, rebuilds the URL without a query string or fragment, and drops custom events. The script does not collect in development. Preview hosts are rejected by the origin allowlist. Enabling the Vercel project dashboard, reviewing the public notice, and recording a real payload remain separate from this mount.

## Activation and verification

1. Confirm the portfolio project, region, access, retention and billing limits; follow the monitoring rollout checklist. Keep Account Signal Engine research in its separate project.
2. Review the public privacy notice and collection basis before enabling page analytics.
3. Set the analytics switch only in Vercel Production after that review, with the existing public project token and recognized host. Rebuild because public variables are baked into the bundle. This PR does not change production variables.
4. Verify one controlled public landing-page view and navigation in browser network tools and PostHog. Confirm queries, person properties and private paths are absent. Confirm a monitoring-only configuration sends no pageviews and preview/local send nothing.
5. Record released SHA, observed payload and dashboard evidence before calling collection live. Production delivery and dashboard counts remain unverified.
6. Evaluate usefulness after 7–14 days or sufficient traffic, without inventing a baseline. Add explicit CTA events only through a separate reviewed contract.

## Rollback

Set `NEXT_PUBLIC_POSTHOG_ANALYTICS_ENABLED=false` and rebuild to stop analytics while retaining independently enabled error monitoring. To stop all monitoring as well, disable both browser/server monitoring switches and redeploy. Disabling code does not delete previously ingested data.

## Evidence

Unit tests cover the four capability combinations, production gates, payload redaction, route rejection, unapproved events and error flood limits. CI checks build, typecheck, lint, security and browser regressions. These do not prove live ingestion or legal compliance.

## Sources

- [PostHog SDK configuration](https://posthog.com/docs/libraries/js/config)
- [PostHog persistence](https://posthog.com/docs/libraries/js/persistence)
- [PostHog person profiles](https://posthog.com/docs/data/persons)
- [Portfolio success metrics](portfolio-success-metrics.md)
