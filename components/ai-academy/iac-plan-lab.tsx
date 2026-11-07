"use client";
import { useState } from "react";
import { iacPlans, explainIacChoice, type IacPlanId } from "@/lib/academy/iac-plan-lab";
/** Optional extension of an existing Academy lesson; no data storage or cloud calls. */
export function IacPlanLab() {
  const [selected, setSelected] = useState<IacPlanId | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const result = submitted && selected ? explainIacChoice(selected) : null;
  return (
    <section aria-label="IaC plan review practice" className="mt-7 rounded-xl border border-border bg-card p-4 sm:p-6">
      <p className="text-xs font-semibold uppercase tracking-widest text-accent">Optional practice · Fictional example</p>
      <h3 className="mt-2 font-display text-xl sm:text-2xl">Review an infrastructure change</h3>
      <p className="mt-3 text-sm leading-6 text-muted">A fictional app needs one private preview bucket with seven-day retention. Production must not change. Pick the plan that could proceed to human review. No infrastructure is changed. Your choice is held only in this page session; it is not saved or sent.</p>
      <fieldset className="mt-5 space-y-3">
        <legend className="mb-3 font-semibold">Which proposed plan meets the requirement?</legend>
        {iacPlans.map(plan => (
          <label key={plan.id} className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 text-sm focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-accent ${selected === plan.id ? "border-accent bg-background" : "border-border"}`}>
            <input type="radio" name="iac-plan" checked={selected === plan.id} onChange={() => { setSelected(plan.id); setSubmitted(false); }} className="mt-1 accent-accent" />
            <span><strong className="block">{plan.title}</strong><span className="mt-1 block leading-6 text-muted">{plan.change}</span></span>
          </label>
        ))}
      </fieldset>
      <div className="mt-5 flex flex-wrap gap-3">
        <button type="button" disabled={!selected} onClick={() => setSubmitted(true)} className="min-h-11 rounded-lg border border-border px-4 py-2 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-40">Check decision</button>
        <button type="button" onClick={() => {setSelected(null);setSubmitted(false);}} className="min-h-11 rounded-lg border border-border px-4 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">Reset</button>
      </div>
      {result ? <div role="status" className="mt-4 rounded-lg border border-border bg-background p-4 text-sm leading-6"><p className="font-semibold">{result.decision === "candidate" ? "Candidate for review, not approval to apply." : "Stop: unapproved or unsafe change."}</p><p className="mt-2">{result.feedback}</p></div> : null}
      <p className="mt-4 text-xs leading-5 text-muted">Checking one answer is practice, not approval to apply infrastructure changes or proof of operating skill.</p>
      <details className="mt-5 rounded-lg border border-border p-3"><summary className="min-h-11 cursor-pointer font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">Independent transfer task</summary><p className="mt-2 text-sm leading-6">A fictional report-export worker needs private storage, but a plan unexpectedly replaces the production database. Explain why to stop, what evidence to request, and who may authorize any change. Correctly selecting an answer is practice, not proof of operational skill.</p></details>
    </section>
  );
}
