import { InquiryForm } from "@/app/inquiry-form";
import { Kicker } from "@/components/kicker";
import { PageMain } from "@/components/page-main";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Kristen Joy Aing",
  description:
    "Email, LinkedIn, GitHub, contact form, and resume request for product GTM and technical systems conversations.",
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
          <Kicker>Contact</Kicker>
          <h1 className="font-display max-w-xl text-4xl leading-[1.12] tracking-tight text-foreground sm:text-6xl">
            Let’s talk about product GTM, commercialization, and technical
            systems.
          </h1>
          <p className="max-w-xl text-base leading-7 text-muted">
            Email is the fastest way to reach me. LinkedIn is best for GTM and
            product conversations.
          </p>
          <p className="flex flex-wrap items-center gap-x-3 gap-y-2 text-base">
            {links.map((link, index) => (
              <span key={link.href} className="flex items-center gap-3">
                {index > 0 ? (
                  <span className="text-muted" aria-hidden="true">
                    ·
                  </span>
                ) : null}
                <a
                  className="link-rule text-foreground"
                  href={link.href}
                  {...(link.external
                    ? { target: "_blank", rel: "noreferrer" }
                    : {})}
                >
                  {link.label}
                </a>
              </span>
            ))}
          </p>
        </div>
        <InquiryForm />
      </section>
    </PageMain>
  );
}
