import Link from "next/link";
import { HomeHeroIllustration } from "@/components/SvgDecorations";

const services = [
  {
    href: "/materiais",
    title: "Materiais de Apoio",
    description: "Slides, listas e resumos por turma e disciplina.",
    tag: "Estudos",
    color: "#c45c26",
    icon: "book",
  },
  {
    href: "/cardapio",
    title: "Cardápio da Cantina",
    description: "Veja o que será servido durante a semana.",
    tag: "Rotina",
    color: "#2f6f4e",
    icon: "apple",
  },
  {
    href: "/gremio",
    title: "Painel do Grêmio",
    description: "Comunicados, eventos e novidades do Grêmio.",
    tag: "Participação",
    color: "#e6b422",
    icon: "megaphone",
  },
  {
    href: "/enquetes",
    title: "Enquetes",
    description: "Opine e ajude a construir decisões da escola.",
    tag: "Voz ativa",
    color: "#c45c26",
    icon: "vote",
  },
  {
    href: "/feira",
    title: "Feira de Trocas",
    description: "Doe, troque ou encontre livros e uniformes.",
    tag: "Comunidade",
    color: "#2f6f4e",
    icon: "swap",
  },
  {
    href: "/calculadora",
    title: "Calculadora de Notas",
    description: "Calcule quanto precisa para atingir a média.",
    tag: "Ferramentas",
    color: "#e6b422",
    icon: "calc",
  },
  {
    href: "/faq",
    title: "Dúvidas Frequentes",
    description: "Regimento, documentos, horários e procedimentos.",
    tag: "Ajuda",
    color: "#c45c26",
    icon: "help",
  },
  {
    href: "/sugestoes",
    title: "Sugestões e Reclamações",
    description: "Canal anônimo e seguro para a administração.",
    tag: "Escuta",
    color: "#2f6f4e",
    icon: "chat",
  },
];

function ServiceIcon({ type }: { type: string }) {
  const common = "w-7 h-7";
  switch (type) {
    case "book":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M4 5a2 2 0 012-2h10v16H6a2 2 0 00-2 2V5z" />
          <path d="M16 3h2a2 2 0 012 2v14a2 2 0 01-2 2h-2" />
        </svg>
      );
    case "apple":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M12 7c0-2 1-4 3-4" />
          <path d="M12 21c-4 0-7-3.5-7-8 0-3.5 2.5-6 5-6 1 0 2 .5 2.5 1.2C13 8.5 14 8 15 8c2.5 0 5 2.5 5 6 0 4.5-3 7-8 7z" />
        </svg>
      );
    case "megaphone":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M3 11v2a1 1 0 001 1h2l6 4V6L6 10H4a1 1 0 00-1 1z" />
          <path d="M16 8.5a4 4 0 010 7" />
        </svg>
      );
    case "vote":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="4" y="3" width="16" height="18" rx="2" />
          <path d="M8 12l3 3 5-6" />
        </svg>
      );
    case "swap":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M7 7h11l-3-3" />
          <path d="M17 17H6l3 3" />
        </svg>
      );
    case "calc":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="5" y="3" width="14" height="18" rx="2" />
          <path d="M8 8h8M8 12h2M12 12h2M16 12h0M8 16h2M12 16h2M16 16h0" />
        </svg>
      );
    case "help":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="12" r="9" />
          <path d="M9.5 9.5a2.5 2.5 0 114 2c-.7.6-1.5 1-1.5 2V14" />
          <circle cx="12" cy="17" r="0.8" fill="currentColor" />
        </svg>
      );
    case "chat":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M5 5h14a2 2 0 012 2v8a2 2 0 01-2 2H9l-4 3v-3H5a2 2 0 01-2-2V7a2 2 0 012-2z" />
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
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-soft via-[#fdf6eb] to-secondary-soft border border-border px-6 py-10 md:px-12 md:py-12 shadow-sm">
          {/* Ondas e círculos decorativos internos */}
          <svg
            className="pointer-events-none absolute -right-10 -bottom-10 w-80 h-80 opacity-20"
            viewBox="0 0 200 200"
            fill="none"
          >
            <circle cx="100" cy="100" r="90" stroke="#c45c26" strokeWidth="3" strokeDasharray="10 8" />
            <circle cx="100" cy="100" r="65" stroke="#2f6f4e" strokeWidth="2" />
          </svg>

          <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-lg text-center md:text-left">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wide uppercase text-secondary mb-3 bg-white/90 border border-border px-3.5 py-1 rounded-full shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-secondary" />
                Portal Cívico-Militar · CCMPR
              </span>
              <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
                Um espaço feito para a nossa escola
              </h1>
              <p className="text-muted text-base md:text-lg leading-relaxed mb-6">
                Materiais, cardápio da cantina, grêmio estudantil, enquetes e um canal aberto
                de diálogo. Tudo em um só lugar, com a identidade do Colégio Luiz Zanchim.
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                <Link
                  href="/materiais"
                  className="inline-flex items-center gap-2 bg-primary text-white font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-primary-dark transition-colors shadow-xs"
                >
                  Ver materiais
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link
                  href="/sugestoes"
                  className="inline-flex items-center gap-2 bg-white border border-border text-foreground font-semibold text-sm px-5 py-2.5 rounded-xl hover:border-primary hover:text-primary transition-colors"
                >
                  Enviar sugestão
                </Link>
              </div>
            </div>

            <div className="shrink-0">
              <HomeHeroIllustration />
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
          <svg className="hidden sm:block w-12 h-12 svg-spin opacity-60" viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="20" stroke="#c45c26" strokeWidth="2" strokeDasharray="5 5" />
            <circle cx="24" cy="24" r="6" fill="#e6b422" />
          </svg>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((service) => (
            <Link
              key={service.href}
              href={service.href}
              className="card-service relative overflow-hidden bg-card border border-border rounded-2xl p-5 flex flex-col group"
            >
              {/* Marca d'água SVG decorativa no canto do card */}
              <svg
                className="pointer-events-none absolute -right-5 -bottom-5 w-24 h-24 opacity-10 group-hover:scale-110 transition-transform"
                viewBox="0 0 80 80"
                fill="none"
              >
                <circle cx="40" cy="40" r="32" stroke={service.color} strokeWidth="6" strokeDasharray="8 6" />
              </svg>

              <div
                className="w-11 h-11 rounded-xl mb-3 flex items-center justify-center text-white shadow-xs"
                style={{ backgroundColor: service.color }}
              >
                <ServiceIcon type={service.icon} />
              </div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-secondary mb-1">
                {service.tag}
              </span>
              <h3 className="font-bold text-foreground text-[15px] mb-1.5">
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
            </Link>
          ))}
        </div>
      </section>

      <section
        className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-fade-in-up"
        style={{ animationDelay: "0.15s" }}
      >
        <div className="bg-secondary-soft border border-border rounded-3xl p-6 relative overflow-hidden">
          <svg className="absolute -right-4 -bottom-4 w-32 h-32 opacity-25 svg-float" viewBox="0 0 100 100" fill="none">
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
          <svg className="absolute -right-4 -bottom-4 w-32 h-32 opacity-30 svg-float-rev" viewBox="0 0 100 100" fill="none">
            <polygon points="50,10 62,38 92,38 67,56 76,86 50,68 24,86 33,56 8,38 38,38" fill="#e6b422" />
          </svg>
          <div className="w-10 h-10 rounded-xl bg-accent text-foreground flex items-center justify-center mb-4 text-lg font-bold shadow-xs">
            2
          </div>
          <h3 className="font-bold text-foreground mb-2">Um canal de escuta de verdade</h3>
          <p className="text-sm text-muted leading-relaxed relative max-w-md">
            Sugestões e reclamações podem ser enviadas de forma anônima. Tudo
            passa por moderação inteligente antes de chegar à administração.
          </p>
        </div>
      </section>
    </div>
  );
}
