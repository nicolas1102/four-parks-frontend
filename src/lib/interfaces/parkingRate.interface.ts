import { ParkingInterface } from './parking.interface'
import { VehicleTypeInterface } from './vehicleType.interface'

export interface ParkingRateInterface {
  id?: string
  parking: ParkingInterface
  vehicleType: VehicleTypeInterface
  rate: number
}

