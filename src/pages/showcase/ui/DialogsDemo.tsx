import { AppLayout } from '@/components/layout/AppLayout';
import { PageTitle, Muted } from '@/components/typography';
import { AppDialog } from '@/components/ui/dialogs/AppDialog';
import { AppButton } from '@/components/ui/app-button';

export default function DialogsDemo() {
  return (
    <AppLayout>
      <div className="p-6 md:p-8 w-full space-y-8 animate-in fade-in duration-500">
        <div>
          <PageTitle>Dialogs & Drawers</PageTitle>
          <Muted>Modals and slide-outs for focused tasks.</Muted>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Standard Dialog</h3>
            <AppDialog 
              title="Edit Profile" 
              description="Make changes to your profile here."
              trigger={<AppButton>Open Dialog</AppButton>}
            >
              <div className="py-4">
                Dialog content goes here.
              </div>
            </AppDialog>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
