import { robotsNoindex } from "@/lib/indexing";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: robotsNoindex,
};

export default function NotFound() {
  return (
    <main id="main-content" className="mx-auto flex w-full max-w-5xl flex-col px-5 py-16 sm:px-8">
      <h1 className="font-display text-4xl tracking-tight">Page not found</h1>
      <p className="mt-4 max-w-xl text-base leading-7 text-muted">That address is not on this site.</p>
      <p className="mt-2 max-w-xl text-base leading-7 text-muted">
        It may have moved. These are the main places to start.
      </p>
      <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-1 text-sm font-semibold">
        {[
          { href: "/", label: "Back to home" },
          { href: "/work", label: "Work" },
          { href: "/about", label: "About" },
          { href: "/contact", label: "Contact" },
        ].map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              className="inline-flex min-h-11 items-center text-accent underline underline-offset-4"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
