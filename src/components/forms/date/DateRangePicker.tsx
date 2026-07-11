import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { FieldWrapper, type FieldWrapperProps } from '../FieldWrapper';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { format, subDays, startOfMonth, endOfMonth, subMonths, getYear } from 'date-fns';
import { type DateRange } from 'react-day-picker';
import { AppButton } from '@/components/ui/app-button';

export interface DateRangePickerProps extends Omit<FieldWrapperProps, 'children'> {
  value?: DateRange;
  onChange?: (range?: DateRange) => void;
  placeholder?: string;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
  presets?: ('today' | 'yesterday' | 'last7' | 'thisMonth' | 'lastMonth' | 'academicYear')[];
}

export function DateRangePicker({
  id, label, description, error, required, tooltip, helperText, className,
  value, onChange, placeholder = "Pick a date range", disabled, minDate, maxDate, presets
}: DateRangePickerProps) {
  const [open, setOpen] = useState(false);
  const inputId = id || React.useId();

  const handlePreset = (preset: string) => {
    const today = new Date();
    switch (preset) {
      case 'today':
        onChange?.({ from: today, to: today });
        break;
      case 'yesterday': {
        const y = subDays(today, 1);
        onChange?.({ from: y, to: y });
        break;
      }
      case 'last7':
        onChange?.({ from: subDays(today, 7), to: today });
        break;
      case 'thisMonth':
        onChange?.({ from: startOfMonth(today), to: endOfMonth(today) });
        break;
      case 'lastMonth': {
        const lm = subMonths(today, 1);
        onChange?.({ from: startOfMonth(lm), to: endOfMonth(lm) });
        break;
      }
      case 'academicYear': {
        const currentYear = getYear(today);
        const startYear = today.getMonth() >= 5 ? currentYear : currentYear - 1; // Assuming June start
        onChange?.({ from: new Date(startYear, 5, 1), to: new Date(startYear + 1, 4, 31) });
        break;
      }
    }
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
              !value?.from && "text-muted-foreground",
              error && "border-danger focus:ring-danger"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4 opacity-50 shrink-0" />
            <span className="truncate">
              {value?.from ? (
                value.to ? (
                  `${format(value.from, "LLL dd, y")} - ${format(value.to, "LLL dd, y")}`
                ) : (
                  format(value.from, "LLL dd, y")
                )
              ) : placeholder}
            </span>
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="flex flex-col sm:flex-row">
            {presets && presets.length > 0 && (
              <div className="border-b sm:border-b-0 sm:border-r border-border p-3 flex flex-row sm:flex-col gap-2 w-full sm:w-[180px] overflow-x-auto">
                {presets.includes('today') && <AppButton variant="ghost" size="sm" className="justify-start font-normal whitespace-nowrap" onClick={() => handlePreset('today')}>Today</AppButton>}
                {presets.includes('yesterday') && <AppButton variant="ghost" size="sm" className="justify-start font-normal whitespace-nowrap" onClick={() => handlePreset('yesterday')}>Yesterday</AppButton>}
                {presets.includes('last7') && <AppButton variant="ghost" size="sm" className="justify-start font-normal whitespace-nowrap" onClick={() => handlePreset('last7')}>Last 7 days</AppButton>}
                {presets.includes('thisMonth') && <AppButton variant="ghost" size="sm" className="justify-start font-normal whitespace-nowrap" onClick={() => handlePreset('thisMonth')}>This Month</AppButton>}
                {presets.includes('lastMonth') && <AppButton variant="ghost" size="sm" className="justify-start font-normal whitespace-nowrap" onClick={() => handlePreset('lastMonth')}>Last Month</AppButton>}
                {presets.includes('academicYear') && <AppButton variant="ghost" size="sm" className="justify-start font-normal whitespace-nowrap" onClick={() => handlePreset('academicYear')}>Current Academic Year</AppButton>}
              </div>
            )}
            <div className="p-3">
              <Calendar
                mode="range"
                selected={value}
                onSelect={onChange}
                numberOfMonths={2}
                disabled={(date) => {
                  if (minDate && date < minDate) return true;
                  if (maxDate && date > maxDate) return true;
                  return false;
                }}
                initialFocus
              />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </FieldWrapper>
  );
}
