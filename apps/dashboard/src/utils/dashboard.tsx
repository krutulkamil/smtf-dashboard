import { queryOptions } from '@tanstack/react-query';
import { createServerFn } from '@tanstack/react-start';
import axios from 'redaxios';
import { DashboardResponseSchema } from '@smtf/schemas';
import type { DashboardResponse } from '@smtf/schemas';

const API_URL = process.env.VITE_BACKEND_URL ?? 'http://localhost:3000';

export const fetchDashboard = createServerFn({ method: 'GET' }).handler(async () => {
  try {
    const { data } = await axios.get<DashboardResponse>(`${API_URL}/dashboard`);
    return DashboardResponseSchema.parse(data);
  } catch (err) {
    console.error('Failed to fetch or validate /dashboard:', err);
    throw new Error('Invalid dashboard response or network error');
  }
});

export const dashboardQueryOptions = () =>
  queryOptions({
    queryKey: ['dashboard'],
    queryFn: () => fetchDashboard(),
    staleTime: 30_000,
  });
