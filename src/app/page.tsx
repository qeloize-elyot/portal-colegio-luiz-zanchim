import Link from "next/link";

const services = [
  {
    href: "/materiais",
    title: "Materiais de Apoio",
    description: "Slides, listas e resumos organizados por turma e disciplina.",
    icon: "📚",
  },
  {
    href: "/cardapio",
    title: "Cardápio da Cantina",
    description: "Programação semanal de lanches e refeições.",
    icon: "🍽️",
  },
  {
    href: "/gremio",
    title: "Painel do Grêmio",
    description: "Notícias, comunicados, eventos e atas do Grêmio Estudantil.",
    icon: "📢",
  },
  {
    href: "/enquetes",
    title: "Enquetes",
    description: "Participe das votações e dê sua opinião sobre decisões da escola.",
    icon: "🗳️",
  },
  {
    href: "/feira",
    title: "Feira de Trocas",
    description: "Doe, troque ou venda livros e uniformes entre alunos.",
    icon: "🔄",
  },
  {
    href: "/calculadora",
    title: "Calculadora de Notas",
    description: "Calcule quanto precisa tirar para atingir a média.",
    icon: "🧮",
  },
  {
    href: "/faq",
    title: "Perguntas Frequentes",
    description: "Dúvidas sobre regimento, atestados, horários e procedimentos.",
    icon: "❓",
  },
  {
    href: "/sugestoes",
    title: "Sugestões e Reclamações",
    description: "Canal anônimo e moderado para feedbacks da comunidade.",
    icon: "💬",
  },
];

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <section className="bg-white border border-border rounded-lg p-6 md:p-8 mb-8 shadow-sm">
        <h1 className="text-2xl md:text-3xl font-bold text-primary mb-2">
          Bem-vindo ao Portal Interno
        </h1>
        <p className="text-muted max-w-2xl leading-relaxed">
          Central de serviços do Colégio Estadual Cívico-Militar Vereador Luiz
          Zanchim. Acesse materiais didáticos, informações da rotina escolar,
          participe de enquetes e envie sugestões de forma segura.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-primary mb-4">
          Serviços disponíveis
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((service) => (
            <Link
              key={service.href}
              href={service.href}
              className="bg-white border border-border rounded-lg p-5 hover:border-primary hover:shadow-md transition-all group"
            >
              <div className="text-3xl mb-3" aria-hidden>
                {service.icon}
              </div>
              <h3 className="font-semibold text-primary group-hover:underline mb-1">
                {service.title}
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                {service.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-accent-light border border-green-200 rounded-lg p-5">
          <h3 className="font-semibold text-accent mb-1">Acesso restrito</h3>
          <p className="text-sm text-gray-700">
            Algumas áreas exigem login com perfil de aluno, professor, grêmio ou
            administração. Em breve a autenticação estará disponível.
          </p>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
          <h3 className="font-semibold text-primary mb-1">Canal seguro</h3>
          <p className="text-sm text-gray-700">
            O formulário de sugestões é anônimo e passa por moderação automática
            para garantir o respeito e a convivência.
          </p>
        </div>
      </section>
    </div>
  );
}
