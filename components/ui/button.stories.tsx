import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "./button";
const meta = { title: "Design System/Button", component: Button, args: { children: "Explore the work" } } satisfies Meta<typeof Button>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Primary: Story = { args: { variant: "default" } };
export const Outline: Story = { args: { variant: "outline" } };
export const Disabled: Story = { args: { disabled: true } };
