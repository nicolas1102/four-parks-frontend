import { User } from '@/lib/interfaces/user.model'
import axios from 'axios'

const baseURL = 'http://localhost:8080/api/v1'

export const getUsersRequest = async () => {
  const res = await axios.get(baseURL + '/usuarios')
  return res.data
}

export const getOneUserRequest = async (id: string) => {
  const res = await axios.get(baseURL + `/usuarios/${id}`)
  return res.data
}

// TODO: Revisar (preguntar cómo se le pide la validacion del usuario)
export const getOneUserByEmailAndPasswordRequest = async (email: string, password: string) => {
  const res = await axios.get(baseURL + `/usuarios/email/${email}/${password}`);
  return res.data;
};

export const getOneUserByEmailRequest = async (email: string) => {
  const res = await axios.get(baseURL + `/usuarios/email/${email}`);
  return res.data;
};

export const createUsersRequest = async (user: User) => {
  const res = await axios.post(baseURL + '/auth/sign-up', user)
  return res.data
}

export const updateUserRequest = async (id: string, User: User) => {
  const res = await axios.put(baseURL + `/usuarios/${id}`, User)
  return res.data
}

export const deleteUserRequest = async (id: string) => {
  const res = await axios.delete(baseURL + `/usuarios/${id}`)
  return res.data
}
