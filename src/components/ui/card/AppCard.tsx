import React from 'react';
import { cn } from '@/lib/utils';

export const AppCard = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("rounded-xl border border-border bg-card text-card-foreground shadow-none", className)} {...props} />
));
AppCard.displayName = "AppCard";

export const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("px-6 py-5 border-b border-border/50 flex flex-col gap-1.5", className)} {...props} />
));
CardHeader.displayName = "CardHeader";

export interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  noPadding?: boolean;
}

export const CardBody = React.forwardRef<HTMLDivElement, CardBodyProps>(({ className, noPadding, ...props }, ref) => (
  <div ref={ref} className={cn("px-6 py-5", noPadding && "p-0", className)} {...props} />
));
CardBody.displayName = "CardBody";

export const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("px-6 py-4 border-t border-border/50 flex items-center justify-between bg-muted/10 rounded-b-xl", className)} {...props} />
));
CardFooter.displayName = "CardFooter";

export const CardActions = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center gap-2", className)} {...props} />
));
CardActions.displayName = "CardActions";
