'use client'

import { User as UserIcons } from 'lucide-react'
import Loader from '@/components/Loader'
import { UsersTable } from './_components/UsersTable'
import { useEffect, useState } from 'react'
import { useUser } from '@/services/useUser'
import { CreateAdminDialog } from './_components/CreateAdminDialog'

const Page = () => {
  const { users, isLoading, getUsersByRole, setUsers } = useUser()
  const [role, setRole] = useState('ALL')

  useEffect(() => {
    const fetchUsers = async () => {
      if (role === 'ALL') {
        const mangersData = await getUsersByRole('2')
        const usersData = await getUsersByRole('3')
        if (
          usersData &&
          mangersData &&
          (mangersData.length > 0 || usersData.length > 0)
        ) {
          setUsers([...mangersData, ...usersData])
        }
      } else if (role === 'USUARIO') {
        const usersData = await getUsersByRole('3')
        if (usersData.length > 0) {
          setUsers([...usersData])
        }
      } else {
        const mangersData = await getUsersByRole('2')
        if (mangersData.length > 0) {
          setUsers([...mangersData])
        }
      }
    }
    fetchUsers()
  }, [role])

  return (
    <div className=' flex flex-col relative m-10'>
      <CreateAdminDialog />

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
          <UsersTable data={users} role={role} setRole={setRole} />
        </>
      )}
    </div>
  )
}

export default Page
