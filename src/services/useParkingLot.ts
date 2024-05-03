'use client'

import {
  createParkingLotsRequest,
  // deleteUserRequest,
  // getOneUserByEmailRequest,
  // getOneUserRequest,
  // getUsersRequest,
  // updateUserRequest,
} from '@/app/api/routers/parkingLots.router'
import { ParkingInterface } from '@/lib/interfaces/parking.interface'
import { useState } from 'react'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'

export function useParkingLot() {
  const [parkings, setParkings] = useState<ParkingInterface[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  // const getParkingLots = async () => {
  //   setIsLoading(true)
  //   try {
  //     const res = await getParkingLotsRequest()
  //     setParkings(res.data)
  //     setIsLoading(false)
  //   } catch (error) {
  //     console.error('Error fetching parkings:', error)
  //   }
  // }

  // const getOneParkingLot = async (id: string) => {
  //   try {
  //     setIsLoading(true)
  //     const res = await getOneParkingLotRequest(id)
  //     setIsLoading(false)
  //     return res.data
  //   } catch (error) {
  //     console.error('Error fetching parking:', error)
  //   }
  // }

  // const createParkingLot = async (parking: ParkingLotInterface) => {    
  //   try {
  //     setIsLoading(true)
  //     const res = await createParkingLotsRequest(parking)
  //     router.push('/auth/log-in')
  //     toast({
  //       title: 'Te has registrado con exito!',
  //       description: `Revisa tu correo! Te hemos enviado tu contraseña a ${parking.email} para que puedas iniciar sesión por primera vez.`,
  //     })
  //     return res
  //   } catch (error: any) {
  //     console.error('Error creating parking:', error)
  //     if (error?.response?.data) {
  //       toast({
  //         variant: 'destructive',
  //         title: 'Ha ocurrido un error al intentar registrar usuario! Por favor intentalo de nuevo.',
  //         description: error?.response.data,
  //       })
  //     } else {
  //       toast({
  //         variant: 'destructive',
  //         title: 'No se ha podido conectar con el servidor.',
  //         description: 'Intentalo más tarde.',
  //       })
  //     }
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }

  // const updateParking = async (id: string, parking: ParkingInterface) => {
  //   try {
  //     setIsLoading(true)
  //     const res = await updateParkingRequest(id, parking)
  //     setIsLoading(false)
  //     return res
  //   } catch (error) {
  //     console.error('Error updating parking:', error)
  //   }
  // }

  // const deleteParkingLot = async (id: string) => {
  //   try {
  //     setIsLoading(true)
  //     const res = await deleteParkingLotRequest(id)
  //     setParkings((prevParkings) => prevParkings.filter((parking) => parking.id !== id))
  //     setIsLoading(false)
  //     return res
  //   } catch (error) {
  //     console.error('Error deleting parking:', error)
  //   }
  // }

  return {  }
}
