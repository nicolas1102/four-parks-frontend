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
import { Dispatch, SetStateAction, useEffect } from 'react'

export function ParkingTypeSelect({
  selectValue,
  setSelectValue,
}: {
  selectValue: string
  setSelectValue: Dispatch<SetStateAction<string>>
}) {
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
    >
      <SelectTrigger className='w-48'>
        <SelectValue placeholder='Tipo de Parqueadero' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Ciudad</SelectLabel>
          <SelectItem value={'all'} className='text-center italic'>--- Cualquiera --</SelectItem>
          <SelectItem value={'DESCUBIERTO'}>Descubierto</SelectItem>
          <SelectItem value={'CUBIERTO'}>Cubierto</SelectItem>
          <SelectItem value={'SEMI-CUBIERTO'}>Semi-cubierto</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
