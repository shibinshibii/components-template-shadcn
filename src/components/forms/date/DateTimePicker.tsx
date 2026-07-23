import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { FieldWrapper, type FieldWrapperProps } from '../FieldWrapper';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';

export interface DateTimePickerProps extends Omit<FieldWrapperProps, 'children'> {
  value?: Date;
  onChange?: (date?: Date) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function DateTimePicker({
  id, label, description, error, required, tooltip, helperText, className,
  value, onChange, placeholder = "Pick date and time", disabled
}: DateTimePickerProps) {
  const [open, setOpen] = useState(false);
  const inputId = id || React.useId();

  const handleDateSelect = (date?: Date) => {
    if (!date) {
      onChange?.(undefined);
      return;
    }
    if (value) {
      date.setHours(value.getHours(), value.getMinutes());
    }
    onChange?.(date);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!value) return;
    const [hours, minutes] = e.target.value.split(':');
    const newDate = new Date(value.getTime());
    newDate.setHours(parseInt(hours, 10), parseInt(minutes, 10));
    onChange?.(newDate);
  };

  const timeValue = value ? format(value, 'HH:mm') : '';

  return (
    <FieldWrapper id={inputId} label={label} description={description} error={error} required={required} tooltip={tooltip} helperText={helperText} className={className}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger render={<button
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
              {value ? format(value, "PPP HH:mm") : placeholder}
            </span>
          </button>} />
        <PopoverContent className="w-auto p-0" align="start">
          <div className="p-3">
            <Calendar
              mode="single"
              selected={value}
              onSelect={handleDateSelect}

            />
            <div className="mt-4 border-t border-border pt-4">
              <div className="flex items-center gap-2 px-2">
                <Clock className="h-4 w-4 text-muted-foreground shrink-0" />
                <input
                  type="time"
                  value={timeValue}
                  onChange={handleTimeChange}
                  disabled={!value}
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </FieldWrapper>
  );
}
