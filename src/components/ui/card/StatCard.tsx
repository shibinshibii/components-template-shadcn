import { AppCard, CardBody } from './AppCard';
import { Number as TypographyNumber, Muted } from '@/components/typography';
import { cn } from '@/lib/utils';
import { type LucideIcon } from 'lucide-react';

export interface StatCardProps {
  title: string;
  value: string | number;
  icon?: LucideIcon;
  trend?: { value: number; label: string; isPositive: boolean };
  className?: string;
}

export function StatCard({ title, value, icon: Icon, trend, className }: StatCardProps) {
  return (
    <AppCard className={className}>
      <CardBody className="py-5">
        <div className="flex items-center justify-between">
          <Muted className="font-medium tracking-wide uppercase text-[11px]">{title}</Muted>
          {Icon && <div className="p-2 bg-primary/10 rounded-md text-primary"><Icon className="h-4 w-4" /></div>}
        </div>
        <div className="mt-3 flex items-end justify-between">
          <TypographyNumber className="text-3xl font-bold leading-none tracking-tight">{value}</TypographyNumber>
          {trend && (
            <div className="flex flex-col items-end">
              <span className={cn("text-xs font-semibold", trend.isPositive ? "text-success" : "text-danger")}>
                {trend.isPositive ? '+' : ''}{trend.value}%
              </span>
              <span className="text-[10px] text-muted-foreground">{trend.label}</span>
            </div>
          )}
        </div>
      </CardBody>
    </AppCard>
  );
}
