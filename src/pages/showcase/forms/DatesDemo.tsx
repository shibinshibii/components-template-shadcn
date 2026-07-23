import { AppLayout } from '@/components/layout/AppLayout';
import { PageTitle, Muted } from '@/components/typography';
import { AppDatePicker } from '@/components/forms/date/AppDatePicker';
import { DateTimePicker } from '@/components/forms/date/DateTimePicker';
import { DateRangePicker } from '@/components/forms/date/DateRangePicker';

export default function DatesDemo() {
  return (
    <AppLayout>
      <div className="p-6 md:p-8 w-full space-y-8 animate-in fade-in duration-500">
        <div>
          <PageTitle>Date Pickers</PageTitle>
          <Muted>Showcase of date and time selection components.</Muted>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Single Date Picker</h3>
            <AppDatePicker value={undefined} onChange={() => {}} label="Select Date" />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Date & Time Picker</h3>
            <DateTimePicker value={undefined} onChange={() => {}} label="Select Date & Time" />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Date Range Picker</h3>
            <DateRangePicker value={undefined} onChange={() => {}} label="Select Range" />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
