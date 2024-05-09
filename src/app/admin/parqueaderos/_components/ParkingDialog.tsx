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
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import Separator from '@/components/Separator'
import { Toggle } from '@/components/ui/toggle'
import { Check, X } from 'lucide-react'
import { ParkingInterface } from '@/lib/interfaces/parking.interface'
import { useParking } from '@/services/useParking'
import {
  ParkingValidator,
  TParkingValidator,
} from '@/lib/validators/parking-validators'

export function ParkingDialog({ parking }: { parking?: ParkingInterface }) {
  const router = useRouter()
  const [loyaltyState, setLoyaltyState] = useState<boolean>(
    parking ? parking.loyalty : false
  )
  const { createParking, updateParking, isLoading } = useParking()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<TParkingValidator>({
    resolver: zodResolver(ParkingValidator),
  })

  // TODO: terminar el envio de datos
  const onSubmit = async ({
    name,
    city,
    address,
    latitude,
    longitude,
    parkingType,
    hoursOpenTime,
    minutesOpenTime,
    hoursCloseTime,
    minutesCloseTime,
    totalSlots,
    loyalty,
  }: TParkingValidator) => {
    const parkingData = {
      id: parking && parking.id,
      name,
      location: {
        city: {
          name: city,
        },
        address,
        latitude,
        longitude,
      },
      parkingType: {
        type: parkingType,
      },

      // TODO: Revisar esto
      openingHours: {
        openTime: new Date(hoursOpenTime + ':' + minutesOpenTime),
        closeTime: new Date(hoursCloseTime + ':' + minutesCloseTime),
      },

      // TODO: Revisar esto
      availableBikeSlots: 0,
      availableMotorcicleSlots: 0,
      availableCarSlots: 0,

      totalSlots,
      loyalty: loyaltyState,
    } as ParkingInterface

    const res = parking
      ? await createParking(parkingData)
      : await updateParking(parkingData)

    if (res?.status === 200) {
      router.push('/admin/parqueaderos')
      router.refresh()
    }
  }

  useEffect(() => {
    if (parking) {
      setValue('name', parking.name)
      setValue('city', parking.location.city.name)
      setValue('address', parking.location.address)
      setValue('latitude', parking.location.latitude)
      setValue('longitude', parking.location.longitude)
      setValue('parkingType', parking.parkingType.type)

      // TODO: HOURS
      // setValue('hoursOpenTime', parking.openingHours.openTime)
      // setValue('minutesOpenTime', parking.openingHours.openTime)
      // setValue('hoursCloseTime', parking.openingHours.closeTime)
      // setValue('minutesCloseTime', parking.openingHours.closeTime)

      setValue('totalSlots', parking.totalSlots)
      setValue('loyalty', parking.loyalty)
    } else {
      setValue('latitude', 0)
      setValue('longitude', 0)
      setValue('totalSlots', 0)
      setValue('hoursOpenTime', 0)
      setValue('minutesOpenTime', 0)
      setValue('hoursCloseTime', 0)
      setValue('minutesCloseTime', 0)
    }
  }, [])
  return (
    <>
      <DialogTrigger asChild>
        {!parking ? (
          <div className='inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 px-4 py-2 absolute top-0 z-10 tracking-widest border hover:bg-yellowFPC-200  dark:hover:bg-yellowFPC-400 dark:hover:text-black hover:border-primary right-2 md:right-0 cursor-pointer'>
            CREAR PARQUEADERO
          </div>
        ) : (
          <div className='relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-muted'>
            <span> Editar parqueadero</span>
          </div>
        )}
      </DialogTrigger>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>
            <p className='tracking-widest'>
              {!parking ? 'CREAR PARQUEADERO' : 'EDITAR PARQUEADERO'}
            </p>
          </DialogTitle>
          <DialogDescription>
            Aquí puedes {!parking ? 'agregar' : 'editar'} la información del parqueadero.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col space-2'>
            <div className='grid gap-1 py-2'>
              <Label htmlFor='name'>Nombre Parqueadero</Label>
              <Input
                {...register('name')}
                className={cn('border-yellowFPC-400', {
                  'focus-visible:ring-red-500': errors.name,
                })}
                placeholder='Parking State'
              />
              {errors?.name && (
                <p className='text-sm text-red-500'>{errors.name.message}</p>
              )}
            </div>

            <Separator
              lineColor='border-yellowFPC-400'
              background='bg-background'
            />

            {/* TODO: SELECT DE CIUDADES */}
            <div className='grid gap-1 py-2'>
              <Label htmlFor='city'>Ciudad</Label>
              <Input
                {...register('city')}
                className={cn('border-yellowFPC-400', {
                  'focus-visible:ring-red-500': errors.city,
                })}
                placeholder='Asgard'
              />
              {errors?.city && (
                <p className='text-sm text-red-500'>{errors.city.message}</p>
              )}
            </div>

            <div className='grid gap-2 justify-around grid-cols-2'>
              <div className='grid gap-1 py-2'>
                <Label htmlFor='latitude'>Latitud</Label>
                <Input
                  {...register('latitude', { valueAsNumber: true })}
                  className={cn('border-yellowFPC-400', {
                    'focus-visible:ring-red-500': errors.latitude,
                  })}
                  placeholder='1.43534'
                />
                {errors?.latitude && (
                  <p className='text-sm text-red-500'>
                    {errors.latitude.message}
                  </p>
                )}
              </div>
              <div className='grid gap-1 py-2'>
                <Label htmlFor='longitude'>Longitud</Label>
                <Input
                  {...register('longitude', { valueAsNumber: true })}
                  className={cn('border-yellowFPC-400', {
                    'focus-visible:ring-red-500': errors.longitude,
                  })}
                  placeholder='-1.43534'
                />
                {errors?.longitude && (
                  <p className='text-sm text-red-500'>
                    {errors.longitude.message}
                  </p>
                )}
              </div>
            </div>

            <Separator
              lineColor='border-yellowFPC-400'
              background='bg-background'
            />

            <div className='grid gap-2 justify-around grid-cols-2'>
              <div className='grid gap-1 py-2'>
                <Label htmlFor='hoursOpenTime'>Hora de Apertura</Label>
                <Input
                  {...register('hoursOpenTime', { valueAsNumber: true })}
                  className={cn('border-yellowFPC-400', {
                    'focus-visible:ring-red-500': errors.hoursOpenTime,
                  })}
                  placeholder='23'
                />
                {errors?.hoursOpenTime && (
                  <p className='text-sm text-red-500'>
                    {errors.hoursOpenTime.message}
                  </p>
                )}
              </div>
              {/* TODO: DOS PUNTOS */}
              <div className='grid gap-1 py-2'>
                <Label htmlFor='minutesOpenTime'>Minuto de Apertura</Label>
                <Input
                  {...register('minutesOpenTime', { valueAsNumber: true })}
                  className={cn('border-yellowFPC-400', {
                    'focus-visible:ring-red-500': errors.minutesOpenTime,
                  })}
                  placeholder='23'
                />
                {errors?.minutesOpenTime && (
                  <p className='text-sm text-red-500'>
                    {errors.minutesOpenTime.message}
                  </p>
                )}
              </div>
            </div>

            <div className='grid gap-2 justify-around grid-cols-2'>
              <div className='grid gap-1 py-2'>
                <Label htmlFor='hoursCloseTime'>Hora de Cierre</Label>
                <Input
                  {...register('hoursCloseTime', { valueAsNumber: true })}
                  className={cn('border-yellowFPC-400', {
                    'focus-visible:ring-red-500': errors.hoursCloseTime,
                  })}
                  placeholder='23'
                />
                {errors?.hoursCloseTime && (
                  <p className='text-sm text-red-500'>
                    {errors.hoursCloseTime.message}
                  </p>
                )}
              </div>
              
              <div className='grid gap-1 py-2'>
                <Label htmlFor='minutesCloseTime'>Minuto de Cierre</Label>
                <Input
                  {...register('minutesCloseTime', { valueAsNumber: true })}
                  className={cn('border-yellowFPC-400', {
                    'focus-visible:ring-red-500': errors.minutesCloseTime,
                  })}
                  placeholder='23'
                />
                {errors?.minutesCloseTime && (
                  <p className='text-sm text-red-500'>
                    {errors.minutesCloseTime.message}
                  </p>
                )}
              </div>
            </div>

            <Separator
              lineColor='border-yellowFPC-400'
              background='bg-background'
            />

            {/* TODO: SELECT DE PARKING TYPE */}

            <div className='grid gap-1 py-2'>
              <Label htmlFor='totalSlots'>Capacidad (Número de Slots)</Label>
              <Input
                {...register('totalSlots', { valueAsNumber: true })}
                className={cn('border-yellowFPC-400', {
                  'focus-visible:ring-red-500': errors.totalSlots,
                })}
                placeholder='23'
              />
              {errors?.totalSlots && (
                <p className='text-sm text-red-500'>
                  {errors.totalSlots.message}
                </p>
              )}
            </div>

            <div className='grid gap-1 py-2'>
              <Toggle
                aria-label='Toggle-accountActive'
                onPressedChange={() => {
                  // TODO: Revisar que esté funcionando bien
                  setLoyaltyState(!loyaltyState)
                  setValue('loyalty', loyaltyState)
                }}
                defaultPressed={loyaltyState}
                className='border space-x-2'
              >
                {loyaltyState ? <Check size={19} /> : <X size={19} />}
                <p>PARQUEADERO CON CAMPAÑA DE LEALTAD</p>
              </Toggle>
            </div>

            <PrimaryButton
              text={
                parking ? 'CONFIRMAR CAMBIOS PARQUEADERO' : 'CREAR PARQUEADERO'
              }
              isLoading={isLoading}
            />
          </div>
        </form>
      </DialogContent>
    </>
  )
}
