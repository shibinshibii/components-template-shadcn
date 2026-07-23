import { AppLayout } from '@/components/layout/AppLayout';
import { PageTitle, Muted } from '@/components/typography';
import { AppCard, MetricCard, InfoCard, StatCard } from '@/components/ui/card';
import { Users } from 'lucide-react';

export default function CardsDemo() {
  return (
    <AppLayout>
      <div className="p-6 md:p-8 w-full space-y-8 animate-in fade-in duration-500">
        <div>
          <PageTitle>Cards</PageTitle>
          <Muted>Versatile container components for data and actions.</Muted>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Metric Card</h3>
            <MetricCard 
              title="Total Revenue" 
              current={45231} 
              total={50000}
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Stat Card</h3>
            <StatCard 
              title="Active Users" 
              value="2,350" 
              icon={Users} 
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Info Card</h3>
            <InfoCard 
              title="Next Payment" 
              description="Due in 5 days" 
            />
          </div>

          <div className="space-y-4 md:col-span-2 lg:col-span-3">
            <h3 className="text-lg font-medium">App Card</h3>
            <AppCard title="Standard Card">
              <div className="p-4 bg-muted/30 rounded-md">
                Card Content Goes Here
              </div>
            </AppCard>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
