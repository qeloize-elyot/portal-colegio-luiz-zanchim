"use client";

import { useEffect, useState } from "react";
import { getSupabase } from "@/lib/supabase/client";
import { useRole } from "@/lib/useRole";

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
  const { isAdmin, role, loading: roleLoading, email } = useRole();
  const [itens, setItens] = useState<DiaCardapio[]>([]);
  const [loading, setLoading] = useState(true);
  const [salvando, setSalvando] = useState<string | null>(null);
  const [msg, setMsg] = useState("");
  const [avisoBanco, setAvisoBanco] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const supabase = getSupabase();
        const { data, error } = await supabase.from("cardapio").select("*");
        if (error || !data || data.length === 0) {
          setAvisoBanco(
            error
              ? "Banco ainda sem tabela cardápio. Rode o arquivo FIX_EDICAO.sql no Supabase. Enquanto isso você pode editar localmente (não salva no servidor)."
              : "Tabela vazia. Rode o FIX_EDICAO.sql no Supabase para gravar de verdade."
          );
          setItens(FALLBACK);
        } else {
          setItens(
            [...data].sort((a, b) => ORDEM.indexOf(a.dia) - ORDEM.indexOf(b.dia))
          );
        }
      } catch {
        setAvisoBanco("Erro ao conectar. Mostrando cardápio local.");
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
      setMsg("Este cardápio ainda é local. Rode o FIX_EDICAO.sql no Supabase para salvar de verdade.");
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
    setMsg(
      error
        ? "Erro ao salvar: " + error.message
        : "Cardápio de " + item.dia + " salvo!"
    );
  }

  if (loading || roleLoading) {
    return <div className="max-w-5xl mx-auto px-4 py-10 text-muted">Carregando...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex items-start gap-4 mb-4">
        <div className="text-4xl" aria-hidden>
          🍎
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-1">Cardápio da Cantina</h1>
          <p className="text-muted text-sm">
            {isAdmin
              ? "Edite os campos e clique em Salvar em cada dia."
              : "Programação da semana."}
          </p>
          <p className="text-xs text-muted mt-1">
            Seu perfil: <b>{role || "?"}</b>
            {email ? ` · ${email}` : ""}
          </p>
        </div>
      </div>

      {!isAdmin && (
        <div className="bg-amber-50 border border-amber-200 text-amber-900 text-sm px-4 py-3 rounded-xl mb-4">
          Os campos de edição só aparecem para conta <b>ADMIN</b>. Seu perfil atual é{" "}
          <b>{role || "desconhecido"}</b>. Rode no Supabase:{" "}
          <code className="text-[11px]">update public.profiles set role = 'ADMIN' where email = 'seu@email';</code>
        </div>
      )}

      {avisoBanco && (
        <div className="bg-primary-soft border border-border text-sm px-4 py-3 rounded-xl mb-4">
          {avisoBanco}
        </div>
      )}

      {msg && <p className="mb-4 text-sm font-medium text-secondary">{msg}</p>}

      <div className="space-y-4">
        {itens.map((dia) => (
          <div key={dia.id} className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="bg-primary text-white px-4 py-2.5 font-medium text-sm flex items-center gap-2">
              <span>🍽️</span> {dia.dia}
            </div>
            <div className="p-4 space-y-3">
              <div>
                <label className="block text-xs font-semibold text-muted mb-1">Lanche da manhã</label>
                {isAdmin ? (
                  <input
                    value={dia.lanche}
                    onChange={(e) => updateLocal(dia.id, "lanche", e.target.value)}
                    className="w-full border border-border rounded-xl px-3 py-2 text-sm"
                  />
                ) : (
                  <p className="text-sm">{dia.lanche}</p>
                )}
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted mb-1">Almoço</label>
                {isAdmin ? (
                  <input
                    value={dia.almoco}
                    onChange={(e) => updateLocal(dia.id, "almoco", e.target.value)}
                    className="w-full border border-border rounded-xl px-3 py-2 text-sm"
                  />
                ) : (
                  <p className="text-sm">{dia.almoco}</p>
                )}
              </div>
              {isAdmin && (
                <button
                  type="button"
                  onClick={() => salvar(dia)}
                  disabled={salvando === dia.id}
                  className="text-sm bg-primary text-white px-4 py-2 rounded-xl hover:bg-primary-dark disabled:opacity-60"
                >
                  {salvando === dia.id ? "Salvando..." : "Salvar este dia"}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
