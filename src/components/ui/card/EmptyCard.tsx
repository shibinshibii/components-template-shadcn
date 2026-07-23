
import { cn } from '@/lib/utils';
import { AppCard, CardBody } from './AppCard';
import { CardTitle, Muted } from '@/components/typography';
import { type LucideIcon, Inbox } from 'lucide-react';
import { AppButton } from '@/components/ui/app-button';

export interface EmptyCardProps {
  title: string;
  description: string;
  icon?: LucideIcon;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyCard({ title, description, icon: Icon = Inbox, actionLabel, onAction, className }: EmptyCardProps) {
  return (
    <AppCard className={cn("border-dashed bg-transparent", className)}>
      <CardBody className="flex flex-col items-center justify-center py-12 text-center">
        <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground mb-4">
          <Icon className="h-6 w-6 opacity-80" />
        </div>
        <CardTitle className="mb-1.5">{title}</CardTitle>
        <Muted className="max-w-sm mb-6">{description}</Muted>
        {actionLabel && onAction && (
          <AppButton onClick={onAction}>{actionLabel}</AppButton>
        )}
      </CardBody>
    </AppCard>
  );
}
