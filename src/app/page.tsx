import Link from "next/link";
import { SchoolLogoShowcase } from "@/components/SvgDecorations";

const services = [
  {
    href: "/materiais",
    title: "Materiais de Apoio",
    description: "Apostilas, slides e listas de exercícios por série, turma e disciplina.",
    tag: "Estudos",
    cardBg: "bg-[#EBF3FF]",
    tagBg: "bg-[#2554C7] text-white",
    icon: "book",
    featured: true,
  },
  {
    href: "/cardapio",
    title: "Cardápio da Cantina",
    description: "Programação semanal de lanches do recreio e refeições principais.",
    tag: "Rotina",
    cardBg: "bg-[#FFF0E5]",
    tagBg: "bg-[#E04F33] text-white",
    icon: "apple",
    featured: true,
  },
  {
    href: "/gremio",
    title: "Painel do Grêmio",
    description: "Comunicados oficiais, gincanas, eventos culturais e avisos estudantis.",
    tag: "Comunidade",
    cardBg: "bg-[#FFF8DB]",
    tagBg: "bg-[#D97706] text-white",
    icon: "megaphone",
    featured: false,
  },
  {
    href: "/enquetes",
    title: "Enquetes Escolares",
    description: "Participe das votações ativas e ajude nas decisões da escola.",
    tag: "Voz Ativa",
    cardBg: "bg-[#F2EEFF]",
    tagBg: "bg-[#5B3FD9] text-white",
    icon: "vote",
    featured: false,
  },
  {
    href: "/feira",
    title: "Feira de Trocas",
    description: "Espaço solidário para doação, troca ou venda de livros e uniformes.",
    tag: "Sustentável",
    cardBg: "bg-[#E6F8EF]",
    tagBg: "bg-[#15803D] text-white",
    icon: "swap",
    featured: false,
  },
  {
    href: "/calculadora",
    title: "Calculadora de Notas",
    description: "Simule suas notas dos 3 trimestres e acompanhe a meta de 180 pontos.",
    tag: "Planejamento",
    cardBg: "bg-[#E6F7F8]",
    tagBg: "bg-[#0F766E] text-white",
    icon: "calc",
    featured: false,
  },
  {
    href: "/faq",
    title: "Dúvidas Frequentes",
    description: "Normas de uniforme, horários de aulas, atestados e secretaria.",
    tag: "Guia Rápido",
    cardBg: "bg-[#FDECEB]",
    tagBg: "bg-[#B91C1C] text-white",
    icon: "help",
    featured: false,
  },
  {
    href: "/sugestoes",
    title: "Ouvidoria Anônima",
    description: "Canal confidencial com moderação por IA para sugestões e críticas.",
    tag: "Escuta Segura",
    cardBg: "bg-[#E9F7EF]",
    tagBg: "bg-[#1B5E4A] text-white",
    icon: "chat",
    featured: false,
  },
];

function IllustratedSvgSticker({ type }: { type: string }) {
  switch (type) {
    case "book":
      return (
        <svg viewBox="0 0 80 80" className="w-16 h-16 overflow-visible">
          {/* Sombra base */}
          <ellipse cx="40" cy="68" rx="24" ry="5" fill="#0F1E36" fillOpacity="0.15" />
          {/* Livro de baixo */}
          <g className="svg-float">
            <rect x="14" y="44" width="52" height="14" rx="4" fill="#E04F33" stroke="#0F1E36" strokeWidth="2.5" />
            <rect x="18" y="48" width="44" height="6" rx="2" fill="#FFF8EE" stroke="#0F1E36" strokeWidth="1.8" />
            {/* Livro do meio */}
            <rect x="18" y="30" width="46" height="14" rx="4" fill="#F4B41A" stroke="#0F1E36" strokeWidth="2.5" />
            <rect x="22" y="34" width="38" height="6" rx="2" fill="#FFF8EE" stroke="#0F1E36" strokeWidth="1.8" />
            {/* Livro aberto no topo */}
            <path
              d="M16 16 C28 13, 36 16, 40 21 C44 16, 52 13, 64 16 L64 31 C52 28, 44 31, 40 35 C36 31, 28 28, 16 31 Z"
              fill="#2554C7"
              stroke="#0F1E36"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            <path
              d="M19 13 C29 10, 36 13, 40 18 C44 13, 51 10, 61 13 L61 27 C51 24, 44 27, 40 31 C36 27, 29 24, 19 27 Z"
              fill="#FFFFFF"
              stroke="#0F1E36"
              strokeWidth="2.2"
              strokeLinejoin="round"
            />
            <line x1="40" y1="18" x2="40" y2="31" stroke="#0F1E36" strokeWidth="2.2" />
            {/* Marcador de página balançando */}
            <path d="M40 31 L36 43 L40 40 L44 43 Z" fill="#E04F33" stroke="#0F1E36" strokeWidth="1.8" />
          </g>
          {/* Estrelinha pulando */}
          <path
            className="svg-bounce"
            d="M66 10 L68 15 L73 17 L68 19 L66 24 L64 19 L59 17 L64 15 Z"
            fill="#F4B41A"
            stroke="#0F1E36"
            strokeWidth="1.8"
          />
        </svg>
      );

    case "apple":
      return (
        <svg viewBox="0 0 80 80" className="w-16 h-16 overflow-visible">
          <ellipse cx="40" cy="68" rx="26" ry="5" fill="#0F1E36" fillOpacity="0.15" />
          {/* Fumaça quentinha animada */}
          <path className="svg-steam-1" d="M26 22 Q23 15 28 10" fill="none" stroke="#E04F33" strokeWidth="2.5" strokeLinecap="round" />
          <path className="svg-steam-2" d="M38 19 Q35 12 40 7" fill="none" stroke="#E04F33" strokeWidth="2.5" strokeLinecap="round" />
          <g className="svg-bounce-gentle">
            {/* Copo de suco */}
            <path d="M48 24 L64 24 L61 58 L51 58 Z" fill="#F4B41A" stroke="#0F1E36" strokeWidth="2.5" strokeLinejoin="round" />
            <path d="M56 24 L59 13 L66 11" fill="none" stroke="#E04F33" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
            {/* Maçã / Lanche */}
            <path
              d="M32 34 C22 28, 12 36, 15 49 C17 58, 26 62, 32 58 C38 62, 47 58, 49 49 C52 36, 42 28, 32 34 Z"
              fill="#E04F33"
              stroke="#0F1E36"
              strokeWidth="2.5"
            />
            {/* Folha da maçã */}
            <path d="M32 33 C33 24, 42 22, 43 28 C39 31, 35 33, 32 33 Z" fill="#16A34A" stroke="#0F1E36" strokeWidth="2.2" />
            {/* Brilho */}
            <path d="M21 41 C20 45, 21 49, 23 51" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
          </g>
        </svg>
      );

    case "megaphone":
      return (
        <svg viewBox="0 0 80 80" className="w-14 h-14 overflow-visible">
          <g className="svg-wiggle">
            {/* Cabo */}
            <path d="M22 44 L26 62 L18 62 L14 42 Z" fill="#E04F33" stroke="#0F1E36" strokeWidth="2.5" strokeLinejoin="round" />
            {/* Corpo do Megafone */}
            <polygon points="14,34 54,16 54,56 14,44" fill="#F4B41A" stroke="#0F1E36" strokeWidth="2.5" strokeLinejoin="round" />
            <rect x="9" y="32" width="7" height="14" rx="3" fill="#2554C7" stroke="#0F1E36" strokeWidth="2.5" />
            <ellipse cx="54" cy="36" rx="5" ry="20" fill="#FFF8EE" stroke="#0F1E36" strokeWidth="2.5" />
          </g>
          {/* Ondas sonoras pulsando */}
          <path className="svg-pulse" d="M64 25 C69 31, 69 41, 64 47" fill="none" stroke="#E04F33" strokeWidth="3" strokeLinecap="round" />
          <path className="svg-pulse-delayed" d="M70 19 C77 28, 77 44, 70 53" fill="none" stroke="#2554C7" strokeWidth="2.8" strokeLinecap="round" />
        </svg>
      );

    case "vote":
      return (
        <svg viewBox="0 0 80 80" className="w-14 h-14 overflow-visible">
          {/* Urna */}
          <rect x="14" y="34" width="52" height="32" rx="6" fill="#5B3FD9" stroke="#0F1E36" strokeWidth="2.5" />
          <rect x="10" y="28" width="60" height="10" rx="4" fill="#F4B41A" stroke="#0F1E36" strokeWidth="2.5" />
          <line x1="28" y1="33" x2="52" y2="33" stroke="#0F1E36" strokeWidth="3.5" strokeLinecap="round" />
          {/* Cédula entrando animada */}
          <g className="svg-bounce">
            <rect x="30" y="10" width="20" height="22" rx="3" fill="#FFFFFF" stroke="#0F1E36" strokeWidth="2.5" />
            <path d="M35 21 L39 25 L46 17" fill="none" stroke="#16A34A" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
          </g>
          {/* Barras de gráfico na frente da urna */}
          <rect x="26" y="52" width="6" height="9" rx="1.5" fill="#FFFFFF" />
          <rect x="37" y="45" width="6" height="16" rx="1.5" fill="#F4B41A" />
          <rect x="48" y="49" width="6" height="12" rx="1.5" fill="#FFFFFF" />
        </svg>
      );

    case "swap":
      return (
        <svg viewBox="0 0 80 80" className="w-14 h-14 overflow-visible">
          <g className="svg-spin-reversible">
            {/* Seta Superior */}
            <path
              d="M16 32 C18 18, 34 12, 52 16 L46 10 M52 16 L44 23"
              fill="none"
              stroke="#15803D"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Seta Inferior */}
            <path
              d="M64 48 C62 62, 46 68, 28 64 L34 70 M28 64 L36 57"
              fill="none"
              stroke="#E04F33"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          {/* Camiseta / Livro no centro */}
          <rect x="28" y="27" width="24" height="26" rx="5" fill="#F4B41A" stroke="#0F1E36" strokeWidth="2.5" />
          <path d="M35 37 L40 42 L46 35" fill="none" stroke="#0F1E36" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case "calc":
      return (
        <svg viewBox="0 0 80 80" className="w-14 h-14 overflow-visible">
          <g className="svg-float">
            <rect x="18" y="10" width="44" height="60" rx="8" fill="#0F766E" stroke="#0F1E36" strokeWidth="2.5" />
            {/* Visor */}
            <rect x="24" y="17" width="32" height="14" rx="3" fill="#D1FAE5" stroke="#0F1E36" strokeWidth="2.2" />
            <text x="30" y="28" fill="#0F1E36" fontSize="11" fontWeight="900" fontFamily="monospace">
              180
            </text>
            {/* Cursor piscando */}
            <rect className="svg-pulse" x="50" y="20" width="2.5" height="8" fill="#E04F33" />
            {/* Botões coloridos */}
            <rect x="24" y="37" width="8" height="8" rx="2" fill="#FFFFFF" stroke="#0F1E36" strokeWidth="1.8" />
            <rect x="36" y="37" width="8" height="8" rx="2" fill="#FFFFFF" stroke="#0F1E36" strokeWidth="1.8" />
            <rect x="48" y="37" width="8" height="8" rx="2" fill="#F4B41A" stroke="#0F1E36" strokeWidth="1.8" />
            <rect x="24" y="49" width="8" height="8" rx="2" fill="#FFFFFF" stroke="#0F1E36" strokeWidth="1.8" />
            <rect x="36" y="49" width="8" height="8" rx="2" fill="#FFFFFF" stroke="#0F1E36" strokeWidth="1.8" />
            <rect x="48" y="49" width="8" height="14" rx="2" fill="#E04F33" stroke="#0F1E36" strokeWidth="1.8" />
          </g>
        </svg>
      );

    case "help":
      return (
        <svg viewBox="0 0 80 80" className="w-14 h-14 overflow-visible">
          <g className="svg-bounce-gentle">
            {/* Balão de bússola / guia */}
            <circle cx="40" cy="40" r="26" fill="#F4B41A" stroke="#0F1E36" strokeWidth="2.5" />
            <circle cx="40" cy="40" r="20" fill="#FFF8EE" stroke="#0F1E36" strokeWidth="2" />
            <path
              d="M34 33 C34 27, 46 27, 46 34 C46 39, 40 40, 40 45"
              fill="none"
              stroke="#E04F33"
              strokeWidth="3.8"
              strokeLinecap="round"
            />
            <circle cx="40" cy="52" r="2.5" fill="#0F1E36" />
          </g>
        </svg>
      );

    case "chat":
      return (
        <svg viewBox="0 0 80 80" className="w-14 h-14 overflow-visible">
          <g className="svg-float">
            {/* Balão principal */}
            <path
              d="M14 20 H56 C60 20, 64 24, 64 28 V48 C64 52, 60 56, 56 56 H32 L18 66 V56 H14 C10 56, 6 52, 6 48 V28 C6 24, 10 20, 14 20 Z"
              fill="#1B5E4A"
              stroke="#0F1E36"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            {/* Escudo / Cadeado de proteção IA */}
            <path
              className="svg-bounce"
              d="M56 14 L72 20 V32 C72 42, 64 48, 56 51 C48 48, 40 42, 40 32 V20 Z"
              fill="#F4B41A"
              stroke="#0F1E36"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            <path d="M51 32 L55 36 L62 28" fill="none" stroke="#0F1E36" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
            {/* Linhas de conversa */}
            <line x1="16" y1="33" x2="32" y2="33" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
            <line x1="16" y1="42" x2="26" y2="42" stroke="#A7F3D0" strokeWidth="3" strokeLinecap="round" />
          </g>
        </svg>
      );

    default:
      return null;
  }
}

export default function Home() {
  const featuredServices = services.filter((s) => s.featured);
  const regularServices = services.filter((s) => !s.featured);

  return (
    <div
      className="min-h-screen text-[#0F1E36] pb-16"
      style={{
        backgroundColor: "#F7F3E8",
        backgroundImage: "radial-gradient(#0F1E36 1px, transparent 1px)",
        backgroundSize: "24px 24px",
        backgroundPosition: "0 0",
      }}
    >
      {/* ANIMAÇÕES SVG EXCLUSIVAS */}
      <style>{`
        @keyframes svgFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-6px) rotate(1.5deg); }
        }
        @keyframes svgBounce {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes svgBounceGentle {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-4px) scale(1.03); }
        }
        @keyframes svgWiggle {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(5deg); }
        }
        @keyframes svgPlane {
          0%, 100% { transform: translate(0px, 0px) rotate(-2deg); }
          50% { transform: translate(10px, -10px) rotate(4deg); }
        }
        @keyframes svgSpinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes svgPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.35; transform: scale(0.92); }
        }
        @keyframes svgSteam {
          0%, 100% { transform: translateY(0px); opacity: 0.85; }
          50% { transform: translateY(-5px); opacity: 0.25; }
        }
        .svg-float { animation: svgFloat 4s ease-in-out infinite; transform-origin: center; }
        .svg-bounce { animation: svgBounce 2.4s ease-in-out infinite; transform-origin: center; }
        .svg-bounce-gentle { animation: svgBounceGentle 3.2s ease-in-out infinite; transform-origin: center; }
        .svg-wiggle { animation: svgWiggle 2.6s ease-in-out infinite; transform-origin: 25% 60%; }
        .svg-plane { animation: svgPlane 4.5s ease-in-out infinite; }
        .svg-spin-slow { animation: svgSpinSlow 18s linear infinite; transform-origin: center; }
        .svg-spin-reversible { animation: svgWiggle 3.5s ease-in-out infinite; transform-origin: center; }
        .svg-pulse { animation: svgPulse 1.8s ease-in-out infinite; }
        .svg-pulse-delayed { animation: svgPulse 1.8s ease-in-out 0.6s infinite; }
        .svg-steam-1 { animation: svgSteam 2.2s ease-in-out infinite; }
        .svg-steam-2 { animation: svgSteam 2.2s ease-in-out 0.7s infinite; }
      `}</style>

      {/* CAMADA SUAVE PARA SUAVIZAR OS PONTINHOS DO CADERNO */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 pt-6 md:pt-10">
        {/* MURAL DE ABERTURA ESTILO CAPA DE CADERNO ILUSTRADA */}
        <section className="mb-12 relative">
          {/* Argolas de Caderno Espiral no Topo (SVG) */}
          <div className="hidden sm:flex justify-around px-12 -mb-3 relative z-20 pointer-events-none">
            {Array.from({ length: 12 }).map((_, idx) => (
              <svg key={idx} viewBox="0 0 24 32" className="w-6 h-8">
                <rect x="6" y="2" width="10" height="24" rx="5" fill="#F4B41A" stroke="#0F1E36" strokeWidth="3" />
                <circle cx="11" cy="24" r="4.5" fill="#0F1E36" />
              </svg>
            ))}
          </div>

          <div className="relative overflow-hidden rounded-[28px] bg-[#0F1E36] text-[#FFFDF9] border-[3px] border-[#0F1E36] shadow-[8px_8px_0px_#E04F33] px-6 py-9 sm:px-12 sm:py-12">
            {/* Papel quadriculado sutil no fundo do mural */}
            <svg className="pointer-events-none absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="school-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#FFFDF9" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#school-grid)" />
            </svg>

            {/* Aviãozinho de Papel Voando com Trilha Pontilhada (SVG Animado) */}
            <svg
              viewBox="0 0 260 120"
              className="hidden md:block pointer-events-none absolute top-4 right-72 w-60 h-28 overflow-visible"
              fill="none"
            >
              <path
                d="M10 95 Q 90 20, 175 55 T 220 25"
                stroke="#F4B41A"
                strokeWidth="2.5"
                strokeDasharray="6 6"
                strokeLinecap="round"
              />
              <g className="svg-plane">
                <polygon
                  points="205,12 248,22 216,42 212,28"
                  fill="#FFFDF9"
                  stroke="#0F1E36"
                  strokeWidth="2.2"
                  strokeLinejoin="round"
                />
                <polygon
                  points="212,28 216,42 226,33"
                  fill="#E04F33"
                  stroke="#0F1E36"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
              </g>
            </svg>

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
              <div className="max-w-2xl text-center lg:text-left">
                {/* Etiqueta tipo fita adesiva escolar */}
                <div className="inline-flex items-center gap-2.5 bg-[#F4B41A] text-[#0F1E36] border-2 border-[#0F1E36] shadow-[3px_3px_0px_#FFFDF9] px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider mb-5 -rotate-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E04F33] border border-[#0F1E36]" />
                  Colégio Estadual Cívico-Militar Vereador Luiz Zanchim
                </div>

                <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-[#FFFDF9] mb-4 leading-[1.1]">
                  O mural digital do seu{" "}
                  <span className="relative inline-block text-[#F4B41A]">
                    dia a dia escolar
                    {/* Sublinhado desenhado à mão em SVG */}
                    <svg
                      viewBox="0 0 300 18"
                      className="w-full h-4 absolute -bottom-2 left-0 overflow-visible"
                      fill="none"
                    >
                      <path
                        d="M4 12 C80 3, 210 16, 296 7"
                        stroke="#E04F33"
                        strokeWidth="5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </h1>

                <p className="text-[#E2E8F0] text-sm sm:text-base leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0 font-medium">
                  Baixe apostilas e resumos, veja o que tem hoje na cantina, acompanhe os avisos do Grêmio Estudantil e simule suas notas nos 3 trimestres.
                </p>

                {/* Botões Táteis com Sombra Sólida */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-3.5">
                  <Link
                    href="/materiais"
                    className="bg-[#E04F33] hover:bg-[#f25d40] text-white font-black text-xs sm:text-sm px-6 py-3.5 rounded-xl border-2 border-[#FFFDF9] shadow-[4px_4px_0px_#FFFDF9] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#FFFDF9] transition-all"
                  >
                    Explorar Materiais →
                  </Link>
                  <Link
                    href="/calculadora"
                    className="bg-[#F4B41A] hover:bg-[#fbbf24] text-[#0F1E36] font-black text-xs sm:text-sm px-6 py-3.5 rounded-xl border-2 border-[#0F1E36] shadow-[4px_4px_0px_#FFFDF9] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#FFFDF9] transition-all"
                  >
                    Calculadora 180 Pts
                  </Link>
                  <Link
                    href="/sugestoes"
                    className="bg-[#1B5E4A] hover:bg-[#23755c] text-white font-bold text-xs sm:text-sm px-5 py-3.5 rounded-xl border-2 border-[#FFFDF9]/80 shadow-[4px_4px_0px_#091324] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                  >
                    Ouvidoria Anônima
                  </Link>
                </div>
              </div>

              {/* Brasão da Escola com Carimbo Giratório em SVG */}
              <div className="shrink-0 relative">
                {/* Selo giratório ao redor */}
                <svg
                  viewBox="0 0 200 200"
                  className="w-52 h-52 sm:w-56 sm:h-56 svg-spin-slow absolute -inset-4 pointer-events-none"
                >
                  <circle
                    cx="100"
                    cy="100"
                    r="90"
                    fill="none"
                    stroke="#F4B41A"
                    strokeWidth="2.5"
                    strokeDasharray="10 8"
                  />
                  <circle cx="100" cy="10" r="5" fill="#E04F33" />
                  <circle cx="190" cy="100" r="5" fill="#F4B41A" />
                  <circle cx="100" cy="190" r="5" fill="#E04F33" />
                  <circle cx="10" cy="100" r="5" fill="#F4B41A" />
                </svg>

                <div className="relative bg-[#FFFDF9] p-4 rounded-3xl border-[3px] border-[#0F1E36] shadow-[6px_6px_0px_#F4B41A] rotate-2 hover:rotate-0 transition-transform">
                  <SchoolLogoShowcase size={136} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CORPO ASSIMÉTRICO: 8 COLUNAS (MÓDULOS ILUSTRADOS) + 4 COLUNAS (BOLETIM & AVISOS) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* COLUNA PRINCIPAL (8 COLUNAS): MÓDULOS COM STICKERS SVG */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-2 bg-[#FFFDF9] border-[2.5px] border-[#0F1E36] rounded-2xl px-5 py-3.5 shadow-[4px_4px_0px_#0F1E36]">
              <div className="flex items-center gap-3">
                <span className="w-3.5 h-3.5 rounded-full bg-[#E04F33] border-2 border-[#0F1E36]" />
                <span className="w-3.5 h-3.5 rounded-full bg-[#F4B41A] border-2 border-[#0F1E36]" />
                <span className="w-3.5 h-3.5 rounded-full bg-[#16A34A] border-2 border-[#0F1E36]" />
                <h2 className="text-lg sm:text-xl font-black text-[#0F1E36] tracking-tight ml-1">
                  Mural de Serviços do Estudante
                </h2>
              </div>
              <span className="text-xs font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-[#F4B41A]/30 border border-[#0F1E36]">
                8 áreas disponíveis
              </span>
            </div>

            {/* 2 CARDS EM DESTAQUE NO TOPO (MATERIAIS E CANTINA) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {featuredServices.map((service) => (
                <Link
                  key={service.href}
                  href={service.href}
                  className={`group relative ${service.cardBg} border-[2.5px] border-[#0F1E36] rounded-3xl p-6 shadow-[6px_6px_0px_#0F1E36] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[3px_3px_0px_#0F1E36] transition-all flex flex-col justify-between overflow-hidden`}
                >
                  {/* Fita adesiva decorativa no topo do card */}
                  <div className="w-20 h-4 bg-[#FFFDF9]/80 border border-[#0F1E36]/30 -rotate-2 mx-auto -mt-8 mb-3 pointer-events-none" />

                  <div className="flex items-start justify-between gap-4">
                    <span
                      className={`text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full border-2 border-[#0F1E36] shadow-[2px_2px_0px_#0F1E36] ${service.tagBg}`}
                    >
                      {service.tag}
                    </span>

                    <div className="group-hover:scale-110 group-hover:-rotate-3 transition-transform">
                      <IllustratedSvgSticker type={service.icon} />
                    </div>
                  </div>

                  <div className="mt-3">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-xl font-black text-[#0F1E36] group-hover:text-[#E04F33] transition-colors">
                        {service.title}
                      </h3>
                      <span className="w-8 h-8 rounded-full bg-[#FFFDF9] border-2 border-[#0F1E36] flex items-center justify-center font-black text-sm group-hover:bg-[#F4B41A] transition-colors">
                        →
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#0F1E36]/80 font-medium leading-relaxed mt-1.5">
                      {service.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            {/* DEMAIS 6 MÓDULOS COM STICKERS SVG ANIMADOS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {regularServices.map((service) => (
                <Link
                  key={service.href}
                  href={service.href}
                  className={`group ${service.cardBg} border-[2.5px] border-[#0F1E36] rounded-2xl p-5 shadow-[5px_5px_0px_#0F1E36] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#0F1E36] transition-all flex items-center gap-4`}
                >
                  <div className="shrink-0 bg-[#FFFDF9] border-2 border-[#0F1E36] rounded-2xl p-2 shadow-[3px_3px_0px_#0F1E36] group-hover:scale-110 group-hover:rotate-3 transition-transform">
                    <IllustratedSvgSticker type={service.icon} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span
                        className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-md border border-[#0F1E36] ${service.tagBg}`}
                      >
                        {service.tag}
                      </span>
                      <span className="font-black text-[#0F1E36] group-hover:translate-x-1 transition-transform text-sm">
                        →
                      </span>
                    </div>
                    <h3 className="font-black text-[#0F1E36] text-base mb-1 group-hover:text-[#E04F33] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs text-[#0F1E36]/75 font-medium leading-relaxed line-clamp-2">
                      {service.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* PAINEL LATERAL (4 COLUNAS): FICHA DE BOLETIM + QUADRO DE HORÁRIOS + QUADRO-NEGRO */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Bloco 1: Ficha de Boletim Trimestral (180 Pontos) */}
            <div className="bg-[#FFFDF9] border-[2.5px] border-[#0F1E36] rounded-3xl p-6 shadow-[6px_6px_0px_#0F1E36] relative overflow-hidden">
              {/* Clipe de papel em SVG no canto */}
              <svg
                viewBox="0 0 40 70"
                className="w-8 h-14 absolute -top-2 right-6 pointer-events-none"
                fill="none"
              >
                <path
                  d="M14 10 V48 C14 56, 26 56, 26 48 V16 C26 11, 18 11, 18 16 V44"
                  stroke="#E04F33"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
              </svg>

              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#F4B41A] border-2 border-[#0F1E36] flex items-center justify-center shadow-[2px_2px_0px_#0F1E36]">
                  {/* Troféu SVG */}
                  <svg viewBox="0 0 32 32" className="w-6 h-6 svg-bounce-gentle" fill="none">
                    <path d="M9 6 H23 V14 C23 18, 19 21, 16 21 C13 21, 9 18, 9 14 Z" fill="#FFFDF9" stroke="#0F1E36" strokeWidth="2.2" />
                    <path d="M16 21 V26 M11 26 H21" stroke="#0F1E36" strokeWidth="2.4" strokeLinecap="round" />
                  </svg>
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#E04F33] block">
                    Sistema de Avaliação
                  </span>
                  <h3 className="text-base font-black text-[#0F1E36]">
                    Meta Anual: 180 Pontos
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2.5 text-center mb-4">
                {[
                  { trim: "1º Trim.", pts: "100 pts", bg: "bg-[#EBF3FF]" },
                  { trim: "2º Trim.", pts: "100 pts", bg: "bg-[#FFF8DB]" },
                  { trim: "3º Trim.", pts: "100 pts", bg: "bg-[#E6F8EF]" },
                ].map((item) => (
                  <div
                    key={item.trim}
                    className={`${item.bg} border-2 border-[#0F1E36] rounded-2xl p-3 shadow-[2px_2px_0px_#0F1E36]`}
                  >
                    <p className="text-[11px] text-[#0F1E36]/80 font-bold">{item.trim}</p>
                    <p className="text-sm font-black text-[#0F1E36] mt-0.5">{item.pts}</p>
                  </div>
                ))}
              </div>

              <Link
                href="/calculadora"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#0F1E36] hover:bg-[#1e355e] text-[#FFFDF9] text-xs font-black border-2 border-[#0F1E36] shadow-[3px_3px_0px_#F4B41A] transition-all"
              >
                Simular minha média agora →
              </Link>
            </div>

            {/* Bloco 2: Quadro de Horários com Relógio SVG Animado */}
            <div className="bg-[#FFFDF9] border-[2.5px] border-[#0F1E36] rounded-3xl p-6 shadow-[6px_6px_0px_#0F1E36]">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <svg viewBox="0 0 36 36" className="w-8 h-8" fill="none">
                    <circle cx="18" cy="18" r="15" fill="#FFF0E5" stroke="#0F1E36" strokeWidth="2.5" />
                    <line x1="18" y1="18" x2="18" y2="9" stroke="#E04F33" strokeWidth="2.5" strokeLinecap="round" />
                    <line
                      className="svg-spin-slow"
                      x1="18"
                      y1="18"
                      x2="25"
                      y2="18"
                      stroke="#0F1E36"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    <circle cx="18" cy="18" r="2" fill="#0F1E36" />
                  </svg>
                  <h3 className="text-sm font-black uppercase tracking-wider text-[#0F1E36]">
                    Horários da Unidade
                  </h3>
                </div>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex items-center justify-between py-2.5 px-3.5 rounded-xl bg-[#F7F3E8] border-2 border-[#0F1E36]">
                  <span className="font-extrabold text-[#0F1E36]">Turno Matutino</span>
                  <span className="bg-[#F4B41A] text-[#0F1E36] font-black px-2.5 py-0.5 rounded-md border border-[#0F1E36]">
                    07h20 às 12h00
                  </span>
                </div>
                <div className="flex items-center justify-between py-2.5 px-3.5 rounded-xl bg-[#F7F3E8] border-2 border-[#0F1E36]">
                  <span className="font-extrabold text-[#0F1E36]">Turno Vespertino</span>
                  <span className="bg-[#F4B41A] text-[#0F1E36] font-black px-2.5 py-0.5 rounded-md border border-[#0F1E36]">
                    13h20 às 18h00
                  </span>
                </div>
                <div className="flex items-center justify-between py-2.5 px-3.5 rounded-xl bg-[#F7F3E8] border-2 border-[#0F1E36]">
                  <span className="font-extrabold text-[#0F1E36]">Secretaria e Biblioteca</span>
                  <span className="bg-[#FFFDF9] text-[#0F1E36] font-black px-2.5 py-0.5 rounded-md border border-[#0F1E36]">
                    08h00 às 17h00
                  </span>
                </div>
              </div>
            </div>

            {/* Bloco 3: Ouvidoria Estilo Quadro-Negro Escolar */}
            <div className="bg-[#1B5E4A] text-[#FFFDF9] border-[3px] border-[#0F1E36] rounded-3xl p-6 shadow-[6px_6px_0px_#0F1E36] relative overflow-hidden">
              {/* Desenho de giz em SVG no canto */}
              <svg
                viewBox="0 0 100 100"
                className="w-24 h-24 absolute -right-4 -bottom-4 opacity-20 pointer-events-none"
                fill="none"
              >
                <path
                  d="M20 80 Q 45 20, 85 35 T 60 85 Z"
                  stroke="#FFFDF9"
                  strokeWidth="3"
                  strokeDasharray="5 5"
                />
              </svg>

              <div className="flex items-center gap-2 mb-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#F4B41A] animate-ping" />
                <span className="text-[11px] font-black uppercase tracking-wider text-[#F4B41A]">
                  Escuta Protegida por IA
                </span>
              </div>

              <h4 className="font-black text-base mb-2">
                Canal de Sugestões 100% Anônimo
              </h4>

              <p className="text-xs text-[#E2F2EC] leading-relaxed mb-5 font-medium">
                Envie ideias, elogios ou reclamações sem registrar seu nome. A Inteligência Artificial valida o respeito da mensagem antes do envio.
              </p>

              <Link
                href="/sugestoes"
                className="inline-flex items-center justify-center w-full py-3 px-4 rounded-xl bg-[#F4B41A] hover:bg-[#fbbf24] text-[#0F1E36] text-xs font-black border-2 border-[#0F1E36] shadow-[3px_3px_0px_#0F1E36] hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
              >
                Enviar mensagem confidencial →
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
