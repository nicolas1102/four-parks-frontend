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
import { Check, CircleHelp, X } from 'lucide-react'
import { ParkingInterface } from '@/lib/interfaces/parking.interface'
import { useParking } from '@/services/useParking'
import {
  ParkingValidator,
  TParkingValidator,
} from '@/lib/validators/parking-validators'
import { AdminSelect } from './AdminSelect'
import { CitySelect } from './CitySelect'
import { ParkingTypeSelect } from './ParkingTypeSelect'
import { CustomTooltip } from '@/components/CustomTooltip'

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
    openTime,
    closeTime,
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
        open_time: '01:25',
        // openTime: openTime,
        close_time: '23:25',
        // closeTime: closeTime,
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

    // TODO: cerrar ventana al crear nuevo parqueadero
    const res = parking
      ? await updateParking(parkingData)
      : await createParking(parkingData)

    if (res?.status === 200) {
      if (!parking) clearForm()
      router.refresh()
      router.push('/admin/parqueaderos')
    }
  }

  useEffect(() => {
    if (parking) {
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
      setValue('openTime', parking.openingHours.open_time)
      // setValue('openTime', parking.openingHours.openTime)
      setValue('closeTime', parking.openingHours.close_time)
      // setValue('closeTime', parking.openingHours.closeTime)
      setValue('loyalty', parking.loyalty === 'true' ? true : false)
      // setValue('loyalty', parking.loyalty)
      setValue('parkingType', parking.parkingType.type)
    } else {
      setValue('latitude', 0)
      setValue('longitude', 0)
      setValue('totalSlots', 0)
      setValue('openTime', '00:00')
      setValue('closeTime', '00:00')
      setValue('loyalty', false)
    }
  }, [])

  const clearForm = () => {
    setValue('name', '')
    setValue('city', '')
    setValue('address', '')
    setValue('latitude', 0)
    setValue('longitude', 0)
    setValue('totalSlots', 0)
    setValue('openTime', '00:00')
    setValue('closeTime', '00:00')
    setValue('loyalty', false)
    setValue('parkingType', '')
  }
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
              <div className='grid gap-1 py-2'>
                <Label htmlFor='city'>Ciudad</Label>
                <CitySelect
                  selectValue={parking ? parking.location.city.city : ''}
                  setSelectValue={setValue}
                  errors={errors.city}
                />
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
                <div className='flex flex-row gap-2'>
                  <Label htmlFor='latitude'>Latitud</Label>
                  <CustomTooltip text='Ingresa a Google Maps, dale clic derecho a un punto en el mapa y copia las coordenadas.'>
                    <CircleHelp size={16} className='cursor-pointer' />
                  </CustomTooltip>
                </div>
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
                <div className='flex flex-row gap-2'>
                  <Label htmlFor='latitude'>Longitud</Label>
                  <CustomTooltip text='Ingresa a Google Maps, dale clic derecho a un punto en el mapa y copia las coordenadas.'>
                    <CircleHelp size={16} className='cursor-pointer' />
                  </CustomTooltip>
                </div>
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
                <Label htmlFor='openTime'>Hora de Apertura</Label>
                <Input
                  type='time'
                  {...register('openTime')}
                  className={cn('border-yellowFPC-400', {
                    'focus-visible:ring-red-500': errors.openTime,
                  })}
                  placeholder='23'
                />
                {errors?.openTime && (
                  <p className='text-sm text-red-500'>
                    {errors.openTime.message}
                  </p>
                )}
              </div>
              <div className='grid gap-1 py-2'>
                <Label htmlFor='closeTime'>Hora de Cierre</Label>
                <Input
                  type='time'
                  {...register('closeTime')}
                  className={cn('border-yellowFPC-400', {
                    'focus-visible:ring-red-500': errors.closeTime,
                  })}
                  placeholder='23'
                />
                {errors?.closeTime && (
                  <p className='text-sm text-red-500'>
                    {errors.closeTime.message}
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

              <div className='grid gap-1 py-2'>
                <Label htmlFor='parkingType'>Tipo de Parqueadero</Label>
                <ParkingTypeSelect
                  selectValue={parking ? parking.parkingType.type : ''}
                  setSelectValue={setValue}
                  errors={errors.parkingType}
                />

                {errors?.parkingType && (
                  <p className='text-sm text-red-500'>
                    {errors.parkingType.message}
                  </p>
                )}
              </div>
            </div>

            <div className='grid gap-1 py-2'>
              <Toggle
                aria-label='Toggle-accountActive'
                onPressedChange={() => {
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
