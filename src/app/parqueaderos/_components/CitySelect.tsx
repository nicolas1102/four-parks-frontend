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
import { useCity } from '@/services/useCity'
import { Dispatch, SetStateAction, useEffect } from 'react'

export function CitySelect({
  selectValue,
  setSelectValue,
}: {
  selectValue: string
  setSelectValue: Dispatch<SetStateAction<string>>
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
        if (value === 'all') {
          setSelectValue('')
        } else {
          setSelectValue(value)
        }
      }}
      value={selectValue}
      disabled={isLoading || cities?.length === 0 ? true : false}
    >
      <SelectTrigger className='sm:w-32 '>
        <SelectValue placeholder={isLoading ? 'Cargando Ciudades...' : 'Ciudad'} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Ciudad</SelectLabel>
          <SelectItem value={'all'} className='italic'>
            --- Cualquiera ---
          </SelectItem>
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
