'use client'
import {
  Dialog,
  DialogClose,
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
import { useEffect } from 'react'
import { useUser } from '@/services/useUser'
import {
  EditCreditCardValidator,
  TEditCreditCardValidator,
} from '@/lib/validators/user-validators'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { cn, MONTH_OPTIONS, YEAR_OPTIONS } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { CreditCard } from '@/lib/interfaces/creditCard.model'
import { AxiosResponse } from 'axios'

export function EditCreditCardUserDialog({ user }: { user: UserInterface }) {
  const router = useRouter()
  const { updateUser, isLoading } = useUser()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<TEditCreditCardValidator>({
    resolver: zodResolver(EditCreditCardValidator),
  })

  // TODO: terminar el envio de datos
  const onSubmit = async ({
    cardNumber,
    expirationMonth,
    expirationYear,
    cvv,
  }: TEditCreditCardValidator) => {
    const creditCardData = {
      cardNumber: cardNumber + '',
      expirationDate: expirationMonth + '/' + expirationYear,
      cvv: cvv + '',
    } as CreditCard

    const userData = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      secondName: user.secondName,
      firstLastname: user.firstLastname,
      secondLastname: user.secondLastname,
      accountBlocked: user.accountBlocked,
      accountActive: user.accountActive,
      loginAttempts: user.loginAttempts,
      roleList: ['USUARIO'],
      creditCard: creditCardData,
    } as UserInterface
    const res = (await updateUser(userData)) as AxiosResponse
    if (res.status === 200) {
      user.creditCard = creditCardData
    }
  }

  useEffect(() => {
    if (user.creditCard) {
      const [expirationMonth, expirationYear] =
        user.creditCard?.expirationDate.split('/')
      setValue('cardNumber', parseInt(user.creditCard?.cardNumber))
      setValue('expirationMonth', expirationMonth)
      setValue('expirationYear', expirationYear)
      setValue('cvv', parseInt(user.creditCard?.cvv))
    }
  }, [])
  return (
    <Dialog>
      <DialogTrigger asChild>
        <PrimaryButton text='EDITAR TARJETA DE CRÉDITO' isLoading={isLoading} />
      </DialogTrigger>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>
            <p className='tracking-widest'>EDITAR TARJETA DE CRÉDITO</p>
          </DialogTitle>
          <DialogDescription>
            Aquí puedes editar todos tus datos personales.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col space-2'>
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
            {/* <DialogClose asChild> */}
            <PrimaryButton
              text={'CONFIRMAR DATOS PERSONALES'}
              isLoading={isLoading}
            />
            {/* </DialogClose> */}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
