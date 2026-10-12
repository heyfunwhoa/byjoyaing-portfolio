"use client";

import { useId, useState } from "react";
import {
  componentApps,
  optionsForApp,
  type ComponentApp,
} from "@/lib/component-options";

export function ComponentOptions() {
  const id = useId();
  const [app, setApp] = useState<ComponentApp | "All">("All");
  const options = optionsForApp(app);
  return (
    <section aria-labelledby={`${id}-title`}>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="editorial-eyebrow text-accent">
            Curated options · reuse across apps
          </p>
          <h2 id={`${id}-title`} className="mt-2 font-display text-2xl">
            Choose by the job to be done
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-muted">
            Recommendations for your projects. “Available here” means source
            exists in this portfolio; other repos need their own compatibility
            review.
          </p>
        </div>
        <label className="grid gap-2 text-sm font-medium">
          Project
          <select
            className="min-h-11 max-w-full rounded-lg border border-border bg-card px-3"
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
      <p role="status" className="mt-4 text-xs text-muted">
        {options.length} options for {app === "All" ? "all projects" : app}
      </p>
      <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {options.map((option) => (
          <article
            key={option.id}
            className="min-w-0 rounded-xl border border-border bg-card p-4"
          >
            <p className="text-xs font-medium text-accent">
              {option.availability}
            </p>
            <h3 className="mt-2 font-semibold">{option.name}</h3>
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
                Suggested: {option.apps.join(" · ")}
              </p>
              <p className="mt-3 text-sm leading-6">{option.adoption}</p>
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
