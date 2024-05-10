'use client'

import { User as UserIcons } from 'lucide-react'
import Loader from '@/components/Loader'
import { ParkingsTable } from './_components/ParkingsTable'
import { useEffect, useState } from 'react'
import { useParking } from '@/services/useParking'
import { ParkingDialog } from './_components/ParkingDialog'
import { Dialog } from '@/components/ui/dialog'
import NoResults from '@/components/NoResults'

const Page = () => {
  const { parkings, isLoading, getParkings, setParkings } = useParking()

  useEffect(() => {
    const fetchParkings = async () => {
      await getParkings()
    }
    fetchParkings()
  }, [])

  return (
    <div className=' flex flex-col relative m-10'>
      <Dialog>
        <ParkingDialog />
      </Dialog>

      {isLoading ? (
        <Loader />
      ) : parkings.length === 0 ? (
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
          <ParkingsTable data={parkings} />
        </>
      )}
    </div>
  )
}

export default Page
