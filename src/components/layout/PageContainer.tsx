import React from 'react';
import { cn } from '@/lib/utils';

export interface PageContainerProps extends React.HTMLAttributes<HTMLDivElement> {}

export function PageContainer({ className, children, ...props }: PageContainerProps) {
  return (
    <div 
      className={cn("flex flex-col min-h-full w-full", className)}
      {...props}
    >
      {children}
    </div>
  );
}
