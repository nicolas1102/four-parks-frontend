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
            // TODO: Borrar esto cuando el back envie el rol
            const userWithRole = {
              ...userFound,
              role: 'FUNCIONARIO',
              expires: 'expires',
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
        // TODO: Solucionar esto
        token.role = user.role
        token.jwt = user.jwt
        token.role = user.role
        token.ip = user.ip
      }
      return token
    },
    // para configurar los datos que se peueden usar en client
    session({ token, session }) {      
      if (token) {
        session.role = token.role
        session.ip = token.ip
        session.jwt = token.jwt
        session.email = token.email
        // session.user.id = token.id
        // session.user.firstName = token.firstName
        // session.user.firstLastname = token.firstLastname
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
