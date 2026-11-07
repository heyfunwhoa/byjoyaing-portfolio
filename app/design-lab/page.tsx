import { AcademyBreadcrumb } from "@/components/academy-breadcrumb";
import { completePageMetadata } from "@/lib/page-metadata";
import { StakeholderPlayground } from "@/components/field-notes/stakeholder-playground";
import { GamefulWorkbench } from "@/components/design-lab/gameful-workbench";
import { MotionWorkbench } from "@/components/design-lab/motion-workbench";
import { LearningChecksPreview } from "@/components/design-lab/learning-checks-preview";
import { ComponentOptions } from "@/components/design-lab/component-options";
import { BrandAvatar } from "@/components/brand-avatar";
import { CapabilityOrbit } from "@/components/capability-orbit";
import { CollectionBreadcrumb } from "@/components/collection-breadcrumb";
import { CelestialFrame } from "@/components/celestial-frame";
import { DesignLabGallery } from "@/components/design-lab-gallery";
import { FeaturedSideQuestStrip } from "@/components/featured-side-quest-strip";
import { FeaturedWorkCarousel } from "@/components/featured-work-carousel";
import { GeometricMotif } from "@/components/geometric-motif";
import { OrbitArtwork } from "@/components/orbit-artwork";
import { OrbitPortrait } from "@/components/orbit-portrait";
import { PageMain } from "@/components/page-main";
import { ProjectConstellation } from "@/components/project-constellation";
import { ProjectStatusPill } from "@/components/project-status-pill";
import { designLabAvailable } from "@/lib/design-lab";
import { featuredSideQuestSlides, featuredWorkSlides } from "@/lib/featured-work";
import { robotsNoindex } from "@/lib/indexing";
import type { ProjectStatus } from "@/lib/portfolio";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export const metadata: Metadata = completePageMetadata({
  title: "Design lab",
  robots: robotsNoindex,
}, "/design-lab");

const ideationTemplates = [
  [
    "Idea card",
    "Problem and audience:\nDesired outcome:\nSimplest baseline:\nAlternative and open-source building block:\nSmallest prototype:\nEvidence to collect:\nOwner and next review date:\nWhere else this could help:",
    "Sellers need to turn buyer conversations into a brief. Compare reading a transcript with choosing questions in an InkJS conversation. Both approaches end with the same fictional discovery brief. Builder Academy could reuse the branching format for infrastructure plan review."
  ],
  [
    "Prototype comparison",
    "Task and audience:\nBaseline:\nAlternative:\nWhat counts as success:\nObserved results and evidence links:\nLimitations or checks not run:\nDecision and reason:\nOwner and next review date:",
    "Give learners the same buyer scenario and brief rubric. Look for a clear problem, a confirmed fact, an unverified assumption, and a next step. Record which approach helped and where people got stuck. The comparison is still proposed."
  ],
  [
    "Adoption brief",
    "Destination repo and owner:\nPattern to reuse:\nContent or behavior the destination owns:\nEvidence link:\nAcceptance criteria:\nLinear issue:\nSource repo, path, version or commit and license:\nMaintenance owner and update method:\nRollback and verification:\nDecision and follow-up:",
    "GTM Revenue OS is the destination for seller practice. Reuse the conversation interface. GTM OS supplies the buyer scenario, coaching, and brief. A learner should be able to explain what they learned and what they still need to confirm. Track the delivery decision in KRU-147."
  ]
] as const;

const statuses: ProjectStatus[] = ["field", "prototype", "designed", "exploring"];

const swatches = [
  ["Ivory", "bg-background", "Main canvas"],
  ["Charcoal", "bg-foreground", "Headlines and the featured card"],
  ["Copper", "bg-accent", "Links and the selected filter"],
  ["Card", "bg-card", "Inset surfaces"],
  ["Sage", "bg-surface-sage", "Side Quests surface"],
  ["Mist", "bg-surface-mist", "Research surface"],
  ["Clay", "bg-surface-clay", "Field Notes surface"],
] as const;

export default function DesignLabPage() {
  if (!designLabAvailable()) notFound();

  return (
    <PageMain>
      <article className="flex flex-col gap-14 py-12 sm:py-16">
        <header className="max-w-2xl">
          <p className="editorial-eyebrow text-accent">Internal · local development</p>
          <h1 className="editorial-section-title mt-3">Portfolio design lab</h1>
          <p className="mt-4 text-base leading-7 text-muted">
            Turn an idea into something you can try. Browse open-source components and existing patterns, then use them to build and compare prototypes. When a pattern works for a real workflow, bring it into the repo that owns that workflow.
          </p>
          <p className="mt-3 text-sm leading-6 text-muted">
            For example, try a branching conversation here, then adapt it for seller practice in GTM Revenue OS.
          </p>
          <nav aria-label="Start exploring Design Lab" className="mt-5 flex flex-wrap gap-3">
            <a href="#ideation-title" className="inline-flex min-h-11 items-center rounded-lg border border-border px-4 py-2 font-semibold underline">
              Use an ideation template
            </a>
            <a href="#component-ideas" className="inline-flex min-h-11 items-center rounded-lg border border-border px-4 py-2 font-semibold underline">
              Browse component ideas
            </a>
            <a href="#interactive-prototypes" className="inline-flex min-h-11 items-center rounded-lg border border-border px-4 py-2 font-semibold underline">
              Try a prototype
            </a>
          </nav>
          <p className="mt-4 text-sm text-muted">Available in local development.</p>
        </header>

        <section aria-labelledby="ideation-title" className="space-y-4">
          <h2 id="ideation-title" className="font-display text-2xl tracking-tight">From idea to adoption</h2>
          <p className="max-w-2xl text-sm leading-6 text-muted">
            Start with an idea card. Compare approaches when there is a decision to make, then write an adoption brief when a prototype is ready for a real workflow.
          </p>
          <div className="space-y-2 rounded-xl border border-border bg-card p-4">
            {ideationTemplates.map(([title, fields, example]) => (
              <details key={title}>
                <summary className="min-h-11 cursor-pointer py-2 font-semibold">{title}</summary>
                <div className="space-y-3 pb-4 text-sm leading-6">
                  <p>Copy these prompts into your working notes.</p>
                  <pre className="whitespace-pre-wrap break-words rounded-lg bg-background p-3 text-xs leading-6">{fields}</pre>
                  <p><strong>Worked example.</strong> {example}</p>
                </div>
              </details>
            ))}
          </div>
          <details className="rounded-xl border border-border bg-card p-4">
            <summary className="min-h-11 cursor-pointer py-2 font-semibold">When to move an idea forward</summary>
            <ol className="mt-3 list-decimal space-y-3 pl-5 text-sm leading-6">
              <li><strong>Define.</strong> Name the audience, problem, outcome, owner, and next review date. If there is no clear task yet, keep it as an idea.</li>
              <li><strong>Try.</strong> Compare the simplest baseline with one alternative using the same fictional task. Choose a small time limit before building; record what you actually observed.</li>
              <li><strong>Decide.</strong> Adopt, revise, or park. Link the evidence and name the limits. Passing software tests does not establish that the prototype helps someone do the task.</li>
              <li><strong>Hand off.</strong> For adoption, name the destination owner and acceptance criteria, link the existing Linear issue and implementation PR, and record the source and maintenance plan.</li>
              <li><strong>Verify.</strong> Review the destination workflow, required accessibility checks, and release evidence. Track implemented, tested, merged, and deployed separately.</li>
            </ol>
            <p className="mt-3 text-sm leading-6 text-muted">If an idea is parked, leave a reason and a specific trigger for revisiting it. A catalog entry is not a delivery commitment.</p>
          </details>
          <details className="rounded-xl border border-border bg-card p-4">
            <summary className="min-h-11 cursor-pointer py-2 font-semibold">Keep adopted code up to date</summary>
            <ul className="mt-3 list-disc space-y-3 pl-5 text-sm leading-6">
              <li><strong>Published package:</strong> record the package, version, license, and owning repo. Review dependency update PRs and run the destination app’s checks before accepting an update.</li>
              <li><strong>Copied or adapted source:</strong> record the upstream URL, file, exact commit, license notices, and local changes. The destination maintainer compares upstream changes and brings over relevant fixes.</li>
              <li><strong>Shared internal component:</strong> use a versioned package when multiple apps need the same behavior and updates. Keep scenarios and business rules in the destination app.</li>
            </ul>
            <p className="mt-3 text-sm leading-6 text-muted">Today the Design Lab and GTM practice copies are maintained separately. Changes here do not automatically update another repo. The adoption brief records who checks for updates and when.</p>
          </details>
          <aside aria-labelledby="product-feedback-idea" className="rounded-xl border border-border bg-card p-4">
            <p className="editorial-eyebrow text-accent">Future idea · parked</p>
            <h3 id="product-feedback-idea" className="mt-2 text-lg font-semibold">Turn conversation insights into product feedback</h3>
            <p className="mt-2 text-sm leading-6">
              Test whether a short feedback brief helps a product owner decide what to investigate. Capture the customer problem, impact, supporting evidence, and open questions. Keep the customer’s request separate from the underlying need, and distinguish recurring patterns from one-off requests.
            </p>
            <details className="mt-3">
              <summary className="min-h-11 cursor-pointer py-2 font-semibold">See a sample feedback brief</summary>
              <dl className="grid gap-3 pb-3 text-sm leading-6 sm:grid-cols-2">
                <div><dt className="font-semibold">Customer request</dt><dd>“Add bulk onboarding.”</dd></div>
                <div><dt className="font-semibold">Underlying need</dt><dd>Apply the same setup steps across several customer accounts without repeating the work.</dd></div>
                <div><dt className="font-semibold">Impact and evidence</dt><dd>In one fictional conversation, the operator described repeating setup for every customer. The time cost is unmeasured.</dd></div>
                <div><dt className="font-semibold">Open questions</dt><dd>Which steps repeat? How often? Do other teams face the same problem?</dd></div>
                <div><dt className="font-semibold">Product decision</dt><dd>Investigate the workflow and collect a second signal before considering a solution.</dd></div>
                <div><dt className="font-semibold">Close the loop</dt><dd>Record who owns the follow-up, what evidence is needed, and when Sales should expect an update.</dd></div>
              </dl>
            </details>
            <p className="mt-2 text-sm leading-6 text-muted">
              Start with fictional examples in Design Lab. GTM Revenue OS is the proposed home for the capture workflow. A product owner would review the brief and decide whether to investigate, park, or hand it off for delivery.
            </p>
          </aside>
        </section>

        <div id="component-ideas" tabIndex={-1} className="scroll-mt-24">
          <ComponentOptions />
        </div>
        <div id="interactive-prototypes" tabIndex={-1} className="scroll-mt-24">
          <GamefulWorkbench />
        </div>
        <MotionWorkbench />
        <LearningChecksPreview />

        <section aria-labelledby="foundations-title">
          <h2 id="foundations-title" className="font-display text-2xl tracking-tight">Foundations</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
            Tokens live in <code className="font-mono text-xs">app/globals.css</code>. Geist Sans is display and body. Geist Mono is for technical metadata, not sentences.
          </p>
          <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {swatches.map(([name, tone, use]) => (
              <li key={name} className="min-w-0">
                <div className={`h-14 rounded-xl border border-border ${tone}`} />
                <p className="mt-2 text-sm font-semibold">{name}</p>
                <p className="text-xs leading-5 text-muted">{use}</p>
              </li>
            ))}
          </ul>
          <p className="editorial-eyebrow mt-8 text-accent">Eyebrow sample</p>
          <p className="mt-2 max-w-xl text-base leading-7">People first. Problem-driven. Systems-minded.</p>
        </section>

        <section aria-labelledby="layouts-title">
          <h2 id="layouts-title" className="font-display text-2xl tracking-tight">Layouts</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
            <code className="font-mono text-xs">PageMain</code> keeps pages at <code className="font-mono text-xs">max-w-5xl</code> with <code className="font-mono text-xs">px-5</code>, and <code className="font-mono text-xs">sm:px-8</code> from 640px. <code className="font-mono text-xs">ProjectBento</code> is the project gallery below. <code className="font-mono text-xs">EditorialBento</code> is the homepage map of Work, Field Notes, and Side Quests. Do not swap them.
          </p>
          <ul className="mt-5 grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-6">
            <li className="rounded-xl bg-foreground px-4 py-6 text-sm text-background md:col-span-2 lg:col-span-4">Featured · four of six tracks from 1024px</li>
            <li className="rounded-xl border border-border bg-card px-4 py-6 text-sm lg:col-span-2">Standard · two tracks</li>
            <li className="rounded-xl border border-border bg-card px-4 py-6 text-sm lg:col-span-2">Standard · two tracks</li>
            <li className="rounded-xl border border-border bg-card px-4 py-6 text-sm lg:col-span-2">Standard · two tracks</li>
          </ul>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
            Below 768px the cells stack. From 768px they sit in two columns and the featured cell spans both. Gap is <code className="font-mono text-xs">gap-4</code> (1rem) in the live gallery.
          </p>
        </section>

        <section aria-labelledby="navigation-title">
          <h2 id="navigation-title" className="font-display text-2xl tracking-tight">Navigation</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
            The header on this page is the public <code className="font-mono text-xs">SiteHeader</code>. Home, About, Work, Field Notes, Side Quests, and Contact stay in that order. Below 1024px the links sit in a panel with <code className="font-mono text-xs">absolute top-full</code>. Escape and the scrim return focus to the menu button. This lab does not render a second header.
          </p>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
            Case-study breadcrumbs are live. Kind work reads Home / Work / title. Kind side-quest reads Home / Side Quests / title. Field Notes guides read Home / Field Notes / title. Academy lessons use Home / Builder Academy / lesson; practice labs include Playground. Only real parent pages are linked. Filters on this page are pressed buttons, not tabs.
          </p>
          <div className="mt-5 space-y-3 rounded-xl border border-border bg-card p-4">
            <AcademyBreadcrumb title="Research Pipeline Simulator" playground />
            <CollectionBreadcrumb
              items={[
                { href: "/", label: "Home" },
                { href: "/side-quests", label: "Side Quests" },
                { label: "Detector Coverage Atlas" },
              ]}
            />
            <CollectionBreadcrumb
              items={[
                { href: "/", label: "Home" },
                { href: "/work", label: "Work" },
                { label: "Competitive Intelligence Engine" },
              ]}
            />
          </div>
        </section>

        <section aria-labelledby="cards-title">
          <h2 id="cards-title" className="font-display text-2xl tracking-tight">Cards, gallery, and filters</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
            <code className="font-mono text-xs">EditorialProjectCard</code> is a prototype. The live sales card remains <code className="font-mono text-xs">components/project-card.tsx</code>. Filters use kind and the directory categories that already exist. The address bar keeps the selection, for example <code className="font-mono text-xs">?collection=work</code>.
          </p>
          <Suspense fallback={<p className="mt-6 text-sm text-muted">Loading the directory…</p>}>
            <DesignLabGallery />
          </Suspense>
        </section>

        <section aria-labelledby="identity-title">
          <h2 id="identity-title" className="font-display text-2xl tracking-tight">Visual identity</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
            Geometry is a line language. Public pages keep the orbit on the homepage hero and the motif on the Work tile. About uses the transparent orbit artwork without a portrait. Work and other portrait placements use <code className="font-mono text-xs">/brand/avatar/illustrated-portrait.png</code>; Home uses the warmer portrait at <code className="font-mono text-xs">/brand/avatar/home-portrait.webp</code>. Field Notes and Side Quests use their orbit study illustrations. Rings do not spin, and the face does not animate.
          </p>
          <div className="relative mt-5 overflow-hidden rounded-2xl bg-foreground p-6 text-background sm:p-8">
            <GeometricMotif className="inset-0" />
            <div className="relative z-10 grid items-center gap-6 sm:grid-cols-[11rem_minmax(0,1fr)]">
              <div className="mx-auto w-36 sm:mx-0">
                <CelestialFrame>
                  <BrandAvatar decorative />
                </CelestialFrame>
              </div>
              <p className="max-w-md text-sm leading-6 text-[#F3EFE6]">
                Ivory strokes on charcoal. Crop marks may ease outward on hover or focus. Customize placement by wrapping the same portrait. Do not add a second illustration file here.
              </p>
            </div>
          </div>
        </section>

        <section aria-labelledby="orbits-title">
          <h2 id="orbits-title" className="font-display text-2xl tracking-tight">Orbit artwork</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
            Two PNG drawings live in <code className="font-mono text-xs">public/brand/orbits</code>. There is no SVG in that folder. The transparent file is the light-surface orbit. The charcoal plate is used only on charcoal. Neither drawing replaces the Strategist, Leader, and Builder controls.
          </p>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <figure className="min-w-0 rounded-2xl border border-border bg-background p-5">
              <figcaption className="text-sm font-semibold">About hero · published</figcaption>
              <p className="mt-1 text-sm leading-6 text-muted">
                Ivory page. The transparent drawing frames the shared portrait. The portrait alt text stays on the image.
              </p>
              <div className="mt-4">
                <OrbitPortrait surface="ivory" decorative />
              </div>
            </figure>
            <figure className="min-w-0 rounded-2xl bg-foreground p-5 text-background">
              <figcaption className="text-sm font-semibold">Charcoal plate · decoration only</figcaption>
              <p className="mt-1 text-sm leading-6 text-[#D4CEC4]">
                This plate is <code className="font-mono text-xs">rgb(30, 34, 31)</code>, a few steps from charcoal <code className="font-mono text-xs">#1B211D</code>. It is not placed on ivory.
              </p>
              <OrbitArtwork treatment="charcoal" surface="charcoal" sizes="(min-width: 1024px) 24rem, 90vw" className="mx-auto mt-4 max-w-sm" />
            </figure>
          </div>

          <h3 className="mt-8 text-lg font-semibold">Same controls, two drawings</h3>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
            Both columns keep the center link, the three tabs, arrow keys, and the evidence panel. The first is the previous ring drawing. The second is what About publishes: the charcoal plate behind those controls, without a second set of rings.
          </p>
          <div className="mt-4 grid gap-8">
            <div>
              <p className="editorial-eyebrow text-accent">Current rings · lab only</p>
              <CapabilityOrbit artwork={false} />
            </div>
            <div>
              <p className="editorial-eyebrow text-accent">Charcoal artwork · About</p>
              <CapabilityOrbit />
            </div>
          </div>

          <h3 className="mt-8 text-lg font-semibold">Homepage portrait</h3>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
            The homepage still uses <code className="font-mono text-xs">CelestialFrame</code>. These sit on charcoal so the cover can be compared before that frame changes.
          </p>
          <div className="mt-4 grid gap-6 rounded-2xl bg-foreground p-5 text-background sm:grid-cols-3 sm:p-6">
            <figure className="min-w-0">
              <div className="mx-auto w-full max-w-[14rem]">
                <CelestialFrame>
                  <BrandAvatar decorative />
                </CelestialFrame>
              </div>
              <figcaption className="mt-3 text-sm leading-6 text-[#D4CEC4]">Published on the homepage.</figcaption>
            </figure>
            <figure className="min-w-0">
              <OrbitPortrait surface="charcoal" decorative />
              <figcaption className="mt-3 text-sm leading-6 text-[#D4CEC4]">Transparent drawing. Not on the homepage.</figcaption>
            </figure>
            <figure className="min-w-0">
              <OrbitArtwork treatment="charcoal" surface="charcoal" sizes="(min-width: 640px) 16rem, 80vw" />
              <figcaption className="mt-3 text-sm leading-6 text-[#D4CEC4]">Charcoal plate. Not on the homepage.</figcaption>
            </figure>
          </div>
        </section>

        <section aria-labelledby="stakeholder-library-title">
          <h2 id="stakeholder-library-title" className="font-display text-2xl tracking-tight">Stakeholder map library</h2>
          <p className="mt-2 mb-5 max-w-2xl text-sm leading-6 text-muted">Reusable role cards, grouped map and evidence panel. This fixture is fictional; every public relationship is a hypothesis. Storybook covers selection, missing access, empty and invalid data states.</p>
          <StakeholderPlayground />
        </section>

        <section aria-labelledby="data-title">
          <h2 id="data-title" className="font-display text-2xl tracking-tight">Data visualization</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
            The card uses <code className="font-mono text-xs">ProjectStatusPill</code>. <code className="font-mono text-xs">StatusBadge</code> still serves the sales card and case studies. A later pass should pick one. This lab does not add a third label. The timeline on <code className="font-mono text-xs">/experience</code> is the career diagram. The constellation below is that page’s relationship diagram, repeated here so the pattern is visible. The dots are decoration. The links say the same thing.
          </p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {statuses.map((status) => (
              <li key={status}>
                <ProjectStatusPill status={status} />
              </li>
            ))}
          </ul>
          <ProjectConstellation />
        </section>

        <section aria-labelledby="interactions-title">
          <h2 id="interactions-title" className="font-display text-2xl tracking-tight">Interactions</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
            The filter row in Cards is the interaction sample. It writes <code className="font-mono text-xs">?collection=</code> and does not load a new page. Use it when a reader is narrowing a list they can already see.
          </p>
          <details className="mt-4 max-w-2xl rounded-xl border border-border bg-card p-4">
            <summary className="min-h-11 cursor-pointer font-semibold">Accordions, dialogs, and tooltips already in the site</summary>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-muted">
              <li>The experience timeline uses a button with <code className="font-mono text-xs">aria-expanded</code>. It is not a component library accordion.</li>
              <li>The header signature reveals “joy.” on hover and keyboard focus. It is a tooltip, not a dialog.</li>
              <li>This lab has no modal. Do not add one until a public page needs a focused task that cannot stay on the page.</li>
            </ul>
          </details>
        </section>

        <section aria-labelledby="a11y-title">
          <h2 id="a11y-title" className="font-display text-2xl tracking-tight">Accessibility</h2>
          <ul className="mt-3 max-w-2xl list-disc space-y-2 pl-5 text-sm leading-6 text-muted">
            <li>Filter buttons expose <code className="font-mono text-xs">aria-pressed</code> and are at least 44px tall.</li>
            <li>Each card is one link. The accessible name includes the destination.</li>
            <li>Focus uses the copper ring. An empty filter result is a status message, not a blank grid.</li>
            <li>Imagery on the card is a sentence from the existing preview, not a second interactive table inside the link.</li>
          </ul>
          <p className="mt-4 text-sm leading-6">
            <a className="font-semibold text-accent underline" href="#cards-title">Back to the cards</a>
          </p>
        </section>

        <section aria-labelledby="featured-strips-title">
          <h2 id="featured-strips-title" className="font-display text-2xl tracking-tight">Featured strips</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
            Work uses the Embla wrapper. Side Quests uses CSS scroll-snap. Storybook may preview the primitive; these are the public compositions.
          </p>
          <FeaturedWorkCarousel slides={featuredWorkSlides()} />
          <h3 className="mt-10 text-lg font-semibold">Side Quest snap strip</h3>
          <FeaturedSideQuestStrip slides={featuredSideQuestSlides()} />
        </section>
      </article>
    </PageMain>
  );
}
