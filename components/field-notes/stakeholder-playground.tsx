"use client";

import { useState } from "react";
import { demoStakeholders } from "@/lib/field-notes";

const labels = {
  unknown: "No validated access",
  developing: "Developing relationship",
  engaged: "Engaged",
};
const steps = [
  "Understand the group",
  "Find the gap",
  "Plan the conversation",
] as const;
const positions = [
  { left: "8%", top: "37%" },
  { left: "62%", top: "37%" },
  { left: "35%", top: "4%" },
  { left: "2%", top: "76%" },
  { left: "35%", top: "76%" },
  { left: "68%", top: "76%" },
];

export function StakeholderPlayground() {
  const [step, setStep] = useState(0);
  const [selectedRole, setSelectedRole] = useState(0);
  const [perspective, setPerspective] = useState<"seller" | "leader">("seller");
  const person = demoStakeholders[selectedRole];
  const controlClass =
    "min-h-11 rounded-lg border px-3 py-2 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";

  function chooseStep(index: number) {
    setStep(index);
    setSelectedRole(index === 0 ? 0 : 2);
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
      <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <div>
          <div
            className="relative hidden aspect-[2/1] rounded-xl border border-border bg-background sm:block"
            role="group"
            aria-label="Interactive stakeholder map"
          >
            <svg
              viewBox="0 0 600 300"
              aria-hidden="true"
              className="absolute inset-0 h-full w-full"
            >
              <g
                stroke="var(--border)"
                strokeWidth="2"
                fill="none"
                strokeDasharray="6 6"
              >
                <path d="M300 36 L138 135 M300 36 L462 135 M138 135 L102 252 M138 135 L300 252 M462 135 L498 252 M462 135 L300 252" />
              </g>
            </svg>
            {demoStakeholders.map((item, index) => (
              <button
                key={item.role}
                type="button"
                style={positions[index]}
                aria-pressed={selectedRole === index}
                onClick={() => setSelectedRole(index)}
                className={`absolute min-h-11 w-[30%] rounded-lg border px-1 py-2 text-xs font-medium focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent motion-safe:transition-colors ${selectedRole === index ? "border-accent bg-accent text-accent-foreground" : "border-border bg-card hover:border-accent"}`}
              >
                {item.role}
              </button>
            ))}
          </div>
          <div
            className="grid grid-cols-2 gap-2 sm:hidden"
            role="group"
            aria-label="Inspect stakeholder role"
          >
            {demoStakeholders.map((item, index) => (
              <button
                key={item.role}
                type="button"
                aria-pressed={selectedRole === index}
                onClick={() => setSelectedRole(index)}
                className={`${controlClass} text-left ${selectedRole === index ? "border-accent bg-accent text-accent-foreground" : "border-border"}`}
              >
                {item.role}
              </button>
            ))}
          </div>
          <p className="mt-3 text-xs leading-5 text-muted">
            Dashed lines show possible paths to explore, not confirmed reporting
            lines or influence.
          </p>
        </div>
        <div
          className="rounded-xl border border-border bg-background p-5"
          aria-live="polite"
          aria-atomic="true"
        >
          <p className="text-xs font-medium tracking-wide text-muted uppercase">
            Selected stakeholder
          </p>
          <h3 className="mt-2 text-xl font-semibold">{person.role}</h3>
          <p className="mt-3 text-sm leading-6 text-muted">
            Priority: {person.priority}
          </p>
          <p className="mt-3 text-sm">Access: {labels[person.access]}</p>
          <p className="mt-2 text-xs leading-5 text-muted">
            Evidence status: fictional scenario; decision authority unvalidated.
          </p>
          {step === 2 ? (
            <p className="mt-4 text-sm leading-6">
              Next conversation: {person.nextStep}.
            </p>
          ) : null}
        </div>
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
