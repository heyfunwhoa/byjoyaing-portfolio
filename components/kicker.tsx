import type { ReactNode } from "react";

export function Kicker({
  children,
  tick = false,
}: {
  children: ReactNode;
  tick?: boolean;
}) {
  return (
    <div className="flex flex-col gap-3">
      {tick ? (
        <div className="flex h-px items-center" aria-hidden="true">
          <span className="h-px w-3 bg-accent" />
          <span className="h-px flex-1 bg-border" />
        </div>
      ) : null}
      <p className="text-sm font-medium text-muted">{children}</p>
    </div>
  );
}

export function Index({ n }: { n: number }) {
  return (
    <span className="text-sm font-medium text-muted tabular-nums">
      {String(n).padStart(2, "0")}
    </span>
  );
}
