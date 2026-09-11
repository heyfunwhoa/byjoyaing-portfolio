import { ResumeRequestForm } from "./resume-request-form";

const domains = [
  "Application",
  "Cloud",
  "Data",
  "Threat intelligence",
  "Network",
  "Developer security / secrets",
  "Machine identity",
];

const proof = [
  {
    value: "10+ years",
    label: "Enterprise cybersecurity GTM from Forcepoint through Truffle Security",
  },
  {
    value: "50% faster ramp",
    label: "Industry training and business-value tools adopted by new reps",
  },
  {
    value: "$1.4M quota",
    label: "Q2 2026 on track at 125% for developer-first secrets detection",
  },
];

const roles = [
  {
    company: "Truffle Security",
    title: "Senior Enterprise Account Executive",
    period: "Dec 2024 – Present",
    category: "Developer security, secrets, machine identity",
    points: [
      "Own a $1.4M quota across developer-first secrets detection and AppSec accounts — security, engineering, DevSecOps, and cloud in the same cycle.",
      "Created discovery frameworks, ICP profiles, outbound plays, and competitive messaging adopted across the sales org.",
      "Led a sales–product feedback loop and built a self-serve onboarding resource for product, process, and technical fundamentals.",
    ],
  },
  {
    company: "Darktrace",
    title: "Senior Enterprise Account Executive",
    period: "Dec 2023 – May 2024",
    category: "Threat intelligence and network / AI security",
    points: [
      "Greenfield territory: net-new pipeline and regional growth. Ranked top 2 of 9 for pipeline growth and activity.",
      "Created industry-knowledge training and business-value tools that cut new-rep ramp time by 50%.",
    ],
  },
  {
    company: "Rapid7",
    title: "Enterprise Account Executive, Strategic",
    period: "Oct 2021 – Aug 2023",
    category: "Threat intelligence, cloud, and application security",
    points: [
      "Full-cycle net-new and growth in 1,500-employee to F100 accounts. Closed the team’s largest threat-intelligence deal in 2022 (97% of $1M quota).",
      "Wrote threat-intelligence playbooks for the broader portfolio team and served as the TI resource across 500+ accounts, partners, and customers.",
    ],
  },
  {
    company: "Forcepoint",
    title: "Senior Account Executive, Lead",
    period: "Sep 2018 – Oct 2021",
    category: "Web security and data protection",
    points: [
      "Mid-Atlantic and Southeast enterprise (1,500+ employees), new logo and expansion. 108% of $1.3M in 2020; top 2 of 10 in the region.",
      "Co-created discovery templates and sales presentations used by the team. Closed the team’s largest web-security deal in 2021.",
    ],
  },
  {
    company: "Metadot",
    title: "Global Channel Account Manager",
    period: "Sep 2016 – Sep 2018",
    category: "Channel, partners, and new-category GTM",
    points: [
      "Helped stand up a channel program and grow distribution sales 25% to $3.4M (2017) and 33% to $4.5M (2018).",
    ],
  },
  {
    company: "Quantcast",
    title: "Corporate Account Executive",
    period: "Dec 2015 – Jul 2016",
    category: "New-market GTM",
    points: [
      "One of the first Austin sales hires. Co-created a GTM playbook for agency targeting and repeatable outreach.",
    ],
  },
  {
    company: "Websense",
    title: "Regional Account Manager",
    period: "May 2014 – Dec 2015",
    category: "Web, email, and data security",
    points: [
      "Northeast accounts up to 2,000 employees. Built cybersecurity ramp resources for new team members and contributed to ~30% YoY net-new growth.",
    ],
  },
];

const motion = [
  "Customer insight",
  "GTM strategy",
  "Enablement",
  "Product feedback",
  "Revenue execution",
];

const systems = [
  "Onboarding and enablement",
  "Discovery and POC frameworks",
  "Competitive intelligence",
  "Product feedback loops",
  "Sales, SA, CS, and Product workflows",
  "Developer-security workflows",
];

const detectors = [
  {
    name: "TruffleHog",
    aws: "Covered",
    github: "Covered",
    slack: "Partial",
  },
  {
    name: "Gitleaks",
    aws: "Covered",
    github: "Covered",
    slack: "Gap",
  },
  {
    name: "GitGuardian",
    aws: "Covered",
    github: "Covered",
    slack: "Covered",
  },
];

function Coverage({ value }: { value: string }) {
  const tone =
    value === "Covered"
      ? "text-foreground"
      : value === "Partial"
        ? "text-neutral-600"
        : "text-muted";

  return <span className={`font-mono text-[11px] tracking-wide ${tone}`}>{value}</span>;
}

export default function Home() {
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <header className="border-b border-border">
        <nav
          className="mx-auto flex w-full max-w-5xl items-center justify-between gap-6 px-5 py-5 sm:px-8"
          aria-label="Primary"
        >
          <a href="#top" className="text-sm font-semibold tracking-tight text-foreground">
            Kristen Joy Aing
          </a>
          <ul className="flex flex-wrap items-center justify-end gap-x-6 gap-y-2 text-sm text-muted">
            <li>
              <a className="transition-colors hover:text-foreground" href="#about">
                About
              </a>
            </li>
            <li>
              <a className="transition-colors hover:text-foreground" href="#experience">
                Experience
              </a>
            </li>
            <li>
              <a className="transition-colors hover:text-foreground" href="#projects">
                Work
              </a>
            </li>
            <li>
              <a className="transition-colors hover:text-foreground" href="#contact">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <main id="top" className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-5 sm:px-8">
        <section className="flex flex-col gap-6 border-b border-border py-16 sm:py-20">
          <p className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">
            Cybersecurity GTM & Product Strategy
          </p>
          <h1 className="max-w-3xl text-4xl leading-[1.15] font-semibold tracking-tight text-balance text-foreground sm:text-5xl">
            I build the systems that help security teams move faster.
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-muted">
            I turn complex cybersecurity products into GTM systems that sales,
            security, and developer teams can actually use — repeatable
            enterprise motions, enablement, and developer-focused workflows.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href="#projects"
              className="inline-flex h-11 items-center justify-center rounded-md bg-foreground px-5 text-sm font-medium text-background transition-opacity hover:opacity-80"
            >
              View work
            </a>
            <a
              href="#resume"
              className="inline-flex h-11 items-center justify-center rounded-md border border-border bg-card px-5 text-sm font-medium text-foreground transition-colors hover:bg-neutral-100"
            >
              Request resume
            </a>
          </div>
        </section>

        <section className="grid gap-6 border-b border-border py-12 sm:grid-cols-3">
          {proof.map((item) => (
            <div key={item.value}>
              <p className="text-2xl font-semibold tracking-tight text-foreground">
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

        <section id="about" className="flex flex-col gap-6 border-b border-border py-16">
          <p className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">
            About
          </p>
          <h2 className="max-w-2xl text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Enterprise cybersecurity GTM, built as operating systems.
          </h2>
          <div className="max-w-2xl space-y-4 leading-7 text-muted">
            <p>
              I am an enterprise cybersecurity seller, team lead, and GTM
              builder with 10+ years from established platforms to Series A–B
              growth — Forcepoint, Rapid7, Darktrace, and Truffle Security.
              Based in Philadelphia.
            </p>
            <p>
              I run complex cycles across application, cloud, data, threat
              intelligence, network, and developer security, aligning security,
              engineering, DevSecOps, and executives. The work is player-coach:
              discovery, ICPs, competitive messaging, onboarding, POCs, and
              product-feedback loops that other people can run.
            </p>
            <p>
              That includes translating secrets exposure, CI/CD risk, machine
              identity, and threat intelligence into executive value — and
              enablement that cut new-rep ramp time by 50%. The Detector
              Coverage Atlas is the public technical proof. Learning Next.js
              supports that story. It is not the headline.
            </p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {systems.map((item) => (
              <li
                key={item}
                className="rounded-md border border-border bg-card px-4 py-3 text-sm text-foreground"
              >
                {item}
              </li>
            ))}
          </ul>
          <ol className="flex flex-col gap-2 rounded-lg border border-border bg-card p-5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
            {motion.map((step, index) => (
              <li
                key={step}
                className="flex items-center gap-3 font-mono text-[11px] tracking-[0.12em] text-muted uppercase"
              >
                {index > 0 ? (
                  <span className="hidden text-muted sm:inline" aria-hidden="true">
                    →
                  </span>
                ) : null}
                <span className="text-foreground">{step}</span>
              </li>
            ))}
          </ol>
        </section>

        <section id="experience" className="flex flex-col gap-8 border-b border-border py-16">
          <p className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">
            Experience
          </p>
          <h2 className="sr-only">Experience</h2>
          <ol className="flex flex-col gap-8">
            {roles.map((role) => (
              <li
                key={role.company}
                className="grid gap-3 border-b border-border pb-8 last:border-b-0 last:pb-0 sm:grid-cols-[10rem_1fr]"
              >
                <p className="font-mono text-[11px] tracking-[0.14em] text-muted uppercase">
                  {role.period}
                </p>
                <div>
                  <h3 className="text-lg font-semibold tracking-tight text-foreground">
                    {role.title}
                  </h3>
                  <p className="mt-1 text-sm text-foreground">{role.company}</p>
                  <p className="mt-1 font-mono text-[11px] tracking-[0.12em] text-muted uppercase">
                    {role.category}
                  </p>
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-muted">
                    {role.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="border-b border-border py-14">
          <p className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">
            Education & credentials
          </p>
          <ul className="mt-6 space-y-3 text-sm leading-6 text-muted">
            <li>
              <span className="font-medium text-foreground">MBA, IT Management</span>
              {" — "}
              Western Governors University (in progress)
            </li>
            <li>
              <span className="font-medium text-foreground">B.S. Advertising, Business Foundations</span>
              {" — "}
              The University of Texas at Austin
            </li>
            <li>
              <span className="font-medium text-foreground">AWS</span>
              {" — "}
              Cloud Practitioner and AI Practitioner (Foundational)
            </li>
          </ul>
        </section>

        <section id="projects" className="flex flex-col gap-8 border-b border-border py-16">
          <p className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">
            Selected work
          </p>
          <h2 className="sr-only">Selected work</h2>

          <article
            id="atlas"
            className="grid gap-8 rounded-lg border border-border bg-card p-6 sm:p-8 lg:grid-cols-[1.1fr_0.9fr]"
          >
            <div className="flex flex-col gap-5">
              <div className="flex flex-wrap gap-2">
                {["Developer security", "Secret scanning", "TypeScript / Next.js"].map(
                  (label) => (
                    <span
                      key={label}
                      className="rounded-md border border-border px-2.5 py-1 font-mono text-[10px] tracking-[0.14em] text-muted uppercase"
                    >
                      {label}
                    </span>
                  ),
                )}
              </div>
              <h3 className="text-2xl font-semibold tracking-tight text-foreground">
                Detector Coverage Atlas
              </h3>
              <dl className="space-y-3 text-sm leading-6 text-muted">
                <div>
                  <dt className="font-medium text-foreground">Problem</dt>
                  <dd className="mt-1">
                    Secret-scanning coverage is marketed as a feature list.
                    Teams cannot see where detectors overlap, where they gap, or
                    what that means for product and GTM.
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-foreground">Approach</dt>
                  <dd className="mt-1">
                    Research detectors across credential types, structure the
                    comparison, and make gaps visible enough to drive a
                    decision — not a slide.
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-foreground">Result</dt>
                  <dd className="mt-1">
                    A working atlas that proves I can investigate a technical
                    category and turn it into something Sales, Product, and
                    security teams can use.
                  </dd>
                </div>
              </dl>
            </div>

            <div className="overflow-hidden rounded-md border border-border">
              <table className="w-full text-left text-sm">
                <caption className="sr-only">
                  Sample detector coverage comparison
                </caption>
                <thead className="bg-neutral-50 font-mono text-[10px] tracking-[0.14em] text-muted uppercase">
                  <tr>
                    <th className="px-3 py-2.5 font-medium">Detector</th>
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

          <article
            id="ramp"
            className="rounded-lg border border-border bg-card p-6 sm:p-8"
          >
            <p className="font-mono text-[10px] tracking-[0.14em] text-muted uppercase">
              Enablement · CRM · Feedback
            </p>
            <h3 className="mt-3 text-xl font-semibold tracking-tight text-foreground">
              Security GTM Ramp & Signal
            </h3>
            <dl className="mt-5 grid gap-5 text-sm leading-6 text-muted sm:grid-cols-3">
              <div>
                <dt className="font-medium text-foreground">Problem</dt>
                <dd className="mt-1">
                  New reps inherited a complex security category without shared
                  industry training, business-value language, or a self-serve
                  ramp path.
                </dd>
              </div>
              <div>
                <dt className="font-medium text-foreground">Approach</dt>
                <dd className="mt-1">
                  At Darktrace, built industry-knowledge training and
                  business-value tools. At Truffle, added discovery, ICPs,
                  competitive messaging, a sales–product feedback loop, and a
                  self-serve onboarding resource.
                </dd>
              </div>
              <div>
                <dt className="font-medium text-foreground">Result</dt>
                <dd className="mt-1">
                  New-rep ramp time down 50%. Messaging and qualification
                  frameworks adopted across the sales organization.
                </dd>
              </div>
            </dl>
          </article>

          <article className="rounded-lg border border-border bg-card p-6 sm:p-8">
            <p className="font-mono text-[10px] tracking-[0.14em] text-muted uppercase">
              Market education · Sales strategy
            </p>
            <h3 className="mt-3 text-xl font-semibold tracking-tight text-foreground">
              Competitive Intelligence System
            </h3>
            <dl className="mt-5 grid gap-5 text-sm leading-6 text-muted sm:grid-cols-3">
              <div>
                <dt className="font-medium text-foreground">Problem</dt>
                <dd className="mt-1">
                  Competitive noise showed up differently in every deal.
                  Objection handling lived in Slack instead of a system.
                </dd>
              </div>
              <div>
                <dt className="font-medium text-foreground">Approach</dt>
                <dd className="mt-1">
                  Repeatable briefs and battlecards: what the category is, where
                  we win, where we do not, and how to teach it in the room.
                </dd>
              </div>
              <div>
                <dt className="font-medium text-foreground">Result</dt>
                <dd className="mt-1">
                  A field-ready competitive motion for enterprise teams — not a
                  one-off deck.
                </dd>
              </div>
            </dl>
          </article>
        </section>

        <section id="contact" className="flex flex-col gap-4 py-16">
          <p className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">
            Contact
          </p>
          <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-foreground">
            Let’s talk about security, developer tooling, and GTM strategy.
          </h2>
          <p className="max-w-xl leading-7 text-muted">
            Email is the fastest way to reach me. LinkedIn is best for GTM
            conversations. Use the form if you want the resume sent directly —
            you’ll get a confirmation email, and I’ll get the request.
          </p>
          <ul className="flex flex-col gap-3 text-sm">
            <li>
              <a
                className="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors hover:decoration-foreground"
                href="mailto:kristen.aing@gmail.com"
              >
                kristen.aing@gmail.com
              </a>
            </li>
            <li>
              <a
                className="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors hover:decoration-foreground"
                href="https://www.linkedin.com/in/kristenaing"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                className="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors hover:decoration-foreground"
                href="https://github.com/heyfunwhoa"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
            </li>
          </ul>
          <ResumeRequestForm />
        </section>
      </main>
    </div>
  );
}
