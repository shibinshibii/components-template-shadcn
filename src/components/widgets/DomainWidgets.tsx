
import { ChartCard, AppCard, CardHeader, CardBody } from '@/components/ui/card';
import { CardTitle, Muted, Text, Number as TypographyNumber } from '@/components/typography';

import { AppButton } from '@/components/ui/app-button';
import { Users } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// -------------------------------------------------------------
// Performance Graph (Simulated via flex columns for Recharts placeholder)
// -------------------------------------------------------------
export interface PerformanceData {
  label: string;
  value: number;
}
export function PerformanceGraphWidget({ title = "Academic Performance", data }: { title?: string, data: PerformanceData[] }) {
  const max = Math.max(...data.map(d => d.value), 100);
  return (
    <ChartCard title={title} description="Average scores across subjects">
      {/* Recharts placeholder using pure CSS for now */}
      <div className="flex items-end justify-between w-full h-full gap-2 px-4 py-2">
        {data.map((item) => {
          const heightPct = (item.value / max) * 100;
          return (
            <div key={item.label} className="flex flex-col items-center gap-2 flex-1 group">
              <div className="w-full relative flex flex-col justify-end bg-muted/20 rounded-t-sm overflow-hidden h-[200px]">
                <div 
                  className="w-full bg-primary/80 group-hover:bg-primary transition-all duration-500 rounded-t-sm" 
                  style={{ height: `${heightPct}%` }}
                />
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.value}%
                </span>
              </div>
              <span className="text-[10px] text-muted-foreground font-medium uppercase truncate w-full text-center">
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </ChartCard>
  );
}

// -------------------------------------------------------------
// Attendance Summary
// -------------------------------------------------------------
export function AttendanceSummaryWidget({ present, absent, late, total }: { present: number, absent: number, late: number, total: number }) {
  const presentPct = (present / total) * 100;

  return (
    <AppCard>
      <CardHeader className="py-4">
        <CardTitle className="text-base">Attendance Summary</CardTitle>
      </CardHeader>
      <CardBody className="py-4">
        <div className="flex items-center justify-center mb-6">
          <div className="relative h-32 w-32 rounded-full border-8 border-muted flex flex-col items-center justify-center">
             <TypographyNumber className="text-2xl font-bold leading-none">{Math.round(presentPct)}%</TypographyNumber>
             <Muted className="text-xs">Present</Muted>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-success" /> Present</div>
            <span className="font-semibold">{present}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-danger" /> Absent</div>
            <span className="font-semibold">{absent}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-warning" /> Late</div>
            <span className="font-semibold">{late}</span>
          </div>
        </div>
      </CardBody>
    </AppCard>
  );
}

// -------------------------------------------------------------
// Fee Collection
// -------------------------------------------------------------
export function FeeCollectionWidget({ collected, pending, total, currency = "$" }: { collected: number, pending: number, total: number, currency?: string }) {
  const pct = (collected / total) * 100;
  return (
    <AppCard>
      <CardHeader className="py-4 border-b-0 pb-2">
        <CardTitle className="text-base">Fee Collection</CardTitle>
      </CardHeader>
      <CardBody className="py-4">
        <div className="flex items-end justify-between mb-4">
          <div>
            <Muted className="text-xs mb-1">Total Collected</Muted>
            <TypographyNumber className="text-3xl font-bold text-success leading-none">{currency}{collected.toLocaleString()}</TypographyNumber>
          </div>
          <div className="text-right">
            <Muted className="text-xs mb-1">Pending</Muted>
            <TypographyNumber className="text-lg font-semibold text-danger">{currency}{pending.toLocaleString()}</TypographyNumber>
          </div>
        </div>
        <div className="h-3 w-full bg-danger/10 rounded-full overflow-hidden flex">
          <div className="h-full bg-success transition-all duration-1000" style={{ width: `${pct}%` }} />
        </div>
        <div className="flex justify-between mt-2 text-xs text-muted-foreground font-medium">
          <span>0%</span>
          <span>Target: {currency}{total.toLocaleString()}</span>
        </div>
      </CardBody>
    </AppCard>
  );
}

// -------------------------------------------------------------
// Recent Admissions
// -------------------------------------------------------------
export interface AdmissionData {
  id: string;
  name: string;
  grade: string;
  date: string;
  avatar?: string;
}

export function RecentAdmissionsWidget({ items, onAction }: { items: AdmissionData[], onAction?: () => void }) {
  return (
    <AppCard>
      <CardHeader className="flex flex-row items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-primary" />
          <CardTitle className="text-base">Recent Admissions</CardTitle>
        </div>
        {onAction && <AppButton variant="ghost" size="sm" onClick={onAction}>View All</AppButton>}
      </CardHeader>
      <CardBody className="py-2 px-4">
        <div className="divide-y divide-border/50">
          {items.length === 0 ? (
            <Muted className="text-center py-6">No recent admissions.</Muted>
          ) : (
             items.map((item) => (
              <div key={item.id} className="py-3 flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={item.avatar} />
                    <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <Text className="text-sm font-semibold">{item.name}</Text>
                    <Muted className="text-xs">Grade: {item.grade}</Muted>
                  </div>
                </div>
                <span className="text-xs font-medium text-muted-foreground">{item.date}</span>
              </div>
            ))
          )}
        </div>
      </CardBody>
    </AppCard>
  );
}

// -------------------------------------------------------------
// Exam Summary
// -------------------------------------------------------------
export function ExamSummaryWidget({ nextExam, date, daysLeft }: { nextExam: string, date: string, daysLeft: number }) {
  return (
    <AppCard className="bg-primary/5 border-primary/20">
      <CardBody className="p-6 flex items-center justify-between">
        <div>
          <Muted className="text-xs font-medium uppercase tracking-wider text-primary mb-1">Upcoming Exam</Muted>
          <CardTitle className="text-xl mb-1">{nextExam}</CardTitle>
          <Text className="text-sm text-muted-foreground">{date}</Text>
        </div>
        <div className="flex flex-col items-center justify-center h-16 w-16 rounded-2xl bg-background border border-primary/20 shadow-sm text-primary">
          <TypographyNumber className="text-2xl font-bold leading-none">{daysLeft}</TypographyNumber>
          <span className="text-[10px] font-semibold uppercase mt-0.5">Days</span>
        </div>
      </CardBody>
    </AppCard>
  );
}
