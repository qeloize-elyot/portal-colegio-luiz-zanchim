"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getSupabase } from "@/lib/supabase/client";

const navItems = [
  { href: "/", label: "Visão Geral" },
  { href: "/materiais", label: "Materiais" },
  { href: "/cardapio", label: "Cantina" },
  { href: "/gremio", label: "Grêmio" },
  { href: "/enquetes", label: "Enquetes" },
  { href: "/feira", label: "Feira" },
  { href: "/calculadora", label: "Calculadora" },
  { href: "/faq", label: "FAQ" },
  { href: "/sugestoes", label: "Ouvidoria" },
];

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
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-2xs">
      {/* Barra Institucional Superior */}
      <div className="bg-[#0f2537] text-white/90 text-[11px] py-1.5 px-4 sm:px-8 border-b border-white/10">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Governo do Estado do Paraná · Colégio Estadual Cívico-Militar Vereador Luiz Zanchim</span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-white/75">
            <span>Ano Letivo {new Date().getFullYear()} · Sistema Trimestral</span>
            {userEmail && (
              <span className="text-amber-300 font-semibold">
                {userEmail} ({role || "ALUNO"})
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Barra Principal Full-Width */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 h-[72px] flex items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-3 shrink-0 group"
          onClick={() => setMenuOpen(false)}
        >
          {!logoError ? (
            <Image
              src="/logo.png"
              alt="Logo do Colégio"
              width={48}
              height={48}
              className="rounded-full ring-2 ring-[#0f2537]/15 group-hover:ring-[#c45c26] transition-all"
              priority
              onError={() => setLogoError(true)}
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-[#0f2537] text-white flex items-center justify-center text-xs font-bold">
              CCM
            </div>
          )}
          <div className="leading-tight">
            <p className="text-[15px] font-extrabold text-slate-900 tracking-tight">
              Portal Escolar
            </p>
            <p className="text-[11px] font-medium text-slate-500">
              Colégio Vereador Luiz Zanchim
            </p>
          </div>
        </Link>

        {/* Navegação Horizontal Profissional */}
        <nav className="hidden xl:flex items-center gap-1 bg-slate-100/90 p-1.5 rounded-2xl border border-slate-200/80">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  active
                    ? "bg-[#0f2537] text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Ações da Direita */}
        <div className="flex items-center gap-2.5 shrink-0">
          {isAdmin && (
            <Link
              href="/admin"
              className="text-xs font-bold px-3.5 py-2 rounded-xl bg-emerald-700 text-white hover:bg-emerald-800 transition-colors shadow-2xs"
              onClick={() => setMenuOpen(false)}
            >
              Painel Admin
            </Link>
          )}
          {userEmail ? (
            <button
              type="button"
              onClick={handleLogout}
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-red-50 hover:text-red-700 hover:border-red-200 transition-colors"
            >
              Sair
            </button>
          ) : (
            <Link
              href="/login"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl bg-[#c45c26] text-white hover:bg-[#9a4520] transition-colors"
            >
              Entrar
            </Link>
          )}

          <button
            type="button"
            className="xl:hidden inline-flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
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
        <div className="xl:hidden border-t border-slate-200 bg-white shadow-lg">
          <nav className="max-w-[1600px] mx-auto px-4 py-3 grid grid-cols-2 sm:grid-cols-3 gap-1.5">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3.5 py-2.5 text-xs font-bold rounded-xl text-slate-700 hover:bg-slate-100"
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
                className="px-3.5 py-2.5 text-xs font-bold rounded-xl text-left text-red-600 hover:bg-red-50"
              >
                Sair da conta
              </button>
            ) : (
              <Link
                href="/login"
                className="px-3.5 py-2.5 text-xs font-bold rounded-xl text-[#c45c26]"
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
