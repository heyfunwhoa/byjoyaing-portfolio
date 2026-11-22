import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AccountWorkflowWorkbench } from "./account-workflow-workbench";

const meta = {
  title: "Design Lab/Account Workflow Workbench",
  component: AccountWorkflowWorkbench,
  parameters: { layout: "padded" },
} satisfies Meta<typeof AccountWorkflowWorkbench>;

export default meta;
type Story = StoryObj<typeof meta>;
export const AccountJourney: Story = {};
