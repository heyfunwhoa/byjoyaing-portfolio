import { AcademyBreadcrumb } from "@/components/academy-breadcrumb";
import { completePageMetadata } from "@/lib/page-metadata";
import type { Metadata } from "next";

export const metadata: Metadata = completePageMetadata(
  {
    title: "Systems Engineering",
    description:
      "Learn systems architecture, research pipelines, evidence and operations through applied exercises.",
  },
  "/ai-academy/systems",
);

const modules = [
  [
    "Web research infrastructure",
    "Search indexes, crawling, extraction, RAG, provider selection and citations.",
    "Draw a research request from browser to verified evidence.",
  ],
  [
    "Systems architecture",
    "Modular monoliths, service boundaries, coupling and scaling.",
    "Choose a boundary for a new research consumer.",
  ],
  [
    "Data engineering",
    "Sources, ETL/ELT, transformations, contracts, versioning and quality.",
    "Trace one RSS item through a pipeline.",
  ],
  [
    "API engineering",
    "HTTP, REST, GraphQL, webhooks, authorization, pagination and versioning.",
    "Design an authenticated research API contract.",
  ],
  [
    "Distributed systems",
    "Parallelism, asynchronous jobs, queues, retries, consistency and idempotency.",
    "Find duplicate work in a retried job.",
  ],
  [
    "Software security",
    "Threat modeling, least privilege, SSRF, injection, secrets and supply-chain safety.",
    "Identify two unsafe trust boundaries.",
  ],
  [
    "Knowledge engineering",
    "Taxonomies, ontologies, entity resolution, relationships and temporal history.",
    "Resolve two names to one vendor entity.",
  ],
  [
    "Reliability engineering",
    "Structured logs, metrics, traces, SLOs, alerts and incident response.",
    "Diagnose a failed extraction task.",
  ],
  [
    "AI engineering",
    "RAG, embeddings, reranking, tool calls, MCP and evaluation.",
    "Verify a machine-generated claim.",
  ],
  [
    "Infrastructure and DevOps",
    "Environments, Docker, CI/CD, deployments and rollback.",
    "Plan a safe database migration.",
  ],
  [
    "Engineering economics",
    "Provider prices, latency, cache, usage budgets and build-versus-buy.",
    "Compare cost per verified finding.",
  ],
  [
    "Software governance",
    "ADRs, ownership, reviews, versioning and deprecation.",
    "Write an architecture decision record.",
  ],
  [
    "Product engineering",
    "Discovery, PRDs, roadmaps, UX, accessibility and feature flags.",
    "Define acceptance criteria for a lab.",
  ],
];
const labs = [
  [
    "Architecture Explorer",
    "Frontend → API → queue → provider → database; identify failure boundaries.",
  ],
  [
    "Data Pipeline Simulator",
    "Collect → validate → deduplicate → normalize → store → review.",
  ],
  [
    "Distributed Systems Playground",
    "Compare sequential work, concurrency, retries and idempotency.",
  ],
  [
    "Security Threat Modeling Lab",
    "Identify prompt injection, SSRF and access-control weaknesses using synthetic examples.",
  ],
  [
    "Incident Response Simulator",
    "Investigate a fictional provider outage, leaked token or deploy failure.",
  ],
  [
    "Research Provider Playground",
    "Compare mock Exa, Firecrawl and Parallel responses; never label fixtures as live measurements.",
  ],
  [
    "Evidence Explorer",
    "Inspect citations, source hashes, freshness, conflicts and review status.",
  ],
];

export default function SystemsPage() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="mx-auto max-w-6xl px-5 py-12 sm:px-8"
    >
      <AcademyBreadcrumb title="Systems Engineering" />

      <p className="mt-8 text-xs font-semibold tracking-widest text-muted uppercase">
        Builder Academy · Learning pathway
      </p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-foreground">
        Engineering connected systems
      </h1>
      <p className="mt-4 max-w-3xl text-muted">
        Explore how software, data, research, security and operations fit
        together. Start with the mental model, try a synthetic exercise, then
        apply it to a portfolio project.
      </p>
      <section className="mt-12" aria-labelledby="modules-heading">
        <h2 id="modules-heading" className="text-2xl font-semibold">
          Planned learning modules
        </h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {modules.map(([title, description, exercise], i) => (
            <article
              key={title}
              className="rounded-xl border border-border bg-card p-5"
            >
              <p className="text-xs text-muted">
                Planned outline · Module {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-muted">{description}</p>
              <p className="mt-3 text-sm">
                <strong>Practice:</strong> {exercise}
              </p>
            </article>
          ))}
        </div>
      </section>
      <section className="mt-12" aria-labelledby="labs-heading">
        <h2 id="labs-heading" className="text-2xl font-semibold">
          Planned interactive labs
        </h2>
        <p className="mt-2 text-sm text-muted">
          Specifications only: these labs are not yet interactive or connected
          to paid APIs.
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {labs.map(([title, description]) => (
            <article
              key={title}
              className="rounded-xl border border-border p-4"
            >
              <h3 className="font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-muted">{description}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="mt-12 rounded-xl border border-border bg-card p-6">
        <h2 className="text-xl font-semibold">
          Capstone: research you can trust
        </h2>
        <p className="mt-3 text-sm text-muted">
          Use public or synthetic cybersecurity sources to map source → capture
          → hash → entity → claim → review → downstream product. Never confuse a
          provider result with independently verified evidence.
        </p>
        <p className="mt-3 text-sm">
          Start with the Account Signal Engine Research Hub and its RSS /
          Firecrawl foundation; add paid providers only after security, cost and
          quality evaluation.
        </p>
      </section>
    </main>
  );
}
