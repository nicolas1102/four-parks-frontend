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
  isBlocked?: boolean
  roleRequest: {
    roleListName: [
      'USUARIO' | 'GERENTE' | 'FUNCIONARIO'
    ],
  },
}

