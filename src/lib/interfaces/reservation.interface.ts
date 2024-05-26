import { ParkingSlotInterface } from './parkingSlot.interface'
import { UserInterface } from './user.interface'

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
  discount?: boolean
  // invoice: InvoiceInterface
  // totalPrice: number
}

