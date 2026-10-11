"use client";

import { Mark } from "@/components/mark";
import { isActive, menuPanelClass, primaryNav } from "@/lib/site-nav";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export function SiteHeader() {
  const pathname = usePathname();
  const [openOnPath, setOpenOnPath] = useState<string | null>(null);
  const open = openOnPath === pathname;
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [open]);

  function closeMenu() { setOpenOnPath(null); }
  function handleMenuKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape" && open) {
      event.stopPropagation();
      closeMenu();
      menuButtonRef.current?.focus();
    }
  }

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background">
      <nav className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-5 py-4 sm:px-8" aria-label="Primary">
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
        {open && <button type="button" aria-label="Close navigation" onClick={closeMenu} className="fixed inset-0 top-[4.75rem] z-20 bg-foreground/30 lg:hidden" />}
        <div id="primary-menu" onKeyDown={handleMenuKeyDown} className={menuPanelClass(open)}>
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
  );
}
