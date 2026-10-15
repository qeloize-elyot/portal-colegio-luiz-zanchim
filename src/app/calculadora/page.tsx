"use client";

import { useState } from "react";
import {
  PageHeroBanner,
  CalculadoraIllustration,
  WaveDivider,
} from "@/components/SvgDecorations";

type ResultadoCalculo = {
  somaTotal: number;
  mediaTrimestral: number;
  aprovado: boolean;
  diferenca: number;
  mensagem: string;
};

export default function CalculadoraPage() {
  const [trimestre1, setTrimestre1] = useState("");
  const [trimestre2, setTrimestre2] = useState("");
  const [trimestre3, setTrimestre3] = useState("");
  const [erro, setErro] = useState("");
  const [resultado, setResultado] = useState<ResultadoCalculo | null>(null);

  const PONTOS_NECESSARIOS = 180; // Meta anual (média 60 por trimestre)
  const MAX_POR_TRIMESTRE = 100;

  function calcular() {
    setErro("");
    setResultado(null);

    const t1 = trimToNumber(trimestre1);
    const t2 = trimToNumber(trimestre2);
    const t3 = trimToNumber(trimestre3);

    if (t1 === null && t2 === null && t3 === null) {
      setErro("Preencha pelo menos a nota de um trimestre para calcular.");
      return;
    }

    const notas = [t1 ?? 0, t2 ?? 0, t3 ?? 0];

    for (let i = 0; i < notas.length; i++) {
      if (notas[i] < 0 || notas[i] > MAX_POR_TRIMESTRE) {
        setErro(
          `A nota do ${i + 1}º Trimestre deve estar entre 0 e ${MAX_POR_TRIMESTRE} pontos.`
        );
        return;
      }
    }

    const somaTotal = notas[0] + notas[1] + notas[2];
    const mediaTrimestral = somaTotal / 3;

    if (somaTotal >= PONTOS_NECESSARIOS) {
      const sobra = Number((somaTotal - PONTOS_NECESSARIOS).toFixed(1));
      setResultado({
        somaTotal: Number(somaTotal.toFixed(1)),
        mediaTrimestral: Number(mediaTrimestral.toFixed(1)),
        aprovado: true,
        diferenca: sobra,
        mensagem:
          sobra === 0
            ? `Parabéns! Você atingiu exatamente os ${PONTOS_NECESSARIOS} pontos necessários para passar (média de ${mediaTrimestral.toFixed(1)} por trimestre).`
            : `Parabéns! Você passou da média por ${sobra} pontos! Seu total foi de ${somaTotal.toFixed(1)} pontos (média de ${mediaTrimestral.toFixed(1)} por trimestre).`,
      });
    } else {
      const falta = Number((PONTOS_NECESSARIOS - somaTotal).toFixed(1));
      setResultado({
        somaTotal: Number(somaTotal.toFixed(1)),
        mediaTrimestral: Number(mediaTrimestral.toFixed(1)),
        aprovado: false,
        diferenca: falta,
        mensagem: `Faltam ${falta} pontos para você passar e atingir os ${PONTOS_NECESSARIOS} pontos no ano.`,
      });
    }
  }

  function trimToNumber(val: string): number | null {
    const limpo = val.trim().replace(",", ".");
    if (!limpo) return null;
    const num = Number(limpo);
    return Number.isNaN(num) ? null : num;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <PageHeroBanner
        badge="Sistema Trimestral (0 a 100 pontos)"
        title="Calculadora de Notas"
        subtitle="O ano letivo é dividido em 3 trimestres (máximo de 100 pontos em cada). Para ser aprovado no final do ano, você precisa somar pelo menos 180 pontos (média 60)."
        accentColor="#c45c26"
        softBg="#fdf6d9"
        illustration={<CalculadoraIllustration />}
      />

      <div className="max-w-xl mx-auto bg-card border border-border rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xs relative overflow-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-bold text-foreground mb-1">
              1º Trimestre
            </label>
            <input
              type="number"
              min={0}
              max={100}
              step="0.1"
              value={trimestre1}
              onChange={(e) => setTrimestre1(e.target.value)}
              placeholder="0 a 100"
              className="w-full border border-border rounded-xl px-3.5 py-2.5 bg-background/60 text-sm"
            />
            <span className="text-[11px] text-muted">Máx: 100 pts</span>
          </div>

          <div>
            <label className="block text-sm font-bold text-foreground mb-1">
              2º Trimestre
            </label>
            <input
              type="number"
              min={0}
              max={100}
              step="0.1"
              value={trimestre2}
              onChange={(e) => setTrimestre2(e.target.value)}
              placeholder="0 a 100"
              className="w-full border border-border rounded-xl px-3.5 py-2.5 bg-background/60 text-sm"
            />
            <span className="text-[11px] text-muted">Máx: 100 pts</span>
          </div>

          <div>
            <label className="block text-sm font-bold text-foreground mb-1">
              3º Trimestre
            </label>
            <input
              type="number"
              min={0}
              max={100}
              step="0.1"
              value={trimestre3}
              onChange={(e) => setTrimestre3(e.target.value)}
              placeholder="0 a 100"
              className="w-full border border-border rounded-xl px-3.5 py-2.5 bg-background/60 text-sm"
            />
            <span className="text-[11px] text-muted">Máx: 100 pts</span>
          </div>
        </div>

        <div className="bg-background border border-border rounded-2xl px-4 py-3 flex items-center justify-between text-xs text-muted">
          <span>Pontuação máxima no ano: <strong>300 pontos</strong></span>
          <span>Mínimo para aprovação: <strong>180 pontos</strong></span>
        </div>

        {erro && (
          <div className="bg-red-50 border border-red-200 text-red-800 rounded-2xl px-4 py-3 text-sm font-medium">
            {erro}
          </div>
        )}

        <button
          type="button"
          onClick={calcular}
          className="w-full bg-primary text-white font-semibold py-3 rounded-xl hover:bg-primary-dark transition-colors shadow-xs"
        >
          Calcular pontuação e média
        </button>

        {resultado && (
          <div
            className={`rounded-2xl p-5 border space-y-2 ${
              resultado.aprovado
                ? "bg-secondary-soft border-secondary/40 text-secondary"
                : "bg-amber-50 border-amber-300 text-amber-900"
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-current/15 pb-2">
              <span className="text-xs font-bold uppercase tracking-wider">
                Total Acumulado: {resultado.somaTotal} / 180 pts
              </span>
              <span className="text-xs font-bold uppercase tracking-wider">
                Média por Trimestre: {resultado.mediaTrimestral} pts
              </span>
            </div>
            <p className="text-sm font-bold leading-relaxed pt-1">
              {resultado.mensagem}
            </p>
          </div>
        )}
      </div>

      <WaveDivider color="#e6b422" />
    </div>
  );
}
