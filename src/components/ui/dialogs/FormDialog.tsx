import React from 'react';
import { AppDialog, type AppDialogProps } from './AppDialog';
import { AppButton } from '@/components/ui/app-button';

export interface FormDialogProps extends Omit<AppDialogProps, 'footer' | 'children'> {
  onSubmit: (e: React.FormEvent) => void;
  children: React.ReactNode;
  submitText?: string;
  cancelText?: string;
  onCancel?: () => void;
  loading?: boolean;
  disabled?: boolean;
}

export function FormDialog({
  onSubmit, children, submitText = "Save", cancelText = "Cancel", onCancel, loading, disabled, ...dialogProps
}: FormDialogProps) {
  const handleCancel = () => {
    if (onCancel) onCancel();
    else if (dialogProps.onOpenChange) dialogProps.onOpenChange(false);
  };

  return (
    <AppDialog
      {...dialogProps}
      footer={
        <>
          <AppButton type="button" variant="outline" onClick={handleCancel} disabled={loading}>
            {cancelText}
          </AppButton>
          <AppButton type="submit" form="dialog-form" loading={loading} disabled={disabled}>
            {submitText}
          </AppButton>
        </>
      }
    >
      <form id="dialog-form" onSubmit={onSubmit} className="space-y-4">
        {children}
      </form>
    </AppDialog>
  );
}
