import { PageMain } from "@/components/page-main";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Private case studies — Kristen Joy Aing",
  description: "Learn about invitation-based access to selected portfolio case studies.",
  robots: { index: false, follow: false },
};

export default function PrivateWorkInfoPage() {
  return (
    <PageMain>
      <header className="border-b border-border py-16">
        <Link href="/field-notes" className="text-sm font-medium text-accent">← Field Notes</Link>
        <p className="mt-8 text-xs font-medium uppercase tracking-wide text-muted">Selected work · Access by invitation</p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl sm:text-5xl">A deeper look at the work.</h1>
        <p className="mt-5 max-w-3xl text-base leading-7 text-muted">
          Public examples explain the approach. Some detailed, approved case studies and operating artifacts
          may be shared only with specific reviewers, with additional access controls.
        </p>
      </header>
      <section className="grid gap-6 border-b border-border py-12 md:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="text-xl font-semibold">What belongs here</h2>
          <p className="mt-3 text-sm leading-6 text-muted">
            Approved, sanitized deal narratives, expanded revenue operating examples,
            coaching artifacts, and decision frameworks that benefit from a smaller audience.
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="text-xl font-semibold">What never belongs here</h2>
          <p className="mt-3 text-sm leading-6 text-muted">
            Customer secrets, confidential employer documents, undisclosed account lists,
            restricted deal information, or materials I do not have permission to share.
            A login does not make disclosure authorized.
          </p>
        </div>
      </section>
      <section className="py-12">
        <h2 className="font-display text-3xl">Requesting access</h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
          The reviewer portal is not enabled yet. When available, approved reviewers will receive
          a time-limited invitation and sign in through a verified email flow. Until then,
          please contact me to discuss the right materials for the conversation.
        </p>
        <Link href="/contact" className="mt-6 inline-flex min-h-11 items-center rounded-md bg-accent px-5 py-2 text-sm font-medium text-accent-foreground">
          Contact me about access →
        </Link>
      </section>
    </PageMain>
  );
}
