'use client'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import PrimaryButton from '@/components/CustomButtons/PrimaryButton'
import { UserInterface } from '@/lib/interfaces/user.interface'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Separator from '@/components/Separator'
import { Table } from '@tanstack/react-table'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function UserFiltersDialog({
  table,
  role,
  setRole,
}: {
  table: Table<UserInterface>
  role: string
  setRole: (role: string) => void
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className='inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 px-4 py-5 tracking-widest border hover:bg-yellowFPC-200 dark:hover:bg-yellowFPC-400 dark:hover:text-black border-blueFPC-400 cursor-pointer'>
          FILTROS
        </div>
        {/* <FloatingButton text='CREAR FUNCIONARIO' direction='right' /> */}
      </DialogTrigger>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>
            <p className='tracking-widest'>FILTROS</p>
          </DialogTitle>
          <DialogDescription>Aquí puedes filtrar usuarios.</DialogDescription>
        </DialogHeader>
        <div className='flex flex-col space-2'>
          <div className='grid gap-1 py-2'>
            <Label htmlFor='id'>ID</Label>
            <Input
              placeholder='Filtrar por ID'
              value={(table.getColumn('id')?.getFilterValue() as string) ?? ''}
              onChange={(event) =>
                table.getColumn('id')?.setFilterValue(event.target.value)
              }
              className='mr-2 border border-blueFPC-400'
            />
          </div>
          <div className='grid gap-1 py-2'>
            <Label htmlFor='email'>Email</Label>
            <Input
              placeholder='Filtrar por email'
              value={
                (table.getColumn('email')?.getFilterValue() as string) ?? ''
              }
              onChange={(event) =>
                table.getColumn('email')?.setFilterValue(event.target.value)
              }
              className=' mr-2 border border-blueFPC-400'
            />
          </div>
          <div className='grid gap-2 justify-around grid-cols-2'>
            <div className='grid gap-1 py-2'>
              <Label htmlFor='firstName'>Primer nombre</Label>
              <Input
                placeholder='Primer Nombre'
                value={
                  (table.getColumn('firstName')?.getFilterValue() as string) ??
                  ''
                }
                onChange={(event) =>
                  table
                    .getColumn('firstName')
                    ?.setFilterValue(event.target.value)
                }
                className='mr-2 border border-blueFPC-400'
              />
            </div>
            <div className='grid gap-1 py-2'>
              <Label htmlFor='secondName'>Segundo nombre</Label>
              <Input
                placeholder='Segundo nombre'
                value={
                  (table.getColumn('secondName')?.getFilterValue() as string) ??
                  ''
                }
                onChange={(event) =>
                  table
                    .getColumn('secondName')
                    ?.setFilterValue(event.target.value)
                }
                className='mr-2 border border-blueFPC-400'
              />
            </div>
          </div>
          <div className='grid gap-2 justify-around grid-cols-2'>
            <div className='grid gap-1 py-2'>
              <Label htmlFor='firstLastname'>Primer apellido</Label>
              <Input
                placeholder='Primer apellido'
                value={
                  (table
                    .getColumn('firstLastname')
                    ?.getFilterValue() as string) ?? ''
                }
                onChange={(event) =>
                  table
                    .getColumn('firstLastname')
                    ?.setFilterValue(event.target.value)
                }
                className='mr-2 border border-blueFPC-400'
              />
            </div>
            <div className='grid gap-1 py-2'>
              <Label htmlFor='secondLastname'>Segundo apellido</Label>
              <Input
                placeholder='Segundo apellido'
                value={
                  (table
                    .getColumn('secondLastname')
                    ?.getFilterValue() as string) ?? ''
                }
                onChange={(event) =>
                  table
                    .getColumn('secondLastname')
                    ?.setFilterValue(event.target.value)
                }
                className='mr-2 border border-blueFPC-400'
              />
            </div>
          </div>

          <Separator lineColor='border-yellowFPC-400' />

          <div className='grid gap-2 justify-around grid-cols-3'>
            <div className='grid gap-1 py-2'>
              <Label htmlFor='accountActive'>Cuenta activa</Label>
              <Select
                onValueChange={(value) => {
                  if (value === 'all') {
                    table.getColumn('accountActive')?.setFilterValue('')
                  } else {
                    table
                      .getColumn('accountActive')
                      ?.setFilterValue(
                        !table.getColumn('accountActive')?.getFilterValue()
                      )
                  }
                }}
                value={
                  table.getColumn('accountActive')?.getFilterValue() !==
                  undefined
                    ? table.getColumn('accountActive')?.getFilterValue() + ''
                    : 'all'
                }
              >
                <SelectTrigger className=' border border-blueFPC-400'>
                  <SelectValue placeholder='Cualquiera' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Cuenta activa</SelectLabel>
                    <SelectItem value='all'>Cualquiera</SelectItem>
                    <SelectItem value={'true'}>Si</SelectItem>
                    <SelectItem value={'false'}>No</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className='grid gap-1 py-2'>
              <Label htmlFor='accountBlocked'>Cuenta bloqueada</Label>
              <Select
                onValueChange={(value) => {
                  if (value === 'all') {
                    table.getColumn('accountBlocked')?.setFilterValue('')
                  } else {
                    table
                      .getColumn('accountBlocked')
                      ?.setFilterValue(
                        !table.getColumn('accountBlocked')?.getFilterValue()
                      )
                  }
                }}
                value={
                  table.getColumn('accountBlocked')?.getFilterValue() !==
                  undefined
                    ? table.getColumn('accountBlocked')?.getFilterValue() + ''
                    : 'all'
                }
              >
                <SelectTrigger className='border border-blueFPC-400'>
                  <SelectValue placeholder='Cualquiera' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Cuenta bloqueada</SelectLabel>
                    <SelectItem value='all'>Cualquiera</SelectItem>
                    <SelectItem value={'true'}>Si</SelectItem>
                    <SelectItem value={'false'}>No</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className='grid gap-1 py-2'>
              <Label htmlFor='loginAttempts'>Intentos de logueo</Label>
              <Input
                placeholder='Intentos de logueo'
                value={
                  (table
                    .getColumn('loginAttempts')
                    ?.getFilterValue() as string) ?? ''
                }
                onChange={(event) =>
                  table
                    .getColumn('loginAttempts')
                    ?.setFilterValue(event.target.value)
                }
                className='mr-2 border border-blueFPC-400'
              />
            </div>
          </div>
          <div className='grid gap-1 py-2'>
            <Label htmlFor='role'>Rol</Label>
            <Select
              onValueChange={(value) => {
                setRole(value)
              }}
              value={role}
            >
              <SelectTrigger className='border border-blueFPC-400'>
                <SelectValue placeholder='Cualquiera' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Roles</SelectLabel>
                  <SelectItem value='ALL'>Cualquiera</SelectItem>
                  <SelectItem value={'USUARIO'}>Usuario</SelectItem>
                  <SelectItem value={'ADMINISTRADOR'}>Administrador</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter className='sm:justify-start'>
            <DialogClose asChild>
              <PrimaryButton text={'FILTRAR'} />
            </DialogClose>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}
