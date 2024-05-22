'use client'

import {
  createUsersRequest,
  deleteUserRequest,
  getOneUserByEmailRequest,
  getUsersByRoleRequest,
  getUsersRequest,
  unblockUserAccountRequest,
  updatePasswordUserRequest,
  updateUserRequest,
} from '@/app/api/routers/users.router'
import { UserInterface } from '@/lib/interfaces/user.interface'
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import { AxiosResponse } from 'axios'

interface UserContextType {
  users: UserInterface[]
  setUsers: Dispatch<SetStateAction<UserInterface[]>>
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
  createUser: (
    user: UserInterface
  ) => Promise<AxiosResponse<any, any> | undefined>
  createAdmin: (
    user: UserInterface
  ) => Promise<AxiosResponse<any, any> | undefined>
  updatePasswordUser: (
    email: string,
    oldPassword: string,
    newPassword: string,
    confirmPassword: string
  ) => Promise<AxiosResponse<any, any> | undefined>
  getUsers: () => Promise<void>
  getUsersByRole: (role: string) => Promise<UserInterface[]>
  getOneUserByEmail: (
    email: string
  ) => Promise<UserInterface | undefined> | UserInterface
  updateUser: (
    user: UserInterface
  ) => Promise<AxiosResponse<UserInterface, any> | undefined>
  deleteUser: (email: string) => Promise<AxiosResponse<any, any> | undefined>
  unblockUserAccount: (
    email: string,
    token: string
  ) => Promise<AxiosResponse<any, any> | undefined>
}

const UserContext = createContext<UserContextType | null>(null)

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}

export function UserProvider({ children }: { children: ReactNode }) {
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
          title:
            'Ha ocurrido un error al intentar obtener los usuarios! Por favor intentalo más tarde.',
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
      toast({
        title: '¡Se obtuvo la información del usuario con éxito!',
        description: '',
      })
      return res.data as UserInterface
    } catch (error: any) {
      if (error?.response?.data) {
        toast({
          variant: 'destructive',
          title:
            'Ha ocurrido un error al intentar obtener los datos del usuario! Por favor intentalo más tarde.',
          description: error?.response.data,
        })
      } else {
        toast({
          variant: 'destructive',
          title: 'No se ha podido conectar con el servidor.',
          description: 'Intentalo más tarde.',
        })
      }
      console.error('Error fetching user:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getUsersByRole = async (role: string) => {
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
        title: 'Te has registrado con éxito!',
        description: `Revisa tu correo! Te hemos enviado tu contraseña a ${user.email} para que puedas iniciar sesión por primera vez.`,
      })
      return res as AxiosResponse<any, any>
    } catch (error: any) {
      console.error('Error creating user:', error)
      if (error?.response?.data) {
        toast({
          variant: 'destructive',
          title:
            'Ha ocurrido un error al intentar registrar usuario! Por favor intentalo de nuevo.',
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

  const createAdmin = async (user: UserInterface) => {
    try {
      setIsLoading(true)
      const res = await createUsersRequest(user)
      setUsers((prevUsers: UserInterface[]) => [...prevUsers, res.data])
      toast({
        title: '¡Administrador creado con éxito!',
      })
      return res as AxiosResponse<any, any>
    } catch (error: any) {
      console.error('Error creating admin:', error)
      if (error?.response?.data) {
        toast({
          variant: 'destructive',
          title:
            '¡Ha ocurrido un error al intentar crear administrador! Por favor intentalo de nuevo.',
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

  const updatePasswordUser = async (
    email: string,
    oldPassword: string,
    newPassword: string,
    confirmPassword: string
  ) => {
    try {
      setIsLoading(true)
      const res = await updatePasswordUserRequest(
        email,
        oldPassword,
        newPassword,
        confirmPassword
      )
      router.push('/auth/log-in')
      toast({
        title: 'Se actualizó la contraseña con éxito!',
        description: 'Ahora inicia sesión con tu nueva contraseña.',
      })
      return res as AxiosResponse<any, any>
    } catch (error: any) {
      console.error('Error updating password:', error)
      if (error?.response?.data) {
        toast({
          variant: 'destructive',
          title:
            'No se pudo actualizar la contraseña. Por favor intentalo de nuevo.',
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
      setUsers((prevUsers) => {
        const userIndex = prevUsers.findIndex(
          (userItem) => userItem.email === user.email
        )
        const updatedUsers = [...prevUsers]
        updatedUsers[userIndex] = user
        return updatedUsers
      })
      toast({
        title: 'Se actualizó la información del usuario con éxito!',
        description: '',
      })
      return res as AxiosResponse<any, any>
    } catch (error: any) {
      console.error('Error updating user:', error)
      if (error?.response?.data) {
        toast({
          variant: 'destructive',
          title:
            'No se pudo actualizar la información del usuario. Por favor intentalo de nuevo.',
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

  const deleteUser = async (email: string) => {
    setIsLoading(true)
    try {
      const res = await deleteUserRequest(email)
      setUsers((prevUsers) => prevUsers.filter((user) => user.email !== email))
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
          title:
            'No se pudo eliminar el usuario. Por favor intentalo de nuevo.',
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
      toast({
        title: 'Se activo la cuenta del usuario con éxito!',
        description: '',
      })

      if (res?.status === 200) {
        const updateUser = await getOneUserByEmail(email)
        if (updateUser !== undefined) {
          setUsers((prevUsers) => {
            const userIndex = prevUsers.findIndex(
              (userItem) => userItem.email === updateUser.email
            )
            const updatedUsers = [...prevUsers]
            updatedUsers[userIndex] = updateUser
            return updatedUsers
          })
        }
      }

      return res
    } catch (error: any) {
      console.error('Error activating user account:', error)
      if (error?.response?.data) {
        toast({
          variant: 'destructive',
          title:
            'No se pudo activar la cuenta del usuario. Por favor intentalo de nuevo.',
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

  return (
    <UserContext.Provider
      value={{
        users,
        setUsers,
        isLoading,
        setIsLoading,
        createUser,
        createAdmin,
        updatePasswordUser,
        getUsers,
        getUsersByRole,
        getOneUserByEmail,
        deleteUser,
        updateUser,
        unblockUserAccount,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
