import type {Metadata} from "next";
import Link from "next/link";
import {PageMain} from "@/components/page-main";
import {portfolioEntries} from "@/lib/portfolio-registry";
import {publicStories} from "@/lib/public-stories";
export const metadata:Metadata={alternates:{canonical:"/work"},openGraph:{url:"/work"},title:"Work | Revenue & GTM Leadership",description:"Enterprise cybersecurity sales, commercial leadership, coaching and source-backed GTM work."};
export default function WorkPage(){
 const work=portfolioEntries.filter(entry=>entry.kind==="work");
 return <PageMain><section className="border-b border-border py-12 sm:py-16">
 <p className="text-sm font-medium text-muted">Work / Professional experience</p>
 <h1 className="font-display mt-3 max-w-3xl text-4xl leading-[1.16] tracking-normal sm:text-5xl">People. Strategy. Systems.</h1>
 <p className="mt-4 max-w-2xl leading-7 text-muted">Enterprise cybersecurity sales, team development, competitive positioning and GTM operations. My professional experience comes first; independent product experiments live under Side Quests.</p>
 <nav aria-label="Explore professional work" className="mt-8 grid gap-3 sm:grid-cols-3">
 {[
  {title:"Enterprise Sales",detail:"Strategic deals, technical evaluations, and commercial execution",href:"#enterprise-sales"},
  {title:"People & Leadership",detail:"Coaching, enablement, and team development",href:"#people-leadership"},
  {title:"GTM Strategy",detail:"Revenue systems, planning, and cross-functional execution",href:"#gtm-strategy"}
 ].map(item=><a key={item.href} href={item.href} className="rounded-xl border border-border bg-card p-4 hover:border-accent focus-visible:outline-2 focus-visible:outline-ring"><span className="block font-display text-xl">{item.title}</span><span className="mt-2 block text-sm leading-6 text-muted">{item.detail}</span><span aria-hidden="true" className="mt-3 block text-accent">Explore ↓</span></a>)}
 </nav>
 <div id="enterprise-sales" className="scroll-mt-24 mt-6 flex flex-wrap gap-4 text-sm"><Link href="/experience" className="font-medium text-accent underline">Experience and career history</Link><Link href="/about" className="font-medium text-accent underline">Leadership philosophy</Link></div>
 </section><section id="people-leadership" className="scroll-mt-24 border-b border-border py-12">
 <h2 className="font-display text-3xl">People & leadership in practice</h2>
 <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">Professional examples, with the boundaries of public evidence kept clear. Independent software projects linked below are not employer deployments.</p>
 <div className="mt-6 grid gap-5">{publicStories.map(story=><article key={story.id} className="rounded-xl border border-border bg-card p-6">
 <p className="text-xs font-semibold uppercase tracking-wider text-accent">{story.area}</p>
 <h3 className="mt-2 text-2xl font-semibold">{story.title}</h3>
 <dl className="mt-5 grid gap-4 text-sm leading-6 sm:grid-cols-2">
 <div><dt className="font-semibold">Context</dt><dd className="mt-1 text-muted">{story.context}</dd></div>
 <div><dt className="font-semibold">My contribution</dt><dd className="mt-1 text-muted">{story.contribution}</dd></div>
 <div><dt className="font-semibold">Evidence and limitations</dt><dd className="mt-1 text-muted">{story.evidence}</dd></div>
 <div><dt className="font-semibold">What I learned</dt><dd className="mt-1 text-muted">{story.takeaway}</dd></div>
 </dl>
 <div className="mt-5 flex flex-wrap gap-5">{story.related.map(link=><Link key={link.href} href={link.href} className="text-sm text-accent underline">{link.label} →</Link>)}</div>
 </article>)}</div>
 </section>
 <section id="gtm-strategy" className="scroll-mt-24 py-12"><h2 className="font-display text-3xl">GTM strategy & professional evidence</h2>
 <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">These examples describe professional methods or field artifacts where supported. A related software prototype is not proof of employer deployment.</p>
 <div className="mt-7 grid gap-4 md:grid-cols-2">{work.map(item=><article key={item.slug} className="rounded-xl border border-border bg-card p-6"><p className="text-xs font-semibold uppercase tracking-widest text-accent">Professional practice</p><h3 className="mt-2 text-xl font-semibold">{item.title}</h3><p className="mt-3 text-sm leading-6 text-muted">{item.summary}</p><p className="mt-3 text-xs leading-5 text-muted">Portfolio example: outcomes and any related software experiments are described separately.</p><Link href={item.href} className="mt-4 inline-block text-sm font-medium text-accent underline">Explore case study →</Link></article>)}</div>
 <div className="mt-8 rounded-xl border border-border p-6"><h3 className="font-semibold">Career and leadership experience</h3><p className="mt-2 text-sm leading-6 text-muted">Work extends beyond any one project: complex enterprise deals, coaching, onboarding, technical discovery, and cross-functional GTM improvements.</p><Link href="/experience" className="mt-3 inline-block text-sm text-accent underline">View professional timeline →</Link></div></section></PageMain>
}
