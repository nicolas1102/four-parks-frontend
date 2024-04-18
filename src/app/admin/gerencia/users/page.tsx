'use client'
import { User as UserIcons } from 'lucide-react'
import Loader from '@/components/Loader'
import { UsersTable } from './_components/UsersTable'
import { Suspense, useEffect, useState } from 'react'
import FloatingButton from '@/components/CustomButtons/FloatingButton'
import { User } from '@/lib/interfaces/user.interface'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Session } from 'next-auth'

const usersData: User[] = [
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
      roleListName: ['USUARIO'],
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
      roleListName: ['USUARIO'],
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
      roleListName: ['USUARIO'],
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
      roleListName: ['USUARIO'],
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
      roleListName: ['USUARIO'],
    },
  },
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
      roleListName: ['USUARIO'],
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
      roleListName: ['USUARIO'],
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
      roleListName: ['USUARIO'],
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
      roleListName: ['USUARIO'],
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
      roleListName: ['USUARIO'],
    },
  },
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
      roleListName: ['USUARIO'],
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
      roleListName: ['USUARIO'],
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
      roleListName: ['USUARIO'],
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
      roleListName: ['USUARIO'],
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
      roleListName: ['USUARIO'],
    },
  },
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
      roleListName: ['USUARIO'],
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
      roleListName: ['USUARIO'],
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
      roleListName: ['USUARIO'],
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
      roleListName: ['USUARIO'],
    },
  },
  {
    id: 'user789',
    email: 'david.miller@example.com',
    password: '', // Replace with hashed password for security
    firstName: 'Goku',
    firstLastname: 'Miller',
    secondLastname: 'Johnson',
    loginAttempts: 0,
    isActive: true,
    isBlocked: false,
    roleRequest: {
      roleListName: ['USUARIO'],
    },
  },
]

const Page = () => {
  // const [sessionState, setSessionState] = useState<Session>();
  // const [loading, setLoading] = useState(true);
  // const { data: session } = useSession();
  // const router = useRouter()

  // useEffect(() => {
  //   if (session) {
  //     setSessionState(session);
  //     setLoading(false);
  //   } 
  // }, [session]);

  // useEffect(() => {    
  //   // TODO: CAMBIAR A GERENTE
  //   if (!loading && sessionState?.user.role !== 'USUARIO') {
  //     router.push('/auth/unauthorized');
  //   }
  // }, [loading, router, sessionState]);

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
                <UserIcons className='h-9 w-9 mt-1 mr-2' />
                USUARIOS
              </h1>
              <p className='text-sm tracking-wider'>
                Gestiona todos los usuarios.
              </p>
            </div>
            <UsersTable data={usersData} />
          </>
        )}
      </Suspense>
    </div>
  )
}

export default Page
