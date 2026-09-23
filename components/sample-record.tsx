import type { SampleRecord } from "@/lib/sales";

export function SampleRecordView({ sample }: { sample: SampleRecord }) {
  return (
    <section className="border border-border bg-card p-5 sm:p-6">
      <h2 className="text-sm font-medium text-accent">{sample.kicker}</h2>
      <p className="mt-2 text-lg font-semibold tracking-tight text-foreground">
        {sample.title}
      </p>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
        {sample.note}
      </p>
      <dl className="mt-5 grid gap-4">
        {sample.rows.map((row) => (
          <div
            key={row.label}
            className="grid gap-1 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-6"
          >
            <dt className="text-sm font-medium text-foreground">{row.label}</dt>
            <dd className="text-sm leading-6 text-muted">{row.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
