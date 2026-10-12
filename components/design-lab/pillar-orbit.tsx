import Link from "next/link";
import type { OrbitNode } from "@/lib/design-lab-compositions";

const C = 120;
const R = 92;
const positions = [-90, 150, 30].map((degrees) => {
  const radians = (degrees * Math.PI) / 180;
  return { x: C + R * Math.cos(radians), y: C + R * Math.sin(radians) };
});

export function PillarOrbit({ center, pillars }: { center: OrbitNode; pillars: readonly OrbitNode[] }) {
  return (
    <div className="mt-6 grid items-center gap-8 sm:grid-cols-[minmax(0,1fr)_15rem]">
      <div className="min-w-0">
        <ol className="flex flex-col gap-3">
          {[center, ...pillars].map((node, index) => (
            <li key={node.label} className={index === 0 ? "" : "sm:ml-6"}>
              <Link
                href={node.href}
                className="block rounded-lg border border-border bg-card px-4 py-3 hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                <span className={`font-semibold text-accent ${index === 0 ? "text-base" : "text-sm"}`}>
                  {node.label} →
                </span>
                <span className="mt-1 block text-sm leading-6 text-muted">{node.sentence}</span>
              </Link>
            </li>
          ))}
        </ol>
        <p className="mt-4 text-sm leading-6 text-muted">
          Independent builds live in{" "}
          <Link href="/side-quests" className="font-semibold text-accent underline underline-offset-4">
            Side Quests
          </Link>
          , not on this orbit.
        </p>
      </div>
      <svg viewBox="0 0 240 240" aria-hidden="true" focusable="false" className="hidden w-full sm:block">
        <circle cx={C} cy={C} r={R} fill="none" stroke="#CFC3B3" strokeWidth="1" />
        {positions.map((point, index) => (
          <line key={index} x1={C} y1={C} x2={point.x} y2={point.y} stroke="#CFC3B3" strokeWidth="1" />
        ))}
        <circle cx={C} cy={C} r="38" fill="#1B211D" />
        <text x={C} y={C - 3} textAnchor="middle" fill="#F3EFE6" fontSize="11" fontWeight="600">
          Enterprise
        </text>
        <text x={C} y={C + 11} textAnchor="middle" fill="#F3EFE6" fontSize="11" fontWeight="600">
          selling
        </text>
        {pillars.map((node, index) => {
          const point = positions[index];
          const below = point.y > C;
          return (
            <g key={node.label}>
              <circle cx={point.x} cy={point.y} r="6" fill="#FBF8F2" stroke="#8A4B2A" strokeWidth="1.5" />
              <text
                x={point.x}
                y={below ? point.y + 20 : point.y - 12}
                textAnchor="middle"
                fill="#1B211D"
                fontSize="11"
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
