import { InquiryForm } from "@/app/inquiry-form";
import { EmailLink } from "@/components/email-link";
import { PageMain } from "@/components/page-main";
import { SocialLinks } from "@/components/social-links";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/contact" },
  openGraph: { url: "/contact" },
  title: "Contact",
  description:
    "Connect with Kristen Aing or request reviewed work examples covering enterprise selling, coaching and GTM systems.",
};

export default function ContactPage() {
  return (
    <PageMain>
      <section className="grid gap-12 py-16 sm:py-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:items-start lg:gap-16">
        <div className="flex flex-col gap-6">
          <h1 className="max-w-xl font-display text-4xl leading-[1.08] tracking-tight sm:text-5xl">
            Let&apos;s talk about the work.
          </h1>
          <p className="max-w-xl text-base leading-7 text-muted">
            If you&apos;re evaluating me for an enterprise sales or leadership role, you can request a deeper look at how I approach deals, develop teammates, and build useful GTM systems. For a quick conversation, use the email or LinkedIn icons.
          </p>
          <div className="rounded-xl border border-border bg-card p-5">
            <h2 className="font-semibold">A deeper look, with context</h2>
            <p className="mt-2 text-sm leading-6 text-muted">
              Tell me what you want to evaluate. I&apos;ll review the request and discuss suitable examples, a sanitized walkthrough, or a conversation. The public Work pages remain available to everyone.
            </p>
            <a
              href="#access"
              className="mt-3 inline-flex min-h-11 items-center text-sm font-semibold text-accent underline underline-offset-4"
            >
              Request work examples →
            </a>
          </div>
          <div role="group" aria-label="Contact links" className="flex flex-wrap items-center gap-3">
            <EmailLink placement="contact" />
            <SocialLinks placement="contact" />
          </div>
        </div>
        <InquiryForm />
      </section>
    </PageMain>
  );
}
