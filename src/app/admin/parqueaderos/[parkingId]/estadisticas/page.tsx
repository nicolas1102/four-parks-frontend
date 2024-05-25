'use client'

import React, { useRef } from 'react'
import { LineChart, Printer } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useParking } from '@/services/useParking'
import { ParkingInterface } from '@/lib/interfaces/parking.interface'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'
import { Activity, CreditCard, DollarSign, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  ReservationsPerMonthBarChart,
  ReservationsPerMonthDataInterface,
} from './_components/ReservationsPerMonthBarChart'
import {
  VehicleTypeChartDataInterface,
  VehicleTypePieChart,
} from './_components/VehicleTypePieChart'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { TotalRevenueCard } from './_components/TotalRevenueCard'
import { BestCustomersTableCard } from './_components/BestCustomersTableCard'
import { NumberOfClientsCard } from './_components/NumberOfClientsCard'
import { RecentReservationsTableCard } from './_components/RecentReservationsTableCard'
import Loader from '@/components/Loader'
import NoResults from '@/components/NoResults'

export default function Page({
  params: { parkingId },
}: {
  params: { parkingId: number }
}) {
  const { data: session } = useSession()
  const { getOneParkingById, isLoading: isLoadingParking } = useParking()
  const [parking, setParking] = useState<ParkingInterface | null | undefined>(
    null
  )
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const fetchStatisticsByPaking = async () => {
      // await getReservationsByParking(parkingId)
      // await getReservations()
    }
    // fetchStatisticsByPaking()
  }, [])

  useEffect(() => {
    const fetchParking = async (id: number) => {
      setParking(await getOneParkingById(id))
    }
    fetchParking(parkingId)
  }, [])

  useEffect(() => {
    // console.log(parking?.admin?.id);
    // console.log(session?.id);
    // if (
    //   session?.rol === 'ADMINISTRADOR' &&
    //   session?.id !== parking?.admin?.id
    // ) {
    //   toast({
    //     variant: 'destructive',
    //     title: 'Dewey, sal de ahí, esa no es tu familia.',
    //     description:
    //       'No puedes administrar un parqueadero al que no estás asignado.',
    //   })
    //   router.push('/admin')
    // }
  }, [parking, session])
  return (
    <div>
      {/* {isLoading || isLoadingParking ? ( */}
      {isLoadingParking ? (
        <div className='m-6'>
          <Loader />
        </div>
      ) : !parking ? (
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
                    {parking.name.toUpperCase()}
                  </h2>
                </div>
                <div className='gap-3 hidden sm:flex flex-row'>
                  <span className='border-l h-6'></span>
                  <p className='text-center text-muted-foreground'>
                    {parking.location.address}
                  </p>
                  <span className='border-l h-6'></span>
                  <p className='yext-center text-muted-foreground'>
                    {parking.location.city.city}
                  </p>
                </div>
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
              <div className='grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4'>
                <TotalRevenueCard />
                <NumberOfClientsCard />
                <NumberOfClientsCard />
                <TotalRevenueCard />
              </div>

              <div className='grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3'>
                <div className=''>
                  <VehicleTypePieChart />
                </div>
                <div className='xl:col-span-2'>
                  <ReservationsPerMonthBarChart />
                </div>
              </div>
              {/* 
            <div className='grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3'>
              <BestCustomersTableCard />
              <RecentReservationsTableCard />
            </div> */}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
