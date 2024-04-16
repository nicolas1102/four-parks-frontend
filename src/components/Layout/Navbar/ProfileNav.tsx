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
import { signOut } from 'next-auth/react'

const Profile = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Link
          className='bg-background hover:bg-accent h-11 w-12 flex items-center justify-around p-1.5 border border-primary hover:bg-yellow-200 hover dark:hover:bg-yellow-300 dark:hover:text-background  '
          href='/auth/sign-up'
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
