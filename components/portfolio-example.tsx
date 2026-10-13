"use client";

import { useState } from "react";
import { DisclosureSection } from "@/components/disclosure-section";
import type { PortfolioExample as Example } from "@/lib/portfolio-examples";

export function PortfolioExample({ example }: { example: Example }) {
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState<number | null>(null);
  const step = example.steps[index];
  return (
    <DisclosureSection
      id="guided-example"
      title={`Try one example: ${example.title}`}
      className="my-6"
    >
      <h2 className="sr-only">Guided example: {example.title}</h2>
      <p className="text-xs font-semibold text-accent">{example.label}</p>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
        {example.limitation}
      </p>
      <ol aria-label="Example steps" className="mt-4 flex flex-wrap gap-2">
        {example.steps.map((item, position) => (
          <li key={item.title}>
            <button
              type="button"
              aria-current={position === index ? "step" : undefined}
              onClick={() => setIndex(position)}
              className={`min-h-11 rounded-lg border px-3 py-2 text-left text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${position === index ? "border-accent bg-accent/10" : "border-border"}`}
            >
              {position + 1}. {item.title}
            </button>
          </li>
        ))}
      </ol>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="mt-5 rounded-xl border border-border bg-background p-4"
      >
        <p className="text-xs text-muted">
          Step {index + 1} of {example.steps.length}
        </p>
        <h3 className="mt-2 text-lg font-semibold">{step.title}</h3>
        <p className="mt-2 text-sm leading-7">{step.body}</p>
      </div>
      {step.source ? (
        <a
          href={step.source.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex min-h-11 items-center text-sm font-medium text-accent underline underline-offset-4"
        >
          {step.source.label}
          <span className="sr-only"> (opens in a new tab)</span> ↗
        </a>
      ) : null}
      {example.question && index === example.steps.length - 1 ? (
        <fieldset className="mt-4 rounded-xl border border-border p-4">
          <legend className="px-2 font-semibold">
            {example.question.prompt}
          </legend>
          {example.question.choices.map((choice, position) => (
            <label
              key={choice}
              className="flex min-h-11 cursor-pointer items-start gap-3 py-2 text-sm leading-6"
            >
              <input
                type="radio"
                name="example-answer"
                className="mt-1.5"
                checked={answer === position}
                onChange={() => setAnswer(position)}
              />
              {choice}
            </label>
          ))}
          {answer !== null ? (
            <p role="status" className="mt-3 text-sm leading-6">
              <strong>
                {answer === example.question.answer
                  ? "Correct. "
                  : "Try again. "}
              </strong>
              {example.question.explanation}
            </p>
          ) : null}
        </fieldset>
      ) : null}
      <div className="mt-4 flex justify-between gap-3">
        <button
          type="button"
          disabled={index === 0}
          onClick={() => setIndex((value) => value - 1)}
          className="min-h-11 rounded-lg border border-border px-4 text-sm disabled:opacity-50"
        >
          Previous step
        </button>
        <button
          type="button"
          disabled={index === example.steps.length - 1}
          onClick={() => setIndex((value) => value + 1)}
          className="min-h-11 rounded-lg border border-border px-4 text-sm disabled:opacity-50"
        >
          Next step
        </button>
      </div>
    </DisclosureSection>
  );
}
