import { withAuth, NextRequestWithAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(request: NextRequestWithAuth) {

    if (request.nextUrl.pathname.startsWith("/usuario")
      && request.nextauth.token?.rol !== "ADMINISTRADOR"
      && request.nextauth.token?.rol !== "GERENTE"
      && request.nextauth.token?.rol !== "USUARIO"
    ) {
      return NextResponse.rewrite(
        new URL("/auth/unauthorized", request.url)
      )
    }

    if (request.nextUrl.pathname.startsWith("/admin")
      && request.nextauth.token?.rol !== "ADMINISTRADOR"
      && request.nextauth.token?.rol !== "GERENTE"
    ) {
      return NextResponse.rewrite(
        new URL("/auth/unauthorized", request.url)
      )
    }

    if (request.nextUrl.pathname.startsWith("/parqueaderos")
      && request.nextauth.token?.rol !== "USUARIO") {
      return NextResponse.rewrite(
        new URL("/auth/unauthorized", request.url)
      )
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    },
  }
)

export const config = {
  matcher: [
    "/admin/:path*",
    '/parqueaderos/:path*',
    '/usuario'
  ]
};