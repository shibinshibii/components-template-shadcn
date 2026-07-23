import React from 'react';
import { cn } from '@/lib/utils';
import { FieldWrapper, type FieldWrapperProps } from '../FieldWrapper';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, Loader2 } from 'lucide-react';

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface AppSelectProps extends Omit<FieldWrapperProps, 'children'> {
  value?: string;
  onChange?: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  loading?: boolean;
  clearable?: boolean;
}

export function AppSelect({
  id, label, description, error, required, tooltip, helperText, className,
  value, onChange, options, placeholder = "Select an option...", disabled, loading, clearable
}: AppSelectProps) {
  const inputId = id || React.useId();
  
  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange?.('');
  };

  return (
    <FieldWrapper id={inputId} label={label} description={description} error={error} required={required} tooltip={tooltip} helperText={helperText} className={className}>
      <div className="relative">
        <Select value={value} onValueChange={(val) => {
          // Defer the state update so the select closes instantly without waiting for a heavy parent re-render
          setTimeout(() => onChange?.(val as string), 0);
        }} disabled={disabled || loading}>
          <SelectTrigger id={inputId} className={cn(error && "border-danger focus:ring-danger", "pr-8 relative")}>
            <div className="flex-1 text-left truncate">
              {loading ? (
                <span className="text-muted-foreground flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin shrink-0" />
                  Loading...
                </span>
              ) : (
                <SelectValue placeholder={placeholder} />
              )}
            </div>
          </SelectTrigger>
          <SelectContent>
            {options.length === 0 ? (
              <div className="p-2 text-center text-sm text-muted-foreground">No options found.</div>
            ) : (
              options.map(opt => (
                <SelectItem key={opt.value} value={opt.value} disabled={opt.disabled}>
                  {opt.label}
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>
        
        {/* Clear Button Overlay */}
        {clearable && value && !disabled && !loading && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-8 top-1/2 -translate-y-1/2 h-5 w-5 rounded-full hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </FieldWrapper>
  );
}
