import Link from "next/link";

/**
 * A quiet next step after a public page that already stands alone.
 * This is not a sign-in and does not imply a reviewer portal is live.
 */
export function MaterialsInvitation({ tone = "build" }: { tone?: "work" | "build" }) {
  const work = tone === "work";

  return (
    <aside className="py-2">
      <p className="editorial-eyebrow text-accent">
        {work ? "If the conversation needs more" : "If you want the working notes"}
      </p>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
        {work
          ? "What is on this page is the public account. Sanitized notes or a closer walkthrough can be requested for a specific conversation. Customer and employer material that is not approved stays offline."
          : "This page describes what exists today, including samples and limits. Sources and anything not published here are a conversation, not a login."}
      </p>
      <Link
        href={work ? "/private-work" : "/contact"}
        className="editorial-link mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-accent underline"
      >
        {work ? "How additional materials are shared" : "Ask about this build"}
        <span aria-hidden="true" className="ml-2">→</span>
      </Link>
    </aside>
  );
}
