"use client";

import { useState } from "react";

const stages = [
  {label:"Intake",heading:"Qualify an incoming request",situation:"A fictional Sales rep reports that audit exports require manual work. They ask for a new button but have one anecdote and no estimate of frequency.",decision:"What should happen before committing to a feature?",options:["Promise delivery immediately","Record the user problem, source, current workaround and impact hypothesis; send for discovery","Create a duplicate engineering backlog"],correct:1,why:"Request intake is upstream of product discovery; not every request becomes a roadmap commitment.",evidence:"Dated feedback and an explicit triage decision"},
  {
    label: "Define",
    heading: "Find the actual problem",
    situation: "A fictional revenue planner ignores the founding leader's part-time selling contribution. Its forecast is misleading.",
    decision: "What should the team define before writing code?",
    options: ["A new dashboard and more charts", "The user problem and one measurable expected behavior", "A second issue tracker"],
    correct: 1,
    why: "Start with the customer problem and acceptance criteria. A prettier dashboard would not fix incorrect math.",
    evidence: "Problem statement, assumptions and a testable acceptance criterion",
  },
  {
    label: "Plan",
    heading: "Make the work ready",
    situation: "The product manager has a large roadmap. The model correction blocks a hiring-decision feature.",
    decision: "Which work should be taken into active development?",
    options: ["Start every backlog item immediately", "Select the model fix and leave dependent hiring work in Backlog", "Mark both features Done because the PRD exists"],
    correct: 1,
    why: "Dependencies and work-in-progress limits matter. Ready means the issue has enough detail to implement and test.",
    evidence: "Prioritized issue, dependencies, acceptance criteria and Definition of Ready",
  },
  {
    label: "Build",
    heading: "Implement one reviewable change",
    situation: "The engineer updates the capacity model and adds regression tests for fractional selling time and double-counting.",
    decision: "What should the engineer deliver?",
    options: ["A branch and focused PR referencing the issue, with tests", "Only a screenshot saying it works", "A second copy of the backlog in GitHub Issues"],
    correct: 0,
    why: "GitHub tracks code and review evidence, while Linear tracks execution. One small, linked PR reduces review risk.",
    evidence: "Feature branch, tests, PR description and changed-file review",
  },
  {
    label: "Verify",
    heading: "Handle a failing acceptance check",
    situation: "GitHub CI is green, but a manual acceptance check shows the model still double-counts one seller.",
    decision: "What is the correct issue status?",
    options: ["Done; passing CI always proves correctness", "In Review; fix the existing PR before marking Done", "Create a duplicate issue and ignore this PR"],
    correct: 1,
    why: "A green pipeline confirms the automated checks passed, not that every product requirement was met. Keep the same issue and PR under review.",
    evidence: "Passing checks plus verified business behavior and documented limitations",
  },
  {
    label: "Measure",
    heading: "Check the outcome after release",
    situation: "The model fix is merged. The next goal is to help a fictional founder decide when to hire an AE.",
    decision: "What should the team measure next?",
    options: ["Number of commits alone", "Whether the model supports a defensible decision with clear assumptions", "Whether all future ideas are already in Todo"],
    correct: 1,
    why: "Shipping is an output. The outcome is a clearer, more reliable decision. Use the evidence to decide the next milestone.",
    evidence: "Outcome review, limitations, follow-on decision and retrospective",
  },
] as const;

export function DeliveryLifecycleLab() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const stage = stages[step];
  const answer = answers[step];
  const correct = answer === stage.correct;
  const completed = stages.filter((item, index) => answers[index] === item.correct).length;
  return (
    <section aria-label="Interactive delivery lifecycle lab" className="mt-7 rounded-xl border border-border bg-background p-4 sm:p-6">
      <p className="text-xs font-semibold uppercase tracking-widest text-accent">Practice lab · Fictional example</p>
      <h3 className="mt-2 font-display text-2xl">Decide what happens next</h3>
      <p className="mt-2 text-sm leading-6 text-muted">Work through six stages. Choose the best action, see why, and learn what evidence belongs in each system. Nothing is saved or sent to an external service.</p>
      <div className="mt-5 grid grid-cols-3 gap-1 sm:grid-cols-6" aria-label="Lifecycle stages">
        {stages.map((item, index) => (
          <button key={item.label} type="button" aria-current={index === step ? "step" : undefined} onClick={() => setStep(index)} className={`min-w-0 rounded-md border px-1 py-3 text-xs font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${step === index ? "border-accent bg-card" : "border-border hover:bg-card"}`}>
            <span className="block">{index + 1}</span><span className="mt-1 block break-words">{item.label}</span>
            <span className="sr-only">{answers[index] === item.correct ? "answered correctly" : ""}</span>
          </button>
        ))}
      </div>
      <div className="mt-6" key={stage.label}>
        <p className="text-xs font-semibold text-accent">Stage {step + 1} of {stages.length}</p>
        <h4 className="mt-1 text-lg font-semibold">{stage.heading}</h4>
        <p className="mt-3 text-sm leading-6 text-muted">{stage.situation}</p>
        <fieldset className="mt-5 space-y-2">
          <legend className="mb-3 font-semibold">{stage.decision}</legend>
          {stage.options.map((option, index) => (
            <label key={option} className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 text-sm focus-within:outline-2 focus-within:outline-accent ${answer === index ? "border-accent bg-card" : "border-border"}`}>
              <input type="radio" name={`delivery-stage-${step}`} checked={answer === index} onChange={() => setAnswers((current) => ({ ...current, [step]: index }))} className="mt-1 accent-accent" />
              <span>{option}</span>
            </label>
          ))}
        </fieldset>
        {answer !== undefined && (
          <div role="status" className="mt-4 rounded-lg border border-border bg-card p-4 text-sm leading-6">
            <p className="font-semibold">{correct ? "Correct decision." : "Not quite—try another option."}</p>
            <p className="mt-1">{stage.why}</p>
            {correct && <p className="mt-2"><strong>Evidence to keep:</strong> {stage.evidence}.</p>}
          </div>
        )}
      </div>
      <div className="mt-5 flex items-center justify-between gap-3">
        <button type="button" onClick={() => setStep((current) => Math.max(0, current - 1))} disabled={step === 0} className="rounded-lg border border-border px-3 py-2 text-sm disabled:opacity-40">Previous</button>
        <p className="text-center text-xs text-muted" aria-live="polite">{completed} of {stages.length} decisions correct</p>
        {step < stages.length - 1 ? (
          <button type="button" onClick={() => setStep((current) => Math.min(stages.length - 1, current + 1))} className="rounded-lg border border-border px-3 py-2 text-sm">Next</button>
        ) : (
          <button type="button" onClick={() => { setStep(0); setAnswers({}); }} className="rounded-lg border border-border px-3 py-2 text-sm">Restart</button>
        )}
      </div>
      {completed === stages.length && <p role="status" className="mt-4 rounded-lg bg-card p-4 text-sm">Lab complete. You practiced the delivery cycle from problem definition through outcome measurement without duplicating work across tools.</p>}
    </section>
  );
}
