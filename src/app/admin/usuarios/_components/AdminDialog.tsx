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
import { useEffect, useState } from 'react'
import { useUser } from '@/services/useUser'
import {
  TCreateAdminFromManagerValidator,
  CreateAdminFromManagerValidator,
} from '@/lib/validators/user-validators'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import Separator from '@/components/Separator'
import { Toggle } from '@/components/ui/toggle'
import { Check, X } from 'lucide-react'

export function AdminDialog({ admin }: { admin?: UserInterface }) {
  const router = useRouter()
  const [accountActive, setAccountActive] = useState(
    admin?.accountActive ? true : false
  )
  const [accountBlocked, setAccountBlocked] = useState(
    admin?.accountBlocked ? true : false
  )
  const { updateUser, isLoading, getUsers } = useUser()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<TCreateAdminFromManagerValidator>({
    resolver: zodResolver(CreateAdminFromManagerValidator),
  })
  const onSubmit = async ({
    email,
    firstName,
    secondName,
    firstLastname,
    secondLastname,
    accountActive,
    accountBlocked,
    loginAttempts,
  }: TCreateAdminFromManagerValidator) => {
    const adminData = {
      email,
      firstName,
      secondName,
      firstLastname,
      secondLastname,
      accountActive,
      accountBlocked,
      loginAttempts,
      roleList: ['ADMINISTRADOR'],
    } as UserInterface
    // const res = admin
    //   ? await updateUser(adminData)
    //   : await createAdmin(adminData)

    console.log(adminData)

    // const res = await updateUser(adminData)
    // if (res?.status === 200) {
    //   router.push('/admin/usuarios')
    //   router.refresh()
    // }
  }
  useEffect(() => {
    if (admin) {
      setValue('email', admin.email)
      setValue('firstName', admin.firstName)
      if (admin.secondName) setValue('secondName', admin.secondName)
      setValue('firstLastname', admin.firstLastname)
      setValue('secondLastname', admin.secondLastname)
      setValue('accountActive', admin.accountActive!)
      setValue('accountBlocked', admin.accountBlocked!)
      setValue('loginAttempts', admin.loginAttempts!)
    } else {
      setValue('loginAttempts', 0)
    }
  }, [])

  return (
    <Dialog>
      <DialogTrigger asChild>
        {!admin ? (
          <div className='inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 px-4 py-2 absolute top-0 z-10 tracking-widest border hover:bg-yellowFPC-200  dark:hover:bg-yellowFPC-400 dark:hover:text-black hover:border-primary right-2 md:right-0 cursor-pointer'>
            CREAR ADMINISTRADOR
          </div>
        ) : (
          <div className='relative flex cursor-pointer select-none items-center rounded-sm py-1.5 text-sm outline-none transition-colors hover:bg-muted'>
            <p>Editar administrador</p>
          </div>
        )}
      </DialogTrigger>
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader>
          <DialogTitle>
            <p className='tracking-widest'>
              {!admin ? 'CREAR ADMINISTRADOR' : 'EDITAR ADMINISTRADOR'}
            </p>
          </DialogTitle>
          <DialogDescription>
            {!admin
              ? 'Aquí puedes crear un nuevo administrador en nuestro sistema.'
              : 'Aquí puedes editar los datos del administrador.'}
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

            <Separator
              lineColor='border-yellowFPC-400'
              background='bg-background'
            />

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
                  setValue('accountActive', !getValues('accountActive'))
                  setAccountActive(!accountActive)
                }}
                defaultPressed={accountActive}
                className='border space-x-2'
              >
                {accountActive ? <Check size={19} /> : <X size={19} />}
                <p>CUENTA ACTIVA</p>
              </Toggle>
            </div>
            <div className='grid gap-1 py-2'>
              <Toggle
                aria-label='Toggle-accountBlocked'
                onPressedChange={() => {
                  setValue(
                    'accountBlocked',
                    accountBlocked ? accountBlocked : false
                  )
                  setAccountBlocked(!accountBlocked)
                }}
                defaultPressed={accountBlocked}
                className='border space-x-2'
              >
                {accountBlocked ? <Check size={19} /> : <X size={19} />}
                <p className='tracking-widest'>CUENTA BLOQUEADA</p>
              </Toggle>
            </div>

            <PrimaryButton
              text={'CONFIRMAR DATOS DE ADMIN'}
              isLoading={isLoading}
            />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
