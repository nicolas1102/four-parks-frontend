'use client'

import Link from 'next/link'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useUser } from '@/services/useUser'
import { User } from '@/lib/interfaces/user.model'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal } from 'lucide-react'

interface UsersTableInterface {
  users: Array<User>
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function UsersTable1<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const { deleteUser } = useUser()

  return (
    <Table className='border'>
      <TableCaption>Una lista de todos los usuarios.</TableCaption>

      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead key={header.id} className='text-center text-xs'>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              )
            })}
            <TableHead className='text-center text-xs'>Acciones</TableHead>
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && 'selected'}
            >
              {row.getVisibleCells().map((cell) => {
                if (cell.column.columnDef.header === 'Cuenta Activada') {
                  return (
                    <TableCell key={cell.id} className='text-center'>
                      {cell.getValue() ? (
                        'Si'
                      ) : (
                        <span className='text-red-500 font-medium'>
                          No
                        </span>
                      )}
                    </TableCell>
                  )
                } else if (
                  cell.column.columnDef.header === 'Cuenta Bloqueada'
                ) {
                  return (
                    <TableCell key={cell.id} className='text-center'>
                      {cell.getValue() ? (
                        'Si'
                      ) : (
                        <span className='text-red-500 font-medium'>
                          No
                        </span>
                      )}
                    </TableCell>
                  )
                } else {
                  return (
                    <TableCell key={cell.id} className='text-center'>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  )
                }
              })}
              <TableCell className='text-center flex gap-2 justify-center'>
                <Button variant='outline'>
                  <Link href={`/usuarios/edit/${row.id}`}>Editar</Link>
                </Button>

                <Button
                  variant='destructive'
                  onClick={() => {
                    if (row.id) deleteUser(row.id)
                  }}
                >
                  Eliminar
                </Button>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className='h-24 text-center'>
              No results.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
