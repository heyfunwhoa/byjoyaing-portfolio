import { BrandAvatar } from "@/components/brand-avatar";
import { CapabilityOrbit } from "@/components/capability-orbit";
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

export const metadata: Metadata = {
  title: "Design lab",
  robots: robotsNoindex,
};

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
            This page previews reusable pieces before they move onto the public site. A production build returns 404. The public navigation does not link here.
          </p>
        </header>

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
            A case-study breadcrumb is the next component, not this one. For kind work it would read Home / Work / title. For kind side-quest it would read Home / Side Quests / title. Filters on this page are pressed buttons, not tabs.
          </p>
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

        <section aria-labelledby="motion-title">
          <h2 id="motion-title" className="font-display text-2xl tracking-tight">Motion</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
            No motion library is installed. The card border changes color on hover. The arrow uses the existing nudge, which collapses when reduced motion is requested. Sections on the public site still use the short rise in <code className="font-mono text-xs">.section-enter</code>. That rise does not fade to invisible.
          </p>
        </section>

        <section aria-labelledby="identity-title">
          <h2 id="identity-title" className="font-display text-2xl tracking-tight">Visual identity</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
            Geometry is a line language. Public pages keep the orbit on the homepage hero and the motif on the Work tile. Every avatar variant still uses <code className="font-mono text-xs">/brand/avatar/illustrated-portrait.png</code>. Rings do not spin, and the face does not animate.
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
