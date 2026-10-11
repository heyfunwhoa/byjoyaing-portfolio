import type { ReactNode } from "react";

/** A short aside. It annotates the section; it is not a second headline. */
export function Marginalia({ children }: { children: ReactNode }) {
  return (
    <p className="mt-4 max-w-[28ch] text-sm leading-6 text-muted">
      <span aria-hidden="true" className="mr-2 text-accent">
        ※
      </span>
      {children}
    </p>
  );
}
