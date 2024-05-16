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
import { UserInterface } from '@/lib/interfaces/user.interface'
import { ParkingRateInterface } from '@/lib/interfaces/parkingRate.interface'
import { CityInterface } from '@/lib/interfaces/city.interface'
import { useParkingRate } from '@/services/useParkingRate'

export function ParkingDialog({ parking }: { parking?: ParkingInterface }) {
  const router = useRouter()
  const [loyaltyState, setLoyaltyState] = useState<boolean>(
    parking?.loyalty === 'true' ? true : false
  )
  const [adminId, setAdminId] = useState<string | null>(null)
  const [city, setCity] = useState<CityInterface | null>(null)
  // const [loyaltyState, setLoyaltyState] = useState<boolean>(
  //   parking ? parking.loyalty : false
  // )
  const { createParking, updateParking, isLoading } = useParking()
  const {
    createParkingRate,
    updateParkingRate,
    getParkingRatesByParkingId,
    parkingRateRates,
  } = useParkingRate()
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
    admin,
    city,
    address,
    latitude,
    longitude,
    openTime,
    closeTime,
    loyalty,
    parkingType,
    car_slots,
    bicycle_slots,
    motorcycle_slots,
    heavy_vehicle_slots,
    carRate,
    motorcycleRate,
    bikeRate,
    heavyCarRate,
  }: TParkingValidator) => {
    console.log(closeTime)

    const parkingData = {
      id: parking && parking.id,
      name,
      adminId: admin,
      location: {
        city,
        address,
        latitude: latitude + '',
        longitude: longitude + '',
      },
      car_slots,
      bicycle_slots,
      motorcycle_slots,
      heavy_vehicle_slots,
      openingHours: {
        open_time: openTime,
        close_time: closeTime,
      },
      parkingType: {
        type: parkingType,
      },
      loyalty: loyaltyState.toString(),
    } as ParkingInterface

    // TODO: cerrar ventana al crear nuevo parqueadero
    const res = parking
      ? await updateParking(parkingData)
      : await createParking(parkingData)

    console.log(res)

    const carRateData = {
      rate: carRate + '',
      // arreglar el id de parking
      parkingId: 1,
      vehicleTypeId: {
        type: 'CARRO',
      },
    } as ParkingRateInterface
    const motorcycleRateData = {
      rate: motorcycleRate + '',
      // arreglar el id de parking
      parkingId: 1,
      vehicleTypeId: {
        type: 'MOTO',
      },
    } as ParkingRateInterface
    const bikeRateData = {
      rate: motorcycleRate + '',
      // arreglar el id de parking
      parkingId: 1,
      vehicleTypeId: {
        type: 'BICICLETA',
      },
    } as ParkingRateInterface
    const heavyCarRateData = {
      rate: motorcycleRate + '',
      // arreglar el id de parking
      parkingId: 1,
      vehicleTypeId: {
        type: 'VEHICULO_PESADO',
      },
    } as ParkingRateInterface

    const resCarRate = parking
      ? await updateParkingRate(carRateData)
      : await createParkingRate(carRateData)
    const resMotorcycleRate = parking
      ? await updateParkingRate(motorcycleRateData)
      : await createParkingRate(motorcycleRateData)
    const resBikeRate = parking
      ? await updateParkingRate(bikeRateData)
      : await createParkingRate(bikeRateData)
    const resHeavyCarRate = parking
      ? await updateParkingRate(heavyCarRateData)
      : await createParkingRate(heavyCarRateData)

    if (
      res?.status === 200 &&
      resCarRate?.status === 200 &&
      resMotorcycleRate?.status === 200 &&
      resBikeRate?.status === 200 &&
      resHeavyCarRate?.status === 200
    ) {
      if (!parking) clearForm()
      router.refresh()
      router.push('/admin/parqueaderos')
    }
  }

  useEffect(() => {
    if (parking) {
      setValue('name', parking.name)
      setAdminId(parking ? parking?.adminId! : null)
      setValue('city', parking.location.city)
      setValue('address', parking.location.address)
      setValue('latitude', parseInt(parking.location.latitude))
      setValue('longitude', parseInt(parking.location.longitude))
      setValue('openTime', parking.openingHours.open_time)
      setValue('closeTime', parking.openingHours.close_time)
      setValue('loyalty', parking.loyalty === 'true' ? true : false)
      setValue('parkingType', parking.parkingType.type)
      // setValue('car_slots', parking.parkingType.type)

      // setValue('carRate', parking.heavyCarRate)
      // setValue('motorcycleRate', parking.motorcycleRate)
      // setValue('bikeRate', parking.bikeRate)
      // setValue('heavyCarRate', parking.heavyCarRate)
    } else {
      setValue('latitude', 0)
      setValue('longitude', 0)
      setValue('openTime', '00:00')
      setValue('closeTime', '00:00')
      setValue('car_slots', 0)
      setValue('bicycle_slots', 0)
      setValue('motorcycle_slots', 0)
      setValue('heavy_vehicle_slots', 0)
      setValue('carRate', 0)
      setValue('motorcycleRate', 0)
      setValue('bikeRate', 0)
      setValue('heavyCarRate', 0)
      setValue('loyalty', false)
    }
  }, [])

  const clearForm = () => {
    setValue('name', '')
    setValue('admin', '')
    setValue('city', '')
    setValue('address', '')
    setValue('latitude', 0)
    setValue('longitude', 0)
    setValue('openTime', '00:00')
    setValue('closeTime', '00:00')
    setValue('loyalty', false)
    setValue('parkingType', '')
    setValue('car_slots', 0)
    setValue('bicycle_slots', 0)
    setValue('motorcycle_slots', 0)
    setValue('heavy_vehicle_slots', 0)
    setValue('carRate', 0)
    setValue('bikeRate', 0)
    setValue('heavyCarRate', 0)
    setValue('motorcycleRate', 0)
  }
  useEffect(() => {
    setValue('admin', adminId ? adminId : '')
  }, [adminId])

  useEffect(() => {
    if (city) {
      setValue('city', city.city)
    }
  }, [city])
  return (
    <>
      <DialogTrigger asChild>
        {!parking ? (
          <div className='inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 px-4 py-2 absolute top-0 z-10 tracking-widest border hover:bg-yellowFPC-200  dark:hover:bg-yellowFPC-400 dark:hover:text-black hover:border-primary right-2 md:right-0 cursor-pointer'>
            CREAR PARQUEADERO
          </div>
        ) : (
          <div className='relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-muted'>
            <span>Editar parqueadero</span>
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
            <div className='grid gap-2 justify-around grid-cols-2'>
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

            <div className='grid gap-2 justify-around grid-cols-2'>
              <div className='grid gap-1 py-2'>
                <Label htmlFor='city'>Ciudad</Label>
                <CitySelect
                  city={city}
                  setCity={setCity}
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

            <div className='grid gap-2 justify-around grid-cols-4'>
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

            <div className='grid gap-2 justify-around grid-cols-2'>
              <div className='grid gap-1 py-2'>
                <Label htmlFor='totalSlots'>
                  Capacidad <span className='italic'>(Número de Slots)</span>
                </Label>
                <div className='grid gap-2 justify-around grid-cols-4'>
                  <div className='grid gap-1 py-1'>
                    <Label htmlFor='totalSlots'>
                      <p className='italic font-normal'>Carro</p>
                    </Label>
                    <Input
                      {...register('car_slots', { valueAsNumber: true })}
                      className={cn('border-yellowFPC-400', {
                        'focus-visible:ring-red-500': errors.car_slots,
                      })}
                      placeholder='23'
                    />
                  </div>
                  <div className='grid gap-1 py-1'>
                    <Label htmlFor='totalSlots'>
                      <p className='italic font-normal'>Moto</p>
                    </Label>
                    <Input
                      {...register('bicycle_slots', { valueAsNumber: true })}
                      className={cn('border-yellowFPC-400', {
                        'focus-visible:ring-red-500': errors.bicycle_slots,
                      })}
                      placeholder='23'
                    />
                  </div>
                  <div className='grid gap-1 py-1'>
                    <Label htmlFor='totalSlots'>
                      <p className='italic font-normal'>Cicla</p>
                    </Label>
                    <Input
                      {...register('motorcycle_slots', { valueAsNumber: true })}
                      className={cn('border-yellowFPC-400', {
                        'focus-visible:ring-red-500': errors.motorcycle_slots,
                      })}
                      placeholder='23'
                    />
                  </div>

                  <div className='grid gap-1 py-1'>
                    <Label htmlFor='totalSlots'>
                      <p className='italic font-normal'>Pesado</p>
                    </Label>
                    <Input
                      {...register('heavy_vehicle_slots', {
                        valueAsNumber: true,
                      })}
                      className={cn('border-yellowFPC-400', {
                        'focus-visible:ring-red-500':
                          errors.heavy_vehicle_slots,
                      })}
                      placeholder='23'
                    />
                  </div>
                </div>
                {(errors?.car_slots ||
                  errors?.bicycle_slots ||
                  errors?.motorcycle_slots ||
                  errors?.heavy_vehicle_slots) && (
                  <p className='text-sm text-red-500'>
                    {'Por favor revisa estos datos'}
                  </p>
                )}
              </div>

              <div className='grid gap-1 py-2'>
                <Label htmlFor='totalSlots'>
                  Precio por tipo de parqueadero{' '}
                  <span className='italic'>(COP)</span>
                </Label>
                <div className='grid gap-2 justify-around grid-cols-4'>
                  <div className='grid gap-1 py-1'>
                    <Label htmlFor='totalSlots'>
                      <p className='italic font-normal'>Carro</p>
                    </Label>
                    <Input
                      {...register('carRate', { valueAsNumber: true })}
                      className={cn('border-yellowFPC-400', {
                        'focus-visible:ring-red-500': errors.carRate,
                      })}
                      placeholder='200'
                    />
                  </div>
                  <div className='grid gap-1 py-1'>
                    <Label htmlFor='totalSlots'>
                      <p className='italic font-normal'>Moto</p>
                    </Label>
                    <Input
                      {...register('motorcycleRate', { valueAsNumber: true })}
                      className={cn('border-yellowFPC-400', {
                        'focus-visible:ring-red-500': errors.motorcycleRate,
                      })}
                      placeholder='200'
                    />
                  </div>
                  <div className='grid gap-1 py-1'>
                    <Label htmlFor='totalSlots'>
                      <p className='italic font-normal'>Cicla</p>
                    </Label>
                    <Input
                      {...register('bikeRate', { valueAsNumber: true })}
                      className={cn('border-yellowFPC-400', {
                        'focus-visible:ring-red-500': errors.bikeRate,
                      })}
                      placeholder='200'
                    />
                  </div>
                  <div className='grid gap-1 py-1'>
                    <Label htmlFor='totalSlots'>
                      <p className='italic font-normal'>Pesado</p>
                    </Label>
                    <Input
                      {...register('heavyCarRate', { valueAsNumber: true })}
                      className={cn('border-yellowFPC-400', {
                        'focus-visible:ring-red-500': errors.heavyCarRate,
                      })}
                      placeholder='200'
                    />
                  </div>
                </div>
                {(errors?.carRate ||
                  errors?.motorcycleRate ||
                  errors?.bikeRate ||
                  errors?.heavyCarRate) && (
                  <p className='text-sm text-red-500'>
                    {'Por favor revisa estos datos'}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className='grid gap-1 py-2'>
            <Label htmlFor='admin'>Administrador</Label>
            <AdminSelect
              admin={adminId}
              setAdmin={setAdminId}
              errors={errors.admin}
            />
            {errors?.admin && (
              <p className='text-sm text-red-500'>{errors.admin.message}</p>
            )}
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
        </form>
      </DialogContent>
    </>
  )
}
