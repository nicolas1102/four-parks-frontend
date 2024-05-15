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
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { FieldError, UseFormSetValue } from 'react-hook-form'

export function AdminSelect({
  admin,
  setAdmin,
  errors,
}: {
  admin?: string | null
  setAdmin: Dispatch<SetStateAction<string | null>>
  errors: FieldError | undefined
}) {
  const {
    users: admins,
    setUsers: setAdmins,
    getUsersByRole,
    isLoading,
  } = useUser()
  useEffect(() => {
    const fetchAdmins = async () => {
      setAdmins(await getUsersByRole('2'))
    }
    fetchAdmins()
  }, [])
  return (
    <Select
      onValueChange={(value) => {
        const selectedAdmin = admins.filter((admin) => {
          return admin.id?.toString() === value
        })
        setAdmin(selectedAdmin[0].id + '')
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
