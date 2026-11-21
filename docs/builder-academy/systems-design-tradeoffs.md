# Systems design: choose the simplest architecture that meets the need

**Builder Academy companion · Beginner → intermediate · Suggested 25–35 minutes**  
**Status:** Proposed **written/synthetic** decision lab in a draft PR. No infrastructure, database, real user data or service is created. This is not a standalone Academy lesson ID or an automatically assessed simulation.

**Start with:** [From idea to verified release](idea-to-verified-release.md), [Frontend building blocks](frontend-building-blocks.md), [MCP versus REST APIs](mcp-vs-rest-api.md), and optionally [Source to running software](source-to-running-software.md).

## What systems design answers

Product design asks **why** a feature matters. UX/UI design asks **how a user experiences it**. Software architecture asks **how independently owned parts will cooperate within explicit constraints**.

Revisit the fictional discovery-note workflow. A seller wants to save a meeting note and retrieve it next time. Do not start with microservices or Kubernetes. Start with a **user problem**, one safe behavior, quality attributes, and a rough drawing.

| Requirement category | Fictional example | Open design question |
| --- | --- | --- |
| Functional | Authorized seller saves and retrieves one note | Which API and data model are needed? |
| Security | Seller A cannot read Seller B's notes | Where is object-level authorization enforced? |
| Usability | Form recovers from an error without losing entered text | Which state belongs to the browser? |
| Reliability | A failed save cannot appear successful | What is the acknowledgement and retry strategy? |
| Performance | User sees a useful response promptly | Which latency is actually user-visible? |
| Data lifecycle | Notes have retention and verified backups if required | Who sets retention, restores, migrates and deletes data? |
| Operations | Operator can determine the deployed revision and failure cause | What logs, metrics, rollback and handoff are required? |
| Economics | The first pilot is small | Does a managed platform meet needs with less operating burden? |

These are **hypothetical constraints**, not reported production data, promises or untested benchmark values.

## Draw a minimal context and component boundary

~~~text
User / browser
      |
      v
Accessible note form (frontend)
      |
      | HTTPS request: POST /api/notes
      v
Server API (authentication, object authorization,
            validation, persistence decision)
      |
      v
Relational note storage
      |
      +---- optional backup/restore process
~~~

**Trust boundary:** Browser fields, account IDs and website content are untrusted inputs. The server verifies the authenticated subject and the requested note's ownership independently of which records the UI happened to show. A **401** can mean authentication is required; a **403** can indicate a known caller lacks permission. An unauthorized write should produce no side effect.

A context diagram shows a user and high-level systems. A container/component diagram decomposes boundaries and responsibilities. The word **container** in the C4 architecture model means a separately executable/deployable application or data store, not necessarily a Docker container.

## Make three architecture decisions

### Decision A: modular monolith, microservices or just managed services?

- **Option 1: small full-stack application.** A Next.js frontend and server-side route backed by managed PostgreSQL. One repository and bounded modules for notes, access, and data. A managed hosting service handles much operational plumbing.
- **Option 2: separate notes microservice from day one.** Independent service, network contract, deployment, logs and operational ownership even though there is only one small workflow.
- **Option 3: static site with notes entirely in the browser.** Very small runtime but cannot satisfy durable, server-authorized notes access and storage requirements as stated.

**Choose and defend one:** consider the actual security boundary, number of teams, failure independence, scaling profile, portability and team skills. Complexity is a cost, not a proxy for architectural maturity.

### Decision B: synchronous or queued write?

A normal small save can often be synchronous: validate access, persist one record transactionally, return success/failure. A queue may be justified for a slow secondary job such as generating a report or integrating an approved external service. Introducing a queue adds attempts, duplicate delivery, idempotency, monitoring and failed-job recovery. **Do not insert a queue merely because it sounds enterprise-ready.**

The [background-job recovery guide](background-job-recovery.md), registered on `main` through merged [PR #238](https://github.com/heyfunwhoa/byjoyaing-portfolio/pull/238), teaches what can happen when a write succeeds but the acknowledgement fails. If the side effect must happen exactly once from the business perspective, choose and verify a durable idempotency/reconciliation strategy; a queue alone is insufficient.

### Decision C: database, object storage or cache?

- A **relational database** stores structured notes and account ownership/constraints.
- **Object storage** is suitable for approved export files and documents, with explicit data permissions/retention.
- A **cache** may reduce repeated read work, but is not automatically a source of truth. Access control, freshness, invalidation and data residency remain concerns.

Do not put personal/customer data in logs, test fixtures, local publicly committed sample files or unsanctioned model prompts.

## Turn the design into an ADR

**Title:** ADR-001, Storage and architecture for fictional discovery notes  
**Status:** Proposed, not an implemented repository decision

- **Context:** A small authenticated sales-notes flow must save and retrieve notes without cross-account access.
- **Chosen direction:** Start with one full-stack app, one server-authorized note API, managed relational storage and a single deployable unit if it meets current constraints.
- **Alternatives:** Separate microservice plus custom container deployment; browser-only storage; adopting an existing CRM feature rather than building.
- **Rationale:** Bound ownership and permission checks before adding independent services; compare build-versus-buy first.
- **Consequences:** Application and database still need migrations, backups, release testing, observability, secrets and retention policies. Managed hosting is not zero operations.
- **Triggers to revisit:** A validated requirement for independent deployment, materially different scaling, tenancy/isolation, team ownership or runtime portability.

A good ADR records an **explicit trade-off**, evidence, constraints and a revisit trigger. It is not a vendor marketing comparison.

## Practice: a design has a hidden failure

**New fictional evidence packet:** The UI properly hides customer B's notes from seller A, but `GET /api/notes?id=customer-b-note` still returns that note to a signed-in seller A. A teammate suggests moving to microservices to fix security.

Before the answer key, write:
1. Which boundary failed? Which component must enforce the rule?
2. Does switching to microservices fix the problem by itself?
3. What negative test would show the fix works without leaking data?
4. What must be verified after deployment?

<details>
<summary>Answer key: reveal after your own attempt</summary>

1. The API's **object-level authorization** failed; server-side code/data access must deny a caller who lacks ownership/scope. UI filtering is not an authorization control.
2. **No.** A microservice can have the same broken rule, plus additional networking and permission boundaries. First repair and verify the access control.
3. With synthetic users/notes, request a note belonging to another user. Expect denial and **no data read/write side effect**; test permitted access separately.
4. Verify the reviewed/merged revision is actually deployed, the intended environment/data access applies, and both authorized and forbidden journeys behave correctly; monitor for subsequent failures.

</details>

### Apply the same thinking to another system

Sketch a fictional research ingestion pipeline: input → validator → provider → normalized record → reviewer. Decide where synchronous HTTP makes sense, where queued work is justified, and where source verification differs from a raw provider result. Use a *new* context to demonstrate transfer; do not treat the drawing as evidence the Account Signal Engine repository implements it.

## When is systems design "good enough"?

A learner can explain **the user need, responsibilities of each component, a trust boundary, source of truth, primary failure route, alternatives, and how to verify a production change**. Do not require cloud credentials, a microservices topology or a polished diagram before demonstrating a small system.

**Next:** [Infrastructure as Code plan review](infrastructure-as-code-plan-review.md) if custom resources are necessary; [Kubernetes/platform engineering](kubernetes-platform-engineering.md) only for workloads that justify orchestration; [reliability and incidents](observability-reliability-incidents.md) for the post-release responsibility.

**Public references (reviewed November 6, 2026):**
- [C4 model: software architecture diagrams](https://c4model.com/)
- [OWASP: Authorization Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html)
- [Martin Fowler: Monolith First](https://martinfowler.com/bliki/MonolithFirst.html)

This is a teaching scenario, not a signed ADR, live architecture assessment, or production security approval.
