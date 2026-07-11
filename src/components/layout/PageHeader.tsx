import React from 'react';
import { cn } from '@/lib/utils';
import { PageTitle, PageDescription } from '@/components/typography';

export interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}

export function PageHeader({ title, description, actions, className, ...props }: PageHeaderProps) {
  return (
    <div 
      className={cn(
        "flex flex-col gap-4 border-b border-border bg-background p-8 shrink-0", 
        className
      )}
      {...props}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <PageTitle>{title}</PageTitle>
          {description && <PageDescription>{description}</PageDescription>}
        </div>
        {actions && (
          <div className="flex items-center gap-3 shrink-0">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}
