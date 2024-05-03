'use client'

import { User as UserIcons } from 'lucide-react'
import Loader from '@/components/Loader'
import { UsersTable } from './_components/UsersTable'
import { Suspense, useEffect } from 'react'
import FloatingButton from '@/components/CustomButtons/FloatingButton'
import { UserInterface } from '@/lib/interfaces/user.interface'
import { useUser } from '@/services/useUser'

const usersData: UserInterface[] = [
  {
    id: 'user123',
    email: 'john.doe@example.com',
    firstName: 'John',
    secondName: 'Marin',
    firstLastname: 'Doe',
    secondLastname: 'Miller',
    loginAttempts: 0,
    accountActive: true,
    accountBlocked: true,
    roleList: ['USUARIO'],
    creditCard: undefined,
  },
]

const Page = () => {
  const { users, getUsers, getOneUserByEmail, getOneUserByRole, isLoading } =
    useUser()

  useEffect(() => {
    const fetchUsers = () => {
      getUsers()
    }
    fetchUsers()
    // const res = getOneUserByEmail('admin@gmail.com')
    // const res2 = getOneUserByRole('1')
  }, [])
  return (
    <div className=' flex flex-col relative m-10'>
      <FloatingButton
        text='CREAR USUARIO'
        direction='right'
        href='/admin/usuarios/form'
      />

      {isLoading ? (
        <Loader />
      ) : users.length === 0 ? (
        // TODO: Mejorar esto
        <h1 className='text-sm tracking-widest text-center'>
          NO HAY USUARIOS.
        </h1>
      ) : (
        <>
          <div className=' flex flex-col gap-y-2'>
            <h1 className='text-3xl font-normal tracking-wider text-primary sm:text-4xl inline-flex'>
              <UserIcons className='h-9 w-9 mt-1 mr-2' />
              USUARIOS
            </h1>
            <p className='text-sm tracking-wider'>
              Gestiona todos los usuarios.
            </p>
          </div>
          <UsersTable data={users} />
        </>
      )}
    </div>
  )
}

export default Page
