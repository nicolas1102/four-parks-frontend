import { DefaultSession, DefaultUser } from "next-auth"
import { JWT, DefaultJWT } from "next-auth/jwt"

declare module "next-auth/jwt" {
  // Configuracion de token
  interface JWT {
    id: number,
    email: string,
    jwt: string,
    ip: string,
    rol: string,
    firstName: string,
    secondName: string,
    firstLastname: string,
    secondLastname: string,
  }
}
declare module "next-auth" {
  interface Session {
    id: number,
    email: string,
    jwt: string,
    ip: string,
    rol: string,
    firstName: string,
    secondName: string,
    firstLastname: string,
    secondLastname: string,
  }

  interface User extends DefaultUser {
    id: number,
    email: string,
    jwt: string,
    ip: string,
    rol: string,
    firstName: string,
    secondName: string,
    firstLastname: string,
    secondLastname: string,
  }
}
