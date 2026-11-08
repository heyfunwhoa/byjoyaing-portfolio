"use client";

import { useId, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  accountWorkbenchFixture,
  visibleWorkbenchAccounts,
  workbenchExportPreview,
  type WorkbenchAccount,
} from "@/lib/design-lab-account-workflow";

type Stage = "discover" | "inspect" | "shortlist" | "export";
const stages: { id: Stage; name: string; question: string }[] = [
  { id: "discover", name: "Discover", question: "How do I find relevant accounts?" },
  { id: "inspect", name: "Inspect", question: "What do we actually know?" },
  { id: "shortlist", name: "Prioritize", question: "Which records deserve follow-up?" },
  { id: "export", name: "Review output", question: "What should another person receive?" },
];

function EvidenceDetail({ account }: { account: WorkbenchAccount }) {
  return (
    <div className="space-y-2 rounded-lg border border-border bg-background p-4 text-sm leading-6">
      <h4 className="font-semibold">{account.name} · evidence detail</h4>
      <p><strong>Observation:</strong> {account.evidence}</p>
      <p><strong>Evidence state:</strong> {account.status}</p>
      <p><strong>Observed:</strong> {account.observedOn}</p>
      <p><strong>Limit:</strong> This fictional signal does not establish budget, buying intent, or a verified source.</p>
    </div>
  );
}

export function AccountWorkflowWorkbench() {
  const heading = useId();
  const searchId = useId();
  const [stage, setStage] = useState<Stage>("discover");
  const [query, setQuery] = useState("");
  const [segment, setSegment] = useState<"All" | WorkbenchAccount["segment"]>("All");
  const [layout, setLayout] = useState<"cards" | "table">("cards");
  const [inspectedId, setInspectedId] = useState<string | null>(null);
  const [shortlist, setShortlist] = useState<string[]>([]);
  const [showRationale, setShowRationale] = useState(true);

  const visible = useMemo(() => visibleWorkbenchAccounts(query, segment), [query, segment]);
  const inspected = accountWorkbenchFixture.find((item) => item.id === inspectedId);
  const exportRows = useMemo(() => workbenchExportPreview(shortlist), [shortlist]);
  const currentIndex = stages.findIndex((item) => item.id === stage);

  function toggleShortlist(id: string) {
    setShortlist((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }
  function reset() {
    setStage("discover"); setQuery(""); setSegment("All"); setLayout("cards");
    setInspectedId(null); setShortlist([]); setShowRationale(true);
  }
  return (
    <section id="application-workbench" aria-labelledby={heading} className="space-y-5">
      <div>
        <p className="editorial-eyebrow text-accent">Application Workbench · guided practice</p>
        <h2 id={heading} className="mt-2 font-display text-2xl">From account research to handoff</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
          Practice one realistic task using search, cards, tables, evidence detail, selection,
          and an export preview. Every account is fictional. Nothing is connected to Salesforce,
          sent to a rep, downloaded, or stored.
        </p>
      </div>
      <nav aria-label="Example account workflow stages" className="flex flex-wrap gap-2">
        {stages.map((item, index) => (
          <Button key={item.id} type="button" variant={stage === item.id ? "default" : "outline"}
            aria-current={stage === item.id ? "step" : undefined}
            onClick={() => setStage(item.id)}>
            {index + 1}. {item.name}
          </Button>
        ))}
      </nav>
      <div className="rounded-xl border border-border bg-card p-4 sm:p-5">
        <h3 className="font-display text-xl">{stages[currentIndex].question}</h3>
        <p className="mt-1 text-xs text-muted">Stage {currentIndex + 1} of {stages.length} · {shortlist.length} accounts shortlisted</p>

        {stage === "discover" && (
          <div className="mt-4 space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <label htmlFor={searchId + "-query"} className="grid gap-2 text-sm font-medium">
                Search account or evidence text
                <input id={searchId + "-query"} type="search" value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Try Northstar or hiring"
                  className="min-h-11 w-full rounded-lg border border-border bg-background px-3" />
              </label>
              <label htmlFor={searchId + "-segment"} className="grid gap-2 text-sm font-medium">
                Segment
                <select id={searchId + "-segment"} value={segment}
                  onChange={(event) => setSegment(event.target.value as typeof segment)}
                  className="min-h-11 rounded-lg border border-border bg-background px-3">
                  <option>All</option><option>Enterprise</option><option>Mid-market</option>
                </select>
              </label>
            </div>
            <div role="group" aria-label="Account display style" className="flex gap-2">
              <Button type="button" aria-pressed={layout === "cards"} variant={layout === "cards" ? "default" : "outline"}
                onClick={() => setLayout("cards")}>Cards</Button>
              <Button type="button" aria-pressed={layout === "table"} variant={layout === "table" ? "default" : "outline"}
                onClick={() => setLayout("table")}>Table</Button>
            </div>
            <p role="status" className="text-xs text-muted">{visible.length} of {accountWorkbenchFixture.length} fictional accounts match</p>
            {!visible.length ? (
              <div className="rounded-lg border border-border p-4">
                <p className="font-semibold">No matching accounts</p>
                <p className="mt-2 text-sm">Broaden your search or clear the filters.</p>
                <Button type="button" className="mt-3" variant="outline" onClick={() => { setQuery(""); setSegment("All"); }}>Reset filters</Button>
              </div>
            ) : layout === "cards" ? (
              <div className="grid gap-3 sm:grid-cols-2">
                {visible.map((account) => (
                  <article key={account.id} className="rounded-lg border border-border p-4">
                    <h4 className="font-semibold">{account.name}</h4>
                    <p className="mt-1 text-sm">{account.segment} · {account.signals} example signals</p>
                    <p className="mt-2 text-xs text-muted">{account.status} · {account.observedOn}</p>
                    <Button type="button" className="mt-3" variant="outline" onClick={() => {
                      setInspectedId(account.id); setStage("inspect");
                    }}>Inspect evidence</Button>
                  </article>
                ))}
              </div>
            ) : (
              <div role="region" tabIndex={0} aria-label="Account comparison table" className="overflow-x-auto rounded-lg border border-border">
                <table className="w-full min-w-[34rem] text-left text-sm">
                  <caption className="p-3 text-left text-xs text-muted">Fictional account records and evidence states</caption>
                  <thead className="bg-surface-sage"><tr><th scope="col" className="p-3">Account</th><th scope="col" className="p-3">Segment</th><th scope="col" className="p-3">Signals</th><th scope="col" className="p-3">Status</th><th scope="col" className="p-3">Inspect</th></tr></thead>
                  <tbody>{visible.map((account) => (
                    <tr key={account.id} className="border-t border-border">
                      <th scope="row" className="p-3">{account.name}</th>
                      <td className="p-3">{account.segment}</td><td className="p-3 tabular-nums">{account.signals}</td>
                      <td className="p-3">{account.status}</td>
                      <td className="p-3"><Button type="button" variant="outline" onClick={() => {
                        setInspectedId(account.id); setStage("inspect");
                      }}>Inspect</Button></td>
                    </tr>
                  ))}</tbody>
                </table>
              </div>
            )}
          </div>
        )}
        {stage === "inspect" && (
          <div className="mt-4 space-y-4">
            <label htmlFor={searchId + "-inspect"} className="grid max-w-sm gap-2 text-sm font-medium">
              Choose a fictional account
              <select id={searchId + "-inspect"} value={inspectedId ?? ""} onChange={(event) => setInspectedId(event.target.value)}
                className="min-h-11 rounded-lg border border-border bg-background px-3">
                <option value="" disabled>Select an account</option>
                {accountWorkbenchFixture.map((account) => <option key={account.id} value={account.id}>{account.name}</option>)}
              </select>
            </label>
            {inspected ? <EvidenceDetail account={inspected} /> :
              <p role="status" className="rounded-lg border border-border p-4 text-sm">Choose an account to inspect its evidence.</p>}
            {inspected && (
              <Button type="button" onClick={() => toggleShortlist(inspected.id)} aria-pressed={shortlist.includes(inspected.id)}>
                {shortlist.includes(inspected.id) ? "Remove from shortlist" : "Add to shortlist"}
              </Button>
            )}
            <p className="text-xs text-muted">Ask: is this an observed signal, an inference, or still unknown?</p>
          </div>
        )}
        {stage === "shortlist" && (
          <div className="mt-4 space-y-3">
            <p className="text-sm text-muted">Select accounts worth further research. This is not an automated priority score.</p>
            {accountWorkbenchFixture.map((account) => (
              <label key={account.id} className="flex min-h-11 items-center gap-3 rounded-lg border border-border p-3 text-sm">
                <input type="checkbox" checked={shortlist.includes(account.id)}
                  onChange={() => toggleShortlist(account.id)} className="size-4 accent-current" />
                <span className="flex-1"><strong>{account.name}</strong> · {account.status} · {account.signals} example signals</span>
              </label>
            ))}
            <p role="status" className="text-sm">{shortlist.length} accounts selected for a fictional handoff.</p>
          </div>
        )}
        {stage === "export" && (
          <div className="mt-4 space-y-4">
            <p className="text-sm text-muted">Preview the fields you would share with a rep. No Excel file is generated and no data leaves this page.</p>
            {!exportRows.length ? (
              <p role="status" className="rounded-lg border border-border p-4 text-sm">No accounts selected. Go to Prioritize and select one or more records.</p>
            ) : (
              <div role="region" tabIndex={0} aria-label="Fictional export preview" className="overflow-x-auto rounded-lg border border-border">
                <table className="w-full min-w-[40rem] text-left text-sm">
                  <caption className="p-3 text-left text-xs text-muted">Export preview · selected accounts only</caption>
                  <thead className="bg-surface-sage"><tr>
                    <th scope="col" className="p-3">Account</th><th scope="col" className="p-3">Segment</th>
                    <th scope="col" className="p-3">Signals</th><th scope="col" className="p-3">Evidence state</th><th scope="col" className="p-3">Date</th>
                  </tr></thead>
                  <tbody>{exportRows.map((row) => <tr key={row.id} className="border-t border-border">
                    <th scope="row" className="p-3">{row.name}</th><td className="p-3">{row.segment}</td>
                    <td className="p-3 tabular-nums">{row.signals}</td><td className="p-3">{row.status}</td><td className="p-3">{row.observedOn}</td>
                  </tr>)}</tbody>
                </table>
              </div>
            )}
            <p className="text-xs text-muted">A real handoff would also need CRM matching, source URLs, permissions, ownership and verification.</p>
          </div>
        )}
        <div className="mt-5 flex flex-wrap justify-between gap-2 border-t border-border pt-4">
          <Button type="button" variant="outline" onClick={reset}>Reset example</Button>
          <div className="flex gap-2">
            <Button type="button" variant="outline" disabled={currentIndex === 0} onClick={() => setStage(stages[currentIndex - 1].id)}>Back</Button>
            <Button type="button" disabled={currentIndex === stages.length - 1} onClick={() => setStage(stages[currentIndex + 1].id)}>Next step</Button>
          </div>
        </div>
      </div>
      <div className="rounded-xl border border-border p-4">
        <Button type="button" variant="outline" aria-expanded={showRationale} onClick={() => setShowRationale((value) => !value)}>
          {showRationale ? "Hide" : "Explain"} the design choices
        </Button>
        {showRationale && <div className="mt-3 space-y-2 text-sm leading-6">
          <p><strong>Search + filters:</strong> find records by task and segment, not by manually scanning everything.</p>
          <p><strong>Cards vs table:</strong> cards explain one account; a table compares exact fields.</p>
          <p><strong>Evidence detail:</strong> distinguish a dated observation from unknown buying intent.</p>
          <p><strong>Checkbox shortlist:</strong> support multiple independent selections, without silently ranking accounts.</p>
          <p><strong>Export preview:</strong> verify what would be shared before a real system creates a file.</p>
          <p><strong>Project fit:</strong> adapt for Channel Territory Mapping and GTM Revenue OS, but keep CRM access and enrichment in their owning apps.</p>
        </div>}
      </div>
      <p className="text-xs text-muted">Exercise: explain why a sheet might replace the inline evidence detail, and why a real export requires source and authorization checks. No completion is recorded.</p>
    </section>
  );
}
