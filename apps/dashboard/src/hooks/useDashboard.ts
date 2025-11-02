import { useQuery } from '@tanstack/react-query';
import type { DashboardResponse } from '@smtf/schemas';

import { apiQueryKeys } from '@/api/constants/apiQueryKeys';
import { getDashboard } from '@/api/dashboard';

export function useDashboard() {
  const { data, isLoading, error, refetch } = useQuery<DashboardResponse, Error>({
    queryKey: [apiQueryKeys.dashboard],
    queryFn: getDashboard,
    staleTime: 30_000,
  });

  return {
    dashboardData: data,
    isDashboardLoading: isLoading,
    dashboardError: error,
    refetchDashboard: refetch,
  } as const;
}
