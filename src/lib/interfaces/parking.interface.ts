import { LocationInterface } from './location.interface'
import { OpeningHoursInterface } from './openingHours.interface'
import { ParkingRateInterface } from './parkingRate.interface'
import { ParkingSlotDetailInterface } from './parkingSlotDetail.interface'
import { ParkingTypeInterface } from './parkingType.interface'
import { UserInterface } from './user.interface'

export interface ParkingInterface {
  id?: number
  name: string
  totalSlots: number
  availableSlots: number
  carSlots: number
  bicycleSlots: number
  motorcycleSlots: number
  heavyVehicleSlots: number
  loyalty: boolean
  location: LocationInterface
  openingHours: OpeningHoursInterface
  parkingType: ParkingTypeInterface
  admin?: UserInterface
  adminId?: number
  parkingRate?: ParkingRateInterface[]
  parkingSlotDetails?: ParkingSlotDetailInterface[]
}