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
import { useEffect } from 'react'
import { useUser } from '@/services/useUser'
import {
  EditPersonalInfoValidator,
  TEditPersonalInfoValidator,
} from '@/lib/validators/user-validators'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'

export function EditPersonalInfoUserDialog({ user }: { user: UserInterface }) {
  const router = useRouter()
  const { updateUser, isLoading } = useUser()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<TEditPersonalInfoValidator>({
    resolver: zodResolver(EditPersonalInfoValidator),
  })

  // TODO: terminar el envio de datos
  const onSubmit = async ({
    firstName,
    secondName,
    firstLastname,
    secondLastname,
  }: TEditPersonalInfoValidator) => {
    const userData = {
      email: user.email,
      firstName,
      secondName,
      firstLastname,
      secondLastname,
      roleList: ['USUARIO'],
    } as UserInterface
    // await updatePersonalInfoUser(userData)
    console.log(userData)
    router.refresh()
  }

  useEffect(() => {    
    setValue('firstName', user.firstName)
    if (user?.secondName) setValue('secondName', user.secondName)
    setValue('firstLastname', user.firstLastname)
    setValue('secondLastname', user.secondLastname)
  }, [])
  return (
    <Dialog>
      <DialogTrigger asChild>
        <PrimaryButton text='EDITAR DATOS PERSONALES' isLoading={isLoading} />
      </DialogTrigger>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>
            <p className='tracking-widest'>EDITAR DATOS PERSONALES</p>
          </DialogTitle>
          <DialogDescription>
            Aquí puedes editar todos tus datos personales.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col space-2'>
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
            <PrimaryButton
              text={'CONFIRMAR DATOS PERSONALES'}
              isLoading={isLoading}
            />
            {/* <DialogFooter className='sm:justify-start'>
              <DialogClose asChild>
                <PrimaryButton
                  text={'CONFIRMAR DATOS PERSONALES'}
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
