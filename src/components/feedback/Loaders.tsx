import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export { Skeleton } from '@/components/ui/skeleton';

export interface SpinnerProps extends React.SVGProps<SVGSVGElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const sizeClasses = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8',
  xl: 'h-12 w-12',
};

export function Spinner({ size = 'md', className, ...props }: SpinnerProps) {
  return (
    <Loader2 className={cn("animate-spin text-muted-foreground", sizeClasses[size], className)} {...props} />
  );
}

export function LoadingOverlay({ text = "Loading..." }: { text?: string }) {
  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm rounded-inherit">
      <Spinner size="lg" className="text-primary mb-4" />
      <div className="text-sm font-medium text-muted-foreground animate-pulse">{text}</div>
    </div>
  );
}

export interface ProgressBarProps {
  value: number;
  label?: string;
  showValue?: boolean;
  className?: string;
}

export function ProgressBar({ value, label, showValue = true, className }: ProgressBarProps) {
  return (
    <div className={cn("w-full flex flex-col gap-1.5", className)}>
      {(label || showValue) && (
        <div className="flex items-center justify-between text-xs font-medium text-muted-foreground mb-1">
          {label && <span>{label}</span>}
          {showValue && <span>{Math.round(value)}%</span>}
        </div>
      )}
      <Progress value={value} className="h-2" />
    </div>
  );
}
