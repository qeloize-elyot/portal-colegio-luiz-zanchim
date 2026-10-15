import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Rotas públicas
  if (
    pathname.startsWith("/login") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") // arquivos estáticos (logo, favicon, etc.)
  ) {
    return NextResponse.next();
  }

  // Verifica se existe cookie de sessão do Supabase
  const hasSession =
    request.cookies.getAll().some((c) =>
      c.name.includes("auth-token") || c.name.startsWith("sb-")
    );

  if (!hasSession) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
