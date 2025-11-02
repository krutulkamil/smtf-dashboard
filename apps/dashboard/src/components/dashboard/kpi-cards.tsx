import { DashboardCard, Grid } from '@smtf/ui-library';
import { type DashboardResponse } from '@smtf/schemas';

type Props = {
  data: DashboardResponse;
};

function toTrend(value: string) {
  const trimmed = value.trim();
  const num = Number.parseFloat(trimmed);
  if (Number.isNaN(num)) return;
  const arrowDirection = num > 0 ? 'up' : 'down';
  const direction = num === 0 ? 'flat' : arrowDirection;
  return { delta: Math.abs(num), direction } as const;
}

export const KPICards = ({ data }: Props) => {
  const kpis = [
    {
      id: 'revenueToday',
      title: 'Revenue Today',
      value: `$${data.revenueToday.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      description: 'Total revenue',
      trend: '+12.5%',
    },
    {
      id: 'activeUsers',
      title: 'Active Users',
      value: data.activeUsers.toLocaleString(),
      description: 'Currently online',
      trend: '+8.2%',
    },
    {
      id: 'conversionRate',
      title: 'Conversion Rate',
      value: `${(data.conversionRate * 100).toFixed(2)}%`,
      description: 'From visits to conversions',
      trend: '+2.1%',
    },
  ] as const;

  return (
    <Grid cols={1} mdCols={3} lgCols={3} gap={2}>
      {kpis.map((kpi) => (
        <DashboardCard
          key={kpi.id}
          title={kpi.title}
          value={kpi.value}
          hint={kpi.description}
          trend={toTrend(kpi.trend)}
        />
      ))}
    </Grid>
  );
};
