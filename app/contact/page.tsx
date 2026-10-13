import { completePageMetadata } from "@/lib/page-metadata";
import { resolvePlaybookRequest } from "@/lib/playbook-request";
import { InquiryForm } from "@/app/inquiry-form";
import { EmailLink } from "@/components/email-link";
import { PageMain } from "@/components/page-main";
import { SocialLinks } from "@/components/social-links";
import type { Metadata } from "next";

export const metadata: Metadata = completePageMetadata({
  alternates: { canonical: "/contact" },
  openGraph: { url: "/contact" },
  title: "Contact",
  description:
    "Connect with Kristen Aing or request reviewed work examples covering enterprise selling, coaching and GTM systems.",
}, "/contact");

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ playbook?: string | string[]; example?: string | string[] }>;
}) {
  const { playbook, example } = await searchParams;
  const selectedPlaybook = resolvePlaybookRequest(example ?? playbook);
  return (
    <PageMain>
      <section className="grid gap-12 py-16 sm:py-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:items-start lg:gap-16">
        <div className="flex flex-col gap-6">
          <h1 className="max-w-xl font-display text-4xl leading-[1.08] tracking-tight sm:text-5xl">
            Let&apos;s talk about the work.
          </h1>
          <p className="max-w-xl text-base leading-7 text-muted">For hiring conversations, collaboration or a closer look at an example, send a message.</p>

          <div
            role="group"
            aria-label="Contact links"
            className="flex flex-wrap items-center gap-3"
          >
            <EmailLink placement="contact" />
            <SocialLinks placement="contact" />
          </div>
        </div>
        <InquiryForm selectedPlaybook={selectedPlaybook} />
      </section>
    </PageMain>
  );
}
