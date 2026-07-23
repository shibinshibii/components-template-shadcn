import { AppLayout } from '@/components/layout/AppLayout';
import { PageTitle, Muted } from '@/components/typography';
import { FormErrorAlert, SuccessAlert } from '@/components/feedback/Alerts';
import { Spinner } from '@/components/feedback/Loaders';
import { EmptyState, ErrorState } from '@/components/feedback/States';

export default function FeedbackDemo() {
  return (
    <AppLayout>
      <div className="p-6 md:p-8 w-full space-y-8 animate-in fade-in duration-500">
        <div>
          <PageTitle>Feedback & States</PageTitle>
          <Muted>Alerts, loaders, and state illustrations.</Muted>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Alerts</h3>
            <div className="space-y-4">
              <FormErrorAlert message="This is an error message." />
              <SuccessAlert message="Action completed successfully." />
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-medium">Loaders</h3>
            <div className="flex gap-8 items-center p-4 border rounded-md">
              <Spinner size="sm" />
              <Spinner size="md" />
              <Spinner size="lg" />
            </div>
          </div>

          <div className="space-y-6 lg:col-span-2">
            <h3 className="text-lg font-medium">States</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-md p-4">
                <EmptyState title="No items found" description="Try creating a new item." />
              </div>
              <div className="border rounded-md p-4">
                <ErrorState title="Failed to load data" description="Please try again later." />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
