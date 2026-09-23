import { statusCopy, type ProjectStatus } from "@/lib/portfolio";

const styles: Record<ProjectStatus, string> = {
  field: "border border-accent bg-card text-accent",
  prototype: "bg-accent text-accent-foreground",
  designed: "border border-foreground/20 bg-foreground/10 text-foreground",
  exploring:
    "border border-dashed border-foreground/40 bg-transparent text-foreground",
};

export function StatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <span
      className={`inline-flex w-fit items-center rounded-md px-2 py-1 text-xs font-medium tracking-wide ${styles[status]}`}
    >
      {statusCopy[status]}
    </span>
  );
}
