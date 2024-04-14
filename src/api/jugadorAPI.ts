import { Jugador } from '../../types'
import axios from './axios'

export const getJugadoresRequest = () => axios.get('/jugadores')
export const getJugadorRequest = (id: string) => axios.get(`/jugadores/${id}`)
export const createJugadoresRequest = (jugador: Jugador) =>
  axios.post('/jugadores', jugador)
export const updateJugadoresRequest = (id: string, jugador: Jugador) =>
  axios.put(`/jugadores/${id}`, jugador)
export const deleteJugadoresRequest = (id: string) => axios.delete(`/jugadores/${id}`)
