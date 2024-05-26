'use client'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ParkingTypeInterface } from '@/lib/interfaces/parkingType.interface'
import { cn } from '@/lib/utils'
import { Dispatch, SetStateAction } from 'react'
import { FieldError } from 'react-hook-form'

export function ParkingTypeSelect({
  parkingType,
  setParkingType,
  errors,
}: {
  parkingType: ParkingTypeInterface | null
  setParkingType: Dispatch<SetStateAction<ParkingTypeInterface | null>>
  errors: FieldError | undefined
}) {
  return (
    <Select
      onValueChange={(value) => {
        setParkingType({ type: value })
      }}
      value={parkingType ? parkingType.type : ''}
    >
      <SelectTrigger
        className={cn('w-full border border-yellowFPC-400', {
          'focus-visible:ring-red-500': errors,
        })}
      >
        <SelectValue placeholder='Tipo de Parqueadero' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Tipo de Parqueadero</SelectLabel>
          <SelectItem value={'DESCUBIERTO'}>Descubierto</SelectItem>
          <SelectItem value={'CUBIERTO'}>Cubierto</SelectItem>
          <SelectItem value={'SEMICUBIERTO'}>Semicubierto</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
