import { LocationInterface } from './location.interface'
import { OpeningHoursInterface } from './openingHours.interface'
import { ParkingTypeInterface } from './parkingType.interface'
import { UserInterface } from './user.interface'

export interface ParkingInterface {
  id?: number
  name: string
  total_slots: number
  available_slots?: number
  car_slots: number
  bicycle_slots: number
  motorcycle_slots: number
  heavy_vehicle_slots: number
  loyalty: boolean
  location: LocationInterface
  openingHours: OpeningHoursInterface
  parkingType: ParkingTypeInterface
  admin?: UserInterface
}