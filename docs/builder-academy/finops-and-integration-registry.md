# Builder Academy: Integration registries and FinOps guardrails

**Status:** source lesson; UI publication not yet verified  
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
