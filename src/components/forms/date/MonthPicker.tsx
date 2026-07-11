import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { FieldWrapper, type FieldWrapperProps } from '../FieldWrapper';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { format, setMonth, setYear } from 'date-fns';

export interface MonthPickerProps extends Omit<FieldWrapperProps, 'children'> {
  value?: Date;
  onChange?: (date: Date) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function MonthPicker({
  id, label, description, error, required, tooltip, helperText, className,
  value, onChange, placeholder = "Pick a month", disabled
}: MonthPickerProps) {
  const [open, setOpen] = useState(false);
  const [currentYear, setCurrentYear] = useState((value || new Date()).getFullYear());
  const inputId = id || React.useId();

  const months = Array.from({ length: 12 }, (_, i) => {
    const d = new Date();
    d.setMonth(i);
    return format(d, 'MMM');
  });

  const handleSelect = (monthIndex: number) => {
    let newDate = value ? new Date(value) : new Date();
    newDate = setYear(newDate, currentYear);
    newDate = setMonth(newDate, monthIndex);
    onChange?.(newDate);
    setOpen(false);
  };

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
            {value ? format(value, "MMMM yyyy") : <span>{placeholder}</span>}
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-[280px] p-3" align="start">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setCurrentYear(y => y - 1)}
              className="h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 flex items-center justify-center rounded-md border border-border"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="font-semibold text-sm">{currentYear}</div>
            <button
              onClick={() => setCurrentYear(y => y + 1)}
              className="h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 flex items-center justify-center rounded-md border border-border"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {months.map((m, i) => {
              const isSelected = value?.getMonth() === i && value?.getFullYear() === currentYear;
              return (
                <button
                  key={m}
                  onClick={() => handleSelect(i)}
                  className={cn(
                    "flex h-9 w-full items-center justify-center rounded-md text-sm hover:bg-accent hover:text-accent-foreground",
                    isSelected && "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
                  )}
                >
                  {m}
                </button>
              );
            })}
          </div>
        </PopoverContent>
      </Popover>
    </FieldWrapper>
  );
}
