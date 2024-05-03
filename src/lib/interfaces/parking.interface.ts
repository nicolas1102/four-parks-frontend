import { LocationInterface } from './location.interface'
import { OpeningHoursInterface } from './openingHours.interface'
import { ParkingTypeInterface } from './parkingType.interface'

export interface ParkingInterface {
  id: string
  nombre: string
  direccion: string
  ciudad: string
  cuposVehiculos: number
  cuposBicicletas: number
  cuposMotos: number
  imagen: string
  lat: number
  lng: number
}

export interface ParkingLotInterface {
  id?: string
  location: LocationInterface
  parkingType: ParkingTypeInterface
  openingHours: OpeningHoursInterface
  name: string
  totalSlots: number
  availableSlots: number
  loyalty: boolean
}

