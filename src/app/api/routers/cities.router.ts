import axios from 'axios'
import { BASE_URL } from '../axios'

export const getCitiesRequest = async () => {
  const res = await axios.get(BASE_URL + '/parkings/cities')
  return res
}