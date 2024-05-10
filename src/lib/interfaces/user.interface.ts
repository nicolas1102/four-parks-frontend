import { CreditCard } from './creditCard.model'
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
  loginAttempts?: number
  accountActive?: boolean
  accountBlocked?: boolean
  roleList: RoleType[],
  creditCard?: CreditCard
}
