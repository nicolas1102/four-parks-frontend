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
import { ParkingTypeInterface } from '@/lib/interfaces/parkingType.interface'

export function ParkingDialog({ parking }: { parking?: ParkingInterface }) {
  const router = useRouter()
  const [loyaltyState, setLoyaltyState] = useState<boolean>(
    parking?.loyalty ? parking?.loyalty : false
  )
  const [adminState, setAdminState] = useState<UserInterface | null>(null)
  const [cityState, setCityState] = useState<CityInterface | null>(null)
  const [parkingType, setParkingType] = useState<ParkingTypeInterface | null>(
    null
  )
  const { createParking, updateParking, isLoading } = useParking()
  const {
    createParkingRate,
    updateParkingRate,
    getParkingRatesByParkingId,
    parkingRates,
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
    carSlots,
    bicycleSlots,
    motorcycleSlots,
    heavyVehicleSlots,
    carRate,
    motorcycleRate,
    bikeRate,
    heavyCarRate,
  }: TParkingValidator) => {
    const parkingData = {
      id: parking && parking.id,
      name,
      totalSlots: parking && parking.totalSlots,
      availableSlots: parking && parking.availableSlots,
      carSlots,
      bicycleSlots,
      motorcycleSlots,
      heavyVehicleSlots,
      loyalty,
      location: {
        city: {
          city: city,
        },
        address,
        latitude: latitude,
        longitude: longitude,
      },
      openingHours: {
        openTime,
        closeTime,
      },
      parkingType: {
        type: parkingType,
      },
      adminId: adminState?.id,
    } as ParkingInterface

    // TODO: cerrar ventana al crear nuevo parqueadero
    const res = parking
      ? await updateParking(parkingData)
      : await createParking(parkingData)

    if (parking?.parkingRate) {
      parking.parkingRate.map(async (parkingType) => {
        if (parkingType.vehicleTypeId.type === 'CARRO') {
          const carRateData = {
            id: parkingType.id,
            rate: carRate,
            parkingId: res?.data.id,
            vehicleTypeId: {
              type: 'CARRO',
            },
          } as ParkingRateInterface
          await updateParkingRate(carRateData)
        } else if (parkingType.vehicleTypeId.type === 'MOTO') {
          const motorcycleRateData = {
            id: parkingType.id,
            rate: motorcycleRate,
            parkingId: res?.data.id,
            vehicleTypeId: {
              type: 'MOTO',
            },
          } as ParkingRateInterface
          await updateParkingRate(motorcycleRateData)
        } else if (parkingType.vehicleTypeId.type === 'BICICLETA') {
          const bikeRateData = {
            id: parkingType.id,
            rate: bikeRate,
            parkingId: res?.data.id,
            vehicleTypeId: {
              type: 'BICICLETA',
            },
          } as ParkingRateInterface
          await updateParkingRate(bikeRateData)
        } else if (parkingType.vehicleTypeId.type === 'VEHICULO_PESADO') {
          const heavyCarRateData = {
            id: parkingType.id,
            rate: heavyCarRate,
            parkingId: res?.data.id,
            vehicleTypeId: {
              type: 'VEHICULO_PESADO',
            },
          } as ParkingRateInterface
          await updateParkingRate(heavyCarRateData)
        }
      })
    } else {
      const carRateData = {
        rate: carRate,
        parkingId: res?.data.id,
        vehicleTypeId: {
          type: 'CARRO',
        },
      } as ParkingRateInterface
      const motorcycleRateData = {
        rate: motorcycleRate,
        parkingId: res?.data.id,
        vehicleTypeId: {
          type: 'MOTO',
        },
      } as ParkingRateInterface
      const bikeRateData = {
        rate: bikeRate,
        parkingId: res?.data.id,
        vehicleTypeId: {
          type: 'BICICLETA',
        },
      } as ParkingRateInterface
      const heavyCarRateData = {
        rate: heavyCarRate,
        parkingId: res?.data.id,
        vehicleTypeId: {
          type: 'VEHICULO_PESADO',
        },
      } as ParkingRateInterface

      const resCarRate = await createParkingRate(carRateData)
      const resBikeRate = await createParkingRate(bikeRateData)
      const resMotorcycleRate = await createParkingRate(motorcycleRateData)
      const resHeavyCarRate = await createParkingRate(heavyCarRateData)
    }

    if (
      res?.status === 200
      // &&
      // resCarRate?.status === 200 &&
      // resMotorcycleRate?.status === 200 &&
      // resBikeRate?.status === 200 &&
      // resHeavyCarRate?.status === 200
    ) {
      if (!parking) clearForm()
        // TODO: Arreglar esto, sacamos al usuario de la pagina de usuario porque al actuzlizar, no tenemos los damos de los precios y no se mostrarían esos datos al editar un parqueadero. entonces es para que no se note.
      router.push('/admin')
    }
  }

  useEffect(() => {
    if (parking) {
      setValue('name', parking.name)
      setAdminState(parking.admin!)
      setCityState(parking.location.city)
      setValue('address', parking.location.address)
      setValue('latitude', parking.location.latitude)
      setValue('longitude', parking.location.longitude)
      setValue('openTime', parking.openingHours.openTime)
      setValue('closeTime', parking.openingHours.closeTime)
      setLoyaltyState(parking.loyalty)
      setParkingType(parking.parkingType)
      setValue('carSlots', parking.carSlots)
      setValue('bicycleSlots', parking.bicycleSlots)
      setValue('motorcycleSlots', parking.motorcycleSlots)
      setValue('heavyVehicleSlots', parking.heavyVehicleSlots)
      if (parking.parkingRate) {
        parking.parkingRate.map((parkingRate) => {
          if (parkingRate.vehicleTypeId.type === 'CARRO') {
            setValue('carRate', parkingRate.rate)
          } else if (parkingRate.vehicleTypeId.type === 'MOTO') {
            setValue('motorcycleRate', parkingRate.rate)
          } else if (parkingRate.vehicleTypeId.type === 'BICICLETA') {
            setValue('bikeRate', parkingRate.rate)
          } else if (parkingRate.vehicleTypeId.type === 'VEHICULO_PESADO') {
            setValue('heavyCarRate', parkingRate.rate)
          }
        })
      }
    } else {
      setValue('latitude', 0)
      setValue('longitude', 0)
      setValue('openTime', '00:00')
      setValue('closeTime', '00:00')
      setValue('carSlots', 0)
      setValue('bicycleSlots', 0)
      setValue('motorcycleSlots', 0)
      setValue('heavyVehicleSlots', 0)
      setValue('carRate', 0)
      setValue('bikeRate', 0)
      setValue('heavyCarRate', 0)
      setValue('motorcycleRate', 0)
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
    setValue('carSlots', 0)
    setValue('bicycleSlots', 0)
    setValue('motorcycleSlots', 0)
    setValue('heavyVehicleSlots', 0)
    setValue('carRate', 0)
    setValue('bikeRate', 0)
    setValue('heavyCarRate', 0)
    setValue('motorcycleRate', 0)
  }
  useEffect(() => {
    if (adminState) {
      setValue('admin', adminState.id! + '')
    }
  }, [adminState])

  useEffect(() => {
    if (cityState) {
      setValue('city', cityState.city)
    }
  }, [cityState])

  useEffect(() => {
    if (parkingType) {
      setValue('parkingType', parkingType.type)
    }
  }, [parkingType])

  useEffect(() => {
    setValue('loyalty', loyaltyState)
  }, [loyaltyState])
  return (
    <>
      <DialogTrigger asChild>
        {!parking ? (
          <div className='inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 px-4 py-2 absolute top-0 z-10 tracking-widest border hover:bg-yellowFPC-200  dark:hover:bg-yellowFPC-400 dark:hover:text-black hover:border-primary right-2 md:right-0 cursor-pointer '>
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
                  parkingType={parkingType}
                  setParkingType={setParkingType}
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
                  city={cityState}
                  setCity={setCityState}
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
                <div className='flex flex-row gap-1'>
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
                <div className='flex flex-row gap-1'>
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

            {parking ? (
              <div className='grid gap-1 py-2'>
                <Label htmlFor='rates'>
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
            ) : (
              <div className='grid gap-2 justify-around grid-cols-2'>
                <div className='grid gap-1 py-2'>
                  <Label htmlFor='totalSlots'>
                    Capacidad <span className='italic'>(Número de Slots)</span>
                  </Label>
                  <div className='grid gap-2 justify-around grid-cols-4'>
                    <div className='grid gap-1 py-1'>
                      <Label htmlFor='carSlots'>
                        <p className='italic font-normal'>Carro</p>
                      </Label>
                      <Input
                        {...register('carSlots', { valueAsNumber: true })}
                        className={cn('border-yellowFPC-400', {
                          'focus-visible:ring-red-500': errors.carSlots,
                        })}
                        placeholder='23'
                      />
                    </div>
                    <div className='grid gap-1 py-1'>
                      <Label htmlFor='bicycleSlots'>
                        <p className='italic font-normal'>Moto</p>
                      </Label>
                      <Input
                        {...register('bicycleSlots', { valueAsNumber: true })}
                        className={cn('border-yellowFPC-400', {
                          'focus-visible:ring-red-500': errors.bicycleSlots,
                        })}
                        placeholder='23'
                      />
                    </div>
                    <div className='grid gap-1 py-1'>
                      <Label htmlFor='motorcycleSlots'>
                        <p className='italic font-normal'>Cicla</p>
                      </Label>
                      <Input
                        {...register('motorcycleSlots', {
                          valueAsNumber: true,
                        })}
                        className={cn('border-yellowFPC-400', {
                          'focus-visible:ring-red-500': errors.motorcycleSlots,
                        })}
                        placeholder='23'
                      />
                    </div>
                    <div className='grid gap-1 py-1'>
                      <Label htmlFor='heavyVehicleSlots'>
                        <p className='italic font-normal'>Pesado</p>
                      </Label>
                      <Input
                        {...register('heavyVehicleSlots', {
                          valueAsNumber: true,
                        })}
                        className={cn('border-yellowFPC-400', {
                          'focus-visible:ring-red-500':
                            errors.heavyVehicleSlots,
                        })}
                        placeholder='23'
                      />
                    </div>
                  </div>
                  {(errors?.carSlots ||
                    errors?.bicycleSlots ||
                    errors?.motorcycleSlots ||
                    errors?.heavyVehicleSlots) && (
                    <p className='text-sm text-red-500'>
                      {'Por favor revisa estos datos'}
                    </p>
                  )}
                </div>

                <div className='grid gap-1 py-2'>
                  <Label htmlFor='rates'>
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
            )}
          </div>

          <div className='grid gap-1 py-2'>
            <Label htmlFor='admin'>Administrador</Label>
            <AdminSelect
              admin={adminState}
              setAdmin={setAdminState}
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
