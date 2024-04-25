'use client'
import PrimaryButton from '@/components/CustomButtons/PrimaryButton'
import { useSession } from 'next-auth/react'

export default function Home() {
  const { data: session } = useSession()
  return (
    <div className='max-h-full m-auto flex flex-col gap-y-5 p-10'>
      <div className='border border-primary p-10 w-[1000px]'>
        <div>
          <h1 className='text-3xl tracking-widest font-medium pb-2'>
            MI CUENTA
          </h1>
          <p className='text-base tracking-widest'>
            Bienvenido de nuevo, (aquí va el nombre del pana).
          </p>
        </div>
      </div>

      <div className='flex flex-row gap-5 flex-wrap max-w-[1000px]'>
        <div className='border border-primary p-10 w-[490px]'>
          <div className='col-span-1 row-span-1'>
            <h2 className='tracking-widest text-xl pb-2'>CUENTA</h2>
            <ul>
              <li>
                <p>
                  <span className='font-medium tracking-widest'>E-mail:</span>{' '}
                  (valorcito)
                </p>
              </li>
              <li>
                <p>
                  <span className='font-medium tracking-widest'>
                    Primer Nombre:
                  </span>{' '}
                  (valorcito)
                </p>
              </li>
              <li>
                <p>
                  <span className='font-medium tracking-widest'>
                    Segundo Nombre:
                  </span>{' '}
                  (valorcito)
                </p>
              </li>
              <li>
                <p>
                  <span className='font-medium tracking-widest'>
                    Primer Apellido:
                  </span>{' '}
                  (valorcito)
                </p>
              </li>
              <li>
                <p>
                  <span className='font-medium tracking-widest'>
                    Segundo Apellido:
                  </span>{' '}
                  (valorcito)
                </p>
              </li>
              <li>
                <p>
                  <span className='font-medium tracking-widest'>Rol:</span>{' '}
                  (valorcito)
                </p>
              </li>
            </ul>
          </div>

          {session?.rol === 'USUARIO' && (
            <div className='col-span-1 pt-8 flex flex-row justify-end'>
              <PrimaryButton text='EDITAR CUENTA' />
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
                    <p>
                      <span className='font-medium tracking-widest'>
                        Número de tarjeta:
                      </span>{' '}
                      (valorcito)
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className='font-medium tracking-widest'>
                        Fecha de expritación:
                      </span>{' '}
                      (valorcito)
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className='font-medium tracking-widest'>CVV:</span>{' '}
                      (valorcito)
                    </p>
                  </li>
                </ul>
              </div>
              <div className='col-span-1 pt-8 flex flex-row justify-end'>
                <PrimaryButton text='EDITAR TARJETA' />
              </div>
            </div>

            <div className='border border-primary p-10 w-[490px]'>
              <div className='col-span-1 row-span-1'>
                <h2 className='tracking-widest text-xl pb-2'>CONTRASEÑA</h2>
                <ul>
                  <li>
                    <p>
                      <span className='font-medium tracking-widest'>
                        Contraseña:
                      </span>{' '}
                      ••••••••••••••
                    </p>
                  </li>
                </ul>
              </div>
              <div className='col-span-1 pt-8 flex flex-row justify-end'>
                <PrimaryButton text='EDITAR CONTRASEÑA' />
              </div>
            </div>
          </>
        )}
      </div>

      {session?.rol === 'USUARIO' && (
        <div className='border-t border-primary my-4'></div>
      )}
    </div>
  )
}
