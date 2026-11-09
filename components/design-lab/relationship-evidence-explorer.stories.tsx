import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { RelationshipEvidenceExplorer } from "./relationship-evidence-explorer";

const meta = {
  title: "Design Lab/Relationship and Evidence Explorer",
  component: RelationshipEvidenceExplorer,
  parameters: { layout: "padded" },
} satisfies Meta<typeof RelationshipEvidenceExplorer>;

export default meta;
type Story = StoryObj<typeof meta>;
export const SyntheticEvidence: Story = {};
