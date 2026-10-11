import { GeometricMotif } from "@/components/geometric-motif";
import Link from "next/link";

/**
 * Three-destination editorial bento.
 * Reading order stays Work, then Field Notes, then Side Quests.
 * Tiles stack in that order below the `lg` breakpoint.
 * Asymmetric spans apply only from `lg` up.
 */
export function EditorialBento() {
  return (
    <section aria-labelledby="explore-bento-title" className="section-enter border-b border-border py-12 sm:py-16">
      <p className="editorial-eyebrow text-accent">02 / Explore</p>
      <h2 id="explore-bento-title" className="editorial-section-title mt-3 max-w-[14ch]">
        Explore my work.
      </h2>

      <div className="mt-8 grid min-w-0 gap-3 sm:grid-cols-2 lg:grid-cols-12 lg:grid-rows-2 lg:gap-4">
        <Link
          href="/work"
          className="group editorial-panel relative flex min-h-72 min-w-0 flex-col overflow-hidden bg-foreground p-6 text-background transition-colors hover:bg-[#303A32] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring sm:col-span-2 sm:min-h-80 sm:p-8 lg:col-span-7 lg:row-span-2 lg:min-h-[28rem]"
        >
          <p className="editorial-eyebrow text-[#D6C8B6]">Work</p>
          <h3 className="mt-8 max-w-[12ch] font-display text-[clamp(1.9rem,3.4vw,2.85rem)] font-semibold leading-[1.12] tracking-tight">
            What I&apos;ve done.
          </h3>
          <p className="mt-4 max-w-sm text-sm leading-7 text-[#E4DED4] sm:text-base">
            Professional experience, enterprise selling, people development, and GTM execution.
          </p>
          <span className="editorial-link mt-auto inline-flex min-h-11 items-center pt-8 text-sm font-semibold underline">
            Explore Work <span aria-hidden="true" className="nudge-link ml-2 inline-block">↗</span>
          </span>
          <GeometricMotif />
        </Link>

        <Link
          href="/field-notes"
          className="group editorial-panel flex min-w-0 flex-col bg-surface-clay p-6 transition-colors hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring sm:p-7 lg:col-span-5"
        >
          <p className="editorial-eyebrow text-accent">Field Notes</p>
          <h3 className="mt-4 font-display text-3xl leading-tight">How I think.</h3>
          <p className="mt-3 max-w-sm text-sm leading-6 text-muted">
            Playbooks, frameworks, operating systems, and lessons learned.
          </p>
          <span className="editorial-link mt-auto inline-flex min-h-11 items-center pt-5 text-sm font-semibold text-accent underline">
            Read Field Notes <span aria-hidden="true" className="nudge-link ml-2 inline-block">→</span>
          </span>
        </Link>

        <Link
          href="/side-quests"
          className="group editorial-panel flex min-w-0 flex-col bg-surface-sage p-6 transition-colors hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring sm:p-7 lg:col-span-5"
        >
          <p className="editorial-eyebrow">Side Quests</p>
          <h3 className="mt-4 font-display text-3xl leading-tight">What I build.</h3>
          <p className="mt-3 max-w-sm text-sm leading-6">
            Independent cybersecurity, GTM, research, and developer tools.
          </p>
          <span className="editorial-link mt-auto inline-flex min-h-11 items-center pt-5 text-sm font-semibold underline">
            See Side Quests <span aria-hidden="true" className="nudge-link ml-2 inline-block">→</span>
          </span>
        </Link>
      </div>
    </section>
  );
}
