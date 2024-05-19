'use client'

import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import Loader from '@/components/Loader'
var QRCode = require('qrcode')

import {
  ChevronLeft,
  ChevronRight,
  Copy,
  CreditCard,
  MoreVertical,
  Truck,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from '@/components/ui/pagination'
import { Separator } from '@/components/ui/separator'

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

const Page = ({ searchParams }: PageProps) => {
  const orderId = searchParams.reservationId
  const { data: session } = useSession()
  // const {getOrder, isLoading} = useOrders()

  // useEffect(() => {
  //   const fetchOrder = (reservationId: string) => {
  //     const order = getOrder(reservationId)

  // Verificamos que el usuario de la orden es el mismo que está ingresando
  // if (orderUserId !== session?.id) {
  //   return redirect(`/`) // origin we use it to redirect back to this page once the user log in
  // }

  //   }
  //   fetchOrder(reservationId)
  // }, [])
  const [src, setSrc] = useState<string>('')
  useEffect(() => {
    const generate = (orderId: string) => {
      QRCode.toDataURL('https://github.com/nicolas1102').then(setSrc)
      // QRCode.toDataURL(`https://fourparks.app.vercel/reservas/${reservationId}`)
    }
    // reservationId && generate(reservationId[0])
    generate('goku')
  }, [])
  return !session ? (
    <Loader />
  ) : (
    // session && orderId[0] (
    <div className='max-h-full m-auto flex flex-col w-full'>
      <div className='sm:h-[800px] w-full sm:grid sm:grid-cols-12 relative overflow-hidden'>
        <div className='sm:col-span-6 relative overflow-hidden sm:block hidden'>
          <Image
            src='/thank-you/thank-you.jpg'
            className='w-full h-full object-cover object-center grayscale'
            alt='thank you for your order'
            priority
            width='1200'
            height='1200'
          />
        </div>
        <div className='sm:col-span-6 sm:m-0 m-6'>
          <Card className='overflow-hidden'>
            <CardHeader className='flex flex-col justify-center bg-muted/50'>
              <CardTitle className='group flex flex-col '>
                <p className='text-sm font-medium tracking-widest text-center'>
                  RESERVA CONFIRMADA
                </p>
                <h1 className='mt-2 font-light tracking-widest sm:text-4xl text-xl text-center'>
                  ¡GRACIAS POR ESCOGERNOS!
                </h1>
              </CardTitle>
              <CardDescription className='text-center text-sm'>
                <span className='text-primary font-medium'>
                  {session?.firstName + ' ' + session?.firstLastname + ', '}
                </span>
                ya hemos enviado el resumen de tux reserva a tu correo{' '}
                <span className='text-primary font-medium'>
                  ({session?.email})
                </span>
                . Presentando el siguiente QR podrás empezar a hacer uso de tu
                parqueadero.
              </CardDescription>
            </CardHeader>
            <CardContent className='py-6 sm:px-44 text-sm'>
              <div className='grid gap-3'>
                <div className='font-semibold'>
                  Reserva N°. <span className='mt-2'>1(número de orden)</span>
                </div>

                <div className='grid grid-cols-2 gap-4'>
                  <div className='grid gap-3'>
                    <div className='font-semibold tracking-widest'>
                      PARQUEADERO
                    </div>
                    <address className='grid gap-0.5 not-italic text-muted-foreground'>
                      <span>Cuatro Parques</span>
                      <span>Cra 40 - 7</span>
                      <span>Bogotá D.C.</span>
                    </address>
                  </div>
                  <div className='grid gap-3'>
                    <div className='font-semibold tracking-widest'>
                      RESUMEN RESERVA
                    </div>
                    <address className='grid gap-0.5 not-italic text-muted-foreground'>
                      <span>Carro</span>
                      <span>2:47 p. m. - 2:47 p. m.</span>
                      <span>15 de mayo de 2024</span>
                    </address>
                  </div>
                </div>
                <Separator className='my-2' />
                <div className='w-full flex justify-center py-0'>
                  <div className='border-4 border-yellowFPC-400 '>
                    <Image
                      src={src}
                      className='object-cover object-center grayscale w-72 h-72 sm:w-44 sm:h-44 '
                      alt='thank you for your order'
                      priority
                      width='160'
                      height='160'
                    />
                  </div>
                </div>
              </div>
              <Separator className='my-4' />
              <div className='grid gap-1'>
                <div className='font-semibold'>Información de Cliente</div>
                <dl className='grid gap-3'>
                  <div className='flex items-center justify-between'>
                    <dt className='text-muted-foreground'>Cliente</dt>
                    <dd>Nicolás Díaz</dd>
                  </div>
                  <div className='flex items-center justify-between'>
                    <dt className='text-muted-foreground'>Email</dt>
                    <dd>
                      <a href='mailto:'>nicolas@gmail.com</a>
                    </dd>
                  </div>
                </dl>
              </div>
              <Separator className='my-4' />
              <div className='grid gap-3'>
                <div className='font-semibold'>Metodo de pago</div>
                <dl className='grid gap-3'>
                  <div className='flex items-center justify-between'>
                    <dt className='flex items-center gap-1 text-muted-foreground'>
                      <CreditCard className='h-4 w-4' />
                      Tarjeta de Credito
                    </dt>
                    <dd>**** **** **** 4532</dd>
                  </div>
                </dl>
              </div>
            </CardContent>
            <CardFooter className='flex flex-row items-center border-t bg-muted/50 px-6 py-3'>
              <div className='text-xs text-muted-foreground flex justify-end'>
                <Link
                  href='/parqueaderos'
                  className='font-medium hover:text-gray-400'
                >
                  ← Ir al inicio
                </Link>
              </div>
            </CardFooter>
          </Card>

          {/* <div className='mx-auto max-w-2xl sm:px-6 py-15'>
            <p className='text-sm font-medium tracking-widest text-center'>
              RESERVA CONFIRMADA
            </p>
            <h1 className='mt-2 font-light tracking-wider sm:text-4xl text-2xl text-center'>
              GRACIAS POR ESCOGERNOS
            </h1>
            <p className='mt-2 text-sm sm:text-base text-muted-foreground text-center'>
              <span className='text-primary font-medium'>
                {session?.firstName + ' ' + session?.firstLastname + ', '}
              </span>
              ya hemos enviado el resumen de tux reserva a tu correo{' '}
              <span className='text-primary font-medium'>
                ({session?.email})
              </span>
              . Presentando el siguiente QR podrás empezar a hacer uso de tu
              parqueadero.
            </p>

            <div className='mt-2 text-sm font-medium pt-3 '>
              <div className='divide-gray-200 border-t border-gray-200 text-sm font-medium text-muted-foreground sm:px-28'>
                <div className=' mt-3 text-primary'>
                  Reserva N°. <span className='mt-2'>1</span>
                </div>

                <div className='space-y-1 pt-4 text-sm font-medium text-muted-foreground '>
                  <div className='flex justify-between'>
                    <h3 className='tracking-widest text-primary'>
                      PARQUEADERO
                    </h3>
                    <p className='text-primary'>
                      Pelo quemao
                    </p>
                  </div>

                  <div className='flex justify-between'>
                    <p>Dirección</p>
                    <p>cra 50 s - Medellín</p>
                  </div>
                  <div className='flex justify-between'>
                    <p>Tipo parqueadero</p>
                    <p>descubierto</p>
                  </div>

                  <div className='flex justify-between'>
                    <p>Hora de ingreso</p>
                    <p>2:47 p. m. - 2:47 p. m.</p>
                  </div>

                  <div className='flex justify-between'>
                    <p>Fecha</p>
                    <p>15 de mayo de 2024</p>
                  </div>

                  <div className='flex justify-between'>
                    <p>Tipo vehículo</p>
                    <p>Carro</p>
                  </div>
                </div>

                <div className='w-full flex justify-center py-8'>
                  <div className='border-4 border-yellowFPC-400 '>
                    <Image
                      src={src}
                      className='object-cover object-center grayscale w-80 h-80 sm:w-44 sm:h-44 '
                      alt='thank you for your order'
                      priority
                      width='160'
                      height='160'
                    />
                  </div>
                </div>
              </div>
              <div className='mt-5 border-t border-gray-200 py-6 text-right'>
                <Link
                  href='/parqueaderos'
                  className='text-sm font-medium tracking-widest  hover:text-gray-400'
                >
                  Ir al inicio &rarr;
                </Link>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default Page
