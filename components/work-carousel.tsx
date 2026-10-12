"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";

type WorkPreview = { title: string; detail: string; href: string };

export function WorkCarousel({ items }: { items: readonly WorkPreview[] }) {
  const track = useRef<HTMLUListElement>(null);
  const id = useId();
  const [active, setActive] = useState(0);
  const control = "inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-border bg-card text-accent transition-colors hover:border-accent disabled:cursor-default disabled:opacity-40";

  function move(index: number) {
    const list = track.current;
    if (!list) return;
    const next = Math.max(0, Math.min(items.length - 1, index));
    const first = list.children[0] as HTMLElement;
    const slide = list.children[next] as HTMLElement;
    if (!first || !slide) return;
    list.scrollTo({
      left: slide.offsetLeft - first.offsetLeft,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  }

  function syncPosition() {
    const list = track.current;
    if (!list || !list.children.length) return;
    const first = list.children[0] as HTMLElement;
    let nearest = 0;
    let distance = Infinity;
    Array.from(list.children).forEach((child, index) => {
      const delta = Math.abs((child as HTMLElement).offsetLeft - first.offsetLeft - list.scrollLeft);
      if (delta < distance) { nearest = index; distance = delta; }
    });
    setActive(nearest);
  }

  function onKeyDown(event: KeyboardEvent<HTMLUListElement>) {
    if (event.target !== event.currentTarget) return;
    const next = event.key === "ArrowRight" ? active + 1 : event.key === "ArrowLeft" ? active - 1 : event.key === "Home" ? 0 : event.key === "End" ? items.length - 1 : null;
    if (next === null) return;
    event.preventDefault();
    move(next);
  }

  return (
    <nav aria-label="Explore professional work" aria-roledescription="carousel" className="mt-8 min-w-0">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted">Explore the work <span aria-hidden="true">· {active + 1} / {items.length}</span></p>
        <div className="flex items-center gap-2">
          <button type="button" className={control} aria-label="Previous work preview" aria-controls={id} disabled={active === 0} onClick={() => move(active - 1)}><span aria-hidden="true">←</span></button>
          <button type="button" className={control} aria-label="Next work preview" aria-controls={id} disabled={active === items.length - 1} onClick={() => move(active + 1)}><span aria-hidden="true">→</span></button>
        </div>
      </div>
      <ul ref={track} id={id} tabIndex={0} aria-label="Work previews; use left and right arrow keys to browse" onKeyDown={onKeyDown} onScroll={syncPosition} className="relative flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain rounded-xl pb-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
        {items.map((item, index) => (
          <li key={item.href} className="w-[85%] shrink-0 snap-start last:mr-[15%] sm:w-[64%] sm:last:mr-[36%]">
            <a href={item.href} className="group flex h-full min-h-56 flex-col justify-between rounded-xl border border-border bg-card p-6 transition-[border-color,background-color] duration-200 hover:border-accent hover:bg-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:p-8">
              <span className="editorial-eyebrow text-accent">{String(index + 1).padStart(2, "0")} / Professional work</span>
              <span className="mt-5 block font-display text-2xl sm:text-3xl">{item.title}</span>
              <span className="mt-3 block max-w-md text-sm leading-6 text-muted">{item.detail}</span>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent">Explore the story <span aria-hidden="true" className="nudge-link">↗</span></span>
            </a>
          </li>
        ))}
      </ul>
      <p className="sr-only" aria-live="polite" aria-atomic="true">Work preview {active + 1} of {items.length}: {items[active]?.title}</p>
    </nav>
  );
}
