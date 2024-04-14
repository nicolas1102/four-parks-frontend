'use client'

import { createContext, useContext, useState } from 'react'
import {
  getJugadoresRequest,
  getJugadorRequest,
  createJugadoresRequest,
  updateJugadoresRequest,
  deleteJugadoresRequest,
} from '../api/jugadorAPI.ts'
import { ReactNode } from 'react'
import { Jugador } from '../../types.ts'

interface JugadorContextType {
  jugadores: Jugador[]
  createJugador: (equipo: Jugador) => Promise<void>
  getJugadores: () => Promise<void>
  deleteJugador: (id: string) => Promise<void>
  getOneJugador: (id: string) => Promise<Jugador | undefined>
  updateJugador: (id: string, equipo: Jugador) => Promise<void>
}

const JugadorContext = createContext<JugadorContextType | null>(null)

// Creación del objeto del contexto
export const useJugador = () => {
  const context = useContext(JugadorContext)
  if (!context) {
    throw new Error('useJugador must be used within a JugadorProvider')
  }
  return context
}

// eslint-disable-next-line react/prop-types
export function JugadorProvider({ children }: { children: ReactNode }) {
  const [jugadores, setJugadores] = useState([])

  const getJugadores = async () => {
    try {
      const res = await getJugadoresRequest()
      if (res.data) {
        setJugadores(res.data)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const createJugador = async (jugador: Jugador) => {
    const res = await createJugadoresRequest(jugador)
    console.log(res)
  }

  const deleteJugador = async (id: string) => {
    try {
      const res = await deleteJugadoresRequest(id)
      if (res.status === 204)
        setJugadores(jugadores.filter((jugador: Jugador) => jugador._id != id))
    } catch (error) {
      console.log(error)
    }
  }

  const getOneJugador = async (id: string) => {
    try {
      const res = await getJugadorRequest(id)
      return res.data
    } catch (error) {
      console.error(error)
    }
  }

  const updateJugador = async (id: string, jugador: Jugador) => {
    try {
      await updateJugadoresRequest(id, jugador)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <JugadorContext.Provider
      value={{
        jugadores,
        createJugador,
        getJugadores,
        deleteJugador,
        getOneJugador,
        updateJugador,
      }}
    >
      {children}
    </JugadorContext.Provider>
  )
}
