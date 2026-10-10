"use client";

import { useState } from "react";
import { demoStakeholders, type Stakeholder } from "@/lib/field-notes";

const states: Stakeholder["access"][] = ["unknown", "developing", "engaged"];
const labels = { unknown: "No validated access", developing: "Developing relationship", engaged: "Engaged" };

export function StakeholderPlayground() {
  const [people, setPeople] = useState<Stakeholder[]>(() => demoStakeholders.map((person) => ({ ...person })));
  const [perspective, setPerspective] = useState<"seller" | "leader">("seller");
  const [selectedRole, setSelectedRole] = useState(0);
  const engaged = people.filter((person) => person.access === "engaged").length;
  const unknown = people.filter((person) => person.access === "unknown").length;
  const economic = people.find((person) => person.role === "Economic buyer");
  const risks = [
    ...(economic?.access !== "engaged" ? ["Economic buyer is not yet engaged; avoid treating the champion as confirmed budget authority."] : []),
    ...(unknown ? [`${unknown} buying-group role${unknown === 1 ? "" : "s"} still lack validated access.`] : []),
    ...(people.every((person) => person.access !== "unknown") ? ["Coverage is mapped; validate influence and decision authority rather than counting contacts."] : []),
  ];
  return (
    <section className="rounded-2xl border border-border bg-card p-5 sm:p-7" aria-label="Illustrative stakeholder mapping exercise">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl">Buying-group coverage lab</h2>
          <p className="mt-1 text-sm text-muted">Synthetic scenario. Your changes stay in this browser session and are not saved.</p>
        </div>
        <button type="button" className="rounded-md border border-border px-3 py-2 text-sm hover:border-accent" onClick={() => setPeople(demoStakeholders.map((person) => ({ ...person }))}>Reset example</button>
      </div>
      <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label="Choose perspective">
        {(["seller", "leader"] as const).map((value) => (
          <button type="button" key={value} aria-pressed={perspective === value} onClick={() => setPerspective(value)}
            className={`rounded-full border px-4 py-2 text-sm font-medium ${perspective === value ? "border-accent bg-accent text-accent-foreground" : "border-border"}`}>
            {value === "seller" ? "Seller view" : "Sales leader view"}
          </button>
        ))}
      </div>
      <p className="mt-4 text-sm leading-6 text-muted">{perspective === "seller"
        ? "Update each role as you validate real access. Identify the next relationship to develop and the business reason for it."
        : "Coach for decision coverage and access to power. Ask what evidence supports each relationship status, who can sponsor a next meeting, and what could derail the close."}</p>
      <div className="mt-5 rounded-xl border border-border bg-background p-4 sm:p-6">
        <h3 className="font-semibold">Buying-group overview</h3>
        <p className="mt-1 text-xs text-muted">Choose a role to inspect its relationship status and next action. Diagram connections are illustrative, not verified reporting lines.</p>
        <div className="mt-4 overflow-x-auto">
          <svg viewBox="0 0 480 220" role="img" aria-label="Illustrative buying committee: economic buyer above champion and evaluators, with additional approval roles below" className="mx-auto h-auto w-full max-w-lg">
            <g stroke="currentColor" strokeOpacity=".2" strokeWidth="2" fill="none">
              <path d="M240 40 L110 110 M240 40 L370 110 M110 110 L75 183 M110 110 L240 183 M370 110 L405 183 M370 110 L240 183" strokeDasharray="5 5" />
            </g>
            {[
              { x: 240, y: 33, i: 2 },
              { x: 110, y: 106, i: 0 },
              { x: 370, y: 106, i: 1 },
              { x: 75, y: 184, i: 3 },
              { x: 240, y: 184, i: 4 },
              { x: 405, y: 184, i: 5 },
            ].map(({ x, y, i }) => (
              <g key={i}>
                <rect x={x - 67} y={y - 22} width="134" height="44" rx="10"
                  fill={selectedRole === i ? "var(--accent)" : "var(--card)"}
                  stroke={selectedRole === i ? "var(--accent)" : "var(--border)"} strokeWidth="2" />
                <text x={x} y={y + 4} fill={selectedRole === i ? "var(--accent-foreground)" : "var(--foreground)"}
                  textAnchor="middle" fontSize="11" fontWeight="600">{people[i].role}</text>
              </g>
            ))}
          </svg>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3" role="group" aria-label="Inspect stakeholder role">
          {people.map((person, index) => (
            <button type="button" key={person.role} aria-pressed={selectedRole === index}
              onClick={() => setSelectedRole(index)}
              className={`min-h-11 rounded-md border px-3 py-2 text-left text-xs font-medium ${selectedRole === index ? "border-accent bg-accent text-accent-foreground" : "border-border bg-card hover:border-accent"}`}>
              {person.role}
            </button>
          ))}
        </div>
        <div className="mt-5 rounded-lg border border-border bg-card p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-muted">Selected stakeholder</p>
          <h4 className="mt-1 font-semibold">{people[selectedRole].role}</h4>
          <p className="mt-1 text-sm text-muted">{people[selectedRole].priority}</p>
          <p className="mt-2 text-sm">Current access: {labels[people[selectedRole].access]}</p>
          <p className="mt-2 text-sm leading-6">{perspective === "seller" ? people[selectedRole].nextStep : `Coach the seller to substantiate this role's influence and agree on a next action.`}</p>
        </div>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {people.map((person, index) => (
          <div key={person.role} className={`rounded-xl border p-4 ${selectedRole === index ? "border-accent" : "border-border"}`}>
            <h3 className="font-semibold">{person.role}</h3>
            <p className="mt-1 text-xs text-muted">Priority: {person.priority}</p>
            <label className="mt-3 block text-sm font-medium" htmlFor={`relationship-${index}`}>Relationship coverage</label>
            <select id={`relationship-${index}`} value={person.access} onChange={(event) => {
              const next = event.target.value as Stakeholder["access"];
              if (!states.includes(next)) return;
              setPeople((previous) => previous.map((item, i) => i === index ? { ...item, access: next } : item));
            }} className="mt-1 w-full rounded-md border border-border bg-background p-2 text-sm text-foreground">
              {states.map((state) => <option key={state} value={state}>{labels[state]}</option>)}
            </select>
            <p className="mt-3 text-sm leading-6">{perspective === "seller" ? "Next move: " : "Coaching prompt: "}{perspective === "seller" ? person.nextStep : `What evidence shows ${person.role.toLowerCase()} has influence, and who owns the next action?`}</p>
          </div>
        ))}
      </div>
      <div aria-live="polite" className="mt-5 border-t border-border pt-4">
        <p className="text-sm font-medium">Illustrative coverage: {engaged} of {people.length} roles engaged</p>
        <p className="mt-1 text-xs text-muted">This is not a deal score or forecast probability. Coverage alone does not prove influence or agreement.</p>
        <h3 className="mt-4 font-semibold">Risks to inspect</h3>
        <ul className="mt-2 list-inside list-disc space-y-2 text-sm leading-6">{risks.map((risk) => <li key={risk}>{risk}</li>)}</ul>
      </div>
    </section>
  );
}
