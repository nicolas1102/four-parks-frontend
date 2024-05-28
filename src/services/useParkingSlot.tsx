'use client'

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react'
import { useToast } from '@/components/ui/use-toast'
import { getParkingSlotsFromOneParkingByParkingIdRequest } from '@/app/api/routers/parkingSlots.router'
import { ParkingSlotInterface } from '@/lib/interfaces/parkingSlot.interface'

interface ParkingSlotContextType {
  parkingSlots: ParkingSlotInterface[]
  setParkingSlots: Dispatch<SetStateAction<ParkingSlotInterface[]>>
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
  getParkingSlotsFromParkingByParkingId: (
    parkingId: number
  ) => Promise<ParkingSlotInterface[]>
}

const ParkingSlotContext = createContext<ParkingSlotContextType | null>(null)

export const useParkingSlot = () => {
  const context = useContext(ParkingSlotContext)
  if (!context) {
    throw new Error('useParkingSlot must be used within a ParkingSlotProvider')
  }
  return context
}

export function ParkingSlotProvider({ children }: { children: ReactNode }) {
  const [parkingSlots, setParkingSlots] = useState<ParkingSlotInterface[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const getParkingSlotsFromParkingByParkingId = async (parkingId: number) => {
    setIsLoading(true)
    try {
      const res = await getParkingSlotsFromOneParkingByParkingIdRequest(
        parkingId
      )
      return res.data
      setParkingSlots(res.data)
    } catch (error: any) {
      if (error?.response?.data) {
        toast({
          variant: 'destructive',
          title:
            'Ha ocurrido un error al intentar obtener los espacios de parqueadero! Por favor intentalo más tarde.',
          description: error?.response.data,
        })
      } else {
        toast({
          variant: 'destructive',
          title: 'No se ha podido conectar con el servidor.',
          description: 'Intentalo más tarde.',
        })
      }
      console.error('Error fetching parkingSlots:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <ParkingSlotContext.Provider
      value={{
        parkingSlots,
        setParkingSlots,
        isLoading,
        setIsLoading,
        getParkingSlotsFromParkingByParkingId,
      }}
    >
      {children}
    </ParkingSlotContext.Provider>
  )
}
