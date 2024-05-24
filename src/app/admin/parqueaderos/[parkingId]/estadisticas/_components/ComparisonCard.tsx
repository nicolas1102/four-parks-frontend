import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { DollarSign } from 'lucide-react'
import { Suspense, useState, useEffect } from 'react'

export function ComparisonCard({
  title,
  icon,
  data,
  isLoading,
}: {
  title: string
  icon: React.JSX.Element
  data: {
    presentData: string
    pastData: string
  } | null
  isLoading: boolean
}) {

  return (
    <Card x-chunk='dashboard-01-chunk-0'>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-sm font-medium'>{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className='text-2xl font-bold'>
          {isLoading ? (
            <Skeleton className='h-6 w-56 my-1' />
          ) : data === null ? (
            <span className='font-light text-xl italic'>
              No se pudo cargar los datos
            </span>
          ) : (
            data.presentData
          )}
        </div>
        <p className='text-xs text-muted-foreground'>
          {isLoading ? (
            <Skeleton className='h-5 w-48 my-1' />
          ) : data === null ? (
            <span className='font-light text-sm italic'>
              Intenta más tarde
            </span>
          ) : (
            data.pastData + ' desde el mes pasado'
          )}
        </p>
      </CardContent>
    </Card>
  )
}
