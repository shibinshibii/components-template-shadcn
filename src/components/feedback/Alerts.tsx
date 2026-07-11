import React from 'react';
import { cn } from '@/lib/utils';
import { Alert as ShadcnAlert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info, AlertCircle, CheckCircle, XCircle } from 'lucide-react';

export type AlertVariant = 'default' | 'destructive' | 'success' | 'warning' | 'info';

const icons = {
  default: Info,
  destructive: XCircle,
  success: CheckCircle,
  warning: AlertCircle,
  info: Info,
};

const variantStyles = {
  default: "bg-background text-foreground",
  destructive: "border-danger/50 text-danger dark:border-danger [&>svg]:text-danger bg-danger/5",
  success: "border-success/50 text-success dark:border-success [&>svg]:text-success bg-success/5",
  warning: "border-warning/50 text-warning dark:border-warning [&>svg]:text-warning bg-warning/5",
  info: "border-primary/50 text-primary dark:border-primary [&>svg]:text-primary bg-primary/5",
};

export interface AlertProps {
  title?: string;
  description: React.ReactNode;
  variant?: AlertVariant;
  className?: string;
}

export function Alert({ title, description, variant = 'default', className }: AlertProps) {
  const Icon = icons[variant];
  return (
    <ShadcnAlert className={cn(variantStyles[variant], "shadow-sm", className)}>
      <Icon className="h-4 w-4" />
      {title && <AlertTitle className="font-semibold">{title}</AlertTitle>}
      <AlertDescription className="text-sm opacity-90 leading-relaxed">{description}</AlertDescription>
    </ShadcnAlert>
  );
}

export function Banner({ title, description, variant = 'info', className }: AlertProps) {
  const Icon = icons[variant];
  return (
    <div className={cn("w-full px-4 py-3 rounded-none flex items-start sm:items-center gap-3 border-b shadow-sm", variantStyles[variant], className)}>
      <Icon className="h-5 w-5 shrink-0 mt-0.5 sm:mt-0" />
      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 flex-1">
        {title && <span className="font-semibold text-sm">{title}</span>}
        <span className="text-sm opacity-90 leading-snug">{description}</span>
      </div>
    </div>
  );
}

export function InlineMessage({ description, variant = 'default', className }: Omit<AlertProps, 'title'>) {
  const Icon = icons[variant];
  // extract text color for inline
  const textColor = variant === 'default' ? 'text-foreground' : `text-${variant === 'destructive' ? 'danger' : variant}`;
  
  return (
    <div className={cn("flex items-center gap-2 text-sm", textColor, className)}>
      <Icon className="h-4 w-4 shrink-0" />
      <span>{description}</span>
    </div>
  );
}
