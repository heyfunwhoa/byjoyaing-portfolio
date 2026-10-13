import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ComponentOptions } from "./component-options";
const meta = {
  title: "Design Lab/Component Options",
  component: ComponentOptions,
  parameters: { layout: "padded" },
} satisfies Meta<typeof ComponentOptions>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Library: Story = {};
