'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { TotalRevenueCard } from '../_components/TotalRevenueCard'
import { NumberOfClientsCard } from '../_components/NumberOfClientsCard'
import { VehicleTypePieChart } from '../_components/VehicleTypePieChart'
import { ReservationsPerMonthBarChart } from '../_components/ReservationsPerMonthBarChart'
import { useParking } from '@/services/useParking'
import { ParkingInterface } from '@/lib/interfaces/parking.interface'
import Loader from '@/components/Loader'
import NoResults from '@/components/NoResults'
import { NumberOfReservationsCard } from '../_components/NumberOfReservationsCard'

export default function Page({
  params: { parkingId },
}: {
  params: { parkingId: number }
}) {
  const pdfExportComponent = useRef(null)
  const { getOneParkingById, isLoading } = useParking()
  const [parking, setParking] = useState<ParkingInterface | undefined>()

  const handleExport = (parkingName: string) => {
    const input = pdfExportComponent.current
    if (input) {
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL('image/png')
        const pdf = new jsPDF('p', 'mm', 'a4', true)
        const pdfWidth = pdf.internal.pageSize.getWidth()
        const pdfHeight = pdf.internal.pageSize.getHeight()
        const imgWidth = canvas.width
        const imgHeight = canvas.height
        const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight)
        const imgX = (pdfWidth - imgWidth * ratio) / 2
        const imgY = 0
        pdf.addImage(
          imgData,
          'PNG',
          imgX,
          imgY,
          imgWidth * ratio,
          imgHeight * ratio
        )
        pdf.save(
          `estadísticas_${parkingName}_${new Date().toLocaleDateString(
            'es-CO',
            {
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
            }
          )}.pdf`
        )
      })
    }
  }

  useEffect(() => {
    const fetchParking = async () => {
      setParking(await getOneParkingById(parkingId))
    }
    parkingId.toString() !== '-1' && fetchParking()
  }, [])

  return (
    <div className='m-6 sm:mx-auto sm:my-6 flex flex-col gap-4'>
      {isLoading ? (
        <Loader />
      ) : parking === undefined && parkingId.toString() !== '-1' ? (
        <NoResults />
      ) : (
        <>
          <div className='flex justify-end'>
            <Button
              onClick={() => {
                handleExport(parking ? parking.name : 'fourparks')
              }}
              // TODO: Añadir que se bloquee el boton mientras cargan los datos
              // disabled={}
            >
              <div className='flex flex-row items-center gap-2 tracking-widest'>
                <Download strokeWidth={1.1} />
                EXPORTAR
              </div>
            </Button>
          </div>
          <ScrollArea className='p-6 border border-yellowFPC-400 '>
            <div ref={pdfExportComponent} className='w-[1000px]'>
              <Card className='overflow-hidden'>
                <CardHeader className='flex flex-col justify-center bg-muted/50 bg-yellowFPC-400 text-black'>
                  <CardTitle className='group flex flex-col '>
                    <h1 className='tracking-widest text-3xl mb-2'>
                      INFORME{' '}
                      {parkingId.toString() !== '-1'
                        ? 'GENERAL'
                        : 'DE PARQUEADERO'}
                    </h1>
                  </CardTitle>
                  <CardDescription className='text-base flex justify-between text-primary text-black'>
                    {parkingId.toString() !== '-1' && (
                      <div>
                        <p className='font-bold tracking-widest'>
                          NOMBRE:{' '}
                          <span className='font-medium'>
                            {parking?.name.toUpperCase()}
                          </span>
                        </p>
                        <p className='font-bold tracking-widest'>
                          DIRECCIÓN:{' '}
                          <span className='font-medium'>
                            {parking?.location.address.toUpperCase()}
                          </span>
                        </p>
                        <p className='font-bold tracking-widest'>
                          CIUDAD:{' '}
                          <span className='font-medium'>
                            {parking?.location.city.city.toUpperCase()}
                          </span>
                        </p>
                      </div>
                    )}

                    <div className=''>
                      <p className='font-bold tracking-widest'>
                        HORA:{' '}
                        <span className='font-medium'>
                          {new Date()
                            .toLocaleTimeString('es-CO', {
                              hour: 'numeric',
                              minute: 'numeric',
                            })
                            .toUpperCase()}
                        </span>
                      </p>
                      <p className='font-bold tracking-widest'>
                        FECHA:{' '}
                        <span className='font-medium'>
                          {new Date()
                            .toLocaleDateString('es-CO', {
                              year: 'numeric',
                              month: 'numeric',
                              day: 'numeric',
                            })
                            .toUpperCase()}
                        </span>
                      </p>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent className='py-6 text-sm'>
                  <div className='flex gap-8 flex-col'>
                    <div className='grid grid-cols-3 gap-4'>
                      <TotalRevenueCard parkingId={parkingId} />
                      <NumberOfClientsCard parkingId={parkingId} />
                      <NumberOfReservationsCard parkingId={parkingId} />
                    </div>
                    <VehicleTypePieChart parkingId={parkingId} />
                    <ReservationsPerMonthBarChart parkingId={parkingId} />
                  </div>
                </CardContent>
              </Card>
            </div>
            <ScrollBar orientation='horizontal' />
          </ScrollArea>
        </>
      )}
    </div>
  )
}
