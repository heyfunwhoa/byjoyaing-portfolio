"use client";

import { useState } from "react";
import {
  evaluateSecurityDecision,
  findSecurityReviewScenario,
  securityReviewScenarios,
  type SecurityReviewRole,
} from "@/lib/ai-academy/security-review-lab";

const control = "mt-2 w-full rounded-lg border border-border bg-card p-3 text-sm";
const choiceLabel = "flex cursor-pointer items-start gap-3 rounded-lg border border-border bg-card p-3 text-sm leading-6";

export function SecurityReviewLab() {
  const [scenarioId, setScenarioId] = useState(securityReviewScenarios[0].id);
  const [role, setRole] = useState<SecurityReviewRole>("ae");
  const [evidenceChoice, setEvidenceChoice] = useState<number | null>(null);
  const [actionChoice, setActionChoice] = useState<number | null>(null);
  const [reviewed, setReviewed] = useState(false);

  const scenario = findSecurityReviewScenario(scenarioId) ?? securityReviewScenarios[0];
  const action = scenario.actions[role];
  const evidenceResult = reviewed
    ? evaluateSecurityDecision(scenario.id, role, "evidence", evidenceChoice)
    : null;
  const actionResult = reviewed
    ? evaluateSecurityDecision(scenario.id, role, "action", actionChoice)
    : null;

  function resetChoices() {
    setEvidenceChoice(null);
    setActionChoice(null);
    setReviewed(false);
  }

  return (
    <section aria-label="Synthetic security assessment decision lab" className="mt-7 rounded-xl border border-border bg-background p-4 sm:p-6">
      <p className="text-xs font-semibold uppercase tracking-widest text-accent">Practice lab · Fictional data only</p>
      <h3 className="mt-2 font-display text-2xl">Review the deal before it closes</h3>
      <p className="mt-2 text-sm leading-6 text-muted">
        Choose a buyer and your role, then make two decisions. Nothing is sent, saved, connected to a CRM or used to approve a real vendor. Do not enter actual customer data or restricted security reports.
      </p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-semibold">
          Buyer scenario
          <select
            className={control}
            value={scenarioId}
            onChange={(event) => { setScenarioId(event.target.value); resetChoices(); }}
          >
            {securityReviewScenarios.map((item) => (
              <option key={item.id} value={item.id}>{item.title}</option>
            ))}
          </select>
        </label>
        <label className="text-sm font-semibold">
          Your role
          <select
            className={control}
            value={role}
            onChange={(event) => { setRole(event.target.value as SecurityReviewRole); resetChoices(); }}
          >
            <option value="ae">Account Executive</option>
            <option value="head-of-sales">Head of Sales</option>
          </select>
        </label>
      </div>
      <div className="mt-5 rounded-lg border border-border bg-card p-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted">{scenario.buyer} · Illustrative {scenario.risk.toLowerCase()} risk</p>
        <p className="mt-3 text-sm leading-6">{scenario.context}</p>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted">
          {scenario.signals.map((item) => <li key={item}>{item}</li>)}
        </ul>
        <p className="mt-3 text-xs text-muted">
          Risk labels are teaching aids, not compliance decisions or calibrated vendor ratings.
        </p>
      </div>

      <fieldset className="mt-6 space-y-3">
        <legend className="text-sm font-semibold">Decision 1 · {scenario.evidence.question}</legend>
        {scenario.evidence.choices.map((option, index) => (
          <label key={index} className={choiceLabel}>
            <input
              type="radio"
              name="security-review-evidence"
              className="mt-1 accent-accent"
              checked={evidenceChoice === index}
              onChange={() => { setEvidenceChoice(index); setReviewed(false); }}
            />
            <span>{option}</span>
          </label>
        ))}
      </fieldset>

      <fieldset className="mt-6 space-y-3">
        <legend className="text-sm font-semibold">Decision 2 · {action.question}</legend>
        {action.choices.map((option, index) => (
          <label key={index} className={choiceLabel}>
            <input
              type="radio"
              name="security-review-action"
              className="mt-1 accent-accent"
              checked={actionChoice === index}
              onChange={() => { setActionChoice(index); setReviewed(false); }}
            />
            <span>{option}</span>
          </label>
        ))}
      </fieldset>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          disabled={evidenceChoice === null || actionChoice === null}
          onClick={() => setReviewed(true)}
          className="rounded-lg bg-accent px-4 py-3 text-sm font-semibold text-accent-foreground disabled:cursor-not-allowed disabled:opacity-50"
        >
          Review decisions
        </button>
        <button
          type="button"
          onClick={resetChoices}
          className="rounded-lg border border-border bg-card px-4 py-3 text-sm font-semibold"
        >
          Reset choices
        </button>
      </div>

      {reviewed && evidenceResult && actionResult && (
        <div role="status" aria-live="polite" className="mt-4 space-y-4 rounded-lg border border-border bg-card p-4">
          <p className="font-semibold">
            {Number(evidenceResult.correct) + Number(actionResult.correct)} of 2 decisions align with the guidance
          </p>
          <div className="text-sm leading-6">
            <p className="font-semibold">Evidence decision · {evidenceResult.correct ? "Good judgment" : "Review this choice"}</p>
            <p className="mt-1 text-muted">{evidenceResult.explanation}</p>
          </div>
          <div className="text-sm leading-6">
            <p className="font-semibold">{role === "ae" ? "AE next step" : "Leadership process"} · {actionResult.correct ? "Good judgment" : "Review this choice"}</p>
            <p className="mt-1 text-muted">{actionResult.explanation}</p>
          </div>
          <div className="border-t border-border pt-3 text-sm leading-6">
            <p className="font-semibold">What to inspect in the real world</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-muted">
              {scenario.guidance.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
          <p className="text-xs text-muted">This is a learning exercise; do not infer actual security approval, legal permission or vendor compliance from your choices.</p>
        </div>
      )}
    </section>
  );
}
