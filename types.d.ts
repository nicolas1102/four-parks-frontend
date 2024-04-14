export interface Jugador {
  _id?: string
  nombre: string
  apellido: string
  nacionalidad: string
  minutos_jugados: number
  posicion: string
  edad: number
  equipo: string
  id_equipo?: string
}

export interface Equipo {
  _id?: string
  nombre: string
  himno: string
  victorias: number
  empates: number
  derrotas: number
  cantidad_titulos: number
  cantidad_jugadores: number
}

