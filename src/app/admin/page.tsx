'use client'

import { useSession } from 'next-auth/react'
import AdminFunctionItem from './_components/AdminFunctionItem'
import { LineChart, ParkingSquare, User } from 'lucide-react'
import Loader from '@/components/Loader'
import { useEffect, useState } from 'react'
import { ParkingInterface } from '@/lib/interfaces/parking.interface'
import { useParking } from '@/services/useParking'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'

const GERENTE_FUNCTIONS = [
  {
    title: 'GESTIONAR USUARIOS',
    text: 'Visualiza, edita y elimina los usuarios del sistema de Four Parks. También podrás visualizar las operaciones de cada uno.',
    link: '/admin/usuarios',
    icon: <User strokeWidth={0.9} className='h-32 w-32 mx-auto' />,
  },
  {
    title: 'GESTIONAR PARQUEADEROS',
    text: 'Gestiona todos los parqueaderos del sistema de Four Parks. También podrás generar reportes de cada uno de los puntos.',
    link: '/admin/parqueaderos',
    icon: <ParkingSquare strokeWidth={0.9} className='h-32 w-32 mx-auto' />,
  },
]

const ADMIN_FUNCTIONS = [
  {
    title: 'VER ESTADO PUNTO',
    text: 'Gestiona las reservas actuales del punto.',
    link: '/admin/parqueaderos/',
    icon: <ParkingSquare strokeWidth={0.9} className='h-32 w-32 mx-auto' />,
  },
  {
    title: 'VER ESTADISTICAS DE PUNTO',
    text: 'Ver las estadísticas del punto de parqueadero.',
    link: '/admin/parqueaderos/estadisticas',
    icon: <LineChart strokeWidth={0.9} className='h-32 w-32 mx-auto' />,
  },
]

const Page = () => {
  const { data: session } = useSession()
  const { parkings, getParkings, isLoading } = useParking()
  const [parking, setParking] = useState<ParkingInterface | null | undefined>(
    null
  )
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const fetchParking = async () => {
      await getParkings()
    }
    session?.rol === 'ADMINISTRADOR' && fetchParking()
  }, [session])

  // mostrar parqueadero asignado y verificacion de admin asociado a parqueadero
  useEffect(() => {
    if (session && session?.rol === 'ADMINISTRADOR') {
      const assignedParkings = parkings.map((parkingItem) => {
        if (parkingItem.admin?.id === session?.id) return parkingItem
      })
      if (assignedParkings.length !== 0) {
        setParking(assignedParkings[0])
      } else {
        toast({
          variant: 'destructive',
          title:
            'Necesitas estar asociado a un parqueadero para poder hacer uso del modo admin.',
          description: 'Pídele al gerente que te asigne a algún parqueadero.',
        })
        router.push('/')
      }
    }
  }, [parkings])
  return !session || isLoading ? (
    <Loader />
  ) : (
    <div className='max-h-full flex flex-col gap-y-10 m-6 sm:m-10'>
      <div className='flex flex-col'>
        <div className='pb-7'>
          <h1 className='text-3xl sm:text-4xl tracking-widest pb-1'>
            MENU {session?.rol === 'GERENTE' ? 'GERENTE' : 'ADMINISTRADOR'}
          </h1>
          {parking && (
            <div>
              <p className='text-sm tracking-widest font-medium'>
                PARQUEADERO:{' '}
                <span className='font-normal'>
                  {' '}
                  {parking?.name.toUpperCase()}
                </span>
              </p>
              <p className='text-sm tracking-widest font-medium'>
                DIRECCIÓN:
                <span className='font-normal'>
                  {' '}
                  {parking?.location.address.toUpperCase()}
                </span>
              </p>
              <p className='text-sm tracking-widest font-medium'>
                CIUDAD:
                <span className='font-normal'>
                  {' '}
                  {parking?.location.city.city.toUpperCase()}
                </span>
              </p>
              <p className='text-sm tracking-widest font-medium'>
                ADMINISTRADOR:
                <span className='font-normal'>
                  {' '}
                  {parking?.admin?.firstName.toUpperCase() +
                    ' ' +
                    parking?.admin?.firstLastname.toUpperCase()}
                </span>
              </p>
            </div>
          )}
        </div>
        <div className='flex flex-row justify-center flex-wrap gap-5'>
          {session?.rol === 'ADMINISTRADOR' && (
            <>
              <AdminFunctionItem
                title={'VER ESTADO PUNTO'}
                text={'Gestiona las reservas actuales del punto.'}
                link={'/admin/parqueaderos/' + parking?.id + '/reservas'}
                icon={
                  <ParkingSquare
                    strokeWidth={0.9}
                    className='h-32 w-32 mx-auto'
                  />
                }
              />
              <AdminFunctionItem
                title={'VER ESTADISTICAS DE PUNTO'}
                text={'Ver las estadísticas del punto de parqueadero.'}
                link={'/admin/parqueaderos/' + parking?.id + '/estadisticas'}
                icon={
                  <LineChart strokeWidth={0.9} className='h-32 w-32 mx-auto' />
                }
              />
            </>
          )}
          {session?.rol === 'GERENTE' &&
            GERENTE_FUNCTIONS.map((item, index) => (
              <AdminFunctionItem
                title={item.title}
                text={item.text}
                link={item.link}
                icon={item.icon}
                key={index}
              />
            ))}
        </div>
      </div>
    </div>
  )
}

export default Page
