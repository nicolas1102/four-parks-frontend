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
        password: { label: 'Password', type: 'password', placeholder: '**********' },
      },
      // req son datos adicionales de la aplicación (ejemplo, las cookies)
      async authorize(credentials, req) {
        const user = { id: '1', email: 'jsmith@example.com', password: 'mipassword' }

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
})

export { handler as GET, handler as POST }
