import { ParkingInterface } from '@/lib/interfaces/parking.interface'
import axios from 'axios'
import { BASE_URL } from '../axios'

export const createParkingRequest = async (parking: ParkingInterface) => {
  const res = await axios.post(BASE_URL + '/parkings/parking/new', parking)
  return res
}

export const getOneParkingRequest = async (name: string) => {
  const res = await axios.get(BASE_URL + `/parkings/parking/name/${name}`)
  return res;
};

export const getParkingsRequest = async () => {
  const res = await axios.get(BASE_URL + '/parkings/all')
  return res
}

export const deleteParkingRequest = async (name: string) => {
  const res = await axios.delete(BASE_URL + `/parkings/parking/delete/name/${name}`)
  return res
}

export const updateParkingRequest = async (parking: ParkingInterface) => {
  const res = await axios.put(BASE_URL + '/parkings/parking/update', parking)
  return res
}