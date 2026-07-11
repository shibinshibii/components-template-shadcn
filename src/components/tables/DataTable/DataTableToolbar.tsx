import type { Table } from "@tanstack/react-table"
import { X, Settings2, Download, Trash, LayoutGrid } from "lucide-react"
import { AppButton } from "@/components/ui/app-button"
import { AppInput } from "@/components/forms"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuGroup } from "@/components/ui/dropdown-menu"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  searchKey?: string
  density: 'compact' | 'standard' | 'relaxed'
  setDensity: (d: 'compact' | 'standard' | 'relaxed') => void
  onExport?: () => void
  onBulkDelete?: (rows: TData[]) => void
}

export function DataTableToolbar<TData>({
  table, searchKey, density, setDensity, onExport, onBulkDelete
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0
  const selectedRows = table.getFilteredSelectedRowModel().rows

  return (
    <div className="flex items-center justify-between pb-4 gap-4 flex-wrap">
      <div className="flex flex-1 items-center space-x-2">
        {searchKey && (
          <AppInput
            placeholder={`Filter ${searchKey}...`}
            value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn(searchKey)?.setFilterValue(event.target.value)
            }
            className="h-9 w-[150px] lg:w-[250px]"
          />
        )}
        {isFiltered && (
          <AppButton
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-9 px-2 lg:px-3"
            leftIcon={<X className="h-4 w-4" />}
          >
            Reset
          </AppButton>
        )}
        
        {selectedRows.length > 0 && onBulkDelete && (
          <AppButton
            variant="danger"
            size="sm"
            onClick={() => onBulkDelete(selectedRows.map(r => r.original))}
            leftIcon={<Trash className="h-4 w-4" />}
            className="ml-2 h-9"
          >
            Delete ({selectedRows.length})
          </AppButton>
        )}
      </div>
      <div className="flex items-center space-x-2">
        {onExport && (
          <AppButton variant="outline" size="sm" className="h-9" onClick={onExport} leftIcon={<Download className="h-4 w-4" />}>
            Export
          </AppButton>
        )}
        
        <DropdownMenu>
          <DropdownMenuTrigger render={
            <AppButton variant="outline" size="sm" className="h-9" leftIcon={<LayoutGrid className="h-4 w-4" />}>
              Density
            </AppButton>
          } />
          <DropdownMenuContent align="end" className="w-[150px]">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Padding</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked={density === 'compact'} onCheckedChange={() => setDensity('compact')}>
                Compact
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked={density === 'standard'} onCheckedChange={() => setDensity('standard')}>
                Standard
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked={density === 'relaxed'} onCheckedChange={() => setDensity('relaxed')}>
                Relaxed
              </DropdownMenuCheckboxItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger render={
            <AppButton variant="outline" size="sm" className="h-9" leftIcon={<Settings2 className="h-4 w-4" />}>
              View
            </AppButton>
          } />
          <DropdownMenuContent align="end" className="w-[150px]">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {table
                .getAllColumns()
                .filter((column) => typeof column.accessorFn !== "undefined" && column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) => column.toggleVisibility(!!value)}
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
