import { BrandAvatar } from "@/components/brand-avatar";
import { PageMain } from "@/components/page-main";
import { ToolsMap } from "@/components/tools-map";
import { roles } from "@/lib/portfolio";
import { personalInterests, personalValues } from "@/lib/public-personal";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About — Kristen Joy Aing",
  description:
    "Revenue & GTM Leader · Curious Builder. Enterprise cybersecurity, relationships, people development, and repeatable systems.",
};

export default function AboutPage() {
  return (
    <PageMain>
      <section className="grid items-center gap-10 border-b border-border py-16 lg:grid-cols-[minmax(0,14rem)_minmax(0,1fr)]">
        <div className="mx-auto w-full max-w-[14rem] lg:mx-0">
          <BrandAvatar />
        </div>
        <div>
          <p className="text-sm font-medium text-muted">About</p>
          <h1 className="mt-3 max-w-2xl font-display text-4xl leading-[1.08] tracking-tight sm:text-5xl">
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
            ["People first", "I listen, coach and share context so a teammate can succeed without depending on one person for every answer."],
            ["Problem-driven", "I begin with customer or team friction, test assumptions and identify what would actually help before suggesting a tool."],
            ["Systems-minded", "I document repeatable processes, define ownership and build small workflows that others can improve."],
          ].map(([name,body])=> <article key={name} className="rounded-xl border border-border bg-card p-5"><h3 className="text-lg font-semibold">{name}</h3><p className="mt-2 text-sm leading-6 text-muted">{body}</p></article>)}
        </div>
        <p className="mt-5 max-w-2xl text-sm leading-6 text-muted">My approach to leadership combines accountability with curiosity: clear expectations, thoughtful feedback, evidence-based decisions and room for people to develop their own strengths.</p>
      </section>

      <section className="border-b border-border py-12">
        <h2 className="font-display text-3xl tracking-tight">Career progression</h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
          Quantcast was advertising sales in a new market. Websense was the first cybersecurity book. Metadot was channel. Forcepoint, Rapid7, Darktrace, and Truffle Security are the enterprise security years. Dates and what was individual versus team are on Experience.
        </p>
        <ol className="mt-6 flex flex-col gap-3">
          {roles.slice(0, 4).map((role) => (
            <li key={role.company} className="flex flex-wrap items-baseline justify-between gap-2 border-t border-border py-3 text-sm">
              <span className="font-medium">{role.company}</span>
              <span className="text-muted">{role.title}</span>
            </li>
          ))}
        </ol>
          <Link href="/experience" className="mt-4 inline-flex text-sm font-medium text-accent">
          Read the experience timeline
        </Link>
        <Link href="/capabilities" className="mt-4 ml-4 inline-flex text-sm font-medium text-accent">
          See capabilities
        </Link>
      </section>

      <section className="border-b border-border py-12">
        <h2 className="font-display text-3xl tracking-tight">Enterprise selling and the leadership around it</h2>
        <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
          Security, engineering, and executives in the same room. Discovery, a competitive story, and the close. Alongside the deal I coach sellers, support hiring, and build the ramp a sales lead owes the team.
        </p>
      </section>

      <section className="border-b border-border py-12">
        <h2 className="font-display text-3xl tracking-tight">GTM and product work</h2>
        <ul className="mt-6 grid gap-4 md:grid-cols-2">
          {[
            ["Competitive evidence", "Briefs and playbooks used with teams. The monitor is a design.", "/work/competitive-intelligence-engine"],
            ["Coverage you can inspect", "A 3-source table. Gray means not evaluated.", "/work/detector-coverage-atlas"],
            ["Account and partner workflows", "Designed systems for assigned accounts and partner lists.", "/projects"],
            ["Enablement", "Training and frameworks used in the field. Truffle Camp is the curriculum design, not that training.", "/work/truffle-camp"],
          ].map(([title, body, href]) => (
            <li key={title} className="list-none">
              <Link href={href} className="block rounded-2xl border border-border p-5 hover:border-accent">
                <h3 className="font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{body}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-b border-border py-12">
        <p className="text-sm font-medium text-muted">Beyond work</p>
        <h2 className="font-display mt-3 text-3xl">The things that keep me curious.</h2>
        <p className="mt-4 max-w-2xl leading-7 text-muted">I enjoy the process of discovering, making, and learning—whether I&apos;m exploring a new sound, figuring out how something works, or trying a creative project for the first time. Those interests are part of my story, not just a list of hobbies.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {personalInterests.map(interest=><article key={interest.id} className="rounded-xl border border-border bg-card p-5">
          <h3 className="text-lg font-semibold">{interest.title}</h3>
          <p className="mt-2 text-sm leading-6 text-muted">{interest.detail}</p>
          <p className="mt-3 text-xs leading-5 text-muted">{interest.connection}</p>
          </article>)}
        </div>
        <p className="mt-6 text-sm font-medium">What matters to me</p>
        <ul className="mt-3 flex flex-wrap gap-2">{personalValues.map(value=><li key={value} className="rounded-full border border-border px-3 py-1 text-sm">{value}</li>)}</ul>
      </section>

      <section id="technologies" className="scroll-mt-24 border-b border-border py-12">
        <h2 className="font-display text-3xl tracking-tight">Technical toolkit</h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
          Built with, used professionally, and still learning stay separate. A name in a case study is not a running integration.
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
          <Link href="/contact#resume" className="text-accent">Request resume</Link>
          <a href="https://www.linkedin.com/in/kristenaing" className="text-accent" target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
      </section>
    </PageMain>
  );
}
