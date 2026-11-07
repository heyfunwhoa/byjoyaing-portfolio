import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  EvidenceReviewPattern,
  EvidenceReviewWorkbench,
} from "./evidence-review-pattern";
import { evidenceReviewScenarios } from "@/lib/design-lab/evidence-review";

const meta = {
  title: "Design Lab/Evidence Review",
  component: EvidenceReviewWorkbench,
  parameters: { layout: "padded" },
} satisfies Meta<typeof EvidenceReviewWorkbench>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CompareReviewStates: Story = {};
export const MissingEvidence: Story = {
  render: () => <EvidenceReviewPattern record={evidenceReviewScenarios.missing} />,
};
