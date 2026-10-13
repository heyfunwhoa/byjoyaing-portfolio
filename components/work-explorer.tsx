"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Collapsible } from "radix-ui";
import {
  ArrowUpRight,
  ChevronDown,
  Crosshair,
  Users,
  Layers,
} from "lucide-react";
import { BentoGrid } from "@/components/ui/bento-grid";
import styles from "./work-explorer.module.css";

const categories = [
  {
    id: "enterprise-sales",
    title: "Enterprise Sales",
    eyebrow: "01 / Revenue execution",
    description:
      "Connect the technical evaluation, business case and buying group.",
    tags: ["Discovery", "Alignment", "Execution"],
    Icon: Crosshair,
  },
  {
    id: "people-leadership",
    title: "People & Leadership",
    eyebrow: "02 / People",
    description: "Help teammates ramp, build confidence and share expertise.",
    tags: ["Coaching", "Onboarding"],
    Icon: Users,
  },
  {
    id: "gtm-strategy",
    title: "GTM Strategy",
    eyebrow: "03 / Systems",
    description: "Turn competitive evidence into useful field guidance.",
    tags: ["Research", "Positioning"],
    Icon: Layers,
  },
] as const;

/** Bento composition from the local Magic UI bank; Radix owns disclosure semantics. */
export function WorkExplorer({ stories }: { stories: ReactNode[] }) {
  const [active, setActive] = useState<string | null>(null);
  const triggers = useRef<Record<string, HTMLButtonElement | null>>({});
  useEffect(() => {
    const syncHash = () => {
      const id = window.location.hash.slice(1);
      if (categories.some((category) => category.id === id)) setActive(id);
    };
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, []);

  function close(id: string) {
    setActive(null);
    triggers.current[id]?.focus();
  }

  return (
    <BentoGrid className="mt-7 auto-rows-auto items-start md:auto-rows-auto md:grid-cols-2 lg:grid-cols-4">
      {categories.map(
        ({ id, title, eyebrow, description, tags, Icon }, index) => (
          <Collapsible.Root
            key={id}
            open={active === id}
            onOpenChange={(open) => setActive(open ? id : null)}
            className="contents"
          >
            <div
              id={id}
              className={`min-w-0 scroll-mt-24 self-stretch ${index === 0 ? "md:col-span-2" : ""}`}
            >
              <Collapsible.Trigger asChild>
                <button
                  ref={(node) => {
                    triggers.current[id] = node;
                  }}
                  type="button"
                  aria-controls={`${id}-evidence`}
                  className={`${styles.card} group flex h-full min-h-72 w-full flex-col rounded-2xl border p-6 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring sm:p-7 ${index === 0 ? "border-foreground bg-foreground text-background" : "border-border bg-card text-foreground"}`}
                >
                  <span className="flex w-full items-center justify-between gap-3 text-xs font-semibold tracking-wide">
                    <span>{eyebrow}</span>
                    <ArrowUpRight aria-hidden="true" className="size-5" />
                  </span>
                  <span
                    aria-hidden="true"
                    className={`${styles.symbol} my-6 flex size-14 items-center justify-center rounded-2xl border border-current/25`}
                  >
                    <Icon className="size-7" />
                  </span>
                  <span
                    className={`font-display leading-tight ${index === 0 ? "text-3xl sm:text-4xl" : "text-2xl"}`}
                  >
                    {title}
                  </span>
                  <span className="mt-3 max-w-md text-sm leading-6">
                    {description}
                  </span>
                  <span className="mt-5 flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-current/25 px-3 py-1 text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </span>
                  <span className="mt-auto flex min-h-11 w-full items-center justify-between gap-3 pt-6 text-sm font-semibold">
                    {active === id ? "Collapse story" : "Explore the evidence"}
                    <ChevronDown
                      aria-hidden="true"
                      className={`${styles.chevron} size-5 ${active === id ? "rotate-180" : ""}`}
                    />
                  </span>
                </button>
              </Collapsible.Trigger>
            </div>
            <Collapsible.Content
              id={`${id}-evidence`}
              className={`${styles.panel} col-span-full min-w-0 md:order-1`}
            >
              <section
                aria-label={`${title} evidence`}
                className="rounded-2xl border border-border bg-surface-sage p-3 sm:p-5"
              >
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2 px-2">
                  <p className="text-sm font-semibold">
                    {title} / The story behind the work
                  </p>
                  <button
                    type="button"
                    onClick={() => close(id)}
                    className="min-h-11 rounded-lg px-3 text-sm font-semibold text-accent underline underline-offset-4"
                  >
                    Close story<span className="sr-only">: {title}</span>
                  </button>
                </div>
                {stories[index]}
              </section>
            </Collapsible.Content>
          </Collapsible.Root>
        ),
      )}
    </BentoGrid>
  );
}
