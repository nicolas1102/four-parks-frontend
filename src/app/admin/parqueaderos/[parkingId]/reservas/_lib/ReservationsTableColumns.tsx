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
import { ReservationInterface } from '@/lib/interfaces/reservation.interface'
import { useReservation } from '@/services/useReservation'
import { useRouter } from 'next/navigation'
import { DateTime } from 'luxon'

const ReservationsTableColumns = ({
  data,
}: {
  data: ReservationInterface[]
}) => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const { deleteReservation, startReservation, endReservation } =
    useReservation()
  const router = useRouter()

  const columns: ColumnDef<ReservationInterface>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
      cell: ({ row }) => <div>{row.getValue('id')}</div>,
    },
    {
      accessorKey: 'slotId',
      header: 'Slot ID',
      cell: ({ row }) => {
        const reservation = row.original
        return <div className=''>{reservation.parkingSlot?.id}</div>
      },
    },
    {
      accessorKey: 'slotStatus',
      header: 'Estado de Slot',
      cell: ({ row }) => {
        const reservation = row.original
        return (
          <div className=''>
            {reservation.parkingSlot?.slotStatusId.status === 'EMPTY'
              ? 'Vacio'
              : 'Ocupado'}
          </div>
        )
      },
    },
    {
      accessorKey: 'vehicleType',
      header: 'Tipo de Vehículo',
      cell: ({ row }) => {
        const reservation = row.original
        return (
          <div className=''>{reservation.parkingSlot?.vehicleTypeId.type}</div>
        )
      },
    },
    {
      accessorKey: 'reservationTime',
      header: 'Hora de Reserva',
      cell: ({ row }) => {
        const reservation = row.original
        const fechaColombia = DateTime.fromISO(reservation.reservationTime)
        const date = fechaColombia.setLocale('co').toLocaleString()
        const hour = fechaColombia.setLocale('co').toLocaleString({
          hour: 'numeric',
          minute: 'numeric',
        })
        return <div className=''>{hour + ' - ' + date}</div>
      },
    },
    {
      accessorKey: 'reservationStartTime',
      header: 'Hora Entrada',

      cell: ({ row }) => {
        const reservation = row.original
        const fechaColombia = DateTime.fromISO(
          reservation.reservationStartTime!
        )

        const date = fechaColombia.setLocale('co').toLocaleString()
        const hour = fechaColombia.setLocale('co').toLocaleString({
          hour: 'numeric',
          minute: 'numeric',
        })
        return (
          <div className=''>
            {reservation.reservationStartTime && hour + ' - ' + date}
          </div>
        )
      },
    },
    {
      accessorKey: 'user',
      header: 'Usuario',
      cell: ({ row }) => {
        const reservation = row.original
        return (
          <div className=''>
            {reservation.user?.firstName +
              ' ' +
              reservation.user?.firstLastname}
          </div>
        )
      },
    },
    {
      id: 'actions',
      header: 'Acciones',
      enableHiding: false,
      cell: async ({ row }) => {
        const reservation = row.original
        return (
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
                  if (reservation?.id)
                    navigator.clipboard.writeText(reservation.id + '')
                }}
              >
                Copiar ID de reserva
              </DropdownMenuItem>
              <DropdownMenuItem
                className='cursor-pointer'
                onClick={() => {
                  if (reservation?.id)
                    navigator.clipboard.writeText(
                      reservation.parkingSlot?.id + ''
                    )
                }}
              >
                Copiar ID de slot
              </DropdownMenuItem>
              <DropdownMenuItem
                className='cursor-pointer'
                onClick={() => {
                  if (reservation?.id)
                    navigator.clipboard.writeText(reservation.user?.id + '')
                }}
              >
                Copiar ID de usuario
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              {!reservation.reservationStartTime && (
                <DropdownMenuItem
                  onClick={() => {
                    if (reservation?.id) startReservation(reservation)
                  }}
                  className='cursor-pointer bg-yellowFPC-200'
                >
                  <span className='font-medium text-black'>Iniciar reserva</span>
                </DropdownMenuItem>
              )}

              {reservation.reservationStartTime && (
                <DropdownMenuItem
                  onClick={() => {
                    if (reservation?.id) endReservation(reservation)
                  }}
                  className='cursor-pointer bg-blueFPC-200'
                >
                  <span className=' font-medium text-black'>Terminar reserva</span>
                </DropdownMenuItem>
              )}

              <DropdownMenuItem
                onClick={() => {
                  if (reservation?.id) deleteReservation(reservation?.id)
                }}
                className='cursor-pointer bg-redFPC-200'
              >
                <span className='font-medium text-black'>Eliminar reserva</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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

export default ReservationsTableColumns
