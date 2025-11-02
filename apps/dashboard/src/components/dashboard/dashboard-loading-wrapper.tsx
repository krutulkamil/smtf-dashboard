import { type ReactNode } from 'react';
import { PageContainer, Grid } from '@smtf/ui-library';

import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

type Props = {
  isLoading: boolean;
  children?: ReactNode;
};

export const DashboardLoadingWrapper = ({ isLoading, children }: Props) => {
  if (isLoading) {
    return (
      <PageContainer>
        <div className="bg-background text-foreground">
          <DashboardHeader />
          <main className="container mx-auto px-4 py-8 md:px-8">
            <div className="space-y-8">
              <Grid cols={1} mdCols={3} lgCols={3} gap={2}>
                <Skeleton className={cn('h-28 w-full', 'md:h-36')} />
                <Skeleton className={cn('h-28 w-full', 'md:h-36')} />
                <Skeleton className={cn('h-28 w-full', 'md:h-36')} />
              </Grid>
              <Skeleton className="h-96 w-full" />
            </div>
          </main>
        </div>
      </PageContainer>
    );
  }

  return <>{children}</>;
};
