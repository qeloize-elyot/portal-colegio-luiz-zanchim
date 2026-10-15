"use client";

import { useEffect, useState } from "react";
import { getSupabase } from "@/lib/supabase/client";
import { useRole } from "@/lib/useRole";
import {
  PageHeroBanner,
  CantinaIllustration,
  WaveDivider,
} from "@/components/SvgDecorations";

type DiaCardapio = {
  id: string;
  dia: string;
  lanche: string;
  almoco: string;
};

const ORDEM = ["Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira"];

const FALLBACK: DiaCardapio[] = [
  { id: "local-1", dia: "Segunda-feira", lanche: "Pão com queijo + suco", almoco: "Arroz, feijão, frango, salada" },
  { id: "local-2", dia: "Terça-feira", lanche: "Bolo de fubá + leite", almoco: "Arroz, feijão, carne moída, legumes" },
  { id: "local-3", dia: "Quarta-feira", lanche: "Fruta + iogurte", almoco: "Arroz, feijão, peixe, salada" },
  { id: "local-4", dia: "Quinta-feira", lanche: "Pão + suco", almoco: "Arroz, feijão, estrogonofe, batata" },
  { id: "local-5", dia: "Sexta-feira", lanche: "Biscoito + leite", almoco: "Arroz, feijão, lasanha, salada" },
];

export default function CardapioPage() {
  const { isAdmin, loading: roleLoading } = useRole();
  const [itens, setItens] = useState<DiaCardapio[]>([]);
  const [loading, setLoading] = useState(true);
  const [salvando, setSalvando] = useState<string | null>(null);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const supabase = getSupabase();
        const { data, error } = await supabase.from("cardapio").select("*");
        if (error || !data || data.length === 0) {
          setItens(FALLBACK);
        } else {
          setItens(
            [...data].sort((a, b) => ORDEM.indexOf(a.dia) - ORDEM.indexOf(b.dia))
          );
        }
      } catch {
        setItens(FALLBACK);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  function updateLocal(id: string, field: "lanche" | "almoco", value: string) {
    setItens((prev) =>
      prev.map((i) => (i.id === id ? { ...i, [field]: value } : i))
    );
  }

  async function salvar(item: DiaCardapio) {
    if (String(item.id).startsWith("local-")) {
      setMsg("Rode o FIX_RECURSAO.sql no Supabase para salvar no banco.");
      return;
    }
    setSalvando(item.id);
    setMsg("");
    const supabase = getSupabase();
    const { error } = await supabase
      .from("cardapio")
      .update({
        lanche: item.lanche,
        almoco: item.almoco,
        updated_at: new Date().toISOString(),
      })
      .eq("id", item.id);
    setSalvando(null);
    setMsg(error ? "Erro ao salvar: " + error.message : "Cardápio de " + item.dia + " salvo!");
  }

  if (loading || roleLoading) {
    return <div className="max-w-5xl mx-auto px-4 py-10 text-muted">Carregando...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <PageHeroBanner
        badge="Alimentação Escolar"
        title="Cardápio da Cantina"
        subtitle="Confira a programação semanal de lanches e refeições preparadas com cuidado para os nossos estudantes."
        accentColor="#c45c26"
        softBg="#fff7ed"
        illustration={<CantinaIllustration />}
      />

      {msg && (
        <div className="mb-6 bg-secondary-soft border border-secondary/30 text-secondary px-4 py-3 rounded-2xl text-sm font-medium">
          {msg}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {itens.map((dia, index) => (
          <div
            key={dia.id}
            className="bg-card border border-border rounded-3xl overflow-hidden shadow-2xs hover:border-primary/60 transition-all relative"
          >
            {/* Marca d'água SVG decorativa no card */}
            <svg
              className="pointer-events-none absolute right-2 bottom-2 w-20 h-20 opacity-10"
              viewBox="0 0 64 64"
              fill="none"
            >
              <circle cx="32" cy="32" r="24" stroke="#c45c26" strokeWidth="3" />
              <path d="M22 32h20M32 22v20" stroke="#2f6f4e" strokeWidth="3" strokeLinecap="round" />
            </svg>

            <div
              className="px-5 py-3 font-bold text-sm flex items-center justify-between text-white"
              style={{
                backgroundColor: index % 2 === 0 ? "#c45c26" : "#2f6f4e",
              }}
            >
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <path d="M16 2v4M8 2v4M3 10h18" />
                </svg>
                {dia.dia}
              </span>
              <span className="text-[11px] bg-white/20 px-2.5 py-0.5 rounded-full">
                Cantina Escolar
              </span>
            </div>

            <div className="p-5 space-y-4 relative z-10">
              <div className="bg-primary-soft/60 rounded-2xl p-3.5 border border-border/60">
                <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary mb-1">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" />
                  </svg>
                  Lanche / Recreio
                </label>
                {isAdmin ? (
                  <input
                    value={dia.lanche}
                    onChange={(e) => updateLocal(dia.id, "lanche", e.target.value)}
                    className="w-full border border-border bg-white rounded-xl px-3 py-2 text-sm"
                  />
                ) : (
                  <p className="text-sm font-medium text-foreground">{dia.lanche}</p>
                )}
              </div>

              <div className="bg-secondary-soft/60 rounded-2xl p-3.5 border border-border/60">
                <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-secondary mb-1">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M8 12h8" />
                  </svg>
                  Refeição Principal / Almoço
                </label>
                {isAdmin ? (
                  <input
                    value={dia.almoco}
                    onChange={(e) => updateLocal(dia.id, "almoco", e.target.value)}
                    className="w-full border border-border bg-white rounded-xl px-3 py-2 text-sm"
                  />
                ) : (
                  <p className="text-sm font-medium text-foreground">{dia.almoco}</p>
                )}
              </div>

              {isAdmin && (
                <button
                  type="button"
                  onClick={() => salvar(dia)}
                  disabled={salvando === dia.id}
                  className="text-sm bg-primary text-white font-semibold px-4 py-2 rounded-xl hover:bg-primary-dark disabled:opacity-60"
                >
                  {salvando === dia.id ? "Salvando..." : "Salvar este dia"}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <WaveDivider color="#2f6f4e" />
    </div>
  );
}
