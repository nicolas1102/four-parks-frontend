'use client'

import { useEffect, useState } from 'react'
import { useJugador } from '@/hooks/JugadorContext'
import TableJugadores from '@/components/TableJugadores'
import Link from 'next/link'
import { ArrowRight, Shield } from 'lucide-react'
import { toast } from 'sonner'
import Loader from '@/components/Loader'

const Page = () => {
  const { jugadores, getJugadores } = useJugador()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    try {
      getJugadores()
    } catch (error) {
      toast.success('Error al obtener los jugadores.' + error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  return (
    <div className='max-h-full m-auto flex flex-col'>
      <Link
        href='/jugadores/create'
        className='inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 p-2 absolute right-10 top-32 z-10 tracking-widest border'
      >
        CREAR JUGADOR
        <ArrowRight className='h-4 w-4 mx-1' />
      </Link>

      {isLoading ? (
        <Loader />
      ) : (
        <>
          {jugadores.length === 0 ? (
            <h1 className='text-sm tracking-widest text-center'>
              NO HAY JUGADORES.
            </h1>
          ) : (
            <>
              <div className='py-4 flex flex-col gap-y-2'>
                <h1 className='text-3xl font-normal tracking-wider text-primary sm:text-4xl inline-flex'>
                  <Shield className='h-9 w-9 mt-1 mr-2' />
                  JUGADORES
                </h1>
                <p className='text-sm tracking-wider'>
                  Gestiona todos los jugadores.
                </p>
              </div>
              <TableJugadores jugadores={jugadores} />
            </>
          )}
        </>
      )}
    </div>
  )
}

export default Page
