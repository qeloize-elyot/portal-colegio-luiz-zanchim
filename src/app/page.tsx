import Link from "next/link";

const services = [
  {
    href: "/materiais",
    title: "Materiais de Apoio",
    description: "Slides, listas de exercícios e resumos organizados por ano, turma e disciplina.",
  },
  {
    href: "/cardapio",
    title: "Cardápio da Cantina",
    description: "Programação semanal de lanches e refeições da unidade escolar.",
  },
  {
    href: "/gremio",
    title: "Painel do Grêmio Estudantil",
    description: "Comunicados oficiais, eventos, atas de reuniões e notícias do Grêmio.",
  },
  {
    href: "/enquetes",
    title: "Enquetes e Votações",
    description: "Pesquisas rápidas para colher a opinião da comunidade estudantil.",
  },
  {
    href: "/feira",
    title: "Feira de Trocas",
    description: "Espaço para doação, troca ou venda de livros e uniformes entre alunos.",
  },
  {
    href: "/calculadora",
    title: "Calculadora de Notas",
    description: "Ferramenta para estimar a nota necessária para atingir a média.",
  },
  {
    href: "/faq",
    title: "Perguntas Frequentes",
    description: "Informações sobre regimento, documentos, horários e procedimentos.",
  },
  {
    href: "/sugestoes",
    title: "Sugestões e Reclamações",
    description: "Canal anônimo e moderado para envio de feedbacks à administração.",
  },
];

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Cabeçalho institucional */}
      <section className="border-b border-border pb-8 mb-10">
        <p className="text-sm font-medium text-primary uppercase tracking-wide mb-2">
          Portal Interno
        </p>
        <h1 className="text-2xl md:text-3xl font-bold text-primary mb-3 leading-tight">
          Colégio Estadual Cívico-Militar
          <br />
          Vereador Luiz Zanchim
        </h1>
        <p className="text-muted max-w-2xl leading-relaxed text-[15px]">
          Ambiente de uso exclusivo da comunidade escolar. Centralize o acesso a
          materiais didáticos, informações da rotina e canais de comunicação
          institucionais.
        </p>
      </section>

      {/* Lista de serviços */}
      <section>
        <h2 className="text-sm font-semibold text-primary uppercase tracking-wide mb-5">
          Serviços
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border border border-border rounded-lg overflow-hidden">
          {services.map((service) => (
            <Link
              key={service.href}
              href={service.href}
              className="bg-white p-5 hover:bg-slate-50 transition-colors group"
            >
              <h3 className="font-semibold text-primary group-hover:underline mb-1.5 text-[15px]">
                {service.title}
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                {service.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Avisos institucionais */}
      <section className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border border-border bg-white rounded-lg p-5">
          <h3 className="font-semibold text-primary text-sm mb-1.5">
            Acesso controlado
          </h3>
          <p className="text-sm text-muted leading-relaxed">
            Algumas áreas do portal exigem autenticação com perfil autorizado
            (aluno, professor, grêmio ou administração).
          </p>
        </div>
        <div className="border border-border bg-white rounded-lg p-5">
          <h3 className="font-semibold text-primary text-sm mb-1.5">
            Canal de comunicação
          </h3>
          <p className="text-sm text-muted leading-relaxed">
            O formulário de sugestões é anônimo e passa por moderação antes de
            chegar à equipe administrativa.
          </p>
        </div>
      </section>
    </div>
  );
}
