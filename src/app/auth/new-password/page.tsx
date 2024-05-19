'use client'
import { Icons } from '@/components/Icons'
import FloatingButton from '@/components/CustomButtons/FloatingButton'
import {
  TChangePasswordCredentialsValidator,
  ChangePasswordCredentialsValidator,
} from '@/lib/validators/account-credentials-validator'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { useUser } from '@/services/useUser'
import Separator from '@/components/Separator'
import PrimaryButton from '@/components/CustomButtons/PrimaryButton'

export default function Page() {
  const { isLoading, updatePasswordUser } = useUser()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TChangePasswordCredentialsValidator>({
    resolver: zodResolver(ChangePasswordCredentialsValidator),
  })

  const onSubmit = async ({
    email,
    oldPassword,
    newPassword,
    confirmPassword,
  }: TChangePasswordCredentialsValidator) => {
    await updatePasswordUser(email, oldPassword, newPassword, confirmPassword)
  }

  return (
    <div className=' relative flex flex-col items-center gap-2 m-6 sm:m-10'>
      <div className='hidden sm:block'>
        <FloatingButton text='PANTALLA DE INICIO' href='/' direction='left' />
      </div>

      <div className='mx-auto flex w-full flex-col justify-center sm:space-y-6 space-y-3 sm:w-[450px] border border-yellowFPC-400 p-5 bg-background-contrast'>
        <div className='flex flex-col items-center text-center'>
          <div className='relative h-20 w-20 sm:h-32 sm:w-32 text-muted-foreground'>
            <Icons.logo className='text-yellowFPC-400' />
          </div>
          <h1 className='sm:text-2xl text-xl tracking-widest sm:p-3'>¡BIENVENIDO!</h1>
          <p className='sm:text-sm text-xs tracking-wider'>
            <span className='font-medium'>
              Te damos una gran bienvenida a la familia Four Parks.
            </span>{' '}
            Antes de empezar a hacer uso de los servicios de{' '}
            <span className='font-medium'>Four Parks</span>, te invitamos a
            establecer tu nueva contraseña.
          </p>
        </div>

        <div className='grid gap-6'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='grid gap-2'>
              <div className='grid gap-1 py-2'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  {...register('email')}
                  className={cn('border-yellowFPC-400', {
                    'focus-visible:ring-red-500': errors.email,
                  })}
                  placeholder='youremail@example.com'
                />
                {errors?.email && (
                  <p className='text-sm text-red-500'>{errors.email.message}</p>
                )}
              </div>
              <div className='grid gap-1 py-2'>
                <Label htmlFor='oldPassword'>Anterior Contraseña</Label>
                <Input
                  {...register('oldPassword')}
                  type='password'
                  className={cn('border-yellowFPC-400', {
                    'focus-visible:ring-red-500': errors.oldPassword,
                  })}
                  placeholder='•••••••'
                />
                {errors?.oldPassword && (
                  <p className='text-sm text-red-500'>
                    {errors.oldPassword.message}
                  </p>
                )}
              </div>

              <Separator lineColor='border-yellowFPC-400' />

              <div className='grid gap-1 py-2'>
                <Label htmlFor='newPassword'>Nueva Contraseña</Label>
                <Input
                  {...register('newPassword')}
                  type='password'
                  className={cn('border-yellowFPC-400', {
                    'focus-visible:ring-red-500': errors.newPassword,
                  })}
                  placeholder='•••••••'
                />
                {errors?.newPassword && (
                  <p className='text-sm text-red-500'>
                    {errors.newPassword.message}
                  </p>
                )}
              </div>
              <div className='grid gap-1 py-2'>
                <Label htmlFor='confirmPassword'>Confirmar Contraseña</Label>
                <Input
                  {...register('confirmPassword')}
                  type='password'
                  className={cn('border-yellowFPC-400', {
                    'focus-visible:ring-red-500': errors.confirmPassword,
                  })}
                  placeholder='•••••••'
                />
                {errors?.confirmPassword && (
                  <p className='text-sm text-red-500'>
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <PrimaryButton
                text={'ACTUALIZAR CONTRASEÑA'}
                isLoading={isLoading}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
