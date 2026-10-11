import type { ReactNode } from "react";

/**
 * Static orbit around the approved portrait.
 * Decorative only. The face does not animate, and the rings do not spin.
 */
export function CelestialFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative px-3 pt-4 pb-1 sm:px-4">
      <svg
        aria-hidden="true"
        viewBox="0 0 200 200"
        className="pointer-events-none absolute inset-0 h-full w-full text-[#D6C8B6]"
      >
        <circle cx="100" cy="96" r="90" fill="none" stroke="currentColor" strokeWidth="0.7" opacity="0.55" />
        <circle cx="100" cy="96" r="76" fill="none" stroke="currentColor" strokeWidth="0.45" strokeDasharray="1.4 3.2" opacity="0.4" />
        <circle cx="174" cy="52" r="2" fill="currentColor" opacity="0.85" />
        <circle cx="28" cy="138" r="1.5" fill="currentColor" opacity="0.7" />
        <circle cx="146" cy="178" r="1.25" fill="currentColor" opacity="0.65" />
        <path d="M174 52 L146 178" fill="none" stroke="currentColor" strokeWidth="0.4" opacity="0.35" />
      </svg>
      <div className="relative">{children}</div>
    </div>
  );
}
