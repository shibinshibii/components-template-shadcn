import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { FieldWrapper, type FieldWrapperProps } from '../FieldWrapper';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';

export interface AcademicYearPickerProps extends Omit<FieldWrapperProps, 'children'> {
  value?: string;
  onChange?: (val: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function AcademicYearPicker({
  id, label, description, error, required, tooltip, helperText, className,
  value, onChange, placeholder = "Pick academic year", disabled
}: AcademicYearPickerProps) {
  const [open, setOpen] = useState(false);
  const [decadeStart, setDecadeStart] = useState(Math.floor((new Date().getFullYear()) / 10) * 10);
  const inputId = id || React.useId();

  const handleSelect = (startYear: number) => {
    onChange?.(`${startYear}-${startYear + 1}`);
    setOpen(false);
  };

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
            {value ? value : <span>{placeholder}</span>}
          </button>} />
        <PopoverContent className="w-[320px] p-3" align="start">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setDecadeStart(y => y - 10)}
              className="h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 flex items-center justify-center rounded-md border border-border"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="font-semibold text-sm">{decadeStart}s</div>
            <button
              onClick={() => setDecadeStart(y => y + 10)}
              className="h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 flex items-center justify-center rounded-md border border-border"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {Array.from({ length: 10 }, (_, i) => decadeStart + i).map((y) => {
              const label = `${y}-${y + 1}`;
              const isSelected = value === label;
              return (
                <button
                  key={label}
                  onClick={() => handleSelect(y)}
                  className={cn(
                    "flex h-9 w-full items-center justify-center rounded-md text-sm hover:bg-accent hover:text-accent-foreground",
                    isSelected && "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
                  )}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </PopoverContent>
      </Popover>
    </FieldWrapper>
  );
}
