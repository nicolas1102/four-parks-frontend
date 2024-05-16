'use client'

import {
  createParkingRateRequest,
  getOneParkingRateRequest,
  getParkingRatesByParkingIdRequest,
  updateParkingRateRequest,
} from '@/app/api/routers/parkingRate.router'
import { ParkingRateInterface } from '@/lib/interfaces/parkingRate.interface'
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import { AxiosResponse } from 'axios'

interface ParkingRateContextType {
  parkingRateRates: ParkingRateInterface[]
  setParkingRates: Dispatch<SetStateAction<ParkingRateInterface[]>>
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
  getParkingRatesByParkingId: (adminId: number) => void
  getOneParkingRate: (
    id: number
  ) => Promise<ParkingRateInterface | undefined> | ParkingRateInterface
  createParkingRate: (parking: ParkingRateInterface) => Promise<AxiosResponse<any, any> | undefined>
  updateParkingRate: (
    parkingRate: ParkingRateInterface
  ) => Promise<AxiosResponse<ParkingRateInterface, any> | undefined>
}

const ParkingRateContext = createContext<ParkingRateContextType | null>(null)

export const useParkingRate = () => {
  const context = useContext(ParkingRateContext)
  if (!context) {
    throw new Error('useParkingRate must be used within a ParkingRateProvider')
  }
  return context
}

export function ParkingRateProvider({ children }: { children: ReactNode }) {
  const [parkingRateRates, setParkingRates] = useState<ParkingRateInterface[]>(
    []
  )
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const getParkingRatesByParkingId = async (parkingId: number) => {
    try {
      setIsLoading(true)
      const res = await getParkingRatesByParkingIdRequest(parkingId)
      toast({
        title:
          'Se obtuvo la información de los precios de parqueadero con exito!',
        description: '',
      })
      setParkingRates(res.data)
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

  const getOneParkingRate = async (id: number) => {
    try {
      setIsLoading(true)
      const res = await getOneParkingRateRequest(id)
      return res.data as ParkingRateInterface
    } catch (error: any) {
      if (error?.response?.data) {
        toast({
          variant: 'destructive',
          title:
            'Ha ocurrido un error al intentar obtener los datos del precio de parqueadero! Por favor intentalo más tarde.',
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

  const createParkingRate = async (parkingRate: ParkingRateInterface) => {
    setIsLoading(true)
    try {
      const res = await createParkingRateRequest(parkingRate)
      return res as AxiosResponse<any, any>
    } catch (error: any) {
      console.error('Error creating parking:', error)
      if (error?.response?.data) {
        toast({
          variant: 'destructive',
          title:
            'Ha ocurrido un error al intentar crear el precio de parqueadero! Por favor intentalo. de nuevo.',
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

  const updateParkingRate = async (parkingRate: ParkingRateInterface) => {
    setIsLoading(true)
    try {
      const res = await updateParkingRateRequest(parkingRate)
      setParkingRates((prevParkingRates) => {
        const parkingRateIndex = prevParkingRates.findIndex(
          (parkingRateItem) => parkingRateItem.id === parkingRate.id
        )
        const updatedParkingRates = [...prevParkingRates]
        updatedParkingRates[parkingRateIndex] = parkingRate
        return updatedParkingRates
      })
      return res as AxiosResponse<any, any>
    } catch (error: any) {
      console.error('Error updating parkingRate:', error)
      if (error?.response?.data) {
        toast({
          variant: 'destructive',
          title:
            'No se pudo actualizar la información del precio de parqueadero. Por favor intentalo de nuevo.',
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
    <ParkingRateContext.Provider
      value={{
        parkingRateRates,
        setParkingRates,
        isLoading,
        setIsLoading,
        getParkingRatesByParkingId,
        getOneParkingRate,
        createParkingRate,
        updateParkingRate,
      }}
    >
      {children}
    </ParkingRateContext.Provider>
  )
}
