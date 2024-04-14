import NavItem from './NavItem'
import Link from 'next/link'
import { Icons } from '../Icons'
import ModeToggle from './ModeToggle'
import ProfileNav from './ProfileNav'

export const PAGES_INFO = [
  {
    title: 'PARQUEADEROS',
    link: '/parqueaderos',
    icon: 'Player',
    text: 'Gestiona mejores jugadores de la historia del futbol.'
  },
  {
    title: 'SOBRE NOSOTROS',
    link: '/about-us',
    icon: 'Shield',
    text: 'Gestiona los equipos más grandes del mundo.'
  }
]

const Navbar = async () => {
  return (
    <div className='flex flex-col sticky z-50 top-0 inset-x-0 items-center justify-center w-full border-b-2 bg-background'>
      <div className='w-full text-center p-1 bg-yellow-300'>
      </div>
      <div className='flex flex-row justify-around w-full p-1 content-center'>
        <ModeToggle />
        <div className='flex flex-row justify-around w-full'>
          <NavItem
            title={PAGES_INFO[0].title}
            link={PAGES_INFO[0].link}
          />
          <Link href='/' className='flex flex-row justify-center'>
            <p className='text-3xl font-medium tracking-wider text-center text-primary sm:text-4xl pr-4'>
              FOUR
            </p>
            <Icons.logo className=' w-11 h-11 text-yellow-400' />
            <p className=' text-3xl font-medium tracking-wider text-center text-primary sm:text-4xl'>
              ARKS
            </p>
          </Link>
          <NavItem
            title={PAGES_INFO[1].title}
            link={PAGES_INFO[1].link}
          />
        </div>
        {/* TODO: Add auth logic */}
        <ProfileNav isLoggedIn={false} />
      </div>
    </div>
  )
}

export default Navbar
