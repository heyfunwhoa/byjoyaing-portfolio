import { directoryStatus } from "@/lib/project-directory";
import type { ProjectStatus } from "@/lib/portfolio";

export function ProjectStatusPill({ status }: { status: ProjectStatus }) {
  const copy = directoryStatus(status);
  return (
    <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-background px-2.5 py-1 text-[11px] font-medium text-foreground">
      <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
      {copy.label}
    </span>
  );
}
