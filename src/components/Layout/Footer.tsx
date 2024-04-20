import { Facebook, Instagram, Linkedin } from 'lucide-react'
import Link from 'next/link'

export const FOOTER = 'FOUR PARKS, DONDE TU VEHÍCULO SIEMPRE ESTARÁ SEGURO.'

const Footer = async () => {
  return (
    <div className='inset-x-0 items-center justify-center w-full bottom-0 px-8 flex flex-col text-neutral-800'>
      <div className='grid grid-cols-12 w-full pb-14 border-t border-primary py-8'>
        <div className='col-span-3'>
          <p className='text-2xl tracking-tighter font-bold leading-none'>
            FourParksColombia
          </p>
          <p className=' text-2xl tracking-tighter  leading-none'>
            by Grupo C
          </p>
        </div>

        <div className='col-span-6 px-28 flex flex-col'>
          <Link
            href='/auth/sign-up'
            className='tracking-widest border-b border-primary  py-2 hover:bg-yellow-200 duration-700'
          >
            REGISTRARSE
          </Link>
          <Link
            href='/auth/log-in'
            className='tracking-widest border-b border-primary  py-2 hover:bg-yellow-200 duration-700'
          >
            INGRESAR
          </Link>
          <Link
            href='/parqueaderos'
            className='tracking-widest border-b border-primary  py-2 hover:bg-yellow-200 duration-700'
          >
            PARQUEADEROS
          </Link>
        </div>

        <div className='col-span-3'>
          <h3 className='tracking-widest text-xl font-medium pb-1'>
            CONTACTANOS
          </h3>
          <div className='flex flex-row gap-2'>
            <Link href=''>
              <Instagram className='hover:bg-yellow-200 duration-700' />
            </Link>
            <Link href=''>
              <Facebook className='hover:bg-yellow-200 duration-700' />
            </Link>
            <Link href=''>
              <Linkedin className='hover:bg-yellow-200 duration-700' />
            </Link>
          </div>
        </div>
      </div>

      <div className='border-t border-zinc-400 w-full pt-6 pb-4 flex flex-row justify-between'>
        <div className='flex gap-6 text-xs font-medium '>
          <p className='hover:underline cursor-pointer'>Términos de Servicio</p>
          <p className='hover:underline cursor-pointer'>Política privacidad</p>
        </div>
        <div>
          <p className='text-xs font-bold tracking-widest col-start-3 font-mono text-mid-gray py-2 md:py-0'>
            Copyright Grupo C. 2024
          </p>
        </div>
      </div>
    </div>
  )
}

export default Footer
