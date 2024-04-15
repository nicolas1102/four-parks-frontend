'use client'

import { createUsersRequest, deleteUserRequest, getOneUserRequest, getUsersRequest, updateUserRequest } from '@/api/request/users'
import { User } from '@/interfaces/user.model'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export function useUser() {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getUsersData = async () => {
      await getUsers()
    }
    getUsersData()
  }, [])

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

  const getOneUser = async (id: string) => {
    setIsLoading(true)
    try {
      const res = await getOneUserRequest(id)
      setIsLoading(false)
      return res.data
    } catch (error) {
      console.error('Error fetching user:', error)
    }
  }

  const createUser = async (user: User) => {
    setIsLoading(true)
    try {
      await createUsersRequest(user)
      setIsLoading(false)
      toast('Se creo el usuario con éxito!')
    } catch (error) {
      console.error('Error creating user:', error)
      toast('No se pudo crear el usuario.')
    }
  }

  const updateUser = async (id: string, user: User) => {
    setIsLoading(true)
    try {
      await updateUserRequest(id, user)
      setIsLoading(false)
      toast('Se actualizo el usuario con éxito!')
    } catch (error) {
      console.error('Error updating user:', error)
      toast('No se pudo actualizar el usuario.')
    }
  }

  const deleteUser = async (id: string) => {
    setIsLoading(true)
    try {
      await deleteUserRequest(id)
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id))
      setIsLoading(false)
      toast('Se eliminó el usuario con éxito!')
    } catch (error) {
      console.error('Error deleting user:', error)
      toast('No se pudo eliminar el usuario.')
    }
  }

  return { users, isLoading, getOneUser, createUser, updateUser, deleteUser }
}
