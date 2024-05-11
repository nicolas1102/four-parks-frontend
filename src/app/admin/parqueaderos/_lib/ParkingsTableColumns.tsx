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
import { ParkingDialog } from '../_components/ParkingDialog'
import { Dialog } from '@/components/ui/dialog'
import { ParkingInterface } from '@/lib/interfaces/parking.interface'
import { useParking } from '@/services/useParking'
import { useRouter } from 'next/navigation'
import { LocationInterface } from '@/lib/interfaces/location.interface'

const ParkingsTableColumns = ({ data }: { data: ParkingInterface[] }) => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const { deleteParking } = useParking()
  const router = useRouter()

  const columns: ColumnDef<ParkingInterface>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
      cell: ({ row }) => <div>{row.getValue('id')}</div>,
    },
    {
      accessorKey: 'name',
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Nombre
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        )
      },
      cell: ({ row }) => (
        <div>{row.getValue('name')}</div>
      ),
    },
    {
      accessorKey: 'city',
      header: 'Ciudad',
      cell: ({ row }) => {
        const parking = row.original
        return <div className=''>{
          parking.location.city.city
          }</div>
      },
    },
    {
      accessorKey: 'address',
      header: 'Dirección',
      cell: ({ row }) => {
        const parking = row.original
        return <div className=''>{parking.location.address}</div>
      },
    },
    // {
    //   accessorKey: 'location',
    //   header: ({ column }) => {
    //     return (
    //       <Button
    //         variant='ghost'
    //         onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
    //       >
    //         Ciudad
    //         <ArrowUpDown className='ml-2 h-4 w-4' />
    //       </Button>
    //     )
    //   },
    //   cell: ({ row }) => {
    //     console.log(row.getValue('location'));

    //     const location = row.getValue('location') as LocationInterface
    //     return <div className='text-center'>{location.city.city}</div>
    //   },
    // },
    // {
    //   accessorKey: 'location',
    //   header: ({ column }) => {
    //     return (
    //       <Button
    //         variant='ghost'
    //         onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
    //       >
    //         Dirección
    //         <ArrowUpDown className='ml-2 h-4 w-4' />
    //       </Button>
    //     )
    //   },
    //   cell: ({ row }) => {
    //     const location = row.getValue('location') as LocationInterface
    //     return <div className='text-center'>{location.address}</div>
    //   },
    // },
    {
      accessorKey: 'total_slots',
      // accessorKey: 'totalSlots',
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Capacidad (Espacios)
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        )
      },
      cell: ({ row }) => (
        <div className='text-center'>{row.getValue('total_slots')}</div>
      ),
    },
    {
      accessorKey: 'admin',
      header: 'Administrador',
      cell: ({ row }) => {
        const parking = row.original
        return <div className=''>{parking.admin}</div>
      },
    },
    {
      accessorKey: 'loyalty',
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Programa de Lealtad
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        )
      },
      cell: ({ row }) => (
        <div className='text-center'>
          {/* {row.getValue('loyalty') ? 'Si' : 'No'} */}
          {row.getValue('loyalty') === 'true' ? 'Si' : 'No'}
        </div>
      ),
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        const parking = row.original
        return (
          <Dialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='outline' className='h-8 w-8 p-0'>
                  <p className='sr-only'>Abrir Menu</p>
                  <MoreHorizontal className='h-4 w-4' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent sideOffset={5}>
                <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                <DropdownMenuItem
                  className='cursor-pointer'
                  onClick={() => {
                    if (parking?.id)
                      navigator.clipboard.writeText(parking.id + '')
                  }}
                >
                  Copiar ID de parqueadero
                </DropdownMenuItem>
                <DropdownMenuItem
                  className='cursor-pointer'
                  onClick={() => {
                    router.push(`/admin/parqueaderos/${parking.id}`)
                  }}
                >
                  Ver estado de parqueadero
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <ParkingDialog parking={parking} />

                {/* <ParkingDialog parking={parking} /> */}

                <DropdownMenuItem
                  onClick={() => {
                    if (parking?.name) deleteParking(parking?.name)
                  }}
                  className='cursor-pointer'
                >
                  <span className='text-red-600 font-medium'>
                    Eliminar Parqueadero
                  </span>
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

export default ParkingsTableColumns
