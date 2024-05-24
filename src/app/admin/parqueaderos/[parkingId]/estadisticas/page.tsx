'use client'

import React, { useRef } from 'react'
import { LineChart, Printer } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useParking } from '@/services/useParking'
import { ParkingInterface } from '@/lib/interfaces/parking.interface'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'
import { Activity, CreditCard, DollarSign, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
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
import { ReservationsPerMonthBarChart } from './_components/ReservationsPerMonthBarChart'
import { VehicleTypePieChart } from './_components/VehicleTypePieChart'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { ComparisonCard } from './_components/ComparisonCard'

export default function Page({
  params: { parkingId },
}: {
  params: { parkingId: number }
}) {
  const { data: session } = useSession()
  const { getOneParking, isLoading: isLoadingParking } = useParking()
  const [parking, setParking] = useState<ParkingInterface | null | undefined>(
    null
  )
  const router = useRouter()
  const { toast } = useToast()
  const [totalRevenue, setTotalRevenue] = useState<{
    presentData: string
    pastData: string
  } | null>(null)
  const [numberOfClientsData, setNumberOfClientsData] = useState<{
    presentData: string
    pastData: string
  } | null>(null)
  const [vehicleTypePieChartData, setVehicleTypePieChartData] = useState<
    | {
        tipo: string
        valor: number
      }[]
    | null
  >(null)
  const [isTotalRevenueLoading, setIsTotalRevenueLoading] = useState(false)
  const [isNumberOfClientsLoading, setIsNumberOfClientsLoading] =
    useState(false)
  const [isVehicleTypeLoading, setIsVehicleTypeLoading] = useState(false)

  useEffect(() => {
    const fetchStatisticsByPaking = async () => {
      // await getReservationsByParking(parkingId)
      // await getReservations()
    }
    // fetchStatisticsByPaking()
  }, [])

  useEffect(() => {
    const fetchParking = async (parkingName: string) => {
      setParking(await getOneParking(parkingName))
    }
    // reservations.length !== 0 &&
    // fetchParking(reservations[0].parkingSlot?.parkingId?.name!)
  }, [])

  useEffect(() => {
    // console.log(parking?.admin?.id);
    // console.log(session?.id);
    // if (
    //   session?.rol === 'ADMINISTRADOR' &&
    //   session?.id !== parking?.admin?.id
    // ) {
    //   toast({
    //     variant: 'destructive',
    //     title: 'Dewey, sal de ahí, esa no es tu familia.',
    //     description:
    //       'No puedes administrar un parqueadero al que no estás asignado.',
    //   })
    //   router.push('/admin')
    // }
  }, [parking, session])

  useEffect(() => {
    setIsTotalRevenueLoading(true)
    const fetchTotalRevenue = () => {
      new Promise(() => {
        setTimeout(() => {
          setIsTotalRevenueLoading(false)
          const datita = {
            presentData: '$45,231.89',
            pastData: '+20.1%',
          }
          setTotalRevenue(datita)
        }, 4000)
      })
    }
    fetchTotalRevenue()
  }, [])

  useEffect(() => {
    setIsNumberOfClientsLoading(true)
    const fetchNumberOfClients = () => {
      new Promise(() => {
        setTimeout(() => {
          setIsNumberOfClientsLoading(false)
          const datita = {
            presentData: '+2350',
            pastData: '+180.1%',
          }
          setNumberOfClientsData(datita)
        }, 2000)
      })
    }
    fetchNumberOfClients()
  }, [])

  useEffect(() => {
    setIsVehicleTypeLoading(true)
    const fetchNumberOfClients = () => {
      new Promise(() => {
        setTimeout(() => {
          setIsVehicleTypeLoading(false)
          const datita = [
            { tipo: 'Carro', valor: 156 },
            { tipo: 'Moto', valor: 232 },
            { tipo: 'Bicicleta', valor: 140 },
            { tipo: 'V. Pesado', valor: 54 },
          ]
          setVehicleTypePieChartData(datita)
        }, 5000)
      })
    }
    fetchNumberOfClients()
  }, [])

  const pdfRef = useRef<HTMLDivElement>(null)

  const downloadPDF = (parkingName: string) => {
    const input = pdfRef.current
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
        const imgY = 30

        // // Add a small text at the top
        // const fontSize = 12 // Adjust font size as needed
        // const text = 'Título del PDF' // Replace with your desired text
        // const textX = pdfWidth - pdf.getTextWidth(text) / 2 // Center text horizontally with some padding
        // const textY = 15 // Adjust vertical position for the text

        // pdf.setFont('Arial', 'bold', fontSize)
        // pdf.setTextColor('black')
        // pdf.text(text + '', textX, textY) // Add the text

        pdf.addImage(
          imgData,
          'PNG',
          imgX,
          imgY,
          imgWidth * ratio,
          imgHeight * ratio
        )
        pdf.save(`estadísticas_${parkingName}.pdf`)
      })
    }
  }

  return (
    <div>
      {/* {isLoading || isLoadingParking ? (
        <Loader />
      ) : reservations.length === 0 || !parkingId ? (
        <NoResults redirection='/admin' />
      ) : ( */}
      <>
        <div className='w-full h-16 py-4 px-6 sm:px-8 border-b flex items-center sticky z-40 sm:top-[65px] top-[65px] backdrop-blur supports-[backdrop-filter]:bg-background/60 '>
          <LineChart className='h-7 w-7 sm:h-8 sm:w-8 mt-1 mr-2' />
          <h2 className='tracking-widest font-normal sm:font-normal text-lg sm:text-xl pr-4'>
            (PARQUEADERO)
          </h2>
          <div className='flex flex-row justify-between w-full items-center'>
            <div className='gap-3 hidden sm:flex'>
              <span className='border-l h-6'></span>
              <p className='text-center text-muted-foreground'>Cra</p>
              <span className='border-l h-6'></span>
              <p className='yext-center text-muted-foreground'>Bogotá</p>
            </div>
            <div>
              <Button
                onClick={() => {
                  // parking?.name && downloadPDF(parking?.name)
                  downloadPDF('goku')
                }}
                disabled={
                  isTotalRevenueLoading ||
                  isLoadingParking ||
                  isNumberOfClientsLoading
                }
              >
                <div className='flex flex-row items-center gap-2'>
                  <Printer strokeWidth={1.1} />
                  IMPRIMIR
                </div>
              </Button>
            </div>
          </div>
        </div>
        <div className=' flex flex-col relative m-6 sm:m-8'>
          <div className='flex min-h-screen  flex-col gap-8' ref={pdfRef}>
            <div className='grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4'>
              <ComparisonCard
                title='Ingresos Totales'
                icon={<DollarSign className='h-4 w-4 text-muted-foreground' />}
                data={totalRevenue}
                isLoading={isTotalRevenueLoading}
              />
              <ComparisonCard
                title='Cantidad de Cliente'
                icon={<Users className='h-4 w-4 text-muted-foreground' />}
                data={numberOfClientsData}
                isLoading={isNumberOfClientsLoading}
              />
              <ComparisonCard
                title='Cantidad Reservas'
                icon={<CreditCard className='h-4 w-4 text-muted-foreground' />}
                data={numberOfClientsData}
                isLoading={isNumberOfClientsLoading}
              />
              <ComparisonCard
                title='Algo más'
                icon={<Activity className='h-4 w-4 text-muted-foreground' />}
                data={totalRevenue}
                isLoading={isTotalRevenueLoading}
              />
            </div>

            <div className='sm:grid gap-8 sm:space-y-0 space-y-8 sm:grid-cols-2'>
              <div className=''>
                <ReservationsPerMonthBarChart />
              </div>
              <div className=''>
                <VehicleTypePieChart
                  title='Reservas'
                  description='Cantidad de reservas por mes reciente.'
                  data={vehicleTypePieChartData}
                  isLoading={isVehicleTypeLoading}
                />
              </div>
            </div>

            <div className='grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3'>
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
                      <TableRow>
                        <TableCell>
                          <div className='font-medium'>Miguel Naranjo</div>
                          <div className='hidden text-sm text-muted-foreground md:inline'>
                            elmigue@gmail.com
                          </div>
                        </TableCell>
                        <TableCell className=''>643 min.</TableCell>
                        <TableCell className='text-right'>$145.300</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <div className='font-medium'>Olivia Smith</div>
                          <div className='hidden text-sm text-muted-foreground md:inline'>
                            olivia@example.com
                          </div>
                        </TableCell>
                        <TableCell className=''>643 min.</TableCell>
                        <TableCell className='text-right'>$145.300</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <div className='font-medium'>Noah Williams</div>
                          <div className='hidden text-sm text-muted-foreground md:inline'>
                            noah@example.com
                          </div>
                        </TableCell>
                        <TableCell className=''>643 min.</TableCell>
                        <TableCell className='text-right'>$145.300</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <div className='font-medium'>Emma Brown</div>
                          <div className='hidden text-sm text-muted-foreground md:inline'>
                            emma@example.com
                          </div>
                        </TableCell>
                        <TableCell className=''>643 min.</TableCell>
                        <TableCell className='text-right'>$145.300</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <div className='font-medium'>Liam Johnson</div>
                          <div className='hidden text-sm text-muted-foreground md:inline'>
                            liam@example.com
                          </div>
                        </TableCell>
                        <TableCell className=''>643 min.</TableCell>
                        <TableCell className='text-right'>$145.300</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              <Card x-chunk='dashboard-01-chunk-5'>
                <CardHeader>
                  <CardTitle>Reservas Recientes</CardTitle>
                </CardHeader>
                <CardContent className='grid gap-8'>
                  <div className='flex items-center gap-4'>
                    <div className='grid gap-1'>
                      <p className='text-sm font-medium leading-none'>
                        Camilo Jiménez
                      </p>
                      <p className='text-sm text-muted-foreground'>
                        camilo@email.com
                      </p>
                    </div>
                    <div className='ml-auto font-medium'>Carro</div>
                  </div>
                  <div className='flex items-center gap-4'>
                    <div className='grid gap-1'>
                      <p className='text-sm font-medium leading-none'>
                        Camilo Jiménez
                      </p>
                      <p className='text-sm text-muted-foreground'>
                        camilo@email.com
                      </p>
                    </div>
                    <div className='ml-auto font-medium'>Carro</div>
                  </div>
                  <div className='flex items-center gap-4'>
                    <div className='grid gap-1'>
                      <p className='text-sm font-medium leading-none'>
                        Camilo Jiménez
                      </p>
                      <p className='text-sm text-muted-foreground'>
                        camilo@email.com
                      </p>
                    </div>
                    <div className='ml-auto font-medium'>Carro</div>
                  </div>
                  <div className='flex items-center gap-4'>
                    <div className='grid gap-1'>
                      <p className='text-sm font-medium leading-none'>
                        Camilo Jiménez
                      </p>
                      <p className='text-sm text-muted-foreground'>
                        camilo@email.com
                      </p>
                    </div>
                    <div className='ml-auto font-medium'>Carro</div>
                  </div>
                  <div className='flex items-center gap-4'>
                    <div className='grid gap-1'>
                      <p className='text-sm font-medium leading-none'>
                        Camilo Jiménez
                      </p>
                      <p className='text-sm text-muted-foreground'>
                        camilo@email.com
                      </p>
                    </div>
                    <div className='ml-auto font-medium'>Carro</div>
                  </div>
                  <div className='flex items-center gap-4'>
                    <div className='grid gap-1'>
                      <p className='text-sm font-medium leading-none'>
                        Camilo Jiménez
                      </p>
                      <p className='text-sm text-muted-foreground'>
                        camilo@email.com
                      </p>
                    </div>
                    <div className='ml-auto font-medium'>Carro</div>
                  </div>
                  <div className='flex items-center gap-4'>
                    <div className='grid gap-1'>
                      <p className='text-sm font-medium leading-none'>
                        Camilo Jiménez
                      </p>
                      <p className='text-sm text-muted-foreground'>
                        camilo@email.com
                      </p>
                    </div>
                    <div className='ml-auto font-medium'>Carro</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </>
      {/* )} */}
    </div>
  )
}
