import { Coverage } from "@/components/coverage";
import { PageMain } from "@/components/page-main";
import { detectors, domains, proof } from "@/lib/portfolio";
import Link from "next/link";

export default function Home() {
  return (
    <PageMain>
      <section className="flex flex-col gap-6 border-b border-border py-16 sm:py-20">
        <p className="font-mono text-[11px] tracking-[0.2em] text-accent uppercase">
          Technical GTM & Product
        </p>
        <h1 className="font-display max-w-3xl text-4xl leading-[1.12] tracking-tight text-balance text-foreground sm:text-6xl">
          I build systems that help technical products reach the market.
        </h1>
        <p className="max-w-2xl text-lg leading-8 text-muted">
          I work at the intersection of technical products, enterprise
          customers, and go-to-market. I turn recurring customer and field
          problems into product workflows, GTM systems, and prototypes
          designed to improve launches, adoption, decision-making, and
          revenue outcomes.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/projects"
            className="inline-flex h-11 items-center justify-center rounded-md bg-accent px-5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
          >
            View Projects
          </Link>
          <Link
            href="/about"
            className="inline-flex h-11 items-center justify-center rounded-md border border-border bg-card px-5 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            About
          </Link>
        </div>
      </section>

      <section className="grid gap-4 border-b border-border py-12 sm:grid-cols-3">
        {proof.map((item) => (
          <div
            key={item.value}
            className="rounded-lg border border-border bg-card p-5"
          >
            <p className="font-display text-3xl tracking-tight text-foreground">
              {item.value}
            </p>
            <p className="mt-2 text-sm leading-6 text-muted">{item.label}</p>
          </div>
        ))}
      </section>

      <section className="border-b border-border py-12">
        <p className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">
          Categories
        </p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {domains.map((domain) => (
            <li
              key={domain}
              className="rounded-md border border-border bg-card px-3 py-1.5 text-sm text-foreground"
            >
              {domain}
            </li>
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-6 py-16">
        <p className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">
          Featured project
        </p>
        <article className="grid gap-8 rounded-lg border border-border bg-card p-6 sm:p-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="flex flex-col gap-5">
            <div className="flex flex-wrap gap-2">
              {["Build", "Prototype", "Developer security"].map((label) => (
                <span
                  key={label}
                  className="rounded-md border border-border px-2.5 py-1 font-mono text-[10px] tracking-[0.14em] text-muted uppercase"
                >
                  {label}
                </span>
              ))}
            </div>
            <h2 className="font-display text-3xl tracking-tight text-foreground">
              Detector Coverage Atlas
            </h2>
            <p className="text-sm leading-6 text-muted">
              Independent research catalog — not an official Truffle product.
              Parser observed 910 TruffleHog detectors; 14 are enriched. Gray
              means not evaluated, never a confirmed gap.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/work/detector-coverage-atlas"
                className="text-sm font-medium text-foreground underline decoration-border underline-offset-4 hover:text-accent hover:decoration-accent"
              >
                Full case study
              </Link>
              <Link
                href="/projects"
                className="text-sm font-medium text-foreground underline decoration-border underline-offset-4 hover:text-accent hover:decoration-accent"
              >
                All projects
              </Link>
            </div>
          </div>

          <div className="overflow-hidden rounded-md border border-border">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">
                Sample comparison. Not evaluated means the public source has not
                been reviewed yet.
              </caption>
              <thead className="bg-background font-mono text-[10px] tracking-[0.14em] text-muted uppercase">
                <tr>
                  <th className="px-3 py-2.5 font-medium">Source</th>
                  <th className="px-3 py-2.5 font-medium">AWS keys</th>
                  <th className="px-3 py-2.5 font-medium">GitHub PATs</th>
                  <th className="hidden px-3 py-2.5 font-medium sm:table-cell">
                    Slack
                  </th>
                </tr>
              </thead>
              <tbody>
                {detectors.map((row) => (
                  <tr key={row.name} className="border-t border-border">
                    <td className="px-3 py-2.5 text-foreground">{row.name}</td>
                    <td className="px-3 py-2.5">
                      <Coverage value={row.aws} />
                    </td>
                    <td className="px-3 py-2.5">
                      <Coverage value={row.github} />
                    </td>
                    <td className="hidden px-3 py-2.5 sm:table-cell">
                      <Coverage value={row.slack} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>
      </section>
    </PageMain>
  );
}
