export interface User {
  id?: string
  email: string
  password: string
  firstName: string
  secondName?: string
  firstLastname: string
  secondLastname: string
  loginAttempts?: number
  isActive?: boolean
  isFirstTime?: boolean
  roleRequest: {
    roleListName: [
      'USER' | 'GERENTE' | 'FUNCIONARIO'
    ],
  },
}

