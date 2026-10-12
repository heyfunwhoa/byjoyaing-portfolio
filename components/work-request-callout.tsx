import Link from "next/link";

export function WorkRequestCallout() {
  return (
    <aside aria-label="Request deeper work examples" className="my-8 rounded-2xl border border-border bg-surface-mist p-6 sm:p-8">
      <p className="editorial-eyebrow text-accent">Continue the conversation</p>
      <h2 className="mt-3 max-w-xl font-display text-2xl sm:text-3xl">Want to understand how I would approach your team’s challenges?</h2>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">Tell me what you’re evaluating—enterprise selling, coaching or GTM systems. I’ll review your request and discuss appropriate examples or a sanitized walkthrough.</p>
      <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
        <Link href="/contact#access" className="group inline-flex min-h-11 items-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground">Request work examples <span aria-hidden="true" className="nudge-link">→</span></Link>
        <Link href="/contact#write" className="inline-flex min-h-11 items-center text-sm font-semibold text-accent underline underline-offset-4">Send a quick note</Link>
      </div>
    </aside>
  );
}
