import { ParkingRateInterface } from '@/lib/interfaces/parkingRate.interface'
import axios from 'axios'
import { BASE_URL } from '../axios'

export const createParkingRateRequest = async (parkingRate: ParkingRateInterface) => {
  const res = await axios.post(BASE_URL + '/rates/rate/new', parkingRate)
  return res
}

export const getOneParkingRateRequest = async (id: number) => {
  const res = await axios.get(BASE_URL + `/rates/rate/id/${id}`)
  return res;
}

export const getParkingRatesByParkingIdRequest = async (parkingId: number) => {
  const res = await axios.get(BASE_URL + `/rates/parking/id/${parkingId}`)
  return res
}

export const updateParkingRateRequest = async (parkingRate: ParkingRateInterface) => {
  const res = await axios.put(BASE_URL + '/rates/rate/update', parkingRate)
  return res
}
