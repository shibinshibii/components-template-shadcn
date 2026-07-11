import React from 'react';
import { cn } from '@/lib/utils';
import { FieldWrapper, type FieldWrapperProps } from '../FieldWrapper';
import { Clock } from 'lucide-react';

export interface TimePickerProps extends React.InputHTMLAttributes<HTMLInputElement>, Omit<FieldWrapperProps, 'children'> {}

export const TimePicker = React.forwardRef<HTMLInputElement, TimePickerProps>(
  ({ id, label, description, error, required, tooltip, helperText, className, disabled, ...props }, ref) => {
    const inputId = id || React.useId();
    return (
      <FieldWrapper id={inputId} label={label} description={description} error={error} required={required} tooltip={tooltip} helperText={helperText} className={className}>
        <div className="relative flex items-center w-full">
          <Clock className="absolute left-3 h-4 w-4 text-muted-foreground pointer-events-none" />
          <input
            id={inputId}
            type="time"
            ref={ref}
            disabled={disabled}
            className={cn(
              "flex h-10 w-full rounded-md border border-input bg-transparent pl-9 pr-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
              error && "border-danger focus-visible:ring-danger"
            )}
            {...props}
          />
        </div>
      </FieldWrapper>
    );
  }
);
TimePicker.displayName = 'TimePicker';
