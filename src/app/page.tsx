import Link from "next/link";

const services = [
  {
    href: "/materiais",
    title: "Materiais de Apoio",
    description: "Slides, listas e resumos organizados por turma e disciplina.",
    tag: "Estudos",
  },
  {
    href: "/cardapio",
    title: "Cardápio da Cantina",
    description: "Veja o que será servido durante a semana.",
    tag: "Rotina",
  },
  {
    href: "/gremio",
    title: "Painel do Grêmio",
    description: "Comunicados, eventos e novidades do Grêmio Estudantil.",
    tag: "Participação",
  },
  {
    href: "/enquetes",
    title: "Enquetes",
    description: "Opine e ajude a construir decisões da escola.",
    tag: "Voz ativa",
  },
  {
    href: "/feira",
    title: "Feira de Trocas",
    description: "Doe, troque ou encontre livros e uniformes.",
    tag: "Comunidade",
  },
  {
    href: "/calculadora",
    title: "Calculadora de Notas",
    description: "Calcule quanto precisa para atingir a média.",
    tag: "Ferramentas",
  },
  {
    href: "/faq",
    title: "Dúvidas Frequentes",
    description: "Regimento, documentos, horários e procedimentos.",
    tag: "Ajuda",
  },
  {
    href: "/sugestoes",
    title: "Sugestões e Reclamações",
    description: "Canal anônimo e seguro para falar com a administração.",
    tag: "Escuta",
  },
];

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10 md:py-14">
      {/* Hero com personalidade */}
      <section className="mb-14 animate-fade-in-up">
        <div className="relative overflow-hidden rounded-3xl bg-primary-soft border border-border px-6 py-10 md:px-12 md:py-14">
          <div className="absolute top-0 right-0 w-40 h-40 bg-accent/20 rounded-full -translate-y-1/2 translate-x-1/3 blur-2xl" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/15 rounded-full translate-y-1/2 -translate-x-1/4 blur-2xl" />

          <div className="relative">
            <span className="inline-block text-xs font-semibold tracking-wide uppercase text-secondary mb-3 bg-secondary-soft px-3 py-1 rounded-full">
              Portal interno
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 max-w-lg">
              Um espaço feito para a nossa escola
            </h1>
            <p className="text-muted text-base md:text-lg max-w-xl leading-relaxed mb-6">
              Materiais, informações do dia a dia, participação e um canal aberto
              de diálogo. Tudo em um só lugar, pensado para alunos, professores
              e toda a comunidade.
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

      {/* Serviços */}
      <section className="mb-14 animate-fade-in-up" style={{ animationDelay: "0.08s" }}>
        <div className="flex items-end justify-between mb-6 gap-4">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-foreground">
              O que você pode fazer aqui
            </h2>
            <p className="text-muted text-sm mt-1">
              Escolha o que precisa e navegue com facilidade
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((service, i) => (
            <Link
              key={service.href}
              href={service.href}
              className="card-service bg-card border border-border rounded-2xl p-5 flex flex-col"
              style={{ animationDelay: `${0.05 * i}s` }}
            >
              <span className="text-[11px] font-semibold uppercase tracking-wider text-secondary mb-3">
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

      {/* Blocos informativos */}
      <section
        className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-fade-in-up"
        style={{ animationDelay: "0.15s" }}
      >
        <div className="bg-secondary-soft border border-border rounded-2xl p-6">
          <div className="w-10 h-10 rounded-xl bg-secondary text-white flex items-center justify-center mb-4 text-lg font-bold">
            1
          </div>
          <h3 className="font-bold text-foreground mb-2">Feito para quem estuda e trabalha aqui</h3>
          <p className="text-sm text-muted leading-relaxed">
            Este portal é de uso interno. Algumas áreas pedem identificação
            conforme o perfil de cada pessoa da comunidade escolar.
          </p>
        </div>
        <div className="bg-accent-soft border border-border rounded-2xl p-6">
          <div className="w-10 h-10 rounded-xl bg-accent text-foreground flex items-center justify-center mb-4 text-lg font-bold">
            2
          </div>
          <h3 className="font-bold text-foreground mb-2">Um canal de escuta de verdade</h3>
          <p className="text-sm text-muted leading-relaxed">
            Sugestões e reclamações podem ser enviadas de forma anônima. Tudo
            passa por moderação antes de chegar à administração.
          </p>
        </div>
      </section>
    </div>
  );
}
