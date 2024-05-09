import { Facebook, Instagram, Linkedin } from 'lucide-react'
import Link from 'next/link'

export const FOOTER = 'FOUR PARKS, DONDE TU VEHÍCULO SIEMPRE ESTARÁ SEGURO.'

const Footer = async () => {
  return (
    <div className='inset-x-0 items-center justify-center w-full bottom-0 px-8 flex flex-col text-neutral-800 dark:text-slate-50'>
      <div className='grid grid-cols-12 w-full pb-14 border-t-2 border-yellowFPC-400 py-8'>
        <div className='col-span-3'>
          <p className='text-2xl tracking-tighter font-bold leading-none'>
            FourParks<span className='text-yellowFPC-400'>Colo</span>
            <span className='text-blueFPC-400'>mb</span>
            <span className='text-redFPC-400'>ia</span>
          </p>
          <p className=' text-2xl tracking-tighter  leading-none'>by Grupo C</p>
        </div>

        <div className='col-span-6 px-28 flex flex-col'>
          <Link
            href='/auth/sign-up'
            className='tracking-widest border-b border-blueFPC-400 px-2 py-2 hover:bg-blueFPC-200 duration-700 dark:hover:text-black'
          >
            REGISTRARSE
          </Link>
          <Link
            href='/auth/log-in'
            className='tracking-widest border-b border-blueFPC-400 px-2 py-2 hover:bg-blueFPC-200 duration-700 dark:hover:text-black'
          >
            INGRESAR
          </Link>
          <Link
            href='/parqueaderos'
            className='tracking-widest border-b border-blueFPC-400 px-2 py-2 hover:bg-blueFPC-200 duration-700 dark:hover:text-black'
          >
            PARQUEADEROS
          </Link>
        </div>

        <div className='col-span-3'>
          <h3 className='tracking-widest text-xl font-medium pb-1'>
            CONTÁCTANOS
          </h3>
          <div className='flex flex-row gap-2'>
            <Link href=''>
              <Instagram className='hover:bg-blueFPC-200 duration-700 dark:hover:text-black' />
            </Link>
            <Link href=''>
              <Facebook className='hover:bg-blueFPC-200 duration-700 dark:hover:text-black' />
            </Link>
            <Link href=''>
              <Linkedin className='hover:bg-blueFPC-200 duration-700 dark:hover:text-black' />
            </Link>
          </div>
        </div>
      </div>

      <div className='border-t border-redFPC-400 w-full pt-6 pb-4 flex flex-row justify-between'>
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
