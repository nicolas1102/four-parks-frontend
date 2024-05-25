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

export default function Page({
  params: { parkingId },
}: {
  params: { parkingId: number }
}) {
  const { data: session } = useSession()
  const { getOneParking, isLoading: isLoadingParking } = useParking()
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
    const fetchParking = async (parkingName: string) => {
      setParking(await getOneParking(parkingName))
    }
    // reservations.length !== 0 &&
    // fetchParking(reservations[0].parkingSlot?.parkingId?.name!)
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

  const pdfRef = useRef<HTMLDivElement>(null)

  const downloadPDF = (parkingName: string) => {
    const input = pdfRef.current
    if (input) {
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL('image/png')
        const pdf = new jsPDF('p', 'mm', 'a4', true)
        const pdfWidth = pdf.internal.pageSize.getWidth()
        const pdfHeight = pdf.internal.pageSize.getHeight()
        const imgWidth = canvas.width
        const imgHeight = canvas.height
        const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight)
        const imgX = (pdfWidth - imgWidth * ratio) / 2
        const imgY = 30

        // // Add a small text at the top
        // const fontSize = 12 // Adjust font size as needed
        // const text = 'Título del PDF' // Replace with your desired text
        // const textX = pdfWidth - pdf.getTextWidth(text) / 2 // Center text horizontally with some padding
        // const textY = 15 // Adjust vertical position for the text

        // pdf.setFont('Arial', 'bold', fontSize)
        // pdf.setTextColor('black')
        // pdf.text(text + '', textX, textY) // Add the text

        pdf.addImage(
          imgData,
          'PNG',
          imgX,
          imgY,
          imgWidth * ratio,
          imgHeight * ratio
        )
        pdf.addPage()
        pdf.addImage(
          imgData,
          'PNG',
          imgX,
          imgY,
          imgWidth * ratio,
          imgHeight * ratio
        )
        pdf.save(`estadísticas_${parkingName}.pdf`)
      })
    }
  }

  return (
    <div>
      {/* {isLoading || isLoadingParking ? (
        <Loader />
      ) : reservations.length === 0 || !parkingId ? (
        <NoResults redirection='/admin' />
      ) : ( */}
      <>
        <div className='w-full h-16 py-4 px-6 sm:px-8 border-b flex items-center sticky z-40 sm:top-[65px] top-[65px] backdrop-blur supports-[backdrop-filter]:bg-background/60 '>
          <LineChart className='h-7 w-7 sm:h-8 sm:w-8 mt-1 mr-2' />
          <h2 className='tracking-widest font-normal sm:font-normal text-lg sm:text-xl pr-4'>
            (PARQUEADERO)
          </h2>
          <div className='flex flex-row justify-between w-full items-center'>
            <div className='gap-3 hidden sm:flex'>
              <span className='border-l h-6'></span>
              <p className='text-center text-muted-foreground'>Cra</p>
              <span className='border-l h-6'></span>
              <p className='yext-center text-muted-foreground'>Bogotá</p>
            </div>
            <div>
              <Button
                onClick={() => {
                  // parking?.name && downloadPDF(parking?.name)
                  downloadPDF('goku')
                }}
                // disabled={
                //   isTotalRevenueLoading ||
                //   isLoadingParking ||
                //   isNumberOfClientsLoading
                // }
              >
                <div className='flex flex-row items-center gap-2'>
                  <Printer strokeWidth={1.1} />
                  IMPRIMIR
                </div>
              </Button>
            </div>
          </div>
        </div>
        <div className=' flex flex-col relative m-6 sm:m-8'>
          <div className='flex min-h-screen  flex-col gap-8' ref={pdfRef}>
            {/* TODO: CARD PARA INFO DE PARQUEADERO */}
            <div className='grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4'>
              <TotalRevenueCard />
              <NumberOfClientsCard />
              <NumberOfClientsCard />
              <TotalRevenueCard />
              {/* <TotalRevenueCard
                title='Cantidad de Cliente'
                icon={<Users className='h-4 w-4 text-muted-foreground' />}
                data={numberOfClientsData}
                isLoading={isNumberOfClientsLoading}
              />
              <TotalRevenueCard
                title='Cantidad Reservas'
                icon={<CreditCard className='h-4 w-4 text-muted-foreground' />}
                data={numberOfClientsData}
                isLoading={isNumberOfClientsLoading}
              />
              <TotalRevenueCard
                title='Algo más'
                icon={<Activity className='h-4 w-4 text-muted-foreground' />}
                data={totalRevenue}
                isLoading={isTotalRevenueLoading}
              /> */}
            </div>

            <div className='grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3'>
              <div className=''>
                <VehicleTypePieChart />
              </div>
              <div className='xl:col-span-2'>
                <ReservationsPerMonthBarChart />
              </div>
            </div>

            <div className='grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3'>
              <BestCustomersTableCard />
              <RecentReservationsTableCard />
            </div>
          </div>
        </div>
      </>
      {/* )} */}
    </div>
  )
}
