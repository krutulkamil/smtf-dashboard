import { type HTMLAttributes } from 'react';
import { cn } from '../lib/cn';
import { surfaceVariants, type SurfaceVariants } from '../lib/variants';
import { UiBadge } from './stencil-generated/components';

export interface DashboardCardProps extends HTMLAttributes<HTMLDivElement>, SurfaceVariants {
  title: string;
  value: string | number;
  hint?: string;
  trend?: { delta: number; direction: 'up' | 'down' | 'flat' };
}

export function DashboardCard({ className, title, value, hint, trend, tone, ...props }: DashboardCardProps) {
  const trendDownVariant = trend?.direction === 'down' ? 'warning' : 'neutral';

  return (
    <div className={cn(surfaceVariants({ tone }), className)} {...props}>
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-sm text-muted-foreground">{title}</h3>
          <div className="mt-2 text-2xl font-semibold">{value}</div>
        </div>
        {trend && (
          <UiBadge
            variant={trend.direction === 'up' ? 'positive' : trendDownVariant}
            aria-label={`trend ${trend.direction} ${trend.delta}%`}
          >
            {trend.direction === 'up' && '▲'}
            {trend.direction === 'down' && '▼'}
            {trend.direction === 'flat' && '—'} {Math.abs(trend.delta)}%
          </UiBadge>
        )}
      </div>
      {hint && <p className="mt-3 text-sm text-muted-foreground">{hint}</p>}
    </div>
  );
}
