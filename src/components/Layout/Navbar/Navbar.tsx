import NavItem from './NavItem'
import Link from 'next/link'
import { Icons } from '../../Icons'
import ModeToggle from './ModeToggle'
import ProfileNav from './ProfileNav'
import { getServerSession } from 'next-auth'

export const PAGES_INFO = [
  {
    title: 'PARQUEADEROS',
    link: '/parqueaderos',
    icon: 'Player',
    text: 'Gestiona mejores jugadores de la historia del futbol.',
  }
]

const Navbar = async () => {
  const session = await getServerSession()
  return (
    <div className='flex flex-col sticky z-50 top-0 inset-x-0 items-center justify-center w-full border-b-2 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='w-full text-center p-1 bg-yellow-300'></div>

      <div className='flex flex-row justify-between w-full p-1 content-center gap-2'>
        <div className='flex flex-row px-1'>
          <Link href='/' className='flex flex-row justify-center'>
            <p className='text-3xl font-medium tracking-wider text-center text-primary sm:text-4xl pr-2'>
              FOUR
            </p>
            <Icons.logo className=' w-11 h-11 text-yellow-400 hover:-rotate-45 transition-all' />
            <p className=' text-3xl font-medium tracking-wider text-center text-primary sm:text-4xl'>
              ARKS
            </p>
          </Link>
        </div>
        <div className='flex flex-row justify-end gap-2 px-1'>
          <NavItem title={PAGES_INFO[0].title} link={PAGES_INFO[0].link} />
          <span className='border'></span> 
          <ProfileNav isLoggedIn={session ? true : false} />
          <span className='border'></span> 
          <ModeToggle />
        </div>
      </div>
    </div>
  )
}

export default Navbar
