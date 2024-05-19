import { ParkingInterface } from './parking.interface'

export interface ParkingSlotInterface {
  id?: string
  parkingId?: ParkingInterface
  parking?: ParkingInterface
  slotStatusId: {
    id?: number
    status: string
  }
  vehicleTypeId: {
    id?: number
    type: string
  }
}

