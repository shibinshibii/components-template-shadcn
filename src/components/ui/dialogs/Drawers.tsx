import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

export interface AppDrawerProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: React.ReactNode;
  title?: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  className?: string;
}

export function AppDrawer({
  open, onOpenChange, trigger, title, description, children, footer, side = 'right', className
}: AppDrawerProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      {trigger && <SheetTrigger asChild>{trigger}</SheetTrigger>}
      <SheetContent side={side} className={cn("flex flex-col p-0 border-border", className)}>
        {(title || description) && (
          <SheetHeader className="px-6 py-5 border-b border-border/50 text-left">
            {title && <SheetTitle className="text-lg leading-none">{title}</SheetTitle>}
            {description && <SheetDescription className="mt-1.5">{description}</SheetDescription>}
          </SheetHeader>
        )}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {children}
        </div>
        {footer && (
          <SheetFooter className="px-6 py-4 border-t border-border/50 bg-muted/10 sm:justify-end">
            {footer}
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}

export const RightDrawer = (props: Omit<AppDrawerProps, 'side'>) => <AppDrawer side="right" {...props} />;
export const BottomDrawer = (props: Omit<AppDrawerProps, 'side'>) => <AppDrawer side="bottom" {...props} />;
export const LeftDrawer = (props: Omit<AppDrawerProps, 'side'>) => <AppDrawer side="left" {...props} />;
export const TopDrawer = (props: Omit<AppDrawerProps, 'side'>) => <AppDrawer side="top" {...props} />;
