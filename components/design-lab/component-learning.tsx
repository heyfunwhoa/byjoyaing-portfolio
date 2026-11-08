"use client";

import {
  useId,
  useMemo,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";
import { Button } from "@/components/ui/button";
import { componentOptions } from "@/lib/component-options";
import {
  componentLessons,
  lessonsForExplorer,
  type ComponentLesson,
  type LessonTrack,
} from "@/lib/component-lessons";

const tracks = ["All", "Foundations", "Components"] as const;
const accounts = [
  { name: "Northstar", detail: "Three signals to review." },
  { name: "Horizon", detail: "One signal, dated Nov 6." },
  { name: "Lumen", detail: "No new signals this week." },
];

function TypographyDemo() {
  const [role, setRole] = useState("Title");
  const samples: Record<string, ReactNode> = {
    Eyebrow: <p className="editorial-eyebrow text-accent">Example account</p>,
    Title: (
      <p className="font-display text-3xl leading-tight">Northstar Security</p>
    ),
    Body: (
      <p className="max-w-prose text-sm leading-6">
        Three fictional signals are ready to review before outreach.
      </p>
    ),
    Metadata: (
      <p className="font-mono text-xs">Reviewed Nov 4 · fictional record</p>
    ),
  };
  return (
    <div>
      <div
        role="group"
        aria-label="Type roles"
        className="flex flex-wrap gap-2"
      >
        {Object.keys(samples).map((name) => (
          <button
            key={name}
            type="button"
            aria-pressed={role === name}
            onClick={() => setRole(name)}
            className={
              "min-h-11 rounded-lg border px-3 text-sm " +
              (role === name
                ? "border-foreground bg-foreground text-background"
                : "border-border bg-card")
            }
          >
            {name}
          </button>
        ))}
      </div>
      <div className="mt-4 rounded-lg border border-border bg-card p-4">
        {samples[role]}
      </div>
    </div>
  );
}

function ColorDemo() {
  const [pair, setPair] = useState<"body" | "weak">("body");
  const weak = pair === "weak";
  return (
    <div>
      <div
        role="group"
        aria-label="Color pairs"
        className="flex flex-wrap gap-2"
      >
        {(
          [
            ["body", "Body pair"],
            ["weak", "Weak pair"],
          ] as const
        ).map(([value, label]) => (
          <button
            key={value}
            type="button"
            aria-pressed={pair === value}
            onClick={() => setPair(value)}
            className={
              "min-h-11 rounded-lg border px-3 text-sm " +
              (pair === value
                ? "border-foreground bg-foreground text-background"
                : "border-border bg-card")
            }
          >
            {label}
          </button>
        ))}
      </div>
      <div
        className="mt-4 rounded-lg border border-border p-4"
        style={{
          background: "#f3efe6",
          color: weak ? "#ead5c7" : "#1b211d",
        }}
      >
        <p className="text-sm font-medium">
          {weak ? "Hard to read" : "Readable body text"}
        </p>
        <p className="mt-1 text-sm">
          {weak
            ? "Clay on ivory. The label says this pair is hard to read."
            : "Charcoal on ivory. This is the body pair in the current tokens."}
        </p>
      </div>
      <p className="mt-3 text-sm leading-6 text-foreground">
        Calculated from the token hex values on Nov 8, 2026: charcoal on ivory
        is about 14.3:1, and clay on ivory is about 1.2:1. WCAG 2.2 asks for at
        least 4.5:1 for ordinary text. This is a teaching calculation, not a
        conformance audit.
      </p>
    </div>
  );
}

function SpacingDemo() {
  const [compact, setCompact] = useState(false);
  return (
    <div>
      <div
        role="group"
        aria-label="Spacing rhythm"
        className="flex flex-wrap gap-2"
      >
        {(
          [
            [false, "Section rhythm"],
            [true, "Compact"],
          ] as const
        ).map(([value, label]) => (
          <button
            key={label}
            type="button"
            aria-pressed={compact === value}
            onClick={() => setCompact(value)}
            className={
              "min-h-11 rounded-lg border px-3 text-sm " +
              (compact === value
                ? "border-foreground bg-foreground text-background"
                : "border-border bg-card")
            }
          >
            {label}
          </button>
        ))}
      </div>
      <div className={compact ? "mt-4 grid gap-2" : "mt-4 grid gap-6"}>
        {accounts.map((account) => (
          <p
            key={account.name}
            className="rounded-lg border border-border bg-card px-3 py-2 text-sm"
          >
            {account.name}
          </p>
        ))}
        <Button type="button">Review example</Button>
      </div>
    </div>
  );
}

function AlignmentDemo() {
  const [clear, setClear] = useState(true);
  return (
    <div>
      <div
        role="group"
        aria-label="Hierarchy examples"
        className="flex flex-wrap gap-2"
      >
        {(
          [
            [true, "One next action"],
            [false, "Three equal actions"],
          ] as const
        ).map(([value, label]) => (
          <button
            key={label}
            type="button"
            aria-pressed={clear === value}
            onClick={() => setClear(value)}
            className={
              "min-h-11 rounded-lg border px-3 text-sm " +
              (clear === value
                ? "border-foreground bg-foreground text-background"
                : "border-border bg-card")
            }
          >
            {label}
          </button>
        ))}
      </div>
      {clear ? (
        <div className="mt-4 text-left">
          <p className="text-sm leading-6">
            Northstar has three signals to review.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Button type="button">Review Northstar</Button>
            <Button type="button" variant="outline">
              See all accounts
            </Button>
          </div>
        </div>
      ) : (
        <div className="mt-4 text-center">
          <div className="flex flex-wrap justify-center gap-2">
            <Button type="button">Research</Button>
            <Button type="button">Draft</Button>
            <Button type="button">Send</Button>
          </div>
          <p className="mt-3 text-sm">Three equal actions compete.</p>
        </div>
      )}
    </div>
  );
}

function ResponsiveDemo() {
  return (
    <div>
      <ul className="flex flex-wrap gap-2 text-sm">
        {[
          "375px phone check",
          "768px tablet check",
          "1280px desktop check",
        ].map((label) => (
          <li key={label} className="rounded-lg border border-border px-3 py-2">
            {label}
          </li>
        ))}
      </ul>
      <p className="mt-3 text-sm leading-6">
        These labels name the checks. They do not resize the browser. Use
        Preview width above this example. That cap changes this panel only. It
        is not a media query and it does not emulate a device.
      </p>
      <ul className="mt-3 space-y-2 text-sm">
        {accounts.map((account) => (
          <li
            key={account.name}
            className="rounded-lg border border-border px-3 py-2"
          >
            <span className="font-medium">{account.name}.</span>{" "}
            {account.detail}
          </li>
        ))}
      </ul>
    </div>
  );
}

function LayoutDemo() {
  const [mode, setMode] = useState<"flex" | "grid">("flex");
  return (
    <div>
      <div
        role="group"
        aria-label="Layout method"
        className="flex flex-wrap gap-2"
      >
        {(
          [
            ["flex", "Wrapping row"],
            ["grid", "Three columns"],
          ] as const
        ).map(([value, label]) => (
          <button
            key={value}
            type="button"
            aria-pressed={mode === value}
            onClick={() => setMode(value)}
            className={
              "min-h-11 rounded-lg border px-3 text-sm " +
              (mode === value
                ? "border-foreground bg-foreground text-background"
                : "border-border bg-card")
            }
          >
            {label}
          </button>
        ))}
      </div>
      <div
        className={
          mode === "flex"
            ? "mt-4 flex max-w-5xl flex-wrap gap-3"
            : "mt-4 grid max-w-5xl grid-cols-3 gap-3"
        }
      >
        {accounts.map((account) => (
          <article
            key={account.name}
            className={
              "rounded-lg border border-border bg-card p-3 " +
              (mode === "flex" ? "min-w-32 flex-1" : "min-w-0")
            }
          >
            <h4 className="font-semibold">{account.name}</h4>
            <p className="mt-1 text-sm">{account.detail}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

function ButtonDemo() {
  const [saved, setSaved] = useState(false);
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button type="button" onClick={() => setSaved(true)}>
        Save example
      </Button>
      <Button type="button" variant="outline" onClick={() => setSaved(false)}>
        Reset
      </Button>
      <span role="status" className="text-sm">
        {saved ? "Example saved locally." : "No changes saved."}
      </span>
    </div>
  );
}

function CardDemo() {
  const [open, setOpen] = useState(false);
  return (
    <article className="max-w-xs rounded-xl border border-border bg-card p-4">
      <p className="text-xs text-muted">Example account</p>
      <h4 className="mt-1 font-semibold">Northstar Security</h4>
      <p className="mt-2 text-sm">Three signals to review before outreach.</p>
      <Button
        type="button"
        variant="outline"
        className="mt-3"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        {open ? "Hide details" : "Inspect details"}
      </Button>
      {open ? (
        <p className="mt-2 text-sm" role="status">
          Evidence is illustrative, not a live account record.
        </p>
      ) : null}
    </article>
  );
}

function TabsDemo() {
  const [active, setActive] = useState("Overview");
  return (
    <div>
      <div role="group" aria-label="Example views" className="flex gap-2">
        {["Overview", "Evidence"].map((name) => (
          <button
            key={name}
            type="button"
            aria-pressed={active === name}
            onClick={() => setActive(name)}
            className={
              "min-h-11 rounded-lg border px-4 text-sm " +
              (active === name
                ? "border-foreground bg-foreground text-background"
                : "border-border bg-card")
            }
          >
            {name}
          </button>
        ))}
      </div>
      <div className="mt-3 rounded-lg border border-border p-3 text-sm">
        {active === "Overview"
          ? "Summary of the example account."
          : "Dated sources would appear here."}
      </div>
    </div>
  );
}

function AccordionDemo() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-lg border border-border p-3">
      <button
        type="button"
        className="flex min-h-11 w-full items-center justify-between text-left font-medium"
        aria-expanded={expanded}
        onClick={() => setExpanded((current) => !current)}
      >
        Why this design?
        <span aria-hidden="true">{expanded ? "−" : "+"}</span>
      </button>
      {expanded ? (
        <p className="mt-2 text-sm">
          The main answer stays visible. Extra reasoning is optional.
        </p>
      ) : null}
    </div>
  );
}

function SearchDemo() {
  const [query, setQuery] = useState("");
  const entries = ["Card", "Accordion", "Button", "Tabs"];
  const filtered = entries.filter((entry) =>
    entry.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <div>
      <label
        className="block text-sm font-medium"
        htmlFor="component-demo-search"
      >
        Find a component
      </label>
      <input
        id="component-demo-search"
        className="mt-2 min-h-11 w-full rounded-lg border border-border bg-card px-3"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search examples"
      />
      <p className="mt-2 text-xs text-muted" role="status">
        {filtered.length} matches
      </p>
      <ul className="mt-2 text-sm">
        {filtered.map((entry) => (
          <li key={entry} className="py-1">
            {entry}
          </li>
        ))}
      </ul>
      {filtered.length === 0 ? (
        <Button
          type="button"
          variant="outline"
          className="mt-2"
          onClick={() => setQuery("")}
        >
          Clear search
        </Button>
      ) : null}
    </div>
  );
}

function FeedbackDemo() {
  const [state, setState] = useState<"idle" | "pending" | "saved" | "failed">(
    "idle",
  );
  const message = {
    idle: "Idle. No save attempted yet.",
    pending: "Pending. The example is waiting. Nothing has been stored.",
    saved: "Saved. The example stayed in this demo only.",
    failed: "Failed. The example was not saved. Try again.",
  }[state];
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {(
          [
            ["pending", "Show pending"],
            ["saved", "Show saved"],
            ["failed", "Show failed"],
            ["idle", "Reset"],
          ] as const
        ).map(([value, label]) => (
          <Button
            key={value}
            type="button"
            variant={state === value ? "default" : "outline"}
            aria-pressed={state === value}
            onClick={() => setState(value)}
          >
            {label}
          </Button>
        ))}
      </div>
      <p role="status" className="mt-3 text-sm">
        {message}
      </p>
    </div>
  );
}

function CheckboxDemo() {
  const [checked, setChecked] = useState<string[]>([]);
  const tasks = ["Research account", "Draft outreach", "Check CRM"];
  return (
    <fieldset className="space-y-3">
      <legend className="text-sm font-medium">
        Choose independent follow-up tasks
      </legend>
      {tasks.map((name) => (
        <label key={name} className="flex min-h-11 items-center gap-3 text-sm">
          <input
            type="checkbox"
            checked={checked.includes(name)}
            onChange={(event) =>
              setChecked((current) =>
                event.target.checked
                  ? [...current, name]
                  : current.filter((item) => item !== name),
              )
            }
            className="h-4 w-4 accent-current"
          />
          {name}
        </label>
      ))}
      <p role="status" className="text-sm text-muted">
        {checked.length} of 3 selected
      </p>
    </fieldset>
  );
}

function SelectDemo() {
  const [stage, setStage] = useState("Research");
  return (
    <div className="max-w-sm">
      <label htmlFor="lesson-stage" className="block text-sm font-medium">
        Campaign stage
      </label>
      <select
        id="lesson-stage"
        value={stage}
        onChange={(event) => setStage(event.target.value)}
        className="mt-2 min-h-11 w-full rounded-lg border border-border bg-card px-3"
      >
        <option>Research</option>
        <option>Outreach</option>
        <option>Evaluation</option>
      </select>
      <p role="status" className="mt-3 text-sm">
        Selected stage: {stage}
      </p>
    </div>
  );
}

function TableDemo() {
  return (
    <div>
      <div
        role="region"
        aria-label="Example account table"
        tabIndex={0}
        className="overflow-x-auto rounded-lg border border-border"
      >
        <table className="w-full min-w-[24rem] text-left text-sm">
          <caption className="p-2 text-left text-xs text-muted">
            Fictional records for comparison
          </caption>
          <thead>
            <tr>
              <th scope="col" className="p-2">
                Account
              </th>
              <th scope="col" className="p-2">
                Signals
              </th>
              <th scope="col" className="p-2">
                Reviewed
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-border">
              <th scope="row" className="p-2">
                Northstar
              </th>
              <td className="p-2">3</td>
              <td className="p-2">Nov 4</td>
            </tr>
            <tr className="border-t border-border">
              <th scope="row" className="p-2">
                Horizon
              </th>
              <td className="p-2">1</td>
              <td className="p-2">Nov 6</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-xs text-muted">
        Compare values by column. Scroll the table horizontally on a narrow
        preview.
      </p>
    </div>
  );
}

// Keys are the lesson contract. lib/component-lessons.test.ts requires one
// demo for every lesson id, including feedback.
const demos: Record<string, () => ReactElement> = {
  typography: TypographyDemo,
  color: ColorDemo,
  spacing: SpacingDemo,
  alignment: AlignmentDemo,
  responsive: ResponsiveDemo,
  layout: LayoutDemo,
  button: ButtonDemo,
  card: CardDemo,
  tabs: TabsDemo,
  accordion: AccordionDemo,
  search: SearchDemo,
  feedback: FeedbackDemo,
  checkbox: CheckboxDemo,
  select: SelectDemo,
  table: TableDemo,
};

function Demo({ lessonId }: { lessonId: string }) {
  const Example = demos[lessonId];
  return Example ? <Example /> : null;
}

function LessonArticle({
  lesson,
  previewWidth,
  onPreviewWidth,
  onSelect,
}: {
  lesson: ComponentLesson;
  previewWidth: string;
  onPreviewWidth: (value: string) => void;
  onSelect: (id: string) => void;
}) {
  const widthId = useId();
  const [answer, setAnswer] = useState<"yes" | "no" | null>(null);
  const catalog = componentOptions.find(
    (option) => option.id === lesson.catalogId,
  );
  const related = lesson.related.flatMap((id) => {
    const match = componentLessons.find((item) => item.id === id);
    return match ? [match] : [];
  });
  return (
    <article className="min-w-0 rounded-xl border border-border bg-card p-5">
      <p className="text-xs font-semibold text-accent">
        {lesson.family} · {lesson.kind === "concept" ? "Concept" : "Component"}
      </p>
      <h3 className="mt-1 font-display text-xl">{lesson.title}</h3>
      <p className="mt-2 text-sm leading-6">{lesson.definition}</p>
      <p className="mt-2 text-sm leading-6">{lesson.why}</p>
      <h4 className="mt-5 font-semibold">Common uses</h4>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6">
        {lesson.useCases.map((useCase) => (
          <li key={useCase}>{useCase}</li>
        ))}
      </ul>
      <div className="mt-5 rounded-xl border border-border bg-background p-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <p className="text-xs font-medium text-muted">
            Try it · local example
          </p>
          <label className="grid gap-1 text-sm" htmlFor={widthId}>
            Preview width
            <select
              id={widthId}
              className="min-h-11 max-w-full rounded-lg border border-border bg-card px-2"
              value={previewWidth}
              onChange={(event) => onPreviewWidth(event.target.value)}
            >
              <option value="full">Fit available space</option>
              <option value="360">Phone · up to 360px</option>
              <option value="680">Tablet · up to 680px</option>
            </select>
          </label>
        </div>
        <p className="mt-2 text-xs leading-5 text-muted">
          Width is capped by available space. This previews content density. Use
          browser or device testing for responsive breakpoints.
        </p>
        <div
          className="mt-4"
          style={{
            width:
              previewWidth === "full" ? "100%" : `min(100%, ${previewWidth}px)`,
          }}
        >
          <Demo key={lesson.id} lessonId={lesson.id} />
        </div>
        <p className="mt-3 text-sm leading-6 text-muted">{lesson.variants}</p>
      </div>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <h4 className="font-semibold">When to use it</h4>
          <p className="mt-1 text-sm leading-6">{lesson.when}</p>
        </div>
        <div>
          <h4 className="font-semibold">When not to</h4>
          <p className="mt-1 text-sm leading-6">{lesson.avoid}</p>
        </div>
      </div>
      <h4 className="mt-5 font-semibold">Alternatives and tradeoffs</h4>
      <ul className="mt-2 space-y-2">
        {lesson.alternatives.map((alternative) => (
          <li key={alternative.name} className="text-sm">
            <strong>{alternative.name}:</strong> {alternative.tradeoff}
          </li>
        ))}
      </ul>
      <h4 className="mt-5 font-semibold">
        Accessibility and responsive behavior
      </h4>
      <p className="mt-1 text-sm leading-6">{lesson.accessibility}</p>
      <h4 className="mt-5 font-semibold">Where it could fit</h4>
      <ul className="mt-2 space-y-2">
        {lesson.projects.map((project) => (
          <li key={project.name} className="text-sm">
            <strong>{project.name}:</strong> {project.application} This is a
            recommendation, not an implementation in that project.
          </li>
        ))}
      </ul>
      <div className="mt-5 rounded-xl border border-border p-4">
        <h4 className="font-semibold">Check your understanding</h4>
        <p className="mt-2 text-sm leading-6">{lesson.prompt}</p>
        <p className="mt-2 text-sm leading-6">
          <strong>Practice: </strong>
          {lesson.exercise}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Button
            type="button"
            variant={answer === "yes" ? "default" : "outline"}
            onClick={() => setAnswer("yes")}
          >
            I can explain it
          </Button>
          <Button
            type="button"
            variant={answer === "no" ? "default" : "outline"}
            onClick={() => setAnswer("no")}
          >
            Review again
          </Button>
        </div>
        {answer ? (
          <p role="status" className="mt-3 text-sm">
            {answer === "yes"
              ? "Good. Explain the tradeoff in your own words before moving on. Nothing is recorded."
              : "Review the example and alternatives. No completion is recorded."}
          </p>
        ) : null}
      </div>
      <a
        href={lesson.source}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex min-h-11 items-center text-sm text-accent underline"
      >
        Read the official documentation (new tab)
      </a>
      {catalog ? (
        <p className="mt-3 text-sm leading-6">
          <a className="underline" href="#component-ideas">
            Related catalog family: {catalog.name}
          </a>
          . This lesson is one part of that family. It does not mean the family
          is installed in another repository.
        </p>
      ) : null}
      <h4 className="mt-5 font-semibold">Related lessons</h4>
      <div className="mt-2 flex flex-wrap gap-2">
        {related.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelect(item.id)}
            className="min-h-11 rounded-lg border border-border bg-background px-3 text-sm"
          >
            {item.title}
          </button>
        ))}
      </div>
    </article>
  );
}

export function ComponentLearning() {
  const headingId = useId();
  const searchId = useId();
  const [track, setTrack] = useState<LessonTrack>("All");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState("typography");
  const [previewWidth, setPreviewWidth] = useState("full");
  const visible = useMemo(
    () => lessonsForExplorer(track, query),
    [track, query],
  );
  const lesson = visible.find((item) => item.id === selected) ?? visible[0];
  const foundationCount = componentLessons.filter(
    (item) => item.kind === "concept",
  ).length;
  const componentCount = componentLessons.length - foundationCount;

  return (
    <section
      id="component-learning"
      aria-labelledby={headingId}
      className="space-y-5"
    >
      <div>
        <p className="editorial-eyebrow text-accent">
          Learn by doing · UI/UX foundations
        </p>
        <h2 id={headingId} className="mt-2 font-display text-2xl">
          Component learning explorer
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
          Start with {foundationCount} visual foundations, then practice{" "}
          {componentCount} components. Examples use fictional data and stay on
          this page. Nothing is saved, and a recommendation is not an
          implementation in another project.
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto]">
        <label className="grid gap-2 text-sm font-medium" htmlFor={searchId}>
          Search lessons
          <input
            id={searchId}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Try contrast, table, or account"
            className="min-h-11 w-full rounded-lg border border-border bg-card px-3"
          />
        </label>
        <div className="grid gap-2 text-sm font-medium">
          <span id={`${searchId}-track`}>Track</span>
          <div
            role="group"
            aria-labelledby={`${searchId}-track`}
            className="flex flex-wrap gap-2"
          >
            {tracks.map((name) => (
              <Button
                key={name}
                type="button"
                variant={track === name ? "default" : "outline"}
                aria-pressed={track === name}
                onClick={() => setTrack(name)}
              >
                {name}
              </Button>
            ))}
          </div>
        </div>
      </div>
      <p role="status" className="text-xs text-muted">
        {visible.length} {visible.length === 1 ? "lesson" : "lessons"}
      </p>
      {lesson ? (
        <div className="grid gap-5 lg:grid-cols-[minmax(0,16rem)_minmax(0,1fr)]">
          <nav
            aria-label="Choose a lesson"
            className="flex flex-wrap gap-2 lg:flex-col"
          >
            {visible.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-current={lesson.id === item.id ? "true" : undefined}
                onClick={() => setSelected(item.id)}
                className={
                  "min-h-11 rounded-lg border px-3 py-2 text-left text-sm " +
                  (lesson.id === item.id
                    ? "border-foreground bg-foreground text-background"
                    : "border-border bg-card")
                }
              >
                <span className="block font-medium">{item.title}</span>
                <span className="block text-xs opacity-80">{item.family}</span>
              </button>
            ))}
          </nav>
          <LessonArticle
            key={lesson.id}
            lesson={lesson}
            previewWidth={previewWidth}
            onPreviewWidth={setPreviewWidth}
            onSelect={(id) => {
              setSelected(id);
              setTrack("All");
              setQuery("");
            }}
          />
        </div>
      ) : (
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="font-semibold">No matching lessons</h3>
          <p className="mt-2 text-sm text-muted">
            Try a broader search or reset the track.
          </p>
          <Button
            type="button"
            variant="outline"
            className="mt-4"
            onClick={() => {
              setQuery("");
              setTrack("All");
            }}
          >
            Reset lesson filters
          </Button>
        </div>
      )}
      <p className="text-xs leading-5 text-muted">
        The options catalog below contains {componentOptions.length} curated
        references. These {componentLessons.length} lessons are the teaching
        set. Other catalog entries stay references until they have their own
        reviewed examples.
      </p>
    </section>
  );
}
