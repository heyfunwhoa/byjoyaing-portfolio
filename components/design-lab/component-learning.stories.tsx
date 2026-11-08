import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ComponentLearning } from "./component-learning";

const meta = {
  title: "Design Lab/Component Learning",
  component: ComponentLearning,
  parameters: { layout: "padded" },
} satisfies Meta<typeof ComponentLearning>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Explorer: Story = {};
