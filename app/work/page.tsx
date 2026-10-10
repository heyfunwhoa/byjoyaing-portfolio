import type {Metadata} from "next";
import Link from "next/link";
import {PageMain} from "@/components/page-main";
import {portfolioEntries} from "@/lib/portfolio-registry";
export const metadata:Metadata={title:"Work | Commercial Leadership & GTM",description:"Enterprise cybersecurity sales, commercial leadership, coaching and source-backed GTM work."};
export default function WorkPage(){
 const work=portfolioEntries.filter(entry=>entry.kind==="work");
 return <PageMain><section className="border-b border-border py-12 sm:py-16">
 <p className="text-sm font-medium text-muted">Work / Professional experience</p>
 <h1 className="font-display mt-3 max-w-3xl text-4xl leading-[1.16] tracking-normal sm:text-5xl">People. Strategy. Systems.</h1>
 <p className="mt-4 max-w-2xl leading-7 text-muted">Enterprise cybersecurity sales, team development, competitive positioning and GTM operations. My professional experience comes first; independent product experiments live under Side Quests.</p>
 <div className="mt-6 flex flex-wrap gap-4 text-sm"><Link href="/experience" className="font-medium text-accent underline">Experience and career history</Link><Link href="/about" className="font-medium text-accent underline">Leadership philosophy</Link></div>
 </section><section className="py-12"><h2 className="font-display text-3xl">Selected professional evidence</h2>
 <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">These examples describe professional methods or field artifacts where supported. A related software prototype is not proof of employer deployment.</p>
 <div className="mt-7 grid gap-4 md:grid-cols-2">{work.map(item=><article key={item.slug} className="rounded-xl border border-border bg-card p-6"><p className="text-xs font-semibold uppercase tracking-widest text-accent">Professional practice</p><h3 className="mt-2 text-xl font-semibold">{item.title}</h3><p className="mt-3 text-sm leading-6 text-muted">{item.summary}</p><p className="mt-3 text-xs leading-5 text-muted">Portfolio example: outcomes and any related software experiments are described separately.</p><Link href={item.href} className="mt-4 inline-block text-sm font-medium text-accent underline">Explore case study →</Link></article>)}</div>
 <div className="mt-8 rounded-xl border border-border p-6"><h3 className="font-semibold">Career and leadership experience</h3><p className="mt-2 text-sm leading-6 text-muted">Work extends beyond any one project: complex enterprise deals, coaching, onboarding, technical discovery, and cross-functional GTM improvements.</p><Link href="/experience" className="mt-3 inline-block text-sm text-accent underline">View professional timeline →</Link></div></section></PageMain>
}
