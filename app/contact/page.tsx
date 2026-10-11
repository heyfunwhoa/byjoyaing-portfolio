import { InquiryForm } from "@/app/inquiry-form";
import { PageMain } from "@/components/page-main";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  alternates: { canonical: "/contact" },
  openGraph: { url: "/contact" },
  title: "Contact — Kristen Joy Aing",
  description:
    "Connect with Kristen Joy Aing about enterprise cybersecurity, revenue leadership, GTM systems, and independent projects.",
};

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-7">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.35V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124ZM7.119 20.452H3.555V9h3.564v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0Z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-7">
      <path d="M12 .5a11.5 11.5 0 0 0-3.638 22.41c.575.107.785-.25.785-.555v-2.12c-3.195.695-3.87-1.354-3.87-1.354-.523-1.327-1.276-1.681-1.276-1.681-1.045-.714.08-.699.08-.699 1.156.082 1.765 1.187 1.765 1.187 1.027 1.761 2.694 1.252 3.35.958.105-.744.402-1.252.731-1.54-2.55-.29-5.23-1.276-5.23-5.686 0-1.257.45-2.284 1.185-3.089-.12-.29-.514-1.462.113-3.048 0 0 .966-.31 3.164 1.18a10.99 10.99 0 0 1 5.757 0c2.195-1.49 3.16-1.18 3.16-1.18.63 1.586.236 2.758.117 3.048.738.805 1.183 1.832 1.183 3.089 0 4.421-2.684 5.393-5.242 5.677.415.359.783 1.066.783 2.148v3.18c0 .308.207.667.792.554A11.503 11.503 0 0 0 12 .5Z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="size-7">
      <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
      <path d="m3 6 9 7 9-7" />
    </svg>
  );
}

const contactLinks: {
  label: string;
  description: string;
  href: string;
  icon: ReactNode;
  external?: boolean;
}[] = [
  {
    label: "LinkedIn",
    description: "Connect professionally",
    href: "https://www.linkedin.com/in/kristenaing",
    icon: <LinkedInIcon />,
    external: true,
  },
  {
    label: "Email",
    description: "Send a note directly",
    href: "mailto:kristen.aing@gmail.com",
    icon: <EmailIcon />,
  },
  {
    label: "GitHub",
    description: "Explore my projects",
    href: "https://github.com/heyfunwhoa",
    icon: <GitHubIcon />,
    external: true,
  },
];

export default function ContactPage() {
  return (
    <PageMain>
      <div className="flex flex-col gap-12 py-12 sm:gap-16 sm:py-16">
        <section className="grid items-center gap-8 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-12" aria-labelledby="contact-title">
          <div className="flex min-h-64 items-center justify-center rounded-2xl border border-border bg-card p-8 sm:min-h-80">
            <div className="flex flex-col items-center gap-3 text-center">
              <span aria-hidden="true" className="flex size-16 items-center justify-center rounded-full border border-border text-3xl text-accent">✳</span>
              <p className="text-sm text-muted">Photo coming soon</p>
            </div>
          </div>
          <div className="flex min-w-0 flex-col gap-5">
            <p className="editorial-eyebrow text-accent">Contact / Let&apos;s talk</p>
            <h1 id="contact-title" className="font-display text-4xl leading-[1.08] tracking-tight sm:text-5xl">Let&apos;s connect.</h1>
            <div>
              <p className="text-lg font-semibold text-foreground">Kristen Joy Aing</p>
              <p className="mt-1 text-sm text-muted">Revenue &amp; GTM Leader · Curious Builder</p>
            </div>
            <p className="max-w-prose text-base leading-7 text-muted">
              I&apos;m always interested in thoughtful conversations about enterprise cybersecurity, revenue leadership, useful systems, and what we might build together.
            </p>
            <p className="text-sm font-medium text-foreground">People first. Problem-driven. Systems-minded.</p>
          </div>
        </section>

        <section aria-labelledby="connect-options-title">
          <h2 id="connect-options-title" className="mb-5 text-xl font-semibold tracking-tight">Other ways to connect</h2>
          <div className="grid gap-3 sm:grid-cols-3">
            {contactLinks.map(({ label, description, href, icon, external }) => (
              <a
                key={label}
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group flex min-h-36 min-w-0 flex-col justify-between gap-5 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-accent focus-visible:rounded-2xl"
                aria-label={`${label}: ${description}`}
              >
                <span className="text-foreground">{icon}</span>
                <span className="flex items-end justify-between gap-3">
                  <span className="min-w-0">
                    <span className="block font-semibold text-foreground">{label}</span>
                    <span className="mt-1 block text-sm text-muted">{description}</span>
                  </span>
                  <span aria-hidden="true" className="shrink-0 text-accent transition-transform motion-safe:group-hover:translate-x-0.5">↗</span>
                </span>
              </a>
            ))}
          </div>
        </section>

        <section aria-labelledby="send-note-title" className="rounded-2xl border border-border bg-card p-5 sm:p-8">
          <div className="mb-8 space-y-2">
            <p className="editorial-eyebrow text-accent">Send a note</p>
            <h2 id="send-note-title" className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">I&apos;d love to hear from you.</h2>
            <p className="text-sm leading-6 text-muted">
              Prefer email? Write to{" "}
              <a href="mailto:kristen.aing@gmail.com" className="editorial-link underline text-foreground">kristen.aing@gmail.com</a>.
            </p>
          </div>
          <InquiryForm />
        </section>
      </div>
    </PageMain>
  );
}
