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
  const [src, setSrc] = useState<string>('')

  useEffect(() => {
    const fetchOrder = async (reservationId: number) => {
      setReservation(await getOneReservation(reservationId))
    }

    reservationId &&
      typeof reservationId === 'string' &&
      fetchOrder(parseInt(reservationId))
  }, [])

  useEffect(() => {
    // Verificamos que el usuario de la orden es el mismo que está ingresando
    if (
      reservation?.id !== undefined &&
      reservation?.user?.id !== session?.id
    ) {
      // return redirect(`/auth/unauthorized`)
    }
    const generate = (reservationId: string) => {
      // QRCode.toDataURL('https://github.com/nicolas1102').then(setSrc)
      QRCode.toDataURL(`https://fourparks.vercel.app/admin/reservas/edit/${reservationId}`).then(setSrc)
    }
    reservationId &&
      typeof reservationId === 'string' &&
      generate(reservationId)
  }, [reservation])
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
              {/* definición tipo de info según estado de reserva */}
              {reservation?.reservationStartTime &&
              reservation?.reservationEndTime ? (
                <>
                  <CardHeader className='flex flex-col justify-center bg-muted/50'>
                    <CardTitle className='group flex flex-col '>
                      <h1 className='font-light tracking-widest sm:text-2xl text-xl text-center'>
                        RESERVA FINALIZADA
                      </h1>
                    </CardTitle>
                    <CardDescription className='text-center text-sm'>
                      <span className='text-primary font-medium'>
                        {session?.firstName +
                          ' ' +
                          session?.firstLastname +
                          ', '}
                      </span>{' '}
                      tu reserva se finalizó con éxito a las{' '}
                      <span className='text-primary font-medium'>
                        {DateTime.fromISO(reservation?.reservationEndTime)
                          .setLocale('co')
                          .toLocaleString({
                            hour: 'numeric',
                            minute: 'numeric',
                          })}
                      </span>{' '}
                      el{' '}
                      <span className='text-primary font-medium'>
                        {DateTime.fromISO(reservation?.reservationEndTime)
                          .setLocale('co')
                          .toLocaleString()}
                      </span>{' '}
                      y ya realizamos el respectivo cobro a tu tarjeta de
                      crédito.{' '}
                      <span className='text-primary font-medium'>
                        Esperamos que vuelvas pronto.
                      </span>
                      <p className='pt-3 text-sm font-medium text-primary tracking-widest text-center'>
                        ¡GRACIAS POR ESCOGERNOS!{' '}
                      </p>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className='py-6 text-sm'>
                    <div className='grid gap-3'>
                      <div className='font-semibold'>
                        Reserva N°.{' '}
                        <span className='mt-2'>{reservation?.id}</span>
                      </div>
                      <div className='grid gap-1'>
                        <div className='font-semibold'>
                          Información de Cliente
                        </div>
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
                        <div className='font-semibold'>
                          Información Parqueadero
                        </div>
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
                                reservation?.parkingSlot?.parkingId?.location
                                  .city.city
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
                            <dd>
                              {reservation?.parkingSlot?.vehicleTypeId.type}
                            </dd>
                          </div>
                          <div className='flex items-center justify-between'>
                            <dt className='flex items-center gap-1 text-muted-foreground'>
                              <Clock className='h-4 w-4' />
                              Hora Reserva
                            </dt>
                            <dd>
                              {reservation?.reservationTime &&
                                DateTime.fromISO(reservation?.reservationTime)
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
                          <div className='flex items-center justify-between'>
                            <dt className='flex items-center gap-1 text-muted-foreground'>
                              <Clock className='h-4 w-4' />
                              Hora Inicio Reserva
                            </dt>
                            <dd>
                              {reservation?.reservationStartTime &&
                                DateTime.fromISO(
                                  reservation?.reservationStartTime
                                )
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
                          <div className='flex items-center justify-between'>
                            <dt className='flex items-center gap-1 text-muted-foreground'>
                              <Clock className='h-4 w-4' />
                              Hora Fin Reserva
                            </dt>
                            <dd>
                              {reservation?.reservationEndTime &&
                                DateTime.fromISO(
                                  reservation?.reservationEndTime
                                )
                                  .setLocale('co')
                                  .toLocaleString({
                                    hour: 'numeric',
                                    minute: 'numeric',
                                  }) +
                                  ' - ' +
                                  DateTime.fromISO(
                                    reservation?.reservationEndTime
                                  )
                                    .setLocale('co')
                                    .toLocaleString()}
                            </dd>
                          </div>
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
                            <dd>**** **** **** 4532</dd>
                          </div>
                        </dl>
                        <dl className='grid gap-3'>
                          <div className='flex items-center justify-between text-lg'>
                            <dt className='flex items-center gap-1'>
                              <CircleDollarSign className='h-5 w-5' />
                              Total
                            </dt>
                            <dd>${reservation?.totalPrice}</dd>
                          </div>
                        </dl>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className='flex flex-row items-center border-t bg-muted/50 px-6 py-3'>
                    <div className='text-sm text-muted-foreground flex justify-end'>
                      <Link
                        href='/'
                        className='font-medium hover:text-gray-400'
                      >
                        ← Ir al inicio
                      </Link>
                    </div>
                  </CardFooter>
                </>
              ) : reservation?.reservationStartTime ? (
                <>
                  <CardHeader className='flex flex-col justify-center bg-muted/50'>
                    <CardTitle className='group flex flex-col '>
                      <h1 className='font-light tracking-widest sm:text-2xl text-xl text-center'>
                        RESERVA INICIADA
                      </h1>
                    </CardTitle>
                    <CardDescription className='text-center text-sm'>
                      <span className='text-primary font-medium'>
                        {session?.firstName +
                          ' ' +
                          session?.firstLastname +
                          ', '}
                      </span>{' '}
                      tu reserva se inició con éxito a las{' '}
                      <span className='text-primary font-medium'>
                        {DateTime.fromISO(reservation?.reservationStartTime)
                          .setLocale('co')
                          .toLocaleString({
                            hour: 'numeric',
                            minute: 'numeric',
                          })}
                      </span>{' '}
                      el{' '}
                      <span className='text-primary font-medium'>
                        {DateTime.fromISO(reservation?.reservationStartTime)
                          .setLocale('co')
                          .toLocaleString()}
                      </span>
                      . Retira tu vehículo y presenta el siguiente QR para
                      finalizar la reserva.{' '}
                      <span className='text-primary font-medium'>
                        Tu vehículo está seguro con nosotros.
                      </span>
                      <p className='pt-3 text-sm font-medium text-primary tracking-widest text-center'>
                        ¡GRACIAS POR ESCOGERNOS!{' '}
                      </p>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className='py-6 text-sm'>
                    <div className='grid gap-3'>
                      <div className='font-semibold'>
                        Reserva N°.{' '}
                        <span className='mt-2'>{reservation?.id}</span>
                      </div>

                      <div className='grid gap-1'>
                        <div className='font-semibold'>
                          Información de Cliente
                        </div>
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
                      <Separator className='my-2' />
                      <div className='grid gap-1'>
                        <div className='font-semibold'>
                          Información Parqueadero
                        </div>
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
                                reservation?.parkingSlot?.parkingId?.location
                                  .city.city
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
                            <dd>
                              {reservation?.parkingSlot?.vehicleTypeId.type}
                            </dd>
                          </div>
                          <div className='flex items-center justify-between'>
                            <dt className='flex items-center gap-1 text-muted-foreground'>
                              <Clock className='h-4 w-4' />
                              Hora Reserva
                            </dt>
                            <dd>
                              {reservation?.reservationTime &&
                                DateTime.fromISO(reservation?.reservationTime)
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
                          <div className='flex items-center justify-between'>
                            <dt className='flex items-center gap-1 text-muted-foreground'>
                              <Clock className='h-4 w-4' />
                              Hora Inicio Reserva
                            </dt>
                            <dd>
                              {reservation?.reservationStartTime &&
                                DateTime.fromISO(
                                  reservation?.reservationStartTime
                                )
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
                        </dl>
                      </div>
                      <Separator className='my-2' />
                      <div className='w-full flex justify-center py-0'>
                        <div className='border-4 border-yellowFPC-400 '>
                          <Image
                            src={src}
                            className='object-cover object-center grayscale w-64 h-64 sm:w-44 sm:h-44 '
                            alt='thank you for your order'
                            priority
                            width='160'
                            height='160'
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className='flex flex-row items-center border-t bg-muted/50 px-6 py-3'>
                    <div className='text-sm text-muted-foreground flex justify-end'>
                      <Link
                        href='/'
                        className='font-medium hover:text-gray-400'
                      >
                        ← Ir al inicio
                      </Link>
                    </div>
                  </CardFooter>
                </>
              ) : (
                <>
                  <CardHeader className='flex flex-col justify-center bg-muted/50'>
                    <CardTitle className='group flex flex-col '>
                      <h1 className='font-light tracking-widest sm:text-2xl text-xl text-center'>
                        RESERVA CONFIRMADA
                      </h1>
                    </CardTitle>
                    <CardDescription className='text-center text-sm'>
                    <span className='text-primary font-medium'>
                        {session?.firstName +
                          ' ' +
                          session?.firstLastname +
                          ', '}
                      </span>
                      hemos enviado a tu correo{' '}
                      <span className='text-primary font-medium italic'>
                        ({session?.email})
                      </span>{' '}
                      los datos de tu reserva. Presentando el siguiente QR
                      podrás empezar a hacer uso de tu parqueadero.
                      <p className='pt-3 text-sm font-medium text-primary tracking-widest text-center'>
                        ¡GRACIAS POR ESCOGERNOS!{' '}
                      </p>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className='py-6 text-sm'>
                    <div className='grid gap-3'>
                      <div className='font-semibold'>
                        Reserva N°.{' '}
                        <span className='mt-2'>{reservation?.id}</span>
                      </div>

                      <div className='grid gap-1'>
                        <div className='font-semibold'>
                          Información de Cliente
                        </div>
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
                      <Separator className='my-2' />
                      <div className='grid gap-1'>
                        <div className='font-semibold'>
                          Información Parqueadero
                        </div>
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
                                reservation?.parkingSlot?.parkingId?.location
                                  .city.city
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
                            <dd>
                              {reservation?.parkingSlot?.vehicleTypeId.type}
                            </dd>
                          </div>
                          <div className='flex items-center justify-between'>
                            <dt className='flex items-center gap-1 text-muted-foreground'>
                              <Clock className='h-4 w-4' />
                              Hora Reserva
                            </dt>
                            <dd>
                              {reservation?.reservationTime &&
                                DateTime.fromISO(reservation?.reservationTime)
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
                        </dl>
                      </div>
                      <Separator className='my-2' />
                      <div className='w-full flex justify-center py-0'>
                        <div className='border-4 border-yellowFPC-400 '>
                          <Image
                            src={src}
                            className='object-cover object-center grayscale w-64 h-64 sm:w-44 sm:h-44 '
                            alt='thank you for your order'
                            priority
                            width='160'
                            height='160'
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className='flex flex-row items-center border-t bg-muted/50 px-6 py-3'>
                    <div className='text-sm text-muted-foreground flex justify-end'>
                      <Link
                        href='/'
                        className='font-medium hover:text-gray-400'
                      >
                        ← Ir al inicio
                      </Link>
                    </div>
                  </CardFooter>
                </>
              )}
            </Card>
          </div>
        )
      )}
    </div>
  )
}

export default Page
