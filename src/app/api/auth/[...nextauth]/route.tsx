import { getAuthorizedUserRequest } from '@/app/api/routers/users.router'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const handler = NextAuth({
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
          if (!userFound) throw new Error('Credenciales invalidas.')
          if (userFound?.jwt) {
            // TODO: Borrar esto cuando el back envie el rol
            const userWithRole = {...userFound, role: 'USUARIO'}

            // lo guarda en el token (luego el token lo guarda en la sesión, esto mas abajo en el callback session)            
            return userWithRole
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
    async jwt({ user, token }) {
      if (user) {
        token.user = user
        // token.role = user.role
      }
      return token
    },
    // para configurar los datos que se peueden usar en client
    session({ session, token }) {
      if (session?.user) session.user = token.user as any
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

export { handler as GET, handler as POST }
