# Observability, reliability and incident response: after software goes live

**Builder Academy companion · Beginner → intermediate · 25–35-minute study budget**  
**Status:** Draft **synthetic, written** practice, not a connected observability dashboard, configured alert, uptime guarantee or live incident. No monitoring provider, log collection, production data or credentials are enabled.

**Start with:** [From idea to verified release](idea-to-verified-release.md), [Systems design and boundaries](systems-design-tradeoffs.md), and [Source to running software](source-to-running-software.md). [Background-job recovery](background-job-recovery.md) adds retry/duplicate decision practice.

## What changes when the app is released?

The product owner still cares whether users succeed. Engineering and operations need to understand whether the deployed service works, whether its dependencies are healthy, and whether a change should be stopped, repaired or rolled back.

Use the fictional sales discovery-note application: a seller opens a form, saves a note, and later reads it. Each step can fail even when CI succeeded. An end-to-end user flow is one type of evidence; monitoring provides continued signals after that test.

### Signals you should be able to distinguish

| Signal | Example from fictional app | Use and limits |
| --- | --- | --- |
| **Log** | Request denied, validation failed, database unavailable | Event-specific context; redact personal notes and credentials |
| **Metric** | Error rate, request latency, worker queue depth | Aggregated behavior; choose scope and denominators |
| **Trace** | Browser → API → database call timing with a request ID | Locates slow or failing components; may be sampled/incomplete |
| **Health/readiness** | API can accept requests | Useful for routing; not proof the entire user workflow succeeds |
| **Synthetic check** | Test save/retrieve with invented data | Exercises a chosen workflow; does not cover all users/situations |
| **Product outcome** | Sellers can actually retrieve notes for the next call | Business behavior, separate from server availability |
| **Incident record** | Timeline, impact, mitigation, follow-up owner | Documents what happened, not proof every fix is complete |

**Observability** means drawing useful conclusions about a system from its outputs. Collecting many logs without knowing the user-facing question does not guarantee observability. Instrumentation must respect access permissions, retention, data minimization and costs.

## SLIs, SLOs and error budgets

- An **SLI** is a measured indicator, such as the proportion of eligible note-save requests that returned correct successful responses.
- An **SLO** is an internal objective for that indicator over a defined window, for example, "at least 99.9% of valid authorized note saves succeed over four weeks." The target and window below are **hypothetical classroom choices**, not a published service guarantee.
- An **SLA** is a contractual commitment, often with defined consequences. It is not automatically created by choosing an SLO.
- An **error budget** expresses the tolerated misses relative to the chosen objective. For 100,000 eligible requests and a 99.9% success SLO, the illustrative budget is **100 failed requests** in that window. Carefully define what is eligible, what counts as a good event, and how missing data is handled.

Do not use a raw pageview count as a success-rate denominator, or infer customer value solely from service availability. A high success percentage can hide a failure concentrated in one important user segment.

### Practice choosing an indicator

A product manager proposes these two SLI definitions:

A. "Count how many commits engineers merged this month."  
B. "For eligible authorized note-save attempts, count the share that finishes with a correct persisted note and a successful response."

**Better service SLI: B**, provided the measurement is implementable and privacy safe. A is an activity measure, not the reliability of the user journey. B is harder to measure and needs a real implementation contract; a synthetically defined SLI does not mean monitoring is installed.

## Incident simulation: a release works, then users fail

**Fictional timeline:** At 09:00, a reviewed release for revision \`abc123\` was deployed. At 09:06, the API error rate increased and some authorized sellers received 500 responses. The frontend still loaded, readiness remained green, and the database connection pool was exhausted. A teammate proposes "just restart every container." A schema migration also ran during the release.

Write the next action for each stage:

| Stage | Questions a responsible operator asks |
| --- | --- |
| **Detect and assess** | What user flows are affected, how many, since when, and who owns the incident? |
| **Contain** | Can we pause rollout or unsafe retries? Are privileged access/data integrity at risk? |
| **Diagnose** | Which deployed revision, logs, error rates, traces, database health and recent changes correlate? |
| **Mitigate** | Is reverting app code safe, or did the migration change data/schema compatibility? |
| **Communicate** | Which internal stakeholders or affected users need a verified update? What is unknown? |
| **Recover and verify** | Which authorized/denied/synthetic user journeys work again? How long does healthy behavior persist? |
| **Learn** | What will prevent or shorten recurrence? What test, alert, limit, ownership or runbook changes? |

Do not blindly restart everything. It may hide evidence, amplify load, lose in-flight operations or obscure a schema/data problem. A code rollback does not automatically restore a changed database.

<details>
<summary>Reasoned response after your attempt</summary>

1. Establish a clear incident owner and user impact from metrics and sampled reports. Do not say "all customers" without evidence.
2. Check exact deployment identity \`abc123\`, request traces, database pool health, time of migration, retry pressure and whether unrelated dependencies also changed.
3. Contain harmful retry amplification and consider a safe traffic/routing/rollout mitigation. Review whether the old application version can work with the new schema before proposing rollback.
4. Coordinate with the data owner on actual migration state and an approved recovery path. Restoring a backup can lose newer writes; it is not a one-click substitute for review.
5. Verify both the affected save flow and a forbidden cross-account request with fictional identities; observe recovery signals and log only minimal permitted evidence.
6. Record a factual timeline, unresolved causes, contributing factors and follow-up actions with owners. A post-incident report is not an excuse to declare a permanent fix without independent testing.

</details>

## How reliability changes development decisions

A team can use service objectives and observed impact to balance new features against reliability investment. Google's SRE error-budget example describes a policy that can pause nonessential feature changes after the budget is exceeded; it is **an example of a chosen organization policy**, not a universal rule every team must copy.

An operations workflow should include:
- **Service ownership:** who gets alerted and can stop or roll back a release;
- **Runbooks:** first checks, escalation, customer communication and safety boundaries;
- **Change tracing:** commit, build artifact, deploy environment, migration and feature flag state;
- **Recovery tests:** backups, restores, safe retries, idempotency and rollback compatibility;
- **Cost and retention:** monitoring charges, alert noise, redaction and log retention;
- **Product feedback:** user confusion or lost notes can be serious even if infrastructure metrics look healthy.

A good incident exercise tests **both the technical response and the human handoff**.

## Independent transfer: a different kind of service

A fictional report-generation worker retries after a timeout, and the same report is emailed twice. No web request reports 500 errors. Describe:
1. Which business-level indicator should signal the problem?
2. Which logs, trace/request identifiers, queue attempt records and idempotency keys would help distinguish "retry" from "duplicate side effect"?
3. What must happen before replaying any more work?
4. What user/business outcome would establish the fix beyond "the queue is empty"?

**Rubric:** A learner can select an SLI, connect logs/metrics/traces to a real failure, identify a safe containment decision, avoid assuming rollback reverses data, name an incident owner and define evidence of recovery. The exercise is not a demonstration that a deployed system is reliable.

**Next:** Return to [Systems design](systems-design-tradeoffs.md) and [IaC change review](infrastructure-as-code-plan-review.md) to improve failure boundaries and resource change safety; inspect the [Kubernetes/platform companion](kubernetes-platform-engineering.md) only if the application needs orchestration.

**Primary references (reviewed November 6, 2026):**
- [Google SRE: Service level objectives](https://sre.google/sre-book/service-level-objectives/)
- [Google SRE Workbook: Error budget policy](https://sre.google/workbook/error-budget-policy/)
- [OpenTelemetry: Observability primer](https://opentelemetry.io/docs/concepts/observability-primer/)

This guide's synthetic requests, service objective, alerts and incident timeline are original teaching fixtures. Do not represent them as live telemetry, customer incidents or achieved uptime.
