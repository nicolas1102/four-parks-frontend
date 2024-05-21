import { ReservationInterface } from '@/lib/interfaces/reservation.interface'
import axios from 'axios'
import { BASE_URL } from '../axios'

export const createReservationRequest = async (reservation: ReservationInterface) => {

  const res = await axios.post(BASE_URL + '/reservations/reservation/new', reservation)
  return res
}

export const startReservationRequest = async (id: number) => {
  const res = await axios.post(BASE_URL + '/reservations/reservation/start', { idReservation: id })
  return res
}

export const endReservationRequest = async (id: number) => {
  const res = await axios.post(BASE_URL + '/reservations/reservation/end', { idReservation: id })
  return res
}

export const getOneReservationRequest = async (id: number) => {
  const res = await axios.get(BASE_URL + `/reservations/reservation/id/${id}`)
  return res;
};

export const getReservationsRequest = async () => {
  const res = await axios.get(BASE_URL + '/reservations/all')
  return res
}

export const getReservationsByParkingIdRequest = async (parkingId: number) => {
  const res = await axios.get(BASE_URL + `/reservations/parking/id/${parkingId}`)
  return res
}

export const deleteActiveReservationRequest = async (userId: number) => {
  const res = await axios.delete(BASE_URL + `/reservations/reservation/delete/user/${userId}`)
  return res
}