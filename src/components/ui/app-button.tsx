import React from 'react';
import { Button, type ButtonProps } from './button';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface AppButtonProps extends ButtonProps {
  /** Text or content inside the button */
  children?: React.ReactNode;
  /** Icon to render before the text */
  leftIcon?: React.ReactNode;
  /** Icon to render after the text */
  rightIcon?: React.ReactNode;
  /** Shows a loading spinner and disables the button */
  loading?: boolean;
  /** Makes the button 100% width of its container */
  fullWidth?: boolean;
}

export const AppButton = React.forwardRef<HTMLButtonElement, AppButtonProps>(
  (
    { 
      children, 
      leftIcon, 
      rightIcon, 
      loading, 
      fullWidth, 
      className, 
      disabled, 
      variant = 'primary',
      size = 'md',
      shape = 'default',
      ...props 
    }, 
    ref
  ) => {
    
    // If it's an icon-only button (no children), ensure proper spacing/padding.
    // The underlying button has `size: 'icon'` for precise square dimensions.
    const isIconOnly = variant === 'icon' || (!children && (leftIcon || rightIcon) && !loading);
    const resolvedSize = isIconOnly ? 'icon' : size;

    return (
      <Button
        ref={ref}
        variant={variant === 'icon' ? 'ghost' : variant} // icon variant is visually a ghost button
        size={resolvedSize}
        shape={shape}
        disabled={disabled || loading}
        className={cn(
          fullWidth && "w-full", 
          className
        )}
        {...props}
      >
        {loading && <Loader2 className="shrink-0 animate-spin" />}
        {!loading && leftIcon && <span className="shrink-0">{leftIcon}</span>}
        {children && <span className="truncate">{children}</span>}
        {!loading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </Button>
    );
  }
);

AppButton.displayName = "AppButton";
