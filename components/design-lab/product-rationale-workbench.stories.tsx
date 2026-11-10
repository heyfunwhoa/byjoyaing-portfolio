import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProductRationaleWorkbench } from "./product-rationale-workbench";

const meta = {
  title: "Design Lab/Product Rationale",
  component: ProductRationaleWorkbench,
  parameters: { layout: "padded" },
} satisfies Meta<typeof ProductRationaleWorkbench>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Comparison: Story = {};
