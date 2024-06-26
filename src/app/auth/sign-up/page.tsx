'use client'

import { buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowLeft } from 'lucide-react'
import { cn, MONTH_OPTIONS, YEAR_OPTIONS } from '@/lib/utils'
import Link from 'next/link'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  TSignUpCredentialsValidator,
  SignUpCredentialsValidator,
} from '@/lib/validators/account-credentials-validator'
import { useSearchParams } from 'next/navigation'
import { Icons } from '@/components/Icons'
import FloatingButton from '@/components/CustomButtons/FloatingButton'
import Separator from '@/components/Separator'
import PrimaryButton from '@/components/CustomButtons/PrimaryButton'
import { useUser } from '@/services/useUser'
import { UserInterface } from '@/lib/interfaces/user.interface'
import { useEffect } from 'react'
import { CreditCard } from '@/lib/interfaces/creditCard.interface'

const Page = () => {
  const searchParams = useSearchParams()
  const { isLoading, createUser } = useUser()
  const email = searchParams.get('email')

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<TSignUpCredentialsValidator>({
    resolver: zodResolver(SignUpCredentialsValidator),
  })

  const onSubmit = async ({
    email,
    firstName,
    secondName,
    firstLastname,
    secondLastname,
    cardNumber,
    expirationMonth,
    expirationYear,
    cvv,
  }: TSignUpCredentialsValidator) => {
    const creditCardData = {
      cardNumber: cardNumber + '',
      expirationDate: expirationMonth + '/' + expirationYear,
      cvv: cvv + '',
    } as CreditCard

    const userData = {
      email,
      firstName,
      secondName,
      firstLastname,
      secondLastname,
      creditCard: creditCardData,
      roleList: ['USUARIO'],
    } as UserInterface
    await createUser(userData)
  }

  useEffect(() => {
    if (email) setValue('email', email)
  }, [email, setValue])

  return (
    <div className='relative flex flex-col items-center justify-center lg:px-0 m-6 sm:m-10'>
      <div className='hidden sm:block'>
        <FloatingButton text='INGRESAR' href='/auth/log-in' direction='left' />
      </div>
      <div className='mx-auto flex w-full flex-col justify-center sm:space-y-6 space-y-3 sm:w-[450px] border border-blueFPC-400 p-5 bg-background-contrast'>
        <div className='flex flex-col items-center text-center'>
          <div className='relative h-20 w-20 sm:h-32 sm:w-32 text-muted-foreground'>
            <Icons.logo className='text-blueFPC-400' />
          </div>
          <h1 className='sm:text-2xl text-xl tracking-widest sm:p-3'>
            REGISTRARSE
          </h1>
          <p className='sm:text-sm text-xs tracking-wider'>
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
              <Separator
                lineColor='border-blueFPC-400'
                coneColor='text-blueFPC-400'
              />
              <div className='grid gap-1 py-2'>
                <Label htmlFor='cardNumber'>Número Tarjeta</Label>
                <Input
                  {...register('cardNumber', { valueAsNumber: true })}
                  className={cn('border-blueFPC-400', {
                    'focus-visible:ring-red-500': errors.cardNumber,
                  })}
                  placeholder='4242 4242 4242 4242'
                />
                {errors?.cardNumber && (
                  <p className='text-sm text-red-500'>
                    {errors.cardNumber.message}
                  </p>
                )}
              </div>
              <div className='grid gap-2 justify-around grid-cols-3'>
                <div className='grid gap-1 py-2'>
                  <Label htmlFor='expirationMonth'>Mes Expiración</Label>
                  <select
                    className='flex h-10 w-full items-center justify-between rounded-md border border-blueFPC-400 bg-background px-3 py-2 ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 text-center  tracking-widest p-3'
                    {...register('expirationMonth')}
                  >
                    {MONTH_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {errors?.expirationMonth && (
                    <p className='text-sm text-red-500'>
                      {errors.expirationMonth.message}
                    </p>
                  )}
                </div>
                <div className='grid gap-1 py-2'>
                  <Label htmlFor='expirationYear'>Año Expiración</Label>
                  <select
                    className='flex h-10 w-full items-center justify-between rounded-md border border-blueFPC-400 bg-background px-3 py-2 ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 text-center  tracking-widest p-3'
                    {...register('expirationYear')}
                  >
                    {YEAR_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {errors?.expirationYear && (
                    <p className='text-sm text-red-500'>
                      {errors.expirationYear.message}
                    </p>
                  )}
                </div>

                <div className='grid gap-1 py-2'>
                  <Label htmlFor='cvv'>CVV</Label>
                  <Input
                    {...register('cvv', { valueAsNumber: true })}
                    className={cn('border-blueFPC-400', {
                      'focus-visible:ring-red-500': errors.cvv,
                    })}
                    placeholder='123'
                  />
                  {errors?.cvv && (
                    <p className='text-sm text-red-500'>{errors.cvv.message}</p>
                  )}
                </div>
              </div>
              <PrimaryButton text={'REGISTRARSE'} isLoading={isLoading} />{' '}
              <p className='text-muted-foreground text-center pt-1 text-sm sm:text-base'>
                Al continuar, estarás aceptando nuestros{' '}
                <span className='underline'>Términos de Servicio</span> y{' '}
                <span className='underline'>Política de Privacidad.</span>
              </p>
            </div>

            <Separator
              lineColor='border-blueFPC-400'
              coneColor='text-blueFPC-400'
            />
            <div className='flex justify-center'>
              <Link
                className={buttonVariants({
                  variant: 'link',
                  className: 'gap-1 sm:gap-1.5 text-sm sm:text-base',
                })}
                href='/auth/log-in'
              >
                <ArrowLeft className='h-4 w-4' />
                ¿Ya tienes una cuenta? ¡Ingresa!
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Page
