"use client";

import { useId, useState } from "react";
import { Button } from "@/components/ui/button";

export const navigationPatternOptions = [
  {
    id: "sidebar",
    title: "Sidebar",
    purpose: "Move among several workspace destinations and nested tools.",
    best: "Data-heavy applications with frequent context switching.",
    tradeoff: "Reserves horizontal space, so collapse it on smaller screens.",
    projects: "GTM Revenue OS and Account Signal Engine",
  },
  {
    id: "top",
    title: "Top navigation",
    purpose: "Move between a few primary website destinations.",
    best: "Editorial websites with a small, stable set of sections.",
    tradeoff: "Long menus become crowded, especially on narrow screens.",
    projects: "Portfolio and Builder Academy landing pages",
  },
  {
    id: "tabs",
    title: "In-page tabs",
    purpose: "Switch between peer views of the same record or workflow.",
    best: "A compact set of closely related views within one page.",
    tradeoff: "Not a replacement for global navigation or sequential steps.",
    projects: "Security Market Map evidence and GTM Revenue OS campaign detail",
  },
] as const;

type Pattern = (typeof navigationPatternOptions)[number]["id"];
type Destination = "Overview" | "Accounts" | "Reports";
const destinations: Destination[] = ["Overview", "Accounts", "Reports"];

function DestinationContent({ selected }: { selected: Destination }) {
  const details: Record<Destination, { heading: string; supporting: string; metric: string }> = {
    Overview: {
      heading: "Workspace overview",
      supporting: "Review recent activity before choosing the next task.",
      metric: "3 signals need review",
    },
    Accounts: {
      heading: "Accounts",
      supporting: "Compare fictional accounts without leaving the workspace.",
      metric: "12 example accounts",
    },
    Reports: {
      heading: "Reports",
      supporting: "Check the latest modeled trends and source dates.",
      metric: "2 sample reports",
    },
  };
  const detail = details[selected];
  return (
    <div aria-live="polite" aria-atomic="true" className="min-w-0 space-y-3 p-4 sm:p-5">
      <h4 className="font-display text-lg">{detail.heading}</h4>
      <p className="text-sm leading-6 text-muted">{detail.supporting}</p>
      <p className="rounded-lg border border-border bg-background p-3 text-sm font-medium">
        {detail.metric}
      </p>
      <p className="text-xs text-muted">Fictional teaching data only</p>
    </div>
  );
}

export function NavigationPatternComparison() {
  const headingId = useId();
  const [pattern, setPattern] = useState<Pattern>("sidebar");
  const [selected, setSelected] = useState<Destination>("Overview");
  const [mobileOpen, setMobileOpen] = useState(false);
  const current = navigationPatternOptions.find((option) => option.id === pattern)!;

  const changePattern = (next: Pattern) => {
    setPattern(next);
    setMobileOpen(false);
  };
  const changeDestination = (next: Destination) => {
    setSelected(next);
    setMobileOpen(false);
  };
  const navigationItems = (label: string, horizontal: boolean) => (
    <nav aria-label={label} className={horizontal ? "flex flex-wrap gap-2" : "flex flex-col gap-2"}>
      {destinations.map((destination) => (
        <button
          key={destination}
          type="button"
          aria-current={selected === destination ? "page" : undefined}
          onClick={() => changeDestination(destination)}
          className={
            "min-h-11 rounded-lg border px-3 py-2 text-left text-sm focus-visible:outline-2 focus-visible:outline-offset-2 " +
            (selected === destination
              ? "border-foreground bg-foreground text-background"
              : "border-border bg-card")
          }
        >
          {destination}
        </button>
      ))}
    </nav>
  );
  return (
    <section aria-labelledby={headingId} className="space-y-5">
      <div>
        <p className="editorial-eyebrow text-accent">Compare design alternatives</p>
        <h2 id={headingId} className="mt-2 font-display text-2xl">
          Navigation pattern comparison
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
          Use the same example workspace to compare navigation structures. Switch the pattern,
          then select a destination to see how the content changes. This demonstration does
          not navigate to a real page or save information.
        </p>
      </div>
      <div role="group" aria-label="Navigation patterns" className="flex flex-wrap gap-2">
        {navigationPatternOptions.map((option) => (
          <Button
            key={option.id}
            type="button"
            variant={pattern === option.id ? "default" : "outline"}
            aria-pressed={pattern === option.id}
            onClick={() => changePattern(option.id)}
          >
            {option.title}
          </Button>
        ))}
      </div>
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        {pattern === "sidebar" ? (
          <div className="sm:grid sm:grid-cols-[minmax(10rem,14rem)_minmax(0,1fr)]">
            <div className="border-b border-border bg-surface-sage p-3 sm:border-b-0 sm:border-r">
              <div className="flex items-center justify-between gap-2 sm:mb-3">
                <p className="text-sm font-semibold">Example workspace</p>
                <button
                  type="button"
                  aria-expanded={mobileOpen}
                  aria-controls={headingId + "-mobile-nav"}
                  onClick={() => setMobileOpen((value) => !value)}
                  className="min-h-11 rounded-lg border border-border px-3 text-sm sm:hidden"
                >
                  {mobileOpen ? "Hide menu" : "Show menu"}
                </button>
              </div>
              <div id={headingId + "-mobile-nav"} className={(mobileOpen ? "block" : "hidden") + " mt-3 sm:mt-0 sm:block"}>
                {navigationItems("Sidebar example destinations", false)}
              </div>
            </div>
            <DestinationContent selected={selected} />
          </div>
        ) : pattern === "top" ? (
          <div>
            <div className="space-y-3 border-b border-border bg-surface-sage p-3">
              <p className="text-sm font-semibold">Example website</p>
              {navigationItems("Top navigation example destinations", true)}
            </div>
            <DestinationContent selected={selected} />
          </div>
        ) : (
          <div className="p-3">
            <p className="mb-3 text-sm font-semibold">Example account</p>
            <div role="group" aria-label="In-page view choices">
              {navigationItems("In-page example views", true)}
            </div>
            <DestinationContent selected={selected} />
          </div>
        )}
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-border p-4">
          <h3 className="font-semibold">When to use it</h3>
          <p className="mt-2 text-sm leading-6">{current.best}</p>
          <h3 className="mt-4 font-semibold">Where it fits</h3>
          <p className="mt-2 text-sm leading-6">{current.projects}</p>
        </div>
        <div className="rounded-xl border border-border p-4">
          <h3 className="font-semibold">Tradeoff</h3>
          <p className="mt-2 text-sm leading-6">{current.tradeoff}</p>
          <h3 className="mt-4 font-semibold">What changes?</h3>
          <p className="mt-2 text-sm leading-6">{current.purpose}</p>
        </div>
      </div>
      <p className="text-xs leading-5 text-muted">
        These are state-switching demonstrations, not real site routing.
        Buttons are used because they change local example content. A production implementation
        should use links for page navigation and a fully keyboard-operable tab pattern for tabs.
        Evaluate mobile, focus, zoom, and screen-reader behavior in the destination application.
      </p>
    </section>
  );
}
