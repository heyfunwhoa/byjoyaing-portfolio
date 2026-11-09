"use client";

import { useId, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";

export const dataDisplayOptions = [
  {
    id: "cards",
    title: "Summary cards",
    best: "Read one account at a time, including its context and a clear next action.",
    tradeoff: "Easy to scan on narrow screens but inefficient for comparing precise values across many rows.",
    project: "Account Signal Engine account review",
  },
  {
    id: "table",
    title: "Comparison table",
    best: "Compare multiple accounts by common values, dates, and evidence status.",
    tradeoff: "Column alignment helps comparisons, but tables require readable headings and careful narrow-screen overflow.",
    project: "GTM Revenue OS pipeline or account prioritization",
  },
  {
    id: "metrics",
    title: "KPI summaries",
    best: "Explain a small number of aggregate totals at a glance.",
    tradeoff: "Aggregate numbers hide individual records. Keep drill-down and the source records available.",
    project: "GTM Revenue OS campaign health overview",
  },
] as const;

type Display = (typeof dataDisplayOptions)[number]["id"];
type Status = "Needs review" | "Reviewed";
type SortKey = "name" | "signals" | "reviewed";
type SortDirection = "asc" | "desc";
type Account = { id: string; name: string; signals: number; reviewed: string; reviewedAt: string; status: Status };
const accounts: Account[] = [
  { id: "northstar", name: "Northstar Security", signals: 3, reviewed: "Nov 4", reviewedAt: "2026-11-04", status: "Needs review" },
  { id: "horizon", name: "Horizon Networks", signals: 1, reviewed: "Nov 6", reviewedAt: "2026-11-06", status: "Reviewed" },
  { id: "lumen", name: "Lumen Data", signals: 0, reviewed: "Nov 5", reviewedAt: "2026-11-05", status: "Needs review" },
  { id: "summit", name: "Summit Systems", signals: 2, reviewed: "Nov 7", reviewedAt: "2026-11-07", status: "Reviewed" },
];

export function DataDisplayComparison() {
  const headingId = useId();
  const searchId = useId();
  const [display, setDisplay] = useState<Display>("cards");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"All" | Status>("All");
  const [selected, setSelected] = useState<string | null>(null);
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [density, setDensity] = useState<"comfortable" | "compact">("comfortable");
  const cellPadding = density === "compact" ? "p-2" : "p-3";
  function chooseSort(next: SortKey) {
    if (next === sortKey) setSortDirection((current) => current === "asc" ? "desc" : "asc");
    else { setSortKey(next); setSortDirection("asc"); }
  }
  function reset() { setQuery(""); setStatus("All"); setSelected(null); setSortKey("name"); setSortDirection("asc"); }
  const filtered = useMemo(
    () => accounts.filter((account) =>
      account.name.toLowerCase().includes(query.trim().toLowerCase()) &&
      (status === "All" || account.status === status)),
    [query, status],
  );
  const sorted = useMemo(() => [...filtered].sort((a, b) => {
    const comparison = sortKey === "signals" ? a.signals - b.signals
      : sortKey === "reviewed" ? a.reviewedAt.localeCompare(b.reviewedAt)
      : a.name.localeCompare(b.name);
    return sortDirection === "asc" ? comparison : -comparison;
  }), [filtered, sortKey, sortDirection]);
  const totalSignals = filtered.reduce((total, account) => total + account.signals, 0);
  const requiresReview = filtered.filter((account) => account.status === "Needs review").length;
  const active = filtered.find((account) => account.id === selected);
  const current = dataDisplayOptions.find((option) => option.id === display)!;

  return (
    <section aria-labelledby={headingId} className="space-y-5">
      <div>
        <p className="editorial-eyebrow text-accent">Compare design alternatives · data</p>
        <h2 id={headingId} className="mt-2 font-display text-2xl">
          Cards, tables, or KPI summaries?
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
          Compare the same four fictional account records in three presentation styles.
          Search, filter, and sort them, then watch which questions each presentation makes easier to answer.
          No live data, backend queries, or saved changes.
        </p>
      </div>
      <div role="group" aria-label="Data display patterns" className="flex flex-wrap gap-2">
        {dataDisplayOptions.map((option) => (
          <Button
            key={option.id}
            type="button"
            aria-pressed={display === option.id}
            variant={display === option.id ? "default" : "outline"}
            onClick={() => setDisplay(option.id)}
          >
            {option.title}
          </Button>
        ))}
      </div>
      <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,12rem)]">
        <label className="grid gap-2 text-sm font-medium" htmlFor={searchId}>
          Search fictional accounts
          <input
            id={searchId}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Try Northstar"
            className="min-h-11 w-full rounded-lg border border-border bg-card px-3"
          />
        </label>
        <label className="grid gap-2 text-sm font-medium">
          Review status
          <select value={status}
            onChange={(event) => setStatus(event.target.value as "All" | Status)}
            className="min-h-11 w-full rounded-lg border border-border bg-card px-3">
            <option>All</option>
            <option>Needs review</option>
            <option>Reviewed</option>
          </select>
        </label>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p role="status" aria-live="polite" className="text-xs text-muted">{filtered.length} of {accounts.length} fictional accounts shown. Sorted by {sortKey}, {sortDirection === "asc" ? "ascending" : "descending"}.</p>
        <Button type="button" variant="outline" onClick={reset} disabled={!query && status === "All" && sortKey === "name" && sortDirection === "asc"}>Clear search and filters</Button>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <label className="flex items-center gap-2 text-sm">Sort by
          <select aria-label="Sort accounts by" value={sortKey} onChange={(event) => { setSortKey(event.target.value as SortKey); setSortDirection("asc"); }} className="min-h-11 rounded-lg border border-border bg-card px-3">
            <option value="name">Account name</option><option value="signals">Signal count</option><option value="reviewed">Last reviewed</option>
          </select>
        </label>
        <Button type="button" variant="outline" onClick={() => setSortDirection((value) => value === "asc" ? "desc" : "asc")}>Direction: {sortDirection === "asc" ? "Ascending" : "Descending"}</Button>
        {display === "table" && <label className="flex items-center gap-2 text-sm">Table spacing
          <select aria-label="Table spacing" value={density} onChange={(event) => setDensity(event.target.value as typeof density)} className="min-h-11 rounded-lg border border-border bg-card px-3">
            <option value="comfortable">Comfortable</option><option value="compact">Compact</option>
          </select>
        </label>}
      </div>
      {filtered.length ? (
        <div className="rounded-xl border border-border bg-card p-4">
          {display === "cards" ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {sorted.map((account) => (
                <article key={account.id} className="rounded-lg border border-border bg-background p-4">
                  <h3 className="font-semibold">{account.name}</h3>
                  <p className="mt-2 text-sm">{account.signals} signals · {account.status}</p>
                  <p className="mt-1 text-xs text-muted">Last reviewed: {account.reviewed}</p>
                  <Button type="button" className="mt-3" variant="outline" aria-pressed={selected === account.id}
                    onClick={() => setSelected(account.id)}>
                    {selected === account.id ? "Selected" : "Inspect"}
                  </Button>
                </article>
              ))}
            </div>
          ) : display === "table" ? (
            <div role="region" aria-label="Comparison table, scroll horizontally when needed" tabIndex={0}
              className="max-w-full overflow-x-auto rounded-lg border border-border focus-visible:outline-2 focus-visible:outline-offset-2">
              <table className="w-full min-w-[34rem] border-collapse text-left text-sm">
                <caption className="p-3 text-left text-xs text-muted">
                  Fictional account comparison. Exact counts, status, and last-reviewed dates. Activate a column heading to sort.
                </caption>
                <thead className="bg-surface-sage">
                  <tr>
                    <th scope="col" aria-sort={sortKey === "name" ? (sortDirection === "asc" ? "ascending" : "descending") : "none"} className={cellPadding}><button type="button" className="min-h-11 text-left underline" onClick={() => chooseSort("name")}>Account {sortKey === "name" ? (sortDirection === "asc" ? "↑" : "↓") : ""}</button></th>
                    <th scope="col" aria-sort={sortKey === "signals" ? (sortDirection === "asc" ? "ascending" : "descending") : "none"} className={cellPadding}><button type="button" className="min-h-11 underline" onClick={() => chooseSort("signals")}>Signals {sortKey === "signals" ? (sortDirection === "asc" ? "↑" : "↓") : ""}</button></th>
                    <th scope="col" className={cellPadding}>Status</th>
                    <th scope="col" aria-sort={sortKey === "reviewed" ? (sortDirection === "asc" ? "ascending" : "descending") : "none"} className={cellPadding}><button type="button" className="min-h-11 underline" onClick={() => chooseSort("reviewed")}>Reviewed {sortKey === "reviewed" ? (sortDirection === "asc" ? "↑" : "↓") : ""}</button></th>
                    <th scope="col" className={cellPadding}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {sorted.map((account) => (
                    <tr key={account.id} className="border-t border-border">
                      <th scope="row" className={`${cellPadding} font-medium`}>{account.name}</th>
                      <td className={`${cellPadding} tabular-nums`}>{account.signals}</td>
                      <td className={cellPadding}>{account.status}</td>
                      <td className={cellPadding}>{account.reviewed}</td>
                      <td className={cellPadding}><Button type="button" variant="outline"
                        aria-pressed={selected === account.id}
                        onClick={() => setSelected(account.id)}>Inspect</Button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div>
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  { label: "Accounts shown", value: filtered.length },
                  { label: "Total signals", value: totalSignals },
                  { label: "Needs review", value: requiresReview },
                ].map((item) => (
                  <div key={item.label} className="rounded-lg border border-border bg-background p-4">
                    <p className="text-sm text-muted">{item.label}</p>
                    <p className="mt-2 font-display text-3xl tabular-nums">{item.value}</p>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-sm text-muted">
                These are totals for the filtered fictional accounts, not real business KPIs.
                The comparison table preserves the individual records and their dates.
              </p>
            </div>
          )}
          {active && display !== "metrics" && (
            <p role="status" className="mt-3 rounded-lg border border-border p-3 text-sm">
              Inspecting {active.name}: {active.signals} fictional signals; {active.status.toLowerCase()}.
            </p>
          )}
        </div>
      ) : (
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="font-semibold">No matching accounts</h3>
          <p className="mt-2 text-sm text-muted">Try a broader search or reset the status filter.</p>
          <Button className="mt-3" variant="outline" onClick={reset}>
            Reset filters
          </Button>
        </div>
      )}
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-border p-4">
          <h3 className="font-semibold">Best use</h3>
          <p className="mt-2 text-sm leading-6">{current.best}</p>
          <p className="mt-3 text-xs text-muted">Project fit: {current.project}</p>
        </div>
        <div className="rounded-xl border border-border p-4">
          <h3 className="font-semibold">Tradeoff</h3>
          <p className="mt-2 text-sm leading-6">{current.tradeoff}</p>
        </div>
      </div>
      <p className="text-xs leading-5 text-muted">
        Learning question: Which view best answers “What should I inspect next?”
        Which best answers “Which account has more signals?”
        Which best answers “How much work is pending overall?”
        This demo is not a CRM, data pipeline, or evidence verifier.
      </p>
    </section>
  );
}
