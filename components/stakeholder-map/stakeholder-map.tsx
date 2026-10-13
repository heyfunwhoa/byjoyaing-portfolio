"use client";

import { useEffect, useId, useRef, useState } from "react";
import {
  mapGroups,
  validateStakeholderMap,
  type MapPerson,
  type MapRelationship,
} from "@/lib/stakeholder-map";
import { StakeholderNode } from "./stakeholder-node";
import { StakeholderDetail } from "./stakeholder-detail";

type Point = { x: number; y: number; width: number; height: number };
export type StakeholderMapProps = {
  people: readonly MapPerson[];
  relationships: readonly MapRelationship[];
  selectedId: string;
  onSelect: (id: string) => void;
  emphasizedId?: string;
  showNextStep?: boolean;
};

/** Read-only, controlled map. Data ownership and permissions belong to its caller. */
export function StakeholderMap({
  people,
  relationships,
  selectedId,
  onSelect,
  emphasizedId,
  showNextStep,
}: StakeholderMapProps) {
  const canvas = useRef<HTMLDivElement>(null);
  const [geometry, setGeometry] = useState<{
    width: number;
    height: number;
    points: Record<string, Point>;
  }>({ width: 0, height: 0, points: {} });
  const legendId = useId();
  const error = validateStakeholderMap(people, relationships);
  const person = people.find((item) => item.id === selectedId) ?? people[0];

  useEffect(() => {
    const container = canvas.current;
    if (!container || error || typeof ResizeObserver === "undefined") return;
    const measure = () => {
      const bounds = container.getBoundingClientRect();
      const points: Record<string, Point> = Object.create(null);
      container
        .querySelectorAll<HTMLElement>("[data-map-person]")
        .forEach((element) => {
          const rect = element.getBoundingClientRect();
          points[element.dataset.mapPerson!] = {
            x: rect.left - bounds.left + rect.width / 2,
            y: rect.top - bounds.top + rect.height / 2,
            width: rect.width,
            height: rect.height,
          };
        });
      setGeometry({ width: bounds.width, height: bounds.height, points });
    };
    const observer = new ResizeObserver(measure);
    observer.observe(container);
    container
      .querySelectorAll<HTMLElement>("[data-map-person]")
      .forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [people, error]);

  if (error)
    return (
      <p role="status" className="rounded-xl border border-border p-5 text-sm">
        This map cannot be displayed. {error}
      </p>
    );
  if (!person)
    return (
      <p role="status" className="rounded-xl border border-border p-5 text-sm">
        No stakeholders are mapped yet.
      </p>
    );

  return (
    <div className="grid min-w-0 gap-5 xl:grid-cols-[minmax(0,1.7fr)_minmax(16rem,1fr)]">
      <div className="min-w-0">
        <div
          ref={canvas}
          className="relative grid gap-5 lg:grid-cols-3 lg:gap-10"
          role="group"
          aria-label="Interactive stakeholder map"
          aria-describedby={legendId}
        >
          {geometry.width > 0 ? (
            <svg
              viewBox={`0 0 ${geometry.width} ${geometry.height}`}
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 hidden h-full w-full overflow-visible lg:block"
            >
              {relationships
                .filter(
                  (edge) => edge.from === person.id || edge.to === person.id,
                )
                .map((edge) => {
                  const a = geometry.points[edge.from],
                    b = geometry.points[edge.to];
                  if (!a || !b) return null;
                  const sameColumn = Math.abs(a.x - b.x) < 1;
                  const x1 = sameColumn
                    ? a.x
                    : a.x + (Math.sign(b.x - a.x) * a.width) / 2;
                  const x2 = sameColumn
                    ? b.x
                    : b.x - (Math.sign(b.x - a.x) * b.width) / 2;
                  const y1 = sameColumn
                    ? a.y + (Math.sign(b.y - a.y) * a.height) / 2
                    : a.y;
                  const y2 = sameColumn
                    ? b.y - (Math.sign(b.y - a.y) * b.height) / 2
                    : b.y;
                  return (
                    <path
                      key={edge.id}
                      d={`M ${x1} ${y1} C ${(x1 + x2) / 2} ${y1}, ${(x1 + x2) / 2} ${y2}, ${x2} ${y2}`}
                      fill="none"
                      stroke="var(--accent)"
                      strokeWidth="1.5"
                      strokeDasharray={
                        edge.status === "hypothesis" ? "5 5" : undefined
                      }
                    />
                  );
                })}
            </svg>
          ) : null}
          {mapGroups.map((group) => (
            <section
              key={group.id}
              className="relative min-w-0"
              aria-label={group.label}
            >
              <h3 className="mb-4 text-xs font-medium tracking-wide text-muted uppercase">
                {group.label}
              </h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 lg:gap-12">
                {people
                  .filter((item) => item.group === group.id)
                  .map((item) => (
                    <div key={item.id} data-map-person={item.id}>
                      <StakeholderNode
                        person={item}
                        selected={person.id === item.id}
                        emphasized={emphasizedId === item.id}
                        onSelect={onSelect}
                      />
                    </div>
                  ))}
              </div>
            </section>
          ))}
        </div>
        <p id={legendId} className="mt-4 text-xs leading-5 text-muted">
          Selected paths are highlighted. Dashed = hypothesis; solid = validated
          relationship. These are relationship paths, not reporting lines.
          Labeled paths and evidence appear in the detail panel.
        </p>
      </div>
      <StakeholderDetail
        person={person}
        people={people}
        relationships={relationships}
        showNextStep={showNextStep}
      />
    </div>
  );
}
