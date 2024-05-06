'use client'
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import PrimaryButton from '@/components/CustomButtons/PrimaryButton'
import { UserInterface } from '@/lib/interfaces/user.interface'
import { useEffect, useState } from 'react'
import { useUser } from '@/services/useUser'
import {
  EditUserFromAdminValidator,
  TEditUserFromAdminValidator,
} from '@/lib/validators/user-validators'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import Separator from '@/components/Separator'
import { Toggle } from '@/components/ui/toggle'
import { Check, X } from 'lucide-react'

export function EditUserDialog({ user }: { user: UserInterface }) {
  const router = useRouter()
  const [accountActiveState, setAccountActiveState] = useState(user.accountActive)
  const [accountBlockedState, setAccountBlockedState] = useState(user.accountBlocked)
  const { updateUser, isLoading } = useUser()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<TEditUserFromAdminValidator>({
    resolver: zodResolver(EditUserFromAdminValidator),
  })

  // TODO: terminar el envio de datos
  const onSubmit = async ({
    firstName,
    secondName,
    firstLastname,
    secondLastname,
    accountActive,
    accountBlocked,
    loginAttempts,
  }: TEditUserFromAdminValidator) => {
    const userData = {
      id: user.id,
      email: user.email,
      firstName,
      secondName,
      firstLastname,
      secondLastname,
      accountActive: accountActiveState,
      accountBlocked: accountBlockedState,
      loginAttempts,
      roleList: ['USUARIO'],
      creditCard: user.creditCard,
    } as UserInterface
    const res = await updateUser(userData)
    if (res?.status === 200) {
      router.push('/admin/usuarios')
      router.refresh()
    }
  }

  useEffect(() => {
    setValue('firstName', user.firstName)
    if (user?.secondName) setValue('secondName', user.secondName)
    setValue('firstLastname', user.firstLastname)
    setValue('secondLastname', user.secondLastname)
    setValue('accountActive', user.accountActive!)
    setValue('accountBlocked', user.accountBlocked!)
    setValue('loginAttempts', user.loginAttempts!)
  }, [])
  return (
    <>
      <DialogTrigger asChild>
        <span> Editar usuario</span>
      </DialogTrigger>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>
            <p className='tracking-widest'>EDITAR USUARIO</p>
          </DialogTitle>
          <DialogDescription>
            Aquí puedes editar la información del usuario.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col space-2'>
            <div className='grid gap-2 justify-around grid-cols-2'>
              <div className='grid gap-1 py-2'>
                <Label htmlFor='firstName'>Primer Nombre</Label>
                <Input
                  {...register('firstName')}
                  className={cn('border-yellowFPC-400', {
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
                  className={cn('border-yellowFPC-400', {
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
                  className={cn('border-yellowFPC-400', {
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
                  className={cn('border-yellowFPC-400', {
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

            <Separator lineColor='border-yellowFPC-400' />

            <div className='grid gap-1 py-2'>
              <Label htmlFor='loginAttempts'>Intentos de Logueo</Label>
              <Input
                {...register('loginAttempts', { valueAsNumber: true })}
                className={cn('border-yellowFPC-400', {
                  'focus-visible:ring-red-500': errors.loginAttempts,
                })}
                placeholder='0'
              />
              {errors?.loginAttempts && (
                <p className='text-sm text-red-500'>
                  {errors.loginAttempts.message}
                </p>
              )}
            </div>

            <div className='grid gap-1 py-2'>
              <Toggle
                aria-label='Toggle-accountActive'
                onPressedChange={() => {
                  setValue(
                    'accountActive',
                    user.accountActive ? user.accountActive : false
                  )
                  setAccountActiveState(!accountActiveState)
                }}
                defaultPressed={accountActiveState}
                className='border space-x-2'
              >
                {accountActiveState ? <Check size={19} /> : <X size={19} />}
                <p>CUENTA ACTIVA</p>
              </Toggle>
            </div>
            <div className='grid gap-1 py-2'>
              <Toggle
                aria-label='Toggle-accountBlocked'
                onPressedChange={() => {
                  setValue(
                    'accountBlocked',
                    accountBlockedState ? accountBlockedState : false
                  )
                  setAccountBlockedState(!accountBlockedState)
                }}
                defaultPressed={accountBlockedState}
                className='border space-x-2'
              >
                {accountBlockedState ? <Check size={19} /> : <X size={19} />}
                <p className='tracking-widest'>CUENTA BLOQUEADA</p>
              </Toggle>
            </div>

            <PrimaryButton
              text={'CONFIRMAR DATOS PERSONALES'}
              isLoading={isLoading}
            />
          </div>
        </form>
      </DialogContent>
    </>
  )
}
