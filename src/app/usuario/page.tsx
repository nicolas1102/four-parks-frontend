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

export default function Home() {
  const { data: session } = useSession()
  const { getOneUserByEmail } = useUser()
  const [user, setUser] = useState<UserInterface | null>(null)

  useEffect(() => {
    const fetchUser = async (email: string) => {
      setUser(await getOneUserByEmail(email))
    }
    if (session) {
      fetchUser(session.email)
    }
  }, [session])
  return (
    <>
      {user === null ? (
        <Loader />
      ) : (
        <div className='max-h-full m-auto flex flex-col gap-y-5 p-10'>
          <div className='border  p-10 w-[1000px] border-yellowFPC-400 bg-yellowFPC-200'>
            <div>
              <h1 className='text-3xl tracking-widest font-medium pb-2'>
                MI CUENTA
              </h1>
              <p className='text-base tracking-widest uppercase'>
                Bienvenido de nuevo
                {session?.firstName && (
                  <span className='font-bold uppercase'>
                    , {user?.firstName}
                  </span>
                )}
                .
              </p>
            </div>
          </div>

          <div className='flex flex-row gap-5 flex-wrap max-w-[1000px]'>
            <div className='border border-primary p-10 w-[490px]'>
              <div className='col-span-1 row-span-1'>
                <h2 className='tracking-widest text-xl pb-2'>CUENTA</h2>
                <ul>
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
                  <li>
                    <p className='uppercase'>
                      <span className='font-medium tracking-widest'>Rol:</span>{' '}
                      {/* TODO: Arreglar esta respuesta */}
                      {/* {user?.roleList[0]} */}
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
                <div className='border border-primary p-10 w-[490px]'>
                  <div className='col-span-1 row-span-1'>
                    <h2 className='tracking-widest text-xl pb-2'>
                      TARJETA DE CRÉDITO
                    </h2>
                    <ul>
                      <li>
                        <p className='uppercase'>
                          <span className='font-medium tracking-widest'>
                            Número de tarjeta:
                          </span>{' '}
                          (valorcito)
                        </p>
                      </li>
                      <li>
                        <p className='uppercase'>
                          <span className='font-medium tracking-widest'>
                            Fecha de expritación:
                          </span>{' '}
                          (valorcito)
                        </p>
                      </li>
                      <li>
                        <p className='uppercase'>
                          <span className='font-medium tracking-widest'>
                            CVV:
                          </span>{' '}
                          (valorcito)
                        </p>
                      </li>
                    </ul>
                  </div>
                  <div className='col-span-1 pt-8 flex flex-row justify-end'>
                    <EditCreditCardUserDialog user={user} />
                  </div>
                </div>

                <div className='border border-primary p-10 w-[490px]'>
                  <div className='col-span-1 row-span-1'>
                    <h2 className='tracking-widest text-xl pb-2'>CONTRASEÑA</h2>
                    <ul>
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
