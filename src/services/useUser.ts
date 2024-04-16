'use client'

import {
  createUsersRequest,
  deleteUserRequest,
  getOneUserByEmailRequest,
  getOneUserRequest,
  getUsersRequest,
  updateUserRequest,
} from '@/app/api/routers/users.router'
import { User } from '@/lib/interfaces/user.model'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export function useUser() {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const getUsers = async () => {
    setIsLoading(true)
    try {
      const res = await getUsersRequest()
      setUsers(res.data)
      setIsLoading(false)
      toast('Se obtuvieron todos los usuarios con éxito!')
    } catch (error) {
      console.error('Error fetching users:', error)
      toast('No se pudo obtener los usuarios.')
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

  const createUser = async (user: User) => {
    try {
      setIsLoading(true)
      const res = await createUsersRequest(user)
      return res
    } catch (error) {
      console.error('Error creating user:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const updateUser = async (id: string, user: User) => {
    try {
      setIsLoading(true)
      await updateUserRequest(id, user)
      setIsLoading(false)
      toast('Se actualizo el usuario con éxito!')
    } catch (error) {
      console.error('Error updating user:', error)
      toast('No se pudo actualizar el usuario.')
    }
  }

  const deleteUser = async (id: string) => {
    try {
      setIsLoading(true)
      await deleteUserRequest(id)
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id))
      setIsLoading(false)
      toast('Se eliminó el usuario con éxito!')
    } catch (error) {
      console.error('Error deleting user:', error)
      toast('No se pudo eliminar el usuario.')
    }
  }

  return { users, getUsers, isLoading, setIsLoading, getOneUser, getOneUserByEmail, createUser, updateUser, deleteUser }
}
