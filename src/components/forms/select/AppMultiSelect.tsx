import React,{ useState } from 'react';
import { cn } from '@/lib/utils';
import { FieldWrapper, type FieldWrapperProps } from '../FieldWrapper';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Check, ChevronDown, X } from 'lucide-react';
import { type SelectOption } from './AppSelect';
import { Badge } from '@/components/ui/badge';

export interface AppMultiSelectProps extends Omit<FieldWrapperProps, 'children'> {
  value?: string[];
  onChange?: (value: string[]) => void;
  options: SelectOption[];
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  disabled?: boolean;
}

export function AppMultiSelect({
  id, label, description, error, required, tooltip, helperText, className,
  value = [], onChange, options, placeholder = "Select items...", searchPlaceholder = "Search...", emptyText = "No results found.", disabled
}: AppMultiSelectProps) {
  const [open, setOpen] = useState(false);
  const inputId = id || React.useId();
  
  const selectedOptions = options.filter(opt => value.includes(opt.value));

  const handleSelect = (val: string) => {
    if (value.includes(val)) {
      onChange?.(value.filter(v => v !== val));
    } else {
      onChange?.([...value, val]);
    }
  };

  const removeOption = (e: React.MouseEvent, val: string) => {
    e.stopPropagation();
    onChange?.(value.filter(v => v !== val));
  };

  return (
    <FieldWrapper id={inputId} label={label} description={description} error={error} required={required} tooltip={tooltip} helperText={helperText} className={className}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            id={inputId}
            type="button"
            disabled={disabled}
            className={cn(
              "flex min-h-[40px] w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-1.5 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
              error && "border-danger focus:ring-danger"
            )}
          >
            <div className="flex flex-wrap items-center gap-1.5 pr-6">
              {selectedOptions.length === 0 && (
                <span className="text-muted-foreground">{placeholder}</span>
              )}
              {selectedOptions.map(opt => (
                <Badge key={opt.value} variant="secondary" className="mr-1 mb-1 rounded-sm px-1.5 font-normal">
                  {opt.label}
                  <div
                    role="button"
                    className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") removeOption(e as any, opt.value);
                    }}
                    onMouseDown={(e) => removeOption(e, opt.value)}
                  >
                    <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                  </div>
                </Badge>
              ))}
            </div>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-50 shrink-0" />
          </button>
        </PopoverTrigger>
        
        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
          <Command>
            <CommandInput placeholder={searchPlaceholder} />
            <CommandList>
              <CommandEmpty>{emptyText}</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.label}
                    onSelect={() => handleSelect(option.value)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value.includes(option.value) ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </FieldWrapper>
  );
}
