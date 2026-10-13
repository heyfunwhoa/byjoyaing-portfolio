"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/** Native disclosure; direct links open the containing section before scrolling. */
export function DisclosureSection({
  id,
  title,
  children,
  className = "",
}: {
  id: string;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    function revealTarget() {
      let hash: string;
      try {
        hash = decodeURIComponent(window.location.hash.slice(1));
      } catch {
        return;
      }
      if (!hash) return;
      const target = document.getElementById(hash);
      if (hash !== id && !(target && ref.current?.contains(target))) return;
      setOpen(true);
      requestAnimationFrame(() =>
        target?.scrollIntoView({ block: "start", behavior: "instant" }),
      );
    }
    function followFragment(event: MouseEvent) {
      const anchor =
        event.target instanceof Element
          ? event.target.closest("a[href]")
          : null;
      if (!(anchor instanceof HTMLAnchorElement)) return;
      const url = new URL(anchor.href);
      if (
        url.origin === window.location.origin &&
        url.pathname === window.location.pathname &&
        url.search === window.location.search &&
        url.hash === window.location.hash
      )
        revealTarget();
    }
    revealTarget();
    document.addEventListener("click", followFragment);
    window.addEventListener("hashchange", revealTarget);
    return () => {
      window.removeEventListener("hashchange", revealTarget);
      document.removeEventListener("click", followFragment);
    };
  }, [id]);
  return (
    <details
      ref={ref}
      id={id}
      open={open}
      onToggle={(event) => setOpen(event.currentTarget.open)}
      className={`scroll-mt-24 rounded-2xl border border-border bg-card p-4 sm:p-6 ${className}`}
    >
      <summary className="cursor-pointer rounded-sm py-2 text-base font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
        {title}
      </summary>
      <div className="mt-4 min-w-0">{children}</div>
    </details>
  );
}
