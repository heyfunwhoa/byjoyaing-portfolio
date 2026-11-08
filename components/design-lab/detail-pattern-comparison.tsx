"use client";

import { useId, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog, DialogContent, DialogDescription, DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet, SheetContent, SheetDescription, SheetTitle,
} from "@/components/ui/sheet";

export const detailPatterns = [
  { id: "inline", label: "Inline detail", best: "Small optional explanations that should remain alongside their record.", tradeoff: "Long detail can push the next record far down the page." },
  { id: "sheet", label: "Side sheet", best: "Inspecting extensive evidence while preserving where the record came from.", tradeoff: "On narrow screens the sheet occupies much of the viewport." },
  { id: "dialog", label: "Modal dialog", best: "A focused decision or brief action that temporarily interrupts the task.", tradeoff: "Interrupts scanning; avoid for routine, lengthy record exploration." },
] as const;

type DetailPattern = (typeof detailPatterns)[number]["id"];

function Evidence() {
  return (
    <div className="space-y-3 text-sm leading-6">
      <p><strong>Fictional record:</strong> Northstar Security</p>
      <p><strong>Observation:</strong> A publicly announced service expansion.</p>
      <p><strong>Source:</strong> Synthetic teaching fixture, not a verified business source.</p>
      <p><strong>Interpretation:</strong> An expansion can warrant research. It does not establish buying intent.</p>
      <p><strong>Unknown:</strong> Operational pressure, budget, decision-maker and timing.</p>
    </div>
  );
}

export function DetailPatternComparison() {
  const heading = useId();
  const detailId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [pattern, setPattern] = useState<DetailPattern>("inline");
  const [open, setOpen] = useState(false);
  const current = detailPatterns.find((option) => option.id === pattern)!;

  function choose(next: DetailPattern) {
    setOpen(false);
    setPattern(next);
  }

  return (
    <section aria-labelledby={heading} className="space-y-4">
      <div>
        <p className="editorial-eyebrow text-accent">Pattern comparison · context</p>
        <h2 id={heading} className="mt-2 font-display text-2xl">Inline, sheet, or dialog?</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
          Inspect the same fictional account evidence three ways. The real Radix dialog
          and sheet handle modal focus, Escape, and focus return; inline disclosure keeps the surrounding page available.
        </p>
      </div>
      <div role="group" aria-label="Evidence detail patterns" className="flex flex-wrap gap-2">
        {detailPatterns.map((option) => (
          <Button key={option.id} type="button" aria-pressed={pattern === option.id}
            variant={pattern === option.id ? "default" : "outline"}
            onClick={() => choose(option.id)}>{option.label}</Button>
        ))}
      </div>
      <div className="rounded-xl border border-border bg-card p-4">
        <p className="text-xs text-muted">Synthetic account record</p>
        <h3 className="mt-1 font-semibold">Northstar Security</h3>
        <p className="mt-2 text-sm leading-6">Possible service expansion, pending source review.</p>
        <Button ref={triggerRef} type="button" className="mt-3" variant="outline"
          aria-expanded={pattern === "inline" ? open : undefined}
          aria-controls={pattern === "inline" ? detailId : undefined}
          onClick={() => setOpen((value) => !value)}>
          {open && pattern === "inline" ? "Hide evidence" : "Inspect evidence"}
        </Button>
        {pattern === "inline" && open && (
          <div id={detailId} className="mt-4 rounded-lg border border-border bg-background p-4">
            <Evidence />
          </div>
        )}
      </div>
      <Sheet open={pattern === "sheet" && open} onOpenChange={setOpen}>
        <SheetContent side="right" className="overflow-y-auto" onCloseAutoFocus={(event) => { event.preventDefault(); triggerRef.current?.focus(); }}>
          <div className="p-5 pt-14">
            <SheetTitle>Northstar evidence</SheetTitle>
            <SheetDescription className="mt-2">Review the same record without leaving its source list.</SheetDescription>
            <div className="mt-5"><Evidence /></div>
          </div>
        </SheetContent>
      </Sheet>
      <Dialog open={pattern === "dialog" && open} onOpenChange={setOpen}>
        <DialogContent onCloseAutoFocus={(event) => { event.preventDefault(); triggerRef.current?.focus(); }}>
          <DialogTitle>Northstar evidence</DialogTitle>
          <DialogDescription>A focused view of the same synthetic evidence.</DialogDescription>
          <Evidence />
        </DialogContent>
      </Dialog>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-border p-4"><h3 className="font-semibold">Best use</h3><p className="mt-2 text-sm leading-6">{current.best}</p></div>
        <div className="rounded-xl border border-border p-4"><h3 className="font-semibold">Tradeoff</h3><p className="mt-2 text-sm leading-6">{current.tradeoff}</p></div>
      </div>
      <p className="text-xs leading-5 text-muted">
        Apply to Account Signal Engine evidence inspection, Security Market Map citations,
        and GTM Revenue OS opportunity detail. This demo does not verify evidence or authorize access.
        Try Escape, Tab, close, and returning to the triggering button.
      </p>
    </section>
  );
}
