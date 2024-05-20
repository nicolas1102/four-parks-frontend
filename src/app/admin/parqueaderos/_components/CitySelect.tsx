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
import { CityInterface } from '@/lib/interfaces/city.interface'
import { cn } from '@/lib/utils'
import { useCity } from '@/services/useCity'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { FieldError } from 'react-hook-form'

export function CitySelect({
  city,
  setCity,
  errors,
}: {
  city: CityInterface | null
  setCity: Dispatch<SetStateAction<CityInterface | null>>
  errors: FieldError | undefined
}) {
  const { cities, getCities, isLoading } = useCity()
  useEffect(() => {
    const fetchCities = async () => {
      await getCities()
    }
    fetchCities()
  }, [])

  return (
    <Select
      onValueChange={(value) => {
        const selectedCity = cities.filter((city) => {
          return city.city.toLowerCase() === value.toLowerCase()
        })
        setCity(selectedCity[0])
      }}
      value={city ? city.city : ''}
      disabled={isLoading || cities?.length === 0 ? true : false}
    >
      <SelectTrigger
        className={cn('w-full border border-yellowFPC-400', {
          'focus-visible:ring-red-500': errors,
        })}
      >
        <SelectValue placeholder={isLoading ? 'Cargando Datos...' : 'Ciudad'} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Ciudad</SelectLabel>
          {cities &&
            cities.map((cityItem) => (
              <SelectItem key={cityItem.id} value={cityItem.city + ''}>
                {cityItem.city}
              </SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
