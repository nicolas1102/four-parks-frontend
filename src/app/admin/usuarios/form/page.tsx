'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'next/navigation'
import { Icons } from '@/components/Icons'
import FloatingButton from '@/components/CustomButtons/FloatingButton'
import PrimaryButton from '@/components/CustomButtons/PrimaryButton'
import { useUser } from '@/services/useUser'
import { UserInterface } from '@/lib/interfaces/user.interface'
import { useEffect } from 'react'
import {
  CreateManagerValidator,
  TCreateManagerValidator,
} from '@/lib/validators/user-validators'

interface ParkingOption {
  value: string
  label: string
}

const parkingOptions: ParkingOption[] = [
  {
    value: 'Calle 50',
    label: 'Calle 50',
  },
  {
    value: 'Avenida Cali',
    label: 'Avenida Cali',
  },
]

const Page = () => {
  const searchParams = useSearchParams()
  const { isLoading, createUser, getOneUserByEmail } = useUser()
  const email = searchParams.get('email')

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<TCreateManagerValidator>({
    resolver: zodResolver(CreateManagerValidator),
  })

  const onSubmit = async ({
    email,
    firstName,
    secondName,
    firstLastname,
    secondLastname,
    parking,
  }: TCreateManagerValidator) => {
    // TODO: Revisar esto dependiendo de cómo se va a crear los funcionarios
    const userData = {
      email,
      firstName,
      secondName,
      firstLastname,
      secondLastname,
      roleList: ['FUNCIONARIO'],
    } as UserInterface
    await createUser(userData)
  }

  useEffect(() => {
    const fetchData = async () => {
      if (email) {
        const res = await getOneUserByEmail(email)
        setValue('email', email)
      }
    }
    fetchData()
  }, [])

  return (
    <div className='relative flex flex-col items-center justify-center lg:px-0 m-10'>
      <FloatingButton text='REGRESAR' href='/admin/usuarios' direction='left' />

      <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px] border border-blueFPC-400 p-5 bg-background-contrast'>
        <div className='flex flex-col items-center text-center'>
          <div className='relative h-32 w-32 text-muted-foreground'>
            <Icons.logo className='text-blueFPC-400' />
          </div>
          <h1 className='text-2xl tracking-widest p-3'>
            {email ? 'EDITAR USUARIO' : 'CREAR FUNCIONARIO'}
          </h1>
          <p className='text-sm tracking-wider'>
            Por favor llena todos los campos.{' '}
          </p>
        </div>

        <div className='grid gap-6'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='grid gap-2'>
              <div className='grid gap-1 py-2'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  {...register('email')}
                  className={cn('border-blueFPC-400', {
                    'focus-visible:ring-red-500': errors.email,
                  })}
                  placeholder='youremail@example.com'
                />
                {errors?.email && (
                  <p className='text-sm text-red-500'>{errors.email.message}</p>
                )}
              </div>
              <div className='grid gap-2 justify-around grid-cols-2'>
                <div className='grid gap-1 py-2'>
                  <Label htmlFor='firstName'>Primer Nombre</Label>
                  <Input
                    {...register('firstName')}
                    className={cn('border-blueFPC-400', {
                      'focus-visible:ring-red-500': errors.firstName,
                    })}
                    placeholder='Andrés'
                  />
                  {errors?.firstName && (
                    <p className='text-sm text-red-500'>
                      {errors.firstName.message}
                    </p>
                  )}
                </div>
                <div className='grid gap-1 py-2'>
                  <Label htmlFor='secondName'>Segundo Nombre</Label>
                  <Input
                    {...register('secondName')}
                    className={cn('border-blueFPC-400', {
                      'focus-visible:ring-red-500': errors.secondName,
                    })}
                    placeholder='El Lagrimón'
                  />
                  {errors?.secondName && (
                    <p className='text-sm text-red-500'>
                      {errors.secondName.message}
                    </p>
                  )}
                </div>
              </div>
              <div className='grid gap-2 justify-around grid-cols-2'>
                <div className='grid gap-1 py-2'>
                  <Label htmlFor='firstLastname'>Primer Apellido</Label>
                  <Input
                    {...register('firstLastname')}
                    className={cn('border-blueFPC-400', {
                      'focus-visible:ring-red-500': errors.firstLastname,
                    })}
                    placeholder='Pacheco'
                  />
                  {errors?.firstLastname && (
                    <p className='text-sm text-red-500'>
                      {errors.firstLastname.message}
                    </p>
                  )}
                </div>
                <div className='grid gap-1 py-2'>
                  <Label htmlFor='secondLastname'>Segundo Apellido</Label>
                  <Input
                    {...register('secondLastname')}
                    className={cn('border-blueFPC-400', {
                      'focus-visible:ring-red-500': errors.secondLastname,
                    })}
                    placeholder='Naranjo'
                  />
                  {errors?.secondLastname && (
                    <p className='text-sm text-red-500'>
                      {errors.secondLastname.message}
                    </p>
                  )}
                </div>
              </div>
              <div className='grid gap-1 py-2'>
                <Label htmlFor='expirationMonth'>Punto Parqueadero</Label>
                <select
                  className='flex h-10 w-full items-center justify-between rounded-md border border-blueFPC-400 bg-background px-3 py-2 ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 text-center  tracking-widest p-3'
                  {...register('parking')}
                >
                  {parkingOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors?.parking && (
                  <p className='text-sm text-red-500'>
                    {errors.parking.message}
                  </p>
                )}
              </div>
              <PrimaryButton text={'CREAR FUNCIONARIO'} isLoading={isLoading} />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Page
