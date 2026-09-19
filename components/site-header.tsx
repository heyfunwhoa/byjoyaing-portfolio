"use client";

import { Mark } from "@/components/mark";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background">
      <nav
        className="mx-auto flex w-full max-w-5xl items-center justify-between gap-6 px-5 py-4 sm:px-8"
        aria-label="Primary"
      >
        <Link
          href="/"
          className="flex items-center gap-2.5 text-foreground"
        >
          <Mark className="text-accent" />
          <span className="font-display text-lg tracking-tight">
            Kristen Joy Aing
          </span>
        </Link>
        <ul className="flex flex-wrap items-center justify-end gap-x-7 gap-y-2 text-sm text-muted">
          {links.map((link) => {
            const active =
              pathname === link.href ||
              pathname.startsWith(`${link.href}/`) ||
              (link.href === "/projects" && pathname.startsWith("/work"));
            return (
              <li key={link.href}>
                <Link
                  className={
                    active
                      ? "link-rule font-medium text-accent"
                      : "link-rule hover:text-foreground"
                  }
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
