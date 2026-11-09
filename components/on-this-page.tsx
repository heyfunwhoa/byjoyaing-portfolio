"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

export type OnThisPageItem = { id: string; label: string };

/**
 * Sticky in-page navigation for long pages (KRU-311).
 * Sits under the site header via --site-header-offset (set by SiteHeader), highlights the
 * section in the middle of the viewport, and slides one copper underline to it.
 * Without JavaScript it is a plain list of anchor links.
 */
export function OnThisPage({
  items,
  label = "On this page",
  heading = "On this page",
  className = "",
}: {
  items: OnThisPageItem[];
  label?: string;
  heading?: string;
  className?: string;
}) {
  const [active, setActive] = useState<string | null>(null);
  const [bar, setBar] = useState<{ left: number; width: number } | null>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((node): node is HTMLElement => node !== null);
    if (sections.length === 0) return;
    const visible = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.set(entry.target.id, entry.boundingClientRect.top);
          else visible.delete(entry.target.id);
        }
        if (visible.size === 0) return;
        const next = [...visible.entries()].sort((a, b) => a[1] - b[1])[0][0];
        setActive(next);
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    for (const section of sections) observer.observe(section);
    return () => observer.disconnect();
  }, [items]);

  const measure = useCallback(() => {
    const list = listRef.current;
    const link = active ? linkRefs.current[active] : null;
    if (!list || !link) {
      setBar(null);
      return;
    }
    setBar({ left: link.offsetLeft + 12, width: Math.max(link.offsetWidth - 24, 0) });
    // Keep the active link in view on narrow screens without moving the page.
    const scroller = scrollerRef.current;
    if (scroller && scroller.scrollWidth > scroller.clientWidth) {
      const target = link.offsetLeft - scroller.clientWidth / 2 + link.offsetWidth / 2;
      scroller.scrollTo({ left: Math.max(0, target) });
    }
  }, [active]);

  useLayoutEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  return (
    <nav
      aria-label={label}
      data-on-this-page
      className={`section-nav-motion sticky top-[var(--site-header-offset,4rem)] z-30 border-y border-border bg-background/95 backdrop-blur-sm ${className}`}
    >
      <div className="flex items-center gap-3">
        <p className="editorial-eyebrow hidden shrink-0 text-muted sm:block">{heading}</p>
        <div ref={scrollerRef} className="min-w-0 overflow-x-auto [scrollbar-width:none]">
          <ul ref={listRef} className="relative flex w-max gap-x-1">
            {items.map((item) => {
              const current = item.id === active;
              return (
                <li key={item.id}>
                  <a
                    ref={(node) => {
                      linkRefs.current[item.id] = node;
                    }}
                    href={`#${item.id}`}
                    aria-current={current ? "location" : undefined}
                    onClick={() => setActive(item.id)}
                    className={`inline-flex min-h-12 items-center whitespace-nowrap rounded-md px-3 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent ${current ? "font-semibold text-accent" : "font-medium text-muted hover:text-foreground"}`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
            <span
              aria-hidden="true"
              className="section-nav-underline pointer-events-none absolute bottom-0 left-0 h-0.5 rounded-full bg-accent"
              style={{
                width: bar?.width ?? 0,
                transform: `translateX(${bar?.left ?? 0}px)`,
                opacity: bar ? 1 : 0,
              }}
            />
          </ul>
        </div>
      </div>
    </nav>
  );
}
