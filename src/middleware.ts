import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Arquivos estáticos e API de moderação
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") // logo.png, favicon, etc.
  ) {
    return NextResponse.next();
  }

  // Única página pública: login
  if (pathname.startsWith("/login")) {
    return NextResponse.next();
  }

  // Procura cookie de sessão do Supabase
  const cookies = request.cookies.getAll();
  const hasSession = cookies.some(
    (c) =>
      c.name.includes("auth-token") ||
      c.name.startsWith("sb-") ||
      c.name.includes("supabase")
  );

  if (!hasSession) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
