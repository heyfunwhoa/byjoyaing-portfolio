import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Homepage prototype | Kristen Joy Aing",
  description: "Exploratory homepage layout for design review.",
  robots: { index: false, follow: false },
};

const principles = [
  { label: "People", detail: "Coaching, talent development and practical leadership." },
  { label: "Strategy", detail: "Enterprise cybersecurity, market understanding and GTM direction." },
  { label: "Systems", detail: "Building repeatable ways for teams to learn, work and grow." },
];

const workExamples = [
  {
    number: "01",
    title: "Developing people",
    context: "Coaching and enablement",
    detail: "Helping sellers develop skills and creating tools that support consistent execution.",
    note: "Case-study evidence to be verified before launch.",
  },
  {
    number: "02",
    title: "Improving GTM execution",
    context: "Sales strategy and team systems",
    detail: "Connecting field observations to better processes, collaboration and decision-making.",
    note: "Case-study evidence to be verified before launch.",
  },
];

export default function HomepagePrototype() {
  return (
    <main id="main-content" className="mx-auto w-full max-w-6xl px-5 pb-20 sm:px-8">
      <div className="border-b border-border py-4 text-xs text-muted">
        <span className="font-semibold text-foreground">Design prototype</span>
        {" · "}
        Exploring hierarchy and content. Not the published homepage.
      </div>

      <section aria-labelledby="prototype-title" className="grid gap-10 border-b border-border py-16 sm:py-24 lg:grid-cols-[minmax(0,1.6fr)_minmax(15rem,0.7fr)] lg:items-center lg:gap-16">
        <div className="flex flex-col items-start gap-6">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
            Enterprise Cybersecurity · GTM Strategy · Leadership
          </p>
          <h1 id="prototype-title" className="font-display max-w-3xl text-5xl leading-[1.03] tracking-tight text-balance text-foreground sm:text-6xl lg:text-7xl">
            Curious by nature. <span className="italic">Builder by instinct.</span>
          </h1>
          <p className="max-w-xl text-lg leading-8 text-muted">
            I lead with people, approach challenges with curiosity, and build better ways for teams and businesses to grow.
          </p>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <a href="#selected-work" className="inline-flex min-h-11 items-center justify-center rounded-md bg-foreground px-6 py-3 text-sm font-semibold text-background outline-offset-4 transition-opacity hover:opacity-85 focus-visible:outline-2 focus-visible:outline-accent">
              Explore my work
            </a>
            <a href="#side-quests" className="inline-flex min-h-11 items-center justify-center rounded-md border border-border px-6 py-3 text-sm font-semibold text-foreground outline-offset-4 transition-colors hover:border-accent focus-visible:outline-2 focus-visible:outline-accent">
              See Side Quests
            </a>
          </div>
        </div>
        <div aria-label="Three interconnected themes: people, strategy, and systems" className="rounded-2xl border border-border bg-card p-5 sm:p-8">
          <p className="mb-6 text-xs uppercase tracking-[0.14em] text-muted">How I approach problems</p>
          <div className="flex flex-col gap-3">
            {principles.map((item, index) => (
              <div key={item.label} className="rounded-lg border border-border bg-background p-4">
                <div className="flex items-baseline gap-3">
                  <span aria-hidden="true" className="font-mono text-xs text-accent">0{index + 1}</span>
                  <h2 className="font-display text-2xl text-foreground">{item.label}</h2>
                </div>
                <p className="mt-1 text-sm leading-6 text-muted">{item.detail}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm font-medium text-foreground">Learn → Build → Iterate</p>
        </div>
      </section>

      <section aria-labelledby="principle-title" className="border-b border-border py-12 sm:py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">Leadership philosophy</p>
        <h2 id="principle-title" className="font-display mt-3 max-w-3xl text-3xl tracking-tight text-foreground sm:text-4xl">
          People first. Problem-driven. Systems-minded.
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-8 text-muted">
          Great work takes empathy and accountability. I believe in developing people, understanding the real problem, and making thoughtful changes that last.
        </p>
      </section>

      <section id="selected-work" aria-labelledby="work-title" className="scroll-mt-24 border-b border-border py-12 sm:py-20">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">Professional experience</p>
            <h2 id="work-title" className="font-display mt-3 text-4xl text-foreground">Selected Work</h2>
          </div>
          <Link href="/about" className="link-rule text-sm font-medium text-foreground">Explore my background →</Link>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {workExamples.map((item) => (
            <article key={item.number} className="flex h-full flex-col rounded-xl border border-border p-6">
              <p className="font-mono text-xs text-accent">{item.number} / {item.context}</p>
              <h3 className="font-display mt-6 text-3xl text-foreground">{item.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-7 text-muted">{item.detail}</p>
              <p className="mt-6 border-t border-border pt-3 text-xs text-muted">{item.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="side-quests" aria-labelledby="quests-title" className="scroll-mt-24 border-b border-border py-12 sm:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">Learning in public</p>
        <h2 id="quests-title" className="font-display mt-3 text-4xl text-foreground">Side Quests</h2>
        <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
          Independent experiments in cybersecurity research, AI workflows and product design. Each project is a chance to understand something more deeply by building it.
        </p>
        <Link href="/projects" className="link-rule mt-6 inline-flex min-h-11 items-center text-sm font-semibold text-foreground">
          Browse existing projects →
        </Link>
      </section>

      <section aria-labelledby="contact-title" className="py-12 sm:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">Let's connect</p>
        <h2 id="contact-title" className="font-display mt-3 text-4xl text-foreground">Building what's next.</h2>
        <p className="mt-3 max-w-xl leading-7 text-muted">
          Interested in people leadership, cybersecurity, GTM strategy or collaborative problem-solving?
        </p>
        <Link href="/contact" className="link-rule mt-5 inline-flex min-h-11 items-center font-medium text-foreground">
          Get in touch →
        </Link>
      </section>
    </main>
  );
}
