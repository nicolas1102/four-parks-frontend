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
import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react'
import { FieldError, UseFormSetValue } from 'react-hook-form'

export function ParkingTypeSelect({
  selectValue,
  setSelectValue,
  errors,
}: {
  selectValue: string
  setSelectValue:  UseFormSetValue<{
    name: string
    admin: string
    city: string
    address: string
    latitude: number
    longitude: number
    openTime: string
    closeTime: string
    loyalty: boolean
    parkingType: string
    car_slots: number
    bicycle_slots: number
    motorcycle_slots: number
    heavy_vehicle_slots: number
    carRate: number
    motorcycleRate: number
    bikeRate: number
    heavyCarRate: number
  }>
  errors: FieldError | undefined
}) {
  const [parkingType, setParkingType] = useState(selectValue)
  useEffect(() => {
    if (parkingType) {
      setSelectValue('parkingType', parkingType)
    }
  }, [parkingType, selectValue])
  return (
    <Select
      onValueChange={(value) => {
        setParkingType(value)
      }}
      value={parkingType ? parkingType : ''}
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
