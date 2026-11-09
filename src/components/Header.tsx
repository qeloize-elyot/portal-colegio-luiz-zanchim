"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getSupabase } from "@/lib/supabase/client";

const navItems = [
  { href: "/", label: "Início", group: "principal" },
  { href: "/horarios", label: "Horários", group: "principal" },
  { href: "/laboratorios", label: "Laboratórios", group: "principal" },
  { href: "/biblioteca", label: "Biblioteca", group: "principal" },
  { href: "/recados", label: "Recados", group: "principal" },
  { href: "/aviso-ausencia", label: "Aviso de Ausência", group: "principal" },
  { href: "/calculadora", label: "Minhas Notas", group: "estudo" },
  { href: "/materiais", label: "Materiais", group: "estudo" },
  { href: "/cardapio", label: "Cantina", group: "escola" },
  { href: "/gremio", label: "Grêmio", group: "escola" },
  { href: "/enquetes", label: "Enquetes", group: "escola" },
  { href: "/feira", label: "Feira", group: "escola" },
  { href: "/faq", label: "Dúvidas", group: "ajuda" },
  { href: "/sugestoes", label: "Ouvidoria", group: "ajuda" },
];

const groups = [
  { id: "principal", title: "Portal" },
  { id: "estudo", title: "Estudo" },
  { id: "escola", title: "Escola" },
  { id: "ajuda", title: "Ajuda" },
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

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

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
      <div className="h-1.5 w-full flex">
        <div className="flex-1 bg-[#0F1E36]" />
        <div className="flex-1 bg-[#F4B41A]" />
        <div className="flex-1 bg-[#E04F33]" />
        <div className="flex-1 bg-[#1B5E4A]" />
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 h-[72px] flex items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-3.5 shrink-0 group"
          onClick={() => setMenuOpen(false)}
        >
          <div className="relative p-1 rounded-2xl bg-[#FFF8DB] border-2 border-[#0F1E36] shadow-[3px_3px_0px_#0F1E36] group-hover:-rotate-2 group-hover:scale-[1.03] transition-transform">
            {!logoError ? (
              <Image
                src="/logo.png"
                alt="Logo do Colégio"
                width={40}
                height={40}
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
              <span className="text-[15px] sm:text-base font-semibold text-[#0F1E36] tracking-tight group-hover:text-[#E04F33] transition-colors font-serif">
                Portal Escolar
              </span>
              <span className="hidden sm:inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#F4B41A] text-[#0F1E36] border border-[#0F1E36]">
                CCMPR
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-[#0F1E36]/70 font-medium">
              Colégio Vereador Luiz Zanchim
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-2.5 shrink-0">
          {isAdmin && (
            <Link
              href="/admin"
              className="hidden sm:inline-flex text-xs font-semibold px-3 py-2 rounded-xl bg-[#E6F8EF] text-[#15803D] border-2 border-[#0F1E36] shadow-[2px_2px_0px_#0F1E36] hover:translate-x-[1px] hover:translate-y-[1px] transition-all items-center gap-1.5"
              onClick={() => setMenuOpen(false)}
            >
              <span className="w-2 h-2 rounded-full bg-[#15803D] animate-pulse" />
              Admin
            </Link>
          )}

          {userEmail ? (
            <div className="hidden md:flex items-center gap-2">
              <div className="flex items-center gap-2 bg-[#EBF3FF] border-2 border-[#0F1E36] rounded-xl px-3 py-1.5 shadow-[2px_2px_0px_#0F1E36]">
                <svg className="w-4 h-4 text-[#2554C7]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M5 20c1.5-4 12.5-4 14 0" strokeLinecap="round" />
                </svg>
                <span className="text-xs text-[#0F1E36] font-semibold max-w-[120px] truncate">
                  {userEmail.split("@")[0]}
                </span>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="text-xs font-semibold px-3 py-2 rounded-xl border-2 border-[#0F1E36] bg-[#FFF0E5] text-[#E04F33] shadow-[2px_2px_0px_#0F1E36] hover:bg-[#E04F33] hover:text-white transition-colors"
              >
                Sair
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="hidden md:inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-xl bg-[#E04F33] text-white border-2 border-[#0F1E36] shadow-[3px_3px_0px_#0F1E36] hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
            >
              Entrar →
            </Link>
          )}

          <button
            type="button"
            className="inline-flex items-center justify-center w-11 h-11 rounded-xl border-2 border-[#0F1E36] bg-[#F4B41A] text-[#0F1E36] shadow-[2px_2px_0px_#0F1E36] hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t-[3px] border-[#0F1E36] bg-[#F7F3E8] px-4 py-6 shadow-inner">
          <div className="max-w-[900px] mx-auto">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {groups.map((g) => (
                <div key={g.id}>
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#0F1E36]/55 mb-2.5 px-1">
                    {g.title}
                  </p>
                  <nav className="flex flex-col gap-1.5">
                    {navItems
                      .filter((item) => item.group === g.id)
                      .map((item) => {
                        const active = pathname === item.href;
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            className={`px-3.5 py-2.5 text-sm rounded-xl border-2 border-[#0F1E36] transition-all ${
                              active
                                ? "bg-[#F4B41A] text-[#0F1E36] font-semibold shadow-[2px_2px_0px_#0F1E36]"
                                : "bg-[#FFFDF9] text-[#0F1E36] hover:bg-[#FFF8DB] font-medium"
                            }`}
                            onClick={() => setMenuOpen(false)}
                          >
                            {item.label}
                          </Link>
                        );
                      })}
                  </nav>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-5 border-t border-[#0F1E36]/15 flex flex-wrap items-center gap-3">
              {isAdmin && (
                <Link
                  href="/admin"
                  className="sm:hidden px-4 py-2.5 text-sm font-semibold rounded-xl bg-[#E6F8EF] text-[#15803D] border-2 border-[#0F1E36]"
                  onClick={() => setMenuOpen(false)}
                >
                  Painel Admin
                </Link>
              )}
              {userEmail ? (
                <>
                  <span className="md:hidden text-xs text-[#0F1E36]/70 font-medium">
                    {userEmail.split("@")[0]}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      handleLogout();
                    }}
                    className="md:hidden px-4 py-2.5 text-sm font-semibold rounded-xl bg-[#FDECEB] text-[#B91C1C] border-2 border-[#0F1E36]"
                  >
                    Sair da conta
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="md:hidden px-4 py-2.5 text-sm font-semibold rounded-xl bg-[#E04F33] text-white border-2 border-[#0F1E36]"
                  onClick={() => setMenuOpen(false)}
                >
                  Entrar
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
