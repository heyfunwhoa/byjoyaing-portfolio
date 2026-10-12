"use client";

import { useState } from "react";
import { StakeholderMap } from "@/components/stakeholder-map/stakeholder-map";
import {
  exampleMapPeople,
  exampleMapRelationships,
} from "@/lib/stakeholder-map-demo";

const steps = [
  "Understand the group",
  "Find the gap",
  "Plan the conversation",
] as const;

export function StakeholderPlayground() {
  const [step, setStep] = useState(0);
  const [selectedId, setSelectedId] = useState("champion");
  const [perspective, setPerspective] = useState<"seller" | "leader">("seller");
  const controlClass =
    "min-h-11 rounded-lg border px-3 py-2 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";

  function chooseStep(index: number) {
    setStep(index);
    setSelectedId(index === 0 ? "champion" : "buyer");
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
            Fictional example. No account data or changes are saved.
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
      <div
        className="mt-5 grid gap-2 sm:grid-cols-3"
        role="group"
        aria-label="Guided example steps"
      >
        {steps.map((label, index) => (
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
        <h3 className="font-semibold">{steps[step]}</h3>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
          {step === 0
            ? "Two of six roles are engaged in this example. Select a stakeholder to inspect priorities and access; coverage alone is not a deal score."
            : step === 1
              ? "The economic buyer is not yet engaged. A champion’s enthusiasm does not establish budget authority or an approval path."
              : perspective === "seller"
                ? "Ask the champion who owns the business outcome and budget decision, then propose an introduction with a relevant reason to meet."
                : "Ask what evidence supports champion influence, what the buyer needs to decide, and who owns the introduction and follow-up."}
        </p>
      </div>
    </section>
  );
}
