"use client";
import {useState} from "react";
import Link from "next/link";
import {assessCase,assessEvidence,detectiveCases,evidenceLessons} from "@/lib/ai-academy-labs";
const steps=["Learn","Practice","Feedback","Apply"] as const;
export function SourceJourney(){
 const [step,setStep]=useState(0),[caseIndex,setCaseIndex]=useState(0);
 const [classification,setClassification]=useState<number|null>(null),[source,setSource]=useState<number|null>(null);
 const [checked,setChecked]=useState(false),[reflection,setReflection]=useState(""),[completed,setCompleted]=useState(false);
 const sample=detectiveCases[caseIndex];
 const claimResult=classification===null?null:assessCase(sample.id,classification);
 const evidenceResult=source===null?null:assessEvidence(sample.id,source);
 const passed=claimResult?.correct===true&&evidenceResult?.correct===true;
 function resetCase(index:number){setCaseIndex(index);setClassification(null);setSource(null);setChecked(false);setReflection("");setCompleted(false);setStep(1);}
 return <main className="mx-auto w-full max-w-4xl px-5 py-12 sm:px-8">
 <Link href="/ai-academy/playground" className="text-sm text-accent underline">← All playground labs</Link>
 <p className="mt-8 text-xs font-semibold uppercase tracking-[.2em] text-accent">AI Foundations / Guided learning journey</p>
 <h1 className="font-display mt-3 text-4xl sm:text-5xl">Can you trust an AI-generated claim?</h1>
 <p className="mt-4 max-w-2xl leading-7 text-muted">Learn to distinguish documented facts from unsupported claims, test your judgment against fictional evidence, then connect the method to real source-backed research.</p>
 <nav aria-label="Journey progress" className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-4">{steps.map((name,i)=><div key={name} aria-current={step===i?"step":undefined} className={`rounded-lg border p-3 text-sm ${step===i?"border-accent bg-card":"border-border"}`}><span className="block text-xs text-muted">{i+1} of 4</span><strong>{name}</strong></div>)}</nav>
 {step===0&&<section className="mt-8 space-y-5 rounded-xl border border-border bg-card p-6 sm:p-8"><h2 className="font-display text-3xl">First, understand the distinction</h2>
 <p className="leading-7">An AI assistant can write a convincing statement without evidence. A reliable researcher checks whether the exact statement is supported by the original material.</p>
 <dl className="grid gap-3 sm:grid-cols-2">{[["Source","The document or webpage where information originated."],["Evidence","A specific passage that directly supports or challenges a statement."],["Claim","A statement we want to assess, separate from its supporting evidence."],["Hypothesis","A plausible idea that has not been established as fact."]].map(([term,definition])=><div key={term} className="rounded-lg bg-background p-4"><dt className="font-semibold">{term}</dt><dd className="mt-1 text-sm leading-6">{definition}</dd></div>)}</dl>
 <div className="rounded-lg bg-background p-5"><h3 className="font-semibold">Worked example</h3><p className="mt-2 text-sm leading-7">If documentation says a fictional security tool supports AWS and Azure, it does <strong>not</strong> demonstrate that every cloud is supported. You can report the documented environments while marking the broader claim unsupported.</p></div>
 <p className="text-sm text-muted"><strong>Remember:</strong> Unsupported does not necessarily mean disproven. A publication date differs from the date you captured a page. Marketing claims and independent validation are different kinds of evidence.</p>
 <button type="button" onClick={()=>setStep(1)} className="rounded-lg bg-accent px-5 py-3 font-semibold text-accent-foreground">Try a case →</button></section>}
 {step===1&&<section className="mt-8 rounded-xl border border-border bg-card p-6 sm:p-8">
 <p className="text-xs uppercase tracking-widest text-accent">Fictional training fixture · Case {caseIndex+1} of {detectiveCases.length}</p><h2 className="mt-2 font-display text-3xl">{sample.title}</h2>
 <div className="mt-5 rounded-lg bg-background p-4"><p className="text-xs text-muted">AI-generated claim</p><p className="mt-2 font-semibold">{sample.claim}</p></div>
 <h3 className="mt-6 font-semibold">Inspect the sources</h3><div className="mt-3 grid gap-3 sm:grid-cols-2">{sample.sources.map(item=><article key={item.name} className="rounded-lg border border-border p-4"><p className="font-semibold">{item.name}</p><p className="mt-1 text-xs text-muted">Synthetic source · {item.date}</p><p className="mt-3 text-sm leading-7">{item.text}</p></article>)}</div>
 <fieldset className="mt-7"><legend className="font-semibold">1. How should you classify the claim?</legend><div className="mt-3 space-y-2">{sample.options.map((option,i)=><label key={option} className="flex gap-3 rounded-lg border border-border p-3 text-sm"><input type="radio" name={"class-"+sample.id} checked={classification===i} onChange={()=>setClassification(i)}/>{option}</label>)}</div></fieldset>
 <fieldset className="mt-7"><legend className="font-semibold">2. {evidenceLessons[sample.id].question}</legend><div className="mt-3 space-y-2">{sample.sources.map((item,i)=><label key={item.name} className="flex gap-3 rounded-lg border border-border p-3 text-sm"><input type="radio" name={"source-"+sample.id} checked={source===i} onChange={()=>setSource(i)}/>{item.name}</label>)}</div></fieldset>
 <div className="mt-6 flex flex-wrap gap-3"><button type="button" onClick={()=>{setChecked(true);setStep(2)}} disabled={classification===null||source===null} className="rounded-lg bg-accent px-5 py-3 font-semibold text-accent-foreground disabled:opacity-50">Check my reasoning</button><button type="button" onClick={()=>setStep(0)} className="rounded-lg border border-border px-4 py-2">Review lesson</button></div>
 </section>}
 {step===2&&checked&&<section className="mt-8 space-y-5 rounded-xl border border-border bg-card p-6 sm:p-8" aria-live="polite"><h2 className="font-display text-3xl">{passed?"Both decisions correct":"Review the evidence and try again"}</h2>
 <div className="rounded-lg bg-background p-4"><p className="font-semibold">Claim classification: {claimResult?.correct?"Correct":"Needs another look"}</p><p className="mt-2 text-sm leading-7">{claimResult?.explanation}</p></div>
 <div className="rounded-lg bg-background p-4"><p className="font-semibold">Evidence choice: {evidenceResult?.correct?"Correct":"Needs another look"}</p><p className="mt-2 text-sm leading-7">{evidenceLessons[sample.id].rationale}</p></div>
 <p className="text-sm"><strong>Common misconception:</strong> {evidenceLessons[sample.id].misconception}</p>
 <div className="flex flex-wrap gap-3"><button type="button" onClick={()=>setStep(1)} className="rounded-lg border border-border px-4 py-2">Revisit exercise</button><button type="button" disabled={!passed} onClick={()=>setStep(3)} className="rounded-lg bg-accent px-5 py-3 font-semibold text-accent-foreground disabled:opacity-50">Apply what I learned →</button></div>
 </section>}
 {step===3&&passed&&<section className="mt-8 space-y-5 rounded-xl border border-border bg-card p-6 sm:p-8"><h2 className="font-display text-3xl">Connect this to Account Intelligence</h2>
 <p className="leading-7">Your LimaCharlie Research Hub uses a related process: resolve the source URL, retain an immutable content version, match evidence to the saved text, and distinguish statements from interpretation. The Academy case was fictional; this step does not query or update your Research Hub.</p>
 <div className="rounded-lg bg-background p-4"><h3 className="font-semibold">Transfer exercise</h3><p className="mt-2 text-sm">{evidenceLessons[sample.id].transfer} Write one question you would ask before treating a product or buying claim as verified.</p></div>
 <label className="block text-sm font-semibold" htmlFor="reflection">Your verification question<textarea id="reflection" value={reflection} onChange={e=>setReflection(e.target.value)} rows={3} className="mt-2 w-full rounded-lg border border-border bg-background p-3 font-normal" placeholder="What original source would confirm..."/></label>
 <p className="text-xs text-muted">Self-reflection, not automatically graded or saved. Completing the journey confirms practice, not professional proficiency.</p>
 <button type="button" disabled={reflection.trim().length<12} onClick={()=>setCompleted(true)} className="rounded-lg bg-accent px-5 py-3 font-semibold text-accent-foreground disabled:opacity-50">Complete this journey</button>
 {completed&&<div role="status" className="rounded-lg bg-background p-4"><p className="font-semibold">Journey completed in this session.</p><p className="mt-1 text-sm">You practiced source verification and identified a question for future research. Your response is not persisted.</p><div className="mt-3 flex flex-wrap gap-4"><Link className="text-sm text-accent underline" href="https://github.com/heyfunwhoa/account-signal-engine">Explore the Research Hub code ↗</Link><button type="button" className="text-sm text-accent underline" onClick={()=>resetCase((caseIndex+1)%detectiveCases.length)}>Try another scenario →</button></div></div>}
 </section>}
 <p className="mt-8 text-xs text-muted">No model calls, network requests or storage. Results are based on fixed fictional teaching cases, not independently verified real-world claims.</p>
 </main>;
}
