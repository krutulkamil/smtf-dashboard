import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { dashboardQueryOptions } from '../utils/dashboard';
import { DashboardError } from '~/components/dashboard/dashboard-error';
import { DashboardLoading } from '~/components/dashboard/dashboard-loading';
import { DashboardContent } from '~/components/dashboard/dashboard-content';

export const Route = createFileRoute('/')({
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(dashboardQueryOptions());
  },
  head: () => ({
    meta: [{ title: 'Dashboard' }],
  }),
  component: Home,
  pendingComponent: () => <DashboardLoading />,
  errorComponent: ({ reset }) => <DashboardError onClickTryAgain={reset} />,
});

function Home() {
  const dashboardQuery = useSuspenseQuery(dashboardQueryOptions());

  return <DashboardContent data={dashboardQuery.data} />;
}
