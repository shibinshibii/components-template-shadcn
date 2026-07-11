import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { School } from 'lucide-react';

import { AppCard, CardBody } from '@/components/ui/card';
import { PageTitle, Muted, Text } from '@/components/typography';
import { AppInput, PasswordInput } from '@/components/forms';
import { AppButton } from '@/components/ui/app-button';
import { Checkbox } from '@/components/forms/SelectionControls';
import { toast } from '@/components/feedback';

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    }
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Successfully logged in!");
      navigate('/dashboard'); 
    }, 1000);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-muted/20 p-4">
      <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex flex-col items-center mb-8">
          <div className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center mb-4 text-primary-foreground shadow-lg">
            <School className="h-6 w-6" />
          </div>
          <PageTitle className="text-2xl text-center">Welcome Back</PageTitle>
          <Muted className="text-center mt-2">Sign in to your School ERP account</Muted>
        </div>

        <AppCard className="shadow-lg border-border/50">
          <CardBody className="p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <AppInput
                label="Email Address"
                placeholder="admin@school.edu"
                error={errors.email?.message}
                {...register("email")}
              />
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Text className="text-sm font-medium">Password</Text>
                  <a href="#" className="text-sm font-medium text-primary hover:underline" onClick={(e) => { e.preventDefault(); toast.info("Password reset flow coming soon."); }}>
                    Forgot password?
                  </a>
                </div>
                <PasswordInput
                  placeholder="••••••••"
                  error={errors.password?.message}
                  {...register("password")}
                />
              </div>

              <Checkbox
                label="Remember me for 30 days"
                {...register("rememberMe")}
              />

              <AppButton type="submit" fullWidth size="lg" loading={isLoading}>
                Sign In
              </AppButton>
            </form>
          </CardBody>
        </AppCard>
        
        <div className="mt-8 text-center">
          <Muted className="text-sm">
            Don't have an account?{' '}
            <a href="#" className="text-primary font-medium hover:underline" onClick={(e) => { e.preventDefault(); toast.info("Contact administrator for access."); }}>
              Contact Admin
            </a>
          </Muted>
        </div>
      </div>
    </div>
  );
}
