import { statusCopy, type ProjectStatus } from "@/lib/portfolio";

const styles: Record<ProjectStatus, string> = {
  prototype: "bg-accent text-accent-foreground",
  "field-system": "border border-accent bg-transparent text-accent",
  designed: "bg-foreground/10 text-foreground",
  next: "border border-dashed border-muted text-[10px] text-muted",
};

export function StatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <span
      className={`inline-flex w-fit items-center rounded-md px-2 py-0.5 text-[11px] font-medium tracking-wide ${styles[status]}`}
    >
      {statusCopy[status]}
    </span>
  );
}
