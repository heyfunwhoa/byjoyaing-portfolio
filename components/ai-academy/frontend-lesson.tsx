"use client";

import { useState, type ComponentType, type ReactNode } from "react";

const action =
  "inline-flex min-h-11 items-center rounded-lg border border-border px-4 py-2 text-sm text-accent underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
const questions = [
  {
    title: "Guided practice",
    question:
      "A fictional card has the expected title and summary on desktop, but a long title runs outside its boundary on a phone. What should you investigate first?",
    choices: [
      [
        "Content source/props",
        "The words are correct in this scenario. Inspect props when the words themselves are wrong.",
      ],
      [
        "Styling and responsive layout",
        "Inspect wrapping, minimum widths and layout at the failing viewport.",
      ],
      [
        "Replace the application framework",
        "This evidence does not justify a framework change. Isolate the local layout rule first.",
      ],
    ],
    correct: 1,
  },
  {
    title: "Check A",
    question:
      "A card is readable and correctly styled, but ‘Read the project’ opens a missing page. Where should you investigate first?",
    choices: [
      [
        "The href, matching route and deployed revision",
        "Inspect the navigation chain and test the actual destination. A correct-looking card does not prove its route exists.",
      ],
      ["Increase padding", "Spacing does not create a missing route."],
      ["Add an animation library", "Motion does not fix the destination."],
    ],
    correct: 0,
  },
  {
    title: "Check B",
    question:
      "A clickable div works with a mouse but cannot be reached by keyboard. What is the best first repair for navigation?",
    choices: [
      [
        "Use a semantic anchor with a valid href, descriptive text and visible focus; test keyboard activation",
        "Navigation should be a link. Verify its accessible name, focus and keyboard activation as well as its destination.",
      ],
      ["Add a hover effect", "Hover does not provide keyboard operation."],
      [
        "Mark the lesson reviewed",
        "Reading review is not a repair or an accessibility test.",
      ],
    ],
    correct: 0,
  },
];

function NativeSection({ children, id }: { children: ReactNode; id: string }) {
  return (
    <section
      id={id}
      className="mt-7 min-w-0 scroll-mt-6 border-t border-border pt-6"
    >
      {children}
    </section>
  );
}

// Section substitution is used only by the isolated comparison harness.
export function FrontendLesson({
  onSelectLesson,
  Section = NativeSection,
}: {
  onSelectLesson: (slug: string) => void;
  Section?: ComponentType<{ children: ReactNode; id: string }>;
}) {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  return (
    <div data-testid="frontend-lesson" className="min-w-0">
      <p className="mt-5 leading-7">
        You will trace a project card through its content, component, styling
        and link, then choose where to investigate a problem. No earlier lesson
        is required; Programming Foundations is optional preparation.
      </p>
      <nav
        aria-label="Frontend lesson sections"
        className="mt-4 flex flex-wrap gap-2"
      >
        {[
          ["understand", "Understand"],
          ["example", "Worked example"],
          ["practice", "Practice"],
          ["checks", "Check understanding"],
          ["transfer", "Apply independently"],
          ["next", "Next"],
        ].map(([id, label]) => (
          <a key={id} className={action} href={`#frontend-${id}`}>
            {label}
          </a>
        ))}
      </nav>
      <Section id="frontend-understand">
        <h3 className="text-xl font-semibold">Understand the layers</h3>
        <p className="mt-3 leading-7">
          A card is like a labeled display: content supplies the words, a
          component organizes them, styling controls appearance, and links or
          controls determine what happens. This analogy does not explain data
          fetching or server authorization.
        </p>
        <dl className="mt-4 space-y-3">
          {[
            [
              "Component",
              "A reusable piece of interface that renders content.",
            ],
            [
              "Props",
              "Values passed into a component, such as a title and summary.",
            ],
            [
              "Styling",
              "Rules for spacing, color, wrapping and responsive layout.",
            ],
            ["Route", "The application location reached by a URL."],
            [
              "Verification",
              "A specific check that provides evidence about intended behavior.",
            ],
          ].map(([term, meaning]) => (
            <div key={term}>
              <dt className="font-semibold">{term}</dt>
              <dd className="leading-7">{meaning}</dd>
            </div>
          ))}
        </dl>
      </Section>
      <Section id="frontend-example">
        <h3 className="text-xl font-semibold">
          Worked example: one fictional project card
        </h3>
        <p className="mt-3 leading-7">
          This selectable code is an example, not executed. The props provide
          the words and destination.
        </p>
        <pre
          tabIndex={0}
          aria-label="ProjectCard code example"
          className="mt-4 max-w-full overflow-x-auto rounded-lg bg-background p-4 text-sm leading-6 focus-visible:outline-2 focus-visible:outline-accent"
        >
          <code>{`type ProjectCardProps = { title: string; summary: string; href: string };

export function ProjectCard({ title, summary, href }: ProjectCardProps) {
  return (
    <article className="rounded-xl border p-6">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="mt-2 text-sm">{summary}</p>
      <a className="mt-4 inline-block underline focus-visible:outline-2" href={href}>
        Read the project
      </a>
    </article>
  );
}`}</code>
        </pre>
        <article
          aria-label="Rendered fictional project card"
          className="mt-4 rounded-xl border border-border p-6"
        >
          <h4 className="text-xl font-semibold">Fictional event guide</h4>
          <p className="mt-2 leading-7">
            A teaching example for tracing content, styling and a link.
          </p>
          <a className={`${action} mt-4`} href="#frontend-practice">
            Read the fictional project practice
          </a>
        </article>
        <ol className="mt-4 list-decimal space-y-2 pl-6 leading-7">
          <li>Title and summary props supply content.</li>
          <li>Article, heading and anchor supply semantic structure.</li>
          <li>Tailwind utilities supply layout and visual styling.</li>
          <li>
            The href supplies the destination. Test it: appearance does not
            prove a route exists.
          </li>
          <li>
            Focus styles and keyboard operation help make navigation usable.
          </li>
        </ol>
      </Section>
      <Section id="frontend-practice">
        <h3 className="text-xl font-semibold">Guided practice</h3>
        {renderQuestion(0)}
        <p className="mt-4 leading-7">
          What would you verify after the change? Explain your answer before
          revealing the example.
        </p>
        <details className="mt-3">
          <summary className={action}>Reveal an example verification</summary>
          <p className="mt-3 leading-7">
            Check long and short titles at narrow widths and 200% zoom, with
            readable text and no unintended page-level horizontal scroll. A
            viewport check alone does not prove all accessibility requirements.
          </p>
        </details>
      </Section>
      <Section id="frontend-checks">
        <h3 className="text-xl font-semibold">Check understanding</h3>
        <p className="mt-3 leading-7">
          Choose an answer for each check and read its explanation. Answers stay
          in this session and do not mark reading reviewed or demonstrate
          mastery.
        </p>
        {renderQuestion(1)}
        {renderQuestion(2)}
        <button
          type="button"
          className={`${action} mt-4`}
          onClick={() => setAnswers({})}
        >
          Reset practice and checks
        </button>
      </Section>
      <Section id="frontend-transfer">
        <h3 className="text-xl font-semibold">Apply independently</h3>
        <p className="mt-3 leading-7">
          An event card has correct text, fits a phone, and opens the right
          page, but several links all say ‘Click here.’ Identify the concern,
          propose a better label, and explain how you would verify it.
        </p>
        <p className="mt-3 leading-7">
          Write your response in your own notes. Nothing is submitted, saved or
          graded here.
        </p>
        <details className="mt-3">
          <summary className={action}>Open the self-review rubric</summary>
          <ul className="mt-3 list-disc space-y-2 pl-6 leading-7">
            <li>
              Identify link purpose, accessibility and clarity rather than
              framework choice.
            </li>
            <li>
              Propose a contextual label, such as ‘Read the fictional event
              agenda.’
            </li>
            <li>
              Check the rendered accessible name, keyboard focus/activation and
              destination.
            </li>
            <li>
              State a limit: this does not prove complete accessibility or
              learner mastery.
            </li>
          </ul>
        </details>
        <a
          className={`${action} mt-4`}
          href="https://github.com/heyfunwhoa/byjoyaing-portfolio/blob/main/docs/builder-academy/editorial-project-card.md"
        >
          Continue the independent project-card exercise
        </a>
      </Section>
      <Section id="frontend-next">
        <h3 className="text-xl font-semibold">Next step</h3>
        <p className="mt-3 leading-7">
          Inspect component states with Storybook and visual regression, or
          explore how a CMS supplies editable content.
        </p>
        <div className="mt-3 flex flex-wrap gap-3">
          <button
            className={action}
            type="button"
            onClick={() => onSelectLesson("storybook-visual-regression")}
          >
            Explore Storybook and visual regression
          </button>
          <button
            className={action}
            type="button"
            onClick={() => onSelectLesson("cms-fundamentals")}
          >
            Explore CMS fundamentals
          </button>
        </div>
      </Section>
    </div>
  );

  function renderQuestion(index: number) {
    const q = questions[index];
    const selected = answers[index];
    return (
      <fieldset className="mt-5 min-w-0 rounded-lg border border-border p-4">
        <legend className="px-2 font-semibold">{q.title}</legend>
        <p className="mb-3 leading-7">{q.question}</p>
        <div className="space-y-2">
          {q.choices.map(([label], choice) => (
            <label
              key={label}
              className="flex min-h-11 cursor-pointer items-start gap-3 rounded p-2 leading-6 has-focus-visible:outline-2 has-focus-visible:outline-accent"
            >
              <input
                type="radio"
                name={`frontend-question-${index}`}
                className="mt-1 accent-accent"
                checked={selected === choice}
                aria-describedby={`frontend-feedback-${index}`}
                onChange={() =>
                  setAnswers((previous) => ({ ...previous, [index]: choice }))
                }
              />
              <span>{label}</span>
            </label>
          ))}
        </div>
        <p
          id={`frontend-feedback-${index}`}
          role="status"
          aria-live="polite"
          className="mt-3 leading-7"
        >
          {selected === undefined ? (
            "Choose an answer to see its reasoning."
          ) : (
            <>
              <strong>
                {selected === q.correct ? "Correct. " : "Review: "}
              </strong>
              {q.choices[selected][1]}
            </>
          )}
        </p>
      </fieldset>
    );
  }
}
