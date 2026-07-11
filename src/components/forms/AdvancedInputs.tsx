import React from 'react';
import { cn } from '@/lib/utils';
import { FieldWrapper, type FieldWrapperProps } from './FieldWrapper';
import { Star } from 'lucide-react';

export interface AdvancedInputProps extends React.InputHTMLAttributes<HTMLInputElement>, Omit<FieldWrapperProps, 'children'> {}

// Slider
export const Slider = React.forwardRef<HTMLInputElement, AdvancedInputProps>(
  ({ id, label, description, error, required, tooltip, helperText, className, ...props }, ref) => {
    const inputId = id || React.useId();
    return (
      <FieldWrapper id={inputId} label={label} description={description} error={error} required={required} tooltip={tooltip} helperText={helperText} className={className}>
        <div className="pt-2">
          <input
            type="range"
            id={inputId}
            ref={ref}
            className="w-full h-2 bg-input rounded-lg appearance-none cursor-pointer accent-primary focus:outline-none focus:ring-2 focus:ring-ring"
            {...props}
          />
        </div>
      </FieldWrapper>
    );
  }
);
Slider.displayName = 'Slider';

// Rating (Controlled component structure)
export interface RatingProps extends Omit<FieldWrapperProps, 'children'> {
  value?: number;
  onChange?: (value: number) => void;
  max?: number;
  name?: string;
}
export const Rating = React.forwardRef<HTMLDivElement, RatingProps>(
  ({ id, label, description, error, required, tooltip, helperText, className, value = 0, onChange, max = 5, name }, ref) => {
    const inputId = id || React.useId();
    return (
      <FieldWrapper id={inputId} label={label} description={description} error={error} required={required} tooltip={tooltip} helperText={helperText} className={className}>
        <div ref={ref} className="flex items-center gap-1">
          {Array.from({ length: max }).map((_, i) => {
            const val = i + 1;
            return (
              <button
                key={val}
                type="button"
                onClick={() => onChange?.(val)}
                className={cn("focus:outline-none transition-colors hover:scale-110", val <= value ? "text-warning" : "text-input")}
              >
                <Star className="h-6 w-6 fill-current" />
              </button>
            );
          })}
          {name && <input type="hidden" name={name} value={value} />}
        </div>
      </FieldWrapper>
    );
  }
);
Rating.displayName = 'Rating';

// ColorPicker
export const ColorPicker = React.forwardRef<HTMLInputElement, AdvancedInputProps>(
  ({ id, label, description, error, required, tooltip, helperText, className, ...props }, ref) => {
    const inputId = id || React.useId();
    return (
      <FieldWrapper id={inputId} label={label} description={description} error={error} required={required} tooltip={tooltip} helperText={helperText} className={className}>
        <div className="flex items-center gap-3">
          <input
            type="color"
            id={inputId}
            ref={ref}
            className="h-10 w-16 cursor-pointer rounded-md border border-input p-1 focus:outline-none focus:ring-2 focus:ring-ring bg-transparent"
            {...props}
          />
          <div className="text-sm font-mono text-muted-foreground uppercase">{props.value || '#000000'}</div>
        </div>
      </FieldWrapper>
    );
  }
);
ColorPicker.displayName = 'ColorPicker';
