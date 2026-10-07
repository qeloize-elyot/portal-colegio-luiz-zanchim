const itens = [
  {
    id: 1,
    titulo: "Livro de Matemática – 2º Ano",
    tipo: "Livro",
    descricao: "Usado, em bom estado. Sem rasuras.",
    preco: "R$ 25,00",
    contato: "Interessados: procurar na secretaria (anúncio #001)",
  },
  {
    id: 2,
    titulo: "Uniforme completo – tamanho M",
    tipo: "Uniforme",
    descricao: "Calça e camisa em ótimo estado. Pouco uso.",
    preco: "Troca ou doação",
    contato: "Interessados: procurar na secretaria (anúncio #002)",
  },
  {
    id: 3,
    titulo: "Paradidático de História",
    tipo: "Livro",
    descricao: "Livro de leitura complementar. Capa intacta.",
    preco: "Doação",
    contato: "Interessados: procurar na secretaria (anúncio #003)",
  },
];

export default function FeiraPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-primary mb-2">Feira de Trocas</h1>
      <p className="text-muted mb-6">
        Espaço para doação, troca ou venda de livros didáticos, paradidáticos e
        uniformes entre alunos. Todos os anúncios passam por moderação básica.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {itens.map((item) => (
          <article
            key={item.id}
            className="bg-white border border-border rounded-lg p-5 flex flex-col"
          >
            <span className="text-xs font-medium text-primary bg-primary/10 self-start px-2 py-0.5 rounded mb-2">
              {item.tipo}
            </span>
            <h2 className="font-semibold text-primary mb-1">{item.titulo}</h2>
            <p className="text-sm text-muted flex-1 mb-3">{item.descricao}</p>
            <p className="font-medium text-sm mb-1">{item.preco}</p>
            <p className="text-xs text-muted">{item.contato}</p>
          </article>
        ))}
      </div>

      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-5 text-sm">
        <p className="font-medium text-primary mb-1">Quer anunciar?</p>
        <p className="text-gray-700">
          Em breve será possível publicar anúncios diretamente pelo portal.
          Enquanto isso, procure a secretaria ou o Grêmio para registrar seu
          item.
        </p>
      </div>
    </div>
  );
}
