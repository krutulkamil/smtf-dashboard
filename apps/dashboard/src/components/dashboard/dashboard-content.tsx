import { PageContainer, UiBadge } from '@smtf/ui-library';
import { TrendingUp } from 'lucide-react';
import { type DashboardResponse } from '@smtf/schemas';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { KPICards } from '@/components/dashboard/kpi-cards';
import { TrendChart } from '@/components/dashboard/trend-chart';
import { cn } from '@/lib/utils';

type Props = {
  data: DashboardResponse;
};

export const DashboardContent = ({ data }: Props) => {
  return (
    <PageContainer>
      <div className="bg-background text-foreground">
        <DashboardHeader />
        <main className={cn('container mx-auto px-4 py-8', 'md:px-8')}>
          <div className="space-y-8">
            <KPICards data={data} />

            <Card className="border-border">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Revenue Trend
                    </CardTitle>
                    <CardDescription>Last 4 hours performance</CardDescription>
                  </div>
                  <UiBadge>Realtime</UiBadge>
                </div>
              </CardHeader>
              <CardContent>
                <TrendChart trend={data.trend} />
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </PageContainer>
  );
};
