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
import { cn } from '@/lib/utils'
import { Dispatch, ReactNode, SetStateAction, useEffect } from 'react'
import { FieldError, UseFormSetValue } from 'react-hook-form'

export function ParkingTypeSelect({
  selectValue,
  setSelectValue,
  errors,
}: {
  selectValue: string
  setSelectValue: UseFormSetValue<{
    address: string
    name: string
    loyalty: boolean
    parkingType: string
    city: string
    latitude: number
    longitude: number
    totalSlots: number
    hoursOpenTime: number
    minutesOpenTime: number
    hoursCloseTime: number
    minutesCloseTime: number
  }>
  errors: FieldError | undefined
}) {
  useEffect(() => {
    selectValue.length !== 0
      ? setSelectValue('parkingType', selectValue)
      : setSelectValue('parkingType', '')
  }, [selectValue, setSelectValue])
  return (
    <Select
      onValueChange={(value) => {
        setSelectValue('parkingType', value)
      }}
      value={selectValue}
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
          <SelectItem value={'SEMI-CUBIERTO'}>Semi-cubierto</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
