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
      <SelectTrigger className='sm:w-32 '>
        <SelectValue placeholder='Tipo' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Tipos de Parqueadero</SelectLabel>
          <SelectItem value={'all'} className='italic'>
            --- Cualquiera --
          </SelectItem>
          <SelectItem value={'DESCUBIERTO'}>Descubierto</SelectItem>
          <SelectItem value={'CUBIERTO'}>Cubierto</SelectItem>
          <SelectItem value={'SEMICUBIERTO'}>Semicubierto</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
