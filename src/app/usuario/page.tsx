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
        <div className='max-h-full m-auto flex flex-col gap-y-5 p-6 sm:p-10'>
          <div className='border sm:p-10 p-5 border-blueFPC-400 bg-blueFPC-200 dark:border-blueFPC-200 dark:bg-blueFPC-400'>
            <h1 className='text-2xl sm:text-3xl tracking-widest font-medium pb-2'>
              MI CUENTA
            </h1>
            <p className='text-sm sm:text-base tracking-widest uppercase'>
              Bienvenido de nuevo
              {session?.firstName && (
                <span className='font-bold uppercase'>, {user?.firstName}</span>
              )}
              .
            </p>
          </div>

          <div className='gap-5 flex-wrap sm:grid sm:grid-cols-2 flex flex-col'>
            <div className='p-6 sm:p-10 border border-blueFPC-400 '>
              <div className='col-span-1 row-span-1'>
                <h2 className='tracking-widest text-lg sm:text-xl pb-2'>
                  CUENTA
                </h2>
                <ul className='text-sm'>
                  <li>
                    <p className='uppercase'>
                      <span className='font-medium tracking-widest '>
                        E-mail:
                      </span>{' '}
                      {user?.email}
                    </p>
                  </li>
                  <li>
                    <p className='uppercase'>
                      <span className='font-medium tracking-widest'>
                        Primer Nombre:
                      </span>{' '}
                      {user?.firstName}
                    </p>
                  </li>
                  <li>
                    <p className='uppercase'>
                      <span className='font-medium tracking-widest'>
                        Segundo Nombre:
                      </span>{' '}
                      {user?.secondName}
                    </p>
                  </li>
                  <li>
                    <p className='uppercase'>
                      <span className='font-medium tracking-widest'>
                        Primer Apellido:
                      </span>{' '}
                      {user?.firstLastname}
                    </p>
                  </li>
                  <li>
                    <p className='uppercase'>
                      <span className='font-medium tracking-widest'>
                        Segundo Apellido:
                      </span>{' '}
                      {user?.secondLastname}
                    </p>
                  </li>
                </ul>
              </div>

              {session?.rol === 'USUARIO' && (
                <div className='col-span-1 pt-8 flex flex-row justify-end'>
                  <EditPersonalInfoUserDialog user={user} />
                </div>
              )}
            </div>

            {session?.rol === 'USUARIO' && (
              <>
                <div className='border border-blueFPC-400 p-6 sm:p-10'>
                  <div className='col-span-1 row-span-1'>
                    <h2 className='tracking-widest text-lg sm:text-xl pb-2'>
                      TARJETA DE CRÉDITO
                    </h2>
                    <ul className='text-sm'>
                      <li>
                        <p className='uppercase'>
                          <span className='font-medium tracking-widest'>
                            Número de tarjeta:
                          </span>{' '}
                          ••••••••••••••
                        </p>
                      </li>
                      <li>
                        <p className='uppercase'>
                          <span className='font-medium tracking-widest'>
                            Fecha de expritación:
                          </span>{' '}
                          ••••••••••••••
                        </p>
                      </li>
                      <li>
                        <p className='uppercase'>
                          <span className='font-medium tracking-widest'>
                            CVV:
                          </span>{' '}
                          ••••••••••••••
                        </p>
                      </li>
                    </ul>
                  </div>
                  <div className='col-span-1 pt-8 flex flex-row justify-end'>
                    <EditCreditCardUserDialog user={user} />
                  </div>
                </div>

                <div className='border border-blueFPC-400 p-6 sm:p-10'>
                  <div className='col-span-1 row-span-1'>
                    <h2 className='tracking-widest text-lg sm:text-xl pb-2'>
                      CONTRASEÑA
                    </h2>
                    <ul className='text-sm'>
                      <li>
                        <p className='uppercase'>
                          <span className='font-medium tracking-widest'>
                            Contraseña:
                          </span>{' '}
                          ••••••••••••••
                        </p>
                      </li>
                    </ul>
                  </div>
                  <div className='col-span-1 pt-8 flex flex-row justify-end'>
                    <EditPasswordUserDialog user={user} />
                  </div>
                </div>
              </>
            )}
          </div>

          {session?.rol === 'USUARIO' && (
            <div className='border-t border-redFPC-400 my-4'></div>
          )}
        </div>
      )}
    </>
  )
}
