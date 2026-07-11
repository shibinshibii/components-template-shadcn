import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { FieldWrapper, type FieldWrapperProps } from '../FieldWrapper';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { format, startOfWeek, endOfWeek } from 'date-fns';
import { type DateRange } from 'react-day-picker';

export interface WeekPickerProps extends Omit<FieldWrapperProps, 'children'> {
  value?: Date; // Represents start of the selected week
  onChange?: (weekStart: Date) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function WeekPicker({
  id, label, description, error, required, tooltip, helperText, className,
  value, onChange, placeholder = "Pick a week", disabled
}: WeekPickerProps) {
  const [open, setOpen] = useState(false);
  const inputId = id || React.useId();

  const handleSelect = (date?: Date) => {
    if (!date) return;
    onChange?.(startOfWeek(date));
    setOpen(false);
  };

  const selectedRange: DateRange | undefined = value ? {
    from: value,
    to: endOfWeek(value)
  } : undefined;

  return (
    <FieldWrapper id={inputId} label={label} description={description} error={error} required={required} tooltip={tooltip} helperText={helperText} className={className}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            id={inputId}
            disabled={disabled}
            className={cn(
              "flex h-10 w-full items-center justify-start rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
              !value && "text-muted-foreground",
              error && "border-danger focus:ring-danger"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4 opacity-50 shrink-0" />
            <span className="truncate">
              {value ? `${format(value, "LLL dd")} - ${format(endOfWeek(value), "LLL dd, yyyy")}` : placeholder}
            </span>
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={value}
            onSelect={handleSelect}
            showWeekNumber
            modifiers={selectedRange ? {
              selected: [selectedRange.from!, { from: selectedRange.from!, to: selectedRange.to! }]
            } : undefined}
            modifiersStyles={{
              selected: { backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </FieldWrapper>
  );
}
