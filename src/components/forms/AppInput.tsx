import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { FieldWrapper, type FieldWrapperProps } from './FieldWrapper';
import { Eye, EyeOff, Search, DollarSign, Mail, Phone, Loader2 } from 'lucide-react';

export interface AppInputProps extends React.InputHTMLAttributes<HTMLInputElement>, Omit<FieldWrapperProps, 'children'> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  loading?: boolean;
}

export const AppInput = React.forwardRef<HTMLInputElement, AppInputProps>(
  ({ id, label, description, error, required, tooltip, helperText, className, leftIcon, rightIcon, loading, disabled, ...props }, ref) => {
    const inputId = id || React.useId();
    
    return (
      <FieldWrapper
        id={inputId}
        label={label}
        description={description}
        error={error}
        required={required}
        tooltip={tooltip}
        helperText={helperText}
        className={className}
      >
        <div className="relative flex items-center w-full">
          {leftIcon && (
            <div className="absolute left-3 flex items-center text-muted-foreground pointer-events-none">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            disabled={disabled || loading}
            className={cn(
              "flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
              leftIcon && "pl-9",
              (rightIcon || loading) && "pr-9",
              error && "border-danger focus-visible:ring-danger"
            )}
            {...props}
          />
          {(rightIcon || loading) && (
            <div className="absolute right-3 flex items-center text-muted-foreground">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : rightIcon}
            </div>
          )}
        </div>
      </FieldWrapper>
    );
  }
);
AppInput.displayName = 'AppInput';

export const PasswordInput = React.forwardRef<HTMLInputElement, AppInputProps>((props, ref) => {
  const [show, setShow] = useState(false);
  return (
    <AppInput
      {...props}
      ref={ref}
      type={show ? 'text' : 'password'}
      rightIcon={
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="pointer-events-auto hover:text-foreground focus:outline-none"
          tabIndex={-1}
        >
          {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      }
    />
  );
});
PasswordInput.displayName = 'PasswordInput';

export const EmailInput = React.forwardRef<HTMLInputElement, AppInputProps>((props, ref) => (
  <AppInput type="email" leftIcon={<Mail className="h-4 w-4" />} {...props} ref={ref} />
));
EmailInput.displayName = 'EmailInput';

export const PhoneInput = React.forwardRef<HTMLInputElement, AppInputProps>((props, ref) => (
  <AppInput type="tel" leftIcon={<Phone className="h-4 w-4" />} {...props} ref={ref} />
));
PhoneInput.displayName = 'PhoneInput';

export const NumberInput = React.forwardRef<HTMLInputElement, AppInputProps>((props, ref) => (
  <AppInput type="number" {...props} ref={ref} />
));
NumberInput.displayName = 'NumberInput';

export const CurrencyInput = React.forwardRef<HTMLInputElement, AppInputProps>((props, ref) => (
  <AppInput type="number" leftIcon={<DollarSign className="h-4 w-4" />} {...props} ref={ref} />
));
CurrencyInput.displayName = 'CurrencyInput';

export const SearchInput = React.forwardRef<HTMLInputElement, AppInputProps>((props, ref) => (
  <AppInput type="search" leftIcon={<Search className="h-4 w-4" />} {...props} ref={ref} />
));
SearchInput.displayName = 'SearchInput';

export const OTPInput = React.forwardRef<HTMLInputElement, AppInputProps>((props, ref) => (
  <AppInput className={cn("text-center tracking-[0.5em] text-lg font-mono", props.className)} maxLength={6} {...props} ref={ref} />
));
OTPInput.displayName = 'OTPInput';
