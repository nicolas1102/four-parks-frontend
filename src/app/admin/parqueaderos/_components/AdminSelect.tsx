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
import { UserInterface } from '@/lib/interfaces/user.interface'
import { cn } from '@/lib/utils'
import { useUser } from '@/services/useUser'
import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react'
import { FieldError, UseFormSetValue } from 'react-hook-form'

export function AdminSelect({
  selectValue,
  setSelectValue,
  errors
}: {
  selectValue: string
  setSelectValue: UseFormSetValue<{
    address: string
    name: string
    admin: string
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
  const { getUsersByRole, isLoading } = useUser()
  const [admins, setAdmins] = useState<UserInterface[]>()
  useEffect(() => {
    const fetchAdmins = async () => {
      setAdmins(await getUsersByRole('2'))
    }
    fetchAdmins()
  }, [])
  return (
    <Select
      onValueChange={(value) => {
        
        setSelectValue('admin', value)
      }}
      value={selectValue}
      disabled={isLoading || admins?.length === 0 ? true : false}
    >
      <SelectTrigger
        className={cn('w-full border border-yellowFPC-400', {
          'focus-visible:ring-red-500': errors,
        })}
      >
        <SelectValue placeholder='Administradores' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Administradores</SelectLabel>
          {admins &&
            admins.map((admin) => (
              <SelectItem key={admin.id} value={admin.id + ''}>
                {admin.firstName + ' ' + admin.firstLastname}
              </SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
