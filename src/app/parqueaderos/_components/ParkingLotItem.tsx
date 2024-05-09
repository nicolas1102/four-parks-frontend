import { Badge } from '@/components/ui/badge'
import { Bike, Car } from 'lucide-react'
import { PiMotorcycleFill } from 'react-icons/pi'
import BookingSheet from './BookingSheet'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { ParkingInterface } from '@/lib/interfaces/parking.interface'

const ParkingLotItem = ({
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
        isSelected ? 'bg-blueFPC-400 text-white' : 'hover:bg-muted'
      }`}
      key={parkingData.id}
      onClick={() => {
        setSelectedParkingLot(parkingData)
      }}
    >
      <div className='col-span-8'>
        <h2 className='uppercase tracking-widest font-medium text-lg overflow-hidden text-ellipsis truncate '>
          {parkingData.name}
        </h2>
        <div className=' text-sm'>
          <div className='leading-tight'>
            <p className=''>{parkingData.location.address}</p>
            <p className='font-medium'>{parkingData.location.city.name}</p>
          </div>
          <div className='flex flex-row gap-2'>
            Cupos:
            <div className='flex flex-row gap-x-3'>
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
            </div>
          </div>
          <div className='flex flex-row gap-1 py-1 flex-wrap'>
            <Badge>Cubierto</Badge>
            {parkingData.loyalty && (
              <Badge className='bg-redFPC-400 text-white border border-primary'>
                Lealtad
              </Badge>
            )}
          </div>
          <div className='pt-3'>
            <BookingSheet />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ParkingLotItem
