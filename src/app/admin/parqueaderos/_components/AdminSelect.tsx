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
import { useEffect, useState } from 'react'
import { FieldError, UseFormSetValue } from 'react-hook-form'

export function AdminSelect({
  selectValue,
  setSelectValue,
  errors,
}: {
  selectValue: string
  setSelectValue: UseFormSetValue<{
    admin: string
  }>
  errors: FieldError | undefined
}) {
  const [admin, setAdmin] = useState(selectValue)
  const { getUsersByRole, isLoading } = useUser()
  const [admins, setAdmins] = useState<UserInterface[]>()
  useEffect(() => {
    const fetchAdmins = async () => {
      setAdmins(await getUsersByRole('2'))
    }
    fetchAdmins()
  }, [])
  useEffect(() => {
    if (admin) {
      setSelectValue('admin', admin)
    }
  }, [admin])
  return (
    <Select
      onValueChange={(value) => {
        setAdmin(value)
      }}
      value={admin ? admin : ''}
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
