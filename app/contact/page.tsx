import { InquiryForm } from "@/app/inquiry-form";
import { ArrowUpRight } from "@/components/icons/arrow-up-right";
import { Mail } from "@/components/icons/mail";
import { PageMain } from "@/components/page-main";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/contact" },
  openGraph: { url: "/contact" },
  title: "Contact — Kristen Joy Aing",
  description:
    "Email, LinkedIn, and GitHub for enterprise sales, GTM, and technical systems.",
};

const links = [
  { href: "mailto:kristen.aing@gmail.com", label: "kristen.aing@gmail.com" },
  {
    href: "https://www.linkedin.com/in/kristenaing",
    label: "LinkedIn",
    external: true,
  },
  {
    href: "https://github.com/heyfunwhoa",
    label: "GitHub",
    external: true,
  },
];

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
          <ul className="flex flex-col gap-1 text-base sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-3 sm:gap-y-2">
            {links.map((link, index) => (
              <li key={link.href} className="flex items-center gap-3">
                {index > 0 ? (
                  <span className="hidden text-muted sm:inline" aria-hidden="true">
                    ·
                  </span>
                ) : null}
                <a
                  className="link-rule inline-flex min-h-11 items-center gap-1.5 text-foreground"
                  href={link.href}
                  {...(link.external
                    ? { target: "_blank", rel: "noreferrer" }
                    : {})}
                >
                  {link.href.startsWith("mailto:") ? <Mail size={16} className="size-4 shrink-0" /> : null}
                  {link.label}
                  {link.external ? <ArrowUpRight size={16} className="size-4 shrink-0" /> : null}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <InquiryForm />
      </section>
    </PageMain>
  );
}
