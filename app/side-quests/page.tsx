import type {Metadata} from "next";
import Link from "next/link";
import {PageMain} from "@/components/page-main";
import {portfolioEntries} from "@/lib/portfolio-registry";
import {statusCopy,statusHelp} from "@/lib/portfolio";
export const metadata:Metadata={title:"Side Quests | Independent Projects",description:"Independent cybersecurity, AI, enablement, and GTM software experiments, with transparent build stages."};
const selected=["account-intelligence","detector-coverage-atlas","truffle-camp","customer-feedback-intelligence"];
export default function SideQuestsPage(){
 const items=portfolioEntries.filter(entry=>entry.kind==="side-quest");
 const featured=selected.flatMap(slug=>items.filter(entry=>entry.slug===slug));
 const more=items.filter(entry=>!selected.includes(entry.slug));
 return <PageMain><section className="border-b border-border py-12 sm:py-16"><p className="text-sm font-medium text-muted">Side Quests / Independent builds</p><h1 className="font-display mt-3 text-4xl leading-[1.16] tracking-normal sm:text-5xl">Curiosity, put to work.</h1><p className="mt-4 max-w-2xl leading-7 text-muted">Exploring the problems I encounter in cybersecurity and go-to-market work, then turning them into research systems, learning tools, and software experiments. Different projects are at different stages; none should be mistaken for employer deployments.</p></section>
 <section className="border-b border-border py-12"><h2 className="font-display text-3xl">Selected Side Quests</h2><p className="mt-2 text-sm text-muted">Selected for their relevance to security, commercial problem-solving and learning—not because each app is finished.</p><div className="mt-6 grid gap-4 md:grid-cols-2">{featured.map(item=><article key={item.slug} className="flex flex-col rounded-xl border border-border bg-card p-6"><p className="text-xs font-semibold uppercase tracking-wider text-accent">{statusCopy[item.status]}</p><h3 className="mt-2 text-xl font-semibold">{item.title}</h3><p className="mt-3 flex-1 text-sm leading-6 text-muted">{item.summary}</p><p className="mt-3 text-xs leading-5 text-muted">{statusHelp[item.status]}</p><Link href={item.href} className="mt-5 text-sm font-medium text-accent underline">View case study →</Link></article>)}</div></section>
 <section className="py-12"><h2 className="font-display text-3xl">Other explorations</h2><p className="mt-2 text-sm text-muted">These are supporting experiments or concepts. They are not all active priorities.</p><div className="mt-6 grid gap-3 sm:grid-cols-2">{more.map(item=><Link href={item.href} key={item.slug} className="rounded-lg border border-border p-4 hover:border-accent"><span className="block font-semibold">{item.title}</span><span className="mt-1 block text-xs text-muted">{statusCopy[item.status]}</span></Link>)}</div><div className="mt-9 rounded-xl border border-border bg-card p-6">
 <h3 className="text-lg font-semibold">Research and tools still taking shape</h3>
 <p className="mt-2 text-sm leading-6 text-muted">These repositories are part of the longer-term roadmap. They are intentionally not represented as finished portfolio applications.</p>
 <div className="mt-4 flex flex-wrap gap-4 text-sm">
 <a href="https://github.com/heyfunwhoa/security-market-map" target="_blank" rel="noopener noreferrer" className="text-accent underline">Security Market Map ↗</a>
 <a href="https://github.com/heyfunwhoa/technical-docs-platform" target="_blank" rel="noopener noreferrer" className="text-accent underline">Technical Documentation Foundation ↗</a>
 </div>
 </div>
 <Link href="/projects" className="mt-6 inline-block text-sm text-accent underline">View legacy project directory →</Link></section></PageMain>
}
