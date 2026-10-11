"use client";

import { Mark } from "@/components/mark";
import { isActive, menuPanelClass, primaryNav } from "@/lib/site-nav";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const desktopNav = "(min-width: 1024px)";

export function SiteHeader() {
  const pathname = usePathname();
  const [openOnPath, setOpenOnPath] = useState<string | null>(null);
  const open = openOnPath === pathname;
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const media = window.matchMedia(desktopNav);
    if (media.matches) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const inertTargets = [
      document.querySelector(".skip-link"),
      document.getElementById("main-content"),
      document.querySelector("footer"),
    ].filter((node): node is HTMLElement => node instanceof HTMLElement);
    for (const node of inertTargets) node.setAttribute("inert", "");

    menuRef.current?.querySelector<HTMLAnchorElement>("a[href]")?.focus();

    function closeFromKeyboard(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      event.preventDefault();
      setOpenOnPath(null);
      menuButtonRef.current?.focus();
    }
    function closeOnDesktop(event: MediaQueryListEvent) {
      if (event.matches) setOpenOnPath(null);
    }

    document.addEventListener("keydown", closeFromKeyboard);
    media.addEventListener("change", closeOnDesktop);
    return () => {
      document.body.style.overflow = previousOverflow;
      for (const node of inertTargets) node.removeAttribute("inert");
      document.removeEventListener("keydown", closeFromKeyboard);
      media.removeEventListener("change", closeOnDesktop);
    };
  }, [open]);

  function closeMenu() {
    setOpenOnPath(null);
  }
  function dismissMenu() {
    setOpenOnPath(null);
    menuButtonRef.current?.focus();
  }

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border bg-background">
        <nav className="relative mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-5 py-4 sm:px-8" aria-label="Primary">
          <Link href="/" className="group/brand relative flex min-w-0 items-center gap-2.5 rounded-md text-foreground">
            <span className="relative shrink-0">
              <Mark className="text-accent" />
              <span className="pointer-events-none absolute top-[calc(100%+0.4rem)] left-0 z-40 hidden w-max rounded-md border border-border bg-card px-2 py-1 text-xs font-medium text-foreground group-hover/brand:block group-focus-visible/brand:block">
                joy.
              </span>
            </span>
            <span className="min-w-0 font-display text-base tracking-tight sm:text-lg">Kristen Joy Aing</span>
          </Link>
          <button
            ref={menuButtonRef}
            type="button"
            className="min-h-11 min-w-11 shrink-0 rounded-md border border-border px-3 py-2 text-sm font-medium lg:hidden"
            aria-expanded={open}
            aria-controls="primary-menu"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setOpenOnPath(open ? null : pathname)}
          >
            {open ? "Close" : "Menu"}
          </button>
          <div id="primary-menu" ref={menuRef} className={menuPanelClass(open)}>
            <ul className="flex flex-col gap-1 text-sm lg:flex-row lg:flex-wrap lg:items-center lg:justify-end lg:gap-x-4 lg:gap-y-1">
              {primaryNav.map((link) => {
                const active = isActive(pathname, link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={closeMenu}
                      aria-current={active ? "page" : undefined}
                      className={`inline-flex min-h-11 items-center rounded-md px-1 underline-offset-4 hover:underline lg:min-h-0 ${active ? "font-semibold text-accent underline decoration-2" : "text-muted hover:text-foreground"}`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
      </header>
      {open ? (
        <div
          aria-hidden="true"
          onClick={dismissMenu}
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
        />
      ) : null}
    </>
  );
}
