import Link from 'next/link'
import { ArrowRight, User } from 'lucide-react'
import Loader from '@/components/Loader'
import { useUser } from '@/services/useUser'
import { UsersTable } from './_components/UsersTable'
import { Suspense } from 'react'
import { User as UserModel } from '@/interfaces/user.model'
import { columns } from './_lib/columns'

const users: UserModel[] = [
  {
    id: 'user1', // Replace with actual IDs
    email: 'user1@example.com',
    password: 'password1', // Consider hashing passwords before storing
    name: 'John',
    lastName: 'Doe',
    loginAttempts: 0,
    isActive: true,
  },
  {
    id: 'user2', // Replace with actual IDs
    email: 'user2@example.com',
    password: 'password2', // Consider hashing passwords before storing
    name: 'Jane',
    lastName: 'Williams',
    loginAttempts: 1,
    isActive: false,
  },
  {
    id: 'user3', // Replace with actual IDs
    email: 'user3@example.com',
    password: 'password3', // Consider hashing passwords before storing
    name: 'Michael',
    lastName: 'Brown',
    loginAttempts: 2,
    isActive: true,
  },
  {
    id: 'user4', // Replace with actual IDs
    email: 'user4@example.com',
    password: 'password4', // Consider hashing passwords before storing
    name: 'Sarah',
    lastName: 'Garcia',
    loginAttempts: 0,
    isActive: true,
  },
  {
    id: 'user5', // Replace with actual IDs
    email: 'user5@example.com',
    password: 'password5', // Consider hashing passwords before storing
    name: 'David',
    lastName: 'Wilson',
    loginAttempts: 3,
    isActive: false,
  },
]

const Page = () => {
  // const { users, isLoading } = useUser()

  return (
    <div className='max-h-full m-auto flex flex-col'>
      <Link
        href='/equipos/create'
        className='inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 p-2 absolute right-10 top-32 z-10 tracking-widest border'
      >
        CREAR EQUIPO
        <ArrowRight className='h-4 w-4 mx-1' />
      </Link>

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
