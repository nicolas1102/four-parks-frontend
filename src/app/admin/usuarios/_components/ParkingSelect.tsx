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
import { ParkingInterface } from '@/lib/interfaces/parking.interface'
import { UserInterface } from '@/lib/interfaces/user.interface'
import { cn } from '@/lib/utils'
import { useParking } from '@/services/useParking'
import { useUser } from '@/services/useUser'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { FieldError, UseFormSetValue } from 'react-hook-form'

export function ParkingSelect({
  parking,
  setParking,
  errors,
}: {
  parking: ParkingInterface | null
  setParking: Dispatch<SetStateAction<ParkingInterface | null>>
  errors: FieldError | undefined
}) {
  const { parkings, getParkings, isLoading } = useParking()
  useEffect(() => {
    const fetchParkings = async () => {
      await getParkings()
    }
    fetchParkings()
  }, [])

  return (
    <Select
      onValueChange={(value) => {
        const selectedParking = parkings.filter((parking) => {
          return parking.name.toLowerCase() === value.toLowerCase()
        })
        setParking(selectedParking[0])
      }}
      value={parking ? parking.name : ''}
      disabled={isLoading || parkings?.length === 0 ? true : false}
    >
      <SelectTrigger
        className={cn('w-full border border-yellowFPC-400', {
          'focus-visible:ring-red-500': errors,
        })}
      >
        <SelectValue placeholder={isLoading ? 'Cargando Datos...' : 'Parqueaderos'} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Parqueaderos</SelectLabel>
          {parkings &&
            parkings.map((parkingItem) => (
              <SelectItem key={parkingItem.id} value={parkingItem.name}>
                {parkingItem.name}  |  {parkingItem.location.address}  |{' '} 
                {parkingItem.location.city.city}
              </SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
