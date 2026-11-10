"use client";

import { useId, useState } from "react";

const decisions = [
  {
    id: "home",
    title: "Home motion",
    audience: "Founder or hiring leader (hypothesis)",
    task: "Understand positioning and find relevant professional work quickly.",
    baseline: "The existing editorial hero and direct links already introduce Work and About.",
    alternatives: [
      { title: "Keep static", benefit: "Fast, predictable and readable.", cost: "Less visual emphasis on transitions." },
      { title: "CSS entrance only", benefit: "May clarify the reading order.", cost: "Adds timing and reduced-motion verification." },
      { title: "Continuous animation", benefit: "More movement.", cost: "Risks distraction and unnecessary performance cost." },
    ],
    recommendation: "Test a restrained CSS entrance against the static baseline, not an automatic rollout.",
    evidence: "No visitor comprehension study has been completed. This is a design hypothesis.",
    observe: "Can visitors identify the primary role and find Work without prompting?",
    boundary: "All content and actions stay visible when motion is disabled.",
  },
  {
    id: "projects",
    title: "Projects discovery",
    audience: "Technical reviewer (hypothesis)",
    task: "Find a relevant independent project and verify its status and source context.",
    baseline: "The public directory already has search, categories, lifecycle filters and sorting.",
    alternatives: [
      { title: "Keep the directory", benefit: "Exhaustive discovery and transparent results.", cost: "Requires scanning many cards." },
      { title: "Curated carousel", benefit: "Highlights a small editorial selection.", cost: "Hides non-featured items without a directory path." },
      { title: "Table view", benefit: "Supports comparable structured records.", cost: "Can overload a case-study-oriented page." },
    ],
    recommendation: "Keep the directory as canonical; consider a different view only for a demonstrated task.",
    evidence: "Search, sorting and route behavior have automated tests; visitor preference is not validated.",
    observe: "Can someone find one relevant project, understand its stage and open the case study?",
    boundary: "No duplicate index, fabricated screenshots or carousel-only navigation.",
  },
  {
    id: "stories",
    title: "Case-study evidence",
    audience: "Hiring manager or technical reviewer (hypothesis)",
    task: "Separate the problem, contribution, demonstrated sample and limits of the claims.",
    baseline: "Atlas and Account Intelligence use evidence-reading guides and existing source captions.",
    alternatives: [
      { title: "Story first", benefit: "Introduces intent and decisions before proof.", cost: "Important evidence may appear lower on a long page." },
      { title: "Evidence first", benefit: "Surfaces a verified sample early.", cost: "Needs clear context to prevent overinterpretation." },
      { title: "Visual gallery", benefit: "Can show multiple approved artifacts.", cost: "Requires authentic, captioned assets that may not exist." },
    ],
    recommendation: "Compare story-first and evidence-first variants, using real approved samples only.",
    evidence: "Source-backed portfolio copy and automated UI checks exist, but no observed reader study.",
    observe: "Can visitors explain what was built, what is fictional, and what remains unmeasured?",
    boundary: "Prototype and sample labels must remain visible. Do not claim business results without evidence.",
  },
] as const;

type DecisionId = (typeof decisions)[number]["id"];

export function ProductRationaleWorkbench() {
  const titleId = useId();
  const [selected, setSelected] = useState<DecisionId>("home");
  const [choice, setChoice] = useState(0);
  const current = decisions.find((item) => item.id === selected)!;
  const selectedOption = current.alternatives[choice];

  return (
    <section id="product-rationale" aria-labelledby={titleId} className="scroll-mt-24 border-t border-border py-12">
      <p className="editorial-eyebrow text-accent">Design Lab · Product-design rationale</p>
      <h2 id={titleId} className="mt-2 font-display text-2xl tracking-tight">Decide why before deciding what.</h2>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
        Practice a small product-design decision using the existing portfolio. These are hypotheses and tradeoffs,
        not observed user-test findings or approvals to ship.
      </p>
      <div role="group" aria-label="Choose a design decision" className="mt-5 flex flex-wrap gap-2">
        {decisions.map((item) => (
          <button key={item.id} type="button" aria-pressed={selected === item.id}
            onClick={() => { setSelected(item.id); setChoice(0); }}
            className={`min-h-11 rounded-lg border px-3 py-2 text-sm font-medium ${selected === item.id ? "border-foreground bg-foreground text-background" : "border-border bg-card"}`}>
            {item.title}
          </button>
        ))}
      </div>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-4 sm:p-5">
          <h3 className="font-semibold">Audience and task</h3>
          <p className="mt-2 text-xs text-muted">{current.audience}</p>
          <p className="mt-2 text-sm leading-6">{current.task}</p>
          <h3 className="mt-5 font-semibold">Current baseline</h3>
          <p className="mt-2 text-sm leading-6">{current.baseline}</p>
          <h3 className="mt-5 font-semibold">Evidence status</h3>
          <p className="mt-2 text-sm leading-6 text-muted">{current.evidence}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 sm:p-5">
          <h3 className="font-semibold">Compare alternatives</h3>
          <div role="group" aria-label="Select an alternative" className="mt-3 flex flex-wrap gap-2">
            {current.alternatives.map((option, index) => (
              <button key={option.title} type="button" aria-pressed={choice === index}
                onClick={() => setChoice(index)}
                className={`min-h-11 rounded-lg border px-3 py-2 text-sm ${choice === index ? "border-accent bg-surface-sage font-semibold" : "border-border"}`}>
                {option.title}
              </button>
            ))}
          </div>
          <div role="status" aria-live="polite" className="mt-4 rounded-lg border border-border bg-background p-4">
            <p className="font-semibold">{selectedOption.title}</p>
            <p className="mt-2 text-sm leading-6"><strong>Advantage:</strong> {selectedOption.benefit}</p>
            <p className="mt-2 text-sm leading-6"><strong>Tradeoff:</strong> {selectedOption.cost}</p>
          </div>
          <h3 className="mt-4 font-semibold">Provisional recommendation</h3>
          <p className="mt-2 text-sm leading-6">{current.recommendation}</p>
        </div>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-border p-4">
          <h3 className="font-semibold">What to observe</h3>
          <p className="mt-2 text-sm leading-6">{current.observe}</p>
        </div>
        <div className="rounded-xl border border-border p-4">
          <h3 className="font-semibold">Release boundary</h3>
          <p className="mt-2 text-sm leading-6">{current.boundary}</p>
        </div>
      </div>
      <p className="mt-4 text-xs leading-6 text-muted">
        Next: inspect the actual page, capture a baseline, test a visitor task, record observed evidence,
        then decide adopt / revise / defer in the existing component-adoption record. Keyboard and screen-reader
        acceptance must be tested separately; this demo does not constitute a usability study.
      </p>
    </section>
  );
}
