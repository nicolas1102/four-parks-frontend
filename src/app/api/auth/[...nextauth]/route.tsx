import { getAuthorizedUserRequest } from '@/app/api/routers/users.router'
import NextAuth, { User } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const authOptions = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      // lo que esperamos
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'youremail@gmai.com',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: '**********',
        },
      },
      // req son datos adicionales de la aplicación (ejemplo, las cookies)
      async authorize(credentials, req) {
        try {
          const { email, password } = credentials as {
            email: string
            password: string
          }
          const userFound = await getAuthorizedUserRequest(email, password)
          if (userFound?.response?.data) {
            throw new Error(userFound?.response?.data)
          }
          if (userFound?.jwt) {
            const userWithRole = {
              ...userFound,
              // expires: 'expires',
            }
            return userWithRole // lo guarda en el token (luego el token lo guarda en la sesión, esto mas abajo en el callback session)
          }
          // If response is not ok or does not contain a user token
          throw new Error('No se encontro el token.')
        } catch (e: any) {
          return Promise.reject(new Error(e?.message))
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id as number
        token.jwt = user.jwt
        token.rol = user.rol
        token.ip = user.ip
        token.email = user.email
        token.firstName = user.firstName
        token.secondName = user.secondName
        token.firstLastname = user.firstLastname
        token.secondLastname = user.secondLastname
      }
      return token
    },
    // para configurar los datos que se peueden usar en client
    session({ token, session }) {
      if (token) {
        session.id = token.id
        session.rol = token.rol
        session.ip = token.ip
        session.jwt = token.jwt
        session.email = token.email
        session.secondName = token.secondName
        session.firstName = token.firstName
        session.firstLastname = token.firstLastname
        session.secondLastname = token.secondLastname
      }
      return session
    },
  },
  pages: {
    signIn: '/auth/log-in',
    signOut: '/auth/log-in',
  },
  session: {
    strategy: 'jwt',
  },
})

export { authOptions as GET, authOptions as POST }
