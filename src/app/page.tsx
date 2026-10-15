import Link from "next/link";

const services = [
  {
    href: "/materiais",
    title: "Materiais de Apoio",
    description: "Slides, listas e resumos por turma e disciplina.",
    tag: "Estudos",
    color: "#c45c26",
  },
  {
    href: "/cardapio",
    title: "Cardapio da Cantina",
    description: "Veja o que sera servido durante a semana.",
    tag: "Rotina",
    color: "#2f6f4e",
  },
  {
    href: "/gremio",
    title: "Painel do Gremio",
    description: "Comunicados, eventos e novidades do Gremio.",
    tag: "Participacao",
    color: "#e6b422",
  },
  {
    href: "/enquetes",
    title: "Enquetes",
    description: "Opine e ajude a construir decisoes da escola.",
    tag: "Voz ativa",
    color: "#c45c26",
  },
  {
    href: "/feira",
    title: "Feira de Trocas",
    description: "Doe, troque ou encontre livros e uniformes.",
    tag: "Comunidade",
    color: "#2f6f4e",
  },
  {
    href: "/calculadora",
    title: "Calculadora de Notas",
    description: "Calcule quanto precisa para atingir a media.",
    tag: "Ferramentas",
    color: "#e6b422",
  },
  {
    href: "/faq",
    title: "Duvidas Frequentes",
    description: "Regimento, documentos, horarios e procedimentos.",
    tag: "Ajuda",
    color: "#c45c26",
  },
  {
    href: "/sugestoes",
    title: "Sugestoes e Reclamacoes",
    description: "Canal anonimo e seguro para a administracao.",
    tag: "Escuta",
    color: "#2f6f4e",
  },
];

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
      <polygon
        points="32,6 38,24 58,24 42,36 48,54 32,42 16,54 22,36 6,24 26,24"
        fill="#e6b422"
      />
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
      {/* Hero */}
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
              Um espaco feito para a nossa escola
            </h1>
            <p className="text-muted text-base md:text-lg leading-relaxed mb-6">
              Materiais, informacoes do dia a dia, participacao e um canal aberto
              de dialogo. Tudo em um so lugar.
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
                Enviar sugestao
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Servicos */}
      <section className="mb-14 animate-fade-in-up" style={{ animationDelay: "0.08s" }}>
        <div className="mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-foreground">
            O que voce pode fazer aqui
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
                className="w-10 h-10 rounded-xl mb-3 flex items-center justify-center text-white text-sm font-bold"
                style={{ backgroundColor: service.color }}
              >
                {service.tag.slice(0, 1)}
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

      {/* Blocos */}
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
            Este portal e de uso interno. Algumas areas pedem identificacao
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
            Sugestoes e reclamacoes podem ser enviadas de forma anonima. Tudo
            passa por moderacao antes de chegar a administracao.
          </p>
        </div>
      </section>
    </div>
  );
}
