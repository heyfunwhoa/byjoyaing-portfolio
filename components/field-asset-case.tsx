import { PageMain } from "@/components/page-main";
import { SampleRecordView } from "@/components/sample-record";
import { StatusBadge } from "@/components/status-badge";
import { salesProject, sampleFor } from "@/lib/sales";
import Link from "next/link";
import { notFound } from "next/navigation";

export function FieldAssetCase({
  slug,
}: {
  slug: "product-release-intelligence" | "truffle-camp" | "partner-gtm-engine";
}) {
  const project = salesProject(slug);
  if (!project) notFound();
  const sample = sampleFor(slug);

  return (
    <PageMain>
      <section className="border-b border-border py-16">
        <div className="flex flex-wrap items-center gap-3">
          <StatusBadge status={project.status} />
          <p className="text-sm text-muted">{project.phase}</p>
        </div>
        <h1 className="mt-4 max-w-3xl font-display text-4xl leading-[1.08] tracking-tight sm:text-5xl">
          {project.title}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted">{project.sales.salesQuestion}</p>
      </section>

      <section className="grid gap-4 border-b border-border py-12 md:grid-cols-2">
        <article className="rounded-2xl border border-border bg-card p-5">
          <h2 className="text-sm font-medium">What was used in the field</h2>
          <p className="mt-3 text-sm leading-6 text-muted">
            {project.sales.fieldAsset ?? "No separate field asset. This page is the note."}
          </p>
        </article>
        <article className="rounded-2xl border border-dashed border-foreground/30 p-5">
          <h2 className="text-sm font-medium">What is not built</h2>
          <p className="mt-3 text-sm leading-6 text-muted">
            {project.sales.proposedSoftware ?? "No software is proposed beyond this note."}
          </p>
        </article>
      </section>

      <section className="border-b border-border py-12">
        <h2 className="text-lg font-semibold">Where it stands</h2>
        <p className="mt-3 max-w-2xl text-base leading-7 text-muted">{project.sales.maturityDetail}</p>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-muted">{project.sales.workingToday}</p>
        {sample ? (
          <div className="mt-8">
            <SampleRecordView sample={sample} />
          </div>
        ) : null}
      </section>

      <section className="py-12">
        <p className="max-w-2xl text-sm leading-6 text-muted">{project.sales.result.text}</p>
        <p className="mt-8">
          <Link href="/projects" className="link-rule text-sm font-medium text-accent">
            Back to projects
          </Link>
        </p>
      </section>
    </PageMain>
  );
}
