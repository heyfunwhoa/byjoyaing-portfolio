import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DataDisplayComparison } from "./data-display-comparison";

const meta = {
  title: "Design Lab/Data Display",
  component: DataDisplayComparison,
  parameters: { layout: "padded" },
} satisfies Meta<typeof DataDisplayComparison>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Comparison: Story = {};
