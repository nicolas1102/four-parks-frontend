'use client'

import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
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

export interface ReservationsPerMonthDataInterface {
  mes: string
  reservas: number
}

export function ReservationsPerMonthBarChart() {
  const [isLoading, setisLoading] = useState(false)
  const [reservationsPerMonth, setReservationsPerMonth] = useState<
    ReservationsPerMonthDataInterface[] | null
  >(null)

  useEffect(() => {
    setisLoading(true)
    const fetchReservationsPerMonthData = () => {
      new Promise(() => {
        setTimeout(() => {
          const datita = [
            {
              mes: 'Enero',
              reservas: 30,
            },
            {
              mes: 'Febrero',
              reservas: 23,
            },
            {
              mes: 'Marzo',
              reservas: 40,
            },
            {
              mes: 'Abril',
              reservas: 20,
            },
            {
              mes: 'Mayo',
              reservas: 10,
            },
            {
              mes: 'Junio',
              reservas: 23,
            },
            {
              mes: 'Julio',
              reservas: 43,
            },
          ]
          setReservationsPerMonth(datita)
          setisLoading(false)
        }, 7000)
      })
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
        ) : reservationsPerMonth === null ? (
          <span className='font-light text-xl italic'>
            No se pudo cargar los datos
          </span>
        ) : (
          <ResponsiveContainer width='100%' height='100%'>
            <BarChart
              width={500}
              height={300}
              data={reservationsPerMonth}
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
