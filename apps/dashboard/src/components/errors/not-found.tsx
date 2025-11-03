import { AlertCircle } from 'lucide-react';
import { PageContainer, UiBadge } from '@smtf/ui-library';
import { Link } from '@tanstack/react-router';

import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { DashboardHeader } from '~/components/dashboard/dashboard-header';

export const NotFound = () => {
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
                                    Page not found!
                                </CardTitle>
                            </div>
                            <UiBadge variant="warning">Error</UiBadge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col items-center justify-center gap-4 py-8 text-center">
                            <AlertCircle className="h-12 w-12 text-destructive" />
                            <div>
                                <p className="font-semibold text-destructive">Page you are trying to reach doesn't exist.</p>
                                <div className="mt-2">
                                    <Link to="/" className="text-sm underline">
                                        Go home
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </PageContainer>
    );
};
