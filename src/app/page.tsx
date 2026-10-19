import Link from "next/link";
import { SchoolLogoShowcase } from "@/components/SvgDecorations";

const services = [
  {
    href: "/materiais",
    title: "Materiais de Apoio",
    description: "Apostilas, slides e listas de exercícios por série, turma e disciplina.",
    tag: "Estudos",
    accent: "#2563eb",
    softBg: "#eff6ff",
    icon: "book",
  },
  {
    href: "/cardapio",
    title: "Cardápio da Cantina",
    description: "Programação semanal de lanches do recreio e refeições principais.",
    tag: "Rotina",
    accent: "#ea580c",
    softBg: "#fff7ed",
    icon: "apple",
  },
  {
    href: "/gremio",
    title: "Painel do Grêmio",
    description: "Comunicados oficiais, gincanas, eventos culturais e avisos estudantis.",
    tag: "Comunidade",
    accent: "#d97706",
    softBg: "#fffbeb",
    icon: "megaphone",
  },
  {
    href: "/enquetes",
    title: "Enquetes Escolares",
    description: "Participe das votações ativas e ajude nas decisões da escola.",
    tag: "Voz Ativa",
    accent: "#4f46e5",
    softBg: "#eef2ff",
    icon: "vote",
  },
  {
    href: "/feira",
    title: "Feira de Trocas",
    description: "Espaço solidário para doação, troca ou venda de livros e uniformes.",
    tag: "Sustentável",
    accent: "#16a34a",
    softBg: "#f0fdf4",
    icon: "swap",
  },
  {
    href: "/calculadora",
    title: "Calculadora de Notas",
    description: "Simule suas notas dos 3 trimestres e acompanhe a meta de 180 pontos.",
    tag: "Planejamento",
    accent: "#0d9488",
    softBg: "#f0fdfa",
    icon: "calc",
  },
  {
    href: "/faq",
    title: "Dúvidas Frequentes",
    description: "Normas de uniforme, horários de aulas, atestados e secretaria.",
    tag: "Guia Rápido",
    accent: "#c2410c",
    softBg: "#fff7ed",
    icon: "help",
  },
  {
    href: "/sugestoes",
    title: "Ouvidoria Anônima",
    description: "Canal confidencial com moderação por IA para sugestões e críticas.",
    tag: "Escuta Segura",
    accent: "#059669",
    softBg: "#ecfdf5",
    icon: "chat",
  },
];

function CleanServiceIcon({ type, color }: { type: string; color: string }) {
  switch (type) {
    case "book":
      return (
        <svg viewBox="0 0 40 40" className="w-7 h-7" fill="none">
          <path d="M7 10C13 8 18 9 20 11.5C22 9 27 8 33 10V30C27 28 22 29 20 31.5C18 29 13 28 7 30V10Z" stroke={color} strokeWidth="2.4" strokeLinejoin="round" />
          <path d="M20 11.5V31.5" stroke={color} strokeWidth="2.4" />
        </svg>
      );
    case "apple":
      return (
        <svg viewBox="0 0 40 40" className="w-7 h-7" fill="none">
          <path d="M11 23C11 15.5 25 15.5 25 23H11Z" stroke={color} strokeWidth="2.4" strokeLinejoin="round" />
          <path d="M9 26.5H27M11 30H25" stroke={color} strokeWidth="2.4" strokeLinecap="round" />
          <path d="M28 15H34L32.5 30H29L28 15Z" stroke={color} strokeWidth="2.2" strokeLinejoin="round" />
        </svg>
      );
    case "megaphone":
      return (
        <svg viewBox="0 0 40 40" className="w-7 h-7" fill="none">
          <polygon points="10,17 29,10 29,30 10,23" stroke={color} strokeWidth="2.4" strokeLinejoin="round" />
          <path d="M12 23L14.5 31H11L9 23" stroke={color} strokeWidth="2.2" strokeLinejoin="round" />
          <path d="M33 15C35 18 35 22 33 25" stroke={color} strokeWidth="2.4" strokeLinecap="round" />
        </svg>
      );
    case "vote":
      return (
        <svg viewBox="0 0 40 40" className="w-7 h-7" fill="none">
          <rect x="7" y="8" width="26" height="24" rx="5" stroke={color} strokeWidth="2.4" />
          <path d="M14 25V20M20 25V14M26 25V17" stroke={color} strokeWidth="2.8" strokeLinecap="round" />
        </svg>
      );
    case "swap":
      return (
        <svg viewBox="0 0 40 40" className="w-7 h-7" fill="none">
          <path d="M10 15H30L25 10M30 25H10L15 30" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "calc":
      return (
        <svg viewBox="0 0 40 40" className="w-7 h-7" fill="none">
          <rect x="10" y="6" width="20" height="28" rx="4" stroke={color} strokeWidth="2.4" />
          <rect x="14" y="10" width="12" height="6" rx="1.5" fill={color} fillOpacity="0.2" />
          <circle cx="15.5" cy="21" r="1.5" fill={color} />
          <circle cx="20" cy="21" r="1.5" fill={color} />
          <circle cx="24.5" cy="21" r="1.5" fill={color} />
          <circle cx="15.5" cy="26" r="1.5" fill={color} />
          <circle cx="20" cy="26" r="1.5" fill={color} />
          <circle cx="24.5" cy="26" r="1.5" fill={color} />
        </svg>
      );
    case "help":
      return (
        <svg viewBox="0 0 40 40" className="w-7 h-7" fill="none">
          <circle cx="20" cy="20" r="13" stroke={color} strokeWidth="2.4" />
          <path d="M16.5 16.5C17 14 22 14 23 16.5C24 19 20 20 20 22.5" stroke={color} strokeWidth="2.4" strokeLinecap="round" />
          <circle cx="20" cy="27" r="1.5" fill={color} />
        </svg>
      );
    case "chat":
      return (
        <svg viewBox="0 0 40 40" className="w-7 h-7" fill="none">
          <path d="M9 10H31C32.7 10 34 11.3 34 13V25C34 26.7 32.7 28 31 28H17L10 33V28H9C7.3 28 6 26.7 6 25V13C6 11.3 7.3 10 9 10Z" stroke={color} strokeWidth="2.4" strokeLinejoin="round" />
          <path d="M14 19H26M14 23H21" stroke={color} strokeWidth="2.4" strokeLinecap="round" />
        </svg>
      );
    default:
      return null;
  }
}

export default function Home() {
  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-8 md:py-10">
      {/* BANNER PRINCIPAL DE IMPACTO (LARGURA TOTAL, LIMPO E ELEGANTE) */}
      <section className="mb-10 animate-fade-in-up">
        <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#0f2537] via-[#153448] to-[#1e4d3b] text-white px-7 py-9 sm:px-12 sm:py-11 shadow-lg">
          {/* Círculos geométricos discretos no canto direito */}
          <svg
            className="pointer-events-none absolute -right-16 -bottom-16 w-96 h-96 opacity-10"
            viewBox="0 0 200 200"
            fill="none"
          >
            <circle cx="100" cy="100" r="90" stroke="#ffffff" strokeWidth="2" strokeDasharray="8 8" />
            <circle cx="100" cy="100" r="65" stroke="#fbbf24" strokeWidth="1.5" />
          </svg>

          <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-wider uppercase text-amber-300 bg-white/10 border border-white/15 px-3.5 py-1 rounded-full mb-4">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                Colégio Estadual Cívico-Militar Vereador Luiz Zanchim
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-3 leading-tight">
                Um espaço digital pensado para o seu dia a dia escolar
              </h1>
              <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-7 max-w-xl mx-auto lg:mx-0">
                Acesse apostilas e resumos, consulte o cardápio da cantina, acompanhe o Grêmio Estudantil e planeje suas notas trimestrais com praticidade.
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                <Link
                  href="/materiais"
                  className="bg-[#c45c26] hover:bg-[#ad4e1d] text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition-all shadow-sm"
                >
                  Explorar Materiais
                </Link>
                <Link
                  href="/calculadora"
                  className="bg-white text-slate-900 hover:bg-slate-100 font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition-all shadow-sm"
                >
                  Calculadora Trimestral
                </Link>
                <Link
                  href="/sugestoes"
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-xs sm:text-sm px-5 py-3 rounded-xl transition-all"
                >
                  Ouvidoria Anônima
                </Link>
              </div>
            </div>

            <div className="shrink-0">
              <SchoolLogoShowcase size={136} />
            </div>
          </div>
        </div>
      </section>

      {/* ESTRUTURA ASSIMÉTRICA LIMPA: 8 COLUNAS (MÓDULOS) + 4 COLUNAS (PAINEL DO ESTUDANTE) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* ÁREA PRINCIPAL (8 COLUNAS): MÓDULOS DO PORTAL */}
        <div className="lg:col-span-8">
          <div className="flex items-end justify-between mb-5">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                Acesso Rápido aos Módulos
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Escolha a área que deseja consultar agora
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {services.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="group bg-white border border-slate-200/80 hover:border-slate-300 rounded-2xl p-5 flex items-start gap-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
              >
                <div
                  className="w-13 h-13 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105"
                  style={{ backgroundColor: service.softBg }}
                >
                  <CleanServiceIcon type={service.icon} color={service.accent} />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span
                      className="text-[10px] font-bold uppercase tracking-wider"
                      style={{ color: service.accent }}
                    >
                      {service.tag}
                    </span>
                    <span className="text-slate-300 group-hover:text-slate-700 group-hover:translate-x-0.5 transition-all text-sm">
                      →
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-[15px] mb-1 group-hover:text-[#c45c26] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                    {service.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* PAINEL LATERAL ÚNICO E ORGANIZADO (4 COLUNAS): INFORMAÇÕES ÚTEIS */}
        <aside className="lg:col-span-4">
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-2xs space-y-6">
            {/* Bloco 1: Resumo do Sistema Trimestral */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                  Sistema de Avaliação
                </span>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                  180 pts no ano
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3">
                  <p className="text-[11px] text-slate-500 font-medium">1º Trim.</p>
                  <p className="text-sm font-extrabold text-slate-900 mt-0.5">100 pts</p>
                </div>
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3">
                  <p className="text-[11px] text-slate-500 font-medium">2º Trim.</p>
                  <p className="text-sm font-extrabold text-slate-900 mt-0.5">100 pts</p>
                </div>
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3">
                  <p className="text-[11px] text-slate-500 font-medium">3º Trim.</p>
                  <p className="text-sm font-extrabold text-slate-900 mt-0.5">100 pts</p>
                </div>
              </div>
              <Link
                href="/calculadora"
                className="mt-3 w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors"
              >
                Simular minha média agora →
              </Link>
            </div>

            <hr className="border-slate-100" />

            {/* Bloco 2: Horários de Funcionamento */}
            <div>
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-3">
                Horários da Unidade
              </h3>
              <div className="space-y-2.5 text-xs">
                <div className="flex items-center justify-between py-2 px-3 rounded-xl bg-slate-50">
                  <span className="font-semibold text-slate-700">Turno Matutino</span>
                  <span className="text-slate-500 font-medium">07h20 às 12h00</span>
                </div>
                <div className="flex items-center justify-between py-2 px-3 rounded-xl bg-slate-50">
                  <span className="font-semibold text-slate-700">Turno Vespertino</span>
                  <span className="text-slate-500 font-medium">13h20 às 18h00</span>
                </div>
                <div className="flex items-center justify-between py-2 px-3 rounded-xl bg-slate-50">
                  <span className="font-semibold text-slate-700">Secretaria e Biblioteca</span>
                  <span className="text-slate-500 font-medium">08h00 às 17h00</span>
                </div>
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* Bloco 3: Ouvidoria Protegida por IA */}
            <div className="bg-gradient-to-br from-emerald-950 to-[#0f2537] text-white rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                  Escuta Protegida por IA
                </span>
              </div>
              <h4 className="font-bold text-sm mb-1.5">
                Canal de Sugestões 100% Anônimo
              </h4>
              <p className="text-xs text-white/75 leading-relaxed mb-4">
                Envie ideias, elogios ou reclamações sem registrar seu nome. A Inteligência Artificial valida o respeito da mensagem antes do envio.
              </p>
              <Link
                href="/sugestoes"
                className="inline-flex items-center justify-center w-full py-2 px-3 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold transition-colors"
              >
                Enviar mensagem confidencial
              </Link>
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
}
