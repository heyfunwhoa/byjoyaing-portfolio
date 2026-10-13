import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { FollowOneClick } from "./follow-one-click";
import { lessons } from "@/lib/ai-academy";
import { clickMission } from "@/lib/academy/click-mission";

const parent = lessons.find((lesson) => lesson.slug === clickMission.lessonId)!;
const meta = {
  title: "Academy/Follow one click",
  component: FollowOneClick,
  parameters: { layout: "padded", nextjs: { appDirectory: true } },
  args: { lessonTitle: parent.title, prerequisites: [] },
} satisfies Meta<typeof FollowOneClick>;
export default meta;
type Story = StoryObj<typeof meta>;
/** Mission-only preview. Route/prerequisite integration follows merged foundation PR #130. */
export const Pilot: Story = {};
