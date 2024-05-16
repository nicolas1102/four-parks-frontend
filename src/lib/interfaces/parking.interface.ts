import { LocationInterface } from './location.interface'
import { OpeningHoursInterface } from './openingHours.interface'
import { ParkingTypeInterface } from './parkingType.interface'
import { UserInterface } from './user.interface'

export interface ParkingInterface {
  id?: number
  name: string
  adminId?: string
  location: LocationInterface
  // arreglar esto
  loyalty: boolean | string
  car_slots: number
  bicycle_slots: number
  motorcycle_slots: number
  heavy_vehicle_slots: number
  openingHours: OpeningHoursInterface
  parkingType: ParkingTypeInterface
  // admin?: UserInterface
  total_slots: string
  available_slots?: string
}

