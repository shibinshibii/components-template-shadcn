import * as React from 'react';
import { cn } from '@/lib/utils';

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
}

export const PageTitle = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, as: Component = 'h1', ...props }, ref) => (
    <Component
      ref={ref}
      className={cn("text-foreground tracking-tight", className, "text-[24px] font-semibold leading-[1.3]")}
      {...props}
    />
  )
);
PageTitle.displayName = 'PageTitle';

export const PageDescription = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, as: Component = 'p', ...props }, ref) => (
    <Component
      ref={ref}
      className={cn("text-muted-foreground", className, "text-[14px] font-normal leading-[1.5]")}
      {...props}
    />
  )
);
PageDescription.displayName = 'PageDescription';

export const SectionTitle = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, as: Component = 'h2', ...props }, ref) => (
    <Component
      ref={ref}
      className={cn("text-foreground tracking-tight", className, "text-[18px] font-semibold leading-[1.35]")}
      {...props}
    />
  )
);
SectionTitle.displayName = 'SectionTitle';

export const CardTitle = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, as: Component = 'h3', ...props }, ref) => (
    <Component
      ref={ref}
      className={cn("text-foreground tracking-tight", className, "text-[16px] font-semibold leading-[1.4]")}
      {...props}
    />
  )
);
CardTitle.displayName = 'CardTitle';

export interface WidgetTitleProps extends TypographyProps {
  uppercase?: boolean;
}

export const WidgetTitle = React.forwardRef<HTMLElement, WidgetTitleProps>(
  ({ className, uppercase, as: Component = 'h4', ...props }, ref) => (
    <Component
      ref={ref}
      className={cn(
        "text-foreground",
        uppercase && "uppercase tracking-wider",
        className,
        "text-[14px] font-semibold leading-[1.4]"
      )}
      {...props}
    />
  )
);
WidgetTitle.displayName = 'WidgetTitle';

export const Text = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, as: Component = 'p', ...props }, ref) => (
    <Component
      ref={ref}
      className={cn("text-foreground", className, "text-[14px] font-normal leading-[1.5]")}
      {...props}
    />
  )
);
Text.displayName = 'Text';

export const Muted = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, as: Component = 'p', ...props }, ref) => (
    <Component
      ref={ref}
      className={cn("text-muted-foreground", className, "text-[14px] font-normal leading-[1.5]")}
      {...props}
    />
  )
);
Muted.displayName = 'Muted';

export const Caption = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, as: Component = 'span', ...props }, ref) => (
    <Component
      ref={ref}
      className={cn("text-muted-foreground", className, "text-[12px] font-normal leading-[1.4]")}
      {...props}
    />
  )
);
Caption.displayName = 'Caption';

export interface LabelProps extends TypographyProps {
  uppercase?: boolean;
  htmlFor?: string;
}

export const Label = React.forwardRef<HTMLElement, LabelProps>(
  ({ className, uppercase, as: Component = 'label', ...props }, ref) => (
    <Component
      ref={ref}
      className={cn(
        "text-foreground",
        uppercase && "uppercase tracking-wider",
        className,
        "text-[12px] font-medium leading-[1.3]"
      )}
      {...props}
    />
  )
);
Label.displayName = 'Label';

export const Tag = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, as: Component = 'span', ...props }, ref) => (
    <Component
      ref={ref}
      className={cn("text-foreground uppercase tracking-wider", className, "text-[11px] font-medium leading-[1.2]")}
      {...props}
    />
  )
);
Tag.displayName = 'Tag';

export const Number = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, as: Component = 'span', ...props }, ref) => (
    <Component
      ref={ref}
      className={cn("text-foreground", className, "text-[20px] font-semibold leading-[1.2] tabular-nums")}
      {...props}
    />
  )
);
Number.displayName = 'Number';
