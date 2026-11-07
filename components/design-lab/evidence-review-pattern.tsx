"use client";

import { useId, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  evidenceReviewLabels,
  evidenceReviewReadiness,
  evidenceReviewScenarios,
  evidenceReviewStates,
  type EvidenceReviewScenario,
  type EvidenceReviewState,
} from "@/lib/design-lab/evidence-review";

/**
 * A presentational, domain-neutral summary → source → next-question pattern.
 * The consuming app must own data loading, source rights, review authorization,
 * actual action handling and audit history. This component never writes data.
 */
export function EvidenceReviewPattern({ record }: { record: EvidenceReviewScenario }) {
  const headingId = useId();
  const previewId = useId();
  const [showQuestion, setShowQuestion] = useState(false);
  const readiness = evidenceReviewReadiness(record);

  return (
    <section aria-labelledby={headingId} className="min-w-0">
      <div className="grid min-w-0 gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
        <Card className="min-w-0">
          <CardHeader>
            <p className="editorial-eyebrow text-accent">1. Summary</p>
            <CardTitle>
              <h3 id={headingId} className="text-lg font-semibold">
                {record.title}
              </h3>
            </CardTitle>
            <CardDescription>
              This hypothesis and all source records are invented for the Design Lab.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm leading-6">{record.summary}</p>
            <div className="rounded-lg border border-border bg-background p-3 text-sm leading-6">
              <p className="font-semibold">Interpretation, not an established fact</p>
              <p className="mt-1 text-muted">{record.interpretation}</p>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm">
                <span className="font-semibold">Source review state:</span>{" "}
                {evidenceReviewLabels[record.id]}
              </p>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline">Inspect source details</Button>
                </SheetTrigger>
                <SheetContent side="right" className="min-w-0 overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>Fictional source details</SheetTitle>
                    <SheetDescription>
                      Read the source record, limits and review state. Nothing here
                      certifies a real-world observation.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="space-y-4 px-4 pb-6 text-sm leading-6">
                    <dl className="grid gap-3">
                      <div>
                        <dt className="font-semibold">Source</dt>
                        <dd className="break-words text-muted">{record.source.label}</dd>
                      </div>
                      <div>
                        <dt className="font-semibold">Fixture reference</dt>
                        <dd className="break-words font-mono text-xs">
                          {record.source.id ?? "None attached"}
                        </dd>
                      </div>
                      <div>
                        <dt className="font-semibold">Observed on</dt>
                        <dd>{record.source.observedOn ?? "Unknown"}</dd>
                      </div>
                      <div>
                        <dt className="font-semibold">Reviewed on</dt>
                        <dd>{record.source.reviewedOn ?? "Not reviewed"}</dd>
                      </div>
                      <div>
                        <dt className="font-semibold">Observation in source</dt>
                        <dd>{record.source.observation ?? "Not available for inspection"}</dd>
                      </div>
                      <div>
                        <dt className="font-semibold">Review limitation</dt>
                        <dd className="text-muted">{record.source.reviewNote}</dd>
                      </div>
                    </dl>
                    <p className="rounded-lg border border-border bg-surface-mist p-3 text-xs leading-5">
                      A source label, date or status is not a security control, a
                      verified market claim, or approval to take action.
                    </p>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </CardContent>
        </Card>

        <Card className="min-w-0">
          <CardHeader>
            <p className="editorial-eyebrow text-accent">2. Evidence gate → 3. Next question</p>
            <CardTitle>
              {readiness.canProposeNextStep
                ? "Ready for a human review question"
                : "Not ready for an evidence-based decision"}
            </CardTitle>
            <CardDescription>
              This is a display-only preview, not an approval or workflow execution.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="rounded-lg border border-border bg-background p-3 text-sm leading-6">
              {readiness.message}
            </p>
            <Button
              variant="outline"
              aria-expanded={showQuestion}
              aria-controls={previewId}
              onClick={() => setShowQuestion((value) => !value)}
            >
              {showQuestion ? "Hide review question" : "Preview review question"}
            </Button>
            <div id={previewId}>
              {showQuestion ? (
                <div role="status" className="rounded-lg border border-border bg-surface-sage p-3">
                  <p className="text-sm font-semibold">Example reviewer question</p>
                  <p className="mt-2 text-sm leading-6">{record.nextQuestion}</p>
                  <p className="mt-2 text-xs leading-5 text-muted">
                    Session-only preview. No email, CRM action, permission request,
                    evidence approval or persistent record is created.
                  </p>
                </div>
              ) : (
                <p className="text-xs leading-5 text-muted">
                  A possible follow-up is available for inspection, even when
                  evidence is missing or restricted. It is not sent.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

/** Scenario selector for a Design Lab/Storybook workbench with no network calls. */
export function EvidenceReviewWorkbench() {
  const selectorId = useId();
  const titleId = useId();
  const [state, setState] = useState<EvidenceReviewState>("reviewed");
  const record = evidenceReviewScenarios[state];

  return (
    <section aria-labelledby={titleId} className="min-w-0 space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-2xl">
          <p className="editorial-eyebrow text-accent">Pattern pilot · synthetic data</p>
          <h2 id={titleId} className="mt-2 font-display text-2xl">
            Summary → source → next question
          </h2>
          <p className="mt-2 text-sm leading-6 text-muted">
            Compare a reviewed sample with stale, missing and restricted evidence.
            The summary, interpretation and next-step rules remain visibly separate.
          </p>
        </div>
        <div className="grid min-w-[13rem] gap-2">
          <label htmlFor={selectorId} className="text-sm font-semibold">
            Fictional evidence scenario
          </label>
          <select
            id={selectorId}
            value={state}
            onChange={(event) => setState(event.target.value as EvidenceReviewState)}
            className="min-h-11 rounded-lg border border-border bg-card px-3 text-sm"
          >
            {evidenceReviewStates.map((value) => (
              <option key={value} value={value}>
                {evidenceReviewLabels[value]}
              </option>
            ))}
          </select>
        </div>
      </div>
      <EvidenceReviewPattern key={record.id} record={record} />
      <p className="text-xs leading-5 text-muted">
        Local workbench only. No sources fetched, external events emitted, draft
        records saved or access decisions made. A consuming application must
        supply verified provenance, authorization and its own release evidence.
      </p>
    </section>
  );
}
