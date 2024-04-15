
import { User } from '@/lib/interfaces/user.model'
import axios from 'axios'

export const getUsersRequest = async () => {
  const res = await axios.get('/usuarios')
  return res.data
}

export const getOneUserRequest = async (id: string) => {
  const res = await axios.get(`/usuarios/${id}`)
  return res.data
}


// TODO: Revisar
export const getOneUserByEmailAndPasswordRequest = async (email: string, password: string) => {
  const res = await axios.get(`/usuarios/email/${email}/${password}`);
  return res.data;
};

export const getOneUserByEmailRequest = async (email: string) => {
  const res = await axios.get(`/usuarios/email/${email}`);
  return res.data;
};

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
