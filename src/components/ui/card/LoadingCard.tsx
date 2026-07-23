
import { AppCard, CardHeader, CardBody } from './AppCard';
import { Skeleton } from '@/components/ui/skeleton';

export function LoadingCard({ className }: { className?: string }) {
  return (
    <AppCard className={className}>
      <CardHeader className="py-5">
        <Skeleton className="h-5 w-1/3" />
        <Skeleton className="h-3 w-1/4 mt-2" />
      </CardHeader>
      <CardBody className="space-y-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </CardBody>
    </AppCard>
  );
}
