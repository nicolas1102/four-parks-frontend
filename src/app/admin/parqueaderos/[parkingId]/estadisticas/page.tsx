'use client'

import React, { PureComponent, useRef } from 'react'
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import {
  LineChart,
  NotebookPen,
  ParkingSquare,
  Printer,
  User as UserIcons,
} from 'lucide-react'
import Loader from '@/components/Loader'
import { useEffect, useState } from 'react'
import { useParking } from '@/services/useParking'
import { Dialog } from '@/components/ui/dialog'
import NoResults from '@/components/NoResults'
import { useReservation } from '@/services/useReservation'
import { ParkingInterface } from '@/lib/interfaces/parking.interface'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'
import Link from 'next/link'
import {
  Activity,
  ArrowUpRight,
  CircleUser,
  CreditCard,
  DollarSign,
  Menu,
  Package2,
  Search,
  Users,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ReservationsPerMonthBarChart } from './_components/ReservationsPerMonthBarChart'
import { Separator } from '@/components/ui/separator'
import { VehicleTypePieChart } from './_components/VehicleTypePieChart'
import PrimaryButton from '@/components/CustomButtons/PrimaryButton'
import { PDFDownloadLink } from '@react-pdf/renderer'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

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

  const pdfRef = useRef<HTMLDivElement>(null)

  const downloadPDF = (parkingName: string) => {
    const input = pdfRef.current
    if (input) {
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL('image/png')
        const pdf = new jsPDF('l', 'mm', 'a4', true)
        const pdfWidth = pdf.internal.pageSize.getWidth()
        const pdfHeight = pdf.internal.pageSize.getHeight()
        const imgWidth = canvas.width
        const imgHeight = canvas.height
        const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight)
        const imgX = (pdfWidth - imgWidth * ratio) / 2
        const imgY = 30

        // Add a small text at the top
        const fontSize = 12 // Adjust font size as needed
        const text = 'Título del PDF' // Replace with your desired text
        const textX = pdfWidth - pdf.getTextWidth(text) / 2 // Center text horizontally with some padding
        const textY = 15 // Adjust vertical position for the text

        pdf.setFont('Arial', 'bold', fontSize)
        pdf.setTextColor('black')
        pdf.text(text + '', textX, textY) // Add the text

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
        <div className='w-full h-16 py-4 px-6 sm:px-8 border-b flex items-center sticky z-40 sm:top-[66px] top-[65px] backdrop-blur supports-[backdrop-filter]:bg-background/60 '>
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
              >
                <div className='flex flex-row items-center gap-2'>
                  <Printer />
                  IMPRIMIR
                </div>
              </Button>
            </div>
          </div>
        </div>
        <div className=' flex flex-col relative m-6 sm:m-8'>
          <div className='flex min-h-screen  flex-col gap-8' ref={pdfRef}>
            <div className='grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4'>
              <Card x-chunk='dashboard-01-chunk-0'>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Ingresos Totales
                  </CardTitle>
                  <DollarSign className='h-4 w-4 text-muted-foreground' />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>$45,231.89</div>
                  <p className='text-xs text-muted-foreground'>
                    +20.1% desde el mes pasado
                  </p>
                </CardContent>
              </Card>
              <Card x-chunk='dashboard-01-chunk-1'>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Cantidad de Clientes
                  </CardTitle>
                  <Users className='h-4 w-4 text-muted-foreground' />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>+2350</div>
                  <p className='text-xs text-muted-foreground'>
                    +180.1% desde el mes pasado
                  </p>
                </CardContent>
              </Card>
              <Card x-chunk='dashboard-01-chunk-2'>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Cantidad de Reservas
                  </CardTitle>
                  <CreditCard className='h-4 w-4 text-muted-foreground' />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>+12,234</div>
                  <p className='text-xs text-muted-foreground'>
                    +19% desde el mes pasado
                  </p>
                </CardContent>
              </Card>
              <Card x-chunk='dashboard-01-chunk-3'>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Algo más
                  </CardTitle>
                  <Activity className='h-4 w-4 text-muted-foreground' />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>+573</div>
                  <p className='text-xs text-muted-foreground'>
                    +201 desde el mes pasado
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className='sm:grid gap-8 sm:space-y-0 space-y-8 sm:grid-cols-2'>
              <div className=''>
                <ReservationsPerMonthBarChart />
              </div>
              <div className=''>
                <VehicleTypePieChart />
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
