'use client'

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'
import { useEffect, useState } from 'react'
import PrimaryButton from '@/components/CustomButtons/PrimaryButton'
import { Bike, Car, Cloud, Tractor } from 'lucide-react'

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { ParkingInterface } from '@/lib/interfaces/parking.interface'
import { PiMotorcycleFill } from 'react-icons/pi'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useReservation } from '@/services/useReservation'
import { ReservationInterface } from '@/lib/interfaces/reservation.interface'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'
import { DateTime } from 'luxon'

interface ParkingVehicleType {
  id?: number
  type: 'CARRO' | 'MOTO' | 'BICICLETA' | 'VEHICULO_PESADO'
  label?: 'CARRO' | 'MOTO' | 'BICICLETA' | 'V. PESADO'
  emptySlots?: number
  rate?: number
  icon: JSX.Element
}

const ReservationSheet = ({
  selectedParking,
}: {
  selectedParking: ParkingInterface
}) => {
  const { createReservation } = useReservation()
  const { data: session } = useSession()
  const router = useRouter()
  const [parkingSlot, setParkingSlot] = useState<number>()
  const { toast } = useToast()

  const onSubmit = async () => {
    if (parkingSlot === undefined) {
      toast({
        variant: 'destructive',
        title: 'Selecciona un tipo de vehículo.',
      })
    } else if (session && parkingSlot) {
      const reservationData = {
        reservationTime: DateTime.now().toString(),
        userId: session?.id,
        parkingSlotId: parkingSlot,
      } as ReservationInterface

      console.log(reservationData)

      // const res = await createReservation(reservationData)
      // if (res?.status === 200) {
      //   router.push(`/reserva/${res?.data.id}`)
      // }
    }
  }

  const refactorParkingVehicleTypeData = () => {
    let data = selectedParking?.parkingRate?.map((parkingRateItem) => {
      return {
        id: parkingRateItem.vehicleTypeId.id,
        type: parkingRateItem.vehicleTypeId.type,
        rate: parkingRateItem.rate,
        label:
          parkingRateItem.vehicleTypeId.type !== 'VEHICULO_PESADO'
            ? parkingRateItem.vehicleTypeId.type
            : 'V. PESADO',
        icon:
          parkingRateItem.vehicleTypeId.type === 'CARRO' ? (
            <Car className='sm:w-6 sm:h-6 w-5 h-5' strokeWidth={1.5} />
          ) : parkingRateItem.vehicleTypeId.type === 'MOTO' ? (
            <PiMotorcycleFill
              className='sm:w-6 sm:h-6 w-5 h-5'
              strokeWidth={1.5}
            />
          ) : parkingRateItem.vehicleTypeId.type === 'BICICLETA' ? (
            <Bike className='sm:w-6 sm:h-6 w-5 h-5' strokeWidth={1.5} />
          ) : (
            <Tractor className='sm:w-6 sm:h-6 w-5 h-5' strokeWidth={1.5} />
          ),
      } as ParkingVehicleType
    })
    data &&
      data.map((parkingVehicleTypeItem) => {
        selectedParking.parkingSlotDetails?.map((parkingSlotDetailItem) => {
          if (parkingSlotDetailItem.slotType === parkingVehicleTypeItem.type) {
            parkingVehicleTypeItem.emptySlots = parkingSlotDetailItem.emptySlots
          }
        })
      })
    return data
  }

  const refactoredParkingVehicleTypeData = refactorParkingVehicleTypeData()

  return (
    <Sheet>
      <SheetTrigger asChild className='w-full'>
        <PrimaryButton size={'sm'} text='RESERVAR' />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className='tracking-widest text-base sm:text-lg'>
            RESERVAR
          </SheetTitle>
          <Separator />
          <p className='text-gray-500 text-xs sm:text-sm text-justify'>
            ¡No dejes que te quiten el cupo! Asegura tu cupo.
          </p>
          <Separator />
        </SheetHeader>
        <div className='flex w-full flex-col py-2 gap-2'>
          <ToggleGroup variant='outline' type='single' size={'xl'}>
            <div className='flex flex-col space-y-1 w-full'>
              <p className='tracking-widest font-medium text-sm sm:text-base'>
                TIPO VEHÍCULO
              </p>

              <ScrollArea className='h-[215px] sm:h-[260px]'>
                <div className='flex flex-col space-y-2 w-full'>
                  {refactoredParkingVehicleTypeData?.map(
                    (parkingVehicleType) => (
                      <ToggleGroupItem
                        value={parkingVehicleType.type}
                        aria-label='Toggle bold'
                        key={parkingVehicleType.id}
                        onClick={() => {
                          setParkingSlot(parkingVehicleType.id)
                        }}
                      >
                        <div className='flex flex-col justify-start w-full py-2 px-3 gap-1'>
                          <div className='gap-1'>
                            <div className='flex flex-row gap-1 sm:gap-2'>
                              {parkingVehicleType.icon}
                              <p className='font-normal text-sm sm:text-base tracking-wider'>
                                {parkingVehicleType.label}
                              </p>
                              -
                              <p className='font-normal text-sm sm:text-base  italic'>
                                {parkingVehicleType.emptySlots} cupo(s)
                              </p>
                            </div>
                          </div>
                          <p className='text-start text-sm sm:text-base '>
                            {parkingVehicleType.rate}{' '}
                            <span className='italic font-light'> / min.</span>
                          </p>
                        </div>
                      </ToggleGroupItem>
                    )
                  )}
                  <ToggleGroupItem
                    value='nube'
                    aria-label='Toggle underline'
                    onClick={() => {
                      setParkingSlot(undefined)
                    }}
                  >
                    <div className='flex flex-col justify-start w-full sm:py-2 sm:px-3 py-1 px-2 gap-1'>
                      <div className='gap-1'>
                        <div className='flex flex-row gap-1 sm:gap-2'>
                          <Cloud
                            className='sm:w-6 sm:h-6 w-5 h-5'
                            strokeWidth={1.5}
                          />
                          <p className='font-normal text-sm sm:text-base font-base tracking-wider'>
                            NUBE VOLADORA
                          </p>
                          -
                          <p className='font-normal text-sm sm:text-base italic '>
                            ∞ cupos
                          </p>
                        </div>
                      </div>
                      <p className='text-start text-sm sm:text-base'>
                        Ƶ10 <span className='italic font-light'> / min.</span>
                      </p>
                    </div>
                  </ToggleGroupItem>
                </div>
              </ScrollArea>
            </div>
          </ToggleGroup>
        </div>
        <div className='space-y-4 '>
          <Separator />
          <div className='text-xs sm:text-base'>
            <h2 className='tracking-widest font-medium'>RESUMEN</h2>

            {/* <div className='flex'>
              <span className='flex-1'>Hora de ingreso: </span>
              <span className='pr-1'>
                {new Date().toLocaleString('es-CO', {
                  hour: 'numeric',
                  minute: 'numeric',
                })}
              </span>
              {' - '}
              <span className='pl-1'>
                {new Date().toLocaleString('es-CO', {
                  hour: 'numeric',
                  minute: 'numeric',
                })}
              </span>
            </div>
            <div className='flex'>
              <span className='flex-1'>Fecha: </span>
              <span>
                {new Date().toLocaleDateString('es-CO', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div> */}
            <div className='flex font-medium overflow-hidden text-ellipsis truncate'>
              <span className='flex-1'>Parqueadero</span>
              <span className='font-normal'>{selectedParking.name}</span>
            </div>
            <div className='flex font-medium overflow-hidden text-ellipsis truncate'>
              <span className='flex-1'>Dirección</span>
              <span className='font-normal'>
                {selectedParking.location.address}
              </span>
            </div>
            <div className='flex font-medium overflow-hidden text-ellipsis truncate'>
              <span className='flex-1'>Ciudad</span>
              <span className='font-normal'>
                {selectedParking.location.city.city}
              </span>
            </div>
            <div className='flex font-medium overflow-hidden text-ellipsis truncate'>
              <span className='flex-1'>Tipo Parqueadero</span>
              <span className='font-normal'>
                {selectedParking.parkingType.type.toLocaleLowerCase()}
              </span>
            </div>
            <div className='flex'>
              <span className='flex-1'>Tipo vehículo</span>
              <span>Carro</span>
            </div>
            <div className='flex'>
              <span className='flex-1'>Tarifa</span>
              <span>
                $200 <span className='italic text-sm'>/ min</span>
              </span>
            </div>
          </div>
          <Separator />
          <SheetFooter>
            <PrimaryButton
              text='RESERVAR PARQUEADERO'
              onClick={() => {
                onSubmit()
              }}
            />
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default ReservationSheet
