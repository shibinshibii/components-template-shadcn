import React from 'react';
import { AppCard, CardHeader, CardBody } from './AppCard';
import { CardTitle, Muted } from '@/components/typography';

export interface ChartCardProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
}

export function ChartCard({ title, description, action, children, className, contentClassName }: ChartCardProps) {
  return (
    <AppCard className={className}>
      <CardHeader className="flex flex-row items-center justify-between py-4">
        <div className="space-y-1">
          <CardTitle>{title}</CardTitle>
          {description && <Muted className="text-xs">{description}</Muted>}
        </div>
        {action && <div>{action}</div>}
      </CardHeader>
      <CardBody className="p-0">
        <div className={cn("p-4 min-h-[300px] flex items-center justify-center w-full", contentClassName)}>
          {children}
        </div>
      </CardBody>
    </AppCard>
  );
}
