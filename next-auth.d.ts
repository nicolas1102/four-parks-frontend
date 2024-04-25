import { DefaultSession, DefaultUser } from "next-auth"
import { JWT, DefaultJWT } from "next-auth/jwt"

declare module "next-auth/jwt" {
  // Configuracion de token
  interface JWT {
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
  // Configuracion de session
  interface Session {
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
