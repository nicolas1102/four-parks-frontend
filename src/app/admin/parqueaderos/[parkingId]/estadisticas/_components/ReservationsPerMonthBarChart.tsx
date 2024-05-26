'use client'

import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useEffect, useState } from 'react'
import { useStatistic } from '@/services/useStatistic'

export interface ReservationsPerMonthDataInterface {
  mes: string
  reservas: number
}

export function ReservationsPerMonthBarChart({
  parkingId,
}: {
  parkingId: number
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { getNumberOfReservationsOnDateByParkingId } = useStatistic()
  const [reservationsPerMonthData, setReservationsPerMonthData] = useState<
    ReservationsPerMonthDataInterface[] | null
  >(null)

  useEffect(() => {
    const fetchReservationsPerMonthData = async () => {
      setIsLoading(true)
      const januaryData = await getNumberOfReservationsOnDateByParkingId(
        parkingId,
        {
          beginning: '2024-01-01',
          ending: '2024-02-01',
        }
      )
      const februaryData = await getNumberOfReservationsOnDateByParkingId(
        parkingId,
        {
          beginning: '2024-02-01',
          ending: '2024-03-01',
        }
      )
      const marchData = await getNumberOfReservationsOnDateByParkingId(
        parkingId,
        {
          beginning: '2024-03-01',
          ending: '2024-04-01',
        }
      )
      const aprilData = await getNumberOfReservationsOnDateByParkingId(
        parkingId,
        {
          beginning: '2024-04-01',
          ending: '2024-05-01',
        }
      )
      const mayData = await getNumberOfReservationsOnDateByParkingId(
        parkingId,
        {
          beginning: '2024-05-01',
          ending: '2024-06-01',
        }
      )

      if (
        januaryData !== undefined &&
        februaryData !== undefined &&
        marchData !== undefined &&
        aprilData !== undefined &&
        mayData !== undefined
      ) {
        const finalData = [
          {
            mes: 'Enero',
            reservas: januaryData,
          },
          {
            mes: 'Febrero',
            reservas: februaryData,
          },
          {
            mes: 'Marzo',
            reservas: marchData,
          },
          {
            mes: 'Abril',
            reservas: aprilData,
          },
          {
            mes: 'Mayo',
            reservas: mayData,
          },
        ]
        setReservationsPerMonthData(finalData)
      }
      setIsLoading(false)
    }
    fetchReservationsPerMonthData()
  }, [])

  return (
    <Card className='' x-chunk='dashboard-01-chunk-4'>
      <CardHeader className='flex flex-row items-center'>
        <div className='grid gap-2'>
          <CardTitle>Reservas</CardTitle>
          <CardDescription>
            Cantidad de reservas por mes reciente.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className='h-[400px]'>
        {isLoading ? (
          <div className='gap-x-6 flex flex-row justify-between items-end py-10 px-10 h-full'>
            <Skeleton className='h-64 w-full' />
            <Skeleton className='h-40 w-full' />
            <Skeleton className='h-72 w-full' />
            <Skeleton className='h-56 w-full' />
            <Skeleton className='h-60 w-full' />
            <Skeleton className='h-48 w-full' />
          </div>
        ) : reservationsPerMonthData === null ? (
          <span className='font-light text-xl italic'>
            No se pudo cargar los datos
          </span>
        ) : (
          <ResponsiveContainer width='100%' height='100%'>
            <BarChart
              width={500}
              height={300}
              data={reservationsPerMonthData}
              margin={{
                left: -32,
              }}
            >
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='mes' />
              <YAxis />
              <Tooltip
                wrapperStyle={{ backgroundColor: '#ccc', color: 'black' }}
              />
              <Bar
                dataKey='reservas'
                className='fill-yellowFPC-400'
                activeBar={<Rectangle fill='gold' stroke='blue' />}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  )
}
