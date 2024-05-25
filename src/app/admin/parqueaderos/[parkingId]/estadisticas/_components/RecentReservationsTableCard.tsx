'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { DollarSign } from 'lucide-react'
import { Suspense, useState, useEffect } from 'react'
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

export interface ResentReservationsInterface {
  id: number
  name: string
  email: string
  vehicleType: string
}

export function RecentReservationsTableCard() {
  const [isLoading, setisLoading] = useState(false)
  const [recentReservations, setRecentReservations] =
    useState<ResentReservationsInterface[]>()

  useEffect(() => {
    setisLoading(true)
    const fetchNumberOfClients = () => {
      new Promise(() => {
        setTimeout(() => {
          const datita = [
            {
              id: 2,
              name: 'Nicolás Díaz',
              email: 'nicolas@gmail.com',
              vehicleType: 'Carro',
            },
            {
              id: 6,
              name: 'Nicolás Díaz',
              email: 'nicolas@gmail.com',
              vehicleType: 'Carro',
            },
            {
              id: 3,
              name: 'Nicolás Díaz',
              email: 'nicolas@gmail.com',
              vehicleType: 'Carro',
            },
            {
              id: 4,
              name: 'Nicolás Díaz',
              email: 'nicolas@gmail.com',
              vehicleType: 'Carro',
            },
            {
              id: 5,
              name: 'Nicolás Díaz',
              email: 'nicolas@gmail.com',
              vehicleType: 'Carro',
            },
            {
              id: 7,
              name: 'Nicolás Díaz',
              email: 'nicolas@gmail.com',
              vehicleType: 'Carro',
            },
            {
              id: 8,
              name: 'Nicolás Díaz',
              email: 'nicolas@gmail.com',
              vehicleType: 'Carro',
            },
            {
              id: 9,
              name: 'Nicolás Díaz',
              email: 'nicolas@gmail.com',
              vehicleType: 'Carro',
            },
          ]
          setRecentReservations(datita)
          setisLoading(false)
        }, 9000)
      })
    }
    fetchNumberOfClients()
  }, [])

  return (
    <Card x-chunk='dashboard-01-chunk-5'>
      <CardHeader>
        <CardTitle>Reservas Recientes</CardTitle>
      </CardHeader>
      <CardContent className='grid gap-8'>
        {isLoading ? (
          <>
            <div className='flex items-center gap-4'>
              <div className='grid gap-1'>
                <Skeleton className='h-4 w-20' />
                <Skeleton className='h-4 w-32' />
              </div>
              <div className='ml-auto font-medium'>
                <Skeleton className='ml-auto h-4 w-14 my-1' />
              </div>
            </div>
            <div className='flex items-center gap-4'>
              <div className='grid gap-1'>
                <Skeleton className='h-4 w-20' />
                <Skeleton className='h-4 w-32' />
              </div>
              <div className='ml-auto font-medium'>
                <Skeleton className='ml-auto h-4 w-14 my-1' />
              </div>
            </div>
            <div className='flex items-center gap-4'>
              <div className='grid gap-1'>
                <Skeleton className='h-4 w-20' />
                <Skeleton className='h-4 w-32' />
              </div>
              <div className='ml-auto font-medium'>
                <Skeleton className='ml-auto h-4 w-14 my-1' />
              </div>
            </div>
            <div className='flex items-center gap-4'>
              <div className='grid gap-1'>
                <Skeleton className='h-4 w-20' />
                <Skeleton className='h-4 w-32' />
              </div>
              <div className='ml-auto font-medium'>
                <Skeleton className='ml-auto h-4 w-14 my-1' />
              </div>
            </div>
            <div className='flex items-center gap-4'>
              <div className='grid gap-1'>
                <Skeleton className='h-4 w-20' />
                <Skeleton className='h-4 w-32' />
              </div>
              <div className='ml-auto font-medium'>
                <Skeleton className='ml-auto h-4 w-14 my-1' />
              </div>
            </div>
            <div className='flex items-center gap-4'>
              <div className='grid gap-1'>
                <Skeleton className='h-4 w-20' />
                <Skeleton className='h-4 w-32' />
              </div>
              <div className='ml-auto font-medium'>
                <Skeleton className='ml-auto h-4 w-14 my-1' />
              </div>
            </div>
            <div className='flex items-center gap-4'>
              <div className='grid gap-1'>
                <Skeleton className='h-4 w-20' />
                <Skeleton className='h-4 w-32' />
              </div>
              <div className='ml-auto font-medium'>
                <Skeleton className='ml-auto h-4 w-14 my-1' />
              </div>
            </div>
            <div className='flex items-center gap-4'>
              <div className='grid gap-1'>
                <Skeleton className='h-4 w-20' />
                <Skeleton className='h-4 w-32' />
              </div>
              <div className='ml-auto font-medium'>
                <Skeleton className='ml-auto h-4 w-14 my-1' />
              </div>
            </div>
            <div className='flex items-center gap-4'>
              <div className='grid gap-1'>
                <Skeleton className='h-4 w-20' />
                <Skeleton className='h-4 w-32' />
              </div>
              <div className='ml-auto font-medium'>
                <Skeleton className='ml-auto h-4 w-14 my-1' />
              </div>
            </div>
          </>
        ) : recentReservations === undefined || recentReservations === null ? (
          <div className='flex items-center gap-4'>
            <span className='font-light text-xl italic'>
              No se pudo cargar los datos.
            </span>
          </div>
        ) : (
          recentReservations?.map((recentReservationItem) => (
            <div
              className='flex items-center gap-4'
              key={recentReservationItem.id}
            >
              <div className='grid gap-1'>
                <p className='text-sm font-medium leading-none'>
                  {recentReservationItem.name}
                </p>
                <p className='text-sm text-muted-foreground'>
                  {recentReservationItem.email}
                </p>
              </div>
              <div className='ml-auto font-medium'>
                {recentReservationItem.vehicleType}
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}
