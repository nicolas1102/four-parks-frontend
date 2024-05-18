import { Badge } from '@/components/ui/badge'
import { Bike, Car, Tractor } from 'lucide-react'
import { PiMotorcycleFill } from 'react-icons/pi'
import BookingSheet from './BookingSheet'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { ParkingInterface } from '@/lib/interfaces/parking.interface'
import { cn } from '@/lib/utils'

const ParkingItem = ({
  parkingData,
  isSelected,
  setSelectedParkingLot,
}: {
  parkingData: ParkingInterface
  isSelected?: boolean
  setSelectedParkingLot: Dispatch<SetStateAction<ParkingInterface | null>>
}) => {
  return (
    <div
      className={`duration-500 border border-primary pt-1 pb-2 px-2 sm:p-4 ${
        isSelected ? 'bg-blueFPC-300 text-black' : 'hover:bg-muted'
      }`}
      key={parkingData.id}
      onClick={() => {
        setSelectedParkingLot(parkingData)
      }}
    >
      <div className='col-span-8'>
        <h2 className='uppercase tracking-widest text-sm sm:text-lg overflow-hidden text-ellipsis truncate '>
          {parkingData.name}
        </h2>{' '}
        <div className='flex flex-row gap-1 py-1 flex-wrap'>
          {parkingData.loyalty && (
            <Badge className='bg-yellowFPC-400 text-black hover:text-white border border-primary'>
              Lealtad
            </Badge>
          )}
          <Badge>
            <p className='capitalize'>
              {parkingData.parkingType.type.toLocaleLowerCase()}
            </p>
          </Badge>
        </div>
        <div className='sm:text-sm text-xs'>
          <div className='leading-tight'>
            <p className=''>{parkingData.location.address}</p>
            <p className='font-medium'>{parkingData.location.city.city}</p>
            <p className='font-medium'>
              Horario:{' '}
              <span className='font-normal'>
                {parkingData.openingHours.openTime.substring(0, 5) +
                  ' - ' +
                  parkingData.openingHours.closeTime.substring(0, 5)}
              </span>
            </p>
          </div>

          <div className='flex flex-row gap-x-2 sm:gap-x-3 items-center'>
            <p className='sm:text-sm text-xs'>Cupos: </p>
            {parkingData.parkingSlotDetails?.map((parkingSlotDetailItem) => {
              if (parkingSlotDetailItem.slotType === 'CARRO') {
                return (
                  <p
                    key={parkingSlotDetailItem.slotType}
                    className={cn(
                      'flex flex-col justify-center text-center gap-[1px]',
                      {
                        'text-redFPC-400 font-medium':
                          parkingSlotDetailItem.emptySlots <= 5,
                      }
                    )}
                  >
                    <Car className='sm:w-5 sm:h-5 w-4 h-4' strokeWidth={1.3} />
                    {parkingSlotDetailItem.emptySlots}
                  </p>
                )
              } else if (parkingSlotDetailItem.slotType === 'MOTO') {
                return (
                  <p
                    key={parkingSlotDetailItem.slotType}
                    className={cn(
                      'flex flex-col justify-center text-center gap-0.5',
                      {
                        'text-redFPC-400 font-medium':
                          parkingSlotDetailItem.emptySlots <= 5,
                      }
                    )}
                  >
                    <PiMotorcycleFill className='sm:w-5 sm:h-5 w-4 h-4' strokeWidth={1.3} />
                    {parkingSlotDetailItem.emptySlots}
                  </p>
                )
              } else if (parkingSlotDetailItem.slotType === 'BICICLETA') {
                return (
                  <p
                    key={parkingSlotDetailItem.slotType}
                    className={cn(
                      'flex flex-col justify-center text-center gap-0.5',
                      {
                        'text-redFPC-400 font-medium':
                          parkingSlotDetailItem.emptySlots <= 5,
                      }
                    )}
                  >
                    <Bike className='sm:w-5 sm:h-5 w-4 h-4' strokeWidth={1.3} />
                    {parkingSlotDetailItem.emptySlots}
                  </p>
                )
              } else if (parkingSlotDetailItem.slotType === 'VEHICULO_PESADO') {
                return (
                  <p
                    key={parkingSlotDetailItem.slotType}
                    className={cn(
                      'flex flex-col justify-center text-center gap-0.5',
                      {
                        'text-redFPC-400 font-medium':
                          parkingSlotDetailItem.emptySlots <= 5,
                      }
                    )}
                  >
                    <Tractor className='sm:w-5 sm:h-5 w-4 h-4' strokeWidth={1.3} />
                    {parkingSlotDetailItem.emptySlots}
                  </p>
                )
              }
            })}
          </div>

          <div className='pt-3'>
            <BookingSheet selectedParking={parkingData} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ParkingItem
