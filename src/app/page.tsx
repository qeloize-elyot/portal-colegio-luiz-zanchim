import Link from "next/link";

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

function IconBook() {
  return (
    <svg viewBox="0 0 64 64" className="w-14 h-14" aria-hidden="true">
      <rect x="8" y="12" width="48" height="40" rx="6" fill="#c45c26" />
      <path d="M32 12 V52" stroke="#faf6f1" strokeWidth="2" />
      <path d="M16 24 H28" stroke="#fdf0e6" strokeWidth="3" strokeLinecap="round" />
      <path d="M16 34 H28" stroke="#fdf0e6" strokeWidth="3" strokeLinecap="round" />
      <path d="M36 24 H48" stroke="#fdf0e6" strokeWidth="3" strokeLinecap="round" />
      <path d="M36 34 H48" stroke="#fdf0e6" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function IconStar() {
  return (
    <svg viewBox="0 0 64 64" className="w-12 h-12" aria-hidden="true">
      <polygon points="32,6 38,24 58,24 42,36 48,54 32,42 16,54 22,36 6,24 26,24" fill="#e6b422" />
    </svg>
  );
}

function IconPeople() {
  return (
    <svg viewBox="0 0 80 56" className="w-16 h-12" aria-hidden="true">
      <circle cx="22" cy="18" r="10" fill="#2f6f4e" />
      <ellipse cx="22" cy="42" rx="16" ry="12" fill="#2f6f4e" />
      <circle cx="58" cy="18" r="10" fill="#c45c26" />
      <ellipse cx="58" cy="42" rx="16" ry="12" fill="#c45c26" />
    </svg>
  );
}

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10 md:py-14">
      <section className="mb-14 animate-fade-in-up">
        <div className="relative overflow-hidden rounded-3xl bg-primary-soft border border-border px-6 py-10 md:px-12 md:py-14">
          <div className="absolute top-4 right-6 opacity-90 hidden sm:block">
            <IconBook />
          </div>
          <div className="absolute bottom-4 right-24 opacity-80 hidden md:block">
            <IconStar />
          </div>
          <div className="absolute -bottom-2 -left-2 opacity-70 hidden sm:block">
            <IconPeople />
          </div>

          <div className="relative max-w-lg">
            <span className="inline-block text-xs font-semibold tracking-wide uppercase text-secondary mb-3 bg-secondary-soft px-3 py-1 rounded-full">
              Portal interno
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Um espaço feito para a nossa escola
            </h1>
            <p className="text-muted text-base md:text-lg leading-relaxed mb-6">
              Materiais, informações do dia a dia, participação e um canal aberto
              de diálogo. Tudo em um só lugar.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/materiais"
                className="inline-flex items-center gap-2 bg-primary text-white font-medium text-sm px-5 py-2.5 rounded-xl hover:bg-primary-dark transition-colors"
              >
                Ver materiais
              </Link>
              <Link
                href="/sugestoes"
                className="inline-flex items-center gap-2 bg-white border border-border text-foreground font-medium text-sm px-5 py-2.5 rounded-xl hover:border-primary hover:text-primary transition-colors"
              >
                Enviar sugestão
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-14 animate-fade-in-up" style={{ animationDelay: "0.08s" }}>
        <div className="mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-foreground">
            O que você pode fazer aqui
          </h2>
          <p className="text-muted text-sm mt-1">
            Escolha o que precisa e navegue com facilidade
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((service) => (
            <Link
              key={service.href}
              href={service.href}
              className="card-service bg-card border border-border rounded-2xl p-5 flex flex-col"
            >
              <div
                className="w-11 h-11 rounded-xl mb-3 flex items-center justify-center text-white"
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
              <span className="mt-4 text-sm font-medium text-primary inline-flex items-center gap-1">
                Acessar
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        <div className="bg-secondary-soft border border-border rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-3 right-3 opacity-60">
            <IconPeople />
          </div>
          <div className="w-10 h-10 rounded-xl bg-secondary text-white flex items-center justify-center mb-4 text-lg font-bold">
            1
          </div>
          <h3 className="font-bold text-foreground mb-2">Feito para quem estuda e trabalha aqui</h3>
          <p className="text-sm text-muted leading-relaxed relative">
            Este portal é de uso interno. Algumas áreas pedem identificação
            conforme o perfil de cada pessoa da comunidade escolar.
          </p>
        </div>
        <div className="bg-accent-soft border border-border rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-3 right-3 opacity-70">
            <IconStar />
          </div>
          <div className="w-10 h-10 rounded-xl bg-accent text-foreground flex items-center justify-center mb-4 text-lg font-bold">
            2
          </div>
          <h3 className="font-bold text-foreground mb-2">Um canal de escuta de verdade</h3>
          <p className="text-sm text-muted leading-relaxed relative">
            Sugestões e reclamações podem ser enviadas de forma anônima. Tudo
            passa por moderação antes de chegar à administração.
          </p>
        </div>
      </section>
    </div>
  );
}
