export interface User {
  id?: string
  email: string
  password: string
  name: string
  lastName: string
  loginAttempts: number
  isActive: boolean
}

