import { AppLayout } from '@/components/layout/AppLayout';
import { PageTitle, Muted } from '@/components/typography';
import { DataTable } from '@/components/tables/DataTable';
import { type ColumnDef } from '@tanstack/react-table';

interface DemoData {
  id: string;
  name: string;
  status: string;
}

const data: DemoData[] = [
  { id: '1', name: 'John Doe', status: 'Active' },
  { id: '2', name: 'Jane Smith', status: 'Inactive' },
];

const columns: ColumnDef<DemoData>[] = [
  { accessorKey: 'id', header: 'ID' },
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'status', header: 'Status' },
];

export default function TablesDemo() {
  return (
    <AppLayout>
      <div className="p-6 md:p-8 w-full space-y-8 animate-in fade-in duration-500">
        <div>
          <PageTitle>Tables</PageTitle>
          <Muted>Data grid and tabular presentation components.</Muted>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Data Table</h3>
          <DataTable columns={columns} data={data} searchKey="name" />
        </div>
      </div>
    </AppLayout>
  );
}
