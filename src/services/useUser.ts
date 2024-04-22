'use client'

import {
  createUsersRequest,
  deleteUserRequest,
  getOneUserByEmailRequest,
  getOneUserRequest,
  getUsersRequest,
  updateUserRequest,
  updatePasswordUserRequest,
} from '@/app/api/routers/users.router'
import { UserInterface } from '@/lib/interfaces/user.interface'
import { useState } from 'react'
import { useToast } from '@/components/ui/use-toast'
import { ToastAction, ToastActionElement } from '@/components/ui/toast'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { title } from 'process'

export function useUser() {
  const [users, setUsers] = useState<UserInterface[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const getUsers = async () => {
    setIsLoading(true)
    try {
      const res = await getUsersRequest()
      setUsers(res.data)
      setIsLoading(false)
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }

  const getOneUserByEmail = async (email: string) => {
    try {
      setIsLoading(true)
      const res = await getOneUserByEmailRequest(email)
      setIsLoading(false)
      return res.data
    } catch (error) {
      console.error('Error fetching user:', error)
    }
  }

  const getOneUser = async (id: string) => {
    try {
      setIsLoading(true)
      const res = await getOneUserRequest(id)
      setIsLoading(false)
      return res.data
    } catch (error) {
      console.error('Error fetching user:', error)
    }
  }

  const createUser = async (user: UserInterface) => {    
    try {
      setIsLoading(true)
      const res = await createUsersRequest(user)
      router.push('/auth/log-in')
      toast({
        title: 'Te has registrado con exito!',
        description: `Revisa tu correo! Te hemos enviado tu contraseña a ${user.email} para que puedas iniciar sesión por primera vez.`,
      })
      return res
    } catch (error: any) {
      console.error('Error creating user:', error)
      if (error?.response?.data) {
        toast({
          variant: 'destructive',
          title: 'Ha ocurrido un error al intentar registrar usuario! Por favor intentalo de nuevo.',
          description: error?.response.data,
        })
      } else {
        toast({
          variant: 'destructive',
          title: 'No se ha podido conectar con el servidor.',
          description: 'Intentalo más tarde.',
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  const updateUser = async (id: string, user: UserInterface) => {
    try {
      setIsLoading(true)
      const res = await updateUserRequest(id, user)
      setIsLoading(false)
      return res
    } catch (error) {
      console.error('Error updating user:', error)
    }
  }

  const updatePasswordUser = async (email: string, oldPassword: string, newPassword: string, confirmPassword: string) => {
    try {
      setIsLoading(true)
      const res = await updatePasswordUserRequest(
        email,
        oldPassword,
        newPassword,
        confirmPassword)
      router.push('/auth/log-in')
      toast({
        title: 'Se actualizó la contraseña con éxito!',
        description: 'Ahora inicia sesión con tu nueva contraseña.',
      })
      return res
    } catch (error: any) {
      console.error('Error updating password:', error)
      if (error?.response?.data) {
        toast({
          variant: 'destructive',
          title: 'No se pudo actualizar la contraseña. Por favor intentalo de nuevo.',
          description: error.response.data,
        })
      } else {
        toast({
          variant: 'destructive',
          title: 'No se ha podido conectar con el servidor.',
          description: 'Intentalo más tarde.',
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  const deleteUser = async (id: string) => {
    try {
      setIsLoading(true)
      const res = await deleteUserRequest(id)
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id))
      setIsLoading(false)
      return res
    } catch (error) {
      console.error('Error deleting user:', error)
    }
  }

  return { users, getUsers, isLoading, setIsLoading, getOneUser, getOneUserByEmail, createUser, updateUser, updatePasswordUser, deleteUser }
}
