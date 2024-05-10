import { UserInterface } from '@/lib/interfaces/user.interface'
import axios, { AxiosResponse } from 'axios'
import { BASE_URL } from '../axios'

export const getAuthorizedUserRequest = async (email: string, password: string) => {
  try {
    const res = await axios.post(BASE_URL + '/auth/log-in', { email, password });
    return res.data;
  } catch (error) {
    return error;
  }
};

export const createUsersRequest = async (user: UserInterface) => {
  const res = await axios.post(BASE_URL + '/auth/sign-up', user)
  return res as AxiosResponse
}

export const updatePasswordUserRequest = async (email: string, oldPassword: string, newPassword: string, confirmPassword: string) => {
  const res = await axios.post(BASE_URL + '/auth/new-password', { email, oldPassword, newPassword, confirmPassword })
  return res
}

export const getUsersRequest = async () => {
  const res = await axios.get(BASE_URL + '/users/all')
  return res
}

export const getUsersByRoleRequest = async (role: string) => {
  const res = await axios.get(BASE_URL + `/users/user/role/${role}`)
  return res
}

export const getOneUserByEmailRequest = async (email: string) => {
  const res = await axios.get(BASE_URL + `/users/user/email/${email}`)
  return res;
};

export const updateUserRequest = async (user: UserInterface) => {
  const res = await axios.post(BASE_URL + '/users/user/modify', user)
  return res
}

// TODO: Terminar
export const deleteUserRequest = async (email: string) => {
  const res = await axios.get(BASE_URL + `/users/user/delete/${email}`)
  return res
}

// TODO: Terminar
export const unblockUserAccountRequest = async (email: string, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  const res = await axios.post(BASE_URL + '/auth/unlock', { email }, config)

  return res
}