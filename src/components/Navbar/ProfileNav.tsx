'use client'

import { User, UserPlus, LogIn, LogOut } from 'lucide-react'
import Link from 'next/link'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
// import { useAuth } from '@/hooks/user-auth'

const Profile = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  // const { signOut } = useAuth()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Link
          className='bg-background hover:bg-accent hover:text-accent-foreground h-11 w-12 flex items-center justify-around p-1.5 border-2 border-yellow-300'
          href='/sign-up'
        >
          <User />
        </Link>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuLabel>Perfil</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {isLoggedIn ? (
          <>
            <DropdownMenuItem>
              <User className='mr-2 h-4 w-4' />
              <Link href='/profile'>Perfil</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              // onClick={signOut}
              className='text-red-500 font-bold'
            >
              <LogOut className='mr-2 h-4 w-4' />
              Cerrar Sesión
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem>
              <LogIn className='mr-2 h-4 w-4' />
              <Link href='/sign-in'>Ingresar</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <UserPlus className='mr-2 h-4 w-4' />
              <Link href='/sign-up'>Registrarse</Link>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
    // {isLoggedIn ? (
    //   <Link
    //     className='bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10 flex items-center justify-around p-1.5'
    //     href='/profile'
    //   >
    //     <User />
    //   </Link>
    // ) : (

    // )}
  )
}

export default Profile
