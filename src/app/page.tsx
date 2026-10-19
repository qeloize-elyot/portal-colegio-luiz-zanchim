import Link from "next/link";
import { SchoolLogoShowcase } from "@/components/SvgDecorations";

const services = [
  {
    href: "/materiais",
    title: "Materiais de Apoio",
    description: "Apostilas, slides, listas de exercícios e conteúdos divididos por ano, turma e matéria.",
    tag: "Acadêmico",
    accent: "#1e40af",
    softBg: "#eff6ff",
    icon: "book",
  },
  {
    href: "/cardapio",
    title: "Cardápio da Cantina",
    description: "Programação nutricional da semana com os lanches do recreio e refeições principais.",
    tag: "Alimentação",
    accent: "#c2410c",
    softBg: "#fff7ed",
    icon: "apple",
  },
  {
    href: "/gremio",
    title: "Painel do Grêmio",
    description: "Comunicados oficiais, gincanas, projetos culturais e ações da liderança estudantil.",
    tag: "Comunidade",
    accent: "#b45309",
    softBg: "#fffbeb",
    icon: "megaphone",
  },
  {
    href: "/enquetes",
    title: "Enquetes Escolares",
    description: "Participe das votações ativas e ajude a decidir projetos e melhorias para o colégio.",
    tag: "Democracia",
    accent: "#4338ca",
    softBg: "#eef2ff",
    icon: "vote",
  },
  {
    href: "/feira",
    title: "Feira de Trocas",
    description: "Espaço solidário para doação, troca ou venda de livros didáticos e uniformes.",
    tag: "Sustentabilidade",
    accent: "#15803d",
    softBg: "#f0fdf4",
    icon: "swap",
  },
  {
    href: "/calculadora",
    title: "Calculadora Trimestral",
    description: "Simule suas notas dos 3 trimestres (0 a 100 pts) e acompanhe a meta de 180 pontos.",
    tag: "Planejamento",
    accent: "#0f766e",
    softBg: "#f0fdfa",
    icon: "calc",
  },
  {
    href: "/faq",
    title: "Dúvidas Frequentes",
    description: "Consulte normas de uniforme, horários de turnos, atestados e procedimentos da secretaria.",
    tag: "Regimento",
    accent: "#9a3412",
    softBg: "#fff7ed",
    icon: "help",
  },
  {
    href: "/sugestoes",
    title: "Ouvidoria Anônima",
    description: "Canal 100% confidencial com moderação inteligente por IA para sugestões e críticas.",
    tag: "Escuta Segura",
    accent: "#047857",
    softBg: "#ecfdf5",
    icon: "chat",
  },
];

function ModernServiceIcon({ type, color }: { type: string; color: string }) {
  switch (type) {
    case "book":
      return (
        <svg viewBox="0 0 48 48" className="w-8 h-8" fill="none">
          <path d="M8 12C15 9.5 21 10.5 24 13.5C27 10.5 33 9.5 40 12V36C33 33.5 27 34.5 24 37.5C21 34.5 15 33.5 8 36V12Z" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="2.8" strokeLinejoin="round" />
          <path d="M24 13.5V37.5" stroke={color} strokeWidth="2.8" />
          <path d="M13 19H20M13 25H19M28 19H35M28 25H34" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
    case "apple":
      return (
        <svg viewBox="0 0 48 48" className="w-8 h-8" fill="none">
          <path d="M14 28C14 19 30 19 30 28H14Z" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="2.6" strokeLinejoin="round" />
          <path d="M12 31H32M14 35H30" stroke={color} strokeWidth="2.8" strokeLinecap="round" />
          <path d="M33 18H40L38 35H34L33 18Z" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M36 18L38 12H41" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
    case "megaphone":
      return (
        <svg viewBox="0 0 48 48" className="w-8 h-8" fill="none">
          <polygon points="12,21 34,12 34,36 12,27" fill={color} fillOpacity="0.18" stroke={color} strokeWidth="2.8" strokeLinejoin="round" />
          <rect x="7" y="20" width="5" height="8" rx="2" stroke={color} strokeWidth="2.6" />
          <path d="M14 27L17 37H13L11 27" stroke={color} strokeWidth="2.6" strokeLinejoin="round" />
          <path d="M39 18C41.5 21.5 41.5 26.5 39 30" stroke={color} strokeWidth="2.8" strokeLinecap="round" />
        </svg>
      );
    case "vote":
      return (
        <svg viewBox="0 0 48 48" className="w-8 h-8" fill="none">
          <rect x="8" y="10" width="32" height="28" rx="6" fill={color} fillOpacity="0.12" stroke={color} strokeWidth="2.8" />
          <path d="M16 30V24M24 30V17M32 30V21" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      );
    case "swap":
      return (
        <svg viewBox="0 0 48 48" className="w-8 h-8" fill="none">
          <path d="M12 18H36L30 12M36 30H12L18 36" stroke={color} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="18" y="21" width="12" height="6" rx="2" fill={color} fillOpacity="0.2" />
        </svg>
      );
    case "calc":
      return (
        <svg viewBox="0 0 48 48" className="w-8 h-8" fill="none">
          <rect x="12" y="7" width="24" height="34" rx="5" fill={color} fillOpacity="0.12" stroke={color} strokeWidth="2.8" />
          <rect x="16" y="12" width="16" height="7" rx="2" fill={color} fillOpacity="0.25" />
          <circle cx="18" cy="25" r="2" fill={color} />
          <circle cx="24" cy="25" r="2" fill={color} />
          <circle cx="30" cy="25" r="2" fill={color} />
          <circle cx="18" cy="31" r="2" fill={color} />
          <circle cx="24" cy="31" r="2" fill={color} />
          <circle cx="30" cy="31" r="2" fill={color} />
        </svg>
      );
    case "help":
      return (
        <svg viewBox="0 0 48 48" className="w-8 h-8" fill="none">
          <circle cx="24" cy="24" r="16" fill={color} fillOpacity="0.12" stroke={color} strokeWidth="2.8" />
          <path d="M19.5 19.5C20 16.5 26.5 16.5 27.5 19.5C28.5 22.5 24 23.5 24 27" stroke={color} strokeWidth="2.8" strokeLinecap="round" />
          <circle cx="24" cy="32.5" r="1.8" fill={color} />
        </svg>
      );
    case "chat":
      return (
        <svg viewBox="0 0 48 48" className="w-8 h-8" fill="none">
          <path d="M10 12H38C40.2 12 42 13.8 42 16V30C42 32.2 40.2 34 38 34H20L12 40V34H10C7.8 34 6 32.2 6 30V16C6 13.8 7.8 12 10 12Z" fill={color} fillOpacity="0.14" stroke={color} strokeWidth="2.8" strokeLinejoin="round" />
          <circle cx="18" cy="23" r="2" fill={color} />
          <circle cx="24" cy="23" r="2" fill={color} />
          <circle cx="30" cy="23" r="2" fill={color} />
        </svg>
      );
    default:
      return null;
  }
}

export default function Home() {
  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-8 py-7">
      {/* LAYOUT DE DASHBOARD EM 3 COLUNAS (PREENCHE TODA A TELA) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-7 items-start">
        
        {/* COLUNA ESQUERDA (SIDEBAR DE ACESSO RÁPIDO E IDENTIDADE) — 3 COLUNAS */}
        <aside className="xl:col-span-3 space-y-6">
          {/* Card do Colégio */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-xs">
            <div className="flex items-center gap-3.5 pb-4 border-b border-slate-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.png"
                alt="Brasão CCMPR"
                className="w-14 h-14 rounded-full ring-2 ring-[#0f2537]/15 object-contain bg-white p-0.5"
              />
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-100 text-amber-900">
                  CCMPR · Paraná
                </span>
                <h2 className="font-extrabold text-slate-900 text-sm mt-1 leading-snug">
                  Colégio Estadual Cívico-Militar Vereador Luiz Zanchim
                </h2>
              </div>
            </div>

            <div className="mt-4 space-y-2.5 text-xs">
              <div className="flex items-center justify-between py-1.5 px-3 rounded-xl bg-slate-50">
                <span className="text-slate-500 font-medium">Modelo Letivo</span>
                <span className="font-bold text-slate-800">3 Trimestres</span>
              </div>
              <div className="flex items-center justify-between py-1.5 px-3 rounded-xl bg-slate-50">
                <span className="text-slate-500 font-medium">Meta Anual</span>
                <span className="font-bold text-emerald-700">180 Pontos</span>
              </div>
              <div className="flex items-center justify-between py-1.5 px-3 rounded-xl bg-slate-50">
                <span className="text-slate-500 font-medium">Acesso</span>
                <span className="font-bold text-slate-800">@escola.pr.gov.br</span>
              </div>
            </div>
          </div>

          {/* Menu Lateral de Atalhos Diretos */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-5 shadow-xs">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 px-2 mb-3">
              Menu Rápido do Aluno
            </h3>
            <div className="space-y-1">
              {services.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className="flex items-center justify-between px-3 py-2.5 rounded-2xl text-xs font-bold text-slate-700 hover:bg-slate-100 hover:text-[#0f2537] transition-colors group"
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: s.accent }}
                    />
                    <span>{s.title}</span>
                  </div>
                  <span className="text-slate-400 group-hover:translate-x-0.5 transition-transform">
                    →
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Card de Destaque da Calculadora Trimestral */}
          <div className="bg-gradient-to-br from-[#0f2537] to-[#1e3a5f] text-white rounded-3xl p-6 shadow-md relative overflow-hidden">
            <svg className="absolute -right-6 -bottom-6 w-28 h-28 opacity-10" viewBox="0 0 100 100" fill="none">
              <circle cx="50" cy="50" r="40" stroke="#ffffff" strokeWidth="8" />
            </svg>
            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-300">
              Simulador Oficial
            </span>
            <h3 className="font-extrabold text-base mt-1 mb-2">
              Já calculou sua pontuação neste trimestre?
            </h3>
            <p className="text-xs text-white/80 leading-relaxed mb-4">
              Cada trimestre vale 100 pontos. Confira quantos pontos faltam para atingir os 180 pontos no ano.
            </p>
            <Link
              href="/calculadora"
              className="inline-flex items-center justify-center w-full py-2.5 px-4 rounded-xl bg-amber-400 text-slate-950 font-extrabold text-xs hover:bg-amber-300 transition-colors"
            >
              Abrir Calculadora de Notas
            </Link>
          </div>
        </aside>

        {/* COLUNA CENTRAL (HERO + SERVIÇOS BENTO GRID) — 6 COLUNAS */}
        <div className="xl:col-span-6 space-y-7">
          {/* Hero Banner Refinado */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0f2537] via-[#183b4e] to-[#1f513f] text-white p-7 sm:p-9 shadow-lg border border-white/10">
            <svg
              className="pointer-events-none absolute -right-12 -bottom-12 w-72 h-72 opacity-15"
              viewBox="0 0 200 200"
              fill="none"
            >
              <circle cx="100" cy="100" r="85" stroke="#fbbf24" strokeWidth="3" strokeDasharray="10 8" />
              <circle cx="100" cy="100" r="60" stroke="#ffffff" strokeWidth="1.5" />
            </svg>

            <div className="relative flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="max-w-md text-center sm:text-left">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-amber-300 bg-white/10 border border-white/15 px-3 py-1 rounded-full mb-3">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  Plataforma Digital Unificada
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-3">
                  Tudo o que o estudante precisa, em um só lugar.
                </h1>
                <p className="text-white/85 text-sm leading-relaxed mb-5">
                  Consulte materiais didáticos, acompanhe o cardápio semanal, participe do Grêmio e utilize o canal de escuta protegido por IA.
                </p>
                <div className="flex flex-wrap justify-center sm:justify-start gap-2.5">
                  <Link
                    href="/materiais"
                    className="bg-[#c45c26] hover:bg-[#a64b1d] text-white font-bold text-xs px-5 py-3 rounded-xl transition-colors shadow-sm"
                  >
                    Acessar Materiais →
                  </Link>
                  <Link
                    href="/sugestoes"
                    className="bg-white/15 hover:bg-white/25 text-white border border-white/25 font-bold text-xs px-5 py-3 rounded-xl transition-colors"
                  >
                    Ouvidoria Anônima
                  </Link>
                </div>
              </div>

              <div className="shrink-0">
                <SchoolLogoShowcase size={126} />
              </div>
            </div>
          </div>

          {/* Cabeçalho da Grade de Serviços */}
          <div className="flex items-center justify-between px-1">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900">
                Serviços e Áreas do Portal
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Selecione uma ferramenta abaixo para iniciar
              </p>
            </div>
            <span className="text-[11px] font-bold text-slate-500 bg-white border border-slate-200 px-3 py-1 rounded-full">
              8 módulos ativos
            </span>
          </div>

          {/* Grade de Cards Limpos e Profissionais (Estilo Bento Grid) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {services.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="group bg-white border border-slate-200/90 hover:border-slate-300 rounded-3xl p-5 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-lg relative overflow-hidden"
              >
                {/* Barra superior fina de cor de destaque */}
                <div
                  className="absolute top-0 left-0 right-0 h-1.5"
                  style={{ backgroundColor: service.accent }}
                />

                <div>
                  <div className="flex items-center justify-between gap-3 mb-4 pt-1">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center border border-black/5 transition-transform group-hover:scale-105"
                      style={{ backgroundColor: service.softBg }}
                    >
                      <ModernServiceIcon type={service.icon} color={service.accent} />
                    </div>
                    <span
                      className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full"
                      style={{
                        backgroundColor: service.softBg,
                        color: service.accent,
                      }}
                    >
                      {service.tag}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-slate-900 text-base mb-1.5 group-hover:text-[#c45c26] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-700 group-hover:text-[#c45c26]">
                  <span>Abrir módulo</span>
                  <span className="w-6 h-6 rounded-full bg-slate-100 group-hover:bg-[#c45c26] group-hover:text-white flex items-center justify-center transition-colors">
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* COLUNA DIREITA (PAINEL DE INFORMAÇÕES, HORÁRIOS E OUVIDORIA IA) — 3 COLUNAS */}
        <aside className="xl:col-span-3 space-y-6">
          {/* Quadro de Horários e Turnos */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-xs">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-[#c45c26]" />
              <h3 className="font-extrabold text-slate-900 text-sm">
                Horários de Funcionamento
              </h3>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <p className="font-bold text-slate-800">Turno Matutino</p>
                <p className="text-slate-500 mt-0.5">07h20 às 12h00</p>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <p className="font-bold text-slate-800">Turno Vespertino</p>
                <p className="text-slate-500 mt-0.5">13h20 às 18h00</p>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <p className="font-bold text-slate-800">Secretaria e Biblioteca</p>
                <p className="text-slate-500 mt-0.5">Segunda a Sexta · 08h às 17h</p>
              </div>
            </div>
          </div>

          {/* Card Explicativo da Moderação com IA */}
          <div className="bg-emerald-950 text-white rounded-3xl p-6 shadow-md relative overflow-hidden">
            <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider bg-emerald-800/80 text-emerald-200 px-2.5 py-1 rounded-full mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Proteção com IA Ativa
            </div>
            <h3 className="font-extrabold text-base mb-2">
              Ouvidoria Anônima Inteligente
            </h3>
            <p className="text-xs text-emerald-100/85 leading-relaxed mb-4">
              Suas sugestões e reclamações não registram nome nem e-mail. A IA analisa o contexto em tempo real para garantir respeito e bloquear ofensas.
            </p>
            <Link
              href="/sugestoes"
              className="inline-flex items-center justify-center w-full py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs transition-colors"
            >
              Enviar Mensagem Anônima
            </Link>
          </div>

          {/* Dúvidas Rápidas */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-xs">
            <h3 className="font-extrabold text-slate-900 text-sm mb-2">
              Precisa de ajuda rápida?
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed mb-4">
              Veja como solicitar atestado de matrícula, justificar faltas ou consultar normas do uniforme escolar.
            </p>
            <Link
              href="/faq"
              className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
            >
              <span>Consultar Perguntas Frequentes</span>
              <span>→</span>
            </Link>
          </div>
        </aside>

      </div>
    </div>
  );
}
