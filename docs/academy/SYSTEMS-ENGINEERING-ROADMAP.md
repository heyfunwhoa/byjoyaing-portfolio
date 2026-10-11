# Systems Engineering learning roadmap
Status: curriculum and lab specifications; only the overview page is implemented in this PR.
Route: /ai-academy/systems
Reviewed: 2026-10-10

## Learning modules
1. Web research infrastructure: HTTP and DNS, indexing, crawlers, extraction, APIs, RAG, citations and provider selection.
2. Systems architecture: architecture diagrams, modular monoliths, services, coupling, integration boundaries and scalability.
3. Data engineering: ETL/ELT, schemas, migrations, contracts, provenance, quality and retention.
4. API engineering: REST, GraphQL, HTTP errors, authn/authz, webhook verification, versioning and pagination.
5. Distributed systems: parallelism/concurrency, job orchestration, eventual consistency, race conditions, retries and idempotency.
6. Software security: OWASP, NIST SSDF, SSRF, prompt injection, secrets, supply chain and threat modeling.
7. Knowledge engineering: taxonomies, ontologies, canonical entities, relationships and temporal data.
8. Reliability: logs, metrics, traces, SLOs, incident management, alerts, runbooks and recovery.
9. AI engineering: grounded generation, semantic search, embeddings, reranking, tool calling, MCP and evaluation.
10. Infrastructure/DevOps: containers, environments, IaC, CI/CD, deployments and rollback.
11. Engineering economics: API quotas, token fees, provider budgets, caching, operational cost and build/buy decisions.
12. Governance: ADRs, ownership, source/version review, deprecation and quality gates.
13. Product engineering: discovery, PRDs, UX, accessibility, acceptance criteria, experiments and feature flags.

## Labs (future builds, public/synthetic fixtures first)
- Architecture Explorer: render a configurable dependency graph and inspect failure modes.
- Data Pipeline Simulator: show each transformation, duplicate detection and lineage.
- Distributed Systems Playground: visualize queued/parallel execution, rate limits and idempotent retries.
- Security Threat Modeling Lab: highlight threat actors, trust boundaries and mitigations.
- Incident Response Simulator: read synthetic logs, identify root cause, choose remediation.
- Research Provider Playground: compare fixture outputs of Exa, Firecrawl and Parallel with provenance, simulated latency/cost, and explicit demo labels.
- Evidence Explorer: show source versions, claim confidence, conflicts, resolution and reviewer actions.

## Implementation sequencing and acceptance
P0 (UI exists): overview page + curriculum; no runtime provider calls.
P0 next: add one interactive deterministic lab with unit tests, 375/768/1280px checks, keyboard support and reduced motion.
P1: typed fixture-based provider benchmark; evidence provenance contract; permission checks.
P1: entity resolution, knowledge relationships and documented authenticated read-only APIs.
P2: live providers only after cost/security review, secrets management, quotas and evaluation.
P2: change impact analysis, reliability dashboards, alerts and policy review.

Reference: byjoyaing-portfolio/docs/academy/WEB-RESEARCH-INFRASTRUCTURE.md (in PR #35, not assumed merged).
Canonical engineering standards: heyfunwhoa/technical-docs-platform.
Do not mirror private source data or publish unreviewed model-generated claims.
