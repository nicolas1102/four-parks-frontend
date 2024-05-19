'use client'
import PrimaryButton from '@/components/CustomButtons/PrimaryButton'
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
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'

export default function Home() {
  const { data: session } = useSession()
  const { getOneUserByEmail, isLoading } = useUser()
  const [user, setUser] = useState<UserInterface | null>(null)

  useEffect(() => {
    const fetchUser = async (email: string) => {
      const userData = await getOneUserByEmail(email)
      if (userData !== null) setUser(userData as UserInterface)
    }
    if (session) {
      fetchUser(session.email)
    }
  }, [session])

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : user === undefined || user === null ? (
        <div className='m-10'>
          <NoResults redirection='/' />
        </div>
      ) : (
        // <div className='max-h-full flex flex-col gap-y-5 p-6 sm:p-10'>
        //   <div className='border sm:p-10 p-5 border-blueFPC-400 bg-blueFPC-200 dark:border-blueFPC-200 dark:bg-blueFPC-400'>
        //     <h1 className='text-2xl sm:text-3xl tracking-widest font-medium pb-2'>
        //       MI CUENTA
        //     </h1>
        //     <p className='text-sm sm:text-base tracking-widest uppercase'>
        //       Bienvenido de nuevo
        //       {session?.firstName && (
        //         <span className='font-bold uppercase'>, {user?.firstName}</span>
        //       )}
        //       .
        //     </p>
        //   </div>

        //   <div className='gap-5 flex-wrap sm:grid sm:grid-cols-2 flex flex-col'>
        //     <div className='p-6 sm:p-10 border border-blueFPC-400 '>
        //       <div className='col-span-1 row-span-1'>
        //         <h2 className='tracking-widest text-lg sm:text-xl pb-2'>
        //           CUENTA
        //         </h2>
        //         <ul className='text-sm'>
        //           <li>
        //             <p className='uppercase'>
        //               <span className='font-medium tracking-widest '>
        //                 E-mail:
        //               </span>{' '}
        //               {user?.email}
        //             </p>
        //           </li>
        //           <li>
        //             <p className='uppercase'>
        //               <span className='font-medium tracking-widest'>
        //                 Primer Nombre:
        //               </span>{' '}
        //               {user?.firstName}
        //             </p>
        //           </li>
        //           <li>
        //             <p className='uppercase'>
        //               <span className='font-medium tracking-widest'>
        //                 Segundo Nombre:
        //               </span>{' '}
        //               {user?.secondName}
        //             </p>
        //           </li>
        //           <li>
        //             <p className='uppercase'>
        //               <span className='font-medium tracking-widest'>
        //                 Primer Apellido:
        //               </span>{' '}
        //               {user?.firstLastname}
        //             </p>
        //           </li>
        //           <li>
        //             <p className='uppercase'>
        //               <span className='font-medium tracking-widest'>
        //                 Segundo Apellido:
        //               </span>{' '}
        //               {user?.secondLastname}
        //             </p>
        //           </li>
        //         </ul>
        //       </div>

        //       {session?.rol === 'USUARIO' && (
        //         <div className='col-span-1 pt-8 flex flex-row justify-end'>
        //           <EditPersonalInfoUserDialog user={user} />
        //         </div>
        //       )}
        //     </div>

        //     {session?.rol === 'USUARIO' && (
        //       <>
        //         <div className='border border-blueFPC-400 p-6 sm:p-10'>
        //           <div className='col-span-1 row-span-1'>
        //             <h2 className='tracking-widest text-lg sm:text-xl pb-2'>
        //               TARJETA DE CRÉDITO
        //             </h2>
        //             <ul className='text-sm'>
        //               <li>
        //                 <p className='uppercase'>
        //                   <span className='font-medium tracking-widest'>
        //                     Número de tarjeta:
        //                   </span>{' '}
        //                   ••••••••••••••
        //                 </p>
        //               </li>
        //               <li>
        //                 <p className='uppercase'>
        //                   <span className='font-medium tracking-widest'>
        //                     Fecha de expritación:
        //                   </span>{' '}
        //                   ••••••••••••••
        //                 </p>
        //               </li>
        //               <li>
        //                 <p className='uppercase'>
        //                   <span className='font-medium tracking-widest'>
        //                     CVV:
        //                   </span>{' '}
        //                   ••••••••••••••
        //                 </p>
        //               </li>
        //             </ul>
        //           </div>
        //           <div className='col-span-1 pt-8 flex flex-row justify-end'>
        //             <EditCreditCardUserDialog user={user} />
        //           </div>
        //         </div>

        //         <div className='border border-blueFPC-400 p-6 sm:p-10'>
        //           <div className='col-span-1 row-span-1'>
        //             <h2 className='tracking-widest text-lg sm:text-xl pb-2'>
        //               CONTRASEÑA
        //             </h2>
        //             <ul className='text-sm'>
        //               <li>
        //                 <p className='uppercase'>
        //                   <span className='font-medium tracking-widest'>
        //                     Contraseña:
        //                   </span>{' '}
        //                   ••••••••••••••
        //                 </p>
        //               </li>
        //             </ul>
        //           </div>
        //           <div className='col-span-1 pt-8 flex flex-row justify-end'>
        //             <EditPasswordUserDialog user={user} />
        //           </div>
        //         </div>
        //       </>
        //     )}
        //   </div>

        //   {session?.rol === 'USUARIO' && (
        //     <div className='border-t border-redFPC-400 my-4'></div>
        //   )}
        // </div>

        <div className='sm:col-span-6 sm:mx-44 sm:my-6 m-6'>
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
                  {session?.firstName + ' ' + session?.firstLastname + '.'}
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
              <Separator className='my-4' />
              <div className='grid gap-1'>
                <div className='font-semibold tracking-widest'>RESERVAS</div>
                
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
          </Card>
        </div>
      )}
    </>
  )
}
