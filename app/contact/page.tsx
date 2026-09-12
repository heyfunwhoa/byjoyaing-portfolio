import { ContactForm } from "@/app/contact-form";
import { ResumeRequestForm } from "@/app/resume-request-form";
import { PageMain } from "@/components/page-main";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Kristen Joy Aing",
  description:
    "Email, LinkedIn, GitHub, contact form, and resume request for product GTM and technical systems conversations.",
};

export default function ContactPage() {
  return (
    <PageMain>
      <section className="flex flex-col gap-4 py-16">
        <p className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">
          Contact
        </p>
        <h1 className="font-display max-w-2xl text-4xl leading-[1.15] tracking-tight text-foreground sm:text-5xl">
          Let’s talk about product GTM, commercialization, and technical
          systems.
        </h1>
        <p className="max-w-xl leading-7 text-muted">
          Email is the fastest way to reach me. LinkedIn is best for GTM and
          product conversations. Use the form below to send a note, or request
          the resume if you want that sent directly.
        </p>
        <ul className="flex flex-col gap-3 text-sm">
          <li>
            <a
              className="text-foreground underline decoration-border underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
              href="mailto:kristen.aing@gmail.com"
            >
              kristen.aing@gmail.com
            </a>
          </li>
          <li>
            <a
              className="text-foreground underline decoration-border underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
              href="https://www.linkedin.com/in/kristenaing"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
          </li>
          <li>
            <a
              className="text-foreground underline decoration-border underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
              href="https://github.com/heyfunwhoa"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </li>
        </ul>
        <ContactForm />
        <ResumeRequestForm />
      </section>
    </PageMain>
  );
}
