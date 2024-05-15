import { ParkingInterface } from './parking.interface'
import { VehicleTypeInterface } from './vehicleType.interface'

export interface ParkingRateInterface {
  id?: string
  rate: number
  parking: ParkingInterface
  vehicleType: VehicleTypeInterface
}

