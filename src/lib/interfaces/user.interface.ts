import { CreditCard } from './creditCard.model'

export interface UserInterface {
  id?: string
  email: string
  password?: string
  firstName: string
  secondName?: string
  firstLastname: string
  secondLastname: string
  loginAttempts?: number
  accountActive?: boolean
  accountBlocked?: boolean
  roleList: [
    'USUARIO' | 'GERENTE' | 'FUNCIONARIO'
  ],
  creditCard?: CreditCard
}

