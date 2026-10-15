"use client";

import { useState } from "react";
import {
  PageHeroBanner,
  CalculadoraIllustration,
  WaveDivider,
} from "@/components/SvgDecorations";

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
    <div className="max-w-4xl mx-auto px-4 py-10">
      <PageHeroBanner
        badge="Planejamento de Estudos"
        title="Calculadora de Notas"
        subtitle="Simule suas notas trimestrais ou bimestrais e descubra quanto precisa alcançar na próxima avaliação."
        accentColor="#c45c26"
        softBg="#fdf6d9"
        illustration={<CalculadoraIllustration />}
      />

      <div className="max-w-xl mx-auto bg-card border border-border rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xs relative overflow-hidden">
        <div>
          <label className="block text-sm font-bold text-foreground mb-1">
            1ª Nota / Trimestre
          </label>
          <input
            type="text"
            inputMode="decimal"
            value={nota1}
            onChange={(e) => setNota1(e.target.value)}
            placeholder="Ex: 7.5"
            className="w-full border border-border rounded-xl px-3.5 py-2.5 bg-background/60 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-foreground mb-1">
            2ª Nota / Trimestre
          </label>
          <input
            type="text"
            inputMode="decimal"
            value={nota2}
            onChange={(e) => setNota2(e.target.value)}
            placeholder="Ex: 6.0"
            className="w-full border border-border rounded-xl px-3.5 py-2.5 bg-background/60 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-foreground mb-1">
            Média necessária
          </label>
          <input
            type="text"
            inputMode="decimal"
            value={mediaNecessaria}
            onChange={(e) => setMediaNecessaria(e.target.value)}
            className="w-full border border-border rounded-xl px-3.5 py-2.5 bg-background/60 text-sm"
          />
        </div>

        <button
          type="button"
          onClick={calcular}
          className="w-full bg-primary text-white font-semibold py-3 rounded-xl hover:bg-primary-dark transition-colors shadow-xs"
        >
          Calcular nota necessária
        </button>

        {resultado && (
          <div className="bg-secondary-soft border border-secondary/30 text-secondary rounded-2xl px-4 py-3.5 text-sm font-medium">
            {resultado}
          </div>
        )}
      </div>

      <WaveDivider color="#e6b422" />
    </div>
  );
}
