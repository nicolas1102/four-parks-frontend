'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { CreditCard } from 'lucide-react'
import { useState, useEffect } from 'react'

export interface ComparisonCard {
  presentData: string
  pastData: string
}

export function NumberOfClientsCard() {
  const [isLoading, setisLoading] = useState(false)
  const [numberOfClientsData, setNumberOfClientsData] =
    useState<ComparisonCard | null>(null)

  useEffect(() => {
    setisLoading(true)
    const fetchNumberOfClients = () => {
      new Promise(() => {
        setTimeout(() => {
          const datita = {
            presentData: '+2350',
            pastData: '+180.1%',
          }
          setNumberOfClientsData(datita)
          setisLoading(false)
        }, 2000)
      })
    }
    fetchNumberOfClients()
  }, [])

  return (
    <Card x-chunk='dashboard-01-chunk-0'>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-sm font-medium'>Cantidad de Clientes</CardTitle>
        <CreditCard className='h-4 w-4 text-muted-foreground' />
      </CardHeader>
      <CardContent>
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
