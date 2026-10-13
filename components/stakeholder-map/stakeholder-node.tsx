"use client";

import { Button } from "@/components/ui/button";
import { accessLabels, type MapPerson } from "@/lib/stakeholder-map";

export function StakeholderNode({
  person,
  selected,
  emphasized,
  onSelect,
}: {
  person: MapPerson;
  selected: boolean;
  emphasized?: boolean;
  onSelect: (id: string) => void;
}) {
  return (
    <Button
      type="button"
      variant="outline"
      aria-pressed={selected}
      onClick={() => onSelect(person.id)}
      className={`relative min-h-24 w-full flex-col items-start justify-center gap-2 p-4 text-left whitespace-normal focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent motion-reduce:transition-none ${selected ? "border-accent bg-surface-clay ring-1 ring-accent" : "bg-card"}`}
    >
      <span className="font-semibold text-foreground">{person.role}</span>
      <span className="flex items-center gap-2 text-xs font-normal text-muted">
        <span
          aria-hidden="true"
          className={`size-2 shrink-0 ${person.access === "engaged" ? "rounded-full bg-foreground" : person.access === "developing" ? "rounded-full border border-foreground" : "border border-border"}`}
        />
        {accessLabels[person.access]}
      </span>
      {emphasized ? (
        <span className="text-xs font-medium text-accent">
          Access gap to inspect
        </span>
      ) : null}
    </Button>
  );
}
