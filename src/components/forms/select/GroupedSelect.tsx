import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { FieldWrapper, type FieldWrapperProps } from '../FieldWrapper';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Check, ChevronDown, X } from 'lucide-react';
import { type SelectOption } from './AppSelect';

export interface GroupedSelectOption {
  group: string;
  items: SelectOption[];
}

export interface GroupedSelectProps extends Omit<FieldWrapperProps, 'children'> {
  value?: string;
  onChange?: (value: string) => void;
  options: GroupedSelectOption[];
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  disabled?: boolean;
  clearable?: boolean;
}

export function GroupedSelect({
  id, label, description, error, required, tooltip, helperText, className,
  value, onChange, options, placeholder = "Select...", searchPlaceholder = "Search...", emptyText = "No results found.", disabled, clearable
}: GroupedSelectProps) {
  const [open, setOpen] = useState(false);
  const inputId = id || React.useId();
  
  let selectedOption: SelectOption | undefined;
  for (const group of options) {
    const found = group.items.find(opt => opt.value === value);
    if (found) {
      selectedOption = found;
      break;
    }
  }

  return (
    <FieldWrapper id={inputId} label={label} description={description} error={error} required={required} tooltip={tooltip} helperText={helperText} className={className}>
      <Popover open={open} onOpenChange={setOpen}>
        <div className="relative">
          <PopoverTrigger asChild>
            <button
              id={inputId}
              type="button"
              disabled={disabled}
              className={cn(
                "flex h-10 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                error && "border-danger focus:ring-danger"
              )}
            >
              <div className="flex items-center gap-2 truncate">
                <span className={cn("truncate", !selectedOption && "text-muted-foreground")}>
                  {selectedOption ? selectedOption.label : placeholder}
                </span>
              </div>
              <ChevronDown className="h-4 w-4 opacity-50 shrink-0" />
            </button>
          </PopoverTrigger>
          
          {clearable && value && !disabled && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onChange?.(''); }}
              className="absolute right-8 top-1/2 -translate-y-1/2 h-5 w-5 rounded-full hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
        
        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
          <Command>
            <CommandInput placeholder={searchPlaceholder} />
            <CommandList>
              <CommandEmpty>{emptyText}</CommandEmpty>
              {options.map((group) => (
                <CommandGroup key={group.group} heading={group.group}>
                  {group.items.map((option) => (
                    <CommandItem
                      key={option.value}
                      value={option.label}
                      onSelect={() => {
                        onChange?.(option.value);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === option.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {option.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </FieldWrapper>
  );
}
