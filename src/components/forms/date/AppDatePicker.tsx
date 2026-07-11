import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { FieldWrapper, type FieldWrapperProps } from '../FieldWrapper';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { format, subDays, startOfMonth } from 'date-fns';
import { AppButton } from '@/components/ui/app-button';

export interface AppDatePickerProps extends Omit<FieldWrapperProps, 'children'> {
  value?: Date;
  onChange?: (date?: Date) => void;
  placeholder?: string;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: (date: Date) => boolean;
  presets?: ('today' | 'yesterday' | 'thisMonth')[];
}

export function AppDatePicker({
  id, label, description, error, required, tooltip, helperText, className,
  value, onChange, placeholder = "Pick a date", disabled,
  minDate, maxDate, disabledDates, presets
}: AppDatePickerProps) {
  const [open, setOpen] = useState(false);
  const [internalDate, setInternalDate] = useState<Date | undefined>(value);
  const isSelecting = React.useRef(false);
  const inputId = id || React.useId();

  React.useEffect(() => {
    if (value !== undefined) {
      setInternalDate(value);
    }
  }, [value]);

  const displayValue = value !== undefined ? value : internalDate;

  const handleSelect = (date?: Date) => {
    isSelecting.current = true;
    setInternalDate(date);
    onChange?.(date);
    setOpen(false);
    
    // Release the lock after a short delay so ghost events don't reopen the popover
    setTimeout(() => {
      isSelecting.current = false;
    }, 200);
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (isSelecting.current && newOpen) return;
    setOpen(newOpen);
  };

  return (
    <FieldWrapper id={inputId} label={label} description={description} error={error} required={required} tooltip={tooltip} helperText={helperText} className={className}>
      <Popover open={open} onOpenChange={handleOpenChange}>
        <PopoverTrigger
          id={inputId}
          disabled={disabled}
          className={cn(
            "flex h-10 w-full items-center justify-start rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            !displayValue && "text-muted-foreground",
            error && "border-danger focus:ring-danger"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4 opacity-50 shrink-0" />
          {displayValue ? format(displayValue, "PPP") : <span>{placeholder}</span>}
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start" onClick={(e) => e.stopPropagation()}>
          <div className="flex">
            {presets && presets.length > 0 && (
              <div className="border-r border-border p-3 flex flex-col gap-2 w-[140px]">
                {presets.includes('today') && <AppButton variant="ghost" size="sm" className="justify-start font-normal" onClick={() => handleSelect(new Date())}>Today</AppButton>}
                {presets.includes('yesterday') && <AppButton variant="ghost" size="sm" className="justify-start font-normal" onClick={() => handleSelect(subDays(new Date(), 1))}>Yesterday</AppButton>}
                {presets.includes('thisMonth') && <AppButton variant="ghost" size="sm" className="justify-start font-normal" onClick={() => handleSelect(startOfMonth(new Date()))}>This Month</AppButton>}
              </div>
            )}
            <div className="p-3">
              <Calendar
                mode="single"
                selected={displayValue}
                onSelect={handleSelect}
                disabled={(date) => {
                  if (disabledDates && disabledDates(date)) return true;
                  if (minDate && date < minDate) return true;
                  if (maxDate && date > maxDate) return true;
                  return false;
                }}
              />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </FieldWrapper>
  );
}
