import { DefaultSession, DefaultUser } from "next-auth"
import { JWT, DefaultJWT } from "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    user: {
      // id: string,
      // email: string,
      // firstName: string,
      // firstLastname: string,
      // role: string,
      // jwt: string,
      // status: boolean
      username: string,
      message: string,
      jwt: string,
      status: boolean,
      role: string,
    } & DefaultSession
  }

  interface User extends DefaultUser {
    username: string,
    message: string,
    jwt: string,
    status: boolean,
    role: string,
    expires: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    user: {
      username: string,
      message: string,
      jwt: string,
      status: boolean,
      role: string,
      expires: string;
    } & DefaultSession
  }
}