"use client";

import { useState } from "react";
import { MissionLayout } from "@/components/academy/mission-layout";
import { FrontendExample } from "./frontend-example";
import { FrontendGlossary } from "./frontend-glossary";
import {
  feedbackForFrontendChoice,
  frontendChecks,
  frontendLessonAnalogy,
  frontendLessonObjective,
  frontendNextSteps,
  frontendPractice,
  frontendTransfer,
  frontendVerificationExample,
  frontendVocabulary,
  type FrontendChoiceGroup,
} from "@/lib/academy/frontend-lesson";

const steps = ["Understand", "See", "Try", "Explain"] as const;

const control =
  "rounded-lg border border-border bg-card px-4 py-3 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

function ChoiceGroup({
  group,
  selected,
  onSelect,
  onReset,
}: {
  group: FrontendChoiceGroup;
  selected: string | null;
  onSelect: (choiceId: string) => void;
  onReset: () => void;
}) {
  const result = selected
    ? feedbackForFrontendChoice(group.id, selected)
    : null;
  return (
    <fieldset className="space-y-3">
      <legend className="text-sm leading-6 font-semibold">
        {group.prompt}
      </legend>
      {group.choices.map((choice) => (
        <label
          key={choice.id}
          className="flex min-h-11 cursor-pointer items-start gap-3 text-sm leading-6"
        >
          <input
            className="mt-1 accent-accent"
            type="radio"
            name={`frontend-${group.id}`}
            value={choice.id}
            checked={selected === choice.id}
            onChange={() => onSelect(choice.id)}
          />
          <span>{choice.label}</span>
        </label>
      ))}
      <button type="button" className={control} onClick={onReset}>
        {group.resetLabel}
      </button>
      {result ? (
        <p
          role="status"
          className="rounded-lg bg-background p-3 text-sm leading-6"
        >
          <strong>{result.correct ? "Correct. " : "Review. "}</strong>
          {result.feedback}
        </p>
      ) : null}
    </fieldset>
  );
}

export function FrontendLesson({
  onSelectLesson,
}: {
  onSelectLesson: (slug: string, keepPath: boolean) => void;
}) {
  const [practiceChoice, setPracticeChoice] = useState<string | null>(null);
  const [showVerification, setShowVerification] = useState(false);
  const [checks, setChecks] = useState<Record<string, string | null>>({});
  const [notes, setNotes] = useState("");
  const [step, setStep] = useState(0);
  const [exampleView, setExampleView] = useState("explain");

  return (
    <section
      aria-labelledby="frontend-lesson-title"
      className="mt-7 min-w-0 rounded-xl border border-border bg-background p-4 sm:p-6"
    >
      <p className="text-xs font-semibold tracking-widest text-accent uppercase">
        Guided lesson · Fictional project card
      </p>
      <h3
        id="frontend-lesson-title"
        className="mt-2 font-display text-2xl break-words"
      >
        Diagnose one project card
      </h3>
      <p className="mt-3 text-sm leading-6">{frontendLessonObjective}</p>
      <FrontendGlossary />
      <MissionLayout
        steps={steps}
        step={step}
        onStep={setStep}
        embedded
        headingId="frontend-step"
      >
        {step === 0 && (
          <div id="frontend-understand" tabIndex={-1} className="space-y-4">
            <p className="mt-3 text-sm leading-6">{frontendLessonAnalogy}</p>
            <dl className="mt-4 space-y-3">
              {frontendVocabulary.map((item) => (
                <div key={item.term}>
                  <dt className="text-sm font-semibold">{item.term}</dt>
                  <dd className="text-sm leading-6 text-muted">
                    {item.meaning}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        )}
        {step === 1 && (
          <FrontendExample view={exampleView} onView={setExampleView} />
        )}
        {step === 2 && (
          <>
            <div id="frontend-practice" tabIndex={-1} className="space-y-4">
              <h5 className="text-lg font-semibold">Practice</h5>
              <ChoiceGroup
                group={frontendPractice}
                selected={practiceChoice}
                onSelect={setPracticeChoice}
                onReset={() => {
                  setPracticeChoice(null);
                  setShowVerification(false);
                }}
              />
              <div className="rounded-lg border border-border p-4">
                <p className="text-sm leading-6 font-semibold">
                  What would you verify after the change?
                </p>
                <button
                  type="button"
                  className={`${control} mt-3`}
                  aria-expanded={showVerification}
                  onClick={() => setShowVerification((current) => !current)}
                >
                  {showVerification
                    ? "Hide the example answer"
                    : "Show an example answer"}
                </button>
                {showVerification ? (
                  <p className="mt-3 text-sm leading-6">
                    {frontendVerificationExample}
                  </p>
                ) : (
                  <p className="mt-3 text-sm leading-6 text-muted">
                    The example stays hidden until you ask for it.
                  </p>
                )}
              </div>
            </div>

            <div
              id="frontend-checks"
              tabIndex={-1}
              className="mt-6 scroll-mt-6 space-y-6 border-t border-border pt-6"
            >
              <h5 className="text-lg font-semibold">Check understanding</h5>
              <p className="text-sm leading-6 text-muted">
                Each choice explains itself. A correct choice does not mark this
                lesson reviewed and is not a mastery result.
              </p>
              {frontendChecks.map((group) => (
                <ChoiceGroup
                  key={group.id}
                  group={group}
                  selected={checks[group.id] ?? null}
                  onSelect={(choiceId) =>
                    setChecks((current) => ({
                      ...current,
                      [group.id]: choiceId,
                    }))
                  }
                  onReset={() =>
                    setChecks((current) => ({ ...current, [group.id]: null }))
                  }
                />
              ))}
            </div>
          </>
        )}
        {step === 3 && (
          <>
            <div id="frontend-apply" tabIndex={-1} className="space-y-4">
              <h5 className="text-lg font-semibold">Apply independently</h5>
              <p className="mt-3 text-sm leading-6">
                {frontendTransfer.prompt}
              </p>
              <label
                className="mt-4 block text-sm font-semibold"
                htmlFor="frontend-notes"
              >
                Your diagnosis notes
                <textarea
                  id="frontend-notes"
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                  rows={5}
                  className="mt-2 w-full rounded-lg border border-border bg-card p-3 text-sm leading-6 font-normal"
                />
              </label>
              <p className="mt-2 text-sm leading-6 text-muted">
                These notes stay in this tab. They are not submitted, saved, or
                scored. Written self-review is separate from the checked choices
                above.
              </p>
              <details className="mt-4 rounded-lg border border-border bg-card">
                <summary className="min-h-11 cursor-pointer px-4 py-3 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
                  Self-review rubric
                </summary>
                <ul className="list-disc space-y-2 px-8 pb-4 text-sm leading-6">
                  {frontendTransfer.rubric.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </details>
            </div>

            <div
              id="frontend-next"
              tabIndex={-1}
              className="mt-6 scroll-mt-6 border-t border-border pt-6"
            >
              <h5 className="text-lg font-semibold">Where to go next</h5>
              <p className="mt-3 text-sm leading-6 text-muted">
                Build on this lesson by testing a component in the Design Lab or
                exploring where its content comes from.
              </p>
              <div className="mt-4 flex flex-col gap-3">
                {frontendNextSteps.map((step) => (
                  <button
                    key={step.slug}
                    type="button"
                    className={`${control} min-h-11 text-left`}
                    onClick={() => onSelectLesson(step.slug, step.keepPath)}
                  >
                    <span className="block">{step.label}</span>
                    <span className="mt-1 block font-normal text-muted">
                      {step.reason}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </MissionLayout>
    </section>
  );
}
