import { ArrowRight } from "@/components/icons/arrow-right";
import { ProjectStatusPill } from "@/components/project-status-pill";
import { featuredSourceLabel, type FeaturedSlide } from "@/lib/featured-work";
import Link from "next/link";

/**
 * A snap strip, not the Work Embla carousel. Sage cards, honest status,
 * and a peek of the next build. No autoplay and no previous/next chrome.
 */
export function FeaturedSideQuestStrip({ slides }: { slides: readonly FeaturedSlide[] }) {
  return (
    <ul
      aria-label="Featured independent builds"
      tabIndex={0}
      className="mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-2 motion-reduce:scroll-auto [-ms-overflow-style:none] [scrollbar-width:none] focus-visible:outline-2 focus-visible:outline-ring [&::-webkit-scrollbar]:hidden"
    >
      {slides.map((slide) => (
        <li
          key={slide.id}
          className="w-[min(20rem,85%)] shrink-0 snap-start sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.7rem)]"
        >
          <article className="editorial-panel group relative flex h-full min-w-0 flex-col bg-surface-sage p-5 sm:p-6">
            <div className="flex flex-wrap items-center gap-2">
              {slide.status ? <ProjectStatusPill status={slide.status} /> : null}
              <span className="rounded-full border border-border bg-background px-2.5 py-0.5 text-xs font-medium">
                {featuredSourceLabel[slide.source]}
              </span>
            </div>
            <h3 className="mt-4 font-display text-xl leading-tight tracking-tight">
              <Link href={slide.href} className="focus-visible:outline-none after:absolute after:inset-0 after:content-['']">
                <span className="relative">{slide.title}</span>
                <span className="sr-only">. Independent Side Quest.</span>
              </Link>
            </h3>
            <p className="mt-3 text-sm leading-6 text-muted">{slide.summary}</p>
            <p className="editorial-link mt-auto inline-flex min-h-11 items-end pt-5 text-sm font-semibold underline">
              Open the build
              <ArrowRight size={16} className="nudge-link ml-2 inline-block size-4" />
            </p>
          </article>
        </li>
      ))}
    </ul>
  );
}
