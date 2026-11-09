import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CaseStudyEvidenceComparison } from "./case-study-evidence-comparison";

const meta = {
  title: "Design Lab/Case Study Evidence",
  component: CaseStudyEvidenceComparison,
  parameters: { layout: "padded" },
} satisfies Meta<typeof CaseStudyEvidenceComparison>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Comparison: Story = {};
