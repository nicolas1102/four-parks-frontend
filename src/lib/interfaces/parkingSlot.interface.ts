import { ParkingLotInterface } from './parking.interface'

export interface ParkingSlotInterface {
  id?: string
  parking: ParkingLotInterface
  status: string
  allowedType: string
}

