'use client'

import { buttonVariants } from '@/components/ui/button'
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
import FloatingButton from '@/components/CustomButtons/FloatingButton'
import { ArrowRight } from 'lucide-react'
import PrimaryButton from '@/components/CustomButtons/PrimaryButton'
import { useToast } from '@/components/ui/use-toast'
import { signIn } from 'next-auth/react'
import { useUser } from '@/services/useUser'
import Separator from '@/components/Separator'

const Page = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { isLoading, setIsLoading } = useUser()
  const origin = searchParams.get('callbackUrl')
  const { toast } = useToast()

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

      console.log(res);
      
      
      if (res?.status === 401 ) {
        toast( {
          variant: 'destructive',
          title: 'Ha ocurrido un error al intentar iniciar sesión! Por favor intentalo de nuevo.',
          description: 'Revisa tu usuario y contraseña.',
        })
      } else {
        toast({
          title: 'Has iniciado sesión con exito!',
          description:
            'Ahora puedes hacer uso de las funciones de nuestro sistema!',
        })

        // callback a url de origen despues de loguearse correctamente
        if (origin) {
          const url = new URL(origin)
          const path = url.pathname
          return router.push(`${path}`)
        }

        router.push('/')
        router.refresh()
      }
      setIsLoading(false)
    } catch (error: any) {
      console.log('Ocurrió un error al intentar iniciar sesión: ', error)
      toast({
        variant: 'destructive',
        title: 'Ha ocurrido un error al intentar iniciar sesión! Por favor intentalo de nuevo.',
        description: error.response.data,
      })
    }
  }

  return (
    <div className='relative flex flex-col items-center justify-center lg:px-0 m-10'>
      <FloatingButton text='REGISTRARSE' href='./sign-up' direction='right' />

      <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px] border border-primary p-5 bg-background-contrast'>
        <div className='flex flex-col items-center text-center'>
          <div className='relative h-32 w-32 text-muted-foreground'>
            <Icons.logo className='text-yellow-300' />
          </div>
          <h1 className='text-2xl tracking-widest p-3'>INGRESA A TU CUENTA</h1>
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
                  {...register('email')}
                  className={cn('border-primary', {
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
                  className={cn('border-primary', {
                    'focus-visible:ring-red-500': errors.password,
                  })}
                  placeholder='•••••••'
                />
                {errors?.password && (
                  <p className='text-sm text-red-500'>
                    {errors.password.message}
                  </p>
                )}
              </div>

              <PrimaryButton text={'INGRESAR'} isLoading={isLoading} />

              <p className='text-muted-foreground text-center pt-1'>
                Al continuar, estarás aceptando nuestros{' '}
                <span className='underline'>Términos de Servicio</span> y{' '}
                <span className='underline'>Política de Privacidad.</span>
              </p>

              <Separator />
            </div>

            <div className='flex justify-center'>
              <Link
                className={buttonVariants({
                  variant: 'link',
                  className: 'gap-1.5',
                })}
                href='/auth/sign-up'
              >
                ¿No tienes una cuenta? Registrate!
                <ArrowRight className='h-4 w-4' />
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Page
