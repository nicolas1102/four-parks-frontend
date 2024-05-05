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
import { UserInterface } from '@/lib/interfaces/user.interface'
import { useRef, useState } from 'react'
import { useUser } from '@/services/useUser'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { EditUserDialog } from '../_components/EditUserDialog'
import { Dialog } from '@/components/ui/dialog'

const UsersTableColumns = ({ data }: { data: UserInterface[] }) => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const { deleteUser, unblockUserAccount } = useUser()
  const { data: session } = useSession()

  const columns: ColumnDef<UserInterface>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
      cell: ({ row }) => <div>{row.getValue('id')}</div>,
    },
    {
      accessorKey: 'email',
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Email
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        )
      },
      cell: ({ row }) => (
        <div className='lowercase'>{row.getValue('email')}</div>
      ),
    },
    {
      accessorKey: 'firstName',
      header: ({ column }) => {
        return (
          <Button
            size={'sm'}
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Primer Nombre
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        )
      },
      cell: ({ row }) => (
        <div className='text-center'>{row.getValue('firstName')}</div>
      ),
    },
    {
      accessorKey: 'secondName',
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Segundo Nombre
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        )
      },
      cell: ({ row }) => (
        <div className='text-center'>{row.getValue('secondName')}</div>
      ),
    },
    {
      accessorKey: 'firstLastname',
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Primer Apeliido
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        )
      },
      cell: ({ row }) => (
        <div className='text-center'>{row.getValue('firstLastname')}</div>
      ),
    },
    {
      accessorKey: 'secondLastname',
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Segundo Apellido
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        )
      },
      cell: ({ row }) => (
        <div className='text-center'>{row.getValue('secondLastname')}</div>
      ),
    },
    {
      accessorKey: 'loginAttempts',
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            size={'sm'}
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Intentos de Logueo
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        )
      },
      cell: ({ row }) => (
        <div className='text-center'>{row.getValue('loginAttempts')}</div>
      ),
    },
    {
      accessorKey: 'accountActive',
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Cuenta Activada
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        )
      },
      cell: ({ row }) => (
        <div className='text-center'>
          {row.getValue('accountActive') ? 'Si' : 'No'}
        </div>
      ),
    },
    {
      accessorKey: 'accountBlocked',
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Cuenta Bloqueada
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        )
      },
      cell: ({ row }) => (
        <div className='text-center'>
          {row.getValue('accountBlocked') ? 'Si' : 'No'}
        </div>
      ),
    },
    {
      accessorKey: 'role',
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Rol
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        )
      },
      cell: ({ row }) => {
        const user = row.original
        return <div className='capitalize text-center'>{'USUARIO'}</div>
      },
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        const user = row.original
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
                    if (user?.id) navigator.clipboard.writeText(user.id)
                  }}
                >
                  Copiar ID de usuario
                </DropdownMenuItem>
                {user.roleList[0] === 'USUARIO' && user.accountBlocked && (
                  // {user.roleList[0] === 'USUARIO' && user.accountBlocked && (
                  <DropdownMenuItem
                    onClick={() => {
                      if (session) unblockUserAccount(user.email, session?.jwt)
                    }}
                    className='bg-yellowFPC-200'
                  >
                    <span>Desbloquear cuenta</span>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <div className='relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-muted'>
                  <EditUserDialog user={user} />
                </div>

                <DropdownMenuItem
                  onClick={() => {
                    if (user?.email) deleteUser(user?.email)
                  }}
                  className='cursor-pointer'
                >
                  <span className='text-red-600 font-medium'>
                    Eliminar Usuario
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

export default UsersTableColumns
