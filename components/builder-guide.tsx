"use client";

import Link from "next/link";
import { useState } from "react";

const journeys = [
  {
    id: "people",
    pillar: "People",
    title: "How do you lead and coach?",
    summary: "I work alongside sellers, support onboarding and coaching, and help teams make difficult work repeatable. Explore the career context and how I approach people development.",
    links: [
      { label: "Experience and roles", href: "/experience" },
      { label: "My story and values", href: "/about" },
    ],
  },
  {
    id: "strategy",
    pillar: "Strategy",
    title: "How do you approach GTM problems?",
    summary: "I work with technical buyers and sales teams to make a product story credible. Explore the commercial context first, then a practical example of competitive narrative work.",
    links: [
      { label: "Commercial experience", href: "/experience" },
      { label: "Competitive narrative case study", href: "/work/competitive-intelligence-engine" },
    ],
  },
  {
    id: "systems",
    pillar: "Systems",
    title: "What have you built?",
    summary: "These are independent projects and experiments, not claims of customer deployment. Explore the directory and inspect the implementation status and limitations of each project.",
    links: [
      { label: "Browse projects", href: "/projects" },
      { label: "Detector Coverage Atlas", href: "/work/detector-coverage-atlas" },
    ],
  },
  {
    id: "story",
    pillar: "Beyond the work",
    title: "What makes you curious?",
    summary: "My background in advertising shaped how I think about the audience, the message, and the system behind the work. Start with the story, then see the experiments.",
    links: [
      { label: "Read about me", href: "/about" },
      { label: "Explore side projects", href: "/projects" },
    ],
  },
] as const;

export function BuilderGuide() {
  const [selected, setSelected] = useState<(typeof journeys)[number]["id"]>("people");
  const active = journeys.find((journey) => journey.id === selected) ?? journeys[0];

  return (
    <section aria-label="Choose a portfolio journey" className="rounded-2xl border border-border bg-card p-5 sm:p-7">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted">The Builder Guide / Phase 1</p>
          <h2 className="mt-2 font-display text-2xl sm:text-3xl">People first. Problem-driven. Systems-minded.</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">Choose what matters to you. Each answer points to an existing public page rather than inventing a new claim.</p>
        </div>
        <span aria-hidden="true" className="rounded-full border border-border bg-background px-3 py-2 text-sm text-accent">joy. ✳</span>
      </div>
      <div className="mt-6 grid gap-2 sm:grid-cols-2">
        {journeys.map((journey) => (
          <button
            key={journey.id}
            type="button"
            onClick={() => setSelected(journey.id)}
            aria-pressed={selected === journey.id}
            className={`min-h-16 rounded-xl border p-4 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${selected === journey.id ? "border-accent bg-background" : "border-border hover:border-accent"}`}
          >
            <span className="block text-xs text-muted">{journey.pillar}</span>
            <span className="mt-1 block text-sm font-medium">{journey.title}</span>
          </button>
        ))}
      </div>
      <div role="region" aria-live="polite" aria-atomic="true" className="mt-5 rounded-xl border border-border bg-background p-5">
        <p className="text-xs font-medium text-accent">{active.pillar}</p>
        <h3 className="mt-2 text-xl font-semibold">{active.title}</h3>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">{active.summary}</p>
        <div className="mt-5 flex flex-wrap gap-3">
          {active.links.map((link) => (
            <Link key={link.href} href={link.href} className="inline-flex min-h-11 items-center rounded-md border border-border px-4 py-2 text-sm font-medium text-accent hover:border-accent">
              {link.label} <span aria-hidden="true" className="ml-2">↗</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
