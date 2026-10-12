import { InquiryForm } from "@/app/inquiry-form";
import { Mail } from "@/components/icons/mail";
import { PageMain } from "@/components/page-main";
import { SocialLinks } from "@/components/social-links";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/contact" },
  openGraph: { url: "/contact" },
  title: "Contact",
  description:
    "Email, LinkedIn, and GitHub for enterprise sales, GTM, and technical systems.",
};

export default function ContactPage() {
  return (
    <PageMain>
      <section className="grid gap-12 py-16 sm:py-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:items-start lg:gap-16">
        <div className="flex flex-col gap-6">
          <h1 className="max-w-xl font-display text-4xl leading-[1.08] tracking-tight sm:text-5xl">
            Let&apos;s connect.
          </h1>
          <p className="max-w-xl text-base leading-7 text-muted">
            I&apos;m interested in sales-leadership and product-marketing conversations for technical products, and in the systems that keep the story and the sale aligned.
          </p>
          <div className="flex flex-wrap items-center gap-3" aria-label="Contact links">
            <a
              href="mailto:kristen.aing@gmail.com"
              className="link-rule inline-flex min-h-11 items-center gap-2 font-medium text-foreground hover:text-accent"
            >
              <Mail size={18} className="size-5 shrink-0" />
              kristen.aing@gmail.com
            </a>
            <span className="hidden h-8 w-px bg-border sm:block" aria-hidden="true" />
            <SocialLinks placement="contact" />
          </div>
        </div>
        <InquiryForm />
      </section>
    </PageMain>
  );
}
