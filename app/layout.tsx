import { Mark } from "@/components/mark";
import { VercelAnalytics } from "@/components/vercel-analytics";
import { EmailLink } from "@/components/email-link";
import { SiteHeader } from "@/components/site-header";
import { SocialLinks } from "@/components/social-links";
import { socialProfiles } from "@/lib/portfolio/external-links";
import { TooltipProvider } from "@/components/ui/tooltip";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.byjoyaing.com"),
  title: {
    default: "Kristen Aing | Cybersecurity Sales & GTM Leadership",
    template: "%s — Kristen Aing",
  },
  description:
    "Enterprise cybersecurity sales, team development and practical GTM systems from Kristen Aing.",
  openGraph: {
    siteName: "joy. — Kristen Aing",
    title: "Kristen Aing | Cybersecurity Sales & GTM Leadership",
    description:
      "Curious by nature. Builder by instinct. Revenue, relationships, teams and repeatable GTM systems.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
  },
};

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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
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
        <VercelAnalytics />
      </body>
    </html>
  );
}
