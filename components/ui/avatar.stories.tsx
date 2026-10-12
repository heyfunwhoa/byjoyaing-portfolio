import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
function AvatarPreview({ image = false, size = "lg" }: { image?: boolean; size?: "sm"|"default"|"lg" }) {
  return <Avatar size={size}><AvatarImage src={image ? "/avatar.png" : undefined} alt={image ? "Brand illustration" : ""}/><AvatarFallback>KA</AvatarFallback></Avatar>;
}
const meta = { title: "Design System/Avatar", component: AvatarPreview } satisfies Meta<typeof AvatarPreview>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Initials: Story = { args: { image: false, size: "lg" } };
export const BrandIllustration: Story = { args: { image: true, size: "lg" } };
export const Small: Story = { args: { image: false, size: "sm" } };
