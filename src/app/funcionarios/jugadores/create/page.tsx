'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowLeft, User } from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  JugadorFormValidator,
  TJugadorFormValidator,
} from '@/lib/validators/form-validators'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useJugador } from '@/hooks/JugadorContext'
import { useEquipo } from '@/hooks/EquipoContext'
import { useEffect, useState } from 'react'
import Loader from '@/components/Loader'
import { ChangeEvent } from 'react'

const Page = () => {
  const router = useRouter()
  const { createJugador } = useJugador()
  const { equipos, getEquipos } = useEquipo()
  const [isLoading, setIsLoading] = useState(true)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TJugadorFormValidator>({
    resolver: zodResolver(JugadorFormValidator),
  })

  const onSubmit = handleSubmit((data) => {
    try {
      createJugador(data)
      toast.success('Jugador creado correctamente.')
      router.push('/jugadores')
      router.refresh()
    } catch (error) {
      console.error('Error al crear jugador:', error)
    }
  })

  useEffect(() => {
    setIsLoading(true)
    try {
      getEquipos()
    } catch (error) {
      toast.success('Error al obtener los equipos.' + error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  return (
    <div className='container relative flex flex-col items-center justify-center lg:px-0 mb-8'>
      <Link
        href='/equipos'
        className='inline-flex items-center justify-center whitespace-nowrap  text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 p-2 absolute left-2 top-2 z-10 tracking-widest border'
      >
        <ArrowLeft className='h-4 w-4 mx-1' />
        GESTIONAR TODOS LOS JUGADORES
      </Link>

      {isLoading ? (
        <Loader />
      ) : (
        <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px] border p-3 mt-2'>
          <div className='flex flex-col items-center space-y-1 text-center'>
            <div className='relative mb-4 h-32 w-32 text-muted-foreground'>
              <User className='dark:fill-white h-32 w-32' />
            </div>
            <h1 className='text-2xl tracking-widest p-3'>CREAR JUGADOR</h1>
            <p className='text-sm tracking-wider'>
              Recuerda rellenar todos los campos.
            </p>
          </div>

          <div className='grid gap-6'>
            <form onSubmit={onSubmit}>
              <div className='grid gap-2'>
                <div className='grid gap-1 py-2'>
                  <Label htmlFor='nombre'>Nombre</Label>
                  <Input
                    {...register('nombre')}
                    className={cn({
                      'focus-visible:ring-red-500': errors.nombre,
                    })}
                    placeholder='Jhostyn David Alejandro'
                  />
                  {errors?.nombre && (
                    <p className='text-sm text-red-500'>
                      {errors.nombre.message}
                    </p>
                  )}
                </div>
                <div className='grid gap-1 py-2'>
                  <Label htmlFor='apellido'>Apellido</Label>
                  <Input
                    {...register('apellido')}
                    className={cn({
                      'focus-visible:ring-red-500': errors.apellido,
                    })}
                    placeholder='García'
                  />
                  {errors?.apellido && (
                    <p className='text-sm text-red-500'>
                      {errors.apellido.message}
                    </p>
                  )}
                </div>
                <div className='grid gap-1 py-2'>
                  <Label htmlFor='nacionalidad'>Nacionalidad</Label>
                  <Input
                    {...register('nacionalidad')}
                    className={cn({
                      'focus-visible:ring-red-500': errors.nacionalidad,
                    })}
                    placeholder='Alejandría'
                  />
                  {errors?.nacionalidad && (
                    <p className='text-sm text-red-500'>
                      {errors.nacionalidad.message}
                    </p>
                  )}
                </div>
                <div className='grid gap-1 py-2'>
                  <Label htmlFor='minutos_jugados'>Minutos Jugados</Label>
                  <Input
                    {...register('minutos_jugados', { valueAsNumber: true })}
                    className={cn({
                      'focus-visible:ring-red-500': errors.minutos_jugados,
                    })}
                    type='number'
                    placeholder='0'
                  />
                  {errors?.minutos_jugados && (
                    <p className='text-sm text-red-500'>
                      {errors.minutos_jugados.message}
                    </p>
                  )}
                </div>
                <div className='grid gap-1 py-2'>
                  <Label htmlFor='edad'>Edad</Label>
                  <Input
                    {...register('edad', { valueAsNumber: true })}
                    className={cn({
                      'focus-visible:ring-red-500': errors.edad,
                    })}
                    type='number'
                    placeholder='0'
                  />
                  {errors?.edad && (
                    <p className='text-sm text-red-500'>
                      {errors.edad.message}
                    </p>
                  )}
                </div>
                <div className='grid gap-1 py-2'>
                  <Label htmlFor='posicion'>Posicion</Label>
                  <Input
                    {...register('posicion')}
                    className={cn({
                      'focus-visible:ring-red-500': errors.posicion,
                    })}
                    placeholder='Aguatero Centro'
                  />
                  {errors?.posicion && (
                    <p className='text-sm text-red-500'>
                      {errors.posicion.message}
                    </p>
                  )}
                </div>
                <div className='grid gap-1 py-2'>
                  <Label htmlFor='equipo'>Equipo</Label>
                  <select
                    className='flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1'
                    // onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                    //   setValue('equipo', event.target.value)
                    // }}
                    {...register('equipo')}
                  >
                    {equipos.map((equipo) => {
                      if (equipo._id) {
                        return (
                          <option key={equipo._id} value={equipo.nombre}>
                            {equipo.nombre}
                          </option>
                        )
                      }
                    })}
                  </select>

                  {errors?.equipo && (
                    <p className='text-sm text-red-500'>
                      {errors.equipo.message}
                    </p>
                  )}
                </div>

                <Button className='tracking-widest dark:font-semibold'>
                  Guardar
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Page
