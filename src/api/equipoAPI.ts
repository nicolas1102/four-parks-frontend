import { Equipo } from '../../types'
import axios from './axios'

export const getEquiposRequest = async () => await axios.get('/equipos')
export const getEquipoRequest = (id: string) => axios.get(`/equipos/${id}`)
export const createEquiposRequest = (equipo: Equipo) => axios.post('/equipos', equipo)
export const updateEquiposRequest = (id: string, equipo: Equipo) => axios.put(`/equipos/${id}`, equipo)
export const deleteEquiposRequest = (id: string) => axios.delete(`/equipos/${id}`)
