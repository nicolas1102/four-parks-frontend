import { UserInterface } from '@/lib/interfaces/user.interface'
import axios from 'axios'

const baseURL = 'http://localhost:8080/api/v1'

export const getAuthorizedUserRequest = async (email: string, password: string) => {
  try {
    const res = await axios.post(baseURL + '/auth/log-in', { email, password });
    return res.data;
  } catch (error) {
    return error;
  }
};

export const createUsersRequest = async (user: UserInterface) => {
  const res = await axios.post(baseURL + '/auth/sign-up', user)
  return res
}

export const updatePasswordUserRequest = async (email: string, oldPassword: string, newPassword: string, confirmPassword: string) => {
  const res = await axios.post(baseURL + '/auth/new-password', { email, oldPassword, newPassword, confirmPassword })
  return res
}

export const getUsersRequest = async () => {
  const res = await axios.get(baseURL + '/users/allUsers')
  return res
}

export const getUsersByRoleRequest = async (role: string) => {
  const res = await axios.get(baseURL + `/users/userByRole/${role}`)
  return res
}

export const getOneUserByEmailRequest = async (email: string) => {
  const res = await axios.get(baseURL + `/users/getOneUser/${email}`)
  return res;
};

// export const getOneUserRequest = async (id: string) => {
//   const res = await axios.get(baseURL + `/usuarios/${id}`)
//   return res
// }

export const updateUserRequest = async (user: UserInterface) => {
  const res = await axios.post(baseURL + '/users/modifyUser', user)
  return res 
}

// TODO: Terminar
export const deleteUserRequest = async (email: string) => {
  const res = await axios.get(baseURL + `/users/deleteUser/${email}`)
  return res
}

// TODO: Terminar
export const unblockUserAccountRequest = async (email: string, token: string) => {    
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };  
  const res = await axios.post(baseURL + '/auth/unlock', email, config)
  return res
}