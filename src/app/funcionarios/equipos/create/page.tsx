'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ArrowLeft } from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  EquipoFormValidator,
  TEquipoFormValidator,
} from '@/lib/validators/form-validators'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Icons } from '@/components/Icons'
import { useEquipo } from '@/hooks/EquipoContext'

const Page = () => {
  const router = useRouter()
  const { createEquipo } = useEquipo()

  // register help us to handle the state of the inputs.
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TEquipoFormValidator>({
    resolver: zodResolver(EquipoFormValidator),
  })

  const onSubmit = handleSubmit((data) => {
    createEquipo(data)
    toast.success('Equipo creado correctamente.')
    router.push('/equipos')
    router.refresh()
  })

  return (
    <div className='container relative flex flex-col items-center justify-center lg:px-0 mb-8'>
      <Link
        href='/equipos'
        className='inline-flex items-center justify-center whitespace-nowrap  text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 p-2 absolute left-2 top-2 z-10 tracking-widest border'
      >
        <ArrowLeft className='h-4 w-4 mx-1' />
        GESTIONAR TODOS LOS EQUIPOS
      </Link>

      <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px] border p-3 mt-2'>
        <div className='flex flex-col items-center space-y-1 text-center'>
          <div className='relative mb-4 h-32 w-32 text-muted-foreground'>
            <Icons.logo className='dark:fill-white' />
          </div>
          <h1 className='text-2xl tracking-widest p-3'>CREAR EQUIPO</h1>
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
                  placeholder='Millitos, tu papá'
                />
                {errors?.nombre && (
                  <p className='text-sm text-red-500'>
                    {errors.nombre.message}
                  </p>
                )}
              </div>
              <div className='grid gap-1 py-2'>
                <Label htmlFor='himno'>Himno</Label>
                <Textarea
                  {...register('himno')}
                  className={cn({
                    'focus-visible:ring-red-500': errors.himno,
                  })}
                  placeholder="You'll never walk alone..."
                />
                {errors?.himno && (
                  <p className='text-sm text-red-500'>{errors.himno.message}</p>
                )}
              </div>
              <div className='grid gap-1 py-2'>
                <Label htmlFor='victorias'>Victorias</Label>
                <Input
                  {...register('victorias', { valueAsNumber: true })}
                  className={cn({
                    'focus-visible:ring-red-500': errors.victorias,
                  })}
                  type='number'
                  placeholder='0'
                />
                {errors?.victorias && (
                  <p className='text-sm text-red-500'>
                    {errors.victorias.message}
                  </p>
                )}
              </div>
              <div className='grid gap-1 py-2'>
                <Label htmlFor='empates'>Empates</Label>
                <Input
                  {...register('empates', { valueAsNumber: true })}
                  className={cn({
                    'focus-visible:ring-red-500': errors.empates,
                  })}
                  type='number'
                  placeholder='0'
                />
                {errors?.empates && (
                  <p className='text-sm text-red-500'>
                    {errors.empates.message}
                  </p>
                )}
              </div>
              <div className='grid gap-1 py-2'>
                <Label htmlFor='derrotas'>Derrotas</Label>
                <Input
                  {...register('derrotas', { valueAsNumber: true })}
                  className={cn({
                    'focus-visible:ring-red-500': errors.derrotas,
                  })}
                  type='number'
                  placeholder='0'
                />
                {errors?.derrotas && (
                  <p className='text-sm text-red-500'>
                    {errors.derrotas.message}
                  </p>
                )}
              </div>
              <div className='grid gap-1 py-2'>
                <Label htmlFor='cantidad_titulos'>Cantidad de Titulos</Label>
                <Input
                  {...register('cantidad_titulos', { valueAsNumber: true })}
                  className={cn({
                    'focus-visible:ring-red-500': errors.cantidad_titulos,
                  })}
                  type='number'
                  placeholder='0'
                />
                {errors?.cantidad_titulos && (
                  <p className='text-sm text-red-500'>
                    {errors.cantidad_titulos.message}
                  </p>
                )}
              </div>
              <div className='grid gap-1 py-2'>
                <Label htmlFor='cantidad_jugadores'>
                  Cantidad de Jugadores
                </Label>
                <Input
                  {...register('cantidad_jugadores', { valueAsNumber: true })}
                  className={cn({
                    'focus-visible:ring-red-500': errors.cantidad_jugadores,
                  })}
                  type='number'
                  placeholder='0'
                />
                {errors?.cantidad_jugadores && (
                  <p className='text-sm text-red-500'>
                    {errors.cantidad_jugadores.message}
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
    </div>
  )
}

export default Page
