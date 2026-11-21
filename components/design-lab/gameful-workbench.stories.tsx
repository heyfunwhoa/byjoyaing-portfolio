import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { GamefulWorkbench } from './gameful-workbench';
const meta = {
  title: 'Design Lab/Gameful Workbench',
  component: GamefulWorkbench,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof GamefulWorkbench>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Overview: Story = {};
