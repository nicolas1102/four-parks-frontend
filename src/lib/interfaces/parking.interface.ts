import { LocationInterface } from './location.interface'
import { OpeningHoursInterface } from './openingHours.interface'
import { ParkingTypeInterface } from './parkingType.interface'

export interface ParkingInterface {
  id?: number
  name: string
  location: LocationInterface
  admin?: string
  available_slots: string
  //availableSlots: number
  total_slots: string
  // totalSlots: number
  openingHours: OpeningHoursInterface
  loyalty: string
  // loyalty: boolean
  parkingType: ParkingTypeInterface
  // availableBikeSlots: number
  // availableMotorcicleSlots: number
  // availableCarSlots: number
}

