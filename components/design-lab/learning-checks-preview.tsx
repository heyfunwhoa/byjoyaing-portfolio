"use client";

import { useId, useState } from "react";
import { checks, emptyProgress, recordAnswer } from "@/lib/academy/click-mission";

const examples = [
  { id: "unanswered", label: "Not attempted" },
  { id: "retry", label: "Needs another try" },
  { id: "passed", label: "Checks passed" },
] as const;
type Example = (typeof examples)[number]["id"];

/** Local Design Lab fixture only. Never reads or writes learner progress. */
export function LearningChecksPreview() {
  const id = useId();
  const [example, setExample] = useState<Example>("unanswered");
  const progress = example === "unanswered"
    ? emptyProgress()
    : checks.reduce(
        (current, check, index) => recordAnswer(
          current,
          check.id,
          example === "passed" || index === 0 ? check.answer : (check.answer + 1) % check.choices.length,
        ),
        emptyProgress(),
      );

  return (
    <section aria-labelledby={id} className="space-y-5">
      <div className="max-w-2xl">
        <p className="editorial-eyebrow text-accent">Academy · lab prototype</p>
        <h2 id={id} className="mt-2 font-display text-2xl tracking-tight">Check results</h2>
        <p className="mt-3 text-sm leading-6 text-muted">
          Preview results for Follow one click using fictional attempts.
          These controls do not complete a lesson or change saved progress.
        </p>
      </div>
      <fieldset>
        <legend className="text-sm font-semibold">Preview an example</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {examples.map((item) => (
            <label key={item.id} className="flex min-h-11 cursor-pointer items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm">
              <input
                type="radio"
                name={id + "-example"}
                value={item.id}
                checked={example === item.id}
                onChange={() => setExample(item.id)}
                className="accent-accent"
              />
              {item.label}
            </label>
          ))}
        </div>
      </fieldset>
      <div className="rounded-xl border border-border bg-card p-4 sm:p-6">
        <p role="status" className="font-semibold">
          {progress.passedCheckIds.length} of {checks.length} checks passed in this example.
        </p>
        <p className="mt-2 text-sm leading-6 text-muted">
          Reading reviewed: not recorded. Check results and reading acknowledgments are separate.
          Passing a practice check is not a credential.
        </p>
        <ol className="mt-5 space-y-4">
          {checks.map((check) => {
            const passed = progress.passedCheckIds.includes(check.id);
            const attempted = example !== "unanswered";
            return (
              <li key={check.id} className="border-t border-border pt-4">
                <p className="text-sm font-semibold">
                  {passed ? "Passed" : attempted ? "Try again" : "Not attempted"}
                </p>
                <p className="mt-2 text-sm leading-6">{check.question}</p>
                <details key={example} className="mt-2">
                  <summary className="min-h-11 cursor-pointer py-2 text-sm font-medium">
                    {passed ? "Why this answer works" : "Show a hint"}
                  </summary>
                  <p className="text-sm leading-6 text-muted">{passed ? check.explanation : check.hint}</p>
                </details>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
