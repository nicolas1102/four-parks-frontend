'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import {
  Menu,
  ParkingSquare,
  LogOut,
  LogIn,
  UserPlus,
  User,
} from 'lucide-react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { signOut } from 'next-auth/react'

const BurgerMenu = ({
  isLoggedIn,
  name,
  rol,
}: {
  isLoggedIn: boolean
  name: string
  rol: string
}) => {
  const { data: session } = useSession()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='outline'
          size='icon'
          className='h-12 w-12 hover:bg-yellowFPC-200  dark:hover:bg-yellowFPC-400 border-primary dark:hover:text-background'
        >
          <p
            className={
              'h-12 w-auto flex items-center justify-around p-2.5  dark:hover:text-background'
            }
          >
            <Menu />
          </p>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        {session?.rol === 'USUARIO' && (
          <DropdownMenuItem>
            <ParkingSquare className='mr-2 h-4 w-4' />
            <Link href='/auth/log-in'>Parqueaderos</Link>
          </DropdownMenuItem>
        )}
        {session?.rol === 'ADMINISTRADOR' && (
          <DropdownMenuItem>
            <ParkingSquare className='mr-2 h-4 w-4' />
            <Link href='/admin'>Menu Admin</Link>
          </DropdownMenuItem>
        )}
        {session?.rol === 'GERENTE' && (
          <DropdownMenuItem>
            <ParkingSquare className='mr-2 h-4 w-4' />
            <Link href='/admin'>Menu Gerente</Link>
          </DropdownMenuItem>
        )}
        {session?.rol && <DropdownMenuSeparator />}
        <DropdownMenuLabel>
          {name}
          {rol !== 'USUARIO' ? (
            <span className='dark:text-yellowFPC-400 text-blue-700 font-medium'>
              ({rol})
            </span>
          ) : (
            ''
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {isLoggedIn ? (
          <>
            <DropdownMenuItem className='cursor-pointer'>
              <User className='mr-2 h-4 w-4' />
              <Link href='/usuario'>Perfil</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                signOut()
              }}
              className='text-red-500 font-bold cursor-pointer'
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

export default BurgerMenu
