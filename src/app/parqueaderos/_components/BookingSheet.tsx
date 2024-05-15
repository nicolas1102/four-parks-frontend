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
import {
  Bike,
  Car,
  Cloud,
  Tractor,
} from 'lucide-react'

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { ParkingInterface } from '@/lib/interfaces/parking.interface'
import { PiMotorcycleFill } from 'react-icons/pi'
import { ScrollArea } from '@/components/ui/scroll-area'

const BookingSheet = ({
  selectedParking,
}: {
  selectedParking: ParkingInterface
}) => {
  return (
    <Sheet>
      <SheetTrigger asChild className='w-full'>
        <PrimaryButton text='RESERVAR' />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className='tracking-widest text-xl'>RESERVAR</SheetTitle>
          <Separator />
          <p className='text-gray-500 text-sm text-justify'>
            ¡No dejes que te quiten el cupo! Completa los siguientes datos para
            asegurar tu parqueadero.
          </p>
          <Separator />
        </SheetHeader>
        <div className='flex w-full flex-col py-2 gap-2'>
          <div>
            <div>
              <p className='font-medium tracking-wider overflow-hidden text-ellipsis truncate '>
                NOMBRE:{' '}
                <span className='font-normal'>{selectedParking.name}</span>
              </p>
            </div>
            <div>
              <p className='font-medium  tracking-wider overflow-hidden text-ellipsis truncate '>
                DIRECCIÓN:{' '}
                <span className='font-normal'>
                  {selectedParking.location.address} -{' '}
                  <span className='italic'>
                    {selectedParking.location.city.city}
                  </span>
                </span>
              </p>
            </div>
            <div>
              <p className='font-medium  tracking-wider overflow-hidden text-ellipsis truncate '>
                TIPO PARQUEDERO:{' '}
                <span className='font-normal'>
                  {selectedParking.parkingType.type.toLocaleLowerCase()}
                </span>
              </p>
            </div>
          </div>
          <Separator />
          <ToggleGroup variant='outline' type='single' size={'xl'}>
            <div className='flex flex-col space-y-1 w-full'>
              <p className='tracking-widest font-medium '>TIPO VEHÍCULO</p>

              <ScrollArea className='h-[260px]'>
                <div className='flex flex-col space-y-2 w-full'>
                  <ToggleGroupItem value='car' aria-label='Toggle bold'>
                    <div className='flex flex-col justify-start w-full py-2 px-3 gap-1'>
                      <div className='gap-1'>
                        <div className='flex flex-row gap-2'>
                          <Car size={24} strokeWidth={1.5} />
                          <p className='font-normal text-base tracking-widest'>
                            CARRO
                          </p>
                          -
                          <p className='font-normal text-base italic'>
                            23 cupos
                          </p>
                        </div>
                      </div>
                      <p className='text-start text-base'>
                        $200 <span className='italic font-light'> / min.</span>
                      </p>
                    </div>
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value='motorcycle'
                    aria-label='Toggle italic'
                  >
                    <div className='flex flex-col justify-start w-full py-2 px-3 gap-1'>
                      <div className='gap-1'>
                        <div className='flex flex-row gap-2'>
                          <PiMotorcycleFill size={24} strokeWidth={1.5} />
                          <p className='font-normal font-base text-base tracking-widest'>
                            MOTO
                          </p>
                          -
                          <p className='font-normal text-base italic '>
                            31 cupos
                          </p>
                        </div>
                      </div>
                      <p className='text-start text-base'>
                        $150 <span className='italic font-light'> / min.</span>
                      </p>
                    </div>
                  </ToggleGroupItem>

                  <ToggleGroupItem value='byke' aria-label='Toggle underline'>
                    <div className='flex flex-col justify-start w-full py-2 px-3 gap-1'>
                      <div className='gap-1'>
                        <div className='flex flex-row gap-2'>
                          <Bike size={22} strokeWidth={1.5} />
                          <p className='font-normal text-base tracking-widest'>
                            BICICLETA
                          </p>
                          -
                          <p className='font-normal text-base italic '>
                            55 cupos
                          </p>
                        </div>
                      </div>
                      <p className='text-start text-base'>
                        $10 <span className='italic font-light'> / min.</span>
                      </p>
                    </div>
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value='nube'
                    aria-label='Toggle underline'
                  >
                    <div className='flex flex-col justify-start w-full py-2 px-3 gap-1' >
                      <div className='gap-1'>
                        <div className='flex flex-row gap-2'>
                          <Cloud size={22} strokeWidth={1.5} />
                          <p className='font-normal text-base font-base tracking-widest'>
                            NUBE VOLADORA
                          </p>
                          -
                          <p className='font-normal text-base italic '>
                            ∞ cupos
                          </p>
                        </div>
                      </div>
                      <p className='text-start text-base'>
                        Ƶ10 <span className='italic font-light'> / min.</span>
                      </p>
                    </div>
                  </ToggleGroupItem>
                  <ToggleGroupItem value='heavy' aria-label='Toggle underline'>
                    <div className='flex flex-col justify-start w-full py-2 px-3 gap-1'>
                      <div className='gap-1'>
                        <div className='flex flex-row gap-2'>
                          <Tractor size={22} strokeWidth={1.5} />
                          <p className='font-normal text-base font-base tracking-widest'>
                            VEHíCULO PESADO
                          </p>
                          -
                          <p className='font-normal text-base italic '>
                            4 cupos
                          </p>
                        </div>
                      </div>
                      <p className='text-start text-base'>
                        $400 <span className='italic font-light'> / min.</span>
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
          <div className=' text-base'>
            <h2 className='tracking-widest text-lg'>RESUMEN</h2>
            <div className='flex'>
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
            <SheetTrigger asChild>
              <PrimaryButton text='RESERVAR PARQUEADERO' onClick={() => {}} />
            </SheetTrigger>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default BookingSheet
