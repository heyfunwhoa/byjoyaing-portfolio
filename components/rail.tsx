import { Kicker } from "@/components/kicker";
import type { ReactNode } from "react";

export function Rail({
  label,
  tick = false,
  children,
  className = "border-b border-border",
  id,
}: {
  label: string;
  tick?: boolean;
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={`grid gap-6 py-12 md:grid-cols-[9.5rem_minmax(0,1fr)] md:items-start md:gap-12 ${id ? "scroll-mt-24" : ""} ${className}`}
    >
      <Kicker tick={tick}>{label}</Kicker>
      <div>{children}</div>
    </section>
  );
}
