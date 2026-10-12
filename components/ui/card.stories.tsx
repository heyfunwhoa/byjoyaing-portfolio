import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card";
function ExampleCard() {
  return <Card className="w-80"><CardHeader><CardTitle>Account Intelligence</CardTitle><CardDescription>A reviewed, evidence-first workflow</CardDescription></CardHeader><CardContent><p>Research → signal → human approval</p></CardContent></Card>;
}
const meta = { title: "Design System/Card", component: ExampleCard } satisfies Meta<typeof ExampleCard>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
