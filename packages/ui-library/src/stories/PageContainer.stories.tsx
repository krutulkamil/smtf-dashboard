import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';

import { PageContainer, Grid, DashboardCard } from '../index';

const meta = {
  title: 'Layout/PageContainer',
  component: PageContainer,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof PageContainer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <PageContainer {...args}>
      <div className="py-6">
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">Overview of your key metrics</p>

        <div className="mt-6">
          <Grid cols={1} mdCols={2} lgCols={4} gap={4}>
            <DashboardCard
              title="Revenue"
              value="$48,920"
              hint="vs last month"
              trend={{ delta: 12.4, direction: 'up' }}
            />
            <DashboardCard
              title="Subscriptions"
              value={1_294}
              hint="active"
              tone="positive"
              trend={{ delta: 1.8, direction: 'up' }}
            />
            <DashboardCard title="Churn" value="3.2%" tone="warning" trend={{ delta: 0.6, direction: 'down' }} />
            <DashboardCard title="Incidents" value={2} tone="neutral" trend={{ delta: 0, direction: 'flat' }} />
          </Grid>
        </div>

        <div className="mt-8 rounded-lg border bg-card p-6 shadow-sm">
          <h2 className="text-lg font-medium">Content Area</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Use <code>PageContainer</code> to center and constrain your page to a readable width with responsive
            horizontal padding.
          </p>
        </div>
      </div>
    </PageContainer>
  ),
};
