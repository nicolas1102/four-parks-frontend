
import { User } from '@/interfaces/user.model'
import axios from 'axios'

export const getUsersRequest = async () => {
  const res = await axios.get('/usuarios')
  return res.data
}

export const getOneUserRequest = async (id: string) => {
  const res = await axios.get(`/usuarios/${id}`)
  return res.data
}

export const createUsersRequest = async (User: User) => {
  const res = await axios.post('/usuarios', User)
  return res.data
}

export const updateUserRequest = async (id: string, User: User) => {
  const res = await axios.put(`/usuarios/${id}`, User)
  return res.data
}

export const deleteUserRequest = async (id: string) => {
  const res = await axios.delete(`/usuarios/${id}`)
  return res.data
}
