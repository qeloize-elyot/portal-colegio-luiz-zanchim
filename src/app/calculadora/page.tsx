"use client";

import { useEffect, useMemo, useState } from "react";

type NotasTrimestre = {
  t1: number | null;
  t2: number | null;
  t3: number | null;
};

type Materia = {
  id: string;
  nome: string;
  notas: NotasTrimestre;
};

const STORAGE_KEY = "portal-zanchim-notas-v1";
const META_ANUAL = 180; // mínimo para aprovação (média 60)
const MAX_TRIM = 100;

const MATERIAS_SUGERIDAS = [
  "Língua Portuguesa",
  "Matemática",
  "História",
  "Geografia",
  "Ciências",
  "Biologia",
  "Física",
  "Química",
  "Inglês",
  "Educação Física",
  "Arte",
  "Sociologia",
  "Filosofia",
  "Ensino Religioso",
];

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

function parseNota(val: string): number | null {
  const limpo = val.trim().replace(",", ".");
  if (!limpo) return null;
  const n = Number(limpo);
  if (Number.isNaN(n)) return null;
  return Math.min(MAX_TRIM, Math.max(0, n));
}

function mediaDe(notas: NotasTrimestre): number | null {
  const vals = [notas.t1, notas.t2, notas.t3].filter((v): v is number => v !== null);
  if (vals.length === 0) return null;
  return vals.reduce((a, b) => a + b, 0) / vals.length;
}

function somaDe(notas: NotasTrimestre): number {
  return (notas.t1 ?? 0) + (notas.t2 ?? 0) + (notas.t3 ?? 0);
}

function statusMateria(notas: NotasTrimestre) {
  const soma = somaDe(notas);
  const preenchidos = [notas.t1, notas.t2, notas.t3].filter((v) => v !== null).length;
  if (preenchidos === 0) return { label: "Sem notas", cor: "bg-slate-100 text-slate-600", tipo: "vazio" as const };
  if (preenchidos < 3) {
    const falta = META_ANUAL - soma;
    if (falta <= 0) return { label: "Já passou", cor: "bg-emerald-100 text-emerald-800", tipo: "ok" as const };
    return {
      label: `Faltam ${falta.toFixed(0)} pts`,
      cor: "bg-amber-100 text-amber-900",
      tipo: "andamento" as const,
    };
  }
  if (soma >= META_ANUAL) return { label: "Aprovado", cor: "bg-emerald-100 text-emerald-800", tipo: "ok" as const };
  return { label: "Recuperação", cor: "bg-red-100 text-red-800", tipo: "risco" as const };
}

export default function MinhasNotasPage() {
  const [materias, setMaterias] = useState<Materia[]>([]);
  const [novaMateria, setNovaMateria] = useState("");
  const [mostrarSugestoes, setMostrarSugestoes] = useState(false);
  const [carregado, setCarregado] = useState(false);

  // Carrega do localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Materia[];
        if (Array.isArray(parsed)) setMaterias(parsed);
      }
    } catch {
      /* ignore */
    }
    setCarregado(true);
  }, []);

  // Salva
  useEffect(() => {
    if (!carregado) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(materias));
    } catch {
      /* ignore */
    }
  }, [materias, carregado]);

  function adicionarMateria(nome: string) {
    const n = nome.trim();
    if (!n) return;
    if (materias.some((m) => m.nome.toLowerCase() === n.toLowerCase())) return;
    setMaterias((prev) => [
      ...prev,
      { id: uid(), nome: n, notas: { t1: null, t2: null, t3: null } },
    ]);
    setNovaMateria("");
    setMostrarSugestoes(false);
  }

  function removerMateria(id: string) {
    setMaterias((prev) => prev.filter((m) => m.id !== id));
  }

  function atualizarNota(id: string, trim: "t1" | "t2" | "t3", valor: string) {
    const num = parseNota(valor);
    setMaterias((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, notas: { ...m.notas, [trim]: num } } : m
      )
    );
  }

  const resumo = useMemo(() => {
    if (materias.length === 0) return null;

    let totalPontos = 0;
    let countComNota = 0;
    let aprovadas = 0;
    let emRisco = 0;
    let emAndamento = 0;

    materias.forEach((m) => {
      const st = statusMateria(m.notas);
      const med = mediaDe(m.notas);
      if (med !== null) {
        totalPontos += med;
        countComNota++;
      }
      if (st.tipo === "ok") aprovadas++;
      else if (st.tipo === "risco") emRisco++;
      else if (st.tipo === "andamento") emAndamento++;
    });

    const mediaGeral = countComNota > 0 ? totalPontos / countComNota : null;

    return {
      mediaGeral,
      aprovadas,
      emRisco,
      emAndamento,
      total: materias.length,
    };
  }, [materias]);

  function dicaPara(m: Materia): string | null {
    const { t1, t2, t3 } = m.notas;
    const preenchidos = [t1, t2, t3].filter((v) => v !== null).length;
    if (preenchidos === 0) return "Comece lançando a nota do 1º trimestre.";
    const soma = somaDe(m.notas);
    if (preenchidos === 1) {
      const falta = META_ANUAL - soma;
      return `Para passar com folga, você precisa de cerca de ${(falta / 2).toFixed(0)} pts nos próximos dois trimestres.`;
    }
    if (preenchidos === 2) {
      const falta = META_ANUAL - soma;
      if (falta <= 0) return "Você já tem pontos suficientes para ser aprovado nesta matéria!";
      if (falta > MAX_TRIM) return `Atenção: precisa de ${falta.toFixed(0)} pts no 3º trimestre (acima do máximo). Foque na recuperação.";
      return `No 3º trimestre você precisa de pelo menos ${falta.toFixed(0)} pontos para fechar a matéria.`;
    }
    if (soma >= META_ANUAL) return "Matéria fechada com sucesso. Parabéns!";
    return "Nota abaixo da média anual. Procure o professor sobre recuperação.";
  }

  return (
    <div
      className="min-h-screen text-[#0F1E36] pb-20"
      style={{
        backgroundColor: "#F7F3E8",
        backgroundImage: "radial-gradient(#0F1E36 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-8">
        <span className="text-[11px] font-bold uppercase tracking-widest text-[#0F766E] bg-[#E6F7F8] border-2 border-[#0F1E36] px-3 py-1 rounded-lg shadow-[2px_2px_0_#0F1E36]">
          Controle pessoal
        </span>
        <h1 className="mt-3 text-3xl font-semibold font-serif">Minhas Notas</h1>
        <p className="mt-2 text-sm opacity-75 max-w-xl">
          Anote as notas de cada matéria, acompanhe a média do trimestre e veja o que ainda falta para fechar o ano (mínimo 180 pontos / média 60).
          Tudo fica salvo só no seu aparelho.
        </p>

        {/* Resumo geral */}
        {resumo && (
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-white border-2 border-[#0F1E36] rounded-2xl p-4 shadow-[3px_3px_0_#0F1E36]">
              <p className="text-[10px] font-bold uppercase tracking-wider opacity-60">Média geral</p>
              <p className="text-2xl font-semibold tabular-nums mt-1">
                {resumo.mediaGeral !== null ? resumo.mediaGeral.toFixed(1) : "—"}
              </p>
            </div>
            <div className="bg-white border-2 border-[#0F1E36] rounded-2xl p-4 shadow-[3px_3px_0_#15803D]">
              <p className="text-[10px] font-bold uppercase tracking-wider opacity-60">Em dia</p>
              <p className="text-2xl font-semibold tabular-nums mt-1 text-emerald-700">{resumo.aprovadas}</p>
            </div>
            <div className="bg-white border-2 border-[#0F1E36] rounded-2xl p-4 shadow-[3px_3px_0_#D97706]">
              <p className="text-[10px] font-bold uppercase tracking-wider opacity-60">Em andamento</p>
              <p className="text-2xl font-semibold tabular-nums mt-1 text-amber-700">{resumo.emAndamento}</p>
            </div>
            <div className="bg-white border-2 border-[#0F1E36] rounded-2xl p-4 shadow-[3px_3px_0_#DC2626]">
              <p className="text-[10px] font-bold uppercase tracking-wider opacity-60">Em risco</p>
              <p className="text-2xl font-semibold tabular-nums mt-1 text-red-700">{resumo.emRisco}</p>
            </div>
          </div>
        )}

        {/* Adicionar matéria */}
        <div className="mt-8 bg-white border-[3px] border-[#0F1E36] rounded-2xl p-5 shadow-[4px_4px_0_#0F1E36]">
          <h2 className="font-semibold font-serif text-lg mb-3">Adicionar matéria</h2>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              value={novaMateria}
              onChange={(e) => setNovaMateria(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") adicionarMateria(novaMateria);
              }}
              placeholder="Ex: Matemática, Física..."
              className="flex-1 border-2 border-[#0F1E36] rounded-xl px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#F4B41A]"
            />
            <button
              type="button"
              onClick={() => adicionarMateria(novaMateria)}
              className="px-5 py-2.5 rounded-xl bg-[#0F1E36] text-white font-semibold text-sm border-2 border-[#0F1E36] hover:bg-[#1a2d4a] transition-colors"
            >
              Adicionar
            </button>
          </div>

          <button
            type="button"
            onClick={() => setMostrarSugestoes(!mostrarSugestoes)}
            className="mt-3 text-xs font-medium text-[#2554C7] underline"
          >
            {mostrarSugestoes ? "Esconder sugestões" : "Ver matérias comuns"}
          </button>

          {mostrarSugestoes && (
            <div className="mt-3 flex flex-wrap gap-2">
              {MATERIAS_SUGERIDAS.filter(
                (s) => !materias.some((m) => m.nome.toLowerCase() === s.toLowerCase())
              ).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => adicionarMateria(s)}
                  className="text-xs px-3 py-1.5 rounded-lg border-2 border-[#0F1E36]/40 bg-[#F7F3E8] hover:bg-[#FFF8DB] font-medium"
                >
                  + {s}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Lista de matérias */}
        <div className="mt-8 space-y-4">
          {materias.length === 0 && (
            <div className="text-center py-12 bg-white/60 border-2 border-dashed border-[#0F1E36]/30 rounded-2xl">
              <p className="font-medium opacity-70">Nenhuma matéria ainda</p>
              <p className="text-sm opacity-50 mt-1">Adicione as disciplinas do seu boletim para começar.</p>
            </div>
          )}

          {materias.map((m) => {
            const med = mediaDe(m.notas);
            const soma = somaDe(m.notas);
            const st = statusMateria(m.notas);
            const dica = dicaPara(m);
            const progresso = Math.min(100, (soma / META_ANUAL) * 100);

            return (
              <div
                key={m.id}
                className="bg-white border-[3px] border-[#0F1E36] rounded-2xl overflow-hidden shadow-[4px_4px_0_#0F1E36]"
              >
                <div className="px-4 sm:px-5 py-3.5 flex items-start justify-between gap-3 border-b-2 border-[#0F1E36]/10">
                  <div>
                    <h3 className="font-semibold font-serif text-lg leading-tight">{m.nome}</h3>
                    <div className="flex flex-wrap items-center gap-2 mt-1.5">
                      <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-md ${st.cor}`}>
                        {st.label}
                      </span>
                      {med !== null && (
                        <span className="text-xs opacity-70">
                          Média atual: <strong className="tabular-nums">{med.toFixed(1)}</strong>
                        </span>
                      )}
                      <span className="text-xs opacity-70">
                        Total: <strong className="tabular-nums">{soma.toFixed(0)}</strong> / 180
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removerMateria(m.id)}
                    className="text-xs text-red-600 font-medium hover:underline shrink-0 mt-1"
                    aria-label={`Remover ${m.nome}`}
                  >
                    Remover
                  </button>
                </div>

                <div className="px-4 sm:px-5 py-4">
                  <div className="grid grid-cols-3 gap-3">
                    {(["t1", "t2", "t3"] as const).map((trim, idx) => (
                      <div key={trim}>
                        <label className="block text-[11px] font-bold uppercase tracking-wider opacity-60 mb-1">
                          {idx + 1}º Trim.
                        </label>
                        <input
                          type="number"
                          min={0}
                          max={100}
                          step="0.1"
                          value={m.notas[trim] ?? ""}
                          onChange={(e) => atualizarNota(m.id, trim, e.target.value)}
                          placeholder="0–100"
                          className="w-full border-2 border-[#0F1E36] rounded-xl px-2.5 py-2 text-sm tabular-nums text-center outline-none focus:ring-2 focus:ring-[#F4B41A]"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Barra de progresso */}
                  <div className="mt-4">
                    <div className="h-2.5 rounded-full bg-[#E8E4D9] overflow-hidden border border-[#0F1E36]/20">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          progresso >= 100
                            ? "bg-emerald-500"
                            : progresso >= 70
                            ? "bg-amber-400"
                            : "bg-[#E04F33]"
                        }`}
                        style={{ width: `${progresso}%` }}
                      />
                    </div>
                    <p className="text-[11px] opacity-60 mt-1.5 tabular-nums">
                      {progresso.toFixed(0)}% do caminho até os 180 pontos
                    </p>
                  </div>

                  {dica && (
                    <p className="mt-3 text-xs leading-relaxed bg-[#F7F3E8] border border-[#0F1E36]/15 rounded-xl px-3 py-2.5">
                      💡 {dica}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {materias.length > 0 && (
          <p className="mt-8 text-center text-xs opacity-50">
            Dados salvos apenas neste navegador. Não substitui o boletim oficial da escola.
          </p>
        )}
      </div>
    </div>
  );
}
