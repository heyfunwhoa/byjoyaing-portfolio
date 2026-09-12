export function Coverage({ value }: { value: string }) {
  const tone =
    value === "Covered" || value === "Observed"
      ? "text-accent"
      : "text-muted";

  return <span className={`font-mono text-[11px] tracking-wide ${tone}`}>{value}</span>;
}
