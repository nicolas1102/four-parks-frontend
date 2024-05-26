'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useStatistic } from '@/services/useStatistic'
import { User } from 'lucide-react'
import { useState, useEffect } from 'react'

export interface ComparisonCard {
  presentData: string
  pastData: string
}

export function NumberOfClientsCard() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { getNumberOfUsersOnDate } = useStatistic()
  const [numberOfClientsData, setNumberOfClientsData] =
    useState<ComparisonCard | null>(null)

  useEffect(() => {
    const fetchNumberOfClients = async () => {
      setIsLoading(true)
      const lastMonthData = await getNumberOfUsersOnDate({
        beginning: '2024-04-01',
        ending: '2024-05-01',
      })
      const currentMonthData = await getNumberOfUsersOnDate({
        beginning: '2024-05-01',
        ending: '2024-06-01',
      })
      if (lastMonthData !== undefined && currentMonthData !== undefined) {
        let pastMonth = currentMonthData >= lastMonthData ? '+' : '-'

        pastMonth =
          lastMonthData > 0
            ? pastMonth + (currentMonthData / lastMonthData) * 100 + '%'
            : pastMonth + '0%'

        const finalData = {
          presentData: '+' + currentMonthData + ' usuarios',
          pastData: pastMonth,
        }
        setNumberOfClientsData(finalData)
      }
      setIsLoading(false)
    }
    fetchNumberOfClients()
  }, [])

  return (
    <Card x-chunk='dashboard-01-chunk-0'>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-sm font-medium'>
          Cantidad de Clientes
        </CardTitle>
        <User className='h-4 w-4 text-muted-foreground' />
      </CardHeader>
      <CardContent className='overflow-hidden'>
        <div className='text-2xl font-bold'>
          {isLoading ? (
            <Skeleton className='h-6 w-56 my-1' />
          ) : numberOfClientsData === null ? (
            <span className='font-light text-xl italic'>
              No se pudo cargar los datos
            </span>
          ) : (
            numberOfClientsData.presentData
          )}
        </div>
        <p className='text-xs text-muted-foreground'>
          {isLoading ? (
            <Skeleton className='h-5 w-48 my-1' />
          ) : numberOfClientsData === null ? (
            <span className='font-light text-sm italic'>Intenta más tarde</span>
          ) : (
            numberOfClientsData.pastData + ' desde el mes pasado'
          )}
        </p>
      </CardContent>
    </Card>
  )
}
