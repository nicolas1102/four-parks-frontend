'use client'

import {
  PieChart,
  Pie,
  Legend,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'
import { useEffect, useState } from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useStatistic } from '@/services/useStatistic'

const COLORS = ['#fde047', '#1865a2', '#c03131', '#6DB04E']

export interface VehicleTypeChartDataInterface {
  tipo: string
  valor: number
}

export function VehicleTypePieChart({ parkingId }: { parkingId: number }) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const {
    getVehicleTypeStatisticsOnDateByParkingId:
      getVehicleTypeStatisticsByParkingId,
  } = useStatistic()
  const [vehicleTypePieChartData, setVehicleTypePieChartData] = useState<
    VehicleTypeChartDataInterface[] | null
  >(null)

  useEffect(() => {
    const fetchVehicleTypePieData = async () => {
      setIsLoading(true)
      const carData = await getVehicleTypeStatisticsByParkingId(
        parkingId,
        {
          beginning: '1800-01-01',
          ending: '2500-01-01',
        },
        1
      )
      const motorcycleData = await getVehicleTypeStatisticsByParkingId(
        parkingId,
        {
          beginning: '1800-01-01',
          ending: '2500-01-01',
        },
        2
      )
      const bikeData = await getVehicleTypeStatisticsByParkingId(
        parkingId,
        {
          beginning: '1800-01-01',
          ending: '2500-01-01',
        },
        3
      )
      const heavyVehicleData = await getVehicleTypeStatisticsByParkingId(
        parkingId,
        {
          beginning: '1800-01-01',
          ending: '2500-01-01',
        },
        4
      )
      if (
        carData !== undefined &&
        motorcycleData !== undefined &&
        bikeData !== undefined &&
        heavyVehicleData !== undefined
      ) {
        const finalData = [
          { tipo: 'Carro', valor: carData },
          { tipo: 'Moto', valor: motorcycleData },
          { tipo: 'Bicicleta', valor: bikeData },
          { tipo: 'V. Pesado', valor: heavyVehicleData },
        ]
        setVehicleTypePieChartData(finalData)
      }
      setIsLoading(false)
    }
    fetchVehicleTypePieData()
  }, [])

  return (
    <Card className='' x-chunk='dashboard-01-chunk-4'>
      <CardHeader className='flex flex-row items-center'>
        <div className='grid gap-2'>
          <CardTitle>Tipo de Vehículo</CardTitle>
          <CardDescription>
            Cantidad de reservas por tipo de vehículo.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className='h-[400px] flex justify-center sm:scale-105 '>
        {isLoading ? (
          <div className='gap-y-9 flex flex-col justify-center items-center'>
            <Skeleton className='h-56 w-56 my-1 rounded-full' />
            <Skeleton className='h-5 w-52 my-1' />
          </div>
        ) : vehicleTypePieChartData === null ? (
          <span className='font-light text-xl italic'>
            No se pudo cargar los datos
          </span>
        ) : (
          <ResponsiveContainer width='100%' height='100%' className='sm:-mt-4'>
            <PieChart width={400} height={400}>
              <Legend />
              <Pie
                dataKey='valor'
                isAnimationActive={true}
                data={vehicleTypePieChartData}
                cx='50%'
                cy='50%'
                outerRadius={110}
                fill='#8884d8'
                label
              >
                {vehicleTypePieChartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    name={entry.tipo}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  )
}
