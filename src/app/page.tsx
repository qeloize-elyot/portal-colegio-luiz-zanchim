import Link from "next/link";
import { SchoolLogoShowcase } from "@/components/SvgDecorations";

const featuredModules = [
  {
    href: "/materiais",
    title: "Materiais de Apoio",
    description:
      "Apostilas, slides de aula, resumos e listas de exercícios organizados por série, turma e disciplina.",
    tag: "Estudos & Provas",
    badge: "Ensino Fundamental e Médio",
    icon: "book",
    theme: "blue",
  },
  {
    href: "/cardapio",
    title: "Cardápio da Cantina",
    description:
      "Consulte a programação semanal completa dos lanches do recreio e refeições principais da escola.",
    tag: "Alimentação",
    badge: "Programação Semanal",
    icon: "apple",
    theme: "amber",
  },
];

const secondaryModules = [
  {
    href: "/gremio",
    title: "Painel do Grêmio",
    description: "Comunicados oficiais, gincanas, projetos culturais e avisos estudantis.",
    tag: "Comunidade",
    icon: "megaphone",
  },
  {
    href: "/enquetes",
    title: "Enquetes Escolares",
    description: "Participe das votações ativas e ajude nas decisões do colégio.",
    tag: "Voz Ativa",
    icon: "vote",
  },
  {
    href: "/calculadora",
    title: "Calculadora de Notas",
    description: "Simule suas médias nos 3 trimestres rumo à meta anual de 180 pontos.",
    tag: "Planejamento",
    icon: "calc",
  },
  {
    href: "/feira",
    title: "Feira de Trocas",
    description: "Espaço solidário para doação, troca ou venda de livros e uniformes.",
    tag: "Sustentável",
    icon: "swap",
  },
  {
    href: "/faq",
    title: "Dúvidas Frequentes",
    description: "Normas de uniforme cívico-militar, horários, atestados e secretaria.",
    tag: "Guia Rápido",
    icon: "help",
  },
  {
    href: "/sugestoes",
    title: "Ouvidoria Anônima",
    description: "Canal confidencial com moderação por IA para sugestões e relatos.",
    tag: "Escuta Segura",
    icon: "chat",
  },
];

function CleanServiceIcon({ type, className = "w-6 h-6" }: { type: string; className?: string }) {
  switch (type) {
    case "book":
      return (
        <svg viewBox="0 0 40 40" className={className} fill="none" stroke="currentColor">
          <path d="M7 10C13 8 18 9 20 11.5C22 9 27 8 33 10V30C27 28 22 29 20 31.5C18 29 13 28 7 30V10Z" strokeWidth="2.4" strokeLinejoin="round" />
          <path d="M20 11.5V31.5" strokeWidth="2.4" />
        </svg>
      );
    case "apple":
      return (
        <svg viewBox="0 0 40 40" className={className} fill="none" stroke="currentColor">
          <path d="M11 23C11 15.5 25 15.5 25 23H11Z" strokeWidth="2.4" strokeLinejoin="round" />
          <path d="M9 26.5H27M11 30H25" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M28 15H34L32.5 30H29L28 15Z" strokeWidth="2.2" strokeLinejoin="round" />
        </svg>
      );
    case "megaphone":
      return (
        <svg viewBox="0 0 40 40" className={className} fill="none" stroke="currentColor">
          <polygon points="10,17 29,10 29,30 10,23" strokeWidth="2.4" strokeLinejoin="round" />
          <path d="M12 23L14.5 31H11L9 23" strokeWidth="2.2" strokeLinejoin="round" />
          <path d="M33 15C35 18 35 22 33 25" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
      );
    case "vote":
      return (
        <svg viewBox="0 0 40 40" className={className} fill="none" stroke="currentColor">
          <rect x="7" y="8" width="26" height="24" rx="5" strokeWidth="2.4" />
          <path d="M14 25V20M20 25V14M26 25V17" strokeWidth="2.8" strokeLinecap="round" />
        </svg>
      );
    case "swap":
      return (
        <svg viewBox="0 0 40 40" className={className} fill="none" stroke="currentColor">
          <path d="M10 15H30L25 10M30 25H10L15 30" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "calc":
      return (
        <svg viewBox="0 0 40 40" className={className} fill="none" stroke="currentColor">
          <rect x="10" y="6" width="20" height="28" rx="4" strokeWidth="2.4" />
          <rect x="14" y="10" width="12" height="6" rx="1.5" fill="currentColor" fillOpacity="0.2" />
          <circle cx="15.5" cy="21" r="1.5" fill="currentColor" />
          <circle cx="20" cy="21" r="1.5" fill="currentColor" />
          <circle cx="24.5" cy="21" r="1.5" fill="currentColor" />
          <circle cx="15.5" cy="26" r="1.5" fill="currentColor" />
          <circle cx="20" cy="26" r="1.5" fill="currentColor" />
          <circle cx="24.5" cy="26" r="1.5" fill="currentColor" />
        </svg>
      );
    case "help":
      return (
        <svg viewBox="0 0 40 40" className={className} fill="none" stroke="currentColor">
          <circle cx="20" cy="20" r="13" strokeWidth="2.4" />
          <path d="M16.5 16.5C17 14 22 14 23 16.5C24 19 20 20 20 22.5" strokeWidth="2.4" strokeLinecap="round" />
          <circle cx="20" cy="27" r="1.5" fill="currentColor" />
        </svg>
      );
    case "chat":
      return (
        <svg viewBox="0 0 40 40" className={className} fill="none" stroke="currentColor">
          <path d="M9 10H31C32.7 10 34 11.3 34 13V25C34 26.7 32.7 28 31 28H17L10 33V28H9C7.3 28 6 26.7 6 25V13C6 11.3 7.3 10 9 10Z" strokeWidth="2.4" strokeLinejoin="round" />
          <path d="M14 19H26M14 23H21" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
      );
    default:
      return null;
  }
}

export default function Home() {
  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-8 py-6 md:py-10 space-y-10">
      {/* HERO INSTITUCIONAL CÍVICO-MILITAR */}
      <section className="animate-fade-in-up">
        <div className="relative overflow-hidden rounded-3xl bg-[#0A1628] border border-slate-800 text-white shadow-xl">
          {/* Textura de grade sutil e iluminação de fundo */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "radial-gradient(#ffffff 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
          <div className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-blue-600/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 left-1/3 w-80 h-80 rounded-full bg-amber-500/15 blur-3xl" />

          <div className="relative px-6 py-8 sm:px-12 sm:py-12 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl text-center lg:text-left space-y-5">
              <div className="inline-flex items-center gap-2.5 text-[11px] font-bold tracking-wider uppercase text-amber-300 bg-amber-500/10 border border-amber-400/25 px-3.5 py-1.5 rounded-full">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                CCMPR · Colégio Estadual Cívico-Militar Vereador Luiz Zanchim
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tight text-white leading-[1.15]">
                Central do Estudante{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500">
                  Luiz Zanchim
                </span>
              </h1>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl mx-auto lg:mx-0">
                Tudo o que você precisa para acompanhar o trimestre: conteúdos de aula,
                cardápio atualizado, votações do Grêmio e ferramentas de planejamento.
              </p>

              <div className="flex flex-wrap justify-center lg:justify-start gap-3 pt-1">
                <Link
                  href="/materiais"
                  className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition-all shadow-lg shadow-amber-500/10"
                >
                  Acessar Materiais de Aula
                </Link>
                <Link
                  href="/gremio"
                  className="bg-white/10 hover:bg-white/15 text-white border border-white/15 font-semibold text-xs sm:text-sm px-6 py-3 rounded-xl transition-all"
                >
                  Mural do Grêmio
                </Link>
              </div>
            </div>

            {/* Brasão / Logo com moldura de destaque */}
            <div className="shrink-0 relative">
              <div className="p-4 rounded-3xl bg-white/[0.04] border border-white/10 backdrop-blur-sm shadow-2xl">
                <SchoolLogoShowcase size={132} />
              </div>
            </div>
          </div>

          {/* Barra inferior de resumo rápido dentro do Hero */}
          <div className="relative bg-slate-950/60 border-t border-white/10 px-6 sm:px-12 py-3.5 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-300">
            <div className="flex items-center gap-6 flex-wrap">
              <span className="flex items-center gap-2">
                <strong className="text-amber-400 font-bold">8</strong> Módulos Ativos
              </span>
              <span className="hidden sm:inline text-slate-700">•</span>
              <span className="flex items-center gap-2">
                Meta Anual: <strong className="text-white font-semibold">180 Pontos</strong>
              </span>
              <span className="hidden sm:inline text-slate-700">•</span>
              <span className="flex items-center gap-2">
                Acesso Institucional: <strong className="text-emerald-400 font-semibold">@escola.pr.gov.br</strong>
              </span>
            </div>
            <Link
              href="/faq"
              className="text-amber-300 hover:text-amber-200 font-semibold transition-colors"
            >
              Normas e horários →
            </Link>
          </div>
        </div>
      </section>

      {/* CORPO DO PORTAL: 8 COLUNAS (BENTO GRID) + 4 COLUNAS (PAINEL LATERAL) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* COLUNA PRINCIPAL (8 COLUNAS) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-end justify-between border-b border-slate-200 pb-3">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-blue-700">
                Navegação do Portal
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mt-0.5">
                Serviços e Módulos Escolares
              </h2>
            </div>
            <span className="text-xs font-medium text-slate-500 hidden sm:inline">
              Selecione um módulo para abrir
            </span>
          </div>

          {/* DESTAQUES PRINCIPAIS (2 CARDS GRANDES) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {featuredModules.map((item) => {
              const isBlue = item.theme === "blue";
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group relative overflow-hidden rounded-2xl p-6 border transition-all duration-200 hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between min-h-[190px] ${
                    isBlue
                      ? "bg-gradient-to-br from-blue-50/90 via-white to-white border-blue-200/80 hover:border-blue-400"
                      : "bg-gradient-to-br from-amber-50/90 via-white to-white border-amber-200/80 hover:border-amber-400"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-xs transition-transform group-hover:scale-105 ${
                        isBlue
                          ? "bg-blue-600 text-white"
                          : "bg-amber-500 text-slate-950"
                      }`}
                    >
                      <CleanServiceIcon type={item.icon} className="w-6 h-6" />
                    </div>
                    <span
                      className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${
                        isBlue
                          ? "bg-blue-100/70 text-blue-800 border-blue-200"
                          : "bg-amber-100/80 text-amber-900 border-amber-200"
                      }`}
                    >
                      {item.badge}
                    </span>
                  </div>

                  <div className="mt-5">
                    <span
                      className={`text-[10px] font-extrabold uppercase tracking-wider ${
                        isBlue ? "text-blue-700" : "text-amber-700"
                      }`}
                    >
                      {item.tag}
                    </span>
                    <div className="flex items-center justify-between gap-2 mt-0.5">
                      <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-blue-950">
                        {item.title}
                      </h3>
                      <span className="text-slate-400 group-hover:text-slate-900 group-hover:translate-x-1 transition-all font-bold">
                        →
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed mt-1.5">
                      {item.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* DEMAIS MÓDULOS (GRADE PADRONIZADA E SÓBRIA) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {secondaryModules.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="group bg-white border border-slate-200/90 hover:border-slate-900/30 rounded-2xl p-5 flex flex-col justify-between gap-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 group-hover:bg-[#0A1628] text-slate-700 group-hover:text-amber-400 flex items-center justify-center transition-colors">
                    <CleanServiceIcon type={service.icon} className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-slate-600">
                    {service.tag}
                  </span>
                </div>

                <div>
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <h3 className="font-bold text-slate-900 text-sm group-hover:text-blue-700 transition-colors">
                      {service.title}
                    </h3>
                    <span className="text-slate-300 group-hover:text-blue-700 group-hover:translate-x-0.5 transition-all text-xs">
                      →
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                    {service.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* PAINEL LATERAL DO ESTUDANTE (4 COLUNAS) */}
        <aside className="lg:col-span-4 space-y-5">
          {/* Card 1: Meta de Notas Trimestrais */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-700">
                  Sistema de Avaliação
                </span>
                <h3 className="text-base font-extrabold text-slate-900">
                  Meta Anual: 180 Pontos
                </h3>
              </div>
              <span className="text-xs font-extrabold px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
                Média 6,0
              </span>
            </div>

            <div className="space-y-2.5 mb-5">
              {[
                { label: "1º Trimestre", weight: "Vale 100 pts", min: "Mín. 60 pts" },
                { label: "2º Trimestre", weight: "Vale 100 pts", min: "Mín. 60 pts" },
                { label: "3º Trimestre", weight: "Vale 100 pts", min: "Mín. 60 pts" },
              ].map((trim) => (
                <div
                  key={trim.label}
                  className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs"
                >
                  <span className="font-bold text-slate-800">{trim.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500">{trim.weight}</span>
                    <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                      {trim.min}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/calculadora"
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#0A1628] hover:bg-slate-800 text-white text-xs font-bold transition-colors"
            >
              Simular minhas notas agora →
            </Link>
          </div>

          {/* Card 2: Horários de Funcionamento */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-800">
                Horários da Unidade
              </h3>
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
            </div>

            <div className="divide-y divide-slate-100 text-xs">
              <div className="py-2.5 flex items-center justify-between">
                <span className="font-semibold text-slate-700">Turno Matutino</span>
                <span className="font-bold text-slate-900 bg-slate-100 px-2.5 py-1 rounded-md">
                  07h20 às 12h00
                </span>
              </div>
              <div className="py-2.5 flex items-center justify-between">
                <span className="font-semibold text-slate-700">Turno Vespertino</span>
                <span className="font-bold text-slate-900 bg-slate-100 px-2.5 py-1 rounded-md">
                  13h20 às 18h00
                </span>
              </div>
              <div className="pt-2.5 flex items-center justify-between">
                <span className="font-semibold text-slate-700">Secretaria e Biblioteca</span>
                <span className="font-bold text-slate-900 bg-slate-100 px-2.5 py-1 rounded-md">
                  08h00 às 17h00
                </span>
              </div>
            </div>
          </div>

          {/* Card 3: Ouvidoria Protegida por IA */}
          <div className="bg-gradient-to-br from-[#0A1628] to-slate-900 text-white rounded-2xl p-6 border border-slate-800">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300">
                Escuta Protegida por IA
              </span>
            </div>
            <h4 className="font-bold text-sm mb-1.5">
              Ouvidoria Estudantil 100% Anônima
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Envie sugestões, elogios ou relatos sem identificar seu nome. A moderação
              automática garante um ambiente seguro e respeitoso.
            </p>
            <Link
              href="/sugestoes"
              className="inline-flex items-center justify-center w-full py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-white text-xs font-bold transition-colors"
            >
              Enviar mensagem confidencial
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
