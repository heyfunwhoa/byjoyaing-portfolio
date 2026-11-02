type CaseStudySection = {
  id: string;
  label: string;
};

export function CaseStudyContents({
  sections,
}: {
  sections: CaseStudySection[];
}) {
  return (
    <nav
      aria-label="Case study contents"
      className="my-6 rounded-xl border border-border bg-card p-4 sm:p-5"
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-muted">
        In this case study
      </p>
      <ul className="mt-2 flex flex-wrap gap-x-2 gap-y-1">
        {sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className="inline-flex min-h-11 items-center rounded-md px-3 text-sm font-medium text-accent underline underline-offset-4 hover:bg-surface-sage focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {section.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
