import { AppLayout } from '@/components/layout/AppLayout';
import { PageTitle, Muted } from '@/components/typography';
import { StatWidget, FeeCollectionWidget, RecentActivityWidget } from '@/components/widgets';

export default function DashboardPage() {
  return (
    <AppLayout>
      <div className="p-6 md:p-8 w-full space-y-8 animate-in fade-in duration-500">
        <div>
          <PageTitle>Dashboard overview</PageTitle>
          <Muted>Welcome back! Here is what's happening today.</Muted>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatWidget title="Total Students" value="2,451" trend={{ value: 5, label: "vs last month", isPositive: true }} />
          <StatWidget title="Total Teachers" value="142" trend={{ value: 1, label: "vs last month", isPositive: true }} />
          <StatWidget title="Average Attendance" value="94.2%" trend={{ value: -2, label: "vs last month", isPositive: false }} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <FeeCollectionWidget collected={850000} pending={150000} total={1000000} />
          </div>
          <div className="lg:col-span-1">
            <RecentActivityWidget items={[]} />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
