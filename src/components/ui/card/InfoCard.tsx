
import { AppCard, CardBody } from './AppCard';
import { Text, Muted } from '@/components/typography';
import { Info, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface InfoCardProps {
  variant?: 'info' | 'success' | 'warning' | 'danger';
  title: string;
  description: string;
  className?: string;
}

const variantStyles = {
  info: { bg: 'bg-primary/5', border: 'border-primary/20', text: 'text-primary', icon: Info },
  success: { bg: 'bg-success/5', border: 'border-success/20', text: 'text-success', icon: CheckCircle },
  warning: { bg: 'bg-warning/5', border: 'border-warning/20', text: 'text-warning', icon: AlertTriangle },
  danger: { bg: 'bg-danger/5', border: 'border-danger/20', text: 'text-danger', icon: XCircle },
};

export function InfoCard({ variant = 'info', title, description, className }: InfoCardProps) {
  const styles = variantStyles[variant];
  const Icon = styles.icon;
  
  return (
    <AppCard className={cn(styles.bg, styles.border, "shadow-none", className)}>
      <CardBody className="py-4 px-5 flex items-start gap-3">
        <Icon className={cn("h-5 w-5 shrink-0 mt-0.5", styles.text)} />
        <div className="flex flex-col gap-0.5">
          <Text className={cn("font-semibold leading-tight", styles.text)}>{title}</Text>
          <Muted className={cn("text-xs leading-normal opacity-90", styles.text)}>{description}</Muted>
        </div>
      </CardBody>
    </AppCard>
  );
}
