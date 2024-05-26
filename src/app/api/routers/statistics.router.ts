import axios from 'axios'
import { BASE_URL } from '../axios'
import { DateRangeInterface } from '@/lib/interfaces/statistic.interface'

export const getVehicleTypeStatisticsRequest = async (dateRange: DateRangeInterface, vehicleTypeCode: number) => {
  const res = await axios.post(BASE_URL + `/stats/vehicleType/-1`, { ...dateRange, vehicleTypeCode })
  return res
}

export const getVehicleTypeStatisticsByParkingIdRequest = async (parkingId: number, dateRange: DateRangeInterface, vehicleTypeCode: number) => {
  const res = await axios.post(BASE_URL + `/stats/vehicleType/${parkingId}`, { ...dateRange, vehicleTypeCode })
  return res
}

export const getNumberOfReservationsOnDateByParkingIdRequest = async (parkingId: number, dateRange: DateRangeInterface) => {
  const res = await axios.post(BASE_URL + `/stats/reservationsOnDate/${parkingId}`, dateRange)
  return res
}

export const getNumberOfUsersOnDateRequest = async (dateRange: DateRangeInterface) => {
  const res = await axios.post(BASE_URL + `/stats/getUsersForParking/-1`, dateRange)
  return res
}

export const getIncomesOnDateByParkingIdRequest = async (parkingId: number, dateRange: DateRangeInterface) => {
  const res = await axios.post(BASE_URL + `/stats/incomesOnDate/${parkingId}`, dateRange)
  return res
}



