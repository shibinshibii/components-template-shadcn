import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { FieldWrapper, type FieldWrapperProps } from '../FieldWrapper';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Check, ChevronDown, X, Loader2, Search } from 'lucide-react';
import { type SelectOption } from './AppSelect';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Skeleton } from '@/components/ui/skeleton';

export interface AsyncSelectProps extends Omit<FieldWrapperProps, 'children'> {
  value?: string;
  onChange?: (value: string) => void;
  fetchOptions: (search: string, page: number) => Promise<{ options: SelectOption[], hasMore: boolean }>;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  disabled?: boolean;
  clearable?: boolean;
}

export function AsyncSelect({
  id, label, description, error, required, tooltip, helperText, className,
  value, onChange, fetchOptions, placeholder = "Select...", searchPlaceholder = "Search...", emptyText = "No results found.", disabled, clearable
}: AsyncSelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [options, setOptions] = useState<SelectOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  
  const [selectedLabel, setSelectedLabel] = useState<string>('');

  const inputId = id || React.useId();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(1);
      setOptions([]);
      setHasMore(true);
      loadOptions(search, 1);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  const loadOptions = async (query: string, pageNum: number) => {
    if (!hasMore && pageNum > 1) return;
    setLoading(true);
    try {
      const res = await fetchOptions(query, pageNum);
      if (pageNum === 1) {
        setOptions(res.options);
      } else {
        setOptions(prev => [...prev, ...res.options]);
      }
      setHasMore(res.hasMore);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const virtualizer = useVirtualizer({
    count: hasMore ? options.length + 1 : options.length,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => 36,
    overscan: 5,
  });

  useEffect(() => {
    const [lastItem] = [...virtualizer.getVirtualItems()].reverse();
    if (!lastItem) return;
    if (lastItem.index >= options.length - 1 && hasMore && !loading) {
      setPage(p => p + 1);
      loadOptions(search, page + 1);
    }
  }, [virtualizer.getVirtualItems(), hasMore, loading]);
  
  useEffect(() => {
    if (value) {
      const found = options.find(o => o.value === value);
      if (found) setSelectedLabel(found.label);
    } else {
      setSelectedLabel('');
    }
  }, [value, options]);

  return (
    <FieldWrapper id={inputId} label={label} description={description} error={error} required={required} tooltip={tooltip} helperText={helperText} className={className}>
      <Popover open={open} onOpenChange={setOpen}>
        <div className="relative">
          <PopoverTrigger render={<button
              id={inputId}
              type="button"
              disabled={disabled}
              className={cn(
                "flex h-10 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                error && "border-danger focus:ring-danger"
              )}
            >
              <div className="flex items-center gap-2 truncate">
                <span className={cn("truncate", !selectedLabel && "text-muted-foreground")}>
                  {selectedLabel || placeholder}
                </span>
              </div>
              <ChevronDown className="h-4 w-4 opacity-50 shrink-0" />
            </button>} />
          
          {clearable && value && !disabled && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onChange?.(''); setSelectedLabel(''); }}
              className="absolute right-8 top-1/2 -translate-y-1/2 h-5 w-5 rounded-full hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
        
        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
          <div className="flex items-center border-b px-3">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <input
              className="flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
              placeholder={searchPlaceholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div ref={scrollRef} className="max-h-[300px] overflow-auto p-1">
            <div style={{ height: `${virtualizer.getTotalSize()}px`, width: '100%', position: 'relative' }}>
              {virtualizer.getVirtualItems().map((virtualItem) => {
                const isLoaderRow = virtualItem.index > options.length - 1;
                const option = options[virtualItem.index];

                return (
                  <div
                    key={virtualItem.index}
                    className="absolute top-0 left-0 w-full px-2"
                    style={{ height: `${virtualItem.size}px`, transform: `translateY(${virtualItem.start}px)` }}
                  >
                    {isLoaderRow ? (
                      hasMore ? (
                        <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
                          <Loader2 className="h-4 w-4 animate-spin mr-2" /> Loading...
                        </div>
                      ) : null
                    ) : (
                      <button
                        onClick={() => {
                          onChange?.(option.value);
                          setSelectedLabel(option.label);
                          setOpen(false);
                        }}
                        className={cn(
                          "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground",
                          value === option.value && "bg-accent text-accent-foreground"
                        )}
                      >
                        {value === option.value && (
                          <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                            <Check className="h-4 w-4" />
                          </span>
                        )}
                        <span className="truncate">{option.label}</span>
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
            
            {options.length === 0 && !loading && (
              <div className="p-4 text-center text-sm text-muted-foreground">{emptyText}</div>
            )}
            {options.length === 0 && loading && (
              <div className="p-4 flex flex-col gap-2">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </FieldWrapper>
  );
}
