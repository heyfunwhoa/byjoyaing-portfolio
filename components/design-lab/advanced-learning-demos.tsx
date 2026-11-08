"use client";

import { useState } from "react";

/** Synthetic, in-memory specimens; no CRM records, tools, or background jobs. */
const sampleAccounts = [
  { id: "northstar", name: "Northstar", signals: 3, status: "Review", owner: "Alex" },
  { id: "horizon", name: "Horizon", signals: 1, status: "Ready", owner: "Morgan" },
  { id: "lumen", name: "Lumen", signals: 0, status: "Review", owner: "Alex" },
  { id: "atlas", name: "Atlas", signals: 2, status: "Ready", owner: "Sam" },
];

export function AdvancedGridDemo() {
  const [sortDescending, setSortDescending] = useState(false);
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<string[]>([]);
  const [view, setView] = useState<"table" | "cards">("table");
  const visible = sampleAccounts
    .filter((account) => filter === "All" || account.status === filter)
    .sort((a, b) => sortDescending ? b.signals - a.signals : a.signals - b.signals);
  return (
    <div className="grid gap-3 text-sm">
      <p className="text-xs text-muted">Fictional accounts. Selection and filters stay on this page.</p>
      <div className="flex flex-wrap gap-2">
        <label className="grid gap-1">Status
          <select className="min-h-11 rounded-lg border border-border bg-card px-2" value={filter} onChange={event => setFilter(event.target.value)}>
            <option>All</option><option>Ready</option><option>Review</option>
          </select>
        </label>
        <button type="button" aria-pressed={sortDescending} className="min-h-11 rounded-lg border border-border px-3" onClick={() => setSortDescending(value => !value)}>
          Signals: {sortDescending ? "high first" : "low first"}
        </button>
        <button type="button" aria-pressed={view === "cards"} className="min-h-11 rounded-lg border border-border px-3" onClick={() => setView(value => value === "cards" ? "table" : "cards")}>
          {view === "cards" ? "Table view" : "Card view"}
        </button>
      </div>
      {visible.length === 0 ? <p role="status">No accounts match this view.</p> : view === "cards" ? (
        <ul className="grid gap-2">
          {visible.map(account => <li key={account.id} className="rounded-lg border border-border p-3">
            <label className="flex items-center gap-2"><input aria-label={`Select ${account.name}`} type="checkbox" checked={selected.includes(account.id)} onChange={event => setSelected(current => event.target.checked ? [...current, account.id] : current.filter(id => id !== account.id))}/><strong>{account.name}</strong></label>
            <p>{account.signals} signals · {account.status} · {account.owner}</p>
          </li>)}
        </ul>
      ) : (
        <div role="region" tabIndex={0} aria-label="Advanced account grid scroll area" className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full min-w-[26rem] text-left">
            <caption className="p-2 text-left text-xs text-muted">Account review table with sortable signals</caption>
            <thead><tr><th scope="col" className="p-2">Select</th><th scope="col" className="p-2">Account</th><th scope="col" className="p-2">Signals</th><th scope="col" className="p-2">Status</th><th scope="col" className="p-2">Owner</th></tr></thead>
            <tbody>{visible.map(account => <tr key={account.id} className="border-t border-border">
              <td className="p-2"><input aria-label={`Select ${account.name}`} type="checkbox" checked={selected.includes(account.id)} onChange={event => setSelected(current => event.target.checked ? [...current, account.id] : current.filter(id => id !== account.id))}/></td>
              <th scope="row" className="p-2">{account.name}</th><td className="p-2">{account.signals}</td><td className="p-2">{account.status}</td><td className="p-2">{account.owner}</td>
            </tr>)}</tbody>
          </table>
        </div>
      )}
      <p role="status" className="text-xs text-muted">{visible.length} visible · {selected.length} selected. No bulk action or export is connected.</p>
    </div>
  );
}

const steps = ["Import accounts", "Normalize records", "Check CRM", "Prepare review"];
export function WorkflowBuilderDemo() {
  const [enabled, setEnabled] = useState([true, true, true, true]);
  const [active, setActive] = useState(0);
  const [executed, setExecuted] = useState(false);
  const [mode, setMode] = useState<"sequence" | "outline">("sequence");
  return (
    <div className="grid gap-3 text-sm">
      <p className="text-xs text-muted">A local sequence builder. This does not run a workflow or contact any service.</p>
      <div className="flex flex-wrap gap-2">
        <button type="button" className="min-h-11 rounded-lg border border-border px-3" aria-pressed={mode === "sequence"} onClick={() => setMode("sequence")}>Step path</button>
        <button type="button" className="min-h-11 rounded-lg border border-border px-3" aria-pressed={mode === "outline"} onClick={() => setMode("outline")}>Accessible outline</button>
      </div>
      <ol aria-label="Workflow stages" className={mode === "sequence" ? "flex flex-wrap items-center gap-2" : "grid gap-2"}>
        {steps.map((step, index) => <li key={step} className="flex items-center gap-2">
          {index > 0 && mode === "sequence" ? <span aria-hidden="true">→</span> : null}
          <button type="button" aria-pressed={active === index} className={"min-h-11 rounded-lg border px-3 py-2 text-left " + (active === index ? "border-foreground" : "border-border")} onClick={() => setActive(index)}>
            {index + 1}. {step} {!enabled[index] ? "(skipped)" : ""}
          </button>
        </li>)}
      </ol>
      <fieldset className="rounded-lg border border-border p-3">
        <legend className="px-1 font-medium">Configure: {steps[active]}</legend>
        <label className="flex items-center gap-2"><input type="checkbox" checked={enabled[active]} onChange={event => { setEnabled(current => current.map((value, index) => index === active ? event.target.checked : value)); setExecuted(false); }}/>Include this stage in the example</label>
        <p className="mt-2 text-xs text-muted">A real builder also needs node validation, error paths, permissions, and execution persistence.</p>
      </fieldset>
      <button type="button" className="min-h-11 rounded-lg border border-border px-3" onClick={() => setExecuted(true)}>Simulate run</button>
      <p role="status">{executed ? `Simulation finished: ${enabled.filter(Boolean).length} of 4 stages included; no external actions.` : "Not run. Configure stages or simulate a run."}</p>
    </div>
  );
}

const trace = [
  { label: "Read request", detail: "Determine which fictional accounts need a review." },
  { label: "Prepare lookup", detail: "Propose a CRM lookup; no lookup has actually occurred." },
  { label: "Request approval", detail: "Ask a human before a simulated outreach action." },
  { label: "Summarize", detail: "Explain which steps were proposed and approved." },
];
export function AgentActivityDemo() {
  const [stage, setStage] = useState(0);
  const [decision, setDecision] = useState<"pending" | "approved" | "rejected">("pending");
  return (
    <div className="grid gap-3 text-sm">
      <p className="text-xs text-muted">Fictional agent trace. Nothing is sent to a model, CRM, or outreach tool.</p>
      <ol className="grid gap-2" aria-label="Agent activity">
        {trace.map((item, index) => <li key={item.label} className="rounded-lg border border-border p-3">
          <button type="button" aria-expanded={stage === index} className="flex min-h-11 w-full items-center justify-between gap-3 text-left font-medium" onClick={() => setStage(index)}>
            <span>{index + 1}. {item.label}</span>
            <span aria-hidden="true">{stage === index ? "−" : "+"}</span>
          </button>
          {stage === index ? <p className="mt-1 text-muted">{item.detail}</p> : null}
        </li>)}
      </ol>
      <fieldset className="rounded-lg border border-border p-3">
        <legend className="px-1 font-medium">Human approval gate</legend>
        <p>Approve a fictional outreach proposal?</p>
        <div className="mt-2 flex flex-wrap gap-2">
          <button type="button" className="min-h-11 rounded-lg border border-border px-3" onClick={() => setDecision("approved")}>Approve example</button>
          <button type="button" className="min-h-11 rounded-lg border border-border px-3" onClick={() => setDecision("rejected")}>Reject example</button>
          <button type="button" className="min-h-11 rounded-lg border border-border px-3" onClick={() => setDecision("pending")}>Reset</button>
        </div>
      </fieldset>
      <p role="status">Approval: {decision}. {decision === "approved" ? "No action was actually executed." : "No action executed."}</p>
    </div>
  );
}

type Rule = { field: "status" | "signals"; operator: "equals" | "at-least"; value: string };
export function RuleBuilderDemo() {
  const [rules, setRules] = useState<Rule[]>([{ field: "status", operator: "equals", value: "Ready" }]);
  const [join, setJoin] = useState<"AND" | "OR">("AND");
  const matches = sampleAccounts.filter(account => {
    const results = rules.map(rule => rule.field === "status" ? account.status === rule.value : account.signals >= Number(rule.value));
    return join === "AND" ? results.every(Boolean) : results.some(Boolean);
  });
  const edit = (index: number, next: Rule) => setRules(current => current.map((rule, i) => i === index ? next : rule));
  return (
    <div className="grid gap-3 text-sm">
      <p className="text-xs text-muted">Local rules over four fictional accounts; no saved segment or CRM query.</p>
      <fieldset className="grid gap-2">
        <legend className="font-medium">Match rules</legend>
        <label className="flex items-center gap-2">Combine with
          <select value={join} onChange={event => setJoin(event.target.value as "AND" | "OR")} className="min-h-11 rounded-lg border border-border bg-card px-2"><option>AND</option><option>OR</option></select>
        </label>
        {rules.map((rule, index) => <div key={index} className="flex flex-wrap items-end gap-2 rounded-lg border border-border p-2">
          <label className="grid gap-1">Rule {index + 1} field
            <select value={rule.field} className="min-h-11 rounded-lg border border-border bg-card px-2" onChange={event => edit(index, event.target.value === "signals" ? { field: "signals", operator: "at-least", value: "1" } : { field: "status", operator: "equals", value: "Ready" })}>
              <option value="status">Status</option><option value="signals">Signal count</option>
            </select>
          </label>
          <span className="pb-3 text-xs">{rule.operator === "equals" ? "is" : "at least"}</span>
          <label className="grid gap-1">Rule {index + 1} value
            {rule.field === "status" ? <select className="min-h-11 rounded-lg border border-border bg-card px-2" value={rule.value} onChange={event => edit(index, { ...rule, value: event.target.value })}><option>Ready</option><option>Review</option></select>
              : <input type="number" min={0} max={20} className="min-h-11 w-20 rounded-lg border border-border bg-card px-2" value={rule.value} onChange={event => edit(index, { ...rule, value: event.target.value })}/>}
          </label>
          <button type="button" disabled={rules.length === 1} className="min-h-11 rounded-lg border border-border px-3 disabled:opacity-50" onClick={() => setRules(current => current.filter((_, i) => i !== index))}>Remove rule {index + 1}</button>
        </div>)}
      </fieldset>
      <button type="button" className="min-h-11 rounded-lg border border-border px-3" onClick={() => setRules(current => [...current, { field: "signals", operator: "at-least", value: "2" }])}>Add condition</button>
      <p role="status">{matches.length} matching {matches.length === 1 ? "account" : "accounts"}: {matches.map(account => account.name).join(", ") || "none"}.</p>
    </div>
  );
}

const tasks = [
  { question: "Which element runs an action?", choices: ["Button", "Link"], correct: "Button", detail: "Buttons trigger actions. Links navigate." },
  { question: "Which data view is easiest for comparing columns?", choices: ["Table", "Story card"], correct: "Table", detail: "A table exposes comparable values with headers." },
];
export function LearningPlaygroundDemo() {
  const [step, setStep] = useState(0);
  const [choice, setChoice] = useState("");
  const task = tasks[step];
  return (
    <div className="grid gap-3 text-sm">
      <p className="text-xs text-muted">Two in-memory practice questions. No grading, progress recording, or remote execution.</p>
      <p className="font-semibold">Exercise {step + 1} of {tasks.length}: {task.question}</p>
      <fieldset className="grid gap-2">
        <legend className="sr-only">Choose an answer</legend>
        {task.choices.map(option => <label key={option} className="flex min-h-11 items-center gap-2 rounded-lg border border-border p-2">
          <input type="radio" name="learning-choice" checked={choice === option} onChange={() => setChoice(option)}/>{option}
        </label>)}
      </fieldset>
      {choice ? <p role="status">{choice === task.correct ? "Correct." : "Try again."} {task.detail}</p> : <p role="status">Choose an answer to see an explanation.</p>}
      <div className="flex flex-wrap gap-2">
        <button type="button" className="min-h-11 rounded-lg border border-border px-3" disabled={step === 0} onClick={() => { setStep(0); setChoice(""); }}>Previous</button>
        <button type="button" className="min-h-11 rounded-lg border border-border px-3" onClick={() => { setStep(current => (current + 1) % tasks.length); setChoice(""); }}>{step === tasks.length - 1 ? "Start again" : "Next exercise"}</button>
      </div>
    </div>
  );
}
