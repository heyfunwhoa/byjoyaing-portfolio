"use client";

import Link from "next/link";
import styles from "./capability-orbit.module.css";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import { GeometricMotif } from "@/components/geometric-motif";
import { OrbitArtwork } from "@/components/orbit-artwork";
import { nextPillarIndex, orbitCenter, orbitPillars, type EvidenceSource, type OrbitLink } from "@/lib/capability-orbit";

const RADIUS = 37;
const nodes = [-90, 150, 30].map((degrees) => {
  const radians = (degrees * Math.PI) / 180;
  return { x: 50 + RADIUS * Math.cos(radians), y: 50 + RADIUS * Math.sin(radians) };
});

const sourceLabel: Record<EvidenceSource, string> = {
  employer: "Employer work",
  independent: "Independent · Side Quest",
};

type OrbitSelection = "center" | number;

function DiveLinks({ links }: { links: readonly OrbitLink[] }) {
  return (
    <ul className="mt-6 grid gap-2 sm:grid-cols-2">
      {links.map((link) => (
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
  );
}

export function CapabilityOrbit({ artwork = true }: { artwork?: boolean }) {
  const [selected, setSelected] = useState<OrbitSelection>("center");
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();
  const pillarIndex = typeof selected === "number" ? selected : null;

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const current = pillarIndex ?? 0;
    const next = nextPillarIndex(current, event.key, orbitPillars.length);
    if (next === null) return;
    event.preventDefault();
    setSelected(next);
    tabs.current[next]?.focus();
  }

  return (
    <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:items-start">
      <div className="relative overflow-hidden rounded-2xl bg-foreground p-6 text-background [--ring:#E6B59A] sm:p-8">
        {artwork ? null : <GeometricMotif className="inset-0" />}
        <div className="relative mx-auto aspect-square w-full max-w-[21rem]">
          {artwork ? (
            <OrbitArtwork treatment="charcoal" surface="charcoal" fill sizes="(min-width: 1024px) 21rem, 90vw" />
          ) : null}
          <svg aria-hidden="true" viewBox="0 0 100 100" className="pointer-events-none absolute inset-0 h-full w-full">
            {artwork ? null : (
              <>
                <circle cx="50" cy="50" r={RADIUS} fill="none" stroke="#F3EFE6" strokeWidth="0.35" opacity="0.55" />
                <circle cx="50" cy="50" r="27" fill="none" stroke="#F3EFE6" strokeWidth="0.25" strokeDasharray="0.8 1.8" opacity="0.4" />
              </>
            )}
            {nodes.map((node, index) => (
              <line
                key={index}
                x1="50"
                y1="50"
                x2={node.x}
                y2={node.y}
                strokeWidth={pillarIndex === index ? 0.6 : 0.3}
                pathLength={1}
                className={pillarIndex === index ? styles.connection : undefined}
                stroke={pillarIndex === index ? "#E6B59A" : "#F3EFE6"}
                opacity={pillarIndex === index ? 1 : 0.3}
              />
            ))}
          </svg>

          <button
            type="button"
            aria-pressed={selected === "center"}
            aria-controls={`${baseId}-panel-center`}
            onClick={() => setSelected("center")}
            className={`${styles.node} absolute top-1/2 left-1/2 z-10 flex aspect-square w-[30%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border p-2 text-center text-sm leading-tight font-semibold sm:w-[34%] ${
              selected === "center"
                ? "border-[#E6B59A] bg-background text-foreground"
                : "border-[#F3EFE6]/50 bg-background text-foreground hover:border-[#E6B59A]"
            }`}
          >
            {orbitCenter.label}
          </button>

          <div role="tablist" aria-label="Capabilities around enterprise selling" onKeyDown={onKeyDown}>
            {orbitPillars.map((pillar, index) => {
              const active = pillarIndex === index;
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
                  tabIndex={active || (pillarIndex === null && index === 0) ? 0 : -1}
                  onClick={() => setSelected(index)}
                  style={{ left: `${nodes[index].x}%`, top: `${nodes[index].y}%` }}
                  className={`${styles.node} absolute z-10 inline-flex min-h-11 -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full border px-2 text-xs font-semibold whitespace-nowrap sm:px-4 sm:text-sm transition-colors duration-200 ${
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
          {orbitCenter.summary} Select the center or a pillar to see the evidence around it.
        </p>
      </div>

      <section
        aria-label="Enterprise selling overview"
        id={`${baseId}-panel-center`}
        hidden={selected !== "center"}
        className={`${styles.panel} editorial-panel bg-card p-6 sm:p-8`}
      >
        <p className="editorial-eyebrow text-accent">The work at the center</p>
        <h3 className="mt-2 font-display text-2xl tracking-tight">{orbitCenter.label}</h3>
        <p className="mt-3 max-w-xl text-base leading-7 text-muted">{orbitCenter.summary}</p>
        <p className="mt-3 max-w-xl text-sm leading-6 text-muted">{orbitCenter.detail}</p>
        <DiveLinks links={orbitCenter.links} />
      </section>

      {orbitPillars.map((pillar, index) => (
        <section
          key={pillar.id}
          role="tabpanel"
          id={`${baseId}-panel-${pillar.id}`}
          aria-labelledby={`${baseId}-tab-${pillar.id}`}
          hidden={pillarIndex !== index}
          className={`${styles.panel} editorial-panel bg-card p-6 sm:p-8`}
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

          <DiveLinks links={pillar.links} />
        </section>
      ))}
    </div>
  );
}
