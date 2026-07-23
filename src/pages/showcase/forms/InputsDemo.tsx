import { AppLayout } from '@/components/layout/AppLayout';
import { PageTitle, Muted } from '@/components/typography';
import { AppInput, SearchInput } from '@/components/forms/AppInput';
import { Textarea } from '@/components/forms/Textarea';
import { Search, Mail } from 'lucide-react';

export default function InputsDemo() {
  return (
    <AppLayout>
      <div className="p-6 md:p-8 w-full space-y-8 animate-in fade-in duration-500">
        <div>
          <PageTitle>Input Components</PageTitle>
          <Muted>Showcase of various input fields.</Muted>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Standard Inputs</h3>
            <AppInput id="email" label="Email Address" placeholder="Enter your email" type="email" />
            <AppInput id="password" label="Password" placeholder="Enter your password" type="password" error="Password is required" />
            <AppInput id="disabled" label="Disabled Input" placeholder="Cannot type here" disabled />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Advanced Inputs</h3>
            <AppInput id="search-1" label="Search" leftIcon={<Search className="h-4 w-4" />} placeholder="Search..." />
            <AppInput id="icon-email" label="Contact" leftIcon={<Mail className="h-4 w-4" />} placeholder="Email contact" />
            <SearchInput id="search-2" placeholder="Quick search..." />
          </div>

          <div className="space-y-4 md:col-span-2">
            <h3 className="text-lg font-medium">Textarea</h3>
            <div className="max-w-md">
              <Textarea placeholder="Type your message here..." className="h-32" />
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
