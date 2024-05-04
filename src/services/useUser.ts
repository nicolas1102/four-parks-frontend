'use client'

import {
  createUsersRequest,
  deleteUserRequest,
  getOneUserByEmailRequest,
  getUsersByRoleRequest,
  // getOneUserRequest,
  getUsersRequest,
  unblockUserAccountRequest,
  // updateUserRequest,
  updatePasswordUserRequest,
  updateUserRequest,
} from '@/app/api/routers/users.router'
import { UserInterface } from '@/lib/interfaces/user.interface'
import { useState } from 'react'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'

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
    } catch (error: any) {
      if (error?.response?.data) {
        toast({
          variant: 'destructive',
          title: 'Ha ocurrido un error al intentar obtener los usuarios! Por favor intentalo más tarde.',
          description: error?.response.data,
        })
      } else {
        toast({
          variant: 'destructive',
          title: 'No se ha podido conectar con el servidor.',
          description: 'Intentalo más tarde.',
        })
      }
      console.error('Error fetching users:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getOneUserByEmail = async (email: string) => {
    try {
      setIsLoading(true)
      const res = await getOneUserByEmailRequest(email)
      return res.data
    } catch (error) {
      console.error('Error fetching user:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getOneUserByRole = async (role: string) => {
    try {
      setIsLoading(true)
      const res = await getUsersByRoleRequest(role)
      return res.data
    } catch (error) {
      console.error('Error fetching user:', error)
    } finally {
      setIsLoading(false)
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

  const updatePasswordUser = async (email: string, oldPassword: string, newPassword: string, confirmPassword: string) => {
    console.log('goku');

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

  const updateUser = async (user: UserInterface) => {
    setIsLoading(true)
    try {
      const res = await updateUserRequest(user)
      setIsLoading(false)
      toast({
        title: 'Se actualizó la información del usuario con éxito!',
        description: '',
      })
      return res
    } catch (error: any) {
      console.error('Error deleting user:', error)
      if (error?.response?.data) {
        toast({
          variant: 'destructive',
          title: 'No se pudo actualizar la información del usuario. Por favor intentalo de nuevo.',
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
    //   try {
    //     setIsLoading(true)
    //     const res = await updateUserRequest(id, user)
    //     setIsLoading(false)
    //     return res
    //   } catch (error) {
    //     console.error('Error updating user:', error)
    //   }
  }

  // const getOneUser = async (id: string) => {
  //   try {
  //     setIsLoading(true)
  //     const res = await getOneUserRequest(id)
  //     setIsLoading(false)
  //     return res.data
  //   } catch (error) {
  //     console.error('Error fetching user:', error)
  //   }
  // }

  const deleteUser = async (email: string) => {
    setIsLoading(true)
    try {
      const res = await deleteUserRequest(email)
      setUsers((prevUsers) => prevUsers.filter((user) => user.email !== email))
      setIsLoading(false)
      toast({
        title: 'Se eliminó el usuario con éxito!',
        description: '',
      })
      return res
    } catch (error: any) {
      console.error('Error deleting user:', error)
      if (error?.response?.data) {
        toast({
          variant: 'destructive',
          title: 'No se pudo eliminar el usuario. Por favor intentalo de nuevo.',
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

  const unblockUserAccount = async (email: string, token: string) => {
    setIsLoading(true)
    try {
      const res = await unblockUserAccountRequest(email, token)
      setIsLoading(false)
      toast({
        title: 'Se activo la cuenta del usuario con éxito!',
        description: '',
      })
      return res
    } catch (error: any) {      
      console.error('Error activating user account:', error)
      if (error?.response?.data) {
        toast({
          variant: 'destructive',
          title: 'No se pudo activar la cuenta del usuario. Por favor intentalo de nuevo.',
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

  return {
    users,
    isLoading,
    setIsLoading,
    createUser,
    updatePasswordUser,
    getUsers,
    getOneUserByRole,
    getOneUserByEmail,
    deleteUser,
    updateUser,
    // getOneUser,
    unblockUserAccount,
  }
}
