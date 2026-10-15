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
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Só a logo */}
        <Link href="/" className="flex items-center shrink-0" onClick={() => setMenuOpen(false)}>
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

        {/* Ações à direita: Admin (se for) + Menu */}
        <div className="flex items-center gap-2">
          {isAdmin && (
            <Link
              href="/admin"
              className="text-[12px] font-semibold px-3 py-1.5 rounded-lg bg-secondary text-white hover:opacity-90"
              onClick={() => setMenuOpen(false)}
            >
              Admin
            </Link>
          )}

          <button
            type="button"
            className="inline-flex items-center gap-1.5 text-[12px] font-medium px-3 py-1.5 rounded-lg border border-border hover:bg-primary-soft transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
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

      {/* Painel do menu (todas as páginas aqui dentro) */}
      {menuOpen && (
        <div className="border-t border-border bg-white shadow-sm">
          <nav className="max-w-5xl mx-auto px-4 py-3 grid grid-cols-2 sm:grid-cols-3 gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2.5 text-sm rounded-lg text-foreground/80 hover:bg-primary-soft hover:text-primary transition-colors"
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
