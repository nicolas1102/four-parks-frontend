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
import { AdminSelect } from './AdminSelect'
import { CitySelect } from './CitySelect'
import { ParkingTypeSelect } from './ParkingTypeSelect'

export function ParkingDialog({ parking }: { parking?: ParkingInterface }) {
  const router = useRouter()
  const [loyaltyState, setLoyaltyState] = useState<boolean>(
    parking?.loyalty === 'true' ? true : false
  )
  // const [loyaltyState, setLoyaltyState] = useState<boolean>(
  //   parking ? parking.loyalty : false
  // )
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
  const onSubmit = async ({
    name,
    city,
    address,
    latitude,
    longitude,
    // admin,
    totalSlots,
    hoursOpenTime,
    minutesOpenTime,
    hoursCloseTime,
    minutesCloseTime,
    loyalty,
    parkingType,
  }: TParkingValidator) => {
    const parkingData = {
      id: parking && parking.id,
      name,
      admin: null,
      location: {
        city: {
          city: city,
        },
        address,
        latitude: latitude + '',
        // latitude,
        longitude: longitude + '',
        // longitude,
      },
      total_slots: totalSlots + '',
      // totalSlots,
      available_slots: totalSlots + '',
      // available_slots: 0,
      openingHours: {
        open_time: hoursOpenTime + ':' + minutesOpenTime,
        // openTime: hoursOpenTime + ':' + minutesOpenTime,
        close_time: hoursCloseTime + ':' + minutesCloseTime,
        // closeTime: hoursCloseTime + ':' + minutesCloseTime,
      },

      parkingType: {
        type: parkingType,
      },
      loyalty: loyaltyState.toString(),
      // loyalty: loyaltyState,

      // TODO: Revisar esto
      // availableBikeSlots: 0,
      // availableMotorcicleSlots: 0,
      // availableCarSlots: 0,
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
    const separateOpenningHours = (open_time: string, close_time: string) => {
      return {
        openTime: open_time.split(':'),
        closeTime: close_time.split(':'),
      }
    }

    if (parking) {
      // separamos horas
      const { openTime, closeTime } = separateOpenningHours(
        parking.openingHours.open_time,
        parking.openingHours.close_time
      )

      setValue('name', parking.name)
      // setValue('admin', parking.admin)
      setValue('city', parking.location.city.city)
      setValue('address', parking.location.address)
      setValue('latitude', parseInt(parking.location.latitude))
      // setValue('latitude', parking.location.latitude)
      setValue('longitude', parseInt(parking.location.longitude))
      // setValue('longitude', parking.location.longitude)
      setValue('totalSlots', parseInt(parking.total_slots))
      // setValue('totalSlots', parking.totalSlots)
      setValue('hoursOpenTime', parseInt(openTime[0]))
      // setValue('hoursOpenTime', openTime[0])
      setValue('minutesOpenTime', parseInt(openTime[1]))
      // setValue('minutesOpenTime', openTime[1])
      setValue('hoursCloseTime', parseInt(closeTime[1]))
      // setValue('hoursCloseTime', closeTime[1])
      setValue('minutesCloseTime', parseInt(closeTime[1]))
      // setValue('minutesCloseTime', closeTime[1])
      setValue('loyalty', parking.loyalty === 'true' ? true : false)
      // setValue('loyalty', parking.loyalty)
      setValue('parkingType', parking.parkingType.type)
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
      <DialogContent className='sm:max-w-xl'>
        <DialogHeader>
          <DialogTitle>
            <p className='tracking-widest'>
              {!parking ? 'CREAR PARQUEADERO' : 'EDITAR PARQUEADERO'}
            </p>
          </DialogTitle>
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

            <div className='grid gap-2 justify-around grid-cols-2'>
              {/* TODO: SELECT DE CIUDADES */}
              <div className='grid gap-1 py-2'>
                <Label htmlFor='city'>Ciudad</Label>
                <CitySelect
                  selectValue={parking ? parking.location.city.city : ''}
                  setSelectValue={setValue}
                  errors={errors.city}
                />
                {/* <Input
                  {...register('city')}
                  className={cn('border-yellowFPC-400', {
                    'focus-visible:ring-red-500': errors.city,
                  })}
                  placeholder='Asgard'
                /> */}
                {errors?.city && (
                  <p className='text-sm text-red-500'>{errors.city.message}</p>
                )}
              </div>
              <div className='grid gap-1 py-2'>
                <Label htmlFor='address'>Dirección</Label>
                <Input
                  {...register('address')}
                  className={cn('border-yellowFPC-400', {
                    'focus-visible:ring-red-500': errors.address,
                  })}
                  placeholder='Calle Muy Muy Lejano'
                />
                {errors?.address && (
                  <p className='text-sm text-red-500'>
                    {errors.address.message}
                  </p>
                )}
              </div>
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

            <div className='grid gap-2 justify-around grid-cols-2'>
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

              {/* TODO: SELECT DE PARKING TYPE */}
              <div className='grid gap-1 py-2'>
                <Label htmlFor='totalSlots'>Capacidad (Número de Slots)</Label>
                {/* <Input
                  {...register('totalSlots', { valueAsNumber: true })}
                  className={cn('border-yellowFPC-400', {
                    'focus-visible:ring-red-500': errors.totalSlots,
                  })}
                  placeholder='23'
                /> */}
                <ParkingTypeSelect
                  selectValue={parking ? parking.parkingType.type : ''}
                  setSelectValue={setValue}
                  errors={errors.parkingType}
                />

                {errors?.totalSlots && (
                  <p className='text-sm text-red-500'>
                    {errors.totalSlots.message}
                  </p>
                )}
              </div>
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
