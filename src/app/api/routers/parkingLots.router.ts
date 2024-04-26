import { ParkingLotInterface } from '@/lib/interfaces/parkingLot.interface'
import axios from 'axios'

const baseURL = 'http://localhost:8080/api/v1'

export const createParkingLotsRequest = async (parkingLot: ParkingLotInterface) => {
  const res = await axios.post(baseURL + '/auth/sign-up', parkingLot)
  return res
}
