import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Lấy token từ cookie hoặc header
  const token = request.cookies.get("token")?.value || null

  // Các route công khai không cần authentication
  const publicRoutes = ["/", "/shop", "/blog", "/contact", "/product"]
  const authRoutes = ["/sign-in", "/sign-up"]

  // Kiểm tra nếu đang ở route auth và đã có token -> redirect về home
  if (authRoutes.some((route) => pathname.startsWith(route))) {
    if (token) {
      return NextResponse.redirect(new URL("/", request.url))
    }
    return NextResponse.next()
  }

  // Các route cần authentication
  const protectedRoutes = [
    "/profile",
    "/change-info",
    "/change-password",
    "/orders",
    "/shipping",
    "/dashboard",
  ]

  // Kiểm tra nếu đang ở protected route và chưa có token -> redirect về sign-in
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!token) {
      const signInUrl = new URL("/sign-in", request.url)
      signInUrl.searchParams.set("redirect", pathname)
      return NextResponse.redirect(signInUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
