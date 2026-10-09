export function SystemsGraphic({ compact = false }: { compact?: boolean }) {
  const nodes = [
    { label: "Research", short: "01", x: "8%", y: "25%" },
    { label: "Signals", short: "02", x: "54%", y: "8%" },
    { label: "Decisions", short: "03", x: "62%", y: "63%" },
    { label: "Action", short: "04", x: "12%", y: "74%" },
  ];
  return (
    <div aria-label="Diagram of research, signals, decisions and action connected in a GTM workflow" role="img"
      className={`relative isolate w-full overflow-hidden rounded-lg border border-border bg-card ${compact ? "aspect-[16/10]" : "aspect-square min-h-64"}`}>
      <div className="absolute inset-0 opacity-45" style={{backgroundImage:"linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)",backgroundSize:"36px 36px",maskImage:"radial-gradient(ellipse at center,black,transparent 80%)"}}/>
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 320" preserveAspectRatio="none" aria-hidden="true">
        <path d="M 70 97 C 145 40, 205 55, 236 48 S 346 105, 278 210 S 120 280, 70 254 S 14 165,70 97" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="4 7" opacity=".8"/>
        <path d="M 70 97 L 278 210 M 236 48 L 70 254" stroke="var(--border)" strokeWidth="1"/>
      </svg>
      <div className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-accent bg-background shadow-sm">
        <span className="font-display text-center text-sm leading-tight text-foreground">GTM<br/>systems</span>
      </div>
      {nodes.map(node => <div key={node.short} className="absolute flex items-center gap-2 rounded-md border border-border bg-background/95 px-2 py-2 shadow-sm sm:px-3" style={{left:node.x,top:node.y}}>
        <span className="font-mono text-[10px] text-accent">{node.short}</span>
        <span className="text-xs font-medium text-foreground">{node.label}</span>
      </div>)}
      <span className="absolute bottom-3 right-3 font-mono text-[10px] uppercase tracking-widest text-muted">From evidence to execution</span>
    </div>
  );
}
