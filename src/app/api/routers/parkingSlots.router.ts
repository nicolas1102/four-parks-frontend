import axios from 'axios'
import { BASE_URL } from '../axios'

export const getParkingSlotsFromOneParkingByParkingIdRequest = async (parkingId: number) => {
  const res = await axios.get(BASE_URL + '/slots/parking/id/' + parkingId)
  return res
}