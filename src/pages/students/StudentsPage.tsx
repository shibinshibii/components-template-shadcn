import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { PageTitle, Muted } from '@/components/typography';
import { Button } from '@/components/ui/button';
import { DataTable, DataTableColumnHeader } from '@/components/tables';
import { Badge } from '@/components/ui/badge';
import { Plus, Eye, Edit, Trash } from 'lucide-react';
import type { ColumnDef } from '@tanstack/react-table';

export type Student = {
  id: string;
  name: string;
  admissionNo: string;
  class: string;
  division: string;
  gender: string;
  status: 'active' | 'inactive';
};

const mockStudents: Student[] = [
  { id: '1', name: 'John Doe', admissionNo: '1683', class: '10', division: 'A', gender: 'Male', status: 'active' },
  { id: '2', name: 'Jane Smith', admissionNo: '1684', class: '10', division: 'B', gender: 'Female', status: 'active' },
  { id: '3', name: 'Alex Johnson', admissionNo: '1685', class: '9', division: 'A', gender: 'Male', status: 'inactive' },
];

export default function StudentsPage() {
  const navigate = useNavigate();
  const [data, setData] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setData(mockStudents);
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const columns: ColumnDef<Student>[] = [
    {
      accessorKey: 'admissionNo',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Adm No" />,
      cell: ({ row }) => <div className="font-medium">{row.getValue('admissionNo')}</div>,
    },
    {
      accessorKey: 'name',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
    },
    {
      accessorKey: 'class',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Class" />,
      cell: ({ row }) => `${row.getValue('class')} - ${row.original.division}`,
    },
    {
      accessorKey: 'gender',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Gender" />,
    },
    {
      accessorKey: 'status',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
      cell: ({ row }) => {
        const status = row.getValue('status') as string;
        return (
          <Badge variant={status === 'active' ? 'default' : 'secondary'}>
            {status}
          </Badge>
        );
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => navigate(`/students/${row.original.id}`)}>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </Button>
            <Button variant="ghost" size="icon">
              <Edit className="h-4 w-4 text-muted-foreground" />
            </Button>
            <Button variant="ghost" size="icon">
              <Trash className="h-4 w-4 text-danger" />
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <AppLayout>
      <div className="p-6 md:p-8 w-full space-y-6 animate-in fade-in duration-500">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <PageTitle>Students</PageTitle>
            <Muted>Manage student records, admissions, and details.</Muted>
          </div>
          <Button onClick={() => navigate('/students/new')} className="gap-2 shrink-0">
            <Plus className="h-4 w-4" /> Add Student
          </Button>
        </div>

        <div className="w-full">
          <DataTable
            columns={columns}
            data={data}
            searchKey="name"
            loading={isLoading}
          />
        </div>
      </div>
    </AppLayout>
  );
}
