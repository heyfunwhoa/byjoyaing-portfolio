"use client";

import { useState } from "react";
import { portfolioOsCheckpoints, portfolioOsDecision, portfolioOsFeedback } from "@/lib/portfolio-os-case";

export function PortfolioOsCaseStudy() {
  const [choice, setChoice] = useState<number | null>(null);
  const [reflection, setReflection] = useState("");
  const feedback = choice === null ? null : portfolioOsFeedback(choice);
  return (
    <section aria-label="Portfolio OS case study" className="mt-7 rounded-xl border border-border bg-background p-4 sm:p-6">
      <p className="text-xs font-semibold uppercase tracking-widest text-accent">Case study · Public record · 2026-10-11</p>
      <h3 className="mt-2 font-display text-2xl">From a source lesson to a visible Academy card</h3>
      <p className="mt-2 text-sm leading-6 text-muted">This is the public path of the Cursor workflows lesson. A merged document, a catalog change, and a closed issue are different events. Nothing you type here is saved.</p>
      <ol className="mt-5 space-y-3" aria-label="Delivery checkpoints">
        {portfolioOsCheckpoints.map((item, index) => (
          <li key={item.id} className="rounded-lg border border-border bg-card p-3 text-sm leading-6">
            <p className="font-semibold">{index + 1}. {item.title}</p>
            <p className="mt-1 text-muted">{item.body}</p>
          </li>
        ))}
      </ol>
      <fieldset className="mt-5 space-y-2">
        <legend className="mb-3 font-semibold">{portfolioOsDecision.question}</legend>
        {portfolioOsDecision.choices.map((option, index) => (
          <label key={option} className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 text-sm focus-within:outline-2 focus-within:outline-accent ${choice === index ? "border-accent bg-card" : "border-border"}`}>
            <input type="radio" name="portfolio-os-decision" checked={choice === index} onChange={() => setChoice(index)} className="mt-1 accent-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent" />
            <span>{option}</span>
          </label>
        ))}
      </fieldset>
      {feedback && (
        <p role="status" className="mt-4 rounded-lg border border-border bg-card p-4 text-sm leading-6">
          <strong>{feedback.passed ? "Passing evidence." : "Not passing evidence."}</strong> {feedback.message}
        </p>
      )}
      <div className="mt-5">
        <label htmlFor="portfolio-os-reflection" className="font-semibold">Reflection for this session</label>
        <textarea id="portfolio-os-reflection" value={reflection} onChange={(event) => setReflection(event.target.value)} rows={3} className="mt-2 w-full rounded-lg border border-border bg-card p-3 text-sm leading-6 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent" placeholder="What would you verify before calling the next issue done?" />
        <p className="mt-2 text-xs text-muted">Stays in this browser tab. Refreshing clears it.</p>
      </div>
      <div className="mt-5 border-t border-border pt-4">
        <p className="text-sm font-semibold">Sources checked 2026-10-11</p>
        {portfolioOsDecision.sources.map((source) => (
          <a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer" className="mt-2 block text-sm text-accent underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">{source.label} ↗</a>
        ))}
      </div>
    </section>
  );
}
