import Link from "next/link";

const featured = [
  {
    href: "/biblioteca",
    title: "Biblioteca",
    description: "Catálogo de livros, disponibilidade e empréstimo por 14 dias.",
    tag: "Acervo",
    cardBg: "bg-[#E8F0FE]",
    tagBg: "bg-[#1D4ED8] text-white",
  },
  {
    href: "/materiais",
    title: "Materiais de Apoio",
    description: "Apostilas, slides e listas de exercícios por série e disciplina.",
    tag: "Estudos",
    cardBg: "bg-[#EBF3FF]",
    tagBg: "bg-[#2554C7] text-white",
  },
  {
    href: "/cardapio",
    title: "Cardápio da Cantina",
    description: "Programação semanal de lanches e refeições.",
    tag: "Rotina",
    cardBg: "bg-[#FFF0E5]",
    tagBg: "bg-[#E04F33] text-white",
  },
];

const services = [
  {
    href: "/horarios",
    title: "Horários e Calendário",
    description: "Grades manhã/tarde, calendário 2026 e horários dos professores.",
    tag: "Rotina",
    cardBg: "bg-[#FFF7ED]",
    tagBg: "bg-[#C2410C] text-white",
  },
  {
    href: "/laboratorios",
    title: "Laboratórios",
    description: "3 labs · 6 aulas · reserva só para professores/admin.",
    tag: "Infra",
    cardBg: "bg-[#F0FDF4]",
    tagBg: "bg-[#15803D] text-white",
  },
  {
    href: "/recados",
    title: "Recados e Eventos",
    description: "Mural oficial de recados, eventos e vídeos.",
    tag: "Comunicados",
    cardBg: "bg-[#FEF3C7]",
    tagBg: "bg-[#B45309] text-white",
  },
  {
    href: "/aviso-ausencia",
    title: "Aviso de Ausência",
    description: "Professores registram falta ou atraso (manhã/tarde).",
    tag: "Staff",
    cardBg: "bg-[#FDF2F8]",
    tagBg: "bg-[#BE185D] text-white",
  },
  {
    href: "/calculadora",
    title: "Minhas Notas",
    description: "Adicione matérias, notas por trimestre e média automática.",
    tag: "Estudo",
    cardBg: "bg-[#E6F7F8]",
    tagBg: "bg-[#0F766E] text-white",
  },
  {
    href: "/gremio",
    title: "Painel do Grêmio",
    description: "Comunicados, gincanas e eventos estudantis.",
    tag: "Comunidade",
    cardBg: "bg-[#FFF8DB]",
    tagBg: "bg-[#D97706] text-white",
  },
  {
    href: "/enquetes",
    title: "Enquetes",
    description: "Participe das votações da escola.",
    tag: "Voz ativa",
    cardBg: "bg-[#F2EEFF]",
    tagBg: "bg-[#5B3FD9] text-white",
  },
  {
    href: "/feira",
    title: "Feira de Trocas",
    description: "Doação e troca de livros e uniformes.",
    tag: "Solidário",
    cardBg: "bg-[#E6F8EF]",
    tagBg: "bg-[#15803D] text-white",
  },
  {
    href: "/faq",
    title: "Dúvidas Frequentes",
    description: "Uniforme, horários, atestados e secretaria.",
    tag: "Guia",
    cardBg: "bg-[#FDECEB]",
    tagBg: "bg-[#B91C1C] text-white",
  },
  {
    href: "/sugestoes",
    title: "Ouvidoria Anônima",
    description: "Canal confidencial de sugestões e reclamações.",
    tag: "Escuta",
    cardBg: "bg-[#E9F7EF]",
    tagBg: "bg-[#1B5E4A] text-white",
  },
];

function Card({
  href,
  title,
  description,
  tag,
  cardBg,
  tagBg,
  large,
}: {
  href: string;
  title: string;
  description: string;
  tag: string;
  cardBg: string;
  tagBg: string;
  large?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`${cardBg} border-[3px] border-[#0F1E36] rounded-2xl p-5 shadow-[4px_4px_0_#0F1E36] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0_#0F1E36] transition-all block ${large ? "sm:col-span-1" : ""}`}
    >
      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border border-[#0F1E36] ${tagBg}`}>
        {tag}
      </span>
      <h3 className="mt-3 text-lg font-semibold font-serif text-[#0F1E36]">{title}</h3>
      <p className="mt-1.5 text-sm text-[#0F1E36]/75 leading-snug">{description}</p>
      <span className="mt-3 inline-block text-xs font-semibold text-[#0F1E36]">Abrir →</span>
    </Link>
  );
}

export default function Home() {
  return (
    <div
      className="min-h-screen text-[#0F1E36] pb-16"
      style={{
        backgroundColor: "#F7F3E8",
        backgroundImage: "radial-gradient(#0F1E36 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    >
      <div className="max-w-[1100px] mx-auto px-4 sm:px-8 pt-8">
        <section className="rounded-[28px] bg-[#0F1E36] text-[#FFFDF9] border-[3px] border-[#0F1E36] shadow-[8px_8px_0_#E04F33] px-6 py-10 sm:px-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#F4B41A]">
            Colégio Vereador Luiz Zanchim
          </p>
          <h1 className="mt-2 text-3xl sm:text-4xl font-semibold font-serif leading-tight">
            Portal Escolar
          </h1>
          <p className="mt-3 text-sm sm:text-base text-white/80 max-w-xl">
            Horários, laboratórios, biblioteca, notas, materiais e canais da escola em um só lugar.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Link
              href="/biblioteca"
              className="px-4 py-2.5 rounded-xl bg-[#F4B41A] text-[#0F1E36] text-sm font-semibold border-2 border-[#FFFDF9]"
            >
              Ir para Biblioteca
            </Link>
            <Link
              href="/horarios"
              className="px-4 py-2.5 rounded-xl bg-transparent text-white text-sm font-semibold border-2 border-white/40"
            >
              Ver horários
            </Link>
          </div>
        </section>

        <h2 className="mt-10 text-xl font-semibold font-serif">Destaques</h2>
        <div className="mt-4 grid sm:grid-cols-3 gap-4">
          {featured.map((s) => (
            <Card key={s.href} {...s} large />
          ))}
        </div>

        <h2 className="mt-10 text-xl font-semibold font-serif">Todos os serviços</h2>
        <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((s) => (
            <Card key={s.href} {...s} />
          ))}
        </div>

        <p className="mt-10 text-center text-xs opacity-50">
          Use o menu ☰ no topo para acessar qualquer página · Portal de uso interno
        </p>
      </div>
    </div>
  );
}
