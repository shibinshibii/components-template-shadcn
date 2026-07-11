import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { PageTitle, Text, Muted } from '@/components/typography';
import { Button } from '@/components/ui/button';
import { AppInput, Checkbox, Radio, Textarea, FileUpload, AppSelect, AppDatePicker } from '@/components/forms';
import { cn } from '@/lib/utils';
import { Check, ArrowLeft } from 'lucide-react';
import { AppCard } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const steps = [
  { id: 1, title: 'Student Registration' },
  { id: 2, title: 'Basic Details' },
  { id: 3, title: 'Contact Details' },
  { id: 4, title: 'Parents Details' },
];

export default function StudentRegistrationPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, steps.length));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));
  const submitForm = () => navigate('/students');

  return (
    <AppLayout>
      <div className="p-6 md:p-8 w-full max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/students')} className="shrink-0">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <PageTitle>Student Registration</PageTitle>
            <Muted>Add a new student to the system.</Muted>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          {/* Top Steps */}
          <div className="flex items-center w-full px-2 md:px-6">
            {steps.map((step, index) => {
              const isCompleted = step.id < currentStep;
              const isActive = step.id === currentStep;
              return (
                <div key={step.id} className={cn("flex items-center", index < steps.length - 1 ? "flex-1" : "")}>
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors shrink-0",
                      isActive ? "bg-primary text-primary-foreground" :
                      isCompleted ? "bg-primary text-primary-foreground" :
                      "bg-muted text-muted-foreground"
                    )}>
                      {isCompleted ? <Check className="h-4 w-4" /> : step.id}
                    </div>
                    <Text className={cn(
                      "text-sm font-medium transition-colors hidden md:block whitespace-nowrap",
                      (isActive || isCompleted) ? "text-foreground" : "text-muted-foreground"
                    )}>
                      {step.title}
                    </Text>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={cn(
                      "h-[2px] flex-1 mx-2 md:mx-4 transition-colors",
                      isCompleted ? "bg-primary" : "bg-border"
                    )} />
                  )}
                </div>
              );
            })}
          </div>

          {/* Form Content */}
          <AppCard className="flex-1 p-6 md:p-8">
            <div className="mb-6">
              
              {isLoading ? (
                <div className="space-y-6">
                  {currentStep === 1 && (
                     <div className="space-y-6">
                       <div className="flex justify-center mb-8"><Skeleton className="h-32 w-32 rounded-md" /></div>
                       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                         <Skeleton className="h-10 w-full" />
                         <Skeleton className="h-10 w-full" />
                         <Skeleton className="h-10 w-full" />
                       </div>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <Skeleton className="h-10 w-full" />
                         <Skeleton className="h-10 w-full" />
                       </div>
                     </div>
                  )}
                  {currentStep > 1 && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {Array.from({ length: 4 }).map((_, i) => (
                          <Skeleton key={i} className="h-10 w-full" />
                        ))}
                      </div>
                      <Skeleton className="h-24 w-full" />
                    </div>
                  )}
                </div>
              ) : (
                <>
                  {currentStep === 1 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                  <div className="flex justify-center mb-8">
                     <div className="w-full max-w-md">
                        <FileUpload 
                          label="" 
                          helperText="Drag Image or Click to Select a File"
                        />
                     </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
                    <AppInput label="Name " required placeholder="Enter name" className="md:col-span-3" />
                    <AppInput label="Admission No. " required placeholder="e.g. 123 1683" className="md:col-span-3" />
                    
                    <AppDatePicker label="Joining Date" placeholder="DD-MM-YYYY" className="md:col-span-2" />
                    <AppSelect label="Class " required className="md:col-span-2" options={[
                      {label: '1', value: '1'}, {label: '2', value: '2'}, {label: '3', value: '3'},
                      {label: '4', value: '4'}, {label: '5', value: '5'}, {label: '6', value: '6'},
                      {label: '7', value: '7'}, {label: '8', value: '8'}, {label: '9', value: '9'},
                      {label: '10', value: '10'}, {label: '11', value: '11'}, {label: '12', value: '12'}
                    ]} />
                    <AppSelect label="Division " required className="md:col-span-2" options={[
                      {label: 'A', value: 'A'}, {label: 'B', value: 'B'}, 
                      {label: 'C', value: 'C'}, {label: 'D', value: 'D'}
                    ]} />
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <AppDatePicker label="Date of Birth " required placeholder="dd-mm-yyyy" />
                    <AppSelect label="Gender " required options={[
                      {label: 'Male', value: 'male'}, 
                      {label: 'Female', value: 'female'},
                      {label: 'Other', value: 'other'}
                    ]} />
                    
                    <AppInput label="Aadhar No" placeholder="Enter Aadhar No" />
                    <AppInput label="Nationality" placeholder="Enter Nationality" />
                    
                    <AppSelect label="Religion" options={[
                      {label: 'Hindu', value: 'hindu'}, {label: 'Muslim', value: 'muslim'},
                      {label: 'Christian', value: 'christian'}, {label: 'Sikh', value: 'sikh'},
                      {label: 'Other', value: 'other'}
                    ]} />
                    <AppInput label="Cast" placeholder="Enter Cast" />
                    
                    <AppSelect label="Student Category" options={[
                      {label: 'General', value: 'general'}, {label: 'OBC', value: 'obc'},
                      {label: 'SC', value: 'sc'}, {label: 'ST', value: 'st'}
                    ]} />
                    <AppSelect label="Blood Group" options={[
                      {label: 'A+', value: 'A+'}, {label: 'A-', value: 'A-'},
                      {label: 'B+', value: 'B+'}, {label: 'B-', value: 'B-'},
                      {label: 'O+', value: 'O+'}, {label: 'O-', value: 'O-'},
                      {label: 'AB+', value: 'AB+'}, {label: 'AB-', value: 'AB-'}
                    ]} />
                    
                    <AppSelect label="Joining Class" options={[
                      {label: '1', value: '1'}, {label: '2', value: '2'}, {label: '3', value: '3'},
                      {label: '4', value: '4'}, {label: '5', value: '5'}, {label: '6', value: '6'},
                      {label: '7', value: '7'}, {label: '8', value: '8'}, {label: '9', value: '9'},
                      {label: '10', value: '10'}, {label: '11', value: '11'}, {label: '12', value: '12'}
                    ]} />
                    <AppInput label="Mother Tongue" placeholder="Enter Mother Tongue" />
                    
                    <AppInput label="Annual Income" placeholder="₹" className="md:col-span-2" />
                    
                    <AppInput label="Identification Mark" placeholder="Enter Identification Mark" />
                    <AppInput label="Note/Description" placeholder="Enter Note" />
                  </div>
                  <div className="flex gap-8 mt-4">
                    <Checkbox label="Minority?" />
                    <Checkbox label="Is disabled" />
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <AppInput label="Telephone No" placeholder="Enter Telephone No" />
                    <AppInput label="Student Mobile No." placeholder="Enter Mobile No" />
                    <AppInput label="Email" type="email" placeholder="Enter Email" />
                    <Textarea label="Permanent Address" placeholder="Enter Permanent Address" />
                  </div>
                  
                  <Checkbox label="Check if permanent address is same as temporary" className="my-4" />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="col-start-2">
                       <Textarea label="Temporary Address" placeholder="Enter Temporary Address" />
                    </div>
                  </div>
                  
                  <Checkbox label="Show Bus Fee Details" className="mt-4" />
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <AppInput label="Father's Name" />
                    <AppInput label="Father's Occupation" />
                    <AppInput label="Father's Mobile" />
                    
                    <AppInput label="Mother's Name" />
                    <AppInput label="Mother's Occupation" />
                    <AppInput label="Mother's Mobile" />
                  </div>

                  <div className="flex items-center gap-4 py-4">
                    <Text className="text-sm font-medium">If Guardian Is</Text>
                    <div className="flex items-center gap-4">
                      <Radio name="guardian" label="Father" />
                      <Radio name="guardian" label="Mother" />
                      <Radio name="guardian" label="Others" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <AppInput label="Guardian's Name " required />
                    <AppInput label="Guardian's Occupation" />
                    <AppInput label="Guardian's Mobile " required />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <AppInput label="Guardian email" />
                    <Textarea label="Guardian Address" />
                  </div>
                </div>
              )}
                </>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-border">
              {currentStep > 1 ? (
                <Button variant="outline" onClick={prevStep}>
                  BACK
                </Button>
              ) : (
                <div></div>
              )}
              
              {currentStep < steps.length ? (
                <Button onClick={nextStep}>
                  NEXT
                </Button>
              ) : (
                <Button onClick={submitForm} className="bg-success hover:bg-success/90 text-white">
                  REGISTER STUDENT
                </Button>
              )}
            </div>
          </AppCard>
        </div>
      </div>
    </AppLayout>
  );
}
