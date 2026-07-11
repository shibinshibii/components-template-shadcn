import React from 'react';
import { cn } from '@/lib/utils';
import { FieldWrapper, type FieldWrapperProps } from './FieldWrapper';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement>, Omit<FieldWrapperProps, 'children'> {
  loading?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ id, label, description, error, required, tooltip, helperText, className, loading, disabled, ...props }, ref) => {
    const inputId = id || React.useId();
    return (
      <FieldWrapper
        id={inputId} label={label} description={description} error={error}
        required={required} tooltip={tooltip} helperText={helperText} className={className}
      >
        <textarea
          id={inputId}
          ref={ref}
          disabled={disabled || loading}
          className={cn(
            "flex min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-danger focus-visible:ring-danger"
          )}
          {...props}
        />
      </FieldWrapper>
    );
  }
);
Textarea.displayName = 'Textarea';
