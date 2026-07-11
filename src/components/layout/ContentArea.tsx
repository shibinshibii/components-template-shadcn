import React from 'react';
import { cn } from '@/lib/utils';

export interface ContentAreaProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ContentArea({ className, children, ...props }: ContentAreaProps) {
  return (
    <div 
      className={cn("flex-1 p-8 w-full", className)}
      {...props}
    >
      {children}
    </div>
  );
}
