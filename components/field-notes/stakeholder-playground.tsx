"use client";

import { useState } from "react";
import { StakeholderMap } from "@/components/stakeholder-map/stakeholder-map";
import {
  exampleMapPeople,
  exampleMapRelationships,
} from "@/lib/stakeholder-map-demo";

const guidedExamples = [
  {
    label: "Understand the group",
    focusId: "champion",
    scenario:
      "The security champion and technical evaluator are engaged. Their influence, decision rights, and internal advocacy are not yet validated.",
    sellerQuestion:
      "Which outcomes are you accountable for, and who else evaluates the risk or developer workflow?",
    evidence:
      "The champion explains priorities in their own words and identifies who owns the business outcome and technical review.",
    leaderQuestion:
      "Which claims come from a buyer conversation, and what evidence would confirm the champion's influence?",
  },
  {
    label: "Find the gap",
    focusId: "buyer",
    scenario:
      "The economic buyer is not engaged in this fictional example. Budget authority and the approval path remain unknown.",
    sellerQuestion:
      "Who owns the business outcome and budget decision? Could you introduce us so we can understand their priorities?",
    evidence:
      "A relevant introduction and a direct conversation. A job title or org chart alone does not confirm decision authority.",
    leaderQuestion:
      "Are decision rights supported by conversations, or inferred from titles and reporting lines?",
  },
  {
    label: "Plan the conversation",
    focusId: "buyer",
    scenario:
      "No introduction or buyer response is assumed. This is a proposed next move, not a claimed customer interaction.",
    sellerQuestion:
      "Could we include the person accountable for the business outcome and budget in a short conversation? We want to understand their priorities before recommending next steps.",
    sampleAsk:
      "Would you be open to introducing us to the person who owns the business outcome and budget? I would like to understand their priorities and required review steps before we propose an evaluation.",
    evidence:
      "Record whether the champion accepts, redirects, or declines the request, then agree on the next action. Do not infer a response.",
    leaderQuestion:
      "Is the request relevant to that stakeholder, and did the buyer confirm the next action?",
  },
] as const;

const accessSummary = [
  { label: "Engaged", access: "engaged" },
  { label: "Developing", access: "developing" },
  { label: "Unknown", access: "unknown" },
] as const;

export function StakeholderPlayground() {
  const [step, setStep] = useState(0);
  const [selectedId, setSelectedId] = useState("champion");
  const [perspective, setPerspective] = useState<"seller" | "leader">("seller");
  const guidance = guidedExamples[step];
  const controlClass =
    "min-h-11 rounded-lg border px-3 py-2 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";

  function chooseStep(index: number) {
    setStep(index);
    setSelectedId(guidedExamples[index].focusId);
  }

  return (
    <section
      className="rounded-2xl border border-border bg-card p-5 sm:p-7"
      aria-label="Illustrative stakeholder mapping exercise"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl">Explore a buying group</h2>
          <p className="mt-2 text-sm text-muted">
            Fictional example. No account data or changes are saved. This is
            the same software-company scenario used in the enterprise deal
            walkthrough.
          </p>
        </div>
        <button
          type="button"
          className={`${controlClass} border-border`}
          onClick={() => {
            chooseStep(0);
            setPerspective("seller");
          }}
        >
          Reset example
        </button>
      </div>
      <p className="mt-4 max-w-3xl text-sm leading-6 text-muted">
        A security champion and technical evaluator are engaged. Engineering
        impact, budget authority, and approval paths still need validation.
        Access describes conversation status, not influence, authority, or
        purchase intent.
      </p>
      <dl
        aria-label="Fictional stakeholder access summary"
        className="mt-4 grid grid-cols-3 gap-2"
      >
        {accessSummary.map(({ label, access }) => (
          <div key={access} className="rounded-xl border border-border p-3">
            <dt className="text-xs leading-5 text-muted">{label}</dt>
            <dd className="mt-1 font-display text-2xl">
              {exampleMapPeople.filter((person) => person.access === access).length}
            </dd>
          </div>
        ))}
      </dl>
      <div
        className="mt-5 grid gap-2 sm:grid-cols-3"
        role="group"
        aria-label="Guided example steps"
      >
        {guidedExamples.map(({ label }, index) => (
          <button
            key={label}
            type="button"
            aria-pressed={step === index}
            onClick={() => chooseStep(index)}
            className={`${controlClass} text-left ${step === index ? "border-accent bg-accent text-accent-foreground" : "border-border"}`}
          >
            <span className="mr-2">0{index + 1}</span>
            {label}
          </button>
        ))}
      </div>
      <div className="mt-6">
        <StakeholderMap
          people={exampleMapPeople}
          relationships={exampleMapRelationships}
          selectedId={selectedId}
          onSelect={setSelectedId}
          emphasizedId={step > 0 ? "buyer" : undefined}
          showNextStep={step === 2}
        />
      </div>
      <div
        className="mt-5 flex flex-wrap gap-2"
        role="group"
        aria-label="Choose perspective"
      >
        {(["seller", "leader"] as const).map((value) => (
          <button
            key={value}
            type="button"
            aria-pressed={perspective === value}
            onClick={() => setPerspective(value)}
            className={`${controlClass} ${perspective === value ? "border-accent bg-accent text-accent-foreground" : "border-border"}`}
          >
            {value === "seller" ? "Seller view" : "Sales leader view"}
          </button>
        ))}
      </div>
      <div
        className="mt-4 border-t border-border pt-4"
        aria-live="polite"
        aria-atomic="true"
      >
        <h3 className="font-semibold">{guidance.label}</h3>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
          {guidance.scenario} Select a stakeholder in the map to inspect the
          fictional priorities and evidence gaps.
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <div className="rounded-xl border border-border bg-surface-mist p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">
              {perspective === "seller" ? "Illustrative question" : "Leader coaching question"}
            </p>
            <p className="mt-2 text-sm leading-6">
              {perspective === "seller" ? guidance.sellerQuestion : guidance.leaderQuestion}
            </p>
          </div>
          <div className="rounded-xl border border-border p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">
              Evidence to confirm
            </p>
            <p className="mt-2 text-sm leading-6 text-muted">{guidance.evidence}</p>
          </div>
        </div>
        {perspective === "seller" && "sampleAsk" in guidance && (
          <div className="mt-3 rounded-xl border border-border bg-surface-mist p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">
              Suggested wording to adapt
            </p>
            <blockquote className="mt-2 max-w-3xl text-sm leading-6">
              {guidance.sampleAsk}
            </blockquote>
            <p className="mt-2 text-xs leading-5 text-muted">
              Example copy only. It is not sent or saved.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
