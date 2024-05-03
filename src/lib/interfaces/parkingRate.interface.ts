import { ParkingLotInterface } from './parking.interface'
import { VehicleTypeInterface } from './vehicleType.interface'

export interface ParkingRateInterface {
  id?: string
  parking: ParkingLotInterface
  vehicleType: VehicleTypeInterface
  rate: number
}

