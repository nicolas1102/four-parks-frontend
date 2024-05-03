import { ParkingInterface } from '@/lib/interfaces/parking.interface'
import axios from 'axios'

const baseURL = 'http://localhost:8080/api/v1'

export const createParkingLotsRequest = async (parkingLot: ParkingInterface) => {
  const res = await axios.post(baseURL + '/auth/sign-up', parkingLot)
  return res
}
