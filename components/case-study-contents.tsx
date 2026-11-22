import { OnThisPage } from "@/components/on-this-page";

type CaseStudySection = {
  id: string;
  label: string;
};

/** Case-study contents use the shared sticky section menu (KRU-311). */
export function CaseStudyContents({
  sections,
}: {
  sections: CaseStudySection[];
}) {
  return (
    <OnThisPage items={sections} label="Case study contents" heading="In this case study" className="my-6" />
  );
}
