"use client";

import { useState } from "react";

const enquetes = [
  {
    id: 1,
    pergunta: "Qual tema você prefere para a próxima festa junina?",
    opcoes: ["Arraiá tradicional", "Festa junina com jogos", "Show de talentos + comidas típicas"],
    ativa: true,
  },
  {
    id: 2,
    pergunta: "Você é a favor da extensão do horário da biblioteca até as 18h?",
    opcoes: ["Sim", "Não", "Indiferente"],
    ativa: true,
  },
];

export default function EnquetesPage() {
  const [votos, setVotos] = useState<Record<number, string>>({});

  function votar(enqueteId: number, opcao: string) {
    setVotos((prev) => ({ ...prev, [enqueteId]: opcao }));
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-primary mb-2">Enquetes e Votações</h1>
      <p className="text-muted mb-6">
        Participe das pesquisas rápidas criadas pela administração para colher a
        opinião dos estudantes.
      </p>

      <div className="space-y-6">
        {enquetes.map((enquete) => (
          <div
            key={enquete.id}
            className="bg-white border border-border rounded-lg p-5"
          >
            <h2 className="font-semibold text-primary mb-4">{enquete.pergunta}</h2>

            {votos[enquete.id] ? (
              <div className="bg-accent-light text-accent px-4 py-3 rounded text-sm">
                Seu voto foi registrado: <strong>{votos[enquete.id]}</strong>
                <br />
                <span className="text-xs opacity-80">
                  (Demonstração — os votos reais serão salvos após implementação do backend)
                </span>
              </div>
            ) : (
              <div className="space-y-2">
                {enquete.opcoes.map((opcao) => (
                  <button
                    key={opcao}
                    type="button"
                    onClick={() => votar(enquete.id, opcao)}
                    className="w-full text-left px-4 py-2.5 border border-border rounded hover:border-primary hover:bg-blue-50 transition-colors text-sm"
                  >
                    {opcao}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
