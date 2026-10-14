import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import type { ReactNode } from "react";
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
    default: "Revenue & GTM Leader · Curious Builder — Kristen Aing",
    template: "%s — Kristen Aing",
  },
  description:
    "Enterprise cybersecurity sales, GTM leadership, coaching and independent technical systems — the work and thinking of Kristen Aing.",
  openGraph: {
    siteName: "joy. — Kristen Aing",
    title: "Revenue & GTM Leader · Curious Builder — Kristen Aing",
    description:
      "Curious by nature. Builder by instinct. Revenue, relationships, teams and repeatable GTM systems.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">{children}</body>
    </html>
  );
}
