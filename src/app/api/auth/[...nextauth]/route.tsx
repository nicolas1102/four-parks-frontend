import { getOneUserByEmailAndPasswordRequest } from '@/api/request/users'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const makeFetchAccordingRole = async (
  email: string,
  password: string,
  role: string
) => {
  if (role === 'GERENTE') {
    return await getOneUserByEmailAndPasswordRequest(email, password)
  } else if (role === 'FUNCIONARIO') {
    return await getOneUserByEmailAndPasswordRequest(email, password)
  } else {
    return await getOneUserByEmailAndPasswordRequest(email, password)
  }
}

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
          const { email, password, role } = credentials as {
            email: string
            password: string
            role: string
          }

          const res = await makeFetchAccordingRole(email, password, role)

          if (!res) throw new Error('Credenciales invalidas.')

          if (!res) {
            const user = await res.json()
            if (user?.access_token && user?.refresh_token) {
              // lo guarda en el token (luego el token lo guarda en la sesión, esto mas abajo en el callback session)
              return user
            }
          }
          // If response is not ok or does not contain a user token
          const errorResponse = await res.json()
          return Promise.reject(new Error(errorResponse?.detail))

          // console.log(userFound)
        } catch (e: any) {
          return Promise.reject(new Error(e?.message))
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ user, token }) {
      if (user) token.user = user
      return token
    },
    // para configurar los datos que se peueden usar en client
    session({ session, token }) {
      session.user = token.user as any
      return session
    },
  },
  pages: {
    signIn: '/auth/sign-in',
    signOut: '/auth/sign-in',
  },
})

export { handler as GET, handler as POST }
