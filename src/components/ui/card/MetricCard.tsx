
import { AppCard, CardBody } from './AppCard';
import { Text, Muted } from '@/components/typography';

export interface MetricCardProps {
  title: string;
  current: number;
  total: number;
  unit?: string;
  className?: string;
}

export function MetricCard({ title, current, total, unit = "", className }: MetricCardProps) {
  const percentage = Math.min(100, Math.max(0, (current / total) * 100));
  return (
    <AppCard className={className}>
      <CardBody className="py-5">
        <div className="flex items-center justify-between mb-4">
          <Text className="font-medium leading-none">{title}</Text>
          <Muted className="text-xs">{current} / {total} {unit}</Muted>
        </div>
        <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
          <div className="h-full bg-primary transition-all duration-500 rounded-full" style={{ width: `${percentage}%` }} />
        </div>
      </CardBody>
    </AppCard>
  );
}
