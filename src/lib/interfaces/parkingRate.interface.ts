import { VehicleTypeInterface } from './vehicleType.interface'

export interface ParkingRateInterface {
  id?: number
  rate: number
  parkingId: number
  vehicleTypeId: VehicleTypeInterface
}

