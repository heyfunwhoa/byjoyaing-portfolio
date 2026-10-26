import { roles } from "./portfolio.ts";

type RoleSource = { company: string; title: string };

export type CareerRailNode = {
  company: string;
  title: string;
};

/** Oldest role first. Employer and title remain visible without role dates. */
export function careerRailNodes(source: readonly RoleSource[] = roles): CareerRailNode[] {
  return [...source].reverse().map(({ company, title }) => ({ company, title }));
}
