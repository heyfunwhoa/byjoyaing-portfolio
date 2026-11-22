"use client";

import { useId, useState } from "react";
import { Button } from "@/components/ui/button";
import { guidedExercises } from "@/lib/design-lab-guided-exercises";

export function GuidedPracticeExplorer() {
  const headingId = useId();
  const [selected, setSelected] = useState(guidedExercises[0].id);
  const [choice, setChoice] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [usedSuggestion, setUsedSuggestion] = useState(false);
  const exercise = guidedExercises.find((item) => item.id === selected) ?? guidedExercises[0];
  const picked = exercise.choices.find((item) => item.id === choice);

  const selectExercise = (id: string) => {
    setSelected(id);
    setChoice(null);
    setRevealed(false);
    setUsedSuggestion(false);
  };

  return (
    <section id="guided-practice" aria-labelledby={headingId} className="space-y-5">
      <div>
        <p className="editorial-eyebrow text-accent">Start here · practical UI/UX exercises</p>
        <h2 id={headingId} className="mt-2 font-display text-2xl">Learn to make design decisions</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
          Pick one of five real-world design problems, choose a pattern, compare its tradeoffs,
          and open the matching interactive demonstration. These are suggested solutions, not grades.
          Your choices stay in this browser session only and are not recorded.
        </p>
      </div>
      <div className="grid gap-5 lg:grid-cols-[minmax(0,16rem)_minmax(0,1fr)]">
        <nav aria-label="Choose a practical exercise" className="flex flex-wrap gap-2 lg:flex-col">
          {guidedExercises.map((item, index) => (
            <button key={item.id} type="button"
              aria-current={selected === item.id ? "true" : undefined}
              onClick={() => selectExercise(item.id)}
              className={"min-h-11 rounded-lg border px-3 py-3 text-left text-sm focus-visible:outline-2 focus-visible:outline-offset-2 " +
                (selected === item.id ? "border-foreground bg-foreground text-background" : "border-border bg-card")}>
              <span className="block font-medium">{index + 1}. {item.title}</span>
            </button>
          ))}
        </nav>
        <article className="min-w-0 rounded-xl border border-border bg-card p-4 sm:p-5">
          <p className="text-xs font-semibold text-accent">Design problem · {exercise.project}</p>
          <h3 className="mt-2 font-display text-xl">{exercise.title}</h3>
          <p className="mt-3 text-sm leading-6"><strong>User task:</strong> {exercise.userTask}</p>
          <fieldset className="mt-5 space-y-3">
            <legend className="font-semibold">{exercise.decision}</legend>
            {exercise.choices.map((option) => (
              <label key={option.id} className="flex min-h-11 cursor-pointer items-start gap-3 rounded-lg border border-border bg-background p-3">
                <input type="radio" name={headingId + "-choice"} value={option.id}
                  checked={choice === option.id}
                  onChange={() => {setChoice(option.id); setRevealed(false); setUsedSuggestion(false);}}
                  className="mt-1 size-4 shrink-0 accent-current" />
                <span className="text-sm font-medium">{option.label}</span>
              </label>
            ))}
          </fieldset>
          <p className="mt-3 text-sm text-muted">Select an option to compare your answer, or choose Compare my decision to see a suggested starting point.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button type="button" onClick={() => {
              if (!choice) {
                setChoice(exercise.suggested);
                setUsedSuggestion(true);
              } else {
                setUsedSuggestion(false);
              }
              setRevealed(true);
            }}>
              Compare my decision
            </Button>
            <Button type="button" variant="outline" onClick={() => {setChoice(null);setRevealed(false);setUsedSuggestion(false);}}>
              Reset answer
            </Button>
          </div>
          {revealed && picked && (
            <div aria-live="polite" className="mt-5 space-y-3 rounded-lg border border-border bg-background p-4 text-sm leading-6">
              <h4 className="font-semibold">Worked example and tradeoffs</h4>
              {usedSuggestion && <p>Since no option was selected, this example starts with the suggested approach. You can choose another option and compare again.</p>}
              <p><strong>{usedSuggestion ? "Suggested example" : "Your choice"}:</strong> {picked.label}. {picked.tradeoff}</p>
              <p><strong>Suggested starting point:</strong> {exercise.choices.find((option) => option.id === exercise.suggested)?.label}</p>
              <p>{exercise.why}</p>
              <p><strong>When the decision changes:</strong> {exercise.followUp}</p>
            </div>
          )}
          <div className="mt-5 rounded-lg border border-border p-4">
            <h4 className="font-semibold">Practice with the working example</h4>
            <p className="mt-2 text-sm leading-6">{exercise.test}</p>
            <a href={"#" + exercise.destination} className="mt-3 inline-flex min-h-11 items-center text-sm font-medium text-accent underline">
              Open the related Design Lab demonstration
            </a>
          </div>
          <p className="mt-4 text-xs text-muted">
            Self-check: Can you name the user task, explain one tradeoff, and identify the
            missing validation needed before this pattern ships in a real application?
          </p>
        </article>
      </div>
    </section>
  );
}
