import { withAuth, NextRequestWithAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    
    if ((request.nextUrl.pathname.startsWith("/admin")
      || request.nextUrl.pathname.startsWith("/usuario"))
      && request.nextauth.token?.role !== "FUNCIONARIO"
      && request.nextauth.token?.role !== "GERENTE"
      // TODO: DESPUES QUITAR ESTO Y REVISAR LAS RUTAS PERMITIDAS
      && request.nextauth.token?.role !== "USUARIO"
    ) {
      return NextResponse.rewrite(
        new URL("/auth/unauthorized", request.url)
      )
    }

    if (request.nextUrl.pathname.startsWith("/parqueaderos")
      && request.nextauth.token?.role !== "USUARIO") {
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
    '/parqueaderos/:path*'
  ]
};