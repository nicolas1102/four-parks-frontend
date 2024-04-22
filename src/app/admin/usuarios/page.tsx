import { User as UserIcons } from 'lucide-react'
import Loader from '@/components/Loader'
import { UsersTable } from './_components/UsersTable'
import { Suspense } from 'react'
import FloatingButton from '@/components/CustomButtons/FloatingButton'
import { UserInterface } from '@/lib/interfaces/user.interface'

const usersData: UserInterface[] = [
  {
    id: 'user123',
    email: 'john.doe@example.com',
    firstName: 'John',
    firstLastname: 'Doe',
    secondLastname: 'Miller',
    loginAttempts: 0,
    isActive: true,
    isBlocked: true,
    roleListName: ['USUARIO'],
  },
]

const Page = () => {
  return (
    <div className=' flex flex-col relative m-10'>
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
            <div className=' flex flex-col gap-y-2'>
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
