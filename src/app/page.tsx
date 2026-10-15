import Link from "next/link";

const services = [
  {
    href: "/materiais",
    title: "Materiais de Apoio",
    description: "Slides, listas e resumos organizados por ano, turma e disciplina.",
  },
  {
    href: "/cardapio",
    title: "Cardápio da Cantina",
    description: "Programação semanal de lanches e refeições da unidade.",
  },
  {
    href: "/gremio",
    title: "Painel do Grêmio",
    description: "Comunicados, eventos, atas e notícias do Grêmio Estudantil.",
  },
  {
    href: "/enquetes",
    title: "Enquetes e Votações",
    description: "Participe e dê sua opinião sobre decisões da escola.",
  },
  {
    href: "/feira",
    title: "Feira de Trocas",
    description: "Doe, troque ou venda livros e uniformes entre alunos.",
  },
  {
    href: "/calculadora",
    title: "Calculadora de Notas",
    description: "Descubra quanto precisa tirar para alcançar a média.",
  },
  {
    href: "/faq",
    title: "Perguntas Frequentes",
    description: "Regimento, documentos, horários e procedimentos.",
  },
  {
    href: "/sugestoes",
    title: "Sugestões e Reclamações",
    description: "Canal anônimo e moderado para a administração.",
  },
];

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Hero */}
      <section className="mb-12 animate-fade-in-up">
        <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl px-6 py-9 md:px-10 md:py-11 text-white shadow-lg">
          <p className="text-accent text-sm font-semibold tracking-wide mb-2">
            Portal da Comunidade Escolar
          </p>
          <h1 className="text-2xl md:text-3xl font-bold leading-tight mb-3">
            Bem-vindo ao Colégio
            <br />
            Vereador Luiz Zanchim
          </h1>
          <p className="text-white/90 max-w-xl text-[15px] leading-relaxed">
            Um espaço feito para facilitar o dia a dia da nossa comunidade.
            Materiais, informações, participação e diálogo em um só lugar.
          </p>
        </div>
      </section>

      {/* Serviços */}
      <section className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
        <h2 className="text-lg font-bold text-primary mb-5">
          O que você encontra aqui
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((service, index) => (
            <Link
              key={service.href}
              href={service.href}
              className="bg-card border border-border rounded-xl p-5 hover-lift group"
              style={{ animationDelay: `${0.08 * index}s` }}
            >
              <div className="w-8 h-1 rounded-full bg-accent mb-4 transition-all duration-300 group-hover:w-12" />
              <h3 className="font-semibold text-primary mb-1.5 text-[15px] group-hover:text-primary-dark transition-colors">
                {service.title}
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                {service.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Faixa de destaque */}
      <section
        className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in-up"
        style={{ animationDelay: "0.2s" }}
      >
        <div className="bg-primary-soft border border-border rounded-xl p-5">
          <h3 className="font-semibold text-primary mb-1.5 text-[15px]">
            Feito para a nossa comunidade
          </h3>
          <p className="text-sm text-muted leading-relaxed">
            Este portal é de uso interno da escola. Algumas áreas pedem login
            conforme o perfil de cada pessoa.
          </p>
        </div>
        <div className="bg-accent-soft border border-border rounded-xl p-5">
          <h3 className="font-semibold text-primary mb-1.5 text-[15px]">
            Canal de escuta
          </h3>
          <p className="text-sm text-muted leading-relaxed">
            Sugestões e reclamações podem ser enviadas de forma anônima e passam
            por moderação antes de chegar à administração.
          </p>
        </div>
      </section>
    </div>
  );
}
