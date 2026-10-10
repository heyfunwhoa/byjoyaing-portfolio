# Builder Academy — Web Research Infrastructure for AI Applications

**Status:** reference lesson and future interactive lab specification; not yet an implemented UI route.
**Reviewed:** 2026-10-10. Provider features and pricing must be rechecked against official docs before any integration.

## Learning goals
Explain the difference between discovery, crawling, extraction, retrieval, research, monitoring, and grounded generation. Diagram a request from a Next.js interface through a server API, job queue, provider, normalized source record, evidence store, and human-reviewed output. Design a vendor-neutral provider boundary with tests and controls.

## Beginner-first explanation
A search index is a library catalog (find possible sources). A crawler visits linked pages; an extractor reads a specific document and returns usable text; an LLM can summarize but is not itself a trustworthy primary source. Retrieval-augmented generation (RAG) provides retrieved context for an answer; provenance connects every claim back to its URL and captured version. Monitoring checks for changes over time. An orchestrator chooses which steps happen, with budgets and explicit permissions.

## Provider roles — illustrative, not feature parity assertions
- **Exa:** candidate discovery / semantic retrieval.
- **Firecrawl:** approved website/document extraction and crawling.
- **Parallel:** candidate web search, extraction, multi-step research, entity discovery, or monitoring; evaluate separate APIs and actual pricing, accuracy, and output contracts.
- **RSS/Atom/JSON Feed:** predictable first-party change signals; use before buying repeated searches.
- **Tavily or another search API:** optional search baseline.
Different products overlap: don't imply any one is a complete substitute for another.

## Worked example: a cybersecurity release announcement
1. RSS detects a new release post from an approved publisher.
2. Validate URL, domain, redirects, size, robots/terms and ingestion budget.
3. Fetch / extract safely, record canonical URL, publisher, published/retrieved times, content hash, and original source version.
4. Mark machine-generated classification as **hypothesis** until it is matched to passage-level evidence.
5. Normalize vendor, product, capability, and release date, then deduplicate across feeds and providers.
6. Have a reviewer approve claims before sending insights to Security Market Map, Account Signal Engine or Notion.
7. Surface citations and freshness notices; retain corrections and superseded claims.

## Architecture contract (pseudocode)
```ts
type ResearchRequest = {
  purpose: "discover" | "extract" | "research" | "monitor";
  query?: string;
  approvedUrls?: string[];
  maxResults: number;
  budgetUsd: number;
};
type ResearchResult = {
  sourceUrl: string;
  canonicalUrl: string;
  publisher?: string;
  publishedAt?: string;
  retrievedAt: string;
  provider: string;
  contentHash?: string;
  excerpt?: string;
  claimStatus: "unreviewed" | "supported" | "rejected";
};
interface ResearchProvider {
  name: string;
  supports(purpose: ResearchRequest["purpose"]): boolean;
  execute(request: ResearchRequest): Promise<ResearchResult[]>;
}
```
This interface is a teaching example, **not** a deployed shared library. Production contracts need typed errors, idempotency keys, pagination, authentication, abort/timeouts, provenance IDs and more rigorous budget tracking.

## Practical learning labs
1. **Identify the step:** sort search/index, crawl, extraction, RAG, monitoring and summarization examples.
2. **Trace the request:** place client, server-side API, Inngest job, external provider, Neon/Postgres and UI in order; explain where secrets live.
3. **Compare research:** 20 synthetic/public questions; score source relevance, citation support, factual accuracy, freshness, latency, cost, duplicates and coverage. Do not accept provider-generated citations without resolving them.
4. **Detect conflicting sources:** compare outdated documentation with a release note; record uncertainty and date.
5. **Adversarial source:** a webpage tells the AI to leak an API key; reject instructions from retrieved content and test SSRF/redirect safeguards.
6. **Monitoring tradeoffs:** prefer RSS for known sources; use search/monitor APIs for topics without feeds, subject to terms and cost.

## Required safeguards
Server-only scoped provider keys and no credential logging; allowlisted outbound URLs, DNS/IP and redirect protection against SSRF; robots/site terms and copyright/retention controls; request timeouts, retry/backoff and concurrency caps; rate limits, provider budgets and circuit breakers; deduplication and trace IDs; privacy minimization; prompt-injection isolation; schema validation; evidence-level citations and human approval before publishing externally.

## Cross-project connections
- **Account Signal Engine Research Hub:** source registry, RSS collection, Inngest and evidence workflow; start here with evaluation, not a second ingestion service.
- **Security Market Map:** read approved claims through a documented API later.
- **Detector Coverage Atlas:** provider documents are research signals; actual detector behavior needs reproducible tests, not marketing claims.
- **AI Foundations:** RAG, grounding, model/tool selection and evaluations.

## Suggested evaluation rubric
Score every scenario 0–3 on correct retrieval, provenance, factual support and freshness. Report missing citations and unsafe outputs separately as disqualifiers. Record $/successful supported claim, median and p95 latency, and failure rate. Compare the baseline RSS + Firecrawl pipeline with Exa and Parallel only after costs are bounded.

## Primary references (verify at implementation)
- https://docs.parallel.ai/
- https://docs.exa.ai/
- https://docs.firecrawl.dev/
- https://www.rfc-editor.org/rfc/rfc9110
- https://owasp.org/www-project-top-10-for-large-language-model-applications/
- https://owasp.org/www-community/attacks/Server_Side_Request_Forgery
