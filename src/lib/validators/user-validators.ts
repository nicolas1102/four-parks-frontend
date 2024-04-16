// validaciones del lado del cliente
import { z } from 'zod'

export const JugadorFormValidator = z.object({
  nombre: z.string().min(1, { message: 'Todo jugador debe tener un nombre.' }),
  apellido: z.string().min(1, { message: 'Todo jugador debe tener un apellido.' }),
  nacionalidad: z.string().min(1, { message: 'Todo jugador debe tener una nacionalidad.' }),
  minutos_jugados: z.number().min(0, { message: 'Los minutos jugados debe ser mayor o igual a 0.' }),
  edad: z.number().min(0, { message: 'La edad debe ser mayor o igual a 0.' }),
  posicion: z.string().min(1, { message: 'Todo jugador debe tener una posición.' }),
  equipo: z.string({
    required_error: "Selecciona un equipo.",
  }),
})

export const EquipoFormValidator = z.object({
  nombre: z.string().min(1, { message: 'Todo equipo debe tener un nombre.' }),
  himno: z.string().min(1, { message: 'Todo equipo debe tener un himno.' }),
  victorias: z.number().min(0, { message: 'Victorias debe ser mayor o igual a 0.' }),
  empates: z.number().min(0, { message: 'Empates debe ser mayor o igual a 0.' }),
  derrotas: z.number().min(0, { message: 'Derrotas debe ser mayor o igual a 0.' }),
  cantidad_titulos: z.number().min(0, { message: 'Cantidad de Titulos debe ser mayor o igual a 0.' }),
  cantidad_jugadores: z.number().min(0, { message: 'Cantidad de Jugadores debe ser mayor o igual a 0.' }),
})

export type TJugadorFormValidator = z.infer<typeof JugadorFormValidator>
export type TEquipoFormValidator = z.infer<typeof EquipoFormValidator>