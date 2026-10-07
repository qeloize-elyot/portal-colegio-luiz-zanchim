const cardapioSemana = [
  {
    dia: "Segunda-feira",
    itens: [
      { refeicao: "Lanche da manhã", descricao: "Pão com queijo + suco de laranja" },
      { refeicao: "Almoço", descricao: "Arroz, feijão, frango grelhado, salada e suco" },
    ],
  },
  {
    dia: "Terça-feira",
    itens: [
      { refeicao: "Lanche da manhã", descricao: "Bolo de fubá + leite" },
      { refeicao: "Almoço", descricao: "Arroz, feijão, carne moída, legumes e suco" },
    ],
  },
  {
    dia: "Quarta-feira",
    itens: [
      { refeicao: "Lanche da manhã", descricao: "Fruta da estação + iogurte" },
      { refeicao: "Almoço", descricao: "Arroz, feijão, peixe, salada e suco" },
    ],
  },
  {
    dia: "Quinta-feira",
    itens: [
      { refeicao: "Lanche da manhã", descricao: "Pão com mortadela + suco" },
      { refeicao: "Almoço", descricao: "Arroz, feijão, estrogonofe de frango, batata e suco" },
    ],
  },
  {
    dia: "Sexta-feira",
    itens: [
      { refeicao: "Lanche da manhã", descricao: "Biscoito + leite" },
      { refeicao: "Almoço", descricao: "Arroz, feijão, lasanha, salada e suco" },
    ],
  },
];

export default function CardapioPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-primary mb-2">Cardápio da Cantina</h1>
      <p className="text-muted mb-6">
        Programação alimentar da semana. Opções com restrições alimentares
        devem ser solicitadas antecipadamente na secretaria.
      </p>

      <div className="space-y-4">
        {cardapioSemana.map((dia) => (
          <div
            key={dia.dia}
            className="bg-white border border-border rounded-lg overflow-hidden"
          >
            <div className="bg-primary text-white px-4 py-2 font-medium">
              {dia.dia}
            </div>
            <div className="divide-y divide-border">
              {dia.itens.map((item) => (
                <div key={item.refeicao} className="px-4 py-3 flex flex-col sm:flex-row sm:gap-4">
                  <span className="font-medium text-sm text-primary min-w-[140px]">
                    {item.refeicao}
                  </span>
                  <span className="text-sm text-foreground">{item.descricao}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="mt-6 text-xs text-muted">
        * Cardápio sujeito a alterações. Em caso de dúvidas, procure a cantina
        ou a secretaria.
      </p>
    </div>
  );
}
