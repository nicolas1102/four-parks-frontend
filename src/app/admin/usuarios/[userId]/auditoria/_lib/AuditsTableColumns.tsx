'use client'

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useState } from 'react'
import { Dialog } from '@/components/ui/dialog'
import { AuditInterface } from '@/lib/interfaces/audit.interface'
import { DateTime } from 'luxon'

const AuditsTableColumns = ({ data }: { data: AuditInterface[] }) => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const columns: ColumnDef<AuditInterface>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
      cell: ({ row }) => <div>{row.getValue('id')}</div>,
    },
    {
      accessorKey: 'usuario',
      header: 'Usuario',
      cell: ({ row }) => {
        const audit = row.original
        return (
          <div className=''>
            <p>{audit.userDto.firstName + ' ' + audit.userDto.firstLastname}</p>
            <p className='italic text-muted-foreground'>
              {audit.userDto.email}
            </p>
          </div>
        )
      },
    },
    {
      accessorKey: 'activity',
      header: 'Actividad',
      cell: ({ row }) => {
        const audit = row.original
        return <div className=''>{audit.activity.name}</div>
      },
    },
    {
      accessorKey: 'happening_date',
      header: 'Fecha',
      cell: ({ row }) => {
        const audit = row.original
        return (
          <div className=''>
            <p>
              {DateTime.fromISO(audit.happening_date)
                .setLocale('co')
                .toLocaleString({
                  hour: 'numeric',
                  minute: 'numeric',
                }) +
                ' - ' +
                DateTime.fromISO(audit.happening_date)
                  .setLocale('co')
                  .toLocaleString()}
            </p>
          </div>
        )
      },
    },
    {
      id: 'Acciones',
      enableHiding: false,
      cell: ({ row }) => {
        const audit = row.original
        return (
          <Dialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='outline' className='h-8 w-8 p-0'>
                  <p className='sr-only'>Abrir Menú</p>
                  <MoreHorizontal className='h-4 w-4' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent sideOffset={5}>
                <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                <DropdownMenuItem
                  className='cursor-pointer'
                  onClick={() => {
                    if (audit?.id) navigator.clipboard.writeText(audit.id + '')
                  }}
                >
                  Copiar ID de auditoria
                </DropdownMenuItem>
                <DropdownMenuItem
                  className='cursor-pointer'
                  onClick={() => {
                    if (audit?.userDto)
                      navigator.clipboard.writeText(audit.userDto.id + '')
                  }}
                >
                  Copiar ID de usuario
                </DropdownMenuItem>
                <DropdownMenuItem
                  className='cursor-pointer'
                  onClick={() => {
                    if (audit?.userDto)
                      navigator.clipboard.writeText(audit.userDto.email + '')
                  }}
                >
                  Copiar email de usuario
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </Dialog>
        )
      },
    },
  ]

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
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

  return { table, columns }
}

export default AuditsTableColumns
