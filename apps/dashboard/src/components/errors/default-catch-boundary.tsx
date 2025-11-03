import { useRouter } from '@tanstack/react-router';
import { AlertCircle } from 'lucide-react';
import { PageContainer, UiBadge } from '@smtf/ui-library';
import type { ErrorComponentProps } from '@tanstack/react-router';

import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import { DashboardHeader } from '~/components/dashboard/dashboard-header';

export function DefaultCatchBoundary({ error }: ErrorComponentProps) {
    const router = useRouter();

    console.error(error);

    return (
        <PageContainer>
            <div className="bg-background text-foreground">
                <DashboardHeader />
                <Card className="mt-8 border-destructive bg-destructive/5">
                    <CardHeader>
                        <div className="flex items-start justify-between">
                            <div>
                                <CardTitle className="flex items-center gap-2 text-destructive">
                                    <AlertCircle className="h-5 w-5" />
                                    Error
                                </CardTitle>
                            </div>
                            <UiBadge variant="warning">Error</UiBadge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col items-center justify-center gap-4 py-8 text-center">
                            <AlertCircle className="h-12 w-12 text-destructive" />
                            <div>
                                <p className="font-semibold text-destructive">Something went wrong!</p>
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                    router.invalidate();
                                }}
                                className="mt-2"
                            >
                                Retry
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </PageContainer>
    );
}
