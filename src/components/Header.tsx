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
  { href: "/faq", label: "Perguntas Frequentes" },
  { href: "/sugestoes", label: "Sugestões" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);

  return (
    <header className="bg-primary text-white shadow-md">
      {/* Barra superior */}
      <div className="bg-primary-dark text-[11px] py-1.5 tracking-wide">
        <div className="max-w-5xl mx-auto px-4 flex justify-between items-center">
          <span>Colégio Estadual Cívico-Militar Vereador Luiz Zanchim</span>
          <span className="hidden sm:inline opacity-90">Portal da Comunidade Escolar</span>
        </div>
      </div>

      {/* Cabeçalho principal */}
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3.5 shrink-0 group">
          {!logoError ? (
            <Image
              src="/logo.png"
              alt="Brasão do Colégio Estadual Cívico-Militar Vereador Luiz Zanchim"
              width={54}
              height={54}
              className="rounded-full bg-white p-[2px] shadow-sm transition-transform duration-300 group-hover:scale-105"
              priority
              onError={() => setLogoError(true)}
            />
          ) : (
            <div className="w-[54px] h-[54px] rounded-full bg-accent flex items-center justify-center text-primary-dark text-sm font-bold shadow-sm">
              LZ
            </div>
          )}
          <div className="leading-tight">
            <p className="font-semibold text-sm md:text-[15px]">
              Colégio Estadual Cívico-Militar
            </p>
            <p className="text-xs md:text-sm text-white/85">
              Vereador Luiz Zanchim
            </p>
          </div>
        </Link>

        {/* Navegação desktop */}
        <nav className="hidden lg:flex items-center gap-0.5 text-[13px]">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-2.5 py-1.5 rounded-md hover:bg-white/15 transition-colors duration-200"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Botão menu mobile */}
        <button
          type="button"
          className="lg:hidden p-2 rounded-md hover:bg-white/15 transition-colors"
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

      {/* Menu mobile */}
      {menuOpen && (
        <nav className="lg:hidden border-t border-white/15 bg-primary-dark animate-fade-in">
          <div className="max-w-5xl mx-auto px-4 py-2 flex flex-col">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2.5 rounded-md hover:bg-white/10 text-sm transition-colors"
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
