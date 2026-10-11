import Image from "next/image";
import { technologies, type TechnologyId } from "@/lib/portfolio/technology-registry";

type Props = {
  ids: readonly TechnologyId[];
  className?: string;
  showLabels?: boolean;
};

export function TechnologyStack({ ids, className = "", showLabels = true }: Props) {
  return (
    <ul aria-label="Technologies used" className={`flex flex-wrap items-center gap-3 ${className}`}>
      {ids.map((id) => {
        const technology = technologies[id];
        return (
          <li key={id} className="inline-flex items-center gap-2 text-sm">
            <span className="inline-flex size-8 items-center justify-center rounded-md border border-current/10 bg-white p-1.5">
              <Image src={technology.logo} alt="" width={24} height={24} className="size-full object-contain" />
            </span>
            {showLabels ? <span>{technology.name}</span> : <span className="sr-only">{technology.name}</span>}
          </li>
        );
      })}
    </ul>
  );
}
