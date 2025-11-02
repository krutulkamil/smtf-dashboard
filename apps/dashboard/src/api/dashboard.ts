import { isAxiosError } from 'axios';
import { DashboardResponseSchema, type DashboardResponse } from '@smtf/schemas';

import { http } from '@/api/http';

export async function getDashboard(): Promise<DashboardResponse> {
  try {
    const { data } = await http.get<DashboardResponse>('/dashboard');
    return DashboardResponseSchema.parse(data);
  } catch (err) {
    if (isAxiosError(err)) {
      const status = err.response?.status ?? 'NETWORK';
      const statusText = err.response?.statusText ?? err.message;
      throw new Error(`Failed to fetch /dashboard: ${status} ${statusText}`);
    }
    throw err instanceof Error ? err : new Error('Unknown error');
  }
}
