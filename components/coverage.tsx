export function Coverage({ value }: { value: string }) {
  if (value === "Not evaluated") {
    return (
      <span className="inline-flex items-center gap-2 text-[11px] font-medium tracking-wide text-muted">
        <span
          className="inline-block h-2.5 w-2.5 shrink-0 bg-border"
          aria-hidden="true"
        />
        Not evaluated
      </span>
    );
  }

  return (
    <span className="text-[11px] font-medium tracking-wide text-accent">
      {value}
    </span>
  );
}
