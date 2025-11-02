import { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import { type TrendPoint } from '@smtf/schemas';

import { Button } from '@/components/ui/button';

type Props = {
  trend: TrendPoint[];
};

type Trend = 'line' | 'bar';

export const TrendChart = ({ trend }: Props) => {
  const [chartType, setChartType] = useState<Trend>('line');

  const chartData = trend.map((point) => ({
    ...point,
    time: new Date(point.timestamp).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    }),
  }));

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <Button variant={chartType === 'line' ? 'default' : 'outline'} size="sm" onClick={() => setChartType('line')}>
          Line Chart
        </Button>
        <Button variant={chartType === 'bar' ? 'default' : 'outline'} size="sm" onClick={() => setChartType('bar')}>
          Bar Chart
        </Button>
      </div>

      <div className="h-80 w-full">
        {chartType === 'line' ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="time" stroke="var(--color-muted-foreground)" style={{ fontSize: '12px' }} />
              <YAxis stroke="var(--color-muted-foreground)" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--color-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  color: 'var(--color-foreground)',
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="var(--color-chart-1)"
                strokeWidth={2}
                dot={false}
                name="Revenue ($)"
              />
              <Line
                type="monotone"
                dataKey="users"
                stroke="var(--color-chart-2)"
                strokeWidth={2}
                dot={false}
                name="Users"
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="time" stroke="var(--color-muted-foreground)" style={{ fontSize: '12px' }} />
              <YAxis stroke="var(--color-muted-foreground)" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--color-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  color: 'var(--color-foreground)',
                }}
              />
              <Legend />
              <Bar dataKey="revenue" fill="var(--color-chart-1)" radius={[8, 8, 0, 0]} name="Revenue ($)" />
              <Bar dataKey="users" fill="var(--color-chart-2)" radius={[8, 8, 0, 0]} name="Users" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};
