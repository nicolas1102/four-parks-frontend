import axios from 'axios'
import { BASE_URL } from '../axios'
import { DateRangeInterface } from '@/lib/interfaces/audit.interface'

export const getAuditsRequest = async (dateRange: DateRangeInterface) => {
  const res = await axios.post(BASE_URL + `/auditory/getAuditories/-1`, dateRange)
  return res
}

export const getAuditsByUserIdRequest = async (userId: number, dateRange: DateRangeInterface) => {
  const res = await axios.post(BASE_URL + `/auditory/getAuditories/${userId}`, dateRange)
  return res
}