'use client'

import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  TAuthCredentialsValidator,
  AuthCredentialsValidator,
} from '@/lib/validators/account-credentials-validator'
import { useRouter, useSearchParams } from 'next/navigation'
import { Icons } from '@/components/Icons'
import { useState } from 'react'
import FloatingButton from '@/components/ButtonsCustom/FloatingButton'
import Separator from '@/components/Separator'
import { ArrowRight } from 'lucide-react'
import PrimaryButton from '@/components/ButtonsCustom/PrimaryButton'
import SecondaryButton from '@/components/ButtonsCustom/SecondaryButton'
import { toast } from 'sonner'
import { signIn } from 'next-auth/react'

const Page = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const isGerente = searchParams.get('as') === 'gerente'
  const isFuncionario = searchParams.get('as') === 'funcionario'
  const origin = searchParams.get('origin')
  const [isLoading, setIsLoading] = useState(false)

  const continueAsFuncionario = () => {
    router.push('?as=funcionario')
  }

  const continueAsGerente = () => {
    router.push('?as=gerente')
  }

  const continueAsUsuario = () => {
    router.push('/sign-in', undefined) // undefined is to clear the url parameters
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthCredentialsValidator>({
    resolver: zodResolver(AuthCredentialsValidator),
  })

  const onSubmit = async ({ email, password }: TAuthCredentialsValidator) => {
    try {
      setIsLoading(true)

      // usamos metodo de next-auth para inicio de sesioon
      const res = await signIn('credentials', {
        email: email,
        password: password,
        redirect: false,
      })

      setIsLoading(false)

      if (res?.error) {
        toast('Credenciales Invalidas!', {
          description: 'Revisa tu usuario y contraseña.',
        })
      } else {
        toast('Has iniciado sesión con exito!', {
          description:
            'Ahora puedes hacer uso de las funciones de nuestro sistema!',
        })

        router.refresh()
        if (origin) {
          router.push(`/${origin}`)
          return
        }

        if (isFuncionario || isFuncionario) {
          router.push('/admin')
          return
        }

        router.push('/')
        router.refresh()
      }
      setIsLoading(false)
    } catch (error) {
      console.log('Ocurrió un error al intentar iniciar sesión: ', error)

      toast('Ha ocurrido un error al intentar iniciar sesión!', {
        description: 'Por favor intentalo de nuevo.',
      })
    }
  }

  return (
    <div className='container relative flex flex-col items-center justify-center lg:px-0'>
      <FloatingButton text='REGISTRARSE' href='./sign-up' direction='right' />

      <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px] border border-input p-5 bg-background-contrast'>
        <div className='flex flex-col items-center space-y-2 text-center'>
          <div className='relative mb-4 h-32 w-32 text-muted-foreground'>
            <Icons.logo className='text-yellow-300' />
          </div>
          <h1 className='text-2xl tracking-widest p-3'>
            INGRESA A TU CUENTA {isGerente ? 'DE GERENTE ' : ''}{' '}
            {isFuncionario ? 'DE FUNCIONARIO ' : ''}
          </h1>
          <p className='text-sm tracking-wider'>
            Por favor ingresa tu e-mail y tu contraseña.
          </p>
        </div>

        <div className='grid gap-6'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='grid gap-2'>
              <div className='grid gap-1 py-2'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  // this handle the information of the input with the scheme we configured it
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
              <div className='grid gap-1 py-2'>
                <Label htmlFor='password'>Contraseña</Label>
                <Input
                  {...register('password')}
                  type='password'
                  className={cn({
                    'focus-visible:ring-red-500': errors.password,
                  })}
                  placeholder='TuContraseña'
                />
                {errors?.password && (
                  <p className='text-sm text-red-500'>
                    {errors.password.message}
                  </p>
                )}
              </div>

              <PrimaryButton text={'INGRESAR'} isLoading={isLoading} />
            </div>
            {!isFuncionario && !isGerente && (
              <div className='flex justify-center'>
                <Link
                  className={buttonVariants({
                    variant: 'link',
                    className: 'gap-1.5',
                  })}
                  href='/sign-up'
                >
                  ¿No tienes una cuenta? Registrate!
                  <ArrowRight className='h-4 w-4' />
                </Link>
              </div>
            )}
          </form>

          <Separator />

          {isGerente && (
            <div className='w-full flex flex-col gap-2'>
              <SecondaryButton
                onClick={continueAsUsuario}
                isLoading={isLoading}
                text='CONTINUAR COMO USUARIO'
              />
              <SecondaryButton
                onClick={continueAsFuncionario}
                isLoading={isLoading}
                text='CONTINUAR COMO FUNCIONARIO'
              />
            </div>
          )}

          {isFuncionario && (
            <div className='w-full flex flex-col gap-2'>
              <SecondaryButton
                onClick={continueAsUsuario}
                isLoading={isLoading}
                text='CONTINUAR COMO USUARIO'
              />
              <SecondaryButton
                onClick={continueAsGerente}
                isLoading={isLoading}
                text='CONTINUAR COMO GERENTE'
              />
            </div>
          )}

          {!isFuncionario && !isGerente && (
            <div className='w-full flex flex-col gap-2'>
              <SecondaryButton
                onClick={continueAsFuncionario}
                isLoading={isLoading}
                text='CONTINUAR COMO FUNCIONARIO'
              />
              <SecondaryButton
                onClick={continueAsGerente}
                isLoading={isLoading}
                text='CONTINUAR COMO GERENTE'
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Page
