import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

export interface AppDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: React.ReactNode;
  title?: string;
  description?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';
  scrollable?: boolean;
}

const maxWidthMap = {
  sm: 'sm:max-w-sm',
  md: 'sm:max-w-md',
  lg: 'sm:max-w-lg',
  xl: 'sm:max-w-xl',
  '2xl': 'sm:max-w-2xl',
  '3xl': 'sm:max-w-3xl',
  full: 'sm:max-w-[95vw]',
};

export function AppDialog({
  open, onOpenChange, trigger, title, description, children, footer, className, maxWidth = 'md', scrollable = true
}: AppDialogProps) {
  const widthClass = maxWidthMap[maxWidth];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger render={trigger as React.ReactElement} />}
      <DialogContent className={cn(widthClass, "flex flex-col gap-0 p-0 overflow-hidden", className)}>
        {(title || description) && (
          <DialogHeader className="px-6 py-5 border-b border-border/50 text-left">
            {title && <DialogTitle className="text-lg leading-none">{title}</DialogTitle>}
            {description && <DialogDescription className="text-sm mt-1.5">{description}</DialogDescription>}
          </DialogHeader>
        )}
        
        {scrollable ? (
          <div className="px-6 py-5 overflow-y-auto max-h-[70vh]">
            {children}
          </div>
        ) : (
          <div className="px-6 py-5">
            {children}
          </div>
        )}
        
        {footer && (
          <DialogFooter className="px-6 py-4 border-t border-border/50 bg-muted/10 sm:justify-end">
            {footer}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
