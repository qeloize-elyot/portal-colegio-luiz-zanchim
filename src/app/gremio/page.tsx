const publicacoes = [
  {
    id: 1,
    tipo: "Comunicado",
    titulo: "Assembleia Geral do Grêmio – Outubro",
    data: "02/10/2026",
    resumo:
      "Convocamos todos os estudantes para a assembleia geral que acontecerá no auditório no dia 10/10, às 13h30.",
  },
  {
    id: 2,
    tipo: "Evento",
    titulo: "Campanha de Arrecadação de Alimentos",
    data: "28/09/2026",
    resumo:
      "Estamos arrecadando alimentos não perecíveis até o dia 15/10. Os pontos de coleta estão na secretaria e na sala do grêmio.",
  },
  {
    id: 3,
    tipo: "Notícia",
    titulo: "Resultado da eleição do Grêmio 2026",
    data: "15/03/2026",
    resumo:
      "A chapa eleita assume oficialmente a gestão do Grêmio Estudantil para o ano letivo de 2026.",
  },
];

export default function GremioPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-primary mb-2">Painel do Grêmio Estudantil</h1>
      <p className="text-muted mb-6">
        Notícias, comunicados oficiais, eventos e atas de reuniões gerenciados
        pela equipe do Grêmio.
      </p>

      <div className="space-y-4">
        {publicacoes.map((pub) => (
          <article
            key={pub.id}
            className="bg-white border border-border rounded-lg p-5 hover:shadow-sm transition-shadow"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-0.5 rounded">
                {pub.tipo}
              </span>
              <time className="text-xs text-muted">{pub.data}</time>
            </div>
            <h2 className="font-semibold text-lg text-primary mb-1">
              {pub.titulo}
            </h2>
            <p className="text-sm text-foreground leading-relaxed">{pub.resumo}</p>
          </article>
        ))}
      </div>

      <p className="mt-8 text-sm text-muted">
        Membros do Grêmio poderão publicar novos conteúdos após o login.
      </p>
    </div>
  );
}
