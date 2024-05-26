'use client'

import { LineChart, Printer } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useParking } from '@/services/useParking'
import { ParkingInterface } from '@/lib/interfaces/parking.interface'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ReservationsPerMonthBarChart } from './_components/ReservationsPerMonthBarChart'
import { VehicleTypePieChart } from './_components/VehicleTypePieChart'
import { TotalRevenueCard } from './_components/TotalRevenueCard'
import { NumberOfClientsCard } from './_components/NumberOfClientsCard'
import Loader from '@/components/Loader'
import NoResults from '@/components/NoResults'
import { NumberOfReservationsCard } from './_components/NumberOfReservationsCard'

export default function Page({
  params: { parkingId },
}: {
  params: { parkingId: number }
}) {
  const { getOneParkingById, isLoading: isLoadingParking } = useParking()
  const [parking, setParking] = useState<ParkingInterface | null | undefined>(
    null
  )
  const router = useRouter()

  useEffect(() => {
    const fetchParking = async (parkingId: number) => {
      setParking(await getOneParkingById(parkingId))
    }
    parkingId.toString() !== '-1' && fetchParking(parkingId)
  }, [])

  return (
    <div>
      {isLoadingParking ? (
        <div className='m-6'>
          <Loader />
        </div>
      ) : !parking && parkingId.toString() !== '-1' ? (
        <div className='m-6'>
          <NoResults redirection='/admin' />
        </div>
      ) : (
        <>
          <div className='w-full h-16 py-4 px-6 sm:px-8 border-b flex items-center sticky z-40 sm:top-[65px] top-[65px] backdrop-blur supports-[backdrop-filter]:bg-background/60 '>
            <div className='flex flex-row justify-between w-full items-center'>
              <div className='sm:flex flex-row items-center'>
                <div className='flex flex-row items-center'>
                  <LineChart className='h-7 w-7 sm:h-8 sm:w-8 mt-1 mr-2' />

                  <h2 className='tracking-widest font-normal sm:font-normal text-xl sm:text-2xl pr-4'>
                    {parkingId.toString() !== '-1'
                      ? parking?.name.toUpperCase()
                      : 'ESTADÍSTICAS GENERALES'}
                  </h2>
                </div>

                {parkingId.toString() !== '-1' && (
                  <div className='gap-3 hidden sm:flex flex-row'>
                    <span className='border-l h-6'></span>
                    <p className='text-center text-muted-foreground'>
                      {parking?.location.address}
                    </p>
                    <span className='border-l h-6'></span>
                    <p className='yext-center text-muted-foreground'>
                      {parking?.location.city.city}
                    </p>
                  </div>
                )}
              </div>
              <div>
                <Button
                  onClick={() => {
                    router.push('./estadisticas/imprimir')
                  }}
                >
                  <div className='flex flex-row items-center gap-2  tracking-widest'>
                    <Printer strokeWidth={1.1} />
                    IMPRIMIR
                  </div>
                </Button>
              </div>
            </div>
          </div>
          <div className=' flex flex-col relative m-6 sm:m-8'>
            <div className='flex flex-col gap-8'>
              <div className='grid gap-4 md:gap-8 lg:grid-cols-3'>
                <TotalRevenueCard parkingId={parkingId} />
                <NumberOfClientsCard />
                <NumberOfReservationsCard parkingId={parkingId} />
              </div>

              <div className='grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3'>
                <div className=''>
                  <VehicleTypePieChart parkingId={parkingId} />
                </div>
                <div className='xl:col-span-2'>
                  <ReservationsPerMonthBarChart parkingId={parkingId} />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
