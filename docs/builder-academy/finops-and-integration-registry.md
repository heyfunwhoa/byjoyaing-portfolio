# Builder Academy: Integration registries and FinOps guardrails

**Status:** companion source linked from the existing FinOps Academy card; this expansion is pending PR review and deployment verification  
**Updated:** 2026-10-12  
**Canonical controls:** [Technical Docs Software Catalog](https://github.com/heyfunwhoa/technical-docs-platform/tree/main/software-catalog)

## Learning objectives

Trace service relationships, distinguish proposed from verified integrations, create a cost estimate, and design a budget-aware job before enabling it.

## 1. Why a registry?

A software catalog says **which repositories exist**. An integration inventory says **which services exchange information**. An architecture registry explains **data ownership and boundaries**. A FinOps inventory records costs and safeguards. These belong in one canonical documentation platform, not separate competing registries.

Evidence matters: a planned Storybook integration or a Vercel project listing does not prove that a runtime integration works.

## 2. Follow one integration

Example: Account Signal Engine pulls approved public research from a source.

Record its purpose, owning repository, source and data classification, trigger, authentication, quotas, deduplication key, failure/retry behavior, retention, approval step, connection state and verification evidence. Do not include credentials or confidential customer data in the public registry.

## 3. Model total cost

Total cost of ownership combines software subscriptions, usage-based API fees, background executions, hosting, network and storage, and CI compute. A $0 open-source license does **not** promise a $0 deployment.

A basic workload estimate is:

`Monthly variable cost ≈ monthly calls × cost per call + execution/storage costs`

If provider pricing is unknown, mark the value **unknown**. Do not invent a forecast or write $0.

## 4. Guardrail exercise

Plan a daily research job:

1. Identify the allowed sources and project owner.
2. Cap records per run, retries, concurrency, input size, and model tokens.
3. Deduplicate results and cache previously collected evidence.
4. Choose an **approved** project monthly budget. Example thresholds in the policy: review at 50%, stronger alert at 80%, pause nonessential metered jobs at 100%.
5. Add an application-level stop mechanism and test that it halts billable work.
6. Configure vendor alerts where supported, but note that alerts are **not necessarily hard spending caps**.
7. Record actual invoices and provider usage privately; only high-level governance metadata belongs in the repo.

## 5. What could go wrong?

- A retry loop creates runaway API spend.
- Scheduled jobs continue in unused preview environments.
- A free tier expires or pricing changes.
- A dashboard is marked “healthy” based on a configuration file but never tested.
- Screenshots and logs retain sensitive content longer than needed.
- A bulk scraping job violates source rules or vendor terms.

## 6. Knowledge check

**Q:** A tool is open source. Does that make its hosting free?  
**A:** No.

**Q:** An alert fires at 100% spend. Does it prevent future charges?  
**A:** Not unless a verified spending cap or application-level kill switch prevents new metered work.

**Q:** A relationship is described in a README. Is it a verified runtime connection?  
**A:** No; verify through tests and evidence.

## Applied assignment

Design one integration record and one project budget proposal for Design Lab. Keep Storybook and Playwright at $0 incremental license cost, leave unmeasured CI costs unknown, and defer Chromatic until explicitly approved.

## References

- [FinOps policy](https://github.com/heyfunwhoa/technical-docs-platform/blob/main/software-catalog/finops-policy.md)
- [Integration registry](https://github.com/heyfunwhoa/technical-docs-platform/blob/main/software-catalog/integrations.json)
- [FinOps service inventory](https://github.com/heyfunwhoa/technical-docs-platform/blob/main/software-catalog/finops-services.json)

## 7. From one click to several meters

FinOps means understanding what work costs, deciding whether that work is useful, and putting controls around it. You do not need a finance team to start.

One click on “Research account” can start several separate services. The account itself is not normally the billing unit.

| Work | Meter to inspect | What increases it |
| --- | --- | --- |
| Discover sources | Search requests, endpoint, results and options | More searches, deeper research, extra results |
| Read sources | Pages, credits, browser minutes or extraction options | More pages, PDFs, browser interaction, structured extraction |
| Analyze text | Model input/output tokens and optional tool/cache charges | Longer evidence, repeated prompts, larger output, more model calls |
| Coordinate jobs | Function runs, durable steps and relevant plan limits | More steps, retries and scheduled runs |
| Serve the app | Host compute, memory, invocations, transfer and builds | More traffic, long work, larger responses, more deployments |
| Store evidence | Database compute, storage, history, branches and transfer | More retained versions, active compute and forgotten environments |
| Observe and verify | Logs, traces, CI minutes and retained artifacts | Verbose logging, long retention and frequent test runs |

A token is a small unit of text processed by a model, not exactly a word. Input includes instructions and evidence you send; output is generated text. Some models also meter reasoning or tools under provider-specific rules. Read the selected model's billing documentation.

A job coordinator's fee does not necessarily include the compute that executes your code. Likewise, paying for a scraping service's built-in AI extraction does not pay for a separate model call you make afterward.

### Provider examples, checked 2026-10-12

These explain billing shapes; they are not your account's contracted rates or a recommended plan.

- Exa lists separate Search, Contents, Deep Search and Agent pricing. Endpoint and options matter; do not treat every request as the same price. [1]
- Firecrawl bills credits. Its billing documentation lists basic scraping at one credit per page and structured JSON extraction at four additional credits per page. Thus four basic pages consume four credits; four pages with that extraction option consume twenty, before other options. A returned error-page document can still be billed; some outright failures are unbilled. [2]
- Claude API pricing distinguishes input, output, cache writes and cache reads. Account for the actual model and usage categories rather than counting “one AI call.” [3]
- Inngest counts function runs and step executions. Its example of one function plus five steps consumes six executions; included allowances do not make those executions disappear. [4]
- Vercel has multiple infrastructure and platform meters, with plan and regional differences. [5]
- Neon documents compute in CU-hours and storage separately. Scaling compute to zero does not erase retained storage. Current account rates and allowances require checking the console; do not infer them from an old pricing article. [6]

## 8. Three different meanings of cost

| View | Question it answers | Example |
| --- | --- | --- |
| Cash charge | What new money did I pay? | A subscription renewal or a prepaid credit purchase |
| Usage consumption | What allowance did this work use? | Twenty credits consumed from an existing balance |
| Allocated cost | How much of shared spending do I attribute to this project? | A documented share of a shared hosting plan |

These views are related but should not be added together blindly. A prepaid credit purchase and later consumption of those same credits are not two cash expenses. A subscription that already includes usage should not be counted again as both the full subscription and an additional cash charge for every included unit.

For a simple plan, cash billed for a period is approximately base fees + billable overages/add-ons + top-ups + tax - applicable discounts or credits. Minimums, commitments and prepaid balances can change that calculation.

For a credit plan, plan price divided by included credits can provide an allocation rate. It is not necessarily the next credit's cash price, especially with unused, free, expiring or bonus credits. Track native units even if the dollar conversion is unknown.

## 9. Worked example: five fictional accounts

**All rates in this section are invented teaching inputs. They are not vendor prices, an invoice, or a forecast for Account Signal Engine.** Exclude subscriptions, hosting, database, job-platform charges, tax and retries so the arithmetic is visible.

Assume one pass per account uses:
- One search at an illustrative USD 0.01 per search.
- Four basic page reads at an illustrative USD 0.005 per page.
- Across two AI calls combined: 12,000 input tokens and 2,000 output tokens.
- Illustrative model rates: USD 3 per million input tokens and USD 12 per million output tokens.

| Component | Calculation for one account | Cost |
| --- | --- | --- |
| Search | 1 × 0.01 | USD 0.010 |
| Pages | 4 × 0.005 | USD 0.020 |
| AI input | 12,000 ÷ 1,000,000 × 3 | USD 0.036 |
| AI output | 2,000 ÷ 1,000,000 × 12 | USD 0.024 |
| Total variable research | Sum of these four rows | USD 0.090 |

Five accounts × USD 0.09 = **USD 0.45 per pass**.
A baseline plus one identical refresh = **USD 0.90**.
A proposed USD 10 allowance is a ceiling, not a prediction that the run will spend USD 10. The teaching example does not prove that any real allowance is sufficient.

### Frequency can matter more than account count

Assume every pass repeats the same work, with no cache savings, retries or baseline charge:

| Workload over a 30-day period | Account-passes | Illustrative research cost |
| --- | --- | --- |
| Five accounts, four refreshes | 20 | USD 1.80 |
| Five accounts, daily | 150 | USD 13.50 |
| Five accounts, every six hours | 600 | USD 54.00 |
| Fifty accounts, daily | 1,500 | USD 135.00 |

“Every six hours” means four times per day, including weekends unless explicitly restricted. Schedules are an operating decision; a small test does not authorize ongoing monitoring.

## 10. Caching, retries and hidden multipliers

**Application cache:** reuse a saved result without making a new provider call. It can avoid that provider charge, though reading your database still has an infrastructure cost.

**Provider/model cache:** another service reuses work after you call it. It may charge a cache-read rate; it is not necessarily free.

**Change detection:** fetching a page to learn that nothing changed can still consume credits. Comparing a stored content hash can avoid repeating downstream AI analysis, but it cannot recover the fetch cost.

**Retries:** a second attempt is not automatically free. If your app times out after the provider accepted the request, it may already have been billed. Confirm the provider's result or idempotency support before retrying uncertain work. Backoff spaces retries apart; it does not by itself reduce the number of billable attempts.

**Fan-out:** one job creates multiple page reads or AI calls. Bound each layer, not only the number of accounts.

**Cross-project usage:** other apps sharing a provider account can consume the same allowance. Project attribution and separate keys help track usage, but a key alone does not necessarily create a spending cap.

Other multipliers include reading unnecessary pages, sending the same text to several models, enabling overlapping cron systems, regenerating drafts on every page view, automatic top-ups and active preview environments. Store only the evidence and logs you need under an explicit retention policy.

## 11. Estimate, reserve, account, reconcile

These are different states, not four charges.

| State | Plain-language meaning |
| --- | --- |
| Estimated | A forecast based on planned units and a dated price |
| Reserved | Allowance temporarily held before a potentially billable call |
| Accounted | Usage observed or conservatively recorded by your app |
| Billed/reconciled | Cost matched to provider reporting or invoice evidence |
| Unresolved | A call may have been charged, but the result or bill is not yet known |

Imagine a fictional USD 10 budget with USD 8 already accounted and USD 1 reserved for running work. Only **USD 1** is available for another reservation. A new operation needing USD 1.20 must wait or be denied.

If the existing USD 1 reservation later settles at USD 0.60 with adequate billing evidence, the remaining USD 0.40 becomes available. A timeout alone is not evidence to release it.

Two workers must not both read the same remaining dollar and spend it. The reservation needs a durable, atomic update: either all applicable budget checks succeed together or the call is denied. “Atomic” means another worker cannot slip between the check and reservation.

A provider invoice is the final billing reference. Application estimates can lag or be wrong; maintain a buffer and reconcile. A kill switch stops future dispatch, not charges for work already accepted or ongoing storage.

## 12. Design the controls before the schedule

For a fictional five-account pilot, propose USD 10 total and USD 2 per account across the baseline and one refresh. Keep those limits configurable and explicitly approved before enabling paid operations. This is a teaching policy, not a setting implemented by this lesson.

Before a run:
1. Show selected accounts, pages/searches/token ceilings, estimated maximum, remaining budget, and unresolved usage.
2. Check provider, project/pilot, account and run allowances together. A pilot lifetime cap must not silently reset with a provider's monthly allowance.
3. Deny unknown or unbounded prices. Save the price version and billing units.
4. Reserve the maximum before each dispatch; use a stable job identity so repeated clicks do not duplicate work.

During and after:
- Bound attempts, input/output sizes, concurrency and duration.
- Warn before exhaustion; block an operation whose maximum would exceed the allowance.
- Preserve completed evidence when stopping. Label incomplete work as partial, budget-blocked or provider-failed.
- Reconcile uncertainty instead of silently refunding it.
- Keep essential security/incident controls available when pausing discretionary research.
- Test with synthetic data and fake providers first. No paid practice calls are needed.

An application ceiling covers only the operations routed through it. Vendor dashboards, another app using the same keys, infrastructure costs and already-dispatched work can lie outside it.

## 13. Your practical FinOps checklist

| Record privately | Why it matters |
| --- | --- |
| Service, project, environment and owner | Know who can stop the work |
| Plan, billing cycle and currency | Match your actual contract |
| Endpoint/model/options and native billing units | Estimate the right operation |
| Included credits, remaining allowance and expiry | Separate usage from new cash charges |
| Price source, checked date and estimate assumptions | Detect stale rates |
| Job/account ID, attempts, cache hits and provider request ID | Attribute and reconcile usage |
| Estimated, reserved, accounted and billed amounts | Avoid presenting estimates as invoice facts |
| Alert, hard stop, auto-top-up and retention settings | Know what really limits spending |

Actual billing totals, provider account IDs, keys and invoices stay private. A public lesson contains only fictional examples and general controls.

Review cost per **useful reviewed brief**, alongside source accuracy and review time. If a fictional pilot spends USD 0.90 and three briefs are useful, that is USD 0.30 per useful brief. If none is useful, the ratio is undefined; the spend was not zero. Five accounts do not establish sales ROI.

## 14. Practice without spending

Use the fictional rates from section 9.

1. Calculate five accounts with a baseline and one full refresh.
2. Now assume the refresh still searches and reads all pages, but only two accounts need new AI analysis.
3. Explain why a timeout should not automatically return reserved money.
4. List which costs the calculation excludes.
5. Write a preflight message that states planned units, maximum cost, remaining allowance and that no schedule is enabled.

**Answer key:** (1) USD 0.90. (2) Baseline USD 0.45 + refresh collection USD 0.15 + two AI analyses at USD 0.06 = USD 0.72. (3) The provider may already have performed billable work. (4) Hosting, database, orchestration, subscriptions, tax and any retries/add-ons. (5) A good message distinguishes estimate from cap and identifies the scope and unknown costs.

Suggested learning order in the existing Academy: “MCP versus REST APIs: how integrations work” → “Control integrations and cloud spend” (this lesson) → “Secure CSV, AI research, and account export” → “Evaluate AI models with evidence.”

## 15. Follow one research action from click to bill

**Fictional design walkthrough, not a claim about a deployed app.** Cedar Example uses the reserved domain cedar.example; it is not a real prospect. All dollar figures below are teaching assumptions.

| Step | What happens | Possible cost | Evidence the app should retain |
| --- | --- | --- | --- |
| Add account | Validate the domain and authorized ownership, then save | App/database usage; no research provider call in this design | Account ID, admission decision |
| Preview research | Plan one search, four pages and bounded AI work | App compute; no research dispatch | Scope, price version, estimate and maximum |
| Authorize and reserve | Check access plus every applicable allowance | Database transaction | Durable reservation and logical operation IDs |
| Search | Ask an approved provider for sources | Search units/options | Provider request ID, units, returned URLs |
| Read pages | Fetch only selected approved pages | Page credits/options | Capture versions, timestamps, usage and failures |
| Extract and interpret | Process bounded evidence and label hypotheses | Model input/output/cache/tool usage | Model/version, usage and supporting capture IDs |
| Review | Accept, correct or dismiss the brief | App/database usage; no automatic regeneration | Review decision and reason |
| Reopen | Read the stored brief | App/database usage | Cache/storage read; no new paid provider operation |
| Refresh | Check only the approved scope again | New collection; analysis only where needed | New captures, comparison and partial states |
| Reconcile | Compare usage records with provider reporting | Administrative work; avoid unnecessary polling | Matched, adjusted or unresolved billing records |

A suggested preflight message:

> Research Cedar Example once: up to one search and four approved pages. Two model calls share a 12,000-input-token and 2,000-output-token ceiling. Estimated research usage: USD 0.09; reserve up to USD 0.12 for this run using the configured price assumptions. No automatic retries or schedule. Hosting/database/job costs are outside this research cap. Remaining pilot allowance before this reservation: USD 10.00.

The USD 0.12 maximum must be calculated from enforceable operation bounds and valid rates in a real implementation, not chosen merely because it exceeds the estimate. Unknown or unbounded charges mean the operation cannot start under this policy.

### Building the app versus running it

**Build costs** can include coding-assistant usage, development sandboxes, CI test minutes, builds and preview deployments. **Run costs** include research APIs, models, hosted functions, background steps, storage and monitoring. Both belong in the overall project budget; only the specified research meters belong in the example research ceiling.

Do not assume a chat or coding subscription pays for model API usage inside your app. Identify the billing arrangement for the exact product and connection. A connector may use a linked provider account, included product allowance or another arrangement; verify it rather than inferring from the provider logo.

### Who pays?

For each connection, privately record: product → integration method → credential owner → billing account/project → plan/allowance → environment → operator who can pause it. Never publish the actual key or billing account ID.

Before estimating, ask whether a search already includes usable page content. Fetching the same content through another service can add cost without useful new evidence. Freshness or source-quality needs may still justify that second fetch.

For shared hosting, choose and document an allocation method: measured usage when available, otherwise a clearly labeled allocation assumption. Do not pretend a rough equal split is measured usage, and do not charge the full shared bill to every project.

## 16. Sample usage ledger and reconciliation exercise

A ledger is a record of operations and their financial state. It is not necessarily a list of new cash charges. This simplified example uses fictional providers and the rates in section 9. Rows are separate attempts; reservations are maximums, not extra expenses.

| Operation | Work observed | Reserved maximum | App-accounted usage | Provider-confirmed usage value | Final state |
| --- | --- | --- | --- | --- | --- |
| search-01 | One search | USD 0.020 | USD 0.010 | USD 0.010 | Reconciled |
| pages-01 | Four basic pages | USD 0.030 | USD 0.020 | USD 0.020 | Reconciled |
| ai-01 | 12,000 input and 2,000 output tokens across the bounded analysis | USD 0.070 | USD 0.060 | USD 0.060 | Reconciled |
| search-02 | Refresh attempt timed out after dispatch | USD 0.020 | Unknown | USD 0.010 | Reconciled after provider confirmation |
| reopen-01 | Open saved brief | USD 0.000 research | USD 0.000 research | USD 0.000 research | No research call; infrastructure excluded |

The table shows states **after reconciliation**, not five simultaneous outstanding holds. The first three rows started with a combined USD 0.12 reservation and settled at USD 0.09. The refresh held USD 0.02 while uncertain, then settled at USD 0.01.

Before refresh confirmation: USD 0.09 accounted + USD 0.02 unresolved reservation = **USD 0.11 committed allowance**.
After confirmation: **USD 0.10 usage value**, no outstanding reservation. Of the cumulative USD 0.14 reserved across these attempts, USD 0.04 was released. Do not add reservations to settled usage as a second cost.

In this exercise, the fictional search provider applies USD 0.02 of an existing prepaid balance to the two searches. The other fictional providers invoice USD 0.02 for pages and USD 0.06 for AI. New variable invoice charges are **USD 0.08**, while research consumption is **USD 0.10**. The earlier credit purchase belongs to its own cash-payment period. Fixed fees, infrastructure and taxes remain excluded.

### Your assignment

1. Your app shows USD 0.09, but provider usage totals USD 0.10. Find the missing operation.
2. Explain why zero returned results from search-02 does not mean zero charge.
3. Calculate the five-account pilot's remaining USD 10 research allowance after all rows reconcile.
4. State the additional cash charge and explain why it differs from usage consumption.
5. List the identifiers you would use to match records without exposing private data.
6. If the provider cannot confirm search-02 yet, decide whether to release its reservation.

**Answer key:**
1. The timed-out refresh search was billed at USD 0.01. It was absent from the app's settled total.
2. A provider may complete billable work before the app receives a response.
3. USD 9.90, assuming no other pilot activity and that the policy counts all consumption including prepaid units.
4. USD 0.08 in the simplified example; USD 0.02 came from existing prepaid credit.
5. Internally use provider/request/attempt/job/project IDs, native units, endpoint/model and timestamps with the provider's billing timezone. Public examples use fictional IDs only.
6. Keep the USD 0.02 exposure unresolved; do not automatically refund or blindly retry.

### When records disagree

Match the same billing window and timezone. Check reporting delay, aggregated or rounded line items, duplicates, billable retries, endpoint options, model/cache categories, credits, tax and use by another project. Preserve corrections as an audit trail. If the provider reports more than the reserved maximum, record the overage truthfully and pause new discretionary dispatch while investigating; never truncate the bill to fit the cap.

Some providers expose only aggregate usage. Reconcile at the narrowest supported level and label per-account amounts as allocated or estimated when exact matching is impossible.

## 17. Controls that sound similar but solve different problems

| Concept | What it controls | What it does not guarantee |
| --- | --- | --- |
| Rate limit | How many operations happen within a time window | A monthly spending ceiling |
| Concurrency limit | How many operations run at once | Fewer total operations |
| Token/page limit | Size of one operation or run | The number of repeated runs |
| Budget reservation | Allowance held before dispatch | An invoice cap for unguarded or unbounded services |
| Alert | Notification of a threshold | Prevention of further work |
| Pause | Stops specified future work | Cancellation of accepted jobs, subscriptions or retained storage |
| Retention rule | How long stored evidence/logs remain | Removal of every backup or termination of the service plan |

Choose freshness by information type. A stable company description might tolerate less frequent checking than an active announcement feed; select the intervals based on the decision they support. These are design choices, not universal schedules.

Estimate expected usage and an enforceable maximum separately. Optimize for accurate, useful reviewed results and review time, rather than the lowest price per call. A cheap brief that requires extensive correction may not be good value.


## Additional primary references

Pricing structures checked on 2026-10-12. Recheck rates and your own account terms before forecasting; the worked example deliberately uses fictional rates.

1. [Exa endpoint pricing](https://exa.ai/pricing)
2. [Firecrawl billing and credit options](https://docs.firecrawl.dev/billing)
3. [Claude API pricing and token/cache categories](https://platform.claude.com/docs/en/about-claude/pricing)
4. [Inngest execution pricing](https://www.inngest.com/pricing)
5. [Vercel pricing and billable resources](https://vercel.com/docs/pricing)
6. [Neon official billing explanation](https://neon.com/blog/new-usage-based-pricing) — historical explanation of units, not a current rate card.
