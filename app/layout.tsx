import { Mark } from "@/components/mark";
import { SiteHeader } from "@/components/site-header";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.byjoyaing.com"),
  title: {
    default: "Kristen Joy Aing — Enterprise sales and GTM systems",
    template: "%s",
  },
  description:
    "Enterprise cybersecurity sales professional designing GTM systems for account research, competitive intelligence, product feedback, and field enablement.",
  openGraph: {
    title: "Kristen Joy Aing — Enterprise cybersecurity sales",
    description:
      "Enterprise cybersecurity sales, built into repeatable GTM systems.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrument.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <SiteHeader />
        {children}
        <footer className="mt-auto border-t border-border">
          <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-5 py-8 text-sm text-muted sm:flex-row sm:items-end sm:justify-between sm:px-8">
            <div className="flex flex-col gap-2">
              <span className="flex items-center gap-2 font-medium text-foreground">
                <Mark className="text-accent" />
                Kristen Joy Aing
              </span>
              <p className="text-xs leading-5">Enterprise sales and GTM systems · 2026</p>
            </div>
            <a
              className="link-rule w-fit text-foreground"
              href="mailto:kristen.aing@gmail.com"
            >
              kristen.aing@gmail.com
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
