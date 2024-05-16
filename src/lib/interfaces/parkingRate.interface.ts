import { ParkingInterface } from './parking.interface'
import { VehicleTypeInterface } from './vehicleType.interface'

export interface ParkingRateInterface {
  id?: string
  rate: string
  parkingId: number
  vehicleTypeId: VehicleTypeInterface
}

