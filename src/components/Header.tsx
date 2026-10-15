"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getSupabase } from "@/lib/supabase/client";

const navItems = [
  { href: "/", label: "Início" },
  { href: "/materiais", label: "Materiais" },
  { href: "/cardapio", label: "Cardápio" },
  { href: "/gremio", label: "Grêmio" },
  { href: "/enquetes", label: "Enquetes" },
  { href: "/feira", label: "Feira de Trocas" },
  { href: "/calculadora", label: "Calculadora" },
  { href: "/faq", label: "Dúvidas" },
  { href: "/sugestoes", label: "Sugestões" },
];

const atalhos = [
  { href: "/materiais", label: "Materiais", emoji: "📚" },
  { href: "/cardapio", label: "Cantina", emoji: "🍎" },
  { href: "/gremio", label: "Grêmio", emoji: "📣" },
  { href: "/feira", label: "Feira", emoji: "🔄" },
  { href: "/sugestoes", label: "Ouvidoria", emoji: "💬" },
];

export default function Header() {
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

        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .maybeSingle();

        if (profile?.role) {
          setRole(profile.role);
        } else {
          const metaRole = (user.user_metadata?.role as string) || "ALUNO";
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
      <div className="max-w-5xl mx-auto px-3 sm:px-4 h-[72px] flex items-center gap-2 sm:gap-3">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 shrink-0 group"
          onClick={() => setMenuOpen(false)}
        >
          {!logoError ? (
            <Image
              src="/logo.png"
              alt="Logo do colégio"
              width={54}
              height={54}
              className="rounded-full ring-2 ring-primary/20 group-hover:ring-primary/45 transition-all"
              priority
              onError={() => setLogoError(true)}
            />
          ) : (
            <div className="w-[54px] h-[54px] rounded-full bg-secondary text-white flex items-center justify-center text-xs font-bold">
              LZ
            </div>
          )}
          <div className="hidden md:block leading-tight">
            <p className="text-[13px] font-bold text-foreground">Portal LZ</p>
            <p className="text-[10px] text-muted">comunidade escolar</p>
          </div>
        </Link>

        {/* Faixa criativa no meio — atalhos com ícones */}
        <div className="flex-1 flex items-center justify-center min-w-0">
          <div className="hidden sm:flex items-center gap-1 bg-gradient-to-r from-primary-soft via-[#fdf0e6] to-secondary-soft rounded-2xl px-2 py-1.5 border border-border/60">
            {atalhos.map((a) => (
              <Link
                key={a.href}
                href={a.href}
                className="flex flex-col items-center justify-center w-[52px] py-1 rounded-xl hover:bg-white/80 transition-colors"
                title={a.label}
              >
                <span className="text-base leading-none">{a.emoji}</span>
                <span className="text-[9px] font-medium text-foreground/70 mt-0.5 truncate max-w-full">
                  {a.label}
                </span>
              </Link>
            ))}
          </div>
          {/* mobile: bolinhas decorativas */}
          <div className="flex sm:hidden items-center gap-1.5 opacity-80">
            <span className="w-2.5 h-2.5 rounded-full bg-primary" />
            <span className="w-2.5 h-2.5 rounded-full bg-accent" />
            <span className="w-2.5 h-2.5 rounded-full bg-secondary" />
            <span className="h-[3px] w-10 rounded-full bg-gradient-to-r from-primary to-secondary" />
          </div>
        </div>

        {/* Direita */}
        <div className="flex items-center gap-1.5 shrink-0">
          {isAdmin && (
            <Link
              href="/admin"
              className="text-[11px] font-semibold px-2.5 py-1.5 rounded-lg bg-secondary text-white"
              onClick={() => setMenuOpen(false)}
            >
              Admin
            </Link>
          )}
          <button
            type="button"
            className="inline-flex items-center gap-1 text-[12px] font-medium px-2.5 py-1.5 rounded-lg border border-border hover:bg-primary-soft"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
            aria-expanded={menuOpen}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
            Menu
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-border bg-white shadow-sm">
          <nav className="max-w-5xl mx-auto px-4 py-3 grid grid-cols-2 sm:grid-cols-3 gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2.5 text-sm rounded-lg hover:bg-primary-soft hover:text-primary"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            {userEmail ? (
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  handleLogout();
                }}
                className="px-3 py-2.5 text-sm rounded-lg text-left text-muted hover:bg-primary-soft"
              >
                Sair
              </button>
            ) : (
              <Link
                href="/login"
                className="px-3 py-2.5 text-sm rounded-lg font-semibold text-primary"
                onClick={() => setMenuOpen(false)}
              >
                Entrar
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
