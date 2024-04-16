'use client'

import { buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowLeft } from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  TSignUpCredentialsValidator,
  SignUpCredentialsValidator,
} from '@/lib/validators/account-credentials-validator'
import { useRouter, useSearchParams } from 'next/navigation'
import { Icons } from '@/components/Icons'
import { useState } from 'react'
import FloatingButton from '@/components/ButtonsCustom/FloatingButton'
import Separator from '@/components/Separator'
import { toast } from 'sonner'
import PrimaryButton from '@/components/ButtonsCustom/PrimaryButton'
import { useUser } from '@/services/useUser'
import { User } from '@/lib/interfaces/user.model'

interface MonthOption {
  value: number
  label: string // Optional label for accessibility
}

const monthOptions: MonthOption[] = Array.from({ length: 12 }, (_, i) => ({
  value: i + 1, // Adjust for 1-based indexing
  label: (i + 1).toString(), // Optional label for clarity
}))

interface YearOption {
  value: number
  label: string // Optional label for accessibility
}

const YearOptions: YearOption[] = Array.from({ length: 30 }, (_, i) => ({
  value: i + 2024,
  label: (i + 2024).toString(), // Optional label for clarity
}))

const Page = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const origin = searchParams.get('origin')
  const { isLoading, getOneUserByEmail, createUser } = useUser()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignUpCredentialsValidator>({
    resolver: zodResolver(SignUpCredentialsValidator),
  })

  const onSubmit = async ({
    email,
    firstName,
    secondName,
    firstSurname,
    secondSurname,
    nombreTarjeta,
    numeroTarjeta,
    mesExpiracion,
    añoExpiracion,
    CVC,
  }: TSignUpCredentialsValidator) => {
    try {
      // Checamos si ya existe el usuario
      const userFound = await getOneUserByEmail(email)
      if (userFound) {
        toast('Ya existe un usuario con este e-mail!', {
          description: 'Intenta con otro email',
        })
        return
      }

      // TODO: Tarjeta de credito parte

      const userData = {
        email: email,
        firstName: firstName,
        secondName: secondName,
        firstSurname: firstSurname,
        secondSurname: secondSurname,
        role: 'USUARIO',
      } as User

      await createUser(userData)

      router.push('/')

      toast('Te has registrado con exito!', {
        description: `Revisa tu correo! Te hemos enviado tu contraseña a ${email}. `,
      })
    } catch (error) {
      toast('Ha ocurrido un error al intentar registrar usuario!', {
        description: 'Por favor intentalo de nuevo.',
      })
    }
  }

  return (
    <div className='container relative flex flex-col items-center justify-center lg:px-0 '>
      <FloatingButton text='INGRESAR' href='./sign-in' direction='left' />

      <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px] border border-input p-5 bg-background-contrast'>
        <div className='flex flex-col items-center space-y-2 text-center'>
          <div className='relative mb-4 h-32 w-32 text-muted-foreground'>
            <Icons.logo className='text-yellow-300' />
          </div>
          <h1 className='text-2xl tracking-widest p-3'>REGISTARSE</h1>
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
                  className={cn({
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
                    className={cn({
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
                    className={cn({
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
                  <Label htmlFor='firstSurname'>Primer Apellido</Label>
                  <Input
                    {...register('firstSurname')}
                    className={cn({
                      'focus-visible:ring-red-500': errors.firstSurname,
                    })}
                    placeholder='Pacheco'
                  />
                  {errors?.firstSurname && (
                    <p className='text-sm text-red-500'>
                      {errors.firstSurname.message}
                    </p>
                  )}
                </div>
                <div className='grid gap-1 py-2'>
                  <Label htmlFor='secondSurname'>Segundo Apellido</Label>
                  <Input
                    {...register('secondSurname')}
                    className={cn({
                      'focus-visible:ring-red-500': errors.secondSurname,
                    })}
                    placeholder='Naranjo'
                  />
                  {errors?.secondSurname && (
                    <p className='text-sm text-red-500'>
                      {errors.secondSurname.message}
                    </p>
                  )}
                </div>
              </div>

              <Separator />

              <div className='grid gap-1 py-2'>
                <Label htmlFor='nombreTarjeta'>Nombre Tarjeta</Label>
                <Input
                  {...register('nombreTarjeta')}
                  className={cn({
                    'focus-visible:ring-red-500': errors.nombreTarjeta,
                  })}
                  placeholder='Mi Tarjeta'
                />
                {errors?.nombreTarjeta && (
                  <p className='text-sm text-red-500'>
                    {errors.nombreTarjeta.message}
                  </p>
                )}
              </div>
              <div className='grid gap-1 py-2'>
                <Label htmlFor='numeroTarjeta'>Número Tarjeta</Label>
                <Input
                  {...register('numeroTarjeta', { valueAsNumber: true })}
                  className={cn({
                    'focus-visible:ring-red-500': errors.numeroTarjeta,
                  })}
                  placeholder='4242 4242 4242 4242'
                />
                {errors?.numeroTarjeta && (
                  <p className='text-sm text-red-500'>
                    {errors.numeroTarjeta.message}
                  </p>
                )}
              </div>

              <div className='grid gap-2 justify-around grid-cols-3'>
                <div className='grid gap-1 py-2'>
                  <Label htmlFor='mesExpiracion'>Mes Expiración</Label>
                  <select
                    className='flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 text-center  tracking-widest p-3'
                    {...register('mesExpiracion')}
                  >
                    {monthOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {errors?.mesExpiracion && (
                    <p className='text-sm text-red-500'>
                      {errors.mesExpiracion.message}
                    </p>
                  )}
                </div>
                <div className='grid gap-1 py-2'>
                  <Label htmlFor='añoExpiracion'>Año Expiración</Label>
                  <select
                    className='flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 text-center  tracking-widest p-3'
                    {...register('añoExpiracion')}
                  >
                    {YearOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {errors?.añoExpiracion && (
                    <p className='text-sm text-red-500'>
                      {errors.añoExpiracion.message}
                    </p>
                  )}
                </div>

                <div className='grid gap-1 py-2'>
                  <Label htmlFor='CVC'>CVC</Label>
                  <Input
                    {...register('CVC', { valueAsNumber: true })}
                    className={cn({
                      'focus-visible:ring-red-500': errors.CVC,
                    })}
                    placeholder='123'
                  />
                  {errors?.CVC && (
                    <p className='text-sm text-red-500'>{errors.CVC.message}</p>
                  )}
                </div>
              </div>

              <PrimaryButton text={'REGISTRARSE'} isLoading={isLoading} />
            </div>

            <div className='flex justify-center'>
              <Link
                className={buttonVariants({
                  variant: 'link',
                  className: 'gap-1.5',
                })}
                href='/sign-in'
              >
                <ArrowLeft className='h-4 w-4' />
                ¿Ya tienes una cuenta? Ingresa!
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Page
