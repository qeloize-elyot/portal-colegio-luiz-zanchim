"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const navItems = [
  { href: "/", label: "Início" },
  { href: "/materiais", label: "Materiais" },
  { href: "/cardapio", label: "Cardápio" },
  { href: "/gremio", label: "Grêmio" },
  { href: "/enquetes", label: "Enquetes" },
  { href: "/feira", label: "Feira de Trocas" },
  { href: "/faq", label: "Dúvidas" },
  { href: "/sugestoes", label: "Sugestões" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);

  return (
    <header className="bg-white border-b border-border sticky top-0 z-50">
      {/* Faixa superior institucional */}
      <div className="bg-secondary text-white text-[11px] py-1.5">
        <div className="max-w-5xl mx-auto px-4 flex justify-between items-center">
          <span>Colégio Estadual Cívico-Militar · Paraná</span>
          <span className="hidden sm:inline opacity-90">Portal da Comunidade Escolar</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-3.5 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3 shrink-0 group">
          {!logoError ? (
            <Image
              src="/logo.png"
              alt="Brasão do Colégio Estadual Cívico-Militar Vereador Luiz Zanchim"
              width={50}
              height={50}
              className="rounded-full bg-primary-soft p-[2px] transition-transform duration-300 group-hover:scale-105"
              priority
              onError={() => setLogoError(true)}
            />
          ) : (
            <div className="w-[50px] h-[50px] rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold shadow-sm">
              LZ
            </div>
          )}
          <div className="leading-snug">
            <p className="font-bold text-[14px] md:text-[15px] text-foreground">
              Colégio Cívico-Militar
            </p>
            <p className="text-[12px] md:text-[13px] text-muted">
              Vereador Luiz Zanchim
            </p>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1 text-[13px] font-medium">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3 py-2 rounded-lg text-foreground/80 hover:text-primary hover:bg-primary-soft transition-colors duration-200"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="lg:hidden p-2 rounded-lg hover:bg-primary-soft text-foreground transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
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

      {menuOpen && (
        <nav className="lg:hidden border-t border-border bg-primary-soft/50 animate-soft-pop">
          <div className="max-w-5xl mx-auto px-4 py-2 flex flex-col">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-white transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
