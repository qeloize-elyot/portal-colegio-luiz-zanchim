"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getSupabase } from "@/lib/supabase/client";

const navItems = [
  { href: "/", label: "Início" },
  { href: "/materiais", label: "Materiais" },
  { href: "/cardapio", label: "Cantina" },
  { href: "/gremio", label: "Grêmio" },
  { href: "/enquetes", label: "Enquetes" },
  { href: "/feira", label: "Feira" },
  { href: "/calculadora", label: "Calculadora" },
  { href: "/faq", label: "Dúvidas" },
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
    <header className="sticky top-0 z-50 bg-[#FFFDF9] border-b-[3px] border-[#0F1E36] shadow-[0_4px_0px_#0F1E36]">
      {/* Tirinha superior estilo régua/marca-página escolar */}
      <div className="h-1.5 w-full flex">
        <div className="flex-1 bg-[#0F1E36]" />
        <div className="flex-1 bg-[#F4B41A]" />
        <div className="flex-1 bg-[#E04F33]" />
        <div className="flex-1 bg-[#1B5E4A]" />
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 h-20 flex items-center justify-between gap-4">
        {/* Identidade do Colégio estilo Adesivo */}
        <Link
          href="/"
          className="flex items-center gap-3.5 shrink-0 group"
          onClick={() => setMenuOpen(false)}
        >
          <div className="relative p-1 rounded-2xl bg-[#FFF8DB] border-2 border-[#0F1E36] shadow-[3px_3px_0px_#0F1E36] group-hover:-rotate-3 group-hover:scale-105 transition-transform">
            {!logoError ? (
              <Image
                src="/logo.png"
                alt="Logo do Colégio"
                width={42}
                height={42}
                className="rounded-xl object-contain"
                priority
                onError={() => setLogoError(true)}
              />
            ) : (
              <div className="w-10 h-10 rounded-xl bg-[#0F1E36] text-[#F4B41A] flex items-center justify-center text-xs font-black">
                CCM
              </div>
            )}
          </div>

          <div className="leading-tight">
            <div className="flex items-center gap-2">
              <span className="text-base font-black text-[#0F1E36] tracking-tight group-hover:text-[#E04F33] transition-colors">
                Portal Escolar
              </span>
              <span className="hidden sm:inline-block text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#F4B41A] text-[#0F1E36] border border-[#0F1E36] shadow-[1.5px_1.5px_0px_#0F1E36]">
                CCMPR
              </span>
            </div>
            <p className="text-xs text-[#0F1E36]/75 font-bold">
              Colégio Vereador Luiz Zanchim
            </p>
          </div>
        </Link>

        {/* Navegação Central estilo Abas de Caderno */}
        <nav className="hidden xl:flex items-center gap-1 bg-[#F7F3E8] p-1.5 rounded-2xl border-2 border-[#0F1E36] shadow-[3px_3px_0px_#0F1E36]">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all ${
                  active
                    ? "bg-[#F4B41A] text-[#0F1E36] border-2 border-[#0F1E36] shadow-[2px_2px_0px_#0F1E36] -translate-y-0.5"
                    : "text-[#0F1E36]/80 hover:text-[#0F1E36] hover:bg-[#FFFDF9]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Crachá do Usuário e Ações */}
        <div className="flex items-center gap-2.5 shrink-0">
          {isAdmin && (
            <Link
              href="/admin"
              className="text-xs font-black px-3.5 py-2 rounded-xl bg-[#E6F8EF] text-[#15803D] border-2 border-[#0F1E36] shadow-[2px_2px_0px_#0F1E36] hover:translate-x-[1px] hover:translate-y-[1px] transition-all flex items-center gap-1.5"
              onClick={() => setMenuOpen(false)}
            >
              <span className="w-2 h-2 rounded-full bg-[#15803D] animate-pulse" />
              Admin
            </Link>
          )}

          {userEmail ? (
            <div className="hidden sm:flex items-center gap-2">
              {/* Crachá Escolar em SVG */}
              <div className="flex items-center gap-2 bg-[#EBF3FF] border-2 border-[#0F1E36] rounded-xl px-3 py-1.5 shadow-[2px_2px_0px_#0F1E36]">
                <svg className="w-4 h-4 text-[#2554C7]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M5 20c1.5-4 12.5-4 14 0" strokeLinecap="round" />
                </svg>
                <span className="text-xs text-[#0F1E36] font-black max-w-[140px] truncate">
                  {userEmail.split("@")[0]}
                </span>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="text-xs font-black px-3.5 py-2 rounded-xl border-2 border-[#0F1E36] bg-[#FFF0E5] text-[#E04F33] shadow-[2px_2px_0px_#0F1E36] hover:bg-[#E04F33] hover:text-white transition-colors"
              >
                Sair
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-black px-4 py-2 rounded-xl bg-[#E04F33] text-white border-2 border-[#0F1E36] shadow-[3px_3px_0px_#0F1E36] hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
            >
              Entrar →
            </Link>
          )}

          {/* Botão Menu Mobile */}
          <button
            type="button"
            className="xl:hidden inline-flex items-center gap-1.5 text-xs font-black px-3.5 py-2 rounded-xl border-2 border-[#0F1E36] bg-[#F4B41A] text-[#0F1E36] shadow-[2px_2px_0px_#0F1E36]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
            Menu
          </button>
        </div>
      </div>

      {/* Gaveta Mobile Estilo Caderno */}
      {menuOpen && (
        <div className="xl:hidden border-t-[3px] border-[#0F1E36] bg-[#F7F3E8] px-4 py-5">
          <nav className="max-w-[1440px] mx-auto grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2.5 text-xs font-black rounded-xl border-2 border-[#0F1E36] transition-all ${
                    active
                      ? "bg-[#F4B41A] text-[#0F1E36] shadow-[2px_2px_0px_#0F1E36]"
                      : "bg-[#FFFDF9] text-[#0F1E36] hover:bg-[#FFF8DB]"
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
            {userEmail ? (
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  handleLogout();
                }}
                className="px-4 py-2.5 text-xs font-black rounded-xl text-left bg-[#FDECEB] text-[#B91C1C] border-2 border-[#0F1E36] shadow-[2px_2px_0px_#0F1E36]"
              >
                Sair da conta
              </button>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2.5 text-xs font-black rounded-xl bg-[#E04F33] text-white border-2 border-[#0F1E36] shadow-[2px_2px_0px_#0F1E36] text-center"
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
