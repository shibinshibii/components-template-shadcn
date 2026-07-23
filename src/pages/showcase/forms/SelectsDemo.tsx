import { AppLayout } from '@/components/layout/AppLayout';
import { PageTitle, Muted } from '@/components/typography';
import { AppSelect } from '@/components/forms/select/AppSelect';
import { AppMultiSelect } from '@/components/forms/select/AppMultiSelect';

export default function SelectsDemo() {
  const options = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'cherry', label: 'Cherry' },
  ];

  return (
    <AppLayout>
      <div className="p-6 md:p-8 w-full space-y-8 animate-in fade-in duration-500">
        <div>
          <PageTitle>Select Components</PageTitle>
          <Muted>Showcase of various select dropdowns.</Muted>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Standard Select</h3>
            <AppSelect 
              options={options} 
              value={undefined}
              onChange={() => {}} 
              placeholder="Select a fruit" 
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Multi Select</h3>
            <AppMultiSelect 
              options={options} 
              value={[]} 
              onChange={() => {}} 
              placeholder="Select multiple fruits" 
            />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
