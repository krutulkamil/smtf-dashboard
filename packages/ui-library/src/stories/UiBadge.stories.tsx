import type { StoryObj } from '@storybook/react-vite';
import React from 'react';

import { UiBadge } from '../components/stencil-generated/components';

const meta = {
  title: 'Components/UiBadge',
  component: UiBadge,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['neutral', 'positive', 'warning'],
    },
    children: {
      control: 'text',
    },
  },
  args: {
    variant: 'neutral',
    children: 'Badge',
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Positive: Story = {
  args: {
    variant: 'positive',
    children: 'Positive',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    children: 'Warning',
  },
};

export const Showcase: Story = {
  name: 'All variants',
  render: (args) => (
    <div style={{ display: 'flex', gap: 8 }}>
      <UiBadge {...args} variant="neutral">
        Neutral
      </UiBadge>
      <UiBadge {...args} variant="positive">
        Positive
      </UiBadge>
      <UiBadge {...args} variant="warning">
        Warning
      </UiBadge>
    </div>
  ),
};
