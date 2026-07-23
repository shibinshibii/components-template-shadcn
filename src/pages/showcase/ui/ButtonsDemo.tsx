import { AppLayout } from '@/components/layout/AppLayout';
import { PageTitle, Muted } from '@/components/typography';
import { AppButton } from '@/components/ui/app-button';


export default function ButtonsDemo() {
  return (
    <AppLayout>
      <div className="p-6 md:p-8 w-full space-y-8 animate-in fade-in duration-500">
        <div>
          <PageTitle>Buttons</PageTitle>
          <Muted>Various button variants and sizes.</Muted>
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">AppButton Variants</h3>
            <div className="flex flex-wrap gap-4">
              <AppButton variant="primary">Primary</AppButton>
              <AppButton variant="secondary">Secondary</AppButton>
              <AppButton variant="outline">Outline</AppButton>
              <AppButton variant="ghost">Ghost</AppButton>
              <AppButton variant="danger">Danger</AppButton>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">AppButton Sizes</h3>
            <div className="flex flex-wrap items-end gap-4">
              <AppButton size="sm">Small</AppButton>
              <AppButton size="md">Medium</AppButton>
              <AppButton size="lg">Large</AppButton>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">AppButton States</h3>
            <div className="flex flex-wrap gap-4">
              <AppButton loading>Loading</AppButton>
              <AppButton disabled>Disabled</AppButton>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
