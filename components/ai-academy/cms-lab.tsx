"use client";

import { useState } from "react";
import {
  cmsExercises,
  evaluateCmsChoice,
  type CmsExerciseId,
} from "@/lib/ai-academy/cms-lab";

const choiceLabel =
  "flex cursor-pointer items-start gap-3 rounded-lg border border-border bg-card p-3 text-sm leading-6";

type Attempt = { choice: number | null; reviewed: boolean };

const initialAttempts: Record<CmsExerciseId, Attempt> = {
  architecture: { choice: null, reviewed: false },
  schema: { choice: null, reviewed: false },
  publishing: { choice: null, reviewed: false },
};

export function CmsLab() {
  const [attempts, setAttempts] = useState(initialAttempts);

  function select(id: CmsExerciseId, choice: number) {
    setAttempts((current) => ({
      ...current,
      [id]: { choice, reviewed: false },
    }));
  }

  function review(id: CmsExerciseId) {
    setAttempts((current) => ({
      ...current,
      [id]: { ...current[id], reviewed: true },
    }));
  }

  function reset(id: CmsExerciseId) {
    setAttempts((current) => ({
      ...current,
      [id]: { choice: null, reviewed: false },
    }));
  }

  return (
    <section
      aria-label="CMS fundamentals practice"
      className="mt-7 rounded-xl border border-border bg-background p-4 sm:p-6"
    >
      <p className="text-xs font-semibold tracking-widest text-accent uppercase">
        Practice lab · Public and fictional scenarios
      </p>
      <h3 className="mt-2 font-display text-2xl">
        Decide the architecture, the schema, and the rollback
      </h3>
      <p className="mt-2 text-sm leading-6 text-muted">
        Three short decisions. Feedback compares your choice with this
        lesson&apos;s guidance. Nothing is saved, and a correct answer does not
        mark this lesson practiced or passed. Do not enter private content.
      </p>
      <div className="mt-6 space-y-8">
        {cmsExercises.map((exercise) => {
          const attempt = attempts[exercise.id];
          const result = attempt.reviewed
            ? evaluateCmsChoice(exercise.id, attempt.choice)
            : null;
          return (
            <fieldset key={exercise.id} className="space-y-3">
              <legend className="text-sm font-semibold">
                {exercise.title}
              </legend>
              <p className="text-sm leading-6 text-muted">
                <strong>Objective.</strong> {exercise.objective}
              </p>
              <p className="text-sm leading-6">{exercise.scenario}</p>
              <p className="text-sm font-semibold">{exercise.question}</p>
              {exercise.choices.map((option, index) => (
                <label key={option.text} className={choiceLabel}>
                  <input
                    type="radio"
                    name={`cms-${exercise.id}`}
                    className="mt-1 accent-accent"
                    checked={attempt.choice === index}
                    onChange={() => select(exercise.id, index)}
                  />
                  <span>{option.text}</span>
                </label>
              ))}
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  disabled={attempt.choice === null}
                  onClick={() => review(exercise.id)}
                  className="rounded-lg bg-accent px-4 py-3 text-sm font-semibold text-accent-foreground disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Check this decision
                </button>
                <button
                  type="button"
                  onClick={() => reset(exercise.id)}
                  className="rounded-lg border border-border bg-card px-4 py-3 text-sm font-semibold"
                >
                  Reset
                </button>
              </div>
              {result ? (
                <div
                  role="status"
                  aria-live="polite"
                  className="rounded-lg border border-border bg-card p-4 text-sm leading-6"
                >
                  <p className="font-semibold">
                    {result.correct
                      ? "This matches the lesson guidance."
                      : "Review this choice."}
                  </p>
                  <p className="mt-1 text-muted">{result.explanation}</p>
                  <p className="mt-3 text-muted">
                    <strong>What this check verifies:</strong>{" "}
                    {exercise.verifies}
                  </p>
                  <ul className="mt-3 space-y-3">
                    {exercise.sources.map((source) => (
                      <li key={source.url}>
                        <a
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-accent underline underline-offset-2"
                        >
                          {source.label} ↗
                        </a>
                        <p className="mt-1 text-muted">
                          <strong>Supports:</strong> {source.supports}
                        </p>
                        <p className="mt-1 text-muted">
                          <strong>Does not prove:</strong> {source.doesNotProve}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </fieldset>
          );
        })}
      </div>
    </section>
  );
}
