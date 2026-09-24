"use client";

import { Mark } from "@/components/mark";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  if (href === "/projects") return pathname === "/projects" || pathname.startsWith("/work");
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background">
      <nav className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-5 py-4 sm:px-8" aria-label="Primary">
        <Link href="/" className="flex items-center gap-2.5 text-foreground">
          <Mark className="text-accent" />
          <span className="font-display text-lg tracking-tight">Kristen Joy Aing</span>
        </Link>
        <button
          type="button"
          className="rounded-md border border-border px-3 py-2 text-sm font-medium md:hidden"
          aria-expanded={open}
          aria-controls="primary-menu"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Close" : "Menu"}
        </button>
        <div id="primary-menu" className={open ? "absolute inset-x-0 top-full border-b border-border bg-background px-5 py-4 md:static md:border-0 md:bg-transparent md:p-0" : "hidden md:block"}>
          <ul className="flex flex-col gap-3 text-sm md:flex-row md:items-center md:gap-6">
            {links.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={active ? "font-medium text-accent" : "text-muted hover:text-foreground"}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
            <li>
              <Link href="/contact#resume" onClick={() => setOpen(false)} className="inline-flex rounded-md border border-border px-3 py-2 text-sm font-medium hover:border-accent">
                View resume
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
