import { DesignLabDemos } from "@/components/design-lab/demos"
import { PageMain } from "@/components/page-main"
import { designLabAvailable } from "@/lib/design-lab-gate"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

export const metadata: Metadata = {
  title: "Design lab — Kristen Joy Aing",
  robots: { index: false, follow: false },
}

export default function DesignLabPage() {
  if (!designLabAvailable()) notFound()

  return (
    <PageMain>
      <header className="border-b border-border py-12 sm:py-16">
        <p className="editorial-eyebrow text-accent">Development only</p>
        <h1 className="editorial-title mt-3">Design lab</h1>
        <p className="editorial-intro mt-4 text-muted">
          Installed primitives for review. Public pages, navigation, and the
          career list are unchanged. This route is absent from the sitemap.
        </p>
      </header>
      <DesignLabDemos />
    </PageMain>
  )
}
