import React from 'react';
import { cn } from '@/lib/utils';
import { Info } from 'lucide-react';
import { Label, Muted, Caption } from '@/components/typography';

export interface FieldWrapperProps {
  id?: string;
  label?: React.ReactNode;
  description?: React.ReactNode;
  error?: string;
  required?: boolean;
  tooltip?: React.ReactNode;
  helperText?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function FieldWrapper({
  id,
  label,
  description,
  error,
  required,
  tooltip,
  helperText,
  children,
  className,
}: FieldWrapperProps) {
  return (
    <div className={cn("space-y-1.5 w-full", className)}>
      {label && (
        <div className="flex items-center gap-1.5 min-h-[20px]">
          <Label htmlFor={id} className="font-semibold">{label}</Label>
          {required && <span className="text-danger text-[12px] leading-none">*</span>}
          {tooltip && (
            <div className="group relative flex items-center" title={typeof tooltip === 'string' ? tooltip : undefined}>
              <Info className="h-4 w-4 text-muted-foreground hover:text-foreground cursor-help" />
            </div>
          )}
        </div>
      )}
      {description && <Muted className="text-xs">{description}</Muted>}
      
      {children}
      
      {error && <Caption className="text-danger font-medium">{error}</Caption>}
      {!error && helperText && <Caption>{helperText}</Caption>}
    </div>
  );
}
