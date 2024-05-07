import { ParkingInterface } from './parking.interface'

export interface ParkingSlotInterface {
  id?: string
  parking: ParkingInterface
  status: string
  allowedType: string
}

