import type { ReactNode } from "react";

type Surface = "paper" | "sage" | "mist" | "clay" | "dark";
const backgrounds: Record<Surface, string> = {
  paper: "bg-card text-foreground",
  sage: "bg-surface-sage text-foreground",
  mist: "bg-surface-mist text-foreground",
  clay: "bg-surface-clay text-foreground",
  dark: "editorial-dark",
};

export function EditorialSection({ chapter, eyebrow, title, intro, surface = "paper", children, id }: {
  chapter: string;
  eyebrow: string;
  title: string;
  intro: string;
  surface?: Surface;
  children?: ReactNode;
  id?: string;
}) {
  return (
    <section id={id} aria-label={eyebrow} className={`editorial-panel my-4 min-w-0 overflow-hidden px-5 py-8 sm:px-9 sm:py-12 ${backgrounds[surface]}`}>
      <p className="editorial-eyebrow opacity-80">{chapter} / {eyebrow}</p>
      <h2 className="editorial-section-title mt-4 max-w-[18ch]">{title}</h2>
      <p className="editorial-intro mt-4 opacity-85">{intro}</p>
      {children ? <div className="mt-7">{children}</div> : null}
    </section>
  );
}
