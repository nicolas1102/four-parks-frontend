import { DefaultSession, DefaultUser } from "next-auth"
import { JWT, DefaultJWT } from "next-auth/jwt"

declare module "next-auth/jwt" {
  // Configuracion de token
  interface JWT {
    // id: string,
    // firstName: string,
    // firstLastname: string,
    ip: string,
    email: string,
    jwt: string,
    role: string,
  }
}
declare module "next-auth" {
  // Configuracion de session
  interface Session {
    email: string,
    jwt: string,
    ip: string,
    role: string,
  }

  interface User extends DefaultUser {
    email: string,
    jwt: string,
    ip: string,
    role: string,
    expires: string,
  }
}
