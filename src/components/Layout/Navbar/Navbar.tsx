'use client'
import NavItem from './NavItem'
import Link from 'next/link'
import { Icons } from '../../Icons'
import ModeToggle from './ModeToggle'
import ProfileNav from './ProfileNav'
// import { OPTIONS } from '@/app/api/auth/[...nextauth]/route'
import { useSession } from 'next-auth/react'
import { Session } from 'next-auth'

const Navbar = () => {
  // const session = await getServerSession(OPTIONS)
  const { data: session } = useSession() 

  return (
    <div className='flex flex-col sticky z-50 top-0 inset-x-0 items-center justify-center w-full border-b-2 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='grid grid-cols-4 w-full'>
        <div className='col-span-2 text-center p-1 bg-yellowFPC-400'></div>
        <div className='col-span-1 text-center p-1 bg-blueFPC-400'></div>
        <div className='col-span-1 text-center p-1 bg-redFPC-400'></div>
      </div>

      <div className='flex flex-row justify-between w-full p-1 content-center gap-2'>
        <div className='flex flex-row px-4'>
          <Link href='/' className='flex flex-row justify-center'>
            <p className='text-4xl font-medium tracking-wider text-center text-primary  pr-2'>
              FOUR
            </p>
            <Icons.logo className=' w-11 h-11 text-yellow-400 hover:-rotate-45 transition-all' />
            <p className=' text-4xl font-medium tracking-wider text-center text-primary '>
              ARKS
            </p>
          </Link>
        </div>
        <div className='flex flex-row justify-end gap-2 px-1'>
          {session?.rol === 'USUARIO' && (
            <>
              <NavItem title='PARQUEADEROS' link='/parqueaderos' />
              <span className='border-l border-primary'></span>
            </>
          )}
          {session?.rol === 'ADMINISTRADOR' && (
            <>
              <NavItem title='MENU ADMINISTRADOR' link='/admin' />
              <span className='border-l border-primary'></span>
            </>
          )}
          {session?.rol === 'GERENTE' && (
            <>
              <NavItem title='MENU GERENTE' link='/admin' />
              <span className='border-l border-primary'></span>
            </>
          )}
          <ProfileNav
            isLoggedIn={Boolean(session)}
            name={
              session
                ? session?.firstName +
                  ' ' +
                  session?.secondName?.charAt(0) +
                  '. ' +
                  session?.firstLastname +
                  ' ' +
                  session?.secondLastname?.charAt(0) +
                  '. '
                : 'Perfil'
            }
            rol={session ? session?.rol : 'USUARIO'}
          />
          <span className='border-l border-primary'></span>
          <ModeToggle />
        </div>
      </div>
    </div>
  )
}

export default Navbar
