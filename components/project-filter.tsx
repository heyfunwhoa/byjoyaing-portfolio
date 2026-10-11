"use client";

import { labFilters, type LabFilter } from "@/lib/design-lab";

export function ProjectFilter({
  value,
  counts,
  onChange,
}: {
  value: LabFilter;
  counts: Record<LabFilter, number>;
  onChange: (next: LabFilter) => void;
}) {
  const selected = labFilters.find((filter) => filter.id === value) ?? labFilters[0];

  return (
    <div>
      <div role="group" aria-label="Filter projects" className="flex min-w-0 flex-wrap gap-2">
        {labFilters.map((filter) => {
          const pressed = value === filter.id;
          return (
            <button
              key={filter.id}
              type="button"
              aria-pressed={pressed}
              onClick={() => onChange(filter.id)}
              className={`inline-flex min-h-11 shrink-0 items-center rounded-md px-3 py-2 text-sm font-medium focus-visible:outline-offset-2 ${
                pressed
                  ? "bg-accent text-accent-foreground"
                  : "border border-border bg-card hover:border-accent"
              }`}
            >
              {filter.label}
              <span className="ml-2 text-xs opacity-80">{counts[filter.id]}</span>
            </button>
          );
        })}
      </div>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">{selected.description}</p>
    </div>
  );
}
