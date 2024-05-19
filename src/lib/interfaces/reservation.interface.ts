import { InvoiceInterface } from './invoice.interface'
import { ParkingSlotInterface } from './parkingSlot.interface'
import { UserInterface } from './user.interface'
import { VehicleTypeInterface } from './vehicleType.interface'

export interface ReservationInterface {
  id?: number
  reservationTime: string
  reservationStartTime?: string
  reservationEndTime?: string
  userId?: number
  user?: UserInterface
  parkingSlotId?: number
  parkingSlot?: ParkingSlotInterface
  totalPrice?: number
  // invoice: InvoiceInterface
  // totalPrice: number
}

