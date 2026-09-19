export function Coverage({ value }: { value: string }) {
  if (value === "Not evaluated") {
    return (
      <span className="inline-flex items-center" title="Not evaluated">
        <span className="inline-block h-2.5 w-2.5 bg-border" aria-hidden="true" />
        <span className="sr-only">Not evaluated</span>
      </span>
    );
  }

  return (
    <span className="text-[11px] font-medium tracking-wide text-accent">
      {value}
    </span>
  );
}
