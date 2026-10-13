import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { FollowOneClick } from "./follow-one-click";
import { getClickMissionMetadata } from "@/lib/academy/click-mission-metadata";

const meta = {
  title: "Academy/Follow one click",
  component: FollowOneClick,
  parameters: { layout: "padded", nextjs: { appDirectory: true } },
  args: getClickMissionMetadata(),
} satisfies Meta<typeof FollowOneClick>;
export default meta;
type Story = StoryObj<typeof meta>;
/** Same metadata projection as the public route. */
export const Pilot: Story = {};
