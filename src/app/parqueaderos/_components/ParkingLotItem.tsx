import { Badge } from '@/components/ui/badge'
import { Bike, Car } from 'lucide-react'
import { PiMotorcycleFill } from 'react-icons/pi'
import BookingSheet from './BookingSheet'
import { Dispatch, SetStateAction } from 'react'
import { ParkingInterface } from '@/lib/interfaces/parking.interface'

const ParkingLotItem = ({
  id,
  nombre,
  direccion,
  ciudad,
  cuposVehiculos,
  cuposMotos,
  cuposBicicletas,
  lat,
  lng,
  isSelected,
  setSelectedParkingLot,
}: {
  id: string
  nombre: string
  direccion: string
  ciudad: string
  cuposVehiculos: number
  cuposMotos: number
  cuposBicicletas: number
  lat: number
  lng: number
  isSelected?: boolean
  setSelectedParkingLot: Dispatch<SetStateAction<ParkingInterface | null>>
}) => {
  return (
    <div
      className={`duration-500 border border-primary p-4 ${
        isSelected
          ? 'bg-blueFPC-400 text-white'
          : 'hover:bg-muted'
      }`}
      key={id}
      onClick={() => {
        setSelectedParkingLot({
          id,
          nombre,
          direccion,
          ciudad,
          cuposVehiculos,
          cuposMotos,
          cuposBicicletas,
          lat,
          lng,
        })
      }}
    >
      <div className='col-span-8'>
        <h2 className='uppercase tracking-widest font-medium text-lg overflow-hidden text-ellipsis truncate '>
          {nombre}
        </h2>
        <div className=' text-sm'>
          <div className='leading-tight'>
            <p className=''>{direccion}</p>
            <p className='font-medium'>{ciudad}</p>
          </div>
          <div className='flex flex-row gap-2'>
            Cupos:
            <div className='flex flex-row gap-x-3'>
              <p className='flex flex-row gap-0.5'>
                <Car size={20} strokeWidth={1.3} />
                {cuposVehiculos}
              </p>
              <p className='flex flex-row gap-0.5'>
                <PiMotorcycleFill size={21} strokeWidth={1.3} />
                {cuposMotos}
              </p>
              <p className='flex flex-row gap-0.5'>
                <Bike size={19} strokeWidth={1.3} />
                {cuposBicicletas}
              </p>
            </div>
          </div>
          <div className='flex flex-row gap-1 py-1 flex-wrap'>
            <Badge variant='secondary'>Cubiertos</Badge>
            <Badge>Cubiertos</Badge>
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
