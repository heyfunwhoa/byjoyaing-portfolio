"use client";

import { Mark } from "@/components/mark";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/experience", label: "Work" },
  { href: "/field-notes", label: "Field Notes" },
  { href: "/projects", label: "Builds" },
  { href: "/contact", label: "Contact" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  // Legacy /work/[slug] contains both professional and independent projects.
  // Do not guess the collection from the URL alone.
  if (href === "/projects") return pathname === "/projects";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  function closeMenu() { setOpen(false); }
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
        <Link href="/" className="flex min-w-0 items-center gap-2.5 rounded-md text-foreground">
          <Mark className="text-accent" />
          <span className="font-display text-lg tracking-tight">Kristen Joy Aing</span>
        </Link>
        <button
          ref={menuButtonRef}
          type="button"
          className="min-h-11 min-w-11 shrink-0 rounded-md border border-border px-3 py-2 text-sm font-medium lg:hidden"
          aria-expanded={open}
          aria-controls="primary-menu"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Close" : "Menu"}
        </button>
        <div id="primary-menu" onKeyDown={handleMenuKeyDown} className={open ? "absolute inset-x-0 top-full border-b border-border bg-background px-5 py-4 lg:static lg:border-0 lg:bg-transparent lg:p-0" : "hidden lg:block"}>
          <ul className="flex flex-col gap-3 text-sm lg:flex-row lg:items-center lg:gap-6">
            {links.map((link) => {
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
            <li>
              <Link href="/contact#resume" onClick={() => setOpen(false)} className="inline-flex min-h-11 items-center rounded-md border border-border px-3 py-2 text-sm font-medium hover:border-accent">
                View resume
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
