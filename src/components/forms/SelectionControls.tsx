import React from 'react';
import { cn } from '@/lib/utils';
import { Text, Muted } from '@/components/typography';
import { type FieldWrapperProps } from './FieldWrapper';

export interface SelectionProps extends React.InputHTMLAttributes<HTMLInputElement>, Omit<FieldWrapperProps, 'children'> {}

// Checkbox
export const Checkbox = React.forwardRef<HTMLInputElement, SelectionProps>(
  ({ id, label, description, error, required, tooltip, helperText, className, ...props }, ref) => {
    const inputId = id || React.useId();
    return (
      <div className={cn("flex flex-col gap-1.5", className)}>
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id={inputId}
            ref={ref}
            className="mt-1 h-4 w-4 shrink-0 rounded border border-input text-primary accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            {...props}
          />
          {(label || description) && (
            <div className="flex flex-col">
              {label && (
                <label htmlFor={inputId} className="text-sm font-medium leading-none cursor-pointer select-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  {label} {required && <span className="text-danger">*</span>}
                </label>
              )}
              {description && <Muted className="text-xs mt-1.5">{description}</Muted>}
            </div>
          )}
        </div>
        {error && <Text className="text-xs text-danger font-medium ml-7">{error}</Text>}
        {!error && helperText && <Muted className="text-xs ml-7">{helperText}</Muted>}
      </div>
    );
  }
);
Checkbox.displayName = 'Checkbox';

// Radio
export const Radio = React.forwardRef<HTMLInputElement, SelectionProps>(
  ({ id, label, description, error, required, tooltip, helperText, className, ...props }, ref) => {
    const inputId = id || React.useId();
    return (
      <div className={cn("flex flex-col gap-1.5", className)}>
        <div className="flex items-start gap-3">
          <input
            type="radio"
            id={inputId}
            ref={ref}
            className="mt-1 h-4 w-4 shrink-0 rounded-full border border-input text-primary accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            {...props}
          />
          {(label || description) && (
            <div className="flex flex-col">
              {label && (
                <label htmlFor={inputId} className="text-sm font-medium leading-none cursor-pointer select-none">
                  {label} {required && <span className="text-danger">*</span>}
                </label>
              )}
              {description && <Muted className="text-xs mt-1.5">{description}</Muted>}
            </div>
          )}
        </div>
        {error && <Text className="text-xs text-danger font-medium ml-7">{error}</Text>}
      </div>
    );
  }
);
Radio.displayName = 'Radio';

// Switch
export const Switch = React.forwardRef<HTMLInputElement, SelectionProps>(
  ({ id, label, description, error, required, tooltip, helperText, className, disabled, ...props }, ref) => {
    const inputId = id || React.useId();
    return (
      <div className={cn("flex flex-col gap-1.5", className, disabled && "opacity-50 cursor-not-allowed")}>
        <div className="flex items-center gap-3">
          <div className="relative inline-flex items-center">
            <input
              type="checkbox"
              id={inputId}
              ref={ref}
              disabled={disabled}
              className="peer sr-only"
              {...props}
            />
            <div className="w-10 h-5 bg-input rounded-full peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-ring peer-checked:bg-primary transition-colors after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-border after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
          </div>
          {(label || description) && (
            <div className="flex flex-col">
              {label && (
                <label htmlFor={inputId} className="text-sm font-medium leading-none cursor-pointer select-none">
                  {label} {required && <span className="text-danger">*</span>}
                </label>
              )}
              {description && <Muted className="text-xs mt-1">{description}</Muted>}
            </div>
          )}
        </div>
        {error && <Text className="text-xs text-danger font-medium">{error}</Text>}
      </div>
    );
  }
);
Switch.displayName = 'Switch';
