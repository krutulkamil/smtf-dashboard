import { ModeToggle } from '~/components/layout/mode-toggle';

export const DashboardHeader = () => {
  return (
    <header className="border-b border-border">
      <div className="container mx-auto px-4 py-6 md:px-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">Real-time analytics and insights</p>
        </div>
        <ModeToggle />
      </div>
    </header>
  );
};
