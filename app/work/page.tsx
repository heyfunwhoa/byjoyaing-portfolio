import { PageMain } from "@/components/page-main";
import { portfolioEntries } from "@/lib/portfolio-registry";
import { roles } from "@/lib/portfolio";
import { publicStories } from "@/lib/public-stories";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Work | Revenue & GTM Leadership",
  description: "Enterprise cybersecurity sales, commercial leadership, coaching and source-backed GTM work.",
};

const sellingCompanies = ["Truffle Security", "Rapid7", "Forcepoint"] as const;

export default function WorkPage() {
  const selling = sellingCompanies.map((company) => {
    const role = roles.find((item) => item.company === company);
    if (!role) {
      throw new Error(`Missing role ${company}`);
    }
    return role;
  });
  const people = publicStories.filter((story) => story.area === "People");
  const strategy = publicStories.filter((story) => story.area === "Strategy");
  const gtm = portfolioEntries.filter((entry) => entry.kind === "work");

  return (
    <PageMain>
      <section className="border-b border-border py-12 sm:py-16">
        <p className="text-sm font-medium text-muted">Work / Professional experience</p>
        <h1 className="font-display mt-3 max-w-3xl text-4xl leading-[1.16] tracking-normal sm:text-5xl">
          Enterprise cybersecurity sales, then the leadership around it.
        </h1>
        <p className="mt-4 max-w-2xl leading-7 text-muted">
          Selling evidence comes first. Coaching and field practice follow. Independent product experiments live under Side Quests.
        </p>
        <nav aria-label="Explore professional work" className="mt-8 grid gap-3 sm:grid-cols-3">
          {[
            { title: "Enterprise Sales", detail: "Strategic deals, technical evaluations, and commercial execution", href: "#enterprise-sales" },
            { title: "People & Leadership", detail: "Coaching, enablement, and team development", href: "#people-leadership" },
            { title: "GTM Strategy", detail: "Field practice and competitive guidance", href: "#gtm-strategy" },
          ].map((item) => (
            <a key={item.href} href={item.href} className="rounded-xl border border-border bg-card p-4 hover:border-accent focus-visible:outline-2 focus-visible:outline-ring">
              <span className="block font-display text-xl">{item.title}</span>
              <span className="mt-2 block text-sm leading-6 text-muted">{item.detail}</span>
              <span aria-hidden="true" className="mt-3 block text-accent">Explore ↓</span>
            </a>
          ))}
        </nav>
      </section>

      <section id="enterprise-sales" className="scroll-mt-24 border-b border-border py-12">
        <h2 className="font-display text-3xl">Enterprise Sales</h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
          Employment record from the roles already published on the timeline. Dollar figures stay off the site. The rest of the career is on Experience.
        </p>
        <div className="mt-8 divide-y divide-border border-y border-border">
          {selling.map((role) => (
            <article key={role.company} className="grid min-w-0 gap-3 py-6 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-8">
              <div>
                <p className="text-xs font-semibold text-accent">{role.period}</p>
                <h3 className="mt-2 font-display text-3xl leading-tight">{role.company}</h3>
                <p className="mt-1 text-sm leading-6 text-muted">{role.title}</p>
              </div>
              <div className="min-w-0">
                <p className="text-sm leading-6 text-muted">{role.category}</p>
                <ul className="mt-3 space-y-2 text-sm leading-6">
                  {role.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
        <Link href="/experience" className="mt-6 inline-flex min-h-11 items-center text-sm font-medium text-accent underline">
          Full experience timeline →
        </Link>
      </section>

      <section id="people-leadership" className="scroll-mt-24 border-b border-border py-12">
        <h2 className="font-display text-3xl">People & leadership in practice</h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
          Coaching, hiring support, and enablement. This is contribution from the field, not a Head of Sales title. Independent software linked nearby is not an employer deployment.
        </p>
        <div className="mt-6 grid gap-5">
          {people.map((story) => (
            <article key={story.id} className="rounded-xl border border-border bg-card p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-accent">{story.area}</p>
              <h3 className="mt-2 text-2xl font-semibold">{story.title}</h3>
              <dl className="mt-5 grid gap-4 text-sm leading-6 sm:grid-cols-2">
                <div><dt className="font-semibold">Context</dt><dd className="mt-1 text-muted">{story.context}</dd></div>
                <div><dt className="font-semibold">My contribution</dt><dd className="mt-1 text-muted">{story.contribution}</dd></div>
                <div><dt className="font-semibold">Evidence and limitations</dt><dd className="mt-1 text-muted">{story.evidence}</dd></div>
                <div><dt className="font-semibold">What I learned</dt><dd className="mt-1 text-muted">{story.takeaway}</dd></div>
              </dl>
              <div className="mt-5 flex flex-wrap gap-5">
                {story.related.map((link) => (
                  <Link key={link.href} href={link.href} className="inline-flex min-h-11 items-center text-sm text-accent underline">{link.label} →</Link>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="gtm-strategy" className="scroll-mt-24 py-12">
        <h2 className="font-display text-3xl">GTM strategy & professional evidence</h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
          Field practice only. A software prototype is not proof that an employer deployed it.
        </p>
        <div className="mt-6 grid gap-5">
          {strategy.map((story) => (
            <article key={story.id} className="rounded-xl border border-border bg-card p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-accent">{story.area}</p>
              <h3 className="mt-2 text-2xl font-semibold">{story.title}</h3>
              <dl className="mt-5 grid gap-4 text-sm leading-6 sm:grid-cols-2">
                <div><dt className="font-semibold">Context</dt><dd className="mt-1 text-muted">{story.context}</dd></div>
                <div><dt className="font-semibold">My contribution</dt><dd className="mt-1 text-muted">{story.contribution}</dd></div>
                <div><dt className="font-semibold">Evidence and limitations</dt><dd className="mt-1 text-muted">{story.evidence}</dd></div>
                <div><dt className="font-semibold">What I learned</dt><dd className="mt-1 text-muted">{story.takeaway}</dd></div>
              </dl>
              <div className="mt-5 flex flex-wrap gap-5">
                {story.related.map((link) => (
                  <Link key={link.href} href={link.href} className="inline-flex min-h-11 items-center text-sm text-accent underline">{link.label} →</Link>
                ))}
              </div>
            </article>
          ))}
        </div>
        <div className="mt-7 grid gap-4 md:grid-cols-2">
          {gtm.map((item) => (
            <article key={item.slug} className="rounded-xl border border-border bg-card p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-accent">Professional practice</p>
              <h3 className="mt-2 text-xl font-semibold">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">{item.summary}</p>
              <p className="mt-3 text-xs leading-5 text-muted">The monitor is a design. Outcomes and any related software experiments are described separately.</p>
              <Link href={item.href} className="mt-4 inline-flex min-h-11 items-center text-sm font-medium text-accent underline">Explore case study →</Link>
            </article>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-5 text-sm">
          <Link href="/experience" className="inline-flex min-h-11 items-center font-medium text-accent underline">View professional timeline →</Link>
          <Link href="/contact" className="inline-flex min-h-11 items-center font-medium text-accent underline">Get in touch →</Link>
        </div>
      </section>
    </PageMain>
  );
}
