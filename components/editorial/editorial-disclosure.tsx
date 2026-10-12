import type { ReactNode } from "react";

export function EditorialDisclosure({ title, description, children }: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <details className="editorial-disclosure group rounded-xl border border-border bg-background open:bg-card">
      <summary className="flex min-h-14 cursor-pointer list-none items-start justify-between gap-4 rounded-xl p-5 text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring [&::-webkit-details-marker]:hidden">
        <span className="min-w-0">
          <span className="block text-lg font-semibold">{title}</span>
          {description ? <span className="mt-2 block text-sm leading-6 text-muted">{description}</span> : null}
        </span>
        <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="mt-1 size-5 shrink-0 text-accent transition-transform duration-200 group-open:rotate-180">
          <path d="m5 7.5 5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </summary>
      <div className="disclosure-content border-t border-border px-5 py-6">{children}</div>
    </details>
  );
}
