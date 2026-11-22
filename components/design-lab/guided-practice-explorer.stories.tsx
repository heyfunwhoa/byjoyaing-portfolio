import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { GuidedPracticeExplorer } from "./guided-practice-explorer";

const meta = {
  title: "Design Lab/Guided Practice Explorer",
  component: GuidedPracticeExplorer,
  parameters: { layout: "padded" },
} satisfies Meta<typeof GuidedPracticeExplorer>;

export default meta;
type Story = StoryObj<typeof meta>;
export const FiveExercises: Story = {};
