import { ParkingInterface } from '@/lib/interfaces/parking.interface'
import axios from 'axios'
import { BASE_URL } from '../axios'

export const createParkingRequest = async (parking: ParkingInterface) => {
  const res = await axios.post(BASE_URL + '/parking/newParking', parking)
  return res
}

export const getParkingsRequest = async () => {
  const res = await axios.get(BASE_URL + '/parking/getParkings')
  return res
}

export const getOneParkingRequest = async (name2: string) => {
  const res = await axios.get(BASE_URL + `/parking/getParking/?name=${name}`)
  return res;
};

export const deletePakingRequest = async (name: string) => {
  const res = await axios.delete(BASE_URL + `/parking/deleteParking/?name=${name}`)
  return res
}

export const updateParkingRequest = async (parking: ParkingInterface) => {
  const res = await axios.put(BASE_URL + '/parking/modifyParking', parking)
  return res
}