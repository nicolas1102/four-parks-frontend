'use client'
import Link from 'next/link'
import { ArrowRight, User } from 'lucide-react'
import Loader from '@/components/Loader'
import { useUser } from '@/services/useUser'
import { UsersTable } from './_components/UsersTable'
import { Suspense, useEffect } from 'react'
import { User as UserModel } from '@/lib/interfaces/user.model'
import { columns } from './_lib/columns'
import FloatingButton from '@/components/CustomButtons/FloatingButton'
import { UsersTable1 } from './_components/UsersTable1'

const usersData: UserModel[] = [
  {
    id: 'user123',
    email: 'john.doe@example.com',
    password: '', // Replace with hashed password for security
    firstName: 'John',
    firstLastname: 'Doe',
    secondLastname: 'Miller',
    loginAttempts: 0,
    isActive: true,
    isBlocked: true,
    roleRequest: {
      roleListName: ['USER'],
    },
  },
  {
    email: 'jane.smith@example.com',
    password: '', // Replace with hashed password for security
    firstName: 'Jane',
    firstLastname: 'Smith',
    secondLastname: 'Miller',
    loginAttempts: 0,
    isActive: true,
    isBlocked: false,
    roleRequest: {
      roleListName: ['USER'],
    },
  },
  {
    id: 'user456',
    email: 'peter.jones@example.com',
    password: '', // Replace with hashed password for security
    firstName: 'Peter',
    firstLastname: 'Jones',
    secondLastname: 'Miller',
    loginAttempts: 1, // Simulate a login attempt
    isActive: false, // Simulate a deactivated user
    isBlocked: false,
    roleRequest: {
      roleListName: ['USER'],
    },
  },
  {
    email: 'mary.williams@example.com',
    password: '', // Replace with hashed password for security
    firstName: 'Mary',
    firstLastname: 'Williams',
    secondLastname: 'Miller',
    loginAttempts: 0,
    isActive: true,
    isBlocked: true,
    roleRequest: {
      roleListName: ['USER'],
    },
  },
  {
    id: 'user789',
    email: 'david.miller@example.com',
    password: '', // Replace with hashed password for security
    firstName: 'David',
    firstLastname: 'Miller',
    secondLastname: 'Johnson',
    loginAttempts: 0,
    isActive: true,
    isBlocked: false,
    roleRequest: {
      roleListName: ['USER'],
    },
  },
]

const Page = () => {
  // const { users, getUsers } = useUser()

  // useEffect(() => {
  //   getUsers()
  // }, [])

  return (
    <div className=' m-auto flex flex-col relative'>
      <FloatingButton
        text='CREAR USUARIO'
        direction='right'
        href='/usuarios/form'
      />

      <Suspense fallback={<Loader />}>
        {usersData.length === 0 ? (
          <h1 className='text-sm tracking-widest text-center'>
            NO HAY USUARIOS.
          </h1>
        ) : (
          <>
            <div className='py-4 flex flex-col gap-y-2'>
              <h1 className='text-3xl font-normal tracking-wider text-primary sm:text-4xl inline-flex'>
                <User className='h-9 w-9 mt-1 mr-2' />
                USUARIOS
              </h1>
              <p className='text-sm tracking-wider'>
                Gestiona todos los usuarios.
              </p>
            </div>
            <UsersTable columns={columns} data={usersData} />
          </>
        )}
      </Suspense>
    </div>
  )
}

export default Page
