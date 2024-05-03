'use client'

import { useSession } from 'next-auth/react'
import AdminFunctionItem from './_components/AdminFunctionItem'
import { LineChart, ParkingSquare, User } from 'lucide-react'

const GERENTE_FUNCTIONS = [
  {
    title: 'GESTIONAR PARQUEADEROS',
    text: 'Gestiona todos los parqueaderos del sistema de Four Parks. Tambien podrás generar reportes de cada uno de los puntos.',
    link: '/admin/parqueaderos',
    icon: <ParkingSquare strokeWidth={0.9} className='h-32 w-32 mx-auto' />,
  },
  {
    title: 'GESTIONAR USUARIOS',
    text: 'Visualiza, edita y elimina los usuarios del sistema de Four Parks. Tambien podrás visualizar las operaciones de cada uno.',
    link: '/admin/usuarios',
    icon: <User strokeWidth={0.9} className='h-32 w-32 mx-auto' />,
  },
]

const FUNCIONARIO_FUNCTIONS = [
  {
    title: 'VER ESTADO PUNTO',
    text: 'Gestiona las reservas actuales del punto.',
    link: '/admin/parqueaderos/',
    icon: <ParkingSquare strokeWidth={0.9} className='h-32 w-32 mx-auto' />,
  },
  {
    title: 'VER ESTADISTICAS DE PUNTO',
    text: 'Ver las estadisticas del punto de parqueadero.',
    link: '/admin/usuarios',
    icon: <LineChart strokeWidth={0.9} className='h-32 w-32 mx-auto' />,
  },]

const Page = () => {
  const { data: session } = useSession()
  return (
    <div className='max-h-full flex flex-col gap-y-10 m-10'>
      <div className='flex flex-col'>
        <div className='pb-7'>
          <h1 className='text-4xl tracking-widest pb-1'>
            MENU {session?.rol === 'GERENTE' ? 'GERENTE' : 'FUNCIONARIO'}
          </h1>
          <p className='text-base uppercase'>Este es el menu de </p>
        </div>
        <div className='flex flex-row flex-wrap gap-5'>
          {
          session?.rol === 'FUNCIONARIO' &&
            FUNCIONARIO_FUNCTIONS.map((item, index) => (
              <AdminFunctionItem
                title={item.title}
                text={item.text}
                link={item.link}
                icon={item.icon}
                key={index}
              />
            ))}
            {
            // session?.rol === 'GERENTE' &&
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
