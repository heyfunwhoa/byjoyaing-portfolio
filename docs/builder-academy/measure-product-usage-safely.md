# Builder Academy — Measure product use safely

**Track:** Builder / Product Measurement · **Level:** Beginner · **Time:** 20 minutes  
**Status:** Synthetic applied lesson; tracking not installed by this document.  
**Prerequisites:** [From idea to verified release](idea-to-verified-release.md), [Better Auth GTM workspace](better-auth-gtm-workspace.md), [Authentication vs Authorization](authentication-vs-authorization.md).

## Learning objectives

- Distinguish **Better Auth identity**, server-side **resource authorization**, **PostHog usage analytics**, **Vercel aggregate web traffic**, and **durable app security audit logs**.
- State one outcome, numerator, denominator, time window, baseline and guardrail before choosing tracking events.
- Choose authoritative event emission after a successful, authorized business operation instead of recording optimistic clicks.
- Use low-cardinality allowlisted properties, prevent private account/customer data escaping, and test analytics-off behavior.
- Record `planned`, `tested`, `merged`, `deployed` and `verified` separately.

## A fictional GTM workflow

A seller desk lets fictional AE Alex add an account, review a public signal, run research and produce a human-reviewable outreach draft. Alex can access their own book but cannot see Jordan's.

```text
Better Auth:       who signed in?
Authorization:     which book/account and action is allowed?
Product analytics: did permitted users complete the intended workflow?
Audit logging:     who changed a privileged policy or record?
```

PostHog events **proposed** (not currently installed): `account_added`, `signal_reviewed`, `research_completed`, `outreach_draft_created`, `workflow_failed`. Each should carry `schema_version: 1` plus only an enumerated, relevant property such as `method: manual/import` or `outcome: success/failure`. No company domains, account IDs, URLs, query strings, email, rep names, research text, prompts, drafts, tokens, cookies or billing data.

**Correct emission:** Only after a verified user's permitted mutation commits or a permitted background job actually finishes. A button click, in-flight request or queued job is *not* `research_completed`.

## Defining success without making up results

**Hypothesis:** authorized sellers who review a signal can complete a draft within seven days.  
**Measurement:** among eligible, consenting users who reviewed a signal this week, count the unique users who then created a draft within a defined seven-day window. Record the cohort and exclusions before analysis.

Fictional illustration: 4 of 10 eligible participants complete a draft, so `4/10 = 40%` for that fictional cohort. Without a real baseline, you **cannot** claim a 40% improvement. With one operator, percentages are not reliable product-market-fit evidence; combine completion counts with qualitative notes and failure analysis.

## Learning lab

| Scenario | Capture a business-success event? | Reason |
| --- | --- | --- |
| Anonymous Add Account click | No | Not an authorized, persisted account |
| Alex adds an approved fictional account; commit succeeds | Yes, once | A real workflow outcome occurred |
| Alex submits Jordan's account ID | No | The authorization layer must deny with zero side effects |
| React rerenders the completed view | No new event | A view rerender isn't a new business operation |
| Research enters the queue but never completes | Not `research_completed` | Queued does not equal finished |
| PostHog is down | Do not block account update | Analytics must not control the business transaction |
| Reader visits the public `/work` page | Aggregate pageview only if approved | Vercel Web Analytics is a different, privacy-scoped use case |

**Test sketch, synthetic only:**
```ts
const response = await simulateActionWithVerifiedSession({
  principal: "alex-fixture",
  accountId: "jordans-account-fixture"
});
expect(response.allowed).toBe(false);
expect(writeStore).not.toHaveBeenCalled();
expect(sendAnalyticsEvent).not.toHaveBeenCalled();
expect(requestResearchJob).not.toHaveBeenCalled();
```

This is pseudocode; a real app must derive identity from its verified server session, not caller-supplied input.

## Security / privacy policy exercise

Before integrating any SDK, write down collection purpose, whether identities are necessary, the lawful collection basis/consent and opt-out handling, hosted region, retention/deletion, property allowlist, access to vendor dashboards and how to disable tracking. For private GTM/customer systems, **no session replay or autocapture by default**. Never equate PostHog with a security audit trail.

Public portfolio: aggregate Vercel Analytics, with safe URL and query-string filtering. Private GTM product: PostHog explicit success events only *after* authentication, data authorization, and deployment-protection review. Static or inactive projects: no SDK unless a real product decision depends on the metric.

## Knowledge check

**Question:** A signed-in AE clicks Generate Draft, but their account access is denied. Should the app emit `outreach_draft_created`?

- A. Yes, the click proves adoption.
- **B. No, only an authorized and persisted draft counts.**
- C. Yes, if a session exists.

**Answer: B.** Authentication alone is not authorization; the event must match successful trusted application state.

## Learning journal

```text
Date and feature:
User problem and hypothesis:
Numerator / denominator / time window:
Event contract and safe properties:
Test / PR / deployed SHA evidence:
Actual observation (or not measured):
Privacy exclusions and uncertainty:
Decision: keep, change, remove, or collect more evidence:
```

## References

- [PostHog Next.js guide](https://posthog.com/docs/libraries/next-js)
- [PostHog privacy guidance](https://posthog.com/docs/privacy)
- [Vercel Analytics quickstart](https://vercel.com/docs/analytics/quickstart)
- [Vercel Analytics redaction](https://vercel.com/docs/analytics/redacting-sensitive-data)
- [OWASP logging guidance](https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html)

**Status reminder:** This chapter explains an implementation *plan*, not a running integration or a verified production dashboard.
