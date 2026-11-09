"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Vertical career line that fills with scroll (KRU-311).
 * The grey track is always drawn; a copper fill grows to the reading line (55% of the
 * viewport) and each [data-timeline-dot] inside is marked data-reached once passed.
 * Reduced motion, or no JavaScript beyond first paint: the fill shows complete.
 */
export function TimelineTrack({ children, className = "" }: { children: ReactNode; className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const fill = fillRef.current;
    if (!root || !fill) return;
    const dots = Array.from(root.querySelectorAll<HTMLElement>("[data-timeline-dot]"));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const update = () => {
      frame = 0;
      const box = root.getBoundingClientRect();
      const readingLine = window.innerHeight * 0.55;
      const progress = reduce.matches ? 1 : Math.min(1, Math.max(0, (readingLine - box.top) / Math.max(box.height, 1)));
      fill.style.transform = `scaleY(${progress})`;
      const reachedY = box.top + box.height * progress;
      for (const dot of dots) {
        const reached = reduce.matches || dot.getBoundingClientRect().top <= reachedY;
        dot.dataset.reached = reached ? "true" : "false";
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    reduce.addEventListener("change", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      reduce.removeEventListener("change", schedule);
    };
  }, []);

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <span aria-hidden="true" className="absolute top-0 bottom-0 left-0 w-px bg-border" />
      <span
        ref={fillRef}
        aria-hidden="true"
        data-timeline-fill
        className="timeline-fill absolute top-0 bottom-0 left-[-0.5px] w-0.5 origin-top rounded-full bg-accent"
        style={{ transform: "scaleY(1)" }}
      />
      {children}
    </div>
  );
}
