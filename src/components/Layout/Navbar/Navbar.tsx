'use client'
import NavItem from './NavItem'
import Link from 'next/link'
import { Icons } from '../../Icons'
import ModeToggle from './ModeToggle'
import ProfileNav from './ProfileNav'
import { getServerSession } from 'next-auth'
// import { OPTIONS } from '@/app/api/auth/[...nextauth]/route'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/dist/server/api-utils'

const Navbar = () => {
  // const session = await getServerSession(OPTIONS)
  const { data: session1 } = useSession()

  return (
    <div className='flex flex-col sticky z-50 top-0 inset-x-0 items-center justify-center w-full border-b-2 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='w-full text-center p-1 bg-yellow-300'></div>

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
          {session1?.role === 'USUARIO' && (
            <>
              <NavItem title='PARQUEADEROS' link='/parqueaderos' />
              <span className='border-l border-primary'></span>
            </>
          )}
          {session1?.role === 'FUNCIONARIO' && (
            <>
              <NavItem title='MENU FUNCIONARIOS' link='/admin' />
              <span className='border-l border-primary'></span>
            </>
          )}
          {session1?.role === 'GERENTE' && (
            <>
              <NavItem title='MENU GERENTE' link='/admin' />
              <span className='border-l border-primary'></span>
            </>
          )}
          <ProfileNav isLoggedIn={session1 ? true : false} />
          <span className='border-l border-primary'></span>
          <ModeToggle />
        </div>
      </div>
    </div>
  )
}

export default Navbar
