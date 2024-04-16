export interface User {
  id?: string
  email: string
  password: string
  firstName: string
  secondName?: string
  firstSurname: string
  secondSurname: string
  loginAttempts?: number
  isActive?: boolean
  isFirstTime?: boolean
  role: 'USUARIO' | 'GERENTE' | 'FUNCIONARIO'
}

