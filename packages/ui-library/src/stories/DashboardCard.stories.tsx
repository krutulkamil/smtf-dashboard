import type { Meta, StoryObj } from '@storybook/react-vite';

import { DashboardCard, type SurfaceVariants } from '../index';

const meta = {
  title: 'Components/DashboardCard',
  component: DashboardCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    tone: {
      control: 'select',
      options: ['muted', 'primary', 'success', 'warning', 'destructive'] as SurfaceVariants['tone'][],
    },
  },
  args: {
    title: 'Total Revenue',
    value: '$48,920',
    hint: 'Compared to last month',
  },
} satisfies Meta<typeof DashboardCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SuccessTrend: Story = {
  name: 'Trend Up (Positive)',
  args: {
    tone: 'positive',
    trend: { delta: 12.4, direction: 'up' },
  },
};

export const DownTrendDestructiveTone: Story = {
  name: 'Trend Down (Warning)',
  args: {
    tone: 'warning',
    trend: { delta: 5.1, direction: 'down' },
  },
};

export const FlatMutedTone: Story = {
  name: 'Flat (Neutral)',
  args: {
    tone: 'neutral',
    trend: { delta: 0, direction: 'flat' },
  },
};
