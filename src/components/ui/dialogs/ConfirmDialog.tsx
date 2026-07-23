import React from 'react';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { AppButton } from '@/components/ui/app-button';

export interface ConfirmDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: React.ReactNode;
  title: string;
  description: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  loading?: boolean;
  variant?: 'primary' | 'danger';
}

export function ConfirmDialog({
  open, onOpenChange, trigger, title, description, confirmText = "Confirm", cancelText = "Cancel", onConfirm, onCancel, loading, variant = 'primary'
}: ConfirmDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      {trigger && <AlertDialogTrigger render={trigger as React.ReactElement} />}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription render={<div className="mt-2 text-sm text-muted-foreground" />}>
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel} disabled={loading}>{cancelText}</AlertDialogCancel>
          <AppButton 
            variant={variant === 'danger' ? 'danger' : 'primary'} 
            onClick={(e) => {
              e.preventDefault();
              onConfirm();
            }}
            loading={loading}
          >
            {confirmText}
          </AppButton>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function DeleteDialog(props: Omit<ConfirmDialogProps, 'variant' | 'confirmText'> & { itemName?: string }) {
  const { title, description, itemName, ...rest } = props;
  return (
    <ConfirmDialog
      title={title || "Are you absolutely sure?"}
      description={description || (
        <>
          This action cannot be undone. This will permanently delete <strong>{itemName || "this item"}</strong> and remove its data from our servers.
        </>
      )}
      confirmText="Delete"
      variant="danger"
      {...rest}
    />
  );
}
