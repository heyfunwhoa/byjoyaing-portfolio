"use client";

import { ArrowLeft } from "@/components/icons/arrow-left";
import { ArrowRight } from "@/components/icons/arrow-right";
import { ProjectEvidence } from "@/components/project-evidence";
import type { FeaturedSlide } from "@/lib/featured-work";
import { getProject, statusCopy } from "@/lib/portfolio";
import {
  directoryProjects,
  directoryStatus,
  type DirectoryCategory,
} from "@/lib/project-directory";
import { projectAction } from "@/lib/project-presentation";
import { salesFor } from "@/lib/sales";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type QuestCard = {
  slide: FeaturedSlide;
  categories: DirectoryCategory[];
  problem: string;
  contribution: string;
  value: string;
  phase: string;
  statusLabel: string;
  technologies: string;
  preview: "atlas" | "competitive" | "account" | "note";
};

function cardsFor(slides: readonly FeaturedSlide[]): QuestCard[] {
  return slides.flatMap((slide) => {
    const directory = directoryProjects.find((item) => item.slug === slide.id);
    const project = getProject(slide.id);
    if (!directory || !project) return [];
    return [
      {
        slide,
        categories: directory.categories,
        problem: project.problem.summary,
        contribution: directory.role,
        value: salesFor(slide.id).decision,
        phase: directory.phase,
        statusLabel: directoryStatus(directory.status).label || statusCopy[directory.status],
        technologies: directory.technologies,
        preview: directory.preview,
      },
    ];
  });
}

/**
 * A snap strip, not the Work Embla carousel. Sage cards, real project
 * facts, and a peek of the next build. No autoplay.
 */
export function FeaturedSideQuestStrip({
  slides,
}: {
  slides: readonly FeaturedSlide[];
}) {
  const scroller = useRef<HTMLUListElement>(null);
  const cards = cardsFor(slides);
  const filters = [
    "All featured",
    ...new Set(cards.flatMap((card) => card.categories)),
  ];
  const [filter, setFilter] = useState("All featured");
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const visible =
    filter === "All featured"
      ? cards
      : cards.filter((card) => card.categories.includes(filter as DirectoryCategory));

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const sync = () => {
      setAtStart(el.scrollLeft <= 1);
      setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 1);
    };
    el.scrollLeft = 0;
    sync();
    el.addEventListener("scroll", sync, { passive: true });
    const observer = new ResizeObserver(sync);
    observer.observe(el);
    return () => {
      el.removeEventListener("scroll", sync);
      observer.disconnect();
    };
  }, [filter, visible.length]);

  function scrollByCard(direction: -1 | 1) {
    const el = scroller.current;
    const card = el?.querySelector("li");
    if (!el || !card) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const amount = card.getBoundingClientRect().width + 16;
    el.scrollBy({ left: direction * amount, behavior: reduced ? "auto" : "smooth" });
  }

  return (
    <div className="w-full min-w-0 max-w-full">
      <div role="group" aria-label="Filter featured builds" className="mt-4 flex max-w-full flex-wrap gap-2">
        {filters.map((item) => {
          const selected = filter === item;
          return (
            <button
              key={item}
              type="button"
              aria-pressed={selected}
              onClick={() => setFilter(item)}
              className={
                selected
                  ? "min-h-11 max-w-full whitespace-normal rounded-md bg-accent px-3 py-2 text-left text-sm font-medium text-accent-foreground"
                  : "min-h-11 max-w-full whitespace-normal rounded-md border border-border bg-card px-3 py-2 text-left text-sm font-medium hover:border-accent"
              }
            >
              {item}
            </button>
          );
        })}
      </div>
      <p role="status" className="mt-3 text-sm text-muted">
        {visible.length} featured {visible.length === 1 ? "build" : "builds"}
      </p>
      {visible.length === 0 ? (
        <p className="mt-4 rounded-xl border border-dashed border-border p-4 text-sm leading-6">
          None of the featured builds match. The directory still has every project in that focus.
        </p>
      ) : (
        <ul
          ref={scroller}
          aria-label="Featured independent builds"
          tabIndex={0}
          className="mt-4 flex w-full min-w-0 max-w-full snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-2 focus-visible:outline-2 focus-visible:outline-ring motion-reduce:scroll-auto"
        >
          {visible.map((card) => {
            const action = projectAction(card.slide.id)?.label ?? "Explore the project";
            return (
              <li
                key={card.slide.id}
                className="w-[min(22rem,85%)] min-w-0 shrink-0 snap-start sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.7rem)]"
              >
                <article className="editorial-panel flex h-full min-w-0 max-w-full flex-col overflow-hidden bg-surface-sage p-5 sm:p-6">
                  <p className="editorial-eyebrow text-accent">{card.categories[0]}</p>
                  <h3 className="mt-3 font-display text-xl leading-tight tracking-tight">
                    <Link
                      href={card.slide.href}
                      className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                    >
                      {card.slide.title}
                    </Link>
                  </h3>
                  <p className="mt-3 text-sm leading-6">
                    <span className="font-medium">Problem: </span>
                    {card.problem}
                  </p>
                  <p className="mt-2 text-sm leading-6">
                    <span className="font-medium">Contribution: </span>
                    {card.contribution}
                  </p>
                  <p className="mt-2 text-sm leading-6">
                    <span className="font-medium">Intended value: </span>
                    {card.value}
                  </p>
                  <p className="mt-3 text-xs leading-5 text-muted">
                    {card.phase} · {card.statusLabel}
                  </p>
                  {card.preview === "note" ? null : (
                    <div className="mt-3 min-w-0">
                      <ProjectEvidence kind={card.preview} compact />
                    </div>
                  )}
                  <p className="mt-3 text-xs leading-5 text-muted">{card.technologies}</p>
                  <Link
                    href={card.slide.href}
                    aria-label={`${action}: ${card.slide.title}`}
                    className="editorial-link mt-auto inline-flex min-h-11 items-end pt-5 text-sm font-semibold text-accent underline"
                  >
                    {action}
                    <ArrowRight size={16} className="nudge-link ml-2 inline-block size-4" />
                  </Link>
                </article>
              </li>
            );
          })}
        </ul>
      )}
      <div className="mt-3 flex min-w-0 max-w-full flex-wrap items-center gap-2">
        <button
          type="button"
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-card px-4 text-sm font-semibold disabled:opacity-40"
          disabled={atStart || visible.length < 2}
          onClick={() => scrollByCard(-1)}
        >
          <ArrowLeft size={16} className="size-4" />
          Previous featured build
        </button>
        <button
          type="button"
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-card px-4 text-sm font-semibold disabled:opacity-40"
          disabled={atEnd || visible.length < 2}
          onClick={() => scrollByCard(1)}
        >
          Next featured build
          <ArrowRight size={16} className="size-4" />
        </button>
      </div>
      <Link
        href="/projects#directory"
        className="mt-3 inline-flex min-h-11 items-center text-sm font-semibold text-accent underline underline-offset-4"
      >
        Browse all independent projects →
      </Link>
    </div>
  );
}
