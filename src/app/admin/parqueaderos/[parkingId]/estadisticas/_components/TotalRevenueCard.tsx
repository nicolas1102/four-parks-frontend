'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { DollarSign } from 'lucide-react'
import { Suspense, useState, useEffect } from 'react'

export interface ComparisonCard {
  presentData: string
  pastData: string
}

export function TotalRevenueCard() {
  const [isLoading, setisLoading] = useState(false)
  const [totalRevenueData, setTotalRevenueData] =
    useState<ComparisonCard | null>(null)

  useEffect(() => {
    setisLoading(true)
    const fetchTotalRevenue = () => {
      new Promise(() => {
        setTimeout(() => {
          const datita = {
            presentData: '$45,231.89',
            pastData: '+20.1%',
          }
          setTotalRevenueData(datita)
          setisLoading(false)
        }, 4000)
      })
    }
    fetchTotalRevenue()
  }, [])
  return (
    <Card x-chunk='dashboard-01-chunk-0'>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-sm font-medium'>Ingresos Totales</CardTitle>
        <DollarSign className='h-4 w-4 text-muted-foreground' />
      </CardHeader>
      <CardContent className='overflow-hidden'>
        <div className='text-2xl font-bold'>
          {isLoading ? (
            <Skeleton className='h-6 w-56 my-1' />
          ) : totalRevenueData === null ? (
            <span className='font-light text-xl italic'>
              No se pudo cargar los datos
            </span>
          ) : (
            totalRevenueData.presentData
          )}
        </div>
        <p className='text-xs text-muted-foreground'>
          {isLoading ? (
            <Skeleton className='h-5 w-48 my-1' />
          ) : totalRevenueData === null ? (
            <span className='font-light text-sm italic'>Intenta más tarde</span>
          ) : (
            totalRevenueData.pastData + ' desde el mes pasado'
          )}
        </p>
      </CardContent>
    </Card>
  )
}
