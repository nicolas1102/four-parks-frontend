'use client'

import { NotebookPen, ParkingSquare, User as UserIcons } from 'lucide-react'
import Loader from '@/components/Loader'
import { ReservationsTable } from './_components/ReservationsTable'
import { useEffect, useState } from 'react'
import { useParking } from '@/services/useParking'
import { Dialog } from '@/components/ui/dialog'
import NoResults from '@/components/NoResults'
import { useReservation } from '@/services/useReservation'
import { ParkingInterface } from '@/lib/interfaces/parking.interface'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'

export default function Page({
  params: { parkingId },
}: {
  params: { parkingId: number }
}) {
  const { data: session } = useSession()
  const { reservations, isLoading, getReservationsByParking, getReservations } =
    useReservation()
  const { getOneParking, isLoading: isLoadingParking } = useParking()
  const [parking, setParking] = useState<ParkingInterface | null | undefined>(
    null
  )
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const fetchReservationsByPaking = async () => {
      // await getReservationsByParking(parkingId)
      await getReservations()
    }
    fetchReservationsByPaking()
  }, [])

  useEffect(() => {
    const fetchParking = async (parkingName: string) => {
      setParking(await getOneParking(parkingName))
    }
    reservations.length !== 0 &&
      fetchParking(reservations[0].parkingSlot?.parkingId?.name!)
  }, [reservations])

  useEffect(() => {
    if (
      session?.rol === 'ADMINISTRADOR' &&
      session?.id !== parking?.admin?.id
    ) {
      toast({
        variant: 'destructive',
        title: 'Dewey, sal de ahí, esa no es tu familia.',
        description:
          'No puedes administrar un parqueadero al que no estás asignado.',
      })
      router.push('/admin')
    }
  }, [parking, session])

  return (
    <div className=' flex flex-col relative m-6 sm:m-10'>
      {isLoading || isLoadingParking ? (
        <Loader />
      ) : reservations.length === 0 || !parkingId ? (
        <NoResults redirection='/admin' />
      ) : (
        <>
          <div className=' flex flex-col gap-y-2'>
            <h1 className='text-3xl font-normal tracking-wider text-primary sm:text-4xl inline-flex'>
              <NotebookPen className='h-7 w-7 sm:h-9 sm:w-9 mt-1 mr-2' />
              RESERVAS
            </h1>
            <div>
              <p className='text-sm tracking-widest font-medium'>
                PARQUEADERO:{' '}
                <span className='font-normal'>
                  {' '}
                  {parking?.name.toUpperCase()}
                </span>
              </p>
              <p className='text-sm tracking-widest font-medium'>
                DIRECCIÓN:
                <span className='font-normal'>
                  {' '}
                  {parking?.location.address.toUpperCase()}
                </span>
              </p>
              <p className='text-sm tracking-widest font-medium'>
                CIUDAD:
                <span className='font-normal'>
                  {' '}
                  {parking?.location.city.city.toUpperCase()}
                </span>
              </p>
              <p className='text-sm tracking-widest font-medium'>
                ADMINISTRADOR:
                <span className='font-normal'>
                  {' '}
                  {parking?.admin?.firstName.toUpperCase() +
                    ' ' +
                    parking?.admin?.firstLastname.toUpperCase()}
                </span>
              </p>
            </div>
          </div>
          <ReservationsTable data={reservations} />
        </>
      )}
    </div>
  )
}
