import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DailySecretsStory } from "./dailysecrets-story";

const meta = {
  title: "Design Lab/DailySecrets story",
  component: DailySecretsStory,
  parameters: { layout: "padded", controls: { disable: true } },
  decorators: [
    (Story) => (
      <div className="mx-auto max-w-2xl">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DailySecretsStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Stacked: Story = { args: { format: "stacked" } };
export const Carousel: Story = { args: { format: "carousel" } };
