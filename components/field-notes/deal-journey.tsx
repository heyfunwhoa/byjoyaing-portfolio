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
        Follow one fictional software company through six deal decisions. Each
        step separates the scenario from evidence a seller would still need to
        validate. Real buying groups may revisit earlier decisions.
      </p>
      <div className="mt-5 rounded-xl border border-border bg-surface-mist p-4 sm:p-5">
        <p className="text-xs font-semibold tracking-wide text-accent uppercase">
          Fictional scenario
        </p>
        <p className="mt-2 max-w-3xl text-sm leading-6">
          A software company is exploring a developer-security tool after its
          security lead asks how exposed credentials could be found across
          development teams. A security champion and technical evaluator are
          engaged. The business impact, budget owner, engineering fit, and
          approval path remain unvalidated.
        </p>
        <p className="mt-2 text-xs leading-5 text-muted">
          This is an original teaching example. It does not describe a real
          account, customer conversation, completed evaluation, or result.
        </p>
      </div>
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
            <div className="mt-4 rounded-xl border border-border bg-surface-mist p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                Worked example
              </p>
              <p className="mt-2 text-sm leading-6">{stage.example}</p>
            </div>
            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                Evidence to verify
              </p>
              <p className="mt-2 text-sm leading-6 text-muted">{stage.evidence}</p>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">Sales leader lens</p>
              <p className="mt-2 text-base leading-7">{stage.leader}</p>
            </div>
            <div className="rounded-xl border border-accent/30 bg-accent/5 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-accent">
                Move forward when
              </p>
              <p className="mt-2 text-sm leading-6">{stage.decisionGate}</p>
            </div>
            <div className="border-t border-border pt-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                Next seller move
              </p>
              <p className="mt-2 text-sm leading-6 text-muted">{stage.nextMove}</p>
            </div>
          </div>
        </div>
        {"evaluationPlan" in stage && (
          <section
            className="mt-6 rounded-xl border border-border bg-surface-mist p-4 sm:p-5"
            aria-label="Illustrative technical evaluation plan"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h4 className="text-sm font-semibold">Evaluation plan to agree before kickoff</h4>
              <span className="text-xs text-muted">Planning prompts, not completed results</span>
            </div>
            <dl className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {stage.evaluationPlan.map((item) => (
                <div key={item.label} className="rounded-lg border border-border bg-card p-3">
                  <dt className="text-xs font-semibold uppercase tracking-wide text-muted">
                    {item.label}
                  </dt>
                  <dd className="mt-2 text-sm leading-6">{item.detail}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}
        {"approvalPath" in stage && (
          <section
            className="mt-6 rounded-xl border border-border bg-surface-mist p-4 sm:p-5"
            aria-label="Illustrative commercial approval path"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h4 className="text-sm font-semibold">Commercial path to validate</h4>
              <span className="text-xs text-muted">No owners or dates are assumed</span>
            </div>
            <dl className="mt-4 grid gap-3 sm:grid-cols-2">
              {stage.approvalPath.map((item) => (
                <div key={item.label} className="rounded-lg border border-border bg-card p-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <dt className="text-xs font-semibold uppercase tracking-wide text-muted">
                      {item.label}
                    </dt>
                    <dd className="rounded-full border border-border px-2 py-1 text-[11px] font-medium text-muted">
                      {item.status}
                    </dd>
                  </div>
                  <dd className="mt-2 text-sm leading-6">{item.detail}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}
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
