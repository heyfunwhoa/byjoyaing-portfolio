# PostHog error monitoring rollout

Status: integration prepared on a feature branch; production collection is not yet enabled or verified. Owner: Kristen Aing. Scope: byjoyaing-portfolio error monitoring; independently gated page analytics is documented in [the analytics plan](../product/portfolio-analytics-plan.md).

## Implemented

- Browser unhandled errors/rejections via `instrumentation-client.ts`; Node request errors via Next.js `onRequestError`.
- Separate explicit client/server enable switches, valid project token and recognized ingestion host required. Only Vercel production collects; preview/local remain off.
- Monitoring alone sends no pageviews. An independent, default-off analytics switch permits reviewed public landing-page views through the same initializer. Click analytics, replay, heatmaps, surveys, persistent browser identity and person profiles remain off.
- Strict exception allowlist retains common error types, code-file basenames and line/column numbers. Freeform error messages, full paths/URLs, request headers/bodies, source context, user properties and provider payloads are removed.
- Monitoring delivery failures cannot replace the original response. Node delivery has a 1.5-second request timeout with no retries.
- Flood guard allows ten exceptions per minute per browser or server instance. This is not a global quota or billing cap.

PostHog project 659261 is assigned to the portfolio; replay/console/performance capture are off, click autocapture is opted out and IP anonymization is on. No event ingestion has been verified.

## Activation checklist

1. In PostHog organization Billing, confirm free/no-card status or set each enabled product's billing limit to $0. Do not add a card or upgrade solely for this pilot. Connected tools do not expose billing-limit updates; this has not been verified.
2. Review region (US), privacy notice, collection basis, vendor access and retention. The browser uses transient anonymous SDK identity; the server uses a fresh ID per error. Redaction reduces diagnostic detail deliberately.
3. Set Vercel **Production only** variables using project 659261's ingestion token, never a personal API key:
   - `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` and `POSTHOG_PROJECT_TOKEN`
   - `NEXT_PUBLIC_POSTHOG_HOST` and `POSTHOG_HOST`: `https://us.i.posthog.com`
   - `NEXT_PUBLIC_POSTHOG_MONITORING_ENABLED` and `POSTHOG_MONITORING_ENABLED`: `true`
   - Ensure Vercel system environment variables expose `NEXT_PUBLIC_VERCEL_ENV=production` and `VERCEL_ENV=production`.
4. Merge after checks/review, then rebuild; public environment variables are baked into the browser bundle.
5. In a controlled verification session send one labeled synthetic browser exception and one server exception; confirm both appear with correct `source`, no private values and no replay. No public test-error endpoint is shipped.
6. Verify actual delivery payloads in browser network tools. Check that preview/local issue no PostHog requests. React boundary-handled client errors, caught provider failures, Edge errors and background jobs require explicit instrumentation later; this initial integration does not claim to cover them.
7. Configure actionable alerts after the first verified issue; no alert destination is currently configured.

## Account Signal Engine

Do not reuse the portfolio token for account research. Its existing `docs/product-analytics/posthog-pilot.md` requires exposure, authentication and account-permission checks before remote collection. That application also currently excludes error stack traces. Add a reviewed error-monitoring contract with enum-only workflow categories and no research/CSV/request payloads before enabling it. Keep remote monitoring disabled until those prerequisites and a separate project/cost decision are verified. Its SDK has not been installed by this portfolio PR.

## Rollback

Disable both enable switches and redeploy. Client switches require a rebuild. Keep Vercel runtime logs available for diagnosis. If sensitive payloads are ever ingested, disable collection and use an authorized vendor deletion process; code redaction does not erase previously captured events.

## Verification evidence

Privacy tests cover explicit activation, preview/local exclusion, nested synthetic secret removal and flood limits. Build, lint, unit tests and dependency audit results belong in the PR. Production delivery, source maps, alert delivery, uptime checks and cron monitoring remain unverified/not implemented.

Sources: [Next.js installation](https://posthog.com/docs/error-tracking/installation/nextjs), [Node installation](https://posthog.com/docs/error-tracking/installation/node), [SDK configuration](https://posthog.com/docs/libraries/js/config), [billing limits](https://posthog.com/docs/billing/limits-alerts), [Next.js instrumentation](https://nextjs.org/docs/app/api-reference/file-conventions/instrumentation).
