import Link from "next/link";
import { SchoolLogoShowcase } from "@/components/SvgDecorations";
import { IllustratedSvgSticker } from "@/components/HomeIllustrations";

const services = [
  {
    href: "/biblioteca",
    title: "Biblioteca",
    description: "Catálogo de livros, disponibilidade e empréstimo por 14 dias.",
    tag: "Acervo",
    cardBg: "bg-[#E8F0FE]",
    tagBg: "bg-[#1D4ED8] text-white",
    icon: "book",
    featured: true,
  },
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
    href: "/horarios",
    title: "Horários e Calendário",
    description: "Grades da manhã e tarde, calendário 2026 e horários dos professores.",
    tag: "Rotina",
    cardBg: "bg-[#FFF7ED]",
    tagBg: "bg-[#C2410C] text-white",
    icon: "calc",
    featured: false,
  },
  {
    href: "/laboratorios",
    title: "Laboratórios",
    description: "Reserva dos 3 labs de informática e consulta da grade.",
    tag: "Infraestrutura",
    cardBg: "bg-[#F0FDF4]",
    tagBg: "bg-[#15803D] text-white",
    icon: "help",
    featured: false,
  },
  {
    href: "/recados",
    title: "Recados e Eventos",
    description: "Mural oficial de recados, eventos e vídeos da direção.",
    tag: "Comunicados",
    cardBg: "bg-[#FEF3C7]",
    tagBg: "bg-[#B45309] text-white",
    icon: "megaphone",
    featured: false,
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
    title: "Minhas Notas",
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
        .svg-spin-reversible { animation: svgWiggle 3.5s ease-in-out infinite; transform-origin: center; }
        .svg-pulse { animation: svgPulse 1.8s ease-in-out infinite; }
        .svg-pulse-delayed { animation: svgPulse 1.8s ease-in-out 0.6s infinite; }
        .svg-steam-1 { animation: svgSteam 2.2s ease-in-out infinite; }
        .svg-steam-2 { animation: svgSteam 2.2s ease-in-out 0.7s infinite; }
      `}</style>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 pt-6 md:pt-10">
        <section className="mb-12 relative">
          <div className="hidden sm:flex justify-around px-12 -mb-3 relative z-20 pointer-events-none">
            {Array.from({ length: 12 }).map((_, idx) => (
              <svg key={idx} viewBox="0 0 24 32" className="w-6 h-8">
                <rect x="6" y="2" width="10" height="24" rx="5" fill="#F4B41A" stroke="#0F1E36" strokeWidth="3" />
                <circle cx="11" cy="24" r="4.5" fill="#0F1E36" />
              </svg>
            ))}
          </div>

          <div className="relative overflow-hidden rounded-[28px] bg-[#0F1E36] text-[#FFFDF9] border-[3px] border-[#0F1E36] shadow-[8px_8px_0px_#E04F33] px-6 py-9 sm:px-12 sm:py-12">
            <svg className="pointer-events-none absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="school-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#FFFDF9" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#school-grid)" />
            </svg>

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center gap-8">
              <div className="flex-1">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#F4B41A]">
                  Colégio Vereador Luiz Zanchim
                </p>
                <h1 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-semibold font-serif leading-tight">
                  Portal Escolar
                </h1>
                <p className="mt-4 text-sm sm:text-base text-white/80 max-w-lg leading-relaxed">
                  Materiais, horários, biblioteca, laboratórios, notas e canais da escola — tudo no
                  mesmo lugar, com cara de caderno de verdade.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/biblioteca"
                    className="px-5 py-2.5 rounded-xl bg-[#F4B41A] text-[#0F1E36] text-sm font-semibold border-2 border-[#FFFDF9] shadow-[3px_3px_0_#E04F33]"
                  >
                    Biblioteca
                  </Link>
                  <Link
                    href="/horarios"
                    className="px-5 py-2.5 rounded-xl bg-transparent text-white text-sm font-semibold border-2 border-white/40"
                  >
                    Horários
                  </Link>
                </div>
              </div>
              <div className="shrink-0 flex justify-center">
                <SchoolLogoShowcase size={136} />
              </div>
            </div>
          </div>
        </section>

        <h2 className="text-xl font-semibold font-serif mb-4">Destaques</h2>
        <div className="grid sm:grid-cols-3 gap-4 mb-10">
          {featuredServices.map((service) => (
            <Link
              key={service.href}
              href={service.href}
              className={`${service.cardBg} border-[3px] border-[#0F1E36] rounded-2xl p-5 shadow-[4px_4px_0_#0F1E36] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0_#0F1E36] transition-all block`}
            >
              <div className="flex items-start justify-between gap-3">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border border-[#0F1E36] ${service.tagBg}`}>
                  {service.tag}
                </span>
                <IllustratedSvgSticker type={service.icon} />
              </div>
              <h3 className="mt-3 text-lg font-semibold font-serif">{service.title}</h3>
              <p className="mt-1.5 text-sm opacity-75 leading-snug">{service.description}</p>
            </Link>
          ))}
        </div>

        <h2 className="text-xl font-semibold font-serif mb-4">Todos os serviços</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {regularServices.map((service) => (
            <Link
              key={service.href}
              href={service.href}
              className={`${service.cardBg} border-[3px] border-[#0F1E36] rounded-2xl p-5 shadow-[4px_4px_0_#0F1E36] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0_#0F1E36] transition-all block`}
            >
              <div className="flex items-start justify-between gap-3">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border border-[#0F1E36] ${service.tagBg}`}>
                  {service.tag}
                </span>
                <IllustratedSvgSticker type={service.icon} />
              </div>
              <h3 className="mt-3 text-lg font-semibold font-serif">{service.title}</h3>
              <p className="mt-1.5 text-sm opacity-75 leading-snug">{service.description}</p>
            </Link>
          ))}
        </div>

        <p className="mt-12 text-center text-xs opacity-50">
          Use o menu ☰ no topo · Portal de uso interno · Colégio Vereador Luiz Zanchim
        </p>
      </div>
    </div>
  );
}
