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

export interface CustomerInterface {
  id: number
  name: string
  email: string
  time: number
  revenues: number
}

export function BestCustomersTableCard() {
  const [isLoading, setisLoading] = useState(false)
  const [bestCustomers, setBestCustomers] = useState<CustomerInterface[]>()

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
              time: 343,
              revenues: 239233,
            },
            {
              id: 1,
              name: 'Nicolás Díaz',
              email: 'nicolas@gmail.com',
              time: 343,
              revenues: 239233,
            },
            {
              id: 4,
              name: 'Nicolás Díaz',
              email: 'nicolas@gmail.com',
              time: 343,
              revenues: 239233,
            },
            {
              id: 6,
              name: 'Nicolás Díaz',
              email: 'nicolas@gmail.com',
              time: 343,
              revenues: 239233,
            },
            {
              id: 7,
              name: 'Nicolás Díaz',
              email: 'nicolas@gmail.com',
              time: 343,
              revenues: 239233,
            },
            {
              id: 8,
              name: 'Nicolás Díaz',
              email: 'nicolas@gmail.com',
              time: 343,
              revenues: 239233,
            },
          ]
          setBestCustomers(datita)
          setisLoading(false)
        }, 5000)
      })
    }
    fetchNumberOfClients()
  }, [])

  return (
    <Card className='xl:col-span-2' x-chunk='dashboard-01-chunk-4'>
      <CardHeader className='flex flex-row items-center'>
        <div className='grid gap-2'>
          <CardTitle>Mejores Clientes</CardTitle>
          <CardDescription>
            Clientes con mayor cantidad de uso de nuestros servicios.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cliente</TableHead>
              <TableHead className=''>Tiempo</TableHead>
              <TableHead className='text-right'>Ingresos</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <>
                <TableRow className=''>
                  <TableCell>
                    <Skeleton className='h-4 w-36 my-1' />
                    <Skeleton className='h-3 w-52 my-1' />
                  </TableCell>
                  <TableCell className=''>
                    <Skeleton className='h-4 w-14 my-1' />
                  </TableCell>
                  <TableCell className=''>
                    <Skeleton className='ml-auto h-4 w-16 my-1' />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Skeleton className='h-4 w-36 my-1' />
                    <Skeleton className='h-3 w-52 my-1' />
                  </TableCell>
                  <TableCell className=''>
                    <Skeleton className='h-4 w-14 my-1' />
                  </TableCell>
                  <TableCell className=''>
                    <Skeleton className='ml-auto h-4 w-16 my-1' />
                  </TableCell>
                </TableRow>
                <TableRow >
                  <TableCell>
                    <Skeleton className='h-4 w-36 my-1' />
                    <Skeleton className='h-3 w-52 my-1' />
                  </TableCell>
                  <TableCell className=''>
                    <Skeleton className='h-4 w-14 my-1' />
                  </TableCell>
                  <TableCell className=''>
                    <Skeleton className='ml-auto h-4 w-16 my-1' />
                  </TableCell>
                </TableRow>
                <TableRow >
                  <TableCell  className='w-full'>
                    <Skeleton className='h-4 w-36 my-1' />
                    <Skeleton className='h-3 w-52 my-1' />
                  </TableCell>
                  <TableCell className=''>
                    <Skeleton className='h-4 w-14 my-1' />
                  </TableCell>
                  <TableCell className=''>
                    <Skeleton className='ml-auto h-4 w-16 my-1' />
                  </TableCell>
                </TableRow>
                <TableRow >
                  <TableCell>
                    <Skeleton className='h-4 w-36 my-1' />
                    <Skeleton className='h-3 w-52 my-1' />
                  </TableCell>
                  <TableCell className=''>
                    <Skeleton className='h-4 w-14 my-1' />
                  </TableCell>
                  <TableCell className=''>
                    <Skeleton className='ml-auto h-4 w-16 my-1' />
                  </TableCell>
                </TableRow>
              </>
            ) : bestCustomers === undefined || bestCustomers === null ? (
              <TableRow className=''>
                <span className='font-light text-xl italic'>
                  No se pudo cargar los datos.
                </span>
              </TableRow>
            ) : (
              bestCustomers?.map((bestCustomerItem) => (
                <TableRow key={bestCustomerItem.id}>
                  <TableCell>
                    <div className='font-medium'>{bestCustomerItem.name}</div>
                    <div className='hidden text-sm text-muted-foreground md:inline'>
                      {bestCustomerItem.email}
                    </div>
                  </TableCell>
                  <TableCell className=''>
                    {bestCustomerItem.time} min.
                  </TableCell>
                  <TableCell className='text-right'>
                    ${bestCustomerItem.revenues}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
