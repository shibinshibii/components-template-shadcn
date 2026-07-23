import { AppLayout } from '@/components/layout/AppLayout';
import { PageTitle, Muted } from '@/components/typography';
import { Checkbox } from '@/components/ui/checkbox';

export default function ControlsDemo() {
  return (
    <AppLayout>
      <div className="p-6 md:p-8 w-full space-y-8 animate-in fade-in duration-500">
        <div>
          <PageTitle>Controls</PageTitle>
          <Muted>Showcase of checkboxes, switches, and radios.</Muted>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Checkboxes</h3>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Accept terms and conditions
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="disabled" disabled />
              <label
                htmlFor="disabled"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Disabled checkbox
              </label>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
