import Link from 'next/link'
import { ArrowRight, User } from 'lucide-react'
import Loader from '@/components/Loader'
import { useUser } from '@/services/useUser'
import { UsersTable } from './_components/UsersTable'
import { Suspense } from 'react'
import { User as UserModel } from '@/interfaces/user.model'
import { columns } from './_lib/columns'
import FloatingButton from '@/components/Buttons/FloatingButton'

const users: UserModel[] = [
  {
    id: 'user123',
    email: 'john.doe@example.com',
    password: '', // Replace with hashed password for security
    firstName: 'John',
    firstSurname: 'Doe',
    loginAttempts: 0,
    isActive: true,
    isFirstTime: true,
  },
  {
    email: 'jane.smith@example.com',
    password: '', // Replace with hashed password for security
    firstName: 'Jane',
    firstSurname: 'Smith',
    secondSurname: 'Miller',
    loginAttempts: 0,
    isActive: true,
    isFirstTime: false,
  },
  {
    id: 'user456',
    email: 'peter.jones@example.com',
    password: '', // Replace with hashed password for security
    firstName: 'Peter',
    firstSurname: 'Jones',
    loginAttempts: 1, // Simulate a login attempt
    isActive: false, // Simulate a deactivated user
    isFirstTime: false,
  },
  {
    email: 'mary.williams@example.com',
    password: '', // Replace with hashed password for security
    firstName: 'Mary',
    firstSurname: 'Williams',
    loginAttempts: 0,
    isActive: true,
    isFirstTime: true,
  },
  {
    id: 'user789',
    email: 'david.miller@example.com',
    password: '', // Replace with hashed password for security
    firstName: 'David',
    firstSurname: 'Miller',
    secondSurname: 'Johnson',
    loginAttempts: 0,
    isActive: true,
    isFirstTime: false,
  },
]

const Page = () => {
  // const { users, isLoading } = useUser()

  return (
    <div className=' m-auto flex flex-col relative'>
      <FloatingButton
        text='CREAR USUARIO'
        direction='right'
        href='/usuarios/form'
      />

      <Suspense fallback={<Loader />}>
        {users.length === 0 ? (
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
            <UsersTable columns={columns} data={users} />
          </>
        )}
      </Suspense>
    </div>
  )
}

export default Page
