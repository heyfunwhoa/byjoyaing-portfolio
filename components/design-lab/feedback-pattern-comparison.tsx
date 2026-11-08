"use client";

import { useId, useState } from "react";
import { Button } from "@/components/ui/button";

export const feedbackPatterns = [
  { id: "inline", label: "Inline validation", best: "Explain an invalid field next to the place it can be fixed.", tradeoff: "Requires persistent space and specific recovery instructions." },
  { id: "toast", label: "Transient confirmation", best: "Confirm a noncritical action without hiding the main task.", tradeoff: "Disappearing feedback should not carry essential error details." },
  { id: "alert", label: "Persistent alert", best: "Explain a page-level failure that requires attention or recovery.", tradeoff: "Too many alerts distract from the work they are meant to support." },
] as const;
type FeedbackPattern = (typeof feedbackPatterns)[number]["id"];
type Outcome = "idle" | "success" | "invalid" | "failure";

export function FeedbackPatternComparison() {
  const heading = useId();
  const field = useId();
  const [pattern, setPattern] = useState<FeedbackPattern>("inline");
  const [campaign, setCampaign] = useState("");
  const [outcome, setOutcome] = useState<Outcome>("idle");
  const current = feedbackPatterns.find((option) => option.id === pattern)!;

  function choose(next: FeedbackPattern) {
    setPattern(next);
    setOutcome("idle");
  }
  function simulate() {
    if (!campaign.trim()) {
      setOutcome("invalid");
    } else {
      setOutcome(pattern === "alert" ? "failure" : "success");
    }
  }
  return (
    <section aria-labelledby={heading} className="space-y-4">
      <div>
        <p className="editorial-eyebrow text-accent">Pattern comparison · feedback</p>
        <h2 id={heading} className="mt-2 font-display text-2xl">Inline message, toast, or alert?</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
          Test the same fictional campaign form using three feedback approaches.
          An empty name triggers inline validation; the alert pattern simulates a failed save.
          No request is sent and no data is persisted.
        </p>
      </div>
      <div role="group" aria-label="Feedback patterns" className="flex flex-wrap gap-2">
        {feedbackPatterns.map((option) => (
          <Button key={option.id} type="button" aria-pressed={pattern === option.id}
            variant={pattern === option.id ? "default" : "outline"}
            onClick={() => choose(option.id)}>{option.label}</Button>
        ))}
      </div>
      <div className="rounded-xl border border-border bg-card p-4 sm:p-5">
        <label htmlFor={field} className="block text-sm font-medium">Fictional campaign name</label>
        <input id={field} value={campaign} onChange={(event) => {setCampaign(event.target.value);setOutcome("idle");}}
          aria-invalid={outcome === "invalid"}
          aria-describedby={outcome === "invalid" ? field + "-error" : undefined}
          className="mt-2 min-h-11 w-full max-w-md rounded-lg border border-border bg-background px-3"
          placeholder="Try: Event follow-up" />
        {outcome === "invalid" && <p id={field + "-error"} className="mt-2 text-sm" role="alert">Enter a campaign name before trying this example.</p>}
        <div className="mt-3 flex flex-wrap gap-2">
          <Button type="button" onClick={simulate}>Simulate save</Button>
          <Button type="button" variant="outline" onClick={() => {setOutcome("idle");setCampaign("");}}>Reset</Button>
        </div>
        {pattern === "inline" && outcome === "success" &&
          <p role="status" className="mt-3 text-sm">Example saved locally in the demonstration state. No real save occurred.</p>}
        {pattern === "toast" && outcome === "success" &&
          <div role="status" className="mt-3 max-w-sm rounded-lg border border-border bg-background p-3 text-sm">
            Example complete. This is a non-timed, accessible toast teaching specimen.
            <Button type="button" size="sm" variant="outline" className="ml-2" onClick={() => setOutcome("idle")}>Dismiss</Button>
          </div>}
        {pattern === "alert" && outcome === "failure" &&
          <div role="alert" className="mt-3 rounded-lg border border-border bg-background p-4 text-sm">
            <p className="font-semibold">Example save failed</p>
            <p className="mt-2">A fictional connection error was simulated. The entered campaign name is preserved.</p>
            <Button type="button" variant="outline" className="mt-3" onClick={() => setOutcome("success")}>Simulate recovery</Button>
          </div>}
        {pattern === "alert" && outcome === "success" &&
          <p role="status" className="mt-3 text-sm">Recovered in this local demonstration only. No real save occurred.</p>}
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-border p-4"><h3 className="font-semibold">When to use it</h3><p className="mt-2 text-sm leading-6">{current.best}</p></div>
        <div className="rounded-xl border border-border p-4"><h3 className="font-semibold">Tradeoff</h3><p className="mt-2 text-sm leading-6">{current.tradeoff}</p></div>
      </div>
      <p className="text-xs leading-5 text-muted">
        Compare announcement priority: validation references its field, success uses a polite
        status, and serious failure uses a persistent alert with recovery. Real products must
        confirm backend outcomes before showing success. Useful for GTM Revenue OS campaign edits
        and Builder Academy exercise feedback.
      </p>
    </section>
  );
}
