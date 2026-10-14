import { EmailLink } from "@/components/email-link";
import { Mark } from "@/components/mark";
import { SiteHeader } from "@/components/site-header";
import { SocialLinks } from "@/components/social-links";
import { TooltipProvider } from "@/components/ui/tooltip";
import { socialProfiles } from "@/lib/portfolio/external-links";
import Link from "next/link";
import type { ReactNode } from "react";

const publicIdentity = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Kristen Aing",
  url: "https://www.byjoyaing.com/",
  description:
    "Enterprise cybersecurity seller, revenue and GTM leader, and independent builder.",
  knowsAbout: [
    "Enterprise cybersecurity sales",
    "Go-to-market strategy",
    "Sales enablement",
    "Security research",
  ],
  sameAs: socialProfiles.map((profile) => profile.href),
};

export function SiteFrame({ children }: { children: ReactNode }) {
  return (
    <TooltipProvider>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(publicIdentity) }}
      />
      <SiteHeader />
      {children}
      <footer data-site-chrome className="mt-auto border-t border-border">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-5 py-8 text-sm text-muted sm:flex-row sm:items-end sm:justify-between sm:px-8">
          <div className="flex flex-col gap-2">
            <span className="flex items-center gap-2 font-medium text-foreground">
              <Mark className="text-accent" />
              <span className="font-display text-accent">joy.</span>
              <span>Kristen Aing</span>
            </span>
            <p className="text-xs leading-5">
              Revenue & GTM Leader · Curious Builder · 2026
            </p>
          </div>
          <nav
            aria-label="Footer"
            className="flex max-w-sm flex-wrap gap-x-4 sm:justify-end"
          >
            {[
              ["/about", "About"],
              ["/work", "Work"],
              ["/experience", "Experience"],
              ["/field-notes", "Field Notes"],
              ["/side-quests", "Side Quests"],
              ["/contact", "Contact"],
            ].map(([href, label]) => (
              <Link
                key={href}
                href={href}
                className="inline-flex min-h-11 items-center text-foreground underline-offset-4 hover:underline"
              >
                {label}
              </Link>
            ))}
            <EmailLink placement="footer" />
            <SocialLinks placement="footer" />
          </nav>
        </div>
      </footer>
    </TooltipProvider>
  );
}
