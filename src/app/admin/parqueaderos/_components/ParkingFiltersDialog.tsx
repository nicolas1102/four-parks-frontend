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
import { ParkingInterface } from '@/lib/interfaces/parking.interface'

export function ParkingFiltersDialog({
  table,
}: {
  table: Table<ParkingInterface>
}) {
  // const { cities, getCities, isLoading } = useCity()
  // useEffect(() => {
  //   const fetchCities = async () => {
  //     await getCities()
  //   }
  //   fetchCities()
  // }, [])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className='inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 px-4 py-5 tracking-widest border hover:bg-yellowFPC-200 dark:hover:bg-yellowFPC-400 dark:hover:text-black border-blueFPC-400 cursor-pointer'>
          FILTROS
        </div>
      </DialogTrigger>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>
            <p className='tracking-widest'>FILTROS</p>
          </DialogTitle>
          <DialogDescription>
            Aquí puedes filtrar parqueaderos.
          </DialogDescription>
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
            <Label htmlFor='name'>Nombre Parqueadero</Label>
            <Input
              placeholder='Filtrar por nombre'
              value={
                (table.getColumn('name')?.getFilterValue() as string) ?? ''
              }
              onChange={(event) =>
                table.getColumn('name')?.setFilterValue(event.target.value)
              }
              className=' mr-2 border border-blueFPC-400'
            />
          </div>

          {/* TODO: Arreglar los filtros con subinfo de interface */}
          {/* <div className='grid gap-2 justify-around grid-cols-2'>
            <div className='grid gap-1 py-2'>
              <Label htmlFor='city'>Ciudad</Label>
              <Input
              placeholder='Filtrar por nombre'
              value={
                (table.getColumn('city')?.getFilterValue() as string) ?? ''
              }
              onChange={(event) =>
                table.getColumn('city')?.setFilterValue(event.target.value)
              }
              className=' mr-2 border border-blueFPC-400'
            />
              
            </div>
            <div className='grid gap-1 py-2'>
              <Label htmlFor='address'>Dirección</Label>
              <Input
                placeholder='Kandor Street'
                value={
                  (table.getColumn('address')?.getFilterValue() as string) ?? ''
                }
                onChange={(event) =>
                  table.getColumn('address')?.setFilterValue(event.target.value)
                }
                className='mr-2 border border-blueFPC-400'
              />
            </div>
          </div> */}

          <Separator
            lineColor='border-blueFPC-400'
            coneColor='text-blueFPC-400'
          />

          <div className='grid gap-2 justify-around grid-cols-2'>
            <div className='grid gap-1 py-2'>
              <Label htmlFor='totalSlots'>Capacidad (Número de Espacios)</Label>
              <Input
                placeholder='24'
                value={
                  (table.getColumn('totalSlots')?.getFilterValue() as string) ??
                  ''
                }
                onChange={(event) =>
                  table
                    .getColumn('totalSlots')
                    ?.setFilterValue(event.target.value)
                }
                className='mr-2 border border-blueFPC-400'
              />
            </div>

            <div className='grid gap-1 py-2'>
              <Label htmlFor='loyalty'>Campaña de Lealtad</Label>
              <Select
                onValueChange={(value) => {
                  if (value === 'all') {
                    table.getColumn('loyalty')?.setFilterValue('')
                  } else {
                    table
                      .getColumn('loyalty')
                      ?.setFilterValue(value === 'true' ? true : false)
                  }
                }}
                value={
                  table.getColumn('loyalty')?.getFilterValue() !== undefined
                    ? table.getColumn('loyalty')?.getFilterValue() + ''
                    : 'all'
                }
              >
                <SelectTrigger className='border border-blueFPC-400'>
                  <SelectValue placeholder='Cualquiera' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Campaña de lealtad</SelectLabel>
                    <SelectItem className='italic' value={'all'}>
                      --- Cualquiera ---
                    </SelectItem>
                    <SelectItem value={'true'}>Si</SelectItem>
                    <SelectItem value={'false'}>No</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {/* <Select
                onValueChange={(value) => {
                  if (value === 'all') {
                    table.getColumn('loyalty')?.setFilterValue('')
                  } else {
                    table
                      .getColumn('loyalty')
                      ?.setFilterValue(
                        !table.getColumn('loyalty')?.getFilterValue()
                      )
                  }
                }}
                value={
                  table.getColumn('loyalty')?.getFilterValue() !== undefined
                    ? table.getColumn('loyalty')?.getFilterValue() + ''
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
              </Select> */}
            </div>
          </div>

          {/* <div className='grid gap-2 justify-around grid-cols-3'>
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
          </div> */}
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
