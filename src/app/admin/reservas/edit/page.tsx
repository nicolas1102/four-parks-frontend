'use client'

import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import Loader from '@/components/Loader'
var QRCode = require('qrcode')

import {
  Car,
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
  Clock,
  Copy,
  CreditCard,
  Mail,
  Map,
  MapPin,
  MoreVertical,
  ParkingSquare,
  Truck,
  User,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useReservation } from '@/services/useReservation'
import { ReservationInterface } from '@/lib/interfaces/reservation.interface'
import NoResults from '@/components/NoResults'
import { DateTime } from 'luxon'
import PrimaryButton from '@/components/CustomButtons/PrimaryButton'
import { StartReservationDialog } from './_components/StartReservationDialog'
import { EndReservationDialog } from './_components/EndReservationDialog'

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

const Page = ({ searchParams }: PageProps) => {
  const reservationId = searchParams.reservationId
  const { data: session } = useSession()
  const { getOneReservation, isLoading } = useReservation()
  const [reservation, setReservation] = useState<
    ReservationInterface | null | undefined
  >(null)

  useEffect(() => {
    const fetchOrder = async (reservationId: number) => {
      setReservation(await getOneReservation(reservationId))
    }

    reservationId &&
      typeof reservationId === 'string' &&
      fetchOrder(parseInt(reservationId))
  }, [])

  return (
    <div className='flex justify-center w-full'>
      {!session || isLoading ? (
        <Loader />
      ) : !reservationId ? (
        <div className='sm:m-8 m-6'>
          <NoResults />
        </div>
      ) : (
        session &&
        reservationId && (
          <div className='sm:w-[550px] sm:my-10 m-6'>
            <Card className='overflow-hidden'>
              <CardHeader className='flex flex-col justify-center bg-muted/50'>
                <CardTitle className='group flex flex-col '>
                  <p className='tracking-widest sm:text-2xl text-xl text-center'>
                    RESERVA N° <span className='mt-2'>{reservation?.id}</span>
                  </p>
                </CardTitle>
              </CardHeader>
              <CardContent className='py-6 text-sm'>
                <div className='grid gap-3'>
                  <div className='grid gap-1'>
                    <div className='font-semibold'>Información de Cliente</div>
                    <dl className='grid gap-3'>
                      <div className='flex items-center justify-between'>
                        <dt className='flex items-center gap-1 text-muted-foreground'>
                          <User className='h-4 w-4' />
                          Cliente
                        </dt>
                        <dd>
                          {reservation?.user?.firstName +
                            ' ' +
                            reservation?.user?.firstLastname}
                        </dd>
                      </div>
                      <div className='flex items-center justify-between'>
                        <dt className='flex items-center gap-1 text-muted-foreground'>
                          <Mail className='h-4 w-4' />
                          Email
                        </dt>
                        <dd>
                          <a href='mailto:'>{reservation?.user?.email}</a>
                        </dd>
                      </div>
                    </dl>
                  </div>
                  <Separator className='my-4' />

                  <div className='grid gap-1'>
                    <div className='font-semibold'>Información Parqueadero</div>
                    <dl className='grid gap-3'>
                      <div className='flex items-center justify-between'>
                        <dt className='flex items-center gap-1 text-muted-foreground'>
                          <ParkingSquare className='h-4 w-4' />
                          Nombre
                        </dt>
                        <dd>{reservation?.parkingSlot?.parkingId?.name}</dd>
                      </div>
                      <div className='flex items-center justify-between'>
                        <dt className='flex items-center gap-1 text-muted-foreground'>
                          <MapPin className='h-4 w-4' />
                          Dirección
                        </dt>
                        <dd>
                          {
                            reservation?.parkingSlot?.parkingId?.location
                              .address
                          }
                        </dd>
                      </div>
                      <div className='flex items-center justify-between'>
                        <dt className='flex items-center gap-1 text-muted-foreground'>
                          <Map className='h-4 w-4' />
                          Ciudad
                        </dt>
                        <dd>
                          {
                            reservation?.parkingSlot?.parkingId?.location.city
                              .city
                          }
                        </dd>
                      </div>
                    </dl>
                  </div>
                  <Separator className='my-2' />
                  <div className='grid gap-1'>
                    <div className='font-semibold'>Resumen Reserva</div>
                    <dl className='grid gap-3'>
                      <div className='flex items-center justify-between'>
                        <dt className='flex items-center gap-1 text-muted-foreground'>
                          <Car className='h-4 w-4' />
                          Tipo de Vehículo
                        </dt>
                        <dd>{reservation?.parkingSlot?.vehicleTypeId.type}</dd>
                      </div>
                      {reservation?.reservationTime && (
                        <div className='flex items-center justify-between'>
                          <dt className='flex items-center gap-1 text-muted-foreground'>
                            <Clock className='h-4 w-4' />
                            Hora Reserva
                          </dt>
                          <dd>
                            {DateTime.fromISO(reservation?.reservationTime)
                              .setLocale('co')
                              .toLocaleString({
                                hour: 'numeric',
                                minute: 'numeric',
                              }) +
                              ' - ' +
                              DateTime.fromISO(reservation?.reservationTime)
                                .setLocale('co')
                                .toLocaleString()}
                          </dd>
                        </div>
                      )}
                      {reservation?.reservationStartTime && (
                        <div className='flex items-center justify-between'>
                          <dt className='flex items-center gap-1 text-muted-foreground'>
                            <Clock className='h-4 w-4' />
                            Hora Inicio Reserva
                          </dt>
                          <dd>
                            {DateTime.fromISO(reservation?.reservationStartTime)
                              .setLocale('co')
                              .toLocaleString({
                                hour: 'numeric',
                                minute: 'numeric',
                              }) +
                              ' - ' +
                              DateTime.fromISO(
                                reservation?.reservationStartTime
                              )
                                .setLocale('co')
                                .toLocaleString()}
                          </dd>
                        </div>
                      )}
                      {reservation?.reservationEndTime && (
                        <div className='flex items-center justify-between'>
                          <dt className='flex items-center gap-1 text-muted-foreground'>
                            <Clock className='h-4 w-4' />
                            Hora Fin Reserva
                          </dt>
                          <dd>
                            {DateTime.fromISO(reservation?.reservationEndTime)
                              .setLocale('co')
                              .toLocaleString({
                                hour: 'numeric',
                                minute: 'numeric',
                              }) +
                              ' - ' +
                              DateTime.fromISO(reservation?.reservationEndTime)
                                .setLocale('co')
                                .toLocaleString()}
                          </dd>
                        </div>
                      )}
                    </dl>
                  </div>
                  <Separator className='my-2' />
                  <div className='grid gap-3'>
                    <div className='font-semibold'>Información de pago</div>
                    <dl className='grid gap-3'>
                      <div className='flex items-center justify-between'>
                        <dt className='flex items-center gap-1 text-muted-foreground'>
                          <CreditCard className='h-4 w-4' />
                          Tarjeta de Crédito
                        </dt>
                        <dd>•••• •••• •••• 4532</dd>
                      </div>
                    </dl>
                    {reservation?.totalPrice && (
                      <dl className='grid gap-3'>
                        <div className='flex items-center justify-between text-lg'>
                          <dt className='flex items-center gap-1'>
                            <CircleDollarSign className='h-5 w-5' />
                            Total
                          </dt>
                          <dd>${reservation?.totalPrice}</dd>
                        </div>
                      </dl>
                    )}
                  </div>
                  {session?.rol === 'ADMINISTRADOR' &&
                    reservation &&
                    reservation?.parkingSlot?.parkingId?.admin?.id === session?.id && (
                      <>
                        <Separator className='my-2' />
                        <div>
                          {reservation?.reservationStartTime &&
                          reservation?.reservationEndTime ? (
                            <p className='text-center tracking-widest text-lg'>
                              RESERVA FINALIZADA
                            </p>
                          ) : reservation?.reservationStartTime ? (
                            <StartReservationDialog reservation={reservation} />
                          ) : (
                            reservation && (
                              <EndReservationDialog reservation={reservation} />
                            )
                          )}
                        </div>
                      </>
                    )}
                </div>
              </CardContent>
              <CardFooter className='flex flex-row items-center border-t bg-muted/50 px-6 py-3'>
                <div className='text-sm text-muted-foreground flex justify-end'>
                  <Link href='/' className='font-medium hover:text-gray-400'>
                    ← Ir a menu Admin
                  </Link>
                </div>
              </CardFooter>
            </Card>
          </div>
        )
      )}
    </div>
  )
}

export default Page
