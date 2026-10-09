import type { Project } from "@/lib/portfolio";
const variants: Record<string,{label:string;tokens:string[]}> = {
 "detector-coverage-atlas": {label:"COVERAGE / EVIDENCE",tokens:["SOURCE","DETECT","VERIFY"]},
 "account-signal-engine": {label:"ACCOUNT / SIGNALS",tokens:["CAPTURE","SCORE","ROUTE"]},
 "security-market-map": {label:"MARKET / INTELLIGENCE",tokens:["CATEGORY","VENDOR","POSITION"]},
 "competitive-intelligence-engine": {label:"COMPETITIVE / EVIDENCE",tokens:["RESEARCH","COMPARE","BRIEF"]},
 "customer-feedback-intelligence": {label:"FEEDBACK / PRIORITY",tokens:["LISTEN","CLUSTER","ACT"]},
};
export function ProjectCover({project}:{project:Project}){
 const config=variants[project.slug] ?? {label:project.phase.toUpperCase()+" / SYSTEM",tokens:["DISCOVER","DESIGN","DELIVER"]};
 return <div aria-hidden="true" className="relative aspect-[16/10] overflow-hidden rounded-md border border-border bg-card p-3 transition-colors group-hover:border-accent">
   <div className="absolute inset-0 opacity-40" style={{backgroundImage:"linear-gradient(135deg,transparent 48%,var(--border) 49%,var(--border) 50%,transparent 51%)",backgroundSize:"22px 22px"}}/>
   <div className="relative flex h-full flex-col justify-between">
    <span className="font-mono text-[9px] tracking-wider text-accent">{config.label}</span>
    <div className="flex items-center justify-center gap-1">
      {config.tokens.map((word,i)=><div key={word} className="flex items-center gap-1">
       <span className="rounded border border-border bg-background px-1.5 py-2 font-mono text-[8px] text-foreground">{word}</span>
       {i<config.tokens.length-1?<span className="text-xs text-accent">→</span>:null}
      </div>)}
    </div>
    <span className="text-right font-mono text-[9px] text-muted">{project.status.replace("-"," ").toUpperCase()}</span>
   </div>
 </div>;
}
