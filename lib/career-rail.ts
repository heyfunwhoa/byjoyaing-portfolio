import { roles } from "./portfolio.ts";

type RoleSource = { company: string; title: string; period: string };

export type CareerRailNode = {
  company: string;
  title: string;
  startYear: string;
  endLabel: string;
};

/** Oldest role first, so the current role ends the line. Facts come only from `roles`. */
export function careerRailNodes(source: readonly RoleSource[] = roles): CareerRailNode[] {
  return [...source].reverse().map((role) => {
    const [start = "", end = ""] = role.period.split("–").map((part) => part.trim());
    return {
      company: role.company,
      title: role.title,
      startYear: start.split(" ").at(-1) ?? "",
      endLabel: end === "Present" ? "Present" : (end.split(" ").at(-1) ?? ""),
    };
  });
}
