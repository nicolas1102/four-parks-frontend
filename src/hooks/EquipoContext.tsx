'use client'

import { createContext, useContext, useState } from 'react'
import {
  getEquiposRequest,
  getEquipoRequest,
  createEquiposRequest,
  updateEquiposRequest,
  deleteEquiposRequest,
} from '@/api/equipoAPI.ts'
import { ReactNode } from 'react'
import { Equipo } from '../../types.ts'

interface EquipoContextType {
  equipos: Equipo[]
  createEquipo: (equipo: Equipo) => Promise<void>
  getEquipos: () => Promise<void>
  deleteEquipo: (id: string | string[]) => Promise<void>
  getOneEquipo: (id: string | string[]) => Promise<Equipo>
  updateEquipo: (id: string | string[], equipo: Equipo) => Promise<void>
}

const EquipoContext = createContext<EquipoContextType | null>(null)

// Creación del objeto del contexto
export const useEquipo = () => {
  const context = useContext(EquipoContext)
  if (!context) {
    throw new Error('useEquipo must be used within a EquipoProvider')
  }
  return context
}

export function EquipoProvider({ children }: { children: ReactNode }) {
  const [equipos, setEquipos] = useState<Equipo[]>([])

  const getEquipos = async () => {
    try {
      const res = await getEquiposRequest()
      if (res.data) {
        setEquipos(res.data)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const createEquipo = async (equipo: Equipo) => {
    const res = await createEquiposRequest(equipo)
    console.log(res)
  }

  const deleteEquipo = async (id: string | string[]) => {
    if (typeof id !== 'string') id = id[0]
    try {
      const res = await deleteEquiposRequest(id)
      if (res.status === 204)
        setEquipos(equipos.filter((equipo: Equipo) => equipo._id !== id))
    } catch (error) {
      console.log(error)
    }
  }

  const getOneEquipo = async (id: string | string[]) => {
    if (typeof id !== 'string') id = id[0]
    try {
      const res = await getEquipoRequest(id)
      return res.data
    } catch (error) {
      console.error(error)
    }
  }

  const updateEquipo = async (id: string | string[], equipo: Equipo) => {
    if (typeof id !== 'string') id = id[0]
    try {
      await updateEquiposRequest(id, equipo)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <EquipoContext.Provider
      value={{
        equipos,
        createEquipo,
        getEquipos,
        deleteEquipo,
        getOneEquipo,
        updateEquipo,
      }}
    >
      {children}
    </EquipoContext.Provider>
  )
}
