import Link from "next/link";

/**
 * Asymmetric editorial bento, not a dashboard:
 * reading order stays Work -> Field Notes -> Builds -> deeper access.
 * All tiles stack in that order on narrow screens.
 */
export function EditorialBento() {
  return (
    <section aria-labelledby="explore-bento-title" className="border-b border-border py-12 sm:py-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="editorial-eyebrow text-accent">02 / Choose a thread</p>
          <h2 id="explore-bento-title" className="editorial-section-title mt-3 max-w-3xl">
            Stories, systems, and the thinking in between.
          </h2>
        </div>
        <span className="editorial-eyebrow text-muted">A few ways to explore</span>
      </div>
      <p className="editorial-intro mt-4 text-muted">
        Start with enterprise execution and people leadership. Go deeper into practical playbooks, then see how curiosity becomes independent research and working prototypes.
      </p>

      <div className="mt-8 grid min-w-0 gap-3 sm:grid-cols-2 lg:grid-cols-12 lg:auto-rows-[minmax(12rem,auto)] lg:gap-4">
        <Link href="/work" className="group editorial-panel relative flex min-w-0 flex-col overflow-hidden bg-foreground p-6 text-background transition-colors hover:bg-[#303A32] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring sm:col-span-2 sm:p-8 lg:col-span-7 lg:row-span-2 lg:min-h-[28rem]">
          <p className="editorial-eyebrow text-[#D6C8B6]">01 / Work · Revenue &amp; GTM</p>
          <h3 className="mt-8 max-w-[13ch] font-display text-[clamp(2.5rem,5vw,4.25rem)] leading-[1.05] tracking-tight">
            The work behind <em className="font-normal text-[#E6B59A]">the outcomes.</em>
          </h3>
          <p className="mt-5 max-w-md text-sm leading-7 text-[#E4DED4] sm:text-base">
            Complex buying groups, enterprise security decisions, field execution, and the coaching and systems that support a team.
          </p>
          <span className="editorial-link mt-auto inline-flex min-h-11 items-center pt-8 text-sm font-semibold underline">Explore professional work <span aria-hidden="true" className="ml-2">↗</span></span>
          <span aria-hidden="true" className="pointer-events-none absolute -bottom-14 -right-14 h-52 w-52 rounded-full border border-[#8B9387] opacity-30 sm:h-72 sm:w-72" />
          <span aria-hidden="true" className="pointer-events-none absolute -bottom-7 -right-7 h-36 w-36 rounded-full border border-[#8B9387] opacity-25 sm:h-56 sm:w-56" />
        </Link>

        <Link href="/field-notes" className="group editorial-panel flex min-w-0 flex-col bg-surface-clay p-6 transition-colors hover:border-accent sm:p-7 lg:col-span-5 lg:row-span-1">
          <p className="editorial-eyebrow text-accent">02 / Field Notes</p>
          <h3 className="mt-4 font-display text-3xl leading-tight sm:text-4xl">Ideas worth writing down.</h3>
          <p className="mt-3 max-w-sm text-sm leading-6 text-muted">Playbooks, strategic frameworks, operating systems, and lessons learned in the field.</p>
          <span className="editorial-link mt-auto inline-flex min-h-11 items-center pt-5 text-sm font-semibold text-accent underline">Read Field Notes →</span>
        </Link>

        <Link href="/side-quests" className="group editorial-panel flex min-w-0 flex-col bg-surface-sage p-6 transition-colors hover:border-accent sm:p-7 lg:col-span-5 lg:row-span-1">
          <p className="editorial-eyebrow">03 / Side Quests</p>
          <h3 className="mt-4 font-display text-3xl leading-tight sm:text-4xl">Curiosity, made useful.</h3>
          <p className="mt-3 max-w-sm text-sm leading-6">Research tools and software experiments exploring cybersecurity, GTM, and emerging technology.</p>
          <span className="editorial-link mt-auto inline-flex min-h-11 items-center pt-5 text-sm font-semibold underline">Explore independent builds →</span>
        </Link>

        <Link href="/private-work" className="group editorial-panel flex min-w-0 flex-col bg-surface-mist p-6 transition-colors hover:border-accent sm:p-7 lg:col-span-5">
          <p className="editorial-eyebrow text-accent">04 / Selected Work · Invitation</p>
          <h3 className="mt-4 font-display text-3xl leading-tight">Go a little deeper.</h3>
          <p className="mt-3 max-w-sm text-sm leading-6 text-muted">The approach is public. Additional sanitized materials may be shared individually after review.</p>
          <span className="editorial-link mt-auto inline-flex min-h-11 items-center pt-5 text-sm font-semibold text-accent underline">How access works →</span>
          <span className="text-xs text-muted">Reviewer sign-in is not active yet.</span>
        </Link>

        <div className="editorial-panel flex min-w-0 flex-col justify-center bg-card p-6 sm:p-7 lg:col-span-7">
          <p className="editorial-eyebrow text-accent">A principle, not a slogan</p>
          <blockquote className="editorial-quotation mt-3 max-w-[25ch]">People first. Problem-driven. Systems-minded.</blockquote>
          <p className="mt-4 text-sm leading-6 text-muted">The same approach connects conversations, strategy, and the things I choose to build.</p>
        </div>
      </div>
    </section>
  );
}
