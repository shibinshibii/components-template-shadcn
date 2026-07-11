import React, { useState, useRef } from "react"
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  getFilteredRowModel,
  type ColumnFiltersState,
  type VisibilityState,
} from "@tanstack/react-table"
import { useVirtualizer } from "@tanstack/react-virtual"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DataTablePagination } from "./DataTablePagination"
import { DataTableToolbar } from "./DataTableToolbar"
import { Skeleton } from "@/components/ui/skeleton"
import { EmptyCard } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  searchKey?: string
  loading?: boolean
  error?: Error | null
  onExport?: () => void
  onBulkDelete?: (rows: TData[]) => void
  virtualized?: boolean
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchKey,
  loading,
  error,
  onExport,
  onBulkDelete,
  virtualized = false
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [density, setDensity] = useState<'compact' | 'standard' | 'relaxed'>('standard')

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  const { rows } = table.getRowModel()
  
  // Virtualizer setup
  const tableContainerRef = useRef<HTMLDivElement>(null)
  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => tableContainerRef.current,
    estimateSize: () => density === 'compact' ? 36 : density === 'relaxed' ? 60 : 48,
    overscan: 10,
  })

  // Dynamic padding based on density
  const cellPadding = density === 'compact' ? 'py-1.5 px-4' : density === 'relaxed' ? 'py-4 px-4' : 'py-3 px-4'

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-danger bg-danger/10 rounded-xl border border-danger/20">
        <AlertCircle className="h-8 w-8 mb-2" />
        <Text className="font-semibold">Failed to load data.</Text>
        <Muted className="text-sm opacity-80">{error.message}</Muted>
      </div>
    )
  }

  const virtualItems = rowVirtualizer.getVirtualItems()
  const paddingTop = virtualItems.length > 0 ? virtualItems[0]?.start || 0 : 0
  const paddingBottom = virtualItems.length > 0 ? rowVirtualizer.getTotalSize() - (virtualItems[virtualItems.length - 1]?.end || 0) : 0

  return (
    <div className="space-y-4 w-full">
      <DataTableToolbar 
        table={table} 
        searchKey={searchKey} 
        density={density} 
        setDensity={setDensity} 
        onExport={onExport} 
        onBulkDelete={onBulkDelete} 
      />
      <div 
        ref={tableContainerRef}
        className="rounded-xl border border-border bg-card overflow-auto relative max-h-[700px] w-full shadow-sm"
      >
        <Table className="w-full caption-bottom text-sm relative">
          <TableHeader className="sticky top-0 z-10 bg-muted/95 backdrop-blur-md shadow-sm border-b border-border">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent border-0">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan} className={cn("px-4 py-3 h-auto align-middle border-b-0", header.column.getIsPinned() ? "sticky bg-muted/95 z-20" : "")} style={header.column.getIsPinned() === 'left' ? { left: 0 } : header.column.getIsPinned() === 'right' ? { right: 0 } : {}}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  {columns.map((_, j) => (
                    <TableCell key={j} className={cellPadding}>
                      <Skeleton className="h-5 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : rows?.length ? (
              virtualized ? (
                <>
                  {paddingTop > 0 && <tr><td style={{ height: `${paddingTop}px` }} /></tr>}
                  {virtualItems.map((virtualRow) => {
                    const row = rows[virtualRow.index]
                    return (
                      <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                        className="transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id} className={cn(cellPadding, cell.column.getIsPinned() ? "sticky bg-background z-10" : "")} style={cell.column.getIsPinned() === 'left' ? { left: 0 } : cell.column.getIsPinned() === 'right' ? { right: 0 } : {}}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </TableCell>
                        ))}
                      </TableRow>
                    )
                  })}
                  {paddingBottom > 0 && <tr><td style={{ height: `${paddingBottom}px` }} /></tr>}
                </>
              ) : (
                rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className={cn(cellPadding, cell.column.getIsPinned() ? "sticky bg-background z-10" : "")} style={cell.column.getIsPinned() === 'left' ? { left: 0 } : cell.column.getIsPinned() === 'right' ? { right: 0 } : {}}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-48 text-center border-0">
                  <div className="flex items-center justify-center h-full w-full">
                    <EmptyCard 
                      title="No records found" 
                      description="There is no data matching your query."
                      className="border-0 bg-transparent shadow-none"
                    />
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  )
}
