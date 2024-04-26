export interface ParkingLotInterface {
  id?: string
  name: string
  lastName: string
  email: string
  defaultPassword: string
  password: string
  loginAttempts: number
  isBlocked: boolean
  isUnactivaded: boolean
  isShowed: boolean
}

