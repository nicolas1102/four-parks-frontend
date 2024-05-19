import { ParkingInterface } from './parking.interface'
import { VehicleTypeInterface } from './vehicleType.interface'

export interface ParkingSlotDetailInterface {
  emptySlots: number
  slotType: 'CARRO' | 'MOTO' | 'BICICLETA' | 'VEHICULO_PESADO'
}

