"use client";

import { useState } from "react";
import { dealStages } from "@/lib/field-notes";

export function DealJourney() {
  const [selected, setSelected] = useState(0);
  const stage = dealStages[selected];
  return (
    <section aria-label="Interactive enterprise deal journey">
      <h2 className="font-display text-3xl">Six decisions to navigate</h2>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
        Explore a seller decision and the corresponding coaching question. The sequence is illustrative:
        buying groups often revisit earlier decisions.
      </p>
      <div className="mt-6 grid grid-cols-2 gap-2 md:grid-cols-3" role="group" aria-label="Choose deal decision">
        {dealStages.map((item, index) => (
          <button
            key={item.name}
            type="button"
            aria-pressed={selected === index}
            onClick={() => setSelected(index)}
            className={`min-h-14 rounded-xl border px-3 py-3 text-left text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${selected === index ? "border-accent bg-accent text-accent-foreground" : "border-border bg-card text-foreground hover:border-accent"}`}
          >
            <span className="block text-xs opacity-75">0{index + 1}</span>
            <span className="mt-1 block font-medium">{item.name}</span>
          </button>
        ))}
      </div>
      <div className="mt-4 rounded-2xl border border-border bg-card p-5 sm:p-7">
        <p className="text-xs font-medium uppercase tracking-wide text-muted">Decision {selected + 1} of {dealStages.length}</p>
        <h3 className="mt-2 font-display text-2xl">{stage.name}</h3>
        <div className="mt-5 grid gap-6 md:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">Seller lens</p>
            <p className="mt-2 text-base leading-7">{stage.question}</p>
            <p className="mt-3 text-sm leading-6 text-muted"><strong className="text-foreground">Evidence:</strong> {stage.evidence}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">Sales leader lens</p>
            <p className="mt-2 text-base leading-7">{stage.leader}</p>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-between gap-3 border-t border-border pt-4">
          <button type="button" disabled={selected === 0} onClick={() => setSelected((value) => Math.max(0, value - 1))}
            className="min-h-11 rounded-md border border-border px-4 py-2 text-sm font-medium disabled:opacity-40">← Previous</button>
          <button type="button" disabled={selected === dealStages.length - 1} onClick={() => setSelected((value) => Math.min(dealStages.length - 1, value + 1))}
            className="min-h-11 rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground disabled:opacity-40">Next →</button>
        </div>
      </div>
    </section>
  );
}
