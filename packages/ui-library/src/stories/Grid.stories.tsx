import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';

import { Grid } from '../index';

const meta = {
  title: 'Layout/Grid',
  component: Grid,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  args: {
    cols: 1,
    mdCols: 2,
    lgCols: 4,
    gap: 4,
  },
} satisfies Meta<typeof Grid>;

export default meta;

type Story = StoryObj<typeof meta>;

function Item({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-md border border-border bg-card p-4 text-sm text-foreground/80 shadow-sm">{children}</div>
  );
}

export const Default: Story = {
  render: (args) => (
    <Grid {...args}>
      <Item>Item 1</Item>
      <Item>Item 2</Item>
      <Item>Item 3</Item>
      <Item>Item 4</Item>
      <Item>Item 5</Item>
      <Item>Item 6</Item>
      <Item>Item 7</Item>
      <Item>Item 8</Item>
    </Grid>
  ),
};

export const TwoColsTightGap: Story = {
  name: '2 cols, gap-2',
  args: { cols: 2, mdCols: 2, lgCols: 2, gap: 2 },
  render: (args) => (
    <Grid {...args}>
      {Array.from({ length: 6 }).map((_, i) => (
        <Item key={i}>Card {i + 1}</Item>
      ))}
    </Grid>
  ),
};

export const ThreeColsLooseGap: Story = {
  name: '3 cols (md+), gap-6',
  args: { cols: 1, mdCols: 3, lgCols: 3, gap: 6 },
  render: (args) => (
    <Grid {...args}>
      {Array.from({ length: 9 }).map((_, i) => (
        <Item key={i}>Item {i + 1}</Item>
      ))}
    </Grid>
  ),
};
