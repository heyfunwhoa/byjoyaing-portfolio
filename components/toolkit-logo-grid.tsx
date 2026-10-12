import Image from "next/image";
import { officialToolWebsites } from "@/lib/portfolio/external-links";
import { techStanceCopy, type TechStance } from "@/lib/portfolio";
import { gtmSystemsToolkit } from "@/lib/portfolio/toolkit-registry";

const stanceClass: Record<TechStance, string> = {
  built: "text-accent",
  professional: "text-muted",
  learning: "text-muted",
};

export function ToolkitLogoGrid() {
  return (
    <ul className="grid grid-cols-3 gap-3 sm:grid-cols-5">
      {gtmSystemsToolkit.map((item) => {
        const href = officialToolWebsites[item.id];
        return (
          <li key={item.id} className="min-w-0">
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${item.name} website (opens in a new tab)`}
              title={`${item.name} — ${techStanceCopy[item.stance]}`}
              className="group/toolkit relative flex min-h-11 flex-col items-center rounded-lg p-2 text-foreground transition-colors duration-200 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span className="inline-flex size-16 items-center justify-center rounded-md border border-border bg-white p-2.5 transition-colors duration-200 group-hover/toolkit:border-accent group-focus-visible/toolkit:border-accent">
                <Image
                  src={item.logo}
                  alt=""
                  width={40}
                  height={40}
                  unoptimized
                  className="size-full object-contain"
                />
              </span>
              <span className="mt-2 text-center text-xs leading-4 text-foreground opacity-100 transition-opacity duration-200 sm:pointer-events-none sm:absolute sm:top-full sm:z-10 sm:mt-1 sm:w-max sm:max-w-[10rem] sm:rounded-md sm:border sm:border-border sm:bg-card sm:px-2 sm:py-1 sm:opacity-0 sm:shadow-sm sm:group-hover/toolkit:opacity-100 sm:group-focus-visible/toolkit:opacity-100">
                <span className="block font-medium">{item.name}</span>
                <span className={`block ${stanceClass[item.stance]}`}>
                  {techStanceCopy[item.stance]}
                </span>
              </span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
