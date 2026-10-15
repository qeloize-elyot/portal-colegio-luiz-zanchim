import Link from "next/link";
import { SchoolLogoShowcase } from "@/components/SvgDecorations";

const services = [
  {
    href: "/materiais",
    title: "Materiais de Apoio",
    description: "Slides, listas e resumos por turma e disciplina.",
    tag: "Estudos",
    bgHeader: "#1e3a8a",
    icon: "book",
  },
  {
    href: "/cardapio",
    title: "Cardápio da Cantina",
    description: "Veja o que será servido durante a semana.",
    tag: "Rotina",
    bgHeader: "#1b365d",
    icon: "apple",
  },
  {
    href: "/gremio",
    title: "Painel do Grêmio",
    description: "Comunicados, eventos e novidades do Grêmio.",
    tag: "Participação",
    bgHeader: "#9a4520",
    icon: "megaphone",
  },
  {
    href: "/enquetes",
    title: "Enquetes",
    description: "Opine e ajude a construir decisões da escola.",
    tag: "Voz ativa",
    bgHeader: "#1e293b",
    icon: "vote",
  },
  {
    href: "/feira",
    title: "Feira de Trocas",
    description: "Doe, troque ou encontre livros e materiais.",
    tag: "Comunidade",
    bgHeader: "#14532d",
    icon: "swap",
  },
  {
    href: "/calculadora",
    title: "Calculadora de Notas",
    description: "Calcule quanto precisa para atingir a média.",
    tag: "Ferramentas",
    bgHeader: "#1b365d",
    icon: "calc",
  },
  {
    href: "/faq",
    title: "Dúvidas Frequentes",
    description: "Regimento, documentos, horários e procedimentos.",
    tag: "Ajuda",
    bgHeader: "#7c2d12",
    icon: "help",
  },
  {
    href: "/sugestoes",
    title: "Sugestões e Reclamações",
    description: "Canal anônimo e seguro para a administração.",
    tag: "Escuta",
    bgHeader: "#065f46",
    icon: "chat",
  },
];

function CardRichSvg({ type }: { type: string }) {
  const cls = "w-16 h-16 svg-float drop-shadow-sm";
  switch (type) {
    case "book":
      return (
        <svg viewBox="0 0 80 80" className={cls} fill="none">
          <path d="M14 24 C24 20, 34 21, 40 26 C46 21, 56 20, 66 24 V58 C56 54, 46 55, 40 60 C34 55, 24 54, 14 58 Z" fill="#ffffff" stroke="#93c5fd" strokeWidth="2.5" />
          <line x1="40" y1="26" x2="40" y2="60" stroke="#cbd5e1" strokeWidth="2.5" />
          <line x1="20" y1="33" x2="34" y2="33" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="20" y1="41" x2="32" y2="41" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="46" y1="33" x2="60" y2="33" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="46" y1="41" x2="58" y2="41" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />
          <polygon points="52,55 58,55 58,68 55,64 52,68" fill="#ef4444" />
        </svg>
      );
    case "apple":
      return (
        <svg viewBox="0 0 80 80" className={cls} fill="none">
          <path className="svg-steam-1" d="M28 22 C26 16, 31 14, 28 9" stroke="#fde68a" strokeWidth="2.5" strokeLinecap="round" />
          <path className="svg-steam-2" d="M40 20 C38 14, 43 12, 40 7" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
          <ellipse cx="40" cy="62" rx="28" ry="6" fill="#e2e8f0" />
          <path d="M18 46 C18 30, 48 30, 48 46 Z" fill="#f59e0b" />
          <path d="M16 47 Q24 51 32 47 T49 47" stroke="#22c55e" strokeWidth="3.5" strokeLinecap="round" />
          <rect x="18" y="50" width="30" height="6" rx="3" fill="#78350f" />
          <rect x="20" y="55" width="26" height="5" rx="2.5" fill="#d97706" />
          <polygon points="52,32 66,32 63,58 55,58" fill="#fb923c" stroke="#ffffff" strokeWidth="2" />
          <path d="M59 32 L64 22 L70 22" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
    case "megaphone":
      return (
        <svg viewBox="0 0 80 80" className={cls} fill="none">
          <g transform="rotate(-12 40 40)">
            <polygon points="22,35 52,22 52,58 22,45" fill="#facc15" />
            <polygon points="35,29 52,22 52,58 35,51" fill="#fb923c" />
            <ellipse cx="52" cy="40" rx="4" ry="18" fill="#ffffff" />
            <rect x="15" y="34" width="8" height="12" rx="3" fill="#ffffff" />
            <path d="M25 45 L29 60 C30 63 24 64 22 60 L19 45 Z" fill="#fde68a" />
            <path d="M60 32 Q67 40 60 48" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
          </g>
        </svg>
      );
    case "vote":
      return (
        <svg viewBox="0 0 80 80" className={cls} fill="none">
          <rect x="16" y="20" width="48" height="42" rx="8" fill="#ffffff" />
          <rect x="25" y="42" width="7" height="12" rx="2" fill="#facc15" />
          <rect x="36" y="28" width="7" height="26" rx="2" fill="#c45c26" />
          <rect x="47" y="35" width="7" height="19" rx="2" fill="#2f6f4e" />
          <circle cx="58" cy="24" r="10" fill="#22c55e" stroke="#ffffff" strokeWidth="2.5" />
          <path d="M54 24 L57 27 L63 21" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "swap":
      return (
        <svg viewBox="0 0 80 80" className={cls} fill="none">
          <rect x="22" y="24" width="14" height="20" rx="2" transform="rotate(-8 22 24)" fill="#38bdf8" stroke="#ffffff" strokeWidth="1.5" />
          <rect x="34" y="20" width="15" height="22" rx="2" fill="#fb923c" stroke="#ffffff" strokeWidth="1.5" />
          <rect x="46" y="24" width="13" height="19" rx="2" transform="rotate(10 46 24)" fill="#facc15" stroke="#ffffff" strokeWidth="1.5" />
          <polygon points="18,40 62,40 57,62 23,62" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" strokeLinejoin="round" />
          <rect x="31" y="46" width="18" height="10" rx="3" fill="#ffffff" />
          <path d="M35 51 H45" stroke="#15803d" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
    case "calc":
      return (
        <svg viewBox="0 0 80 80" className={cls} fill="none">
          <rect x="24" y="14" width="32" height="52" rx="6" fill="#ffffff" />
          <rect x="29" y="20" width="22" height="11" rx="2.5" fill="#dcfce7" />
          <circle cx="33" cy="39" r="3" fill="#94a3b8" />
          <circle cx="40" cy="39" r="3" fill="#94a3b8" />
          <circle cx="47" cy="39" r="3" fill="#fb923c" />
          <circle cx="33" cy="48" r="3" fill="#94a3b8" />
          <circle cx="40" cy="48" r="3" fill="#94a3b8" />
          <circle cx="47" cy="48" r="3" fill="#facc15" />
          <rect x="30" y="55" width="20" height="5" rx="2.5" fill="#2f6f4e" />
          <circle cx="58" cy="22" r="9" fill="#c45c26" stroke="#ffffff" strokeWidth="2" />
          <text x="58" y="25" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">10</text>
        </svg>
      );
    case "help":
      return (
        <svg viewBox="0 0 80 80" className={cls} fill="none">
          <rect x="16" y="20" width="32" height="26" rx="8" fill="#facc15" />
          <polygon points="24,46 18,53 30,46" fill="#facc15" />
          <text x="32" y="39" textAnchor="middle" fill="#1e293b" fontSize="18" fontWeight="bold">?</text>
          <rect x="38" y="34" width="28" height="24" rx="7" fill="#ffffff" />
          <polygon points="56,58 62,64 50,58" fill="#ffffff" />
          <text x="52" y="51" textAnchor="middle" fill="#15803d" fontSize="16" fontWeight="bold">!</text>
        </svg>
      );
    case "chat":
      return (
        <svg viewBox="0 0 80 80" className={cls} fill="none">
          <path d="M40 16 C28 16 21 25 21 35 C21 42 26 47 30 52 L50 52 C54 47 59 42 59 35 C59 25 52 16 40 16 Z" fill="#facc15" />
          <rect x="31" y="54" width="18" height="6" rx="3" fill="#e2e8f0" />
          <rect x="44" y="42" width="24" height="18" rx="6" fill="#ffffff" />
          <circle cx="51" cy="51" r="2" fill="#065f46" />
          <circle cx="56" cy="51" r="2" fill="#065f46" />
          <circle cx="61" cy="51" r="2" fill="#065f46" />
        </svg>
      );
    default:
      return null;
  }
}

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10 md:py-14">
      <section className="mb-14 animate-fade-in-up">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1b365d] via-[#1f4742] to-[#2f6f4e] text-white border border-border px-6 py-10 md:px-12 md:py-12 shadow-md">
          <svg
            className="pointer-events-none absolute -right-10 -bottom-10 w-80 h-80 opacity-15"
            viewBox="0 0 200 200"
            fill="none"
          >
            <circle cx="100" cy="100" r="90" stroke="#e6b422" strokeWidth="3" strokeDasharray="10 8" />
            <circle cx="100" cy="100" r="65" stroke="#ffffff" strokeWidth="2" />
          </svg>

          <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-lg text-center md:text-left">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wide uppercase text-[#fde68a] mb-3 bg-white/15 border border-white/20 px-3.5 py-1 rounded-full">
                <span className="w-2 h-2 rounded-full bg-[#e6b422]" />
                Portal Escolar · CCMPR
              </span>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
                Um espaço feito para a nossa escola
              </h1>
              <p className="text-white/85 text-base md:text-lg leading-relaxed mb-6">
                Materiais de apoio, cardápio da cantina, grêmio estudantil, enquetes e um canal aberto
                de diálogo. Tudo em um só lugar para o Colégio Estadual Cívico-Militar Vereador Luiz Zanchim.
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                <Link
                  href="/materiais"
                  className="inline-flex items-center gap-2 bg-[#c45c26] text-white font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-[#9a4520] transition-colors shadow-sm"
                >
                  Ver materiais
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link
                  href="/sugestoes"
                  className="inline-flex items-center gap-2 bg-white text-[#1b365d] font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-[#faf6f1] transition-colors shadow-sm"
                >
                  Enviar sugestão
                </Link>
              </div>
            </div>

            <div className="shrink-0">
              <SchoolLogoShowcase size={148} />
            </div>
          </div>
        </div>
      </section>

      <section className="mb-14 animate-fade-in-up" style={{ animationDelay: "0.08s" }}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-foreground">
              O que você pode fazer aqui
            </h2>
            <p className="text-muted text-sm mt-1">
              Escolha a área desejada e participe do dia a dia do colégio
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service) => (
            <Link
              key={service.href}
              href={service.href}
              className="card-service relative overflow-hidden bg-card border border-border rounded-3xl flex flex-col group shadow-2xs"
            >
              {/* Topo Ilustrado com Mini-SVG Rico e Fundo Contrastante */}
              <div
                className="h-28 w-full flex items-center justify-center relative overflow-hidden"
                style={{ backgroundColor: service.bgHeader }}
              >
                <svg
                  className="pointer-events-none absolute -right-4 -top-4 w-24 h-24 opacity-15 group-hover:scale-110 transition-transform"
                  viewBox="0 0 80 80"
                  fill="none"
                >
                  <circle cx="40" cy="40" r="32" stroke="#ffffff" strokeWidth="4" strokeDasharray="6 6" />
                </svg>
                <CardRichSvg type={service.icon} />
              </div>

              <div className="p-5 flex-1 flex flex-col">
                <span className="text-[11px] font-bold uppercase tracking-wider text-secondary mb-1">
                  {service.tag}
                </span>
                <h3 className="font-bold text-foreground text-[16px] mb-1.5">
                  {service.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed flex-1">
                  {service.description}
                </p>
                <span className="mt-4 text-sm font-semibold text-primary inline-flex items-center gap-1">
                  Acessar
                  <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section
        className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-fade-in-up"
        style={{ animationDelay: "0.15s" }}
      >
        <div className="bg-secondary-soft border border-border rounded-3xl p-6 relative overflow-hidden">
          <svg className="absolute -right-4 -bottom-4 w-32 h-32 opacity-20 svg-float" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="40" fill="#2f6f4e" />
            <path d="M32 52 L45 65 L70 38" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div className="w-10 h-10 rounded-xl bg-secondary text-white flex items-center justify-center mb-4 text-lg font-bold shadow-xs">
            1
          </div>
          <h3 className="font-bold text-foreground mb-2">Feito para quem estuda e trabalha aqui</h3>
          <p className="text-sm text-muted leading-relaxed relative max-w-md">
            Este portal é de uso interno. O acesso com e-mail institucional garante segurança
            conforme o perfil de cada membro da comunidade escolar.
          </p>
        </div>

        <div className="bg-accent-soft border border-border rounded-3xl p-6 relative overflow-hidden">
          <svg className="absolute -right-4 -bottom-4 w-32 h-32 opacity-25 svg-float-rev" viewBox="0 0 100 100" fill="none">
            <polygon points="50,10 62,38 92,38 67,56 76,86 50,68 24,86 33,56 8,38 38,38" fill="#e6b422" />
          </svg>
          <div className="w-10 h-10 rounded-xl bg-accent text-foreground flex items-center justify-center mb-4 text-lg font-bold shadow-xs">
            2
          </div>
          <h3 className="font-bold text-foreground mb-2">Um canal de escuta de verdade</h3>
          <p className="text-sm text-muted leading-relaxed relative max-w-md">
            Sugestões e reclamações podem ser enviadas de forma anônima. Tudo
            passa por moderação automática antes de chegar à administração.
          </p>
        </div>
      </section>
    </div>
  );
}
