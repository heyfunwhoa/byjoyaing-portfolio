"use client";

import { useId, useState } from "react";

/**
 * Synthetic, read-only Design Lab specimen.
 * No real account records, enrichment, navigation, persistence or external actions.
 */
type Evidence = {
  id: string;
  title: string;
  source: string;
  observed: string;
  assessment: "Verified" | "Inference" | "Unknown" | "Stale";
  detail: string;
};
type Relationship = {
  id: string;
  from: string;
  to: string;
  description: string;
  evidenceIds: string[];
};
const evidence: Evidence[] = [
  { id: "e1", title: "Managed detection service", source: "Fictional public service page", observed: "2026-10-28", assessment: "Verified", detail: "A fictional listing describes a managed detection offering. This verifies the listing only, not its technical maturity." },
  { id: "e2", title: "Cloud security integration", source: "Fictional product announcement", observed: "2026-09-10", assessment: "Stale", detail: "The announcement is older than the fictional review policy. Current integration status needs rechecking." },
  { id: "e3", title: "Likely platform ownership", source: "Inference from fictional job description", observed: "2026-11-02", assessment: "Inference", detail: "A job listing suggests a platform team, but does not establish budget, authority, or active project ownership." },
  { id: "e4", title: "Procurement sponsor", source: "No confirming source available", observed: "Not observed", assessment: "Unknown", detail: "No evidence establishes an economic buyer. The relationship must not be presented as verified." },
];
const relationships: Relationship[] = [
  { id: "r1", from: "Northstar MDR", to: "Managed detection", description: "Company offers a managed service", evidenceIds: ["e1"] },
  { id: "r2", from: "Northstar MDR", to: "Cloud integration", description: "Product capability mentioned in prior announcement", evidenceIds: ["e2"] },
  { id: "r3", from: "Northstar MDR", to: "Platform team", description: "Team involvement is hypothesized", evidenceIds: ["e3"] },
  { id: "r4", from: "Northstar MDR", to: "Economic buyer", description: "Possible sponsorship has not been established", evidenceIds: ["e4"] },
];

export function RelationshipEvidenceExplorer() {
  const [selectedId, setSelectedId] = useState("r1");
  const [filter, setFilter] = useState("All");
  const [showTrace, setShowTrace] = useState(true);
  const detailId = useId();
  const selected = relationships.find((item) => item.id === selectedId) ?? relationships[0];
  const selectedEvidence = evidence.filter((item) => selected.evidenceIds.includes(item.id));
  const filtered = relationships.filter((item) =>
    filter === "All" || item.evidenceIds.some((id) => evidence.find((e) => e.id === id)?.assessment === filter)
  );

  return (
    <section aria-label="Relationship and evidence explorer" className="space-y-4 rounded-xl border border-border bg-card p-4 text-foreground">
      <div className="space-y-1">
        <p className="font-mono text-xs uppercase tracking-wide text-muted-foreground">Design Lab · synthetic specimen</p>
        <h2 className="text-xl font-semibold">What connects this account to a capability?</h2>
        <p className="text-sm text-muted-foreground">
          Explore a fictional relationship and inspect why we believe it exists. No CRM access, enrichment or external actions occur.
        </p>
      </div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter relationships by evidence assessment">
        {(["All", "Verified", "Inference", "Unknown", "Stale"] as const).map((value) => (
          <button key={value} type="button" aria-pressed={filter === value} onClick={() => {
            setFilter(value);
            const next = relationships.find((item) => value === "All" || item.evidenceIds.some((id) => evidence.find((e) => e.id === id)?.assessment === value));
            if (next) setSelectedId(next.id);
          }} className={`min-h-11 rounded-lg border px-3 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 ${filter === value ? "border-foreground bg-foreground text-background" : "border-border bg-background"}`}>
            {value}
          </button>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="space-y-2">
          <h3 className="text-sm font-semibold">Relationships ({filtered.length})</h3>
          {filtered.length === 0 ? <p className="text-sm">No relationships match. Choose All to reset.</p> : null}
          <ul className="space-y-2">
            {filtered.map((item) => {
              const source = evidence.find((e) => e.id === item.evidenceIds[0]);
              return (
                <li key={item.id}>
                  <button type="button" aria-current={selected.id === item.id ? "true" : undefined}
                    aria-controls={detailId} onClick={() => setSelectedId(item.id)}
                    className={`min-h-11 w-full rounded-lg border p-3 text-left focus-visible:outline-2 focus-visible:outline-offset-2 ${selected.id === item.id ? "border-foreground bg-muted" : "border-border bg-background"}`}>
                    <span className="block text-sm font-semibold">{item.from} → {item.to}</span>
                    <span className="block text-xs text-muted-foreground">{source?.assessment ?? "Unassessed"} · {item.description}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
        <div id={detailId} aria-label="Selected relationship evidence" className="space-y-3 rounded-lg border border-border bg-background p-4">
          <h3 className="text-base font-semibold">{selected.to}</h3>
          <p className="text-sm">{selected.description}</p>
          <button type="button" aria-expanded={showTrace} aria-controls={`${detailId}-trace`}
            onClick={() => setShowTrace(!showTrace)} className="min-h-11 rounded-lg border border-border px-3 text-sm underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2">
            {showTrace ? "Hide" : "Show"} supporting evidence
          </button>
          {showTrace ? (
            <div id={`${detailId}-trace`} className="space-y-3">
              {selectedEvidence.map((item) => (
                <article key={item.id} className="space-y-2 border-t border-border pt-3">
                  <p className="text-sm font-semibold">{item.title}</p>
                  <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-xs">
                    <dt className="text-muted-foreground">Assessment</dt><dd>{item.assessment}</dd>
                    <dt className="text-muted-foreground">Source</dt><dd>{item.source}</dd>
                    <dt className="text-muted-foreground">Observed</dt><dd>{item.observed}</dd>
                  </dl>
                  <p className="text-sm">{item.detail}</p>
                </article>
              ))}
            </div>
          ) : null}
        </div>
      </div>
      <p className="text-xs text-muted-foreground">Design rule: an inference is not a confirmed relationship. Staleness does not imply falsehood, and missing evidence does not imply absence.</p>
    </section>
  );
}
