import { z } from 'zod';

export const TrendPointSchema = z.object({
  timestamp: z.string().refine(
    (s) => {
      return !isNaN(Date.parse(s));
    },
    {
      message: 'Invalid ISO datetime string',
    },
  ),
  revenue: z.number().nonnegative(),
  users: z.number().int().nonnegative(),
  conversions: z.number().int().nonnegative(),
});

export const DashboardResponseSchema = z.object({
  revenueToday: z.number().nonnegative(),
  activeUsers: z.number().int().nonnegative(),
  conversionRate: z.number().min(0),
  trend: z.array(TrendPointSchema).min(1),
});

export type DashboardResponse = z.infer<typeof DashboardResponseSchema>;
export type TrendPoint = z.infer<typeof TrendPointSchema>;
