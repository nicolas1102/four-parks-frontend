import { Badge } from '@/components/ui/badge'
import { Bike, Car } from 'lucide-react'
import { PiMotorcycleFill } from 'react-icons/pi'
import BookingSheet from './BookingSheet'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { ParkingInterface } from '@/lib/interfaces/parking.interface'

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
      className={`duration-500 border border-primary p-4 ${
        isSelected ? 'bg-yellowFPC-200 ' : 'hover:bg-muted'
      }`}
      key={parkingData.id}
      onClick={() => {
        setSelectedParkingLot(parkingData)
      }}
    >
      <div className='col-span-8'>
        <h2 className='uppercase tracking-widest text-xl overflow-hidden text-ellipsis truncate '>
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
        <div className=' text-sm'>
          <div className='leading-tight'>
            <p className=''>{parkingData.location.address}</p>
            <p className='font-medium'>{parkingData.location.city.city}</p>
            <p className='font-medium'>
              Horario:{' '}
              <span className='font-normal'>
                {parkingData.openingHours.open_time +
                  ' - ' +
                  parkingData.openingHours.close_time}
              </span>
              {/* <span>
                {parkingData.openingHours.openTime +
                  ' - ' +
                  parkingData.openingHours.closeTime}
              </span> */}
            </p>
          </div>
          <div className='flex flex-row gap-2'>
            {parkingData.available_slots &&
            parseInt(parkingData.available_slots) <= 5 ? (
              // {parkingData.available_slots && parkingData.available_slots > 5 ? (
              <p className='text-redFPC-400 font-medium'>
                Cupos: {parkingData.available_slots}
              </p>
            ) : (
              <p>Cupos: {parkingData.available_slots}</p>
            )}

            {/* <div className='flex flex-row gap-x-3'>
              <p className='flex flex-row gap-0.5'>
                <Car size={20} strokeWidth={1.3} />
                {parkingData.availableCarSlots}
              </p>
              <p className='flex flex-row gap-0.5'>
                <PiMotorcycleFill size={21} strokeWidth={1.3} />
                {parkingData.availableMotorcicleSlots}
              </p>
              <p className='flex flex-row gap-0.5'>
                <Bike size={19} strokeWidth={1.3} />
                {parkingData.availableBikeSlots}
              </p>
            </div> */}
          </div>

          <div className='pt-3'>
            <BookingSheet />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ParkingItem
