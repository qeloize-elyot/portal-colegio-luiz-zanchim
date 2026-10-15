"use client";

import { useEffect, useState } from "react";
import { getSupabase } from "@/lib/supabase/client";
import { useRole } from "@/lib/useRole";
import {
  PageHeroBanner,
  EnquetesIllustration,
  EmptyStateIllustration,
  WaveDivider,
} from "@/components/SvgDecorations";

type Enquete = {
  id: string;
  pergunta: string;
  opcoes: string[];
  ativa: boolean;
};

export default function EnquetesPage() {
  const { isAdmin, userId, loading: roleLoading } = useRole();
  const [lista, setLista] = useState<Enquete[]>([]);
  const [votados, setVotados] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [pergunta, setPergunta] = useState("");
  const [opcoesTxt, setOpcoesTxt] = useState("Sim\nNão\nTalvez");
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState("");

  async function carregar() {
    try {
      const supabase = getSupabase();
      if (userId) {
        const { data: meusVotos } = await supabase
          .from("enquete_votos")
          .select("enquete_id, opcao_index")
          .eq("user_id", userId);
        const map: Record<string, number> = {};
        (meusVotos || []).forEach((v) => {
          map[v.enquete_id] = v.opcao_index;
        });
        setVotados(map);
      }
      const { data } = await supabase
        .from("enquetes")
        .select("*")
        .eq("ativa", true)
        .order("created_at", { ascending: false });
      setLista(data || []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!roleLoading) carregar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roleLoading, userId]);

  async function criar(e: React.FormEvent) {
    e.preventDefault();
    if (!userId) {
      setErro("Faça login novamente.");
      return;
    }
    setEnviando(true);
    setErro("");
    const opcoes = opcoesTxt
      .split("\n")
      .map((o) => o.trim())
      .filter(Boolean);
    if (opcoes.length < 2) {
      setErro("Coloque pelo menos 2 opções (uma por linha).");
      setEnviando(false);
      return;
    }
    const supabase = getSupabase();
    const { error } = await supabase.from("enquetes").insert({
      pergunta: pergunta.trim(),
      opcoes,
      ativa: true,
      created_by: userId,
    });
    setEnviando(false);
    if (error) {
      setErro(error.message);
      return;
    }
    setPergunta("");
    setOpcoesTxt("Sim\nNão\nTalvez");
    await carregar();
  }

  async function votar(enqueteId: string, opcaoIndex: number) {
    if (!userId || votados[enqueteId] !== undefined) return;
    const supabase = getSupabase();
    const { error } = await supabase.from("enquete_votos").insert({
      enquete_id: enqueteId,
      user_id: userId,
      opcao_index: opcaoIndex,
    });
    if (!error) {
      setVotados((prev) => ({ ...prev, [enqueteId]: opcaoIndex }));
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <PageHeroBanner
        badge="Voz Ativa Estudantil"
        title="Enquetes da Escola"
        subtitle="Participe das votações e ajude a construir decisões sobre projetos, eventos e melhorias do nosso colégio."
        accentColor="#c45c26"
        softBg="#fdf0e6"
        illustration={<EnquetesIllustration />}
      />

      {isAdmin && (
        <form onSubmit={criar} className="bg-card border border-border rounded-3xl p-6 mb-8 space-y-3 shadow-2xs">
          <h2 className="font-bold text-sm text-primary">Criar nova enquete</h2>
          <input
            required
            value={pergunta}
            onChange={(e) => setPergunta(e.target.value)}
            placeholder="Pergunta da enquete"
            className="w-full border border-border rounded-xl px-3.5 py-2.5 text-sm bg-background/50"
          />
          <div>
            <label className="block text-xs font-medium text-muted mb-1">
              Opções (uma por linha)
            </label>
            <textarea
              required
              value={opcoesTxt}
              onChange={(e) => setOpcoesTxt(e.target.value)}
              rows={4}
              className="w-full border border-border rounded-xl px-3.5 py-2.5 text-sm bg-background/50"
            />
          </div>
          {erro && <p className="text-sm text-red-700">{erro}</p>}
          <button
            type="submit"
            disabled={enviando}
            className="bg-primary text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-primary-dark disabled:opacity-60"
          >
            {enviando ? "Criando..." : "Criar enquete"}
          </button>
        </form>
      )}

      {loading ? (
        <p className="text-muted text-sm">Carregando...</p>
      ) : lista.length === 0 ? (
        <EmptyStateIllustration label="Nenhuma enquete ativa neste momento." />
      ) : (
        <div className="space-y-5">
          {lista.map((eq) => (
            <div
              key={eq.id}
              className="bg-card border border-border rounded-3xl p-6 relative overflow-hidden shadow-2xs"
            >
              <svg
                className="pointer-events-none absolute right-3 top-3 w-20 h-20 opacity-10"
                viewBox="0 0 64 64"
                fill="none"
              >
                <rect x="10" y="34" width="10" height="20" rx="3" fill="#c45c26" />
                <rect x="26" y="18" width="10" height="36" rx="3" fill="#2f6f4e" />
                <rect x="42" y="26" width="10" height="28" rx="3" fill="#e6b422" />
              </svg>

              <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-primary bg-primary-soft px-2.5 py-0.5 rounded-full mb-2">
                Votação Aberta
              </span>
              <h2 className="font-bold text-lg text-foreground mb-4">{eq.pergunta}</h2>

              {votados[eq.id] !== undefined ? (
                <div className="bg-secondary-soft border border-secondary/30 rounded-2xl px-4 py-3 flex items-center gap-2.5 text-sm text-secondary">
                  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>
                    Voto registrado com sucesso:{" "}
                    <strong>{eq.opcoes[votados[eq.id]]}</strong>
                  </span>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {eq.opcoes.map((op, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => votar(eq.id, idx)}
                      className="w-full text-left px-4 py-3 border border-border rounded-2xl hover:border-primary hover:bg-primary-soft/50 text-sm font-medium transition-all flex items-center justify-between group"
                    >
                      <span>{op}</span>
                      <span className="text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity font-semibold">
                        Confirmar voto →
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <WaveDivider color="#c45c26" />
    </div>
  );
}
