"use client";

import { useState } from "react";

export default function CalculadoraPage() {
  const [nota1, setNota1] = useState("");
  const [nota2, setNota2] = useState("");
  const [mediaNecessaria, setMediaNecessaria] = useState("6.0");
  const [resultado, setResultado] = useState<string | null>(null);

  function calcular() {
    const n1 = parseFloat(nota1.replace(",", "."));
    const n2 = parseFloat(nota2.replace(",", "."));
    const media = parseFloat(mediaNecessaria.replace(",", "."));

    if (isNaN(n1) || isNaN(n2) || isNaN(media)) {
      setResultado("Preencha as notas corretamente.");
      return;
    }

    const precisa = media * 3 - n1 - n2;

    if (precisa <= 0) {
      setResultado(
        `Parabéns! Com as notas atuais você já atinge ou supera a média de ${media.toFixed(1)}.`
      );
    } else if (precisa > 10) {
      setResultado(
        `Você precisaria de ${precisa.toFixed(1)} na próxima avaliação, o que ultrapassa a nota máxima (10). Converse com o professor.`
      );
    } else {
      setResultado(
        `Você precisa tirar pelo menos ${precisa.toFixed(1)} na próxima avaliação para atingir a média de ${media.toFixed(1)}.`
      );
    }
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-primary mb-2">
        Calculadora de Notas
      </h1>
      <p className="text-muted mb-6 text-sm">
        Ferramenta auxiliar. Confirme sempre as regras oficiais de cálculo de
        média da escola com a coordenação pedagógica.
      </p>

      <div className="bg-white border border-border rounded-lg p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">1ª Nota / Bimestre</label>
          <input
            type="text"
            inputMode="decimal"
            value={nota1}
            onChange={(e) => setNota1(e.target.value)}
            placeholder="Ex: 7.5"
            className="w-full border border-border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">2ª Nota / Bimestre</label>
          <input
            type="text"
            inputMode="decimal"
            value={nota2}
            onChange={(e) => setNota2(e.target.value)}
            placeholder="Ex: 6.0"
            className="w-full border border-border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Média necessária</label>
          <input
            type="text"
            inputMode="decimal"
            value={mediaNecessaria}
            onChange={(e) => setMediaNecessaria(e.target.value)}
            className="w-full border border-border rounded px-3 py-2"
          />
        </div>

        <button
          type="button"
          onClick={calcular}
          className="w-full bg-primary text-white font-medium py-2.5 rounded hover:bg-primary-dark transition-colors"
        >
          Calcular
        </button>

        {resultado && (
          <div className="bg-blue-50 border border-blue-200 rounded px-4 py-3 text-sm">
            {resultado}
          </div>
        )}
      </div>
    </div>
  );
}
