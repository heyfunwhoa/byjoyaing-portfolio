import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { CreativeRecipes } from './creative-recipes';
const meta = { title: 'Design Lab/Creative Recipes', component: CreativeRecipes, parameters: { layout: 'padded' } } satisfies Meta<typeof CreativeRecipes>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Overview: Story = {};
