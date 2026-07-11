import React, { useState } from 'react';
import { AppDialog, type AppDialogProps } from './AppDialog';
import { AppButton } from '@/components/ui/app-button';
import { ChevronRight, ChevronLeft } from 'lucide-react';

export interface WizardStep {
  title: string;
  description?: string;
  content: React.ReactNode;
  isValid?: boolean;
}

export interface WizardDialogProps extends Omit<AppDialogProps, 'children' | 'footer' | 'title' | 'description'> {
  steps: WizardStep[];
  onComplete: () => void;
  completeText?: string;
  loading?: boolean;
}

export function WizardDialog({ steps, onComplete, completeText = "Finish", loading, ...dialogProps }: WizardDialogProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) setCurrentStep(c => c + 1);
  };
  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(c => c - 1);
  };

  const step = steps[currentStep];

  // Sync internal state when open changes
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setTimeout(() => setCurrentStep(0), 300); // reset after exit animation
    }
    if (dialogProps.onOpenChange) dialogProps.onOpenChange(open);
  }

  return (
    <AppDialog
      {...dialogProps}
      onOpenChange={handleOpenChange}
      title={step.title}
      description={step.description}
      footer={
        <div className="flex items-center justify-between w-full">
          <div className="flex gap-1 text-sm text-muted-foreground font-medium">
            Step {currentStep + 1} of {steps.length}
          </div>
          <div className="flex items-center gap-2">
            <AppButton variant="outline" onClick={handleBack} disabled={currentStep === 0 || loading}>
               <ChevronLeft className="mr-1 h-4 w-4" /> Back
            </AppButton>
            {currentStep === steps.length - 1 ? (
              <AppButton onClick={onComplete} loading={loading} disabled={step.isValid === false}>
                {completeText}
              </AppButton>
            ) : (
              <AppButton onClick={handleNext} disabled={step.isValid === false}>
                Next <ChevronRight className="ml-1 h-4 w-4" />
              </AppButton>
            )}
          </div>
        </div>
      }
    >
      <div className="min-h-[250px] animate-in fade-in slide-in-from-right-2 duration-300">
        {step.content}
      </div>
    </AppDialog>
  );
}
