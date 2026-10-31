"use client";

import { useState } from "react";
import {
  feedbackForFrontendChoice,
  frontendChecks,
  frontendLessonAnalogy,
  frontendLessonObjective,
  frontendLessonSections,
  frontendNextSteps,
  frontendPractice,
  frontendTransfer,
  frontendVerificationExample,
  frontendVocabulary,
  projectCardExample,
  type FrontendChoiceGroup,
} from "@/lib/academy/frontend-lesson";

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
      <nav
        aria-label="Frontend lesson sections"
        className="mt-4 flex min-w-0 flex-wrap gap-2"
      >
        {frontendLessonSections.map((section) => (
          <a
            key={section.id}
            href={`#frontend-${section.id}`}
            className="inline-flex min-h-11 max-w-full items-center rounded-lg border border-border bg-card px-3 text-left text-sm font-semibold whitespace-normal underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            onClick={(event) => {
              const target = document.getElementById(`frontend-${section.id}`);
              if (!target) return;
              event.preventDefault();
              target.focus();
              target.scrollIntoView({ block: "start" });
            }}
          >
            {section.label}
          </a>
        ))}
      </nav>

      <div
        id="frontend-understand"
        tabIndex={-1}
        className="mt-6 scroll-mt-6 border-t border-border pt-6"
      >
        <h4 className="text-xl font-semibold">Understand</h4>
        <p className="mt-3 text-sm leading-6">{frontendLessonAnalogy}</p>
        <dl className="mt-4 space-y-3">
          {frontendVocabulary.map((item) => (
            <div key={item.term}>
              <dt className="text-sm font-semibold">{item.term}</dt>
              <dd className="text-sm leading-6 text-muted">{item.meaning}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div
        id="frontend-example"
        tabIndex={-1}
        className="mt-6 scroll-mt-6 border-t border-border pt-6"
      >
        <h4 className="text-xl font-semibold">Worked example</h4>
        <p className="mt-3 text-sm leading-6 text-muted">
          The same fictional card, first as a rendered sample and then as
          selectable source. This sample link opens the existing companion
          guide.
        </p>
        <article className="mt-4 max-w-sm rounded-xl border border-border bg-card p-6">
          <h5 className="text-xl font-semibold">{projectCardExample.title}</h5>
          <p className="mt-2 text-sm">{projectCardExample.summary}</p>
          <a
            className="mt-4 inline-flex min-h-11 items-center underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            href={projectCardExample.href}
          >
            {projectCardExample.linkLabel}
          </a>
        </article>
        <div className="mt-4 grid grid-cols-1">
          <div className="min-w-0 overflow-x-auto rounded-lg border border-border bg-card p-4">
            <p className="text-xs text-muted">
              ProjectCard example · selectable text, not a running app
            </p>
            <pre className="mt-2 w-max min-w-full text-sm leading-6">
              <code>{projectCardExample.code}</code>
            </pre>
          </div>
        </div>
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-6">
          {projectCardExample.annotations.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ol>
        <p className="mt-3 text-sm leading-6">
          {projectCardExample.plainLanguage}
        </p>
      </div>

      <div
        id="frontend-practice"
        tabIndex={-1}
        className="mt-6 scroll-mt-6 space-y-4 border-t border-border pt-6"
      >
        <h4 className="text-xl font-semibold">Practice</h4>
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
        <h4 className="text-xl font-semibold">Check understanding</h4>
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
              setChecks((current) => ({ ...current, [group.id]: choiceId }))
            }
            onReset={() =>
              setChecks((current) => ({ ...current, [group.id]: null }))
            }
          />
        ))}
      </div>

      <div
        id="frontend-apply"
        tabIndex={-1}
        className="mt-6 scroll-mt-6 border-t border-border pt-6"
      >
        <h4 className="text-xl font-semibold">Apply independently</h4>
        <p className="mt-3 text-sm leading-6">{frontendTransfer.prompt}</p>
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
        <h4 className="text-xl font-semibold">Next</h4>
        <p className="mt-3 text-sm leading-6 text-muted">
          The catalog exercise, project-card practice link and single knowledge
          check below stay in place. Previous and next in the path use the
          existing sequence.
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
    </section>
  );
}
