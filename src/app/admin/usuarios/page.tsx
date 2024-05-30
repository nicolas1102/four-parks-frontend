'use client'

import { User as UserIcons } from 'lucide-react'
import Loader from '@/components/Loader'
import { UsersTable } from './_components/UsersTable'
import { useEffect, useState } from 'react'
import { useUser } from '@/services/useUser'
import { AdminDialog } from './_components/AdminDialog'
import NoResults from '@/components/NoResults'

const Page = () => {
  const { users,
          isLoading,
          getUsersByRole,
          setUsers
        } = useUser()

  const [role, setRole] = useState('ALL')

  useEffect(() => {
    const fetchUsers = async () => {
      if (role === 'ALL') {
        const managersData = await getUsersByRole('2')
        const usersData = await getUsersByRole('3')
        if (
          usersData &&
          managersData &&
          (managersData.length > 0 || usersData.length > 0)
        ) {
          setUsers([...managersData, ...usersData])
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
    <div className=' flex flex-col relative m-6 sm:m-10'>
      <div className='sm:mt-0 mt-12'>
        <AdminDialog />
      </div>
      {isLoading ? (
        <Loader />
      ) : users.length === 0 ? (
        <NoResults redirection='/admin' />
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
