'use client'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import PrimaryButton from '@/components/CustomButtons/PrimaryButton'
import { UserInterface } from '@/lib/interfaces/user.interface'
import { useUser } from '@/services/useUser'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import {
  ChangePasswordCredentialsValidator,
  TChangePasswordCredentialsValidator,
} from '@/lib/validators/account-credentials-validator'
import Separator from '@/components/Separator'
import { signOut } from 'next-auth/react'
import { useEffect } from 'react'

export function EditPasswordUserDialog({ user }: { user: UserInterface }) {
  const router = useRouter()
  const { updatePasswordUser, isLoading } = useUser()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<TChangePasswordCredentialsValidator>({
    resolver: zodResolver(ChangePasswordCredentialsValidator),
  })

  // TODO: terminar el envio de datos
  const onSubmit = async ({
    email,
    oldPassword,
    newPassword,
    confirmPassword,
  }: TChangePasswordCredentialsValidator) => {
    console.log('gokasdf')

    await updatePasswordUser(
      email,
      oldPassword,
      newPassword,
      confirmPassword
    )
    // if() signOut()
  }

  useEffect(() => {
    setValue('email', user.email)
  }, [])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <PrimaryButton text='ACTUALIZAR CONTRASEÑA' isLoading={isLoading} />
      </DialogTrigger>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>
            <p className='tracking-widest'>ACTUALIZAR CONTRASEÑA</p>
          </DialogTitle>
          <DialogDescription>
            Aquí puedes actualizar tu contraseña.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col space-2'>
            {/* esto no se ve */}
            <div className='grid gap-1 py-2 fixed top-0 left-0 w-0 h-0 bg-transparent pointer-events-none invisible'>
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
              <Label htmlFor='oldPassword'>Anterior Contraseña</Label>
              <Input
                {...register('oldPassword')}
                type='password'
                className={cn('border-primary', {
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

            <Separator />

            <div className='grid gap-1 py-2'>
              <Label htmlFor='newPassword'>Nueva Contraseña</Label>
              <Input
                {...register('newPassword')}
                type='password'
                className={cn('border-primary', {
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
                className={cn('border-primary', {
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
              text={'CONFIRMAR CONTRASEÑAS'}
              isLoading={isLoading}
            />
            {/* <DialogFooter className='sm:justify-start'>
              <DialogClose asChild>
                <PrimaryButton
                  text={'CONFIRMAR CONTRASEÑAS'}
                  isLoading={isLoading}
                />
              </DialogClose>
            </DialogFooter> */}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
