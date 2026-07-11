import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { FieldWrapper, type FieldWrapperProps } from '../FieldWrapper';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { format, subDays, startOfMonth, setMonth, setYear } from 'date-fns';
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

  const [view, setView] = useState<'days' | 'months' | 'years'>('days');
  const [calendarMonth, setCalendarMonth] = useState<Date>(value || new Date());
  const [yearPage, setYearPage] = useState<number>(Math.floor((value?.getFullYear() || new Date().getFullYear()) / 12));

  React.useEffect(() => {
    if (value !== undefined) {
      setInternalDate(value);
      setCalendarMonth(value);
    }
  }, [value]);

  const displayValue = value !== undefined ? value : internalDate;

  const handleSelect = (date?: Date) => {
    isSelecting.current = true;
    setInternalDate(date);
    if (date) {
      setCalendarMonth(date);
    }
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
    if (!newOpen) {
      setTimeout(() => setView('days'), 200);
    }
  };

  const currentYear = calendarMonth.getFullYear();

  const handleMonthSelect = (monthIndex: number) => {
    setCalendarMonth(setMonth(calendarMonth, monthIndex));
    setView('days');
  };

  const handleYearSelect = (year: number) => {
    setCalendarMonth(setYear(calendarMonth, year));
    setView('months');
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
            <div className="p-3 w-[270px]">
              <div className={cn(view === 'days' ? "block" : "hidden")}>
                <Calendar
                  mode="single"
                  selected={displayValue}
                  onSelect={handleSelect}
                  month={calendarMonth}
                  onMonthChange={setCalendarMonth}
                  disabled={(date) => {
                    if (disabledDates && disabledDates(date)) return true;
                    if (minDate && date < minDate) return true;
                    if (maxDate && date > maxDate) return true;
                    return false;
                  }}
                  components={{
                    CaptionLabel: () => (
                      <div className="flex gap-1 items-center justify-center text-sm font-medium relative z-50 pointer-events-auto">
                        <span 
                          className="cursor-pointer hover:bg-muted px-1.5 py-0.5 rounded transition-colors"
                          onClick={() => setView('months')}
                        >
                          {format(calendarMonth, 'MMMM')}
                        </span>
                        <span 
                          className="cursor-pointer hover:bg-muted px-1.5 py-0.5 rounded transition-colors"
                          onClick={() => {
                            setYearPage(Math.floor(calendarMonth.getFullYear() / 12));
                            setView('years');
                          }}
                        >
                          {format(calendarMonth, 'yyyy')}
                        </span>
                      </div>
                    )
                  }}
                />
              </div>

              {view === 'months' && (
                <div className="flex flex-col gap-4 py-2">
                  <div className="flex justify-between items-center px-1">
                    <AppButton variant="ghost" size="icon" className="h-7 w-7 p-0 opacity-50 hover:opacity-100" onClick={() => setCalendarMonth(setYear(calendarMonth, currentYear - 1))}>
                      <ChevronLeft className="h-4 w-4" />
                    </AppButton>
                    <span 
                      className="text-sm font-medium cursor-pointer hover:bg-muted px-2 py-1 rounded transition-colors"
                      onClick={() => {
                        setYearPage(Math.floor(currentYear / 12));
                        setView('years');
                      }}
                    >
                      {currentYear}
                    </span>
                    <AppButton variant="ghost" size="icon" className="h-7 w-7 p-0 opacity-50 hover:opacity-100" onClick={() => setCalendarMonth(setYear(calendarMonth, currentYear + 1))}>
                      <ChevronRight className="h-4 w-4" />
                    </AppButton>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <AppButton 
                        key={i} 
                        variant={calendarMonth.getMonth() === i ? "primary" : "ghost"} 
                        className="h-12 w-full font-normal"
                        onClick={() => handleMonthSelect(i)}
                      >
                        {format(new Date(2000, i, 1), 'MMM')}
                      </AppButton>
                    ))}
                  </div>
                </div>
              )}

              {view === 'years' && (
                <div className="flex flex-col gap-4 py-2">
                  <div className="flex justify-between items-center px-1">
                    <AppButton variant="ghost" size="icon" className="h-7 w-7 p-0 opacity-50 hover:opacity-100" onClick={() => setYearPage(yearPage - 1)}>
                      <ChevronLeft className="h-4 w-4" />
                    </AppButton>
                    <span className="text-sm font-medium">
                      {yearPage * 12} - {yearPage * 12 + 11}
                    </span>
                    <AppButton variant="ghost" size="icon" className="h-7 w-7 p-0 opacity-50 hover:opacity-100" onClick={() => setYearPage(yearPage + 1)}>
                      <ChevronRight className="h-4 w-4" />
                    </AppButton>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {Array.from({ length: 12 }).map((_, i) => {
                      const y = yearPage * 12 + i;
                      return (
                        <AppButton 
                          key={y} 
                          variant={currentYear === y ? "primary" : "ghost"} 
                          className="h-12 w-full font-normal"
                          onClick={() => handleYearSelect(y)}
                        >
                          {y}
                        </AppButton>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </FieldWrapper>
  );
}
