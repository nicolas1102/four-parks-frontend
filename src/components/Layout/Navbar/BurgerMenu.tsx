'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSubContent,
} from '@/components/ui/dropdown-menu'
import {
  Menu,
  ParkingSquare,
  LogOut,
  LogIn,
  UserPlus,
  User,
  SunMoon,
  Sun,
  Moon,
  Laptop,
} from 'lucide-react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { signOut } from 'next-auth/react'
import { useTheme } from 'next-themes'

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
  const { setTheme } = useTheme()
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
        {session?.rol === 'USUARIO' && (
          <DropdownMenuItem>
            <ParkingSquare className='mr-2 h-4 w-4' />
            <Link href='/parqueaderos'>Parqueaderos</Link>
          </DropdownMenuItem>
        )}
        {session?.rol === 'ADMINISTRADOR' && (
          <DropdownMenuItem>
            <ParkingSquare className='mr-2 h-4 w-4' />
            <Link href='/admin'>Menú Admin</Link>
          </DropdownMenuItem>
        )}
        {session?.rol === 'GERENTE' && (
          <DropdownMenuItem>
            <ParkingSquare className='mr-2 h-4 w-4' />
            <Link href='/admin'>Menú Gerente</Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuSub >
          <DropdownMenuSubTrigger>
            <SunMoon className='mr-2 h-4 w-4' />
            <span>Tema</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuLabel>Tema</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setTheme('light')}>
                <Sun className='mr-2 h-4 w-4' />
                Claro
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('dark')}>
                <Moon className='mr-2 h-4 w-4' />
                Oscuro
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('system')}>
                <Laptop className='mr-2 h-4 w-4' />
                Sistema
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
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
