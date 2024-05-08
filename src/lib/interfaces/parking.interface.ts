import { LocationInterface } from './location.interface'
import { OpeningHoursInterface } from './openingHours.interface'
import { ParkingTypeInterface } from './parkingType.interface'

// export interface ParkingInterface {
//   id: string
//   nombre: string
//   direccion: string
//   ciudad: string
//   cuposVehiculos: number
//   cuposBicicletas: number
//   cuposMotos: number
//   lat: number
//   lng: number
// }


// TODO: Actualizar esto
export interface ParkingInterface {
  id?: string
  location: LocationInterface
  // parkingType: ParkingTypeInterface
  // openingHours: OpeningHoursInterface
  name: string
  totalSlots: number
  availableBikeSlots: number,
  availableMotorcicleSlots: number,
  availableCarSlots: number,
  loyalty: boolean
}

