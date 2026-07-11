import React from 'react';
import { AppCard, CardBody } from './AppCard';
import { CardTitle, Muted } from '@/components/typography';
import { type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  badge?: React.ReactNode;
  className?: string;
}

export function FeatureCard({ title, description, icon: Icon, badge, className }: FeatureCardProps) {
  return (
    <AppCard className={cn("overflow-hidden group", className)}>
      <CardBody className="flex flex-col items-start gap-4 p-6">
        <div className="flex w-full items-center justify-between">
          <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary transition-transform group-hover:scale-105">
            <Icon className="h-6 w-6" />
          </div>
          {badge && <div>{badge}</div>}
        </div>
        <div className="space-y-1.5 mt-2">
          <CardTitle className="leading-tight">{title}</CardTitle>
          <Muted className="text-sm line-clamp-2">{description}</Muted>
        </div>
      </CardBody>
    </AppCard>
  );
}
