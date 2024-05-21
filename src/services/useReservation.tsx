'use client'

import {
  createReservationRequest,
  deleteActiveReservationRequest,
  getOneReservationRequest,
  getReservationsRequest,
  startReservationRequest,
  endReservationRequest,
  getReservationsByParkingIdRequest,
  getActiveReservationByUserIdRequest,
  getFinishedReservationsByUserIdRequest,
} from '@/app/api/routers/reservations.router'
import { ReservationInterface } from '@/lib/interfaces/reservation.interface'
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
import { useRouter } from 'next/navigation'

interface ReservationContextType {
  reservations: ReservationInterface[]
  setReservations: Dispatch<SetStateAction<ReservationInterface[]>>
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
  createReservation: (
    reservation: ReservationInterface
  ) => Promise<AxiosResponse<any, any> | undefined>
  getReservations: () => Promise<void>
  getOneReservation: (id: number) => Promise<ReservationInterface | undefined>
  getActiveReservationByUserId: (
    userId: number
  ) => Promise<ReservationInterface | undefined>
  getReservationsByParking: (parkingId: number) => Promise<void>
  getFinishedReservationsByUserId: (userId: number) => Promise<void>
  startReservation: (
    reservation: ReservationInterface
  ) => Promise<AxiosResponse<ReservationInterface, any> | undefined>
  endReservation: (
    reservation: ReservationInterface
  ) => Promise<AxiosResponse<ReservationInterface, any> | undefined>
  deleteReservation: (
    userId: number
  ) => Promise<AxiosResponse<any, any> | undefined>
}

const ReservationContext = createContext<ReservationContextType | null>(null)

export const useReservation = () => {
  const context = useContext(ReservationContext)
  if (!context) {
    throw new Error('useReservation must be used within a ReservationProvider')
  }
  return context
}

export function ReservationProvider({ children }: { children: ReactNode }) {
  const [reservations, setReservations] = useState<ReservationInterface[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const getReservations = async () => {
    setIsLoading(true)
    try {
      const res = await getReservationsRequest()
      setReservations(res.data)
    } catch (error: any) {
      if (error?.response?.data) {
        toast({
          variant: 'destructive',
          title:
            'Ha ocurrido un error al intentar obtener las reservas! Por favor intentalo más tarde.',
          description: error?.response.data,
        })
      } else {
        toast({
          variant: 'destructive',
          title: 'No se ha podido conectar con el servidor.',
          description: 'Intentalo más tarde.',
        })
      }
      console.error('Error fetching reservations:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getReservationsByParking = async (parkingId: number) => {
    setIsLoading(true)
    try {
      const res = await getReservationsByParkingIdRequest(parkingId)
      setReservations(res.data)
    } catch (error: any) {
      if (error?.response?.data) {
        toast({
          variant: 'destructive',
          title:
            'Ha ocurrido un error al intentar obtener las reservas! Por favor intentalo más tarde.',
          description: error?.response.data,
        })
      } else {
        toast({
          variant: 'destructive',
          title: 'No se ha podido conectar con el servidor.',
          description: 'Intentalo más tarde.',
        })
      }
      console.error('Error fetching reservations:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getFinishedReservationsByUserId = async (userId: number) => {
    setIsLoading(true)
    try {
      const res = await getFinishedReservationsByUserIdRequest(userId)
      setReservations(res.data)
    } catch (error: any) {
      if (error?.response?.data) {
        toast({
          variant: 'destructive',
          title:
            'Ha ocurrido un error al intentar obtener las reservas! Por favor intentalo más tarde.',
          description: error?.response.data,
        })
      } else {
        toast({
          variant: 'destructive',
          title: 'No se ha podido conectar con el servidor.',
          description: 'Intentalo más tarde.',
        })
      }
      console.error('Error fetching reservations:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getOneReservation = async (id: number) => {
    try {
      setIsLoading(true)
      const res = await getOneReservationRequest(id)
      // toast({
      //   title: 'Se obtuvo la información del reserva con exito!',
      //   description: '',
      // })
      return res.data as ReservationInterface
    } catch (error: any) {
      if (error?.response?.data) {
        toast({
          variant: 'destructive',
          title:
            'Ha ocurrido un error al intentar obtener los datos de la reserva! Por favor intentalo más tarde.',
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

  const getActiveReservationByUserId = async (userId: number) => {
    try {
      setIsLoading(true)
      const res = await getActiveReservationByUserIdRequest(userId)
      return res.data[0] as ReservationInterface
    } catch (error: any) {
      if (error?.response?.data) {
        toast({
          variant: 'destructive',
          title:
            'Ha ocurrido un error al intentar obtener los datos de la reserva! Por favor intentalo más tarde.',
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

  const createReservation = async (reservation: ReservationInterface) => {
    setIsLoading(true)
    try {
      const res = await createReservationRequest(reservation)
      toast({
        title: '¡Gracias por tu reserva¡',
        description:
          '¡Ya puedes ir a hacer uso de tu parqueadero de FourParksColombia!',
      })
      return res as AxiosResponse<any, any>
    } catch (error: any) {
      console.error('Error creating reservation:', error)
      if (error?.response?.data) {
        toast({
          variant: 'destructive',
          title:
            'Ha ocurrido un error al intentar procesar tu reserva! Por favor intentalo. de nuevo.',
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

  const startReservation = async (reservation: ReservationInterface) => {
    setIsLoading(true)
    try {
      const res = await startReservationRequest(reservation.id!)
      setReservations((prevReservations) => {
        const parkingIndex = prevReservations.findIndex(
          (reservationItem) => reservationItem.id === reservation.id
        )
        const updatedReservations = [...prevReservations]
        updatedReservations[parkingIndex] = reservation
        return updatedReservations
      })
      toast({
        title: 'Se inicio el tiempo de la reserva con éxito!',
        description: '',
      })
      return res as AxiosResponse<any, any>
    } catch (error: any) {
      console.error('Error starting reservation:', error)
      if (error?.response?.data) {
        toast({
          variant: 'destructive',
          title:
            'No se pudo dar inicio al tiempo de la reserva. Por favor intentalo de nuevo.',
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

  const endReservation = async (reservation: ReservationInterface) => {
    setIsLoading(true)
    try {
      const res = await endReservationRequest(reservation.id!)
      setReservations((prevReservations) => {
        const parkingIndex = prevReservations.findIndex(
          (reservationItem) => reservationItem.id === reservation.id
        )
        const updatedReservations = [...prevReservations]
        // dejamos de mostrar la reserva porque ya se concluyo
        updatedReservations.splice(parkingIndex, 1)
        return updatedReservations
      })
      toast({
        title: 'Se dio fin al tiempo de la reserva con éxito!',
        description: '',
      })
      return res as AxiosResponse<any, any>
    } catch (error: any) {
      console.error('Error starting reservation:', error)
      if (error?.response?.data) {
        toast({
          variant: 'destructive',
          title:
            'No se pudo dar fin al tiempo de la reserva. Por favor intentalo de nuevo.',
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

  const deleteReservation = async (userId: number) => {
    setIsLoading(true)
    try {
      const res = await deleteActiveReservationRequest(userId)
      setReservations((prevReservations) =>
        prevReservations.filter(
          (reservation) => reservation.user?.id !== userId
        )
      )
      toast({
        title: 'Se eliminó la reserva activa del usuario con éxito!',
        description: '',
      })
      return res
    } catch (error: any) {
      console.error('Error deleting reservation:', error)
      if (error?.response?.data) {
        toast({
          variant: 'destructive',
          title:
            'No se pudo eliminar la reserva. Por favor intentalo de nuevo.',
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
    <ReservationContext.Provider
      value={{
        reservations,
        setReservations,
        isLoading,
        setIsLoading,
        createReservation,
        getReservations,
        getOneReservation,
        getActiveReservationByUserId,
        getReservationsByParking,
        getFinishedReservationsByUserId,
        startReservation,
        endReservation,
        deleteReservation,
      }}
    >
      {children}
    </ReservationContext.Provider>
  )
}
