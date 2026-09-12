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
  title: "Kristen Joy Aing — Technical GTM & Product",
  description:
    "I build systems that help technical products reach the market — product GTM, commercialization, and technical GTM systems across enterprise cybersecurity.",
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
          <p className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-5 py-6 text-sm text-muted sm:px-8">
            <span>Kristen Joy Aing</span>
            <a
              className="text-foreground underline decoration-border underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
              href="mailto:kristen.aing@gmail.com"
            >
              kristen.aing@gmail.com
            </a>
          </p>
        </footer>
      </body>
    </html>
  );
}
