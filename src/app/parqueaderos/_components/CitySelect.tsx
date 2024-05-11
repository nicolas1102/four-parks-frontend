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
import { Dispatch, ReactNode, SetStateAction, useEffect } from 'react'

export function CitySelect({
  selectValue,
  setSelectValue,
}: {
  selectValue: string
  setSelectValue: Dispatch<SetStateAction<string>>
}) {
  // const { city, getCities, isLoading } = useCity()
  useEffect(() => {}, [])
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
      // {isLoading && disabled }
    >
      <SelectTrigger className='w-48'>
        <SelectValue placeholder='Ciudad' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Ciudad</SelectLabel>
          <SelectItem value={'all'} className='italic'>--- Cualquiera --</SelectItem>
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
