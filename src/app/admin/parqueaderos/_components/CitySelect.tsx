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

export function CitySelect({
  selectValue,
  setSelectValue,
  errors,
}: {
  selectValue: string | null
  setSelectValue: UseFormSetValue<{
    address: string
    name: string
    loyalty: boolean
    parkingType: string
    city: string
    latitude: number
    longitude: number
    totalSlots: number
    openTime: string
    closeTime: string
  }>
  errors: FieldError | undefined
}) {
  const [city, setCity] = useState(selectValue)
  // const { cities, getCities, isLoading } = useCity()
  // useEffect(() => {
  //   const fetchCities = async () => {
  //     await getCities()
  //   }
  //   fetchCities()
  // }, [])
  useEffect(() => {
    if (city) {
      setSelectValue('city', city)
    }
  }, [city, selectValue])
  return (
    <Select
      onValueChange={(value) => {
        setCity(value)
      }}
      value={city ? city : ''}
      // {isLoading || cities.lenght === 0 && disabled }
    >
      <SelectTrigger
        className={cn('w-full border border-yellowFPC-400', {
          'focus-visible:ring-red-500': errors,
        })}
      >
        <SelectValue placeholder='Ciudad' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Ciudad</SelectLabel>
          <SelectItem value={'Bogota D.C.'}>Bogota D.C.</SelectItem>
          <SelectItem value={'Medellín'}>Medellín</SelectItem>
          {/* cities.map((city) => (
            <SelectItem key={city.id} value={city.city}>{city.city}</SelectItem>

          )) */}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
