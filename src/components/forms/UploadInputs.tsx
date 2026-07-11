import React from 'react';
import { cn } from '@/lib/utils';
import { FieldWrapper, type FieldWrapperProps } from './FieldWrapper';
import { Text, Muted } from '@/components/typography';
import { UploadCloud, Image as ImageIcon } from 'lucide-react';

export interface UploadProps extends React.InputHTMLAttributes<HTMLInputElement>, Omit<FieldWrapperProps, 'children'> {}

export const FileUpload = React.forwardRef<HTMLInputElement, UploadProps>(
  ({ id, label, description, error, required, tooltip, helperText, className, disabled, ...props }, ref) => {
    const inputId = id || React.useId();
    return (
      <FieldWrapper id={inputId} label={label} description={description} error={error} required={required} tooltip={tooltip} helperText={helperText} className={className}>
        <div className={cn("mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-input border-dashed rounded-md transition-colors bg-surface hover:border-primary/50", disabled && "opacity-50 cursor-not-allowed hover:border-input")}>
          <div className="space-y-2 text-center">
            <UploadCloud className="mx-auto h-10 w-10 text-muted-foreground" />
            <div className="flex text-sm text-foreground justify-center">
              <label htmlFor={inputId} className={cn("relative cursor-pointer rounded-md font-medium text-primary hover:text-primary/80 focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2", disabled && "pointer-events-none")}>
                <span>Upload a file</span>
                <input id={inputId} ref={ref} type="file" className="sr-only" disabled={disabled} {...props} />
              </label>
              <Text className="pl-1 text-sm">or drag and drop</Text>
            </div>
            <Muted className="text-xs">Any format up to 10MB</Muted>
          </div>
        </div>
      </FieldWrapper>
    );
  }
);
FileUpload.displayName = 'FileUpload';

export const AvatarUpload = React.forwardRef<HTMLInputElement, UploadProps>(
  ({ id, label, description, error, required, tooltip, helperText, className, disabled, ...props }, ref) => {
    const inputId = id || React.useId();
    return (
      <FieldWrapper id={inputId} label={label} description={description} error={error} required={required} tooltip={tooltip} helperText={helperText} className={className}>
        <div className="flex items-center gap-5">
          <div className="h-20 w-20 rounded-full border border-input bg-surface flex items-center justify-center overflow-hidden shrink-0">
            <ImageIcon className="h-8 w-8 text-muted-foreground" />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor={inputId} className={cn("cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring border border-input bg-background hover:bg-muted text-foreground h-9 px-4 shadow-sm", disabled && "opacity-50 pointer-events-none")}>
              Change Avatar
              <input id={inputId} ref={ref} type="file" accept="image/*" className="sr-only" disabled={disabled} {...props} />
            </label>
            <Muted className="text-xs">JPG, GIF or PNG. Max size of 800K</Muted>
          </div>
        </div>
      </FieldWrapper>
    );
  }
);
AvatarUpload.displayName = 'AvatarUpload';
