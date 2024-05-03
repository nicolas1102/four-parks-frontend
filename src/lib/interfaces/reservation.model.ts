import { InvoiceInterface } from './invoice.interface'
import { ParkingSlotInterface } from './parkingSlot.interface'
import { UserInterface } from './user.interface'
import { VehicleTypeInterface } from './vehicleType.interface'

export interface Reservation {
  id?: string
  user: UserInterface
  parkingSlot: ParkingSlotInterface
  vehicleType: VehicleTypeInterface
  invoice: InvoiceInterface
  reservationTime: Date
  reservationStartTime: Date
  reservationEndTime: Date
  totalPrice: number
}

