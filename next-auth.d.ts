// Ref: https://next-auth.js.org/getting-started/typescript#module-augmentation

import { DefaultSession, DefaultUser } from "next-auth"
import { JWT, DefaultJWT } from "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    user: {
      id: string,
      email: string,
      firstName: string,
      firstLastname: string,
      role: string,
      jwt: string,
      status: boolean
    } & DefaultSession
  }
}