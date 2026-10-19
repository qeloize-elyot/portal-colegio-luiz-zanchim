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
    <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-xl border-b border-slate-200/70">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 h-20 flex items-center justify-between gap-6">
        {/* Identidade do Colégio */}
        <Link
          href="/"
          className="flex items-center gap-3.5 shrink-0 group"
          onClick={() => setMenuOpen(false)}
        >
          {!logoError ? (
            <Image
              src="/logo.png"
              alt="Logo do Colégio"
              width={46}
              height={46}
              className="rounded-full ring-2 ring-slate-200 group-hover:ring-[#c45c26] transition-all"
              priority
              onError={() => setLogoError(true)}
            />
          ) : (
            <div className="w-11 h-11 rounded-full bg-[#0f2537] text-white flex items-center justify-center text-xs font-bold">
              CCM
            </div>
          )}
          <div className="leading-tight">
            <div className="flex items-center gap-2">
              <span className="text-[15px] font-extrabold text-slate-900 tracking-tight">
                Portal Escolar
              </span>
              <span className="hidden sm:inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                CCMPR
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Colégio Vereador Luiz Zanchim
            </p>
          </div>
        </Link>

        {/* Navegação Central Clean */}
        <nav className="hidden xl:flex items-center gap-1 bg-slate-100/80 p-1.5 rounded-full border border-slate-200/60">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  active
                    ? "bg-white text-slate-950 shadow-xs font-bold"
                    : "text-slate-600 hover:text-slate-950"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Perfil e Ações */}
        <div className="flex items-center gap-3 shrink-0">
          {isAdmin && (
            <Link
              href="/admin"
              className="text-xs font-bold px-3.5 py-2 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Admin
            </Link>
          )}

          {userEmail ? (
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-xs text-slate-500 font-medium max-w-[160px] truncate">
                {userEmail.split("@")[0]}
              </span>
              <button
                type="button"
                onClick={handleLogout}
                className="text-xs font-semibold px-3.5 py-2 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
              >
                Sair
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="hidden sm:inline-flex items-center text-xs font-bold px-4 py-2 rounded-full bg-[#0f2537] text-white hover:bg-slate-800 transition-colors"
            >
              Entrar
            </Link>
          )}

          <button
            type="button"
            className="xl:hidden inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-full border border-slate-200 bg-white text-slate-700"
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
        <div className="xl:hidden border-t border-slate-200/80 bg-white/95 backdrop-blur-lg">
          <nav className="max-w-[1440px] mx-auto px-4 py-4 grid grid-cols-2 sm:grid-cols-3 gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-2.5 text-xs font-semibold rounded-xl text-slate-700 hover:bg-slate-100"
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
                className="px-4 py-2.5 text-xs font-semibold rounded-xl text-left text-red-600 hover:bg-red-50"
              >
                Sair da conta
              </button>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2.5 text-xs font-bold rounded-xl text-[#c45c26]"
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
