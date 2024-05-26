'use client'

import Loader from '@/components/Loader'
import { UserInterface } from '@/lib/interfaces/user.interface'
import { useUser } from '@/services/useUser'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { EditPersonalInfoUserDialog } from './_components/EditPersonalInfoUserDialog'
import { EditPasswordUserDialog } from './_components/EditPasswordUserDialog'
import { EditCreditCardUserDialog } from './_components/EditCreditCardUserDialog'
import NoResults from '@/components/NoResults'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Link from 'next/link'
import { useReservation } from '@/services/useReservation'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ReservationTableItem } from './_components/ReservationTableItem'
import { ReservationInterface } from '@/lib/interfaces/reservation.interface'

export default function Page() {
  const { data: session } = useSession()
  const {
    getActiveReservationByUserId,
    getFinishedReservationsByUserId,
    reservations,
    isLoading: isUseReservationLoading,
  } = useReservation()
  const { getOneUserByEmail, isLoading } = useUser()
  const [user, setUser] = useState<UserInterface | null>(null)
  const [activedReservation, setActivedReservation] = useState<
    ReservationInterface | null | undefined
  >()
  const [adminEmail, setAdminEmail] = useState<string>()

  useEffect(() => {
    if (session) setAdminEmail(session.email)
  }, [session])

  useEffect(() => {
    const fetchUser = async (email: string) => {
      const userData = await getOneUserByEmail(email)
      if (userData !== null) setUser(userData as UserInterface)
    }
    if (adminEmail) {
      fetchUser(adminEmail)
    }
  }, [adminEmail])

  useEffect(() => {
    const fetchActiveReservation = async (userId: number) => {
      setActivedReservation(await getActiveReservationByUserId(userId))
    }
    const fetchFinishedReservations = async (userId: number) => {
      await getFinishedReservationsByUserId(userId)
    }
    user?.id && session?.rol === 'USUARIO' && fetchActiveReservation(user?.id)
    user?.id &&
      session?.rol === 'USUARIO' &&
      fetchFinishedReservations(user?.id)
  }, [user])

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : user === undefined || user === null ? (
        <div className='m-10'>
          <NoResults redirection='/' />
        </div>
      ) : (
        <div className='sm:mx-44 sm:my-6 m-6 space-y-8'>
          <Card className='overflow-hidden'>
            <CardHeader className='flex flex-col justify-center bg-muted/50'>
              <CardTitle className='group flex flex-col '>
                <h1 className='mt-2 tracking-widest sm:text-2xl text-xl '>
                  MI CUENTA
                </h1>
              </CardTitle>
              <CardDescription className='text-sm'>
                Bienvenido de nuevo,{' '}
                <span className='text-primary font-medium'>
                  {session?.firstName + ' ' + session?.firstLastname.trim()}.
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent className='py-6 text-sm'>
              <div className='grid gap-5'>
                <div className='sm:grid sm:grid-cols-2 flex flex-col gap-4'>
                  <div className='grid gap-2 sm:border-r pb-6 border-b sm:border-b-0 pr-3 sm:pr-6'>
                    <h2 className='font-semibold tracking-widest'>
                      DATOS PERSONALES
                    </h2>
                    <div className='grid gap-0.5 not-italic'>
                      <div className='flex items-center justify-between'>
                        <dt className='text-muted-foreground'>Primer Nombre</dt>
                        <dd>{user?.firstName}</dd>
                      </div>
                      <div className='flex items-center justify-between'>
                        <dt className='text-muted-foreground'>
                          Segundo Nombre
                        </dt>
                        <dd>{user?.secondName}</dd>
                      </div>
                      <div className='flex items-center justify-between'>
                        <dt className='text-muted-foreground'>
                          Primer Apellido
                        </dt>
                        <dd>{user?.firstLastname}</dd>
                      </div>
                      <div className='flex items-center justify-between'>
                        <dt className='text-muted-foreground'>
                          Segundo Apellido
                        </dt>
                        <dd>{user?.secondLastname}</dd>
                      </div>
                      <div className='flex items-center justify-between'>
                        <dt className='text-muted-foreground'>Correo</dt>
                        <dd>{user?.email}</dd>
                      </div>
                      {session?.rol === 'USUARIO' && (
                        <div className='col-span-1 pt-4 flex flex-row justify-end'>
                          <EditPersonalInfoUserDialog user={user} />
                        </div>
                      )}
                    </div>
                  </div>
                  {session?.rol === 'USUARIO' && (
                    <>
                      <div className='grid gap-2 pb-6 border-b sm:border-b-0 pr-3 sm:pr-6'>
                        <h2 className='font-semibold tracking-widest'>
                          TARJETA DE CRÉDITO
                        </h2>
                        <div className='grid gap-0.5 not-italic'>
                          <div className='flex items-center justify-between'>
                            <dt className='text-muted-foreground'>
                              Número de Tarjeta
                            </dt>
                            <dd>
                              •••• •••• ••••{' '}
                              {user.creditCard?.cardNumber.toString().slice(-4)}
                            </dd>
                          </div>
                          <div className='flex items-center justify-between'>
                            <dt className='text-muted-foreground'>
                              Fecha de expiración
                            </dt>
                            <dd>•• / ••</dd>
                          </div>
                          <div className='flex items-center justify-between'>
                            <dt className='text-muted-foreground'>CVV</dt>
                            <dd>••</dd>
                          </div>
                          <div className='col-span-1 pt-8 flex flex-row justify-end'>
                            <EditCreditCardUserDialog user={user} />
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <div className='sm:grid sm:grid-cols-2 flex flex-col gap-4'>
                  {session?.rol === 'USUARIO' && (
                    <>
                      <div className='grid gap-2 sm:border-r pb-6 pr-3 sm:pr-6'>
                        <h2 className='font-semibold tracking-widest'>
                          CONTRASEÑA
                        </h2>
                        <div className='grid gap-0.5 not-italic'>
                          <div className='flex items-center justify-between'>
                            <dt className='text-muted-foreground'>
                              Contraseña
                            </dt>
                            <dd>••••••••</dd>
                          </div>

                          <div className='col-span-1 pt-4 flex flex-row justify-end'>
                            <EditPasswordUserDialog user={user} />
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </CardContent>

            <CardFooter className='flex flex-row items-center border-t bg-muted/50 px-6 py-3'>
              <div className='text-sm text-muted-foreground flex justify-end'>
                <Link href='/' className='font-medium hover:text-gray-400'>
                  ← Ir al inicio
                </Link>
              </div>
            </CardFooter>
          </Card>

          {/* Reservas de usuario */}
          {session?.rol !== 'USUARIO' ? (
            <></>
          ) : isUseReservationLoading ? (
            <Loader />
          ) : (
            <Card className='overflow-hidden'>
              <CardHeader className='flex flex-col justify-center bg-muted/50'>
                <CardTitle className='group flex flex-col '>
                  <h1 className='mt-2 tracking-widest sm:text-2xl text-xl '>
                    RESERVAS
                  </h1>
                </CardTitle>
                <CardDescription className='text-sm '>
                  Aquí puedes ver un resumen de todas tus reservas en{' '}
                  <span className='font-medium text-primary'>
                    FourParksColombia.
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent className='py-6 text-sm'>
                {!activedReservation && reservations.length == 0 ? (
                  <p className='text-center w-full tracking-widest'>
                    NO TIENES RESERVAS TODAVÍA EN{' '}
                    <span className='font-medium'>FOUR PARKS, ¡ANIMATE!</span>.
                  </p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Parqueadero</TableHead>
                        <TableHead className='text-center'>
                          Tipo Vehículo
                        </TableHead>
                        <TableHead className='text-center'>
                          Día de Reserva
                        </TableHead>
                        <TableHead className='text-center'>Estado</TableHead>
                        <TableHead className='text-center'>Precio</TableHead>
                        <TableHead className='text-center'>Ver</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {activedReservation && (
                        <ReservationTableItem
                          reservation={activedReservation}
                        />
                      )}
                      {reservations.map((reservationItem) => (
                        <ReservationTableItem
                          key={reservationItem.id}
                          reservation={reservationItem}
                        />
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </>
  )
}
