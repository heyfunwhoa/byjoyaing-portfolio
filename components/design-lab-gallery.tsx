"use client";

import { ProjectBento } from "@/components/project-bento";
import { ProjectFilter } from "@/components/project-filter";
import {
  filterLabProjects,
  labFilters,
  parseLabFilter,
  type LabFilter,
} from "@/lib/design-lab";
import { labProjects } from "@/lib/design-lab-catalog";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";

export function DesignLabGallery() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const value = parseLabFilter(params.get("collection"));
  const projects = useMemo(() => labProjects(), []);
  const visible = filterLabProjects(projects, value);
  const counts = useMemo(() => {
    return Object.fromEntries(
      labFilters.map((filter) => [filter.id, filterLabProjects(projects, filter.id).length]),
    ) as Record<LabFilter, number>;
  }, [projects]);

  function onChange(next: LabFilter) {
    const query = next === "all" ? "" : `?collection=${next}`;
    router.replace(`${pathname}${query}`, { scroll: false });
  }

  return (
    <div className="mt-6 flex flex-col gap-6">
      <ProjectFilter value={value} counts={counts} onChange={onChange} />
      <ProjectBento projects={visible} />
    </div>
  );
}
