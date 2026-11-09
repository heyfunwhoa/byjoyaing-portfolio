import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectDiscoveryComparison } from "./project-discovery-comparison";

const meta = {
  title: "Design Lab/Project Discovery",
  component: ProjectDiscoveryComparison,
  parameters: { layout: "padded" },
} satisfies Meta<typeof ProjectDiscoveryComparison>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Comparison: Story = {};
