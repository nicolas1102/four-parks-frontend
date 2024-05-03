import { Badge } from '@/components/ui/badge'
import { Bike, Car } from 'lucide-react'
import Image from 'next/image'
import { PiMotorcycleFill } from 'react-icons/pi'
import BookingSheet from './BookingSheet'
import { Dispatch, SetStateAction } from 'react'
import { ParkingLotInterface } from '@/lib/interfaces/parkingLot.interface'

const ParkingLotItem = ({
  id,
  imagen,
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
  imagen: string
  nombre: string
  direccion: string
  ciudad: string
  cuposVehiculos: number
  cuposMotos: number
  cuposBicicletas: number
  lat: number
  lng: number
  isSelected?: boolean
  setSelectedParkingLot: Dispatch<SetStateAction<ParkingLotInterface | null>>
}) => {
  return (
    <div
      className={`duration-500 border ${
        isSelected
          ? 'bg-blueFPC-400 border-primary text-white'
          : 'border-transparent hover:bg-muted'
      }`}
      key={id}
      onClick={() => {
        setSelectedParkingLot({
          id,
          imagen,
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
      <div className='col-span-4 relative overflow-hidden m-3 aspect-square border border-primary'>
        <Image
          src={imagen}
          className='w-full h-full object-cover object-center '
          alt='thank you for your order'
          priority
          width='500'
          height='500'
        />
      </div>
      <div className='col-span-8 px-4'>
        <h2 className='uppercase tracking-widest font-medium text-lg overflow-hidden text-ellipsis truncate'>
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
          <div className='py-3'>
            <BookingSheet />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ParkingLotItem
