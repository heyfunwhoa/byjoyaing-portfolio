import { completePageMetadata } from "@/lib/page-metadata";
import { CapabilityOrbit } from "@/components/capability-orbit";
import { OrbitPortrait } from "@/components/orbit-portrait";
import { CareerRail } from "@/components/career-rail";
import { PageMain } from "@/components/page-main";
import { ToolsMap } from "@/components/tools-map";
import { careerRailNodes } from "@/lib/career-rail";
import { beyondWorkIntro, personalInterests, personalValues,
} from "@/lib/public-personal";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = completePageMetadata(
  {
  alternates: { canonical: "/about" },
  openGraph: { url: "/about" },
  title: "About",
  description:
    "Revenue & GTM Leader · Curious Builder. Enterprise cybersecurity, relationships, people development, and repeatable systems.",
},
  "/about",
);

export default function AboutPage() {
  return (
    <PageMain>
      <section className="grid items-center gap-10 border-b border-border py-12 sm:py-16 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)]">
        <div className="order-2 mx-auto w-full max-w-[12rem] lg:order-1 lg:mx-0 lg:max-w-none">
          <OrbitPortrait surface="ivory" variant="leader" />
        </div>
        <div className="order-1 lg:order-2">
          <p className="editorial-eyebrow text-accent">About · Leader</p>
          <h1 className="editorial-title mt-3 max-w-2xl">
            Strategist. Leader. Builder.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
            Curious by nature. Builder by instinct. I studied advertising and business foundations at The University of Texas at Austin. That training is how I explain a technical product: one claim, a buyer who can repeat it, and a field that does not invent the rest.
          </p>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
            My career is grounded in hands-on enterprise cybersecurity selling—from complex buyer conversations and technical evaluations to deal execution. I also coach newer sellers and build practical tools and processes that teams can reuse.
          </p>
        </div>
      </section>

      <section className="border-b border-border py-12">
        <p className="text-sm font-medium text-muted">My guiding philosophy</p>
        <h2 className="font-display mt-3 text-3xl">People first. Problem-driven. Systems-minded.</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            ["People first", "I listen, coach and share context so a teammate can succeed without depending on one person for every answer.",
            ],
            ["Problem-driven", "I begin with customer or team friction, test assumptions and identify what would actually help before suggesting a tool.",
            ],
            ["Systems-minded", "I document repeatable processes, define ownership and build small workflows that others can improve.",
            ],
          ].map(([name,body])=> (
            <article key={name} className="rounded-xl border border-border bg-card p-5"><h3 className="text-lg font-semibold">{name}</h3><p className="mt-2 text-sm leading-6 text-muted">{body}</p></article>
          ))}
        </div>
        <p className="mt-5 max-w-2xl text-sm leading-6 text-muted">My approach to leadership combines accountability with curiosity: clear expectations, thoughtful feedback, evidence-based decisions and room for people to develop their own strengths.</p>
      </section>

      <section className="border-b border-border py-12">
        <h2 className="font-display text-3xl tracking-tight">Career progression</h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
          Quantcast was advertising sales in a new market. Websense was the first cybersecurity book. Metadot was channel. Forcepoint, Rapid7, Darktrace, and Truffle Security are the enterprise security years. Dates and what was individual versus team are on Experience.
        </p>
        <details className="mt-5 rounded-xl border border-border bg-card p-4">
          <summary className="cursor-pointer py-1 font-medium">
            Career at a glance
          </summary>
          <CareerRail nodes={careerRailNodes()} />
        </details>
          <div className="mt-4 flex flex-col gap-1 sm:flex-row sm:gap-6">
            <Link href="/experience" className="inline-flex min-h-11 items-center text-sm font-medium text-accent underline underline-offset-4">
              Read the experience timeline
            </Link>
            <Link href="/capabilities" className="inline-flex min-h-11 items-center text-sm font-medium text-accent underline underline-offset-4">
              See capabilities
            </Link>
          </div>
      </section>

      <section className="border-b border-border py-12">
        <h2 className="font-display text-3xl tracking-tight">Enterprise selling and the leadership around it</h2>
        <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
          Security, engineering, and executives in the same room. Discovery, a competitive story, and the close. Alongside the deal I coach sellers, support hiring, and build the ramp a sales lead owes the team.
        </p>
        <details className="mt-5 rounded-xl border border-border bg-card p-4">
          <summary className="cursor-pointer py-1 font-medium">
            Explore the capability evidence
          </summary>
          <CapabilityOrbit />
        </details>
      </section>

      <section className="border-b border-border py-8">
        <h2 className="font-display text-2xl">
          Explore the work behind the approach
        </h2>
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
              <Link href="/work"
            className="inline-flex min-h-11 items-center text-accent underline underline-offset-4"
          >
            Professional Work
          </Link>
                <Link
            href="/field-notes"
            className="inline-flex min-h-11 items-center text-accent underline underline-offset-4"
          >
            Field Notes
          </Link>
                <Link
            href="/side-quests"
            className="inline-flex min-h-11 items-center text-accent underline underline-offset-4"
          >
            Independent Side Quests
          </Link>
            </div>
      </section>

      <section className="border-b border-border py-12">
        <p className="text-sm font-medium text-muted">Beyond work</p>
        <h2 className="font-display mt-3 text-3xl">The things that keep me curious.</h2>
        <p className="mt-4 max-w-2xl leading-7 text-muted">{beyondWorkIntro}</p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {personalInterests.map((interest) => (
            <article key={interest.id} className="rounded-xl border border-border bg-card p-5">
          <h3 className="text-lg font-semibold">{interest.title}</h3>
          <p className="mt-2 text-sm leading-6 text-muted">{interest.detail}</p>
          <p className="mt-3 text-xs leading-5 text-muted">{interest.connection}</p>
          </article>))}
        </div>
        <p className="mt-6 text-sm font-medium">What matters to me</p>
        <ul className="mt-3 flex flex-wrap gap-2">{personalValues.map((value) => (
            <li key={value} className="rounded-full border border-border px-3 py-1 text-sm">{value}</li>
          ))}</ul>
      </section>

      <section id="technologies" className="scroll-mt-24 border-b border-border py-12">
        <p className="editorial-eyebrow text-accent">Systems behind the work</p>
        <h2 className="font-display mt-3 text-3xl tracking-tight">How I work. What supports it.</h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
          Start with a workflow. Explore the approach, open the supporting tools, then follow the evidence—from enterprise selling and team development to independent building.
        </p>
        <div className="mt-6">
          <ToolsMap />
        </div>
      </section>

      <section className="border-b border-border py-12">
        <h2 className="font-display text-3xl tracking-tight">Advertising, then the technical market</h2>
        <ul className="mt-4 grid gap-4 text-sm leading-6 text-muted sm:grid-cols-3">
          <li>B.S. Advertising, Business Foundations. The University of Texas at Austin.</li>
          <li>MBA, IT Management. Western Governors University, in progress.</li>
          <li>AWS Cloud Practitioner and AI Practitioner, foundational.</li>
        </ul>
      </section>

      <section className="py-12">
        <h2 className="text-lg font-semibold">Contact</h2>
        <div className="mt-4 flex flex-wrap gap-4 text-sm font-medium">
          <Link href="/contact" className="text-accent">Get in touch</Link>
          <a href="https://www.linkedin.com/in/kristenaing" className="text-accent" target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
      </section>
    </PageMain>
  );
}
