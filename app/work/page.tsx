import { WorkRequestCallout } from "@/components/work-request-callout";
import { WorkCarousel } from "@/components/work-carousel";
import { ProfessionalCaseStudy } from "@/components/editorial/professional-case-study";
import type {Metadata} from "next";
import Link from "next/link";
import {PageMain} from "@/components/page-main";
import {portfolioEntries} from "@/lib/portfolio-registry";
import {publicStories} from "@/lib/public-stories";
export const metadata:Metadata={alternates:{canonical:"/work"},openGraph:{url:"/work"},title:"Work",description:"Enterprise cybersecurity sales, revenue leadership, coaching and evidence-led GTM work."};
export default function WorkPage(){
 const work=portfolioEntries.filter(entry=>entry.kind==="work");
 return <PageMain><section className="border-b border-border py-12 sm:py-16">
 <p className="text-sm font-medium text-muted">Work / Professional experience</p>
 <h1 className="font-display mt-3 max-w-3xl text-4xl leading-[1.16] tracking-normal sm:text-5xl">People. Strategy. Systems.</h1>
 <p className="mt-4 max-w-2xl leading-7 text-muted">Enterprise cybersecurity sales, team development, competitive positioning and GTM operations. My professional experience comes first; independent product experiments live under Side Quests.</p>
 <WorkCarousel items={[
 {title:"Enterprise Sales",detail:"Strategic deals, technical evaluations, and commercial execution",href:"#enterprise-sales"},
 {title:"People & Leadership",detail:"Coaching, enablement, and team development",href:"#people-leadership"},
 {title:"GTM Strategy",detail:"Revenue systems, planning, and cross-functional execution",href:"#gtm-strategy"}
 ]} />
 </section>
 <section id="enterprise-sales" className="scroll-mt-24 border-b border-border py-12">
 <p className="editorial-eyebrow text-accent">01 / Selling</p>
 <h2 className="mt-2 font-display text-3xl">Enterprise deal execution</h2>
 <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">Full-cycle work comes first. The public record describes responsibilities and selected agreements; customers, contract details and unsupported metrics are omitted.</p>
 <div className="mt-6 grid gap-5">{publicStories.filter(story=>story.area==="Enterprise Sales").map(story=><ProfessionalCaseStudy key={story.id} title={story.title} context={story.context} role={story.contribution} execution={story.execution} evidence={story.evidence} reflection={story.takeaway} relatedItems={story.related}/>)}</div>
 </section>
 <section id="people-leadership" className="scroll-mt-24 border-b border-border py-12">
 <p className="editorial-eyebrow text-accent">02 / People</p>
 <h2 className="mt-2 font-display text-3xl">Coaching and team development</h2>
 <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">Mentoring, enabling and onboarding teammates. These contributions are distinct from formal people-management responsibility.</p>
 <div className="mt-6 grid gap-5">{publicStories.filter(story=>story.area==="People & Leadership").map(story=><ProfessionalCaseStudy key={story.id} title={story.title} context={story.context} role={story.contribution} execution={story.execution} evidence={story.evidence} reflection={story.takeaway} relatedItems={story.related}/>)}</div>
 </section>
 <section id="gtm-strategy" className="scroll-mt-24 py-12"><p className="editorial-eyebrow text-accent">03 / Systems</p><h2 className="mt-2 font-display text-3xl">GTM strategy & professional evidence</h2>
 <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">These examples describe professional methods or field artifacts where supported. A related software prototype is not proof of employer deployment.</p>
 <div className="mt-6 grid gap-5">{publicStories.filter(story=>story.area==="GTM Strategy").map(story=><ProfessionalCaseStudy key={story.id} title={story.title} context={story.context} role={story.contribution} execution={story.execution} evidence={story.evidence} reflection={story.takeaway} relatedItems={story.related}/>)}</div>
 <h3 className="mt-10 text-xl font-semibold">Related field systems</h3><div className="mt-5 grid gap-4 md:grid-cols-2">{work.map(item=><article key={item.slug} className="rounded-xl border border-border bg-card p-6"><p className="text-xs font-semibold uppercase tracking-widest text-accent">Professional practice</p><h3 className="mt-2 text-xl font-semibold">{item.title}</h3><p className="mt-3 text-sm leading-6 text-muted">{item.summary}</p><p className="mt-3 text-xs leading-5 text-muted">Portfolio example: outcomes and any related software experiments are described separately.</p><Link href={item.href} className="mt-4 inline-block text-sm font-medium text-accent underline">Explore case study →</Link></article>)}</div>
 <div className="mt-8 rounded-xl border border-border p-6"><h3 className="font-semibold">Career and leadership experience</h3><p className="mt-2 text-sm leading-6 text-muted">Work extends beyond any one project: complex enterprise deals, coaching, onboarding, technical discovery, and cross-functional GTM improvements.</p><Link href="/experience" className="mt-3 inline-block text-sm text-accent underline">View professional timeline →</Link></div></section><WorkRequestCallout /></PageMain>
}
