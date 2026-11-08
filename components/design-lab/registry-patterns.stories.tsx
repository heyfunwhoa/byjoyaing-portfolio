"use client";

import { useId, useRef, useState, useEffect } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

/** Fictional data only. Documents registry.explorer.v1 / detail.v1 / compare.v1. */
const tools = [
  { id: "atlas-table", name: "Atlas Table Demo", category: "Data", status: "Candidate", license: "Unverified", details: "Sorting and evidence review", source: "No verified source in fixture" },
  { id: "birch-flow", name: "Birch Flow Demo", category: "Diagram", status: "Manifest only", license: "Unknown", details: "Relationship and architecture diagrams", source: "Synthetic manifest observation, not runtime use" },
  { id: "cedar-docs", name: "Cedar Docs Demo", category: "Content", status: "Candidate", license: "Not assessed", details: "Documentation authoring and review", source: "No verified source in fixture" },
  { id: "delta-ui", name: "Delta UI Demo", category: "Data", status: "Candidate", license: "Not applicable", details: "Local native UI baseline", source: "Synthetic in-app reference" },
] as const;

type Tool = (typeof tools)[number];

function RegistryDemo() {
  const uid = useId();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selection, setSelection] = useState<string[]>([]);
  const [detail, setDetail] = useState<Tool | null>(null);
  const [comparing, setComparing] = useState(false);
  const detailClose = useRef<HTMLButtonElement>(null);
  const compareClose = useRef<HTMLButtonElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const overlayOpen = detail !== null || comparing;
  const filtered = tools.filter(t => (category === "All" || t.category === category) && (t.name + " " + t.details).toLowerCase().includes(search.toLowerCase()));
  const picked = tools.filter(t => selection.includes(t.id));

  useEffect(() => {
    if (!overlayOpen) return;
    const dialog = document.getElementById(uid + "-dialog");
    const focusables = () => [...(dialog?.querySelectorAll<HTMLElement>("button:not([disabled]),a[href],input:not([disabled])") ?? [])];
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setDetail(null);
        setComparing(false);
      }
      if (event.key === "Tab") {
        const nodes = focusables();
        if (!nodes.length) return;
        if (event.shiftKey && document.activeElement === nodes[0]) { event.preventDefault(); nodes[nodes.length - 1].focus(); }
        if (!event.shiftKey && document.activeElement === nodes[nodes.length - 1]) { event.preventDefault(); nodes[0].focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    (detail ? detailClose : compareClose).current?.focus();
    return () => { document.removeEventListener("keydown", onKey); previousFocus.current?.focus(); };
  }, [detail, comparing, overlayOpen, uid]);

  const openDetail = (tool: Tool) => { previousFocus.current = document.activeElement as HTMLElement; setDetail(tool); };
  const openCompare = () => { previousFocus.current = document.activeElement as HTMLElement; setComparing(true); };
  const toggle = (id: string) => setSelection(current => current.includes(id) ? current.filter(x => x !== id) : current.length < 4 ? [...current, id] : current);

  return (
    <section className="mx-auto w-full max-w-5xl rounded-xl border border-border bg-card p-4 sm:p-6">
      <p className="editorial-eyebrow text-accent">Design Lab · Synthetic registry patterns</p>
      <h2 className="mt-1 text-xl font-semibold">Explore and compare technology options</h2>
      <p className="mt-2 text-sm text-muted">Four fictional records illustrate interaction contracts. No decision, license or runtime adoption is verified or saved.</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <label className="grid gap-1 text-sm font-medium">Search technologies
          <input type="search" value={search} onChange={e => setSearch(e.target.value)} className="min-h-11 rounded-lg border border-border bg-card px-3" />
        </label>
        <label className="grid gap-1 text-sm font-medium">Category
          <select value={category} onChange={e => setCategory(e.target.value)} className="min-h-11 rounded-lg border border-border bg-card px-3">
            <option>All</option><option>Data</option><option>Diagram</option><option>Content</option>
          </select>
        </label>
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <p role="status" className="text-sm text-muted">{filtered.length} matching fictional records · {selection.length} selected</p>
        <div className="flex gap-2">
          <button type="button" onClick={() => { setSearch(""); setCategory("All"); }} className="min-h-11 rounded-lg border border-border px-3 text-sm">Clear filters</button>
          <button type="button" disabled={selection.length < 2} onClick={openCompare} className="min-h-11 rounded-lg bg-foreground px-3 text-sm text-background disabled:opacity-50">Compare selected</button>
        </div>
      </div>
      {filtered.length ? <div role="region" aria-label="Technology registry table" tabIndex={0} className="mt-3 overflow-x-auto rounded-xl border border-border">
        <table className="w-full min-w-[38rem] border-collapse text-left text-sm">
          <caption className="p-3 text-left text-xs text-muted">Fictional tools. Observed in manifest does not imply runtime adoption.</caption>
          <thead className="bg-surface-sage"><tr><th scope="col" className="p-3">Compare</th><th scope="col" className="p-3">Technology</th><th scope="col" className="p-3">Category</th><th scope="col" className="p-3">Observation</th><th scope="col" className="p-3">Details</th></tr></thead>
          <tbody>{filtered.map(t => <tr key={t.id} className="border-t border-border">
            <td className="p-3"><input aria-label={"Compare " + t.name} type="checkbox" checked={selection.includes(t.id)} disabled={selection.length >= 4 && !selection.includes(t.id)} onChange={() => toggle(t.id)} /></td>
            <th scope="row" className="p-3">{t.name}</th><td className="p-3">{t.category}</td><td className="p-3">{t.status}</td>
            <td className="p-3"><button type="button" className="min-h-11 underline" onClick={() => openDetail(t)}>Inspect {t.name}</button></td>
          </tr>)}</tbody>
        </table>
      </div> : <p className="mt-3 rounded-lg border border-border p-4" role="status">No matches. Clear filters to restore the synthetic records.</p>}
      {overlayOpen ? <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-3" onMouseDown={e => { if (e.currentTarget === e.target) { setDetail(null); setComparing(false); } }}>
        <section id={uid + "-dialog"} role="dialog" aria-modal="true" aria-label={detail ? "Technology details" : "Compare technologies"} className="max-h-[90vh] w-full max-w-3xl overflow-auto rounded-xl bg-card p-5 text-foreground">
          <div className="flex items-start justify-between gap-3"><h3 className="text-lg font-semibold">{detail ? detail.name : "Side-by-side comparison"}</h3>
            <button ref={detail ? detailClose : compareClose} className="min-h-11 rounded border border-border px-3" type="button" onClick={() => {setDetail(null);setComparing(false);}}>Close</button></div>
          {detail ? <dl className="mt-4 grid gap-3 text-sm">
            <div><dt className="font-semibold">Use case</dt><dd>{detail.details}</dd></div>
            <div><dt className="font-semibold">Catalog observation</dt><dd>{detail.status} (not evidence of installed or operating use)</dd></div>
            <div><dt className="font-semibold">License</dt><dd>{detail.license}</dd></div>
            <div><dt className="font-semibold">Evidence</dt><dd>{detail.source}</dd></div>
          </dl> : <div className="mt-4 overflow-x-auto" role="region" aria-label="Technology comparison" tabIndex={0}>
            <table className="w-full min-w-[35rem] border-collapse text-left text-sm">
              <caption className="text-left text-xs text-muted">Synthetic values; unknown and not applicable are distinct.</caption>
              <thead><tr><th scope="col" className="border-b border-border p-2">Criterion</th>{picked.map(t => <th scope="col" className="border-b border-border p-2" key={t.id}>{t.name}</th>)}</tr></thead>
              <tbody>{([["Category", (t:Tool) => t.category],["Use case",(t:Tool)=>t.details],["Observation",(t:Tool)=>t.status],["License",(t:Tool)=>t.license],["Evidence",(t:Tool)=>t.source]] as const).map(([label,get]) => <tr key={label}><th scope="row" className="border-b border-border p-2">{label}</th>{picked.map(t => <td key={t.id} className="border-b border-border p-2">{get(t)}</td>)}</tr>)}</tbody>
            </table>
          </div>}
        </section>
      </div> : null}
    </section>
  );
}

const meta = {title:"Design Lab/Registry Patterns",component:RegistryDemo,parameters:{layout:"padded"}} satisfies Meta<typeof RegistryDemo>;
export default meta;
type Story = StoryObj<typeof meta>;
export const ExplorerDetailAndCompare: Story = {};
