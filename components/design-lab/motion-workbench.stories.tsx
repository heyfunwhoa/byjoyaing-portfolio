import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { MotionWorkbench } from "./motion-workbench";

const meta = {
  title: "Design Lab/Motion Workbench",
  component: MotionWorkbench,
  parameters: { layout: "padded" },
} satisfies Meta<typeof MotionWorkbench>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Transitions: Story = {};
export const Components: Story = { args: { initialView: "components" } };
