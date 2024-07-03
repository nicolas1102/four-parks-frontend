'use client'

import React, { PureComponent } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
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

export interface ReservationsPerMonthByVehicleTypeDataInterface {
  mes: string
  Carro: number
  Moto: number
  Bicicleta: number
  Pesado: number
}

export function ReservationsPerMonthByVehicleTypeLineChart({ parkingId }: { parkingId: number }) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const {
    getVehicleTypeStatisticsOnDateByParkingId,
  } = useStatistic()
  const [
    reservationsPerMonthByVehicleTypeData,
    setReservationsPerMonthByVehicleTypeData,
  ] = useState<ReservationsPerMonthByVehicleTypeDataInterface[] | null>(null)

  useEffect(() => {
    const fetchReservationsPerMonthData = async () => {
      setIsLoading(true)
      const carAprilData = await getVehicleTypeStatisticsOnDateByParkingId(
        parkingId,
        {
          beginning: '2024-04-01',
          ending: '2024-05-01',
        },
        1
      )
      const carMayData = await getVehicleTypeStatisticsOnDateByParkingId(
        parkingId,
        {
          beginning: '2024-05-01',
          ending: '2024-06-01',
        },
        1
      )
      const carJuneData = await getVehicleTypeStatisticsOnDateByParkingId(
        parkingId,
        {
          beginning: '2024-06-01',
          ending: '2024-07-01',
        },
        1
      )
      const motorcycleAprilData =
        await getVehicleTypeStatisticsOnDateByParkingId(
          parkingId,
          {
            beginning: '2024-04-01',
            ending: '2024-05-01',
          },
          2
        )
      const motorcycleMayData = await getVehicleTypeStatisticsOnDateByParkingId(
        parkingId,
        {
          beginning: '2024-05-01',
          ending: '2024-06-01',
        },
        2
      )
      const motorcycleJuneData =
        await getVehicleTypeStatisticsOnDateByParkingId(
          parkingId,
          {
            beginning: '2024-06-01',
            ending: '2024-07-01',
          },
          2
        )
      const bikeAprilData = await getVehicleTypeStatisticsOnDateByParkingId(
        parkingId,
        {
          beginning: '2024-04-01',
          ending: '2024-05-01',
        },
        3
      )
      const bikeMayData = await getVehicleTypeStatisticsOnDateByParkingId(
        parkingId,
        {
          beginning: '2024-05-01',
          ending: '2024-06-01',
        },
        3
      )
      const bikeJuneData = await getVehicleTypeStatisticsOnDateByParkingId(
        parkingId,
        {
          beginning: '2024-06-01',
          ending: '2024-07-01',
        },
        3
      )
      const heavyAprilData = await getVehicleTypeStatisticsOnDateByParkingId(
        parkingId,
        {
          beginning: '2024-04-01',
          ending: '2024-05-01',
        },
        4
      )
      const heavyMayData = await getVehicleTypeStatisticsOnDateByParkingId(
        parkingId,
        {
          beginning: '2024-05-01',
          ending: '2024-06-01',
        },
        4
      )
      const heavyJuneData = await getVehicleTypeStatisticsOnDateByParkingId(
        parkingId,
        {
          beginning: '2024-06-01',
          ending: '2024-07-01',
        },
        4
      )

      if (
        carAprilData !== undefined &&
        carMayData !== undefined &&
        carJuneData !== undefined &&
        motorcycleAprilData !== undefined &&
        motorcycleMayData !== undefined &&
        motorcycleJuneData !== undefined &&
        bikeAprilData !== undefined &&
        bikeMayData !== undefined &&
        bikeJuneData !== undefined &&
        heavyAprilData !== undefined &&
        heavyMayData !== undefined &&
        heavyJuneData !== undefined
      ) {
        const finalData = [
          {
            mes: 'Abril',
            Carro: carAprilData,
            Moto: motorcycleAprilData,
            Bicicleta: bikeAprilData,
            Pesado: heavyAprilData,
          },
          {
            mes: 'Mayo',
            Carro: carMayData,
            Moto: motorcycleMayData,
            Bicicleta: bikeMayData,
            Pesado: heavyMayData,
          },
          {
            mes: 'Junio',
            Carro: carJuneData,
            Moto: motorcycleJuneData,
            Bicicleta: bikeJuneData,
            Pesado: heavyJuneData,
          },
        ]
        setReservationsPerMonthByVehicleTypeData(finalData)
      }
      setIsLoading(false)
    }
    fetchReservationsPerMonthData()
  }, [])

  return (
    <Card className='' x-chunk='dashboard-01-chunk-4'>
      <CardHeader className='flex flex-row items-center'>
        <div className='grid gap-2'>
          <CardTitle>Reservas por Tipo Vehículo</CardTitle>
          <CardDescription>
            Cantidad de reservas por tipo de vehículo en meses recientes.
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
        ) : reservationsPerMonthByVehicleTypeData === null ? (
          <span className='font-light text-xl italic'>
            No se pudo cargar los datos
          </span>
        ) : (
          <ResponsiveContainer width='100%' height='100%'>
            <LineChart
              width={500}
              height={300}
              data={reservationsPerMonthByVehicleTypeData}
            >
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='mes' padding={{ left: 30, right: 30 }} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type='monotone' dataKey='Carro' stroke='#fde047' />
              <Line type='monotone' dataKey='Moto' stroke='#1865a2' />
              <Line type='monotone' dataKey='Bicicleta' stroke='#c03131' />
              <Line type='monotone' dataKey='Pesado' stroke='#6DB04E' />
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  )
}
