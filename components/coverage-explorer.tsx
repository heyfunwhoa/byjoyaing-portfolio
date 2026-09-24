"use client";

import { Coverage } from "@/components/coverage";
import { detectors } from "@/lib/portfolio";
import { useMemo, useState } from "react";

const filters = ["All", "Covered", "Observed", "Not evaluated"] as const;

type Filter = (typeof filters)[number];

export function CoverageExplorer() {
  const [filter, setFilter] = useState<Filter>("All");
  const [query, setQuery] = useState("");

  const rows = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return detectors.filter((row) => {
      const matchesQuery = needle ? row.name.toLowerCase().includes(needle) : true;
      const matchesFilter =
        filter === "All" ||
        [row.aws, row.github, row.slack, row.gitlab, row.gcp].includes(filter);
      return matchesQuery && matchesFilter;
    });
  }, [filter, query]);

  return (
    <div className="flex min-w-0 max-w-full flex-col overflow-hidden rounded-lg border border-border bg-card">
      <div className="flex flex-col gap-3 border-b border-border px-3 py-3 sm:flex-row sm:items-center sm:justify-between">
        <label className="flex min-w-0 flex-1 items-center">
          <span className="sr-only">Search sources</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search sources"
            className="h-9 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground outline-none placeholder:text-muted focus:border-accent"
          />
        </label>
        <div
          className="flex flex-wrap gap-1"
          role="tablist"
          aria-label="Coverage filter"
        >
          {filters.map((item) => (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={filter === item}
              onClick={() => setFilter(item)}
              className={
                filter === item
                  ? "rounded-md bg-accent px-2.5 py-1.5 text-[11px] font-medium text-accent-foreground"
                  : "rounded-md px-2.5 py-1.5 text-[11px] font-medium text-muted hover:text-foreground"
              }
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <div className="max-h-[min(28rem,70vh)] overflow-auto">
        <table className="w-full min-w-[40rem] text-left text-sm">
          <caption className="sr-only">
            Sample comparison. Not evaluated means the public source has not
            been reviewed yet. Observed means a public detector folder exists
            and verification was not fully reviewed.
          </caption>
          <thead className="bg-card text-[11px] font-medium text-muted">
            <tr>
              <th className="px-3 py-2">Source</th>
              <th className="px-3 py-2">AWS keys</th>
              <th className="px-3 py-2">GitHub PATs</th>
              <th className="px-3 py-2">Slack</th>
              <th className="px-3 py-2">GitLab</th>
              <th className="px-3 py-2">GCP</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-3 py-6 text-muted">
                  No sources match that filter.
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.name} className="border-t border-border">
                  <td className="px-3 py-2 font-medium text-foreground">
                    {row.name}
                  </td>
                  <td className="px-3 py-2">
                    <Coverage value={row.aws} />
                  </td>
                  <td className="px-3 py-2">
                    <Coverage value={row.github} />
                  </td>
                  <td className="px-3 py-2">
                    <Coverage value={row.slack} />
                  </td>
                  <td className="px-3 py-2">
                    <Coverage value={row.gitlab} />
                  </td>
                  <td className="px-3 py-2">
                    <Coverage value={row.gcp} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <p className="border-t border-border px-3 py-2 text-xs leading-5 text-muted">
        Independent research — not an official Truffle product. Covered is only AWS keys and GitHub PATs for TruffleHog. Observed means the public detector folder exists. Gray is not a confirmed gap. The 910 and 14 counts are notes, not rows here.
      </p>
    </div>
  );
}
