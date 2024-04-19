'use client'

import {
  User,
  UserPlus,
  LogIn,
  LogOut,
  SeparatorHorizontal,
} from 'lucide-react'
import Link from 'next/link'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { signOut } from 'next-auth/react'

const Profile = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  // TODO: Logica del nombre de usar con useSession
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Link
          className='bg-background hover:bg-accent h-12 w-auto flex items-center justify-around p-1.5 pr-2 border border-primary hover:bg-yellow-200 hover dark:hover:bg-yellow-300 dark:hover:text-background  '
          href='/auth/sign-up'
        >
          <p className='tracking-widest text-sm font-medium leading-none m-1'>
            PERFIL
          </p>
          <div className='border-l-2 h-full w-0 border-primary mx-2'></div>
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
              onClick={() => {
                signOut()
              }}
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
              <Link href='/auth/log-in'>Ingresar</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <UserPlus className='mr-2 h-4 w-4' />
              <Link href='/auth/sign-up'>Registrarse</Link>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Profile
