"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  { href: "/materiais", label: "Materiais", icon: "book", color: "#1e3a8a" },
  { href: "/cardapio", label: "Cantina", icon: "apple", color: "#c45c26" },
  { href: "/gremio", label: "Grêmio", icon: "megaphone", color: "#d97706" },
  { href: "/feira", label: "Feira", icon: "swap", color: "#2f6f4e" },
  { href: "/sugestoes", label: "Ouvidoria", icon: "chat", color: "#1b365d" },
];

function AtalhoSvg({ type, color }: { type: string; color: string }) {
  switch (type) {
    case "book":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
          <rect x="4" y="4" width="16" height="16" rx="3" fill={color} fillOpacity="0.18" />
          <path d="M7 7h10v10H7z" stroke={color} strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M12 7v10" stroke={color} strokeWidth="1.8" />
        </svg>
      );
    case "apple":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
          <circle cx="12" cy="13" r="7" fill={color} fillOpacity="0.18" stroke={color} strokeWidth="1.8" />
          <path d="M12 6c0-2 1.5-3 3-3" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "megaphone":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
          <polygon points="5,10 16,6 16,18 5,14" fill={color} fillOpacity="0.22" stroke={color} strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M19 9a4 4 0 010 6" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "swap":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
          <circle cx="12" cy="12" r="8" fill={color} fillOpacity="0.14" />
          <path d="M7 9h10l-2.5-2.5M17 15H7l2.5 2.5" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "chat":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
          <path d="M5 6h14a2 2 0 012 2v7a2 2 0 01-2 2H9l-4 3v-3H5a2 2 0 01-2-2V8a2 2 0 012-2z" fill={color} fillOpacity="0.18" stroke={color} strokeWidth="1.8" strokeLinejoin="round" />
        </svg>
      );
    default:
      return null;
  }
}

export default function Header() {
  const pathname = usePathname();
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

  // Não exibe o Header na tela de login para manter o visual limpo
  if (pathname?.startsWith("/login")) {
    return null;
  }

  async function handleLogout() {
    const supabase = getSupabase();
    await supabase.auth.signOut();
    setUserEmail(null);
    setRole(null);
    window.location.href = "/login";
  }

  const isAdmin = role === "ADMIN";

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-border sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-3 sm:px-4 h-[76px] flex items-center gap-2 sm:gap-3">
        <Link
          href="/"
          className="flex items-center gap-2.5 shrink-0 group"
          onClick={() => setMenuOpen(false)}
        >
          {!logoError ? (
            <Image
              src="/logo.png"
              alt="Logo do Colégio"
              width={52}
              height={52}
              className="rounded-full ring-2 ring-primary/25 group-hover:ring-primary/55 transition-all"
              priority
              onError={() => setLogoError(true)}
            />
          ) : (
            <div className="w-[52px] h-[52px] rounded-full bg-secondary text-white flex items-center justify-center text-xs font-bold">
              CE
            </div>
          )}
          <div className="hidden lg:block leading-tight">
            <p className="text-[14px] font-bold text-foreground">
              Portal Escolar
            </p>
            <p className="text-[11px] text-muted">Colégio Luiz Zanchim</p>
          </div>
        </Link>

        {/* Faixa de atalhos rápidos */}
        <div className="flex-1 flex items-center justify-center min-w-0 px-1">
          <div className="hidden sm:flex items-center justify-between w-full max-w-md bg-gradient-to-r from-[#eef4ff] via-[#fdf6eb] to-[#e8f3ec] rounded-2xl px-1.5 py-1 border border-border/70 shadow-2xs">
            {atalhos.map((a) => (
              <Link
                key={a.href}
                href={a.href}
                className="flex flex-col items-center justify-center flex-1 min-w-0 py-1.5 px-1 rounded-xl hover:bg-white/95 transition-all"
                title={a.label}
              >
                <AtalhoSvg type={a.icon} color={a.color} />
                <span className="text-[10px] font-semibold text-foreground/80 mt-0.5 truncate w-full text-center">
                  {a.label}
                </span>
              </Link>
            ))}
          </div>
          <div className="flex sm:hidden items-center gap-1.5 opacity-85">
            <span className="w-2.5 h-2.5 rounded-full bg-primary" />
            <span className="w-2.5 h-2.5 rounded-full bg-accent" />
            <span className="w-2.5 h-2.5 rounded-full bg-secondary" />
            <span className="h-[3px] w-12 rounded-full bg-gradient-to-r from-primary to-secondary" />
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {isAdmin && (
            <Link
              href="/admin"
              className="text-[11px] font-semibold px-2.5 py-1.5 rounded-lg bg-secondary text-white hover:opacity-95 transition-opacity"
              onClick={() => setMenuOpen(false)}
            >
              Admin
            </Link>
          )}
          <button
            type="button"
            className="inline-flex items-center gap-1 text-[12px] font-medium px-2.5 py-1.5 rounded-lg border border-border hover:bg-primary-soft transition-colors"
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
                className="px-3 py-2.5 text-sm rounded-lg hover:bg-primary-soft hover:text-primary font-medium transition-colors"
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
