'use client'

import {
  createParkingRequest,
  deleteParkingRequest,
  getOneParkingByIdRequest,
  getOneParkingRequest,
  getParkingsRequest,
  updateParkingRequest,
} from '@/app/api/routers/parkings.router'
import { ParkingInterface } from '@/lib/interfaces/parking.interface'
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react'
import { useToast } from '@/components/ui/use-toast'
import { AxiosResponse } from 'axios'

interface ParkingContextType {
  parkings: ParkingInterface[]
  setParkings: Dispatch<SetStateAction<ParkingInterface[]>>
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
  createParking: (
    parking: ParkingInterface
  ) => Promise<AxiosResponse<any, any> | undefined>
  getParkings: () => Promise<void>
  getOneParking: (name: string) => Promise<ParkingInterface | undefined>
  getOneParkingById: (id: number) => Promise<ParkingInterface | undefined>
  updateParking: (
    parking: ParkingInterface
  ) => Promise<AxiosResponse<ParkingInterface, any> | undefined>
  deleteParking: (name: string) => Promise<AxiosResponse<any, any> | undefined>
}

const ParkingContext = createContext<ParkingContextType | null>(null)

export const useParking = () => {
  const context = useContext(ParkingContext)
  if (!context) {
    throw new Error('useParking must be used within a ParkingProvider')
  }
  return context
}

export function ParkingProvider({ children }: { children: ReactNode }) {
  const [parkings, setParkings] = useState<ParkingInterface[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const getParkings = async () => {
    setIsLoading(true)
    try {
      const res = await getParkingsRequest()      
      setParkings(res.data)
    } catch (error: any) {
      if (error?.response?.data) {
        toast({
          variant: 'destructive',
          title:
            'Ha ocurrido un error al intentar obtener los parqueaderos! Por favor intentalo más tarde.',
          description: error?.response.data,
        })
      } else {
        toast({
          variant: 'destructive',
          title: 'No se ha podido conectar con el servidor.',
          description: 'Intentalo más tarde.',
        })
      }
      console.error('Error fetching parkings:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getOneParking = async (name: string) => {
    try {
      setIsLoading(true)
      const res = await getOneParkingRequest(name)
      return res.data as ParkingInterface
    } catch (error: any) {
      if (error?.response?.data) {
        toast({
          variant: 'destructive',
          title:
            'Ha ocurrido un error al intentar obtener los datos del parqueadero! Por favor intentalo más tarde.',
          description: error?.response.data,
        })
      } else {
        toast({
          variant: 'destructive',
          title: 'No se ha podido conectar con el servidor.',
          description: 'Intentalo más tarde.',
        })
      }
      console.error('Error fetching user:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getOneParkingById = async (id: number) => {
    try {
      setIsLoading(true)
      const res = await getOneParkingByIdRequest(id)
      return res.data as ParkingInterface
    } catch (error: any) {
      if (error?.response?.data) {
        toast({
          variant: 'destructive',
          title:
            'Ha ocurrido un error al intentar obtener los datos del parqueadero! Por favor intentalo más tarde.',
          description: error?.response.data,
        })
      } else {
        toast({
          variant: 'destructive',
          title: 'No se ha podido conectar con el servidor.',
          description: 'Intentalo más tarde.',
        })
      }
      console.error('Error fetching user:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const createParking = async (parking: ParkingInterface) => {
    setIsLoading(true)
    try {
      const res = await createParkingRequest(parking)
      const newParking = await getOneParking(parking.name)
      if (newParking) {
        setParkings((prevParkings: ParkingInterface[]) => [
          ...prevParkings,
          newParking,
        ])
      }
      toast({
        title: 'El parqueadero fue creado con éxito!',
        description: '',
      })
      return res as AxiosResponse<any, any>
    } catch (error: any) {
      console.error('Error creating parking:', error)
      if (error?.response?.data) {
        toast({
          variant: 'destructive',
          title:
            'Ha ocurrido un error al intentar crear un parqieadero! Por favor intentalo. de nuevo.',
          description: error?.response.data,
        })
      } else {
        toast({
          variant: 'destructive',
          title: 'No se ha podido conectar con el servidor.',
          description: 'Intentalo más tarde.',
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  const updateParking = async (parking: ParkingInterface) => {
    setIsLoading(true)
    try {
      const res = await updateParkingRequest(parking)
      setParkings((prevParkings) => {
        const parkingIndex = prevParkings.findIndex(
          (parkingItem) => parkingItem.name === parking.name
        )
        const updatedParkings = [...prevParkings]
        updatedParkings[parkingIndex] = parking
        return updatedParkings
      })
      toast({
        title: 'Se actualizó la información del parqueadero con éxito!',
        description: '',
      })
      return res as AxiosResponse<any, any>
    } catch (error: any) {
      console.error('Error deleting parking:', error)
      if (error?.response?.data) {
        toast({
          variant: 'destructive',
          title:
            'No se pudo actualizar la información del parqueadero. Por favor intentalo de nuevo.',
          description: error.response.data,
        })
      } else {
        toast({
          variant: 'destructive',
          title: 'No se ha podido conectar con el servidor.',
          description: 'Intentalo más tarde.',
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  const deleteParking = async (name: string) => {
    setIsLoading(true)
    try {
      const res = await deleteParkingRequest(name)
      setParkings((prevParkings) =>
        prevParkings.filter((parking) => parking.name !== name)
      )
      toast({
        title: 'Se eliminó el parqueadero con éxito!',
        description: '',
      })
      return res
    } catch (error: any) {
      console.error('Error deleting parking:', error)
      if (error?.response?.data) {
        toast({
          variant: 'destructive',
          title:
            'No se pudo eliminar el parqueadero. Por favor intentalo de nuevo.',
          description: error.response.data,
        })
      } else {
        toast({
          variant: 'destructive',
          title: 'No se ha podido conectar con el servidor.',
          description: 'Intentalo más tarde.',
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <ParkingContext.Provider
      value={{
        parkings,
        setParkings,
        isLoading,
        setIsLoading,
        getOneParking,
        getOneParkingById,
        createParking,
        getParkings,
        updateParking,
        deleteParking,
      }}
    >
      {children}
    </ParkingContext.Provider>
  )
}
