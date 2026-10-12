"use client";

import Link from "next/link";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import { GeometricMotif } from "@/components/geometric-motif";
import { nextPillarIndex, orbitCenter, orbitPillars, type EvidenceSource } from "@/lib/capability-orbit";

const RADIUS = 37;
const nodes = [-90, 150, 30].map((degrees) => {
  const radians = (degrees * Math.PI) / 180;
  return { x: 50 + RADIUS * Math.cos(radians), y: 50 + RADIUS * Math.sin(radians) };
});

const sourceLabel: Record<EvidenceSource, string> = {
  employer: "Employer work",
  independent: "Independent · Side Quest",
};

export function CapabilityOrbit() {
  const [selected, setSelected] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const next = nextPillarIndex(selected, event.key, orbitPillars.length);
    if (next === null) return;
    event.preventDefault();
    setSelected(next);
    tabs.current[next]?.focus();
  }

  return (
    <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:items-start">
      <div className="relative overflow-hidden rounded-2xl bg-foreground p-6 text-background [--ring:#E6B59A] sm:p-8">
        <GeometricMotif className="inset-0" />
        <div className="relative mx-auto aspect-square w-full max-w-[21rem]">
          <svg aria-hidden="true" viewBox="0 0 100 100" className="pointer-events-none absolute inset-0 h-full w-full">
            <circle cx="50" cy="50" r={RADIUS} fill="none" stroke="#F3EFE6" strokeWidth="0.35" opacity="0.55" />
            <circle cx="50" cy="50" r="27" fill="none" stroke="#F3EFE6" strokeWidth="0.25" strokeDasharray="0.8 1.8" opacity="0.4" />
            {nodes.map((node, index) => (
              <line
                key={index}
                x1="50"
                y1="50"
                x2={node.x}
                y2={node.y}
                strokeWidth={index === selected ? 0.6 : 0.3}
                className="transition-[stroke,opacity] duration-300"
                stroke={index === selected ? "#E6B59A" : "#F3EFE6"}
                opacity={index === selected ? 1 : 0.3}
              />
            ))}
          </svg>

          <Link
            href={orbitCenter.href}
            className={`absolute top-1/2 left-1/2 flex aspect-square w-[30%] -translate-x-1/2 sm:w-[34%] -translate-y-1/2 items-center justify-center rounded-full bg-background p-2 text-center text-sm leading-tight font-semibold text-foreground`}
          >
            {orbitCenter.label}
          </Link>

          <div role="tablist" aria-label="Capabilities around enterprise selling" onKeyDown={onKeyDown}>
            {orbitPillars.map((pillar, index) => {
              const active = index === selected;
              return (
                <button
                  key={pillar.id}
                  ref={(element) => {
                    tabs.current[index] = element;
                  }}
                  type="button"
                  role="tab"
                  id={`${baseId}-tab-${pillar.id}`}
                  aria-controls={`${baseId}-panel-${pillar.id}`}
                  aria-selected={active}
                  tabIndex={active ? 0 : -1}
                  onClick={() => setSelected(index)}
                  style={{ left: `${nodes[index].x}%`, top: `${nodes[index].y}%` }}
                  className={`absolute inline-flex min-h-11 -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full border px-4 text-sm font-semibold whitespace-nowrap transition-colors duration-200 ${
                    active
                      ? "border-[#E6B59A] bg-background text-foreground"
                      : "border-[#F3EFE6]/50 bg-foreground text-background hover:border-[#E6B59A]"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`size-2 rounded-full transition-colors duration-200 ${active ? "bg-accent" : "bg-[#F3EFE6]/70"}`}
                  />
                  {pillar.label}
                </button>
              );
            })}
          </div>
        </div>
        <p className="relative mt-6 text-sm leading-6 text-[#F3EFE6]">
          {orbitCenter.summary} Select a pillar to see the evidence around it.
        </p>
      </div>

      {orbitPillars.map((pillar, index) => (
        <section
          key={pillar.id}
          role="tabpanel"
          id={`${baseId}-panel-${pillar.id}`}
          aria-labelledby={`${baseId}-tab-${pillar.id}`}
          hidden={index !== selected}
          className="editorial-panel bg-card p-6 transition-[opacity,translate] duration-200 ease-out starting:translate-y-1 starting:opacity-70 sm:p-8"
        >
          <p className="editorial-eyebrow text-accent">Around enterprise selling</p>
          <h3 className="mt-2 font-display text-2xl tracking-tight">{pillar.label}</h3>
          <p className="mt-3 max-w-xl text-base leading-7 text-muted">{pillar.summary}</p>

          <h4 className="mt-6 text-sm font-semibold">Evidence</h4>
          <ul className="mt-3 flex flex-col gap-3">
            {pillar.evidence.map((item) => (
              <li key={item.text} className="border-t border-border pt-3">
                <span
                  className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    item.source === "independent" ? "bg-surface-sage" : "border border-border"
                  }`}
                >
                  {sourceLabel[item.source]}
                </span>
                <p className="mt-2 text-sm leading-6 text-muted">{item.text}</p>
              </li>
            ))}
          </ul>
          {pillar.boundary ? <p className="mt-4 text-sm leading-6 text-muted">{pillar.boundary}</p> : null}

          <ul className="mt-6 grid gap-2 sm:grid-cols-2">
            {pillar.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="flex min-h-12 flex-col justify-center rounded-lg border border-border bg-background px-4 py-3 hover:border-accent"
                >
                  <span className="text-xs text-muted">{link.collection}</span>
                  <span className="mt-1 text-sm font-semibold text-accent">{link.label} →</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
