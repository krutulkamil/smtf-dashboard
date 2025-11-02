import { DashboardLoadingWrapper } from '@/components/dashboard/dashboard-loading-wrapper.tsx';
import { DashboardContent } from '@/components/dashboard/dashboard-content';
import { DashboardError } from '@/components/dashboard/dashboard-error';

import { useDashboard } from './hooks/useDashboard';

function Dashboard() {
  const { dashboardData, isDashboardLoading, dashboardError, refetchDashboard } = useDashboard();

  if (dashboardError) {
    return <DashboardError onClickTryAgain={refetchDashboard} />;
  }

  return (
    <DashboardLoadingWrapper isLoading={isDashboardLoading}>
      {dashboardData && <DashboardContent data={dashboardData} />}
    </DashboardLoadingWrapper>
  );
}

export default Dashboard;
