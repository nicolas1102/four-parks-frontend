import { UserInterface } from '@/lib/interfaces/user.interface'
import axios from 'axios'

const baseURL = 'http://localhost:8080/api/v1'

export const getUsersRequest = async () => {
  const res = await axios.get(baseURL + '/usuarios')
  return res
}

export const getOneUserRequest = async (id: string) => {
  const res = await axios.get(baseURL + `/usuarios/${id}`)
  return res
}

export const getAuthorizedUserRequest = async (email: string, password: string) => {
  try {
    const res = await axios.post(baseURL + '/auth/log-in', { email, password });
    return res.data;
  } catch (error) {
    return error;
  }
};

export const getOneUserByEmailRequest = async (email: string) => {
  const res = await axios.get(baseURL + `/usuarios/email/${email}`);
  return res;
};

export const createUsersRequest = async (user: UserInterface) => {
  console.log(user);
  const res = await axios.post(baseURL + '/auth/sign-up', user)
  return res
}

export const updateUserRequest = async (id: string, User: UserInterface) => {
  const res = await axios.put(baseURL + `/usuarios/${id}`, User)
  return res
}

export const updatePasswordUserRequest = async (email: string, oldPassword: string, newPassword: string, confirmPassword: string) => {
  const res = await axios.post(baseURL + '/auth/new-password', { email, oldPassword, newPassword, confirmPassword })
  return res
}

export const deleteUserRequest = async (id: string) => {
  const res = await axios.delete(baseURL + `/usuarios/${id}`)
  return res
}
