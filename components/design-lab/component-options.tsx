"use client";

import { useId, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  componentApps,
  type ComponentApp,
  type ComponentOption,
} from "@/lib/component-options";
import {
  patternFamilies,
  patternFileUrl,
  patternStages,
  patternsForLibrary,
  stageDefinitions,
  type PatternFamily,
  type PatternStage,
} from "@/lib/design-lab/pattern-adoption";

export function ComponentOptions() {
  const id = useId();
  const [app, setApp] = useState<ComponentApp | "All">("All");
  const [view, setView] = useState<"cards" | "table">("cards");
  const [query, setQuery] = useState("");
  const [availability, setAvailability] = useState<
    ComponentOption["availability"] | "All"
  >("All");
  const [stage, setStage] = useState<PatternStage | "All">("All");
  const [family, setFamily] = useState<PatternFamily | "All">("All");
  const options = patternsForLibrary({ app, query, availability, stage, family });
  return (
    <section aria-labelledby={`${id}-title`} className="w-full min-w-0">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="editorial-eyebrow text-accent">
            Design Lab · reusable components and patterns
          </p>
          <h2 id={`${id}-title`} className="mt-2 font-display text-2xl">
            Pattern library
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-muted">
            Browse the existing component catalog by task, project, family, and lifecycle.
            “Available here” describes source in this portfolio; it does not approve
            adoption or imply that another application uses it. Only inspected local
            consumer paths are shown as verified source-level uses.
          </p>
          <a className="mt-2 inline-block min-h-11 py-2 text-sm underline" href="https://github.com/heyfunwhoa/byjoyaing-portfolio/blob/1bff9a6bbd8b2a1db880b5a8c5e68cbab4015412/docs/design/component-opportunity-register.md" target="_blank" rel="noopener noreferrer">Open the cross-repo candidate guide (new tab)</a>
        </div>
        <label className="grid w-full min-w-0 gap-2 text-sm font-medium sm:w-auto">
          <span id={`${id}-project-label`}>Project</span>
          <select
            aria-labelledby={`${id}-project-label`}
            className="min-h-11 w-full max-w-full min-w-0 rounded-lg border border-border bg-card px-3"
            value={app}
            onChange={(event) =>
              setApp(event.target.value as ComponentApp | "All")
            }
          >
            <option>All</option>
            {componentApps.map((name) => (
              <option key={name}>{name}</option>
            ))}
          </select>
        </label>
      </div>
      <div
        aria-label="Pattern lifecycle meanings"
        className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-4"
      >
        {patternStages.map((name) => (
          <p key={name} className="rounded-lg border border-border bg-card p-3 text-xs leading-5 text-muted">
            <strong className="block text-sm text-foreground">{name}</strong>
            {stageDefinitions[name]}
          </p>
        ))}
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto]">
        <label className="grid gap-2 text-sm font-medium">
          Search options
          <input
            type="search"
            placeholder="Try avatar, evidence, calendar…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="min-h-11 w-full min-w-0 rounded-lg border border-border bg-card px-3"
          />
        </label>
        <label className="grid gap-2 text-sm font-medium">
          <span id={`${id}-availability-label`}>Availability</span>
          <select
            aria-labelledby={`${id}-availability-label`}
            value={availability}
            onChange={(event) =>
              setAvailability(event.target.value as typeof availability)
            }
            className="min-h-11 w-full min-w-0 rounded-lg border border-border bg-card px-3"
          >
            <option>All</option>
            <option>Available here</option>
            <option>Candidate</option>
          </select>
        </label>
      </div>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium">
          Pattern family
          <select
            value={family}
            onChange={(event) => setFamily(event.target.value as PatternFamily | "All")}
            className="min-h-11 w-full min-w-0 rounded-lg border border-border bg-card px-3"
          >
            <option value="All">All families</option>
            {patternFamilies.map((name) => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-medium">
          Lifecycle stage
          <select
            value={stage}
            onChange={(event) => setStage(event.target.value as PatternStage | "All")}
            className="min-h-11 w-full min-w-0 rounded-lg border border-border bg-card px-3"
          >
            <option value="All">All stages</option>
            {patternStages.map((name) => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
        </label>
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p role="status" className="text-xs text-muted">
          {options.length} patterns for {app === "All" ? "all projects" : app}. Stage is evidence-based; suggested apps are not verified consumers.
        </p>
        <div className="flex gap-2" role="group" aria-label="Library layout">
          {(["cards", "table"] as const).map((name) => (
            <Button
              key={name}
              variant={view === name ? "default" : "outline"}
              aria-pressed={view === name}
              aria-controls={`${id}-results`}
              onClick={() => setView(name)}
              className="capitalize"
            >
              {name}
            </Button>
          ))}
        </div>
      </div>
      {options.length === 0 ? (
        <div
          id={`${id}-results`}
          className="mt-4 rounded-xl border border-border bg-card p-6"
        >
          <h3 className="font-semibold">No matching patterns</h3>
          <p className="mt-2 text-sm text-muted">
            Try a broader search or reset the filters. An empty Approved
            view means no approval decision has been recorded, not a missing installation.
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => {
              setQuery("");
              setApp("All");
              setAvailability("All");
              setStage("All");
              setFamily("All");
            }}
          >
            Reset library filters
          </Button>
        </div>
      ) : view === "table" ? (
        <div id={`${id}-results`} className="mt-4 min-w-0">
          <p className="mb-2 text-xs text-muted">
            On narrow screens, swipe or focus this region and use arrow keys to
            compare columns. Cards are the default for quick browsing.
          </p>
          <div
            role="region"
            aria-label="Component comparison table"
            tabIndex={0}
            className="relative w-full max-w-full min-w-0 overflow-x-auto rounded-xl border border-border bg-card"
          >
            <table className="w-full min-w-[64rem] border-collapse text-left text-sm">
              <caption className="p-4 text-left text-xs text-muted">
                Component options for {app}, filtered by search and availability
              </caption>
              <thead className="bg-surface-sage">
                <tr>
                  {[
                    "Component family",
                    "Purpose",
                    "Suggested apps",
                    "Availability",
                    "Stage",
                    "Verified source use",
                    "Source",
                  ].map((title) => (
                    <th
                      key={title}
                      scope="col"
                      className="border-b border-border p-4 font-semibold"
                    >
                      {title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {options.map((option) => (
                  <tr key={option.id} className="align-top">
                    <th
                      scope="row"
                      className="border-b border-border p-4 font-semibold"
                    >
                      <span className="block">{option.name}</span>
                      <span className="mt-2 block text-xs leading-5 font-normal text-muted">
                        {option.parts.join(" · ")}
                      </span>
                    </th>
                    <td className="border-b border-border p-4 leading-6">
                      {option.purpose}
                      <details className="mt-2">
                        <summary className="min-h-11 cursor-pointer py-3 font-medium">
                          Adoption notes
                        </summary>
                        <p className="mt-2 text-xs leading-5 text-muted">
                          {option.adoption}
                        </p>
                      </details>
                    </td>
                    <td className="border-b border-border p-4 text-xs leading-5">
                      {option.apps.join(" · ")}
                    </td>
                    <td className="border-b border-border p-4 text-xs font-medium text-accent">
                      {option.availability}
                    </td>
                    <td className="border-b border-border p-4 text-xs leading-5">
                      <strong className="block">{option.stage}</strong>
                      <span className="text-muted">{option.family}</span>
                    </td>
                    <td className="border-b border-border p-4 text-xs leading-5">
                      {option.uses.length ? (
                        <ul className="space-y-2">
                          {option.uses.map((use) => (
                            <li key={use.path}>
                              <a
                                href={patternFileUrl(use, use.repository)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex min-h-11 items-center text-accent underline"
                              >
                                {use.label}
                                <span className="sr-only"> (opens a new tab)</span>
                              </a>
                              <span className="block text-muted">Source-level only</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <span className="text-muted">None verified</span>
                      )}
                    </td>
                    <td className="border-b border-border p-4">
                      <a
                        href={option.source}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-11 items-center text-accent underline"
                      >
                        Guide
                        <span className="sr-only">
                          {" "}
                          for {option.name} (opens a new tab)
                        </span>
                      </a>
                      {option.localSource[0] && (
                        <a
                          href={patternFileUrl(option.localSource[0])}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 inline-flex min-h-11 items-center text-accent underline"
                        >
                          Local source
                          <span className="sr-only">
                            {" "}for {option.name} (opens a new tab)
                          </span>
                        </a>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div
          id={`${id}-results`}
          className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {options.map((option) => (
            <article
              key={option.id}
              className="min-w-0 rounded-xl border border-border bg-card p-4"
            >
              <p className="text-xs font-medium text-accent">
                {option.stage} · {option.availability}
              </p>
              <p className="mt-1 text-xs text-muted">{option.family}</p>
              <h3 className="mt-2 font-semibold">{option.name}</h3>
              <p className="mt-1 font-mono text-xs text-muted">ID: {option.id}</p>
              <p className="mt-2 text-sm leading-6 text-muted">
                {option.purpose}
              </p>
              <p className="mt-3 text-xs leading-5 font-medium">
                {option.parts.join(" · ")}
              </p>
              <details className="mt-4">
                <summary className="min-h-11 cursor-pointer py-3 text-sm font-medium">
                  Fit & adoption notes
                </summary>
                <p className="text-xs leading-5 text-muted">
                  Possible destinations (not verified use): {option.apps.join(" · ")}
                </p>
                <p className="mt-3 text-sm leading-6">{option.adoption}</p>
                {option.localSource.length > 0 && (
                  <div className="mt-3">
                    <p className="text-xs font-semibold">Local source and examples</p>
                    <ul className="mt-1 space-y-1">
                      {option.localSource.map((source) => (
                        <li key={source.path}>
                          <a
                            className="inline-flex min-h-11 items-center text-sm text-accent underline"
                            href={patternFileUrl(source)}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {source.label} <span className="sr-only">(opens a new tab)</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="mt-3">
                  <p className="text-xs font-semibold">Verified consumer source</p>
                  {option.uses.length ? (
                    <ul className="mt-1 space-y-1">
                      {option.uses.map((use) => (
                        <li key={use.path}>
                          <a
                            className="inline-flex min-h-11 items-center text-sm text-accent underline"
                            href={patternFileUrl(use, use.repository)}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {use.label} <span className="sr-only">(opens a new tab)</span>
                          </a>
                          <span className="block text-xs text-muted">Source-level evidence, not deployment confirmation</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-1 text-xs text-muted">None recorded. A proposed destination is not adoption.</p>
                  )}
                </div>
                <a
                  className="mt-3 inline-flex min-h-11 items-center text-sm text-accent underline"
                  href={option.source}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Official component guide
                  <span className="sr-only">
                    {" "}
                    for {option.name} (opens a new tab)
                  </span>
                </a>
              </details>
            </article>
          ))}
        </div>
      )}
      <details className="mt-5 rounded-xl border border-border p-4">
        <summary className="cursor-pointer font-medium">
          New app or existing app?
        </summary>
        <p className="mt-3 text-sm leading-6 text-muted">
          For a new app, use{" "}
          <a
            href="https://ui.shadcn.com/create"
            className="text-accent underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            shadcn/create
          </a>{" "}
          to choose a preset. For this portfolio, keep radix-nova, existing
          tokens, and components.json; add individual components only when a
          feature calls for them. The linked React Aria Avatar is an alternative
          implementation family, not a required upgrade to this Radix setup.
        </p>
      </details>
    </section>
  );
}
