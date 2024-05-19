import { CreditCard } from './creditCard.interface'
import { RoleType } from './role.interface'

export interface UserInterface {
  id?: number
  email: string
  password?: string
  ip?: string
  firstName: string
  secondName?: string
  firstLastname: string
  secondLastname: string
  accountActive?: boolean
  accountBlocked?: boolean
  loginAttempts?: number
  roleList: RoleType[],
  creditCard?: CreditCard
}
