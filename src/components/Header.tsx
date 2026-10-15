"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabase } from "@/lib/supabase/client";

const navItems = [
  { href: "/", label: "Início" },
  { href: "/materiais", label: "Materiais" },
  { href: "/cardapio", label: "Cardápio" },
  { href: "/gremio", label: "Grêmio" },
  { href: "/enquetes", label: "Enquetes" },
  { href: "/feira", label: "Feira" },
  { href: "/faq", label: "Dúvidas" },
  { href: "/sugestoes", label: "Sugestões" },
];

export default function Header() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    async function checkUser() {
      try {
        const supabase = getSupabase();
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          setUserEmail(null);
          setRole(null);
          return;
        }

        setUserEmail(user.email ?? null);

        // tenta ler o perfil; se não existir, cria com role do metadata
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .maybeSingle();

        if (profile?.role) {
          setRole(profile.role);
        } else {
          const metaRole =
            (user.user_metadata?.role as string) || "ALUNO";
          await supabase.from("profiles").upsert({
            id: user.id,
            email: user.email,
            full_name: user.user_metadata?.full_name || "",
            role: metaRole,
          });
          setRole(metaRole);
        }
      } catch {
        setUserEmail(null);
        setRole(null);
      }
    }

    checkUser();

    try {
      const supabase = getSupabase();
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange(() => {
        checkUser();
      });
      return () => subscription.unsubscribe();
    } catch {
      return;
    }
  }, []);

  async function handleLogout() {
    const supabase = getSupabase();
    await supabase.auth.signOut();
    setUserEmail(null);
    setRole(null);
    window.location.href = "/login";
  }

  const isAdmin = role === "ADMIN";

  return (
    <header className="bg-white border-b border-border sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between gap-3">
        <Link href="/" className="flex items-center shrink-0">
          {!logoError ? (
            <Image
              src="/logo.png"
              alt="Logo do colégio"
              width={40}
              height={40}
              className="rounded-full"
              priority
              onError={() => setLogoError(true)}
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-secondary text-white flex items-center justify-center text-[10px] font-bold">
              LZ
            </div>
          )}
        </Link>

        {/* Nav desktop — compacta */}
        <nav className="hidden md:flex items-center gap-0.5 text-[12px] font-medium text-foreground/70">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-2 py-1.5 rounded-md hover:text-primary hover:bg-primary-soft transition-colors"
            >
              {item.label}
            </Link>
          ))}
          {isAdmin && (
            <Link
              href="/admin"
              className="ml-1 px-2.5 py-1.5 rounded-md bg-secondary text-white hover:opacity-90 transition-opacity"
            >
              Admin
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-2">
          {userEmail ? (
            <button
              type="button"
              onClick={handleLogout}
              className="hidden sm:inline text-[11px] text-muted hover:text-primary px-2 py-1"
              title={userEmail}
            >
              Sair
            </button>
          ) : (
            <Link
              href="/login"
              className="text-[11px] font-semibold px-3 py-1.5 rounded-lg bg-primary text-white"
            >
              Entrar
            </Link>
          )}

          <button
            type="button"
            className="md:hidden p-1.5 rounded-md hover:bg-primary-soft"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="md:hidden border-t border-border bg-white px-4 py-2 flex flex-col">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-2 py-2.5 text-sm rounded-md hover:bg-primary-soft"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          {isAdmin && (
            <Link
              href="/admin"
              className="px-2 py-2.5 text-sm font-semibold text-secondary"
              onClick={() => setMenuOpen(false)}
            >
              Painel Admin
            </Link>
          )}
          {userEmail && (
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                handleLogout();
              }}
              className="px-2 py-2.5 text-sm text-left text-muted"
            >
              Sair
            </button>
          )}
        </nav>
      )}
    </header>
  );
}
