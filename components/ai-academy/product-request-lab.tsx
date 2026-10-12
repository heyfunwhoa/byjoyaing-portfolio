"use client";
import { useState } from "react";
const examples:Record<string,string>={Sales:"An evaluator spends four hours preparing audit evidence.",CS:"An existing customer repeats manual reconciliation monthly.",Support:"Three fictional tickets report a missing failure explanation.",Leadership:"A new regulated segment may need repeatable evidence reports."};
export function ProductRequestLab(){
 const [source,setSource]=useState("Sales"),[problem,setProblem]=useState(""),[evidence,setEvidence]=useState(""),[reach,setReach]=useState(""),[outcome,setOutcome]=useState(""),[value,setValue]=useState("200000"),[delta,setDelta]=useState("15"),[review,setReview]=useState(false);
 const [evidenceType,setEvidenceType]=useState("Gong recording"),[evidenceRef,setEvidenceRef]=useState(""),[evidenceTime,setEvidenceTime]=useState(""),[claimType,setClaimType]=useState("AI summary — unverified"),[authorized,setAuthorized]=useState(false);
 const ready=[problem,evidence,reach,outcome,evidenceRef,evidenceTime].every(x=>x.trim().length>0)&&authorized;
 const exposure=Math.min(1e8,Math.max(0,Number(value)||0)),change=Math.min(100,Math.max(0,Number(delta)||0));
 const money=(v:number)=>new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",maximumFractionDigits:0}).format(v);
 return <section aria-label="Fictional product request lab" className="mt-7 rounded-xl border border-border bg-background p-4 sm:p-6">
 <p className="text-xs font-semibold uppercase tracking-widest text-accent">Practice · Fictional data only</p><h3 className="mt-2 font-display text-2xl">Write a request Product can evaluate</h3>
 <p className="mt-2 text-sm leading-6 text-muted">Do not enter employer data or customer records. This exercise is session-only and does not submit a real product request.</p>
 <label htmlFor="intake-source" className="mt-4 block text-sm font-semibold">Origin of feedback</label><select id="intake-source" value={source} onChange={e=>setSource(e.target.value)} className="mt-2 w-full rounded-lg border border-border bg-card p-3">{Object.keys(examples).map(x=><option key={x}>{x}</option>)}</select>
 <p className="mt-3 rounded-lg bg-card p-3 text-sm"><strong>Example:</strong> {examples[source]} — unverified classroom hypothesis.</p>
 <div className="mt-4 grid gap-4 sm:grid-cols-2">{[
 {label:"User problem and current workaround",v:problem,set:setProblem},
 {label:"Original evidence, source and date",v:evidence,set:setEvidence},
 {label:"Affected users and frequency",v:reach,set:setReach},
 {label:"Desired measurable outcome",v:outcome,set:setOutcome}
 ].map((item,i)=><label key={i} className="text-sm font-semibold">{item.label}<textarea rows={3} value={item.v} onChange={e=>{item.set(e.target.value);setReview(false)}} className="mt-2 block w-full rounded-lg border border-border bg-card p-3 font-normal"/></label>)}</div>
 <fieldset className="mt-6 rounded-lg border border-border p-4"><legend className="px-2 font-semibold">Trace the original evidence (fictional references only)</legend>
 <p className="text-sm text-muted">A summary is not the source itself. In a real company, link to the authorized original artifact; never copy confidential transcripts or call URLs into a public lesson. Two notes about one account are not two independent customer requests.</p>
 <div className="mt-3 grid gap-3 sm:grid-cols-2">
 <label className="text-sm font-semibold">Source system<select value={evidenceType} onChange={e=>{setEvidenceType(e.target.value);setReview(false)}} className="mt-2 block w-full rounded-lg border border-border bg-card p-3 font-normal">{["Gong recording","Granola meeting notes","CRM activity","Support ticket","Customer email","Research interview"].map(x=><option key={x}>{x}</option>)}</select></label>
 <label className="text-sm font-semibold">Evidence classification<select value={claimType} onChange={e=>{setClaimType(e.target.value);setReview(false)}} className="mt-2 block w-full rounded-lg border border-border bg-card p-3 font-normal">{["Direct customer statement","AI summary — unverified","Seller interpretation","Unvalidated hypothesis"].map(x=><option key={x}>{x}</option>)}</select></label>
 <label className="text-sm font-semibold">Fictional source ID or reference<input value={evidenceRef} onChange={e=>{setEvidenceRef(e.target.value);setReview(false)}} placeholder="EXAMPLE-MTG-001 (not a real URL)" className="mt-2 block w-full rounded-lg border border-border bg-card p-3 font-normal"/></label>
 <label className="text-sm font-semibold">Observation date and exact recording time / note location<input value={evidenceTime} onChange={e=>{setEvidenceTime(e.target.value);setReview(false)}} placeholder="2026-09-12, 18:42 (fictional)" className="mt-2 block w-full rounded-lg border border-border bg-card p-3 font-normal"/></label>
 </div>
 <label className="mt-4 flex items-start gap-2 text-sm"><input type="checkbox" checked={authorized} onChange={e=>{setAuthorized(e.target.checked);setReview(false)}} className="mt-1 accent-accent"/><span>I am using only invented examples here, and understand that actual source links require appropriate organizational authorization.</span></label>
 <p className="mt-2 text-xs text-muted">Selected source: {evidenceType}. Classification: {claimType}. Preserve links, provenance, access permissions and later corrections in the employer-approved system.</p>
 </fieldset>
 <h4 className="mt-6 font-semibold">Estimate incremental value, not total deal value</h4><p className="mt-1 text-sm text-muted">Illustrative only: deal exposure × assumed improvement in win probability. Neither input is validated, and implementation cost is excluded.</p>
 <div className="mt-3 grid gap-3 sm:grid-cols-2"><label className="text-sm font-semibold">Exposed opportunity ($)<input aria-label="Exposed opportunity dollars" type="number" min={0} max={100000000} value={value} onChange={e=>setValue(e.target.value)} className="mt-2 w-full rounded-lg border border-border bg-card p-3 font-normal"/></label><label className="text-sm font-semibold">Assumed win-probability increase (percentage points)<input aria-label="Probability increase percentage points" type="number" min={0} max={100} value={delta} onChange={e=>setDelta(e.target.value)} className="mt-2 w-full rounded-lg border border-border bg-card p-3 font-normal"/></label></div>
 <div className="mt-3 rounded-lg border border-border bg-card p-4"><p className="text-xs text-muted">Illustrative incremental expected bookings</p><p className="mt-1 text-2xl font-semibold">{money(exposure*change/100)}</p><p className="mt-1 text-xs text-muted">Exposure {money(exposure)} × {change} percentage points. Not guaranteed ARR, cash or ROI; no double-counting across deals.</p></div>
 <button type="button" onClick={()=>setReview(true)} className="mt-4 rounded-lg bg-accent px-4 py-3 text-sm font-semibold text-accent-foreground">Review request</button>
 {review&&<div role="status" className="mt-3 rounded-lg border border-border bg-card p-4 text-sm"><strong>{ready?"Ready for human triage—not a roadmap promise":"Needs stronger evidence"}</strong><p className="mt-2">{ready?"Now validate sources and assumptions; Product can explore, defer, recommend a workaround or decline.":"Fill in the problem, source reference and timestamp, evidence/date, reach/frequency and outcome; confirm the fictional-data boundary before Product can evaluate it."}</p></div>}
 </section>;
}